"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "src/components/section";
import StyledCodeBlock from "./styled-code-block";
import { useSyncedState } from "rwsdk/use-synced-state/client";

const BLUEPRINT_BG = "bg-[#0D0D0D]";
const BLUEPRINT_LINE = "border-white/10";
const ACCENT = "text-[#F17543]";
const ACCENT_BG = "bg-[#F17543]";
const TEXT_MAIN = "text-white";
const TEXT_SUB = "text-slate-400";

const clientCode = `"use client";
import { useSyncedState } from "rwsdk/use-synced-state/client";

export const RealtimeApp = ({ userId }) => {
  // 1. User-scoped state (synced across your tabs)
  const [userState, setUserState] = useSyncedState(
    { count: 0 }, 
    "user-counter", 
    userId
  );

  // 2. Read-only global stats (aggregated by server)
  const [globalState] = useSyncedState(
    { count: 0, history: [] }, 
    "global-stats"
  );

  return (
    <div>
      <h3>Global: {globalState.count}</h3>
      <button onClick={() => setUserState(s => ({ count: s.count + 1 }))}>
        Your Count: {userState.count}
      </button>
    </div>
  );
};`;

const workerCode = `// src/worker.tsx
import { SyncedStateServer } from "rwsdk/use-synced-state/worker";

// Server-side Aggregator
SyncedStateServer.registerSetStateHandler(async (key, value, { env }) => {
  if (key.startsWith("user-counter:")) {
    const globalState = await env.SYNCED_STATE.get("global-stats");
    
    // Increment global total and update 24h history
    globalState.count += 1; 
    globalState.history[new Date().getUTCHours()].count += 1;
    
    await env.SYNCED_STATE.put("global-stats", globalState);
  }
});`;

interface LogEntry {
    id: string;
    timestamp: string;
    type: "in" | "out" | "sys";
    message: string;
}

const getUserId = () => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("rwsdk_user_id");
    if (!id) {
        id = Math.random().toString(36).substring(2, 6).toUpperCase();
        localStorage.setItem("rwsdk_user_id", id);
    }
    return id;
};

