import { useState, useEffect, useRef } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";

// Shared structure from server
export type GlobalActivityStats = {
  scrollBins: Record<number, number>;
  clickBins: Record<number, number>;
  activeViewports: Record<string, number>;
};

const ACTIVITY_STATS_KEY = "global-activity-stats";

export function useActivityData(userId: string | null): { 
  stats: GlobalActivityStats;
  viewportRange: { top: number; bottom: number };
  actionEvent: { id: number; type: 'heat' | 'click'; percent: number, clientX?: number, clientY?: number } | null;
} {
  // Read global aggregates
  const [globalStats] = useSyncedState<GlobalActivityStats>({
    scrollBins: {},
    clickBins: {},
    activeViewports: {}
  }, ACTIVITY_STATS_KEY);

  // Write individual stream
  const [_, setUserActivity] = useSyncedState<any>(null, `user-activity:${userId}`);
  
  // Heartbeat for presence and expiration cleanup on the server
  const [__, setHeartbeat] = useSyncedState<any>(null, `user-presence-heartbeat:${userId}`);

  // Local state for immediate smooth rendering of the current user's viewport
  const [viewportRange, setViewportRange] = useState({ top: 0, bottom: 0 });
  const [actionEvent, setActionEvent] = useState<{ id: number; type: 'heat' | 'click'; percent: number, clientX?: number, clientY?: number } | null>(null);

  // Trigger an animation event
  const fireEvent = (type: 'heat' | 'click', percent: number, clientX?: number, clientY?: number) => {
      setActionEvent({ id: Date.now(), type, percent, clientX, clientY });
  };

  // Queues for batching events before sending to server
  const clickQueue = useRef<number[]>([]);
  const flushTimeoutId = useRef<any>(null);

  useEffect(() => {
    if (!userId) return;

    // Helper to get relative percentage (0-100) down the document
    const getPercent = (pageY: number) => {
       const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
       return (pageY / scrollHeight) * 100;
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

    // 1. Scroll tracking
    const handleScroll = () => {
       const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
       const topPercent = (window.scrollY / scrollHeight) * 100;
       const bottomPercent = ((window.scrollY + window.innerHeight) / scrollHeight) * 100;
       
       setViewportRange({ top: topPercent, bottom: bottomPercent });
    };

    // Continuous heat logging while focused
    const heatInterval = setInterval(() => {
        if (document.hasFocus()) {
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const bottomPercent = ((window.scrollY + window.innerHeight) / scrollHeight) * 100;
            
            flushActivity(bottomPercent);
            fireEvent('heat', bottomPercent);
        }
    }, 1000);

    // 2. Click tracking
    const handleClick = (e: MouseEvent) => {
        // Instead of plotting the click on the absolute document percentage, 
        // bind the heat exactly to the current "You" anchor (the bottom of the viewport)
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const percent = ((window.scrollY + window.innerHeight) / scrollHeight) * 100;

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

    return () => {
       window.removeEventListener("scroll", handleScroll);
       document.removeEventListener("click", handleClick);
       if (flushTimeoutId.current) clearTimeout(flushTimeoutId.current);
       clearInterval(heatInterval);
       clearInterval(heartbeatInterval);
    };
  }, [userId]);

  return { stats: globalStats, viewportRange, actionEvent };
}
