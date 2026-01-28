"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "src/components/section";
import StyledCodeBlock from "./styled-code-block";

const BLUEPRINT_BG = "bg-[#0D0D0D]";
const BLUEPRINT_LINE = "border-white/10";
const ACCENT = "text-[#F17543]";
const ACCENT_BG = "bg-[#F17543]";
const TEXT_MAIN = "text-white";
const TEXT_SUB = "text-slate-400";

const clientCode = `"use client";
import { useSyncedState } from "rwsdk/use-synced-state/client";

export const GlobalPresence = () => {
  // Synchronizes with everyone in the "lobby" room
  const [presence, setPresence] = useSyncedState({ count: 0, flag: "🌐" }, "user-stats", "lobby");

  return (
    <div className="presence-card">
      <span className="geo-flag">{presence.flag}</span>
      <div className="counter-controls">
        <button onClick={() => setPresence(p => ({ ...p, count: p.count - 1 }))}>-</button>
        <span className="count">{presence.count}</span>
        <button onClick={() => setPresence(p => ({ ...p, count: p.count + 1 }))}>+</button>
      </div>
    </div>
  );
};`;

const workerCode = `// src/worker.tsx
import { SyncedStateServer } from "rwsdk/use-synced-state/worker";

SyncedStateServer.registerRoomHandler(async (roomId, reqInfo) => {
  // The server injects the flag from the Edge request context 
  // so the client doesn't have to fetch it or "guess".
  return {
    id: roomId,
    metadata: { flag: reqInfo.ctx.geo.flag } 
  };
});`;

import { useSyncedState } from "rwsdk/use-synced-state/client";

interface LogEntry {
    id: string;
    timestamp: string;
    type: "in" | "out" | "sys";
    message: string;
}

