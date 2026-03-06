import { useState, useEffect, useRef } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";

// Shared structure from server
export type GlobalActivityStats = {
  scrollBins: Record<number, number>;
  clickBins: Record<number, number>;
};

const ACTIVITY_STATS_KEY = "global-activity-stats";
const ACTIVITY_PRESENCE_KEY = "global-activity-presence";

export function useActivityData(
  userId: string | null,
  onAction?: (event: { id: number; type: 'heat' | 'click'; percent: number, clientX?: number, clientY?: number }) => void
): { 
  stats: GlobalActivityStats;
  activeViewports: Record<string, number>;
  scrollPercent: number;
} {
  // Read global aggregates
  const [globalStats] = useSyncedState<GlobalActivityStats>({
    scrollBins: {},
    clickBins: {}
  }, ACTIVITY_STATS_KEY);

  // Read presence
  const [activeViewports] = useSyncedState<Record<string, number>>({}, ACTIVITY_PRESENCE_KEY);

  // Write individual stream
  const [_, setUserActivity] = useSyncedState<any>(null, `user-activity:${userId}`);
  
  // Heartbeat for presence and expiration cleanup on the server
  const [__, setHeartbeat] = useSyncedState<any>(null, `user-presence-heartbeat:${userId}`);

  // Local state for immediate smooth rendering of the current user's scroll position
  const [scrollPercent, setScrollPercent] = useState(0);

  // Trigger an animation event
  const fireEvent = (type: 'heat' | 'click', percent: number, clientX?: number, clientY?: number) => {
      onAction?.({ id: Date.now(), type, percent, clientX, clientY });
  };

  // Queues for batching events before sending to server
  const clickQueue = useRef<number[]>([]);
  const flushTimeoutId = useRef<any>(null);

  // We debounce the actual scroll sync a bit so we don't bombard the server during fast scrolling
  const scrollTimeoutId = useRef<any>(null);
  const lastScrollPercent = useRef<number>(-1);

  useEffect(() => {
    if (!userId) return;

    // Helper to get normalized scroll percentage (0=top, 100=fully scrolled)
    // Uses content height (scrollHeight - innerHeight) so the same content
    // always maps to the same percentage regardless of viewport size.
    const getNormalizedPercent = () => {
       const sh = document.documentElement.scrollHeight || document.body.scrollHeight;
       const contentHeight = sh - window.innerHeight;
       if (contentHeight <= 0) return 0;
       return Math.min(100, (window.scrollY / contentHeight) * 100);
    };

    // Helper to flush queues to the server
    const flushActivity = (scrollPercent?: number) => {
        if (!userId) return;
        
        // Add a timestamp so every delta is mathematically unique, bypassing 
        // the client's internal equality check for useSyncedState so it always sends
        const delta: any = { ts: Date.now() };
        if (scrollPercent !== undefined) delta.scrollPercent = scrollPercent;
        if (clickQueue.current.length > 0) {
            delta.clicks = [...clickQueue.current];
            clickQueue.current = [];
        }
        
        if (Object.keys(delta).length > 1) {
            setUserActivity(delta);
        }
    };

    const scheduleFlush = () => {
        if (flushTimeoutId.current) clearTimeout(flushTimeoutId.current);
        flushTimeoutId.current = setTimeout(() => flushActivity(), 1000);
    };

    const flushScrollPresence = (percent: number) => {
        if (Math.abs(lastScrollPercent.current - percent) < 1) return; // Don't flush if it's practically the same spot
        lastScrollPercent.current = percent;
        flushActivity(percent);
    };

    // 1. Scroll tracking
    const handleScroll = () => {
       const percent = getNormalizedPercent();
       
       setScrollPercent(percent);

       // Debounce scroll for live presence marker updates (~200ms is a good "paused scroll" threshold)
       if (scrollTimeoutId.current) clearTimeout(scrollTimeoutId.current);
       scrollTimeoutId.current = setTimeout(() => {
           flushScrollPresence(percent);
       }, 200);
    };

    // Continuous heat logging while focused
    const heatInterval = setInterval(() => {
        if (document.hasFocus()) {
            const percent = getNormalizedPercent();
            
            flushActivity(percent);
            fireEvent('heat', percent);
        }
    }, 1000);

    // 2. Click tracking
    const handleClick = (e: MouseEvent) => {
        const percent = getNormalizedPercent();

        fireEvent('click', percent, e.clientX, e.clientY);
        clickQueue.current.push(percent);
        scheduleFlush();
    };

    // Attach listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    // Heartbeat
    const heartbeatInterval = setInterval(() => {
        setHeartbeat({ ts: Date.now() });
    }, 20000);
    // Send immediate initial heartbeat
    setHeartbeat({ ts: Date.now() });

    // Initial position
    handleScroll();

    // Instant disconnection handler (pagehide/visibilitychange/unmount)
    const handleDisconnect = () => {
        if (!userId) return;
        setUserActivity({ ts: Date.now(), disconnected: true });
    };

    window.addEventListener("pagehide", handleDisconnect);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'hidden') {
            handleDisconnect();
        }
    });

    return () => {
       window.removeEventListener("scroll", handleScroll);
       document.removeEventListener("click", handleClick);
       window.removeEventListener("pagehide", handleDisconnect);
       if (flushTimeoutId.current) clearTimeout(flushTimeoutId.current);
       if (scrollTimeoutId.current) clearTimeout(scrollTimeoutId.current);
       clearInterval(heatInterval);
       clearInterval(heartbeatInterval);
       
       // Fire disconnect natively on React unmount
       handleDisconnect();
    };
  }, [userId]);

  return { stats: globalStats, activeViewports, scrollPercent };
}