export default function RealtimeSection() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        setUserId(getUserId());
    }, []);

    // Scoped user state
    const [userState, setUserState] = useSyncedState({ count: 0 }, `user-counter:${userId}`);

    // Global stats
    const [globalState] = useSyncedState({
        count: 0,
        history: Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0, date: "" }))
    }, "global-stats");

    // Live presence
    const [presence] = useSyncedState(0, "global-presence");

    // Heartbeat: keeps this user counted as "online" while on the page.
    // Server drops the entry after 45s of no ping.
    const [, setHeartbeat] = useSyncedState({ ts: 0 }, `user-presence-heartbeat:${userId}`);
    useEffect(() => {
        if (!userId) return;
        const ping = () => setHeartbeat({ ts: Date.now() });
        ping(); // immediate on mount
        const id = setInterval(ping, 20_000);
        return () => clearInterval(id);
    }, [userId]);

    const [showCode, setShowCode] = useState(false);
    const [activeTab, setActiveTab] = useState<"client" | "worker">("client");
    const lastUserCount = useRef(userState.count);
    const lastGlobalCount = useRef(globalState.count);

    // Monitor updates
    useEffect(() => {
        if (userState.count !== lastUserCount.current) {
            lastUserCount.current = userState.count;
        }
    }, [userState.count]);

    useEffect(() => {
        if (globalState.count !== lastGlobalCount.current) {
            lastGlobalCount.current = globalState.count;
        }
    }, [globalState.count]);

    // Initial connection simulation
    useEffect(() => {
        // Ready
    }, []);

    const handleIncrement = () => {
        setUserState({ count: userState.count + 1 });
    };

    console.log("[Client] globalState", globalState.count, globalState.history.find(h => h.hour === new Date().getUTCHours())?.count);
    const maxActivity = useMemo(() => Math.max(...globalState.history.map(h => h.count), 1), [globalState.history]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column: User Session (PRIMARY) */}
                <div className="flex flex-col gap-4 min-h-[400px]">
                    {/* User Controls */}
                    <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl p-10 flex flex-col items-center justify-center flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 to-transparent`}>
                        <div className="absolute top-6 left-8 text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(241,117,67,0.8)]" />
                            Your Session: <span className="text-white">#{userId}</span>
                        </div>

                        <div className="flex flex-col items-center gap-8">
                            <div className="text-center">
                                <motion.div
                                    key={userState.count}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-8xl font-mono font-bold text-white mb-2"
                                >
                                    {userState.count}
                                </motion.div>
                                <div className="text-[12px] font-mono uppercase tracking-[0.4em] text-slate-500">Your Contributions</div>
                            </div>

                            <button
                                onClick={handleIncrement}
                                className="px-12 py-5 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-2xl shadow-orange-500/20 text-lg"
                            >
                                Increment
                            </button>
                        </div>

                        <p className="absolute bottom-6 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                            Syncing to Global DO via binary delta
                        </p>
                    </div>
                </div>

                {/* Right Column: Collective Activity Graph */}
                <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl p-8 flex flex-col min-h-[400px] relative overflow-hidden group shadow-inner`}>
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-2 font-semibold">Collective Activity</div>
                            <h3 className="text-4xl font-bold flex items-center gap-3">
                                <motion.span
                                    key={globalState.count}
                                    animate={{ scale: [1, 1.05, 1], color: ["#fff", "#F17543", "#fff"] }}
                                    className="text-white"
                                >
                                    {globalState.count.toLocaleString()}
                                </motion.span>
                                <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">Interactions</span>
                            </h3>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-green-500 font-bold uppercase">Live</span>
                            </div>
                            {presence > 0 && (
                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                    {presence} online now
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-end gap-1.5" style={{ height: "192px" }} >
                        {globalState.history.map((h, i) => {
                            const barHeight = Math.round((h.count / maxActivity) * 160);
                            const isCurrentHour = h.hour === new Date().getUTCHours();
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center group/bar" style={{ height: "192px" }}>
                                    {/* spacer pushes bar to bottom */}
                                    <div className="flex-1" />
                                    <div className="relative w-full flex justify-center">
                                        <div
                                            style={{ height: `${barHeight}px`, minHeight: h.count > 0 ? "2px" : "0px", transition: "height 0.5s ease" }}
                                            className={`w-full rounded-t-sm ${isCurrentHour ? "bg-orange-500 shadow-[0_0_20px_rgba(241,117,67,0.4)]" : "bg-white/10 group-hover/bar:bg-white/30"}`}
                                        />
                                        {h.count > 0 && (
                                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[10px] font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded shadow-lg border border-white/5 z-10">
                                                {h.count}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-[8px] font-mono uppercase mt-1 ${h.hour % 4 === 0 ? "text-slate-300 font-bold" : "text-slate-600"}`}>
                                        {h.hour}h
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                        <p className="text-[10px] text-slate-500 italic max-w-[200px]">
                            Aggregated server-side from all connected client buckets.
                        </p>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            Last 24 Hours
                        </div>
                    </div>
                </div>
            </div>

            {/* Implementation Details */}
            <div className="flex flex-col items-center mt-12">
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="group flex flex-col items-center gap-2 mb-8 focus:outline-none"
                >
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 group-hover:text-orange-500 transition-colors">
                        {showCode ? "Hide Implementation" : "View Implementation"}
                    </div>
                    <div className={`w-8 h-[1px] bg-white/20 group-hover:bg-orange-500 transition-all duration-300 ${showCode ? 'w-12 bg-orange-500' : 'w-8'}`} />
                </button>

                <AnimatePresence>
                    {showCode && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full overflow-hidden"
                        >
                            <div className="bg-editor rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                <div className="flex border-b border-white/10 bg-white/5">
                                    <button
                                        onClick={() => setActiveTab("client")}
                                        className={`px-6 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === "client" ? "text-orange-500 border-b border-orange-500 bg-white/5" : "text-slate-500 hover:text-white"}`}
                                    >
                                        Client Hook
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("worker")}
                                        className={`px-6 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === "worker" ? "text-orange-500 border-b border-orange-500 bg-white/5" : "text-slate-500 hover:text-white"}`}
                                    >
                                        Server Aggregator
                                    </button>
                                </div>
                                <div className="p-4 bg-[#0D0D0D]">
                                    <StyledCodeBlock codeBlocks={[activeTab === "client" ? clientCode : workerCode]} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