export default function RealtimeSection() {
    const [presence, setPresence] = useSyncedState({ count: 42, flag: "🌐" }, "user-stats:lobby");
    const [showCode, setShowCode] = useState(false);
    const [activeTab, setActiveTab] = useState<"client" | "worker">("client");
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const lastValueRef = useRef(presence);

    const addLog = (type: LogEntry["type"], message: string) => {
        const entry: LogEntry = {
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            type,
            message,
        };
        setLogs(prev => [entry, ...prev].slice(0, 50));
    };

    // monitor remote updates
    useEffect(() => {
        if (presence.count !== lastValueRef.current.count) {
            addLog("in", `Remote update received: { count: ${presence.count} }`);
            lastValueRef.current = presence;
        }
    }, [presence]);

    // Initial connection simulation
    useEffect(() => {
        addLog("sys", "Initializing Cap'n Web channel...");
        setTimeout(() => addLog("sys", "Channel established. Connected to Durable Object 'lobby'."), 800);
    }, []);

    const handleUpdate = (diff: number) => {
        const newCount = presence.count + diff;
        setPresence({ ...presence, count: newCount });
        lastValueRef.current = { ...presence, count: newCount };
        addLog("out", `Broadcasting local change: { count: ${newCount} }`);
    };

    return (
        <div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column: Interactive Demo */}
                <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden group`}>
                    <div className="absolute top-4 left-6 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        Interactive Presence Demo
                    </div>

                    <motion.div
                        className="bg-editor border border-white/10 rounded-xl p-8 flex flex-col items-center gap-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.span
                            key={presence.flag}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl"
                        >
                            {presence.flag}
                        </motion.span>

                        <div className="flex items-center gap-8">
                            <button
                                onClick={() => handleUpdate(-1)}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-2xl text-white hover:bg-slate-800 transition-colors active:scale-90"
                            >
                                -
                            </button>
                            <motion.span
                                key={presence.count}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl font-mono font-bold w-20 text-center text-white"
                            >
                                {presence.count}
                            </motion.span>
                            <button
                                onClick={() => handleUpdate(1)}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-2xl text-white hover:bg-slate-800 transition-colors active:scale-90"
                            >
                                +
                            </button>
                        </div>
                    </motion.div>

                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="!text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-0">
                            Synced across all instances of this "lobby"
                        </p>
                    </div>
                </div>

                {/* Right Column: State Inspector & Protocol Log */}
                <div className="flex flex-col gap-4 h-[350px]">
                    {/* State Inspector */}
                    <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl p-4 flex flex-col flex-[0.6] overflow-hidden`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                State Inspector
                            </div>
                        </div>

                        <div className="flex-1 font-mono text-xs overflow-auto bg-editor rounded-xl p-3 border border-white/10">
                            <pre className="text-[#9C9781]">
                                <span className="opacity-50">{"{"}</span>
                                {"\n  "}
                                <span className="text-[#C55447]">"roomId"</span>: <span className="text-[#E9B46A]">"lobby"</span>,
                                {"\n  "}
                                <span className="text-[#C55447]">"state"</span>: <span className="opacity-50">{"{"}</span>
                                {"\n    "}
                                <span className="text-[#C55447]">"count"</span>: <motion.span key={presence.count} animate={{ color: ["#fff", "#F17543", "#fff"] }} transition={{ duration: 0.5 }}>{presence.count}</motion.span>,
                                {"\n    "}
                                <span className="text-[#C55447]">"flag"</span>: <span className="text-[#E9B46A]">"{presence.flag}"</span>
                                {"\n  "}
                                <span className="opacity-50">{"}"}</span>,
                                {"\n  "}
                                <span className="text-[#C55447]">"protocol"</span>: <span className="text-[#E9B46A]">"Cap'n Web"</span>
                                {"\n"}<span className="opacity-50">{"}"}</span>
                            </pre>
                        </div>
                    </div>

                    {/* Protocol Log (Debugging Information) */}
                    <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl p-4 flex flex-col flex-[0.4] overflow-hidden`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                Protocol Events (Debugging)
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[8px] font-mono text-green-500/80 uppercase">Streaming</span>
                            </div>
                        </div>

                        <div className="flex-1 font-mono text-[10px] overflow-auto bg-editor rounded-xl p-2 text-slate-400 space-y-1">
                            <AnimatePresence mode="popLayout">
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-2"
                                    >
                                        <span className="opacity-40">[{log.timestamp}]</span>
                                        <span className={`uppercase font-bold ${log.type === 'in' ? 'text-[#3B82F6]' : log.type === 'out' ? 'text-[#F17543]' : 'text-slate-500'}`}>
                                            {log.type === 'in' ? '← IN' : log.type === 'out' ? '→ OUT' : 'SYS'}
                                        </span>
                                        <span className="flex-1 break-all">{log.message}</span>
                                    </motion.div>
                                ))}
                                {logs.length === 0 && <div className="opacity-40 italic">Waiting for connection...</div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Positioning Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-balance">
                <div className="space-y-4">
                    <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500">JSON is for APIs, Cap’n Web is for State</h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                        Updates aren't just strings sent over a socket. RedwoodSDK uses a binary-packed format that makes state synchronization virtually lag-free and extremely efficient on the wire.
                    </p>
                </div>
                <div className="space-y-4">
                    <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500">Durable Objects as the "Brain"</h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                        Unlike standard stateless workers, the SyncedStateServer is a stateful entity (a Durable Object) that lives in a specific data center, acting as a single, consistent source of truth for all connected clients.
                    </p>
                </div>
            </div>

            {/* Code Snippet Toggle */}
            <div className="flex flex-col items-center">
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="group flex flex-col items-center gap-2 mb-8 focus:outline-none"
                >
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 group-hover:text-orange-500 transition-colors">
                        {showCode ? "Hide Implementation" : "View Implementation"}
                    </div>
                    <div className={`w-8 h-[1px] bg-white/20 group-hover:bg-[#F17543] transition-all duration-300 ${showCode ? 'w-12 text-[#F17543]' : 'w-8'}`} />
                </button>

                <AnimatePresence>
                    {showCode && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full overflow-hidden"
                        >
                            <div className="bg-editor rounded-xl border border-white/10 overflow-hidden">
                                <div className="flex border-b border-white/10">
                                    <button
                                        onClick={() => setActiveTab("client")}
                                        className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === "client" ? "bg-white/5 text-orange-400 border-b border-orange-400" : "text-slate-500 hover:text-white"}`}
                                    >
                                        Client Implementation
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("worker")}
                                        className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === "worker" ? "bg-white/5 text-orange-400 border-b border-orange-400" : "text-slate-500 hover:text-white"}`}
                                    >
                                        Worker Implementation
                                    </button>
                                </div>
                                <div className="p-4">
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
