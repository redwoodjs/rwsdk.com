"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// --- Icons ---
const COLOR_DATA = "var(--color-dark-accent)"; // Blue for request
const COLOR_SYNC = "var(--color-dark-accent)"; // Orange for sync

const IconCursor = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ filter: "drop-shadow(0 0 4px var(--color-dark-accent))" }}>
        <path d="M5.5 3.5L11 18.5L13.5 13L19 10.5L5.5 3.5Z" />
    </svg>
);

type Scene =
    "idle" |
    "vt_click" | "vt_snapshot" | "vt_morph" |
    "suspense_shell" | "suspense_pending" | "suspense_pop" |
    "optimistic_click" | "optimistic_success" | "optimistic_sync";

export default function ActionLoopAnimation() {
    const [scene, setScene] = useState<Scene>("idle");
    const [following, setFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(1284);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleFollow = () => {
        if (following) return;
        setFollowing(true);
        setFollowerCount(prev => prev + 1);
        setScene("optimistic_success");
        setIsUserInteracting(true);
        // Reset interaction after a while to resume loop if needed, 
        // or just let the loop continue from here.
        setTimeout(() => setScene("optimistic_sync"), 800);
        setTimeout(() => setIsUserInteracting(false), 4500);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const runLoop = async () => {
            while (true) {
                if (isUserInteracting) {
                    await new Promise(r => timeoutId = setTimeout(r, 1000));
                    continue;
                }

                // --- 1. VIEW TRANSITIONS ---
                setScene("idle");
                setFollowing(false);
                setFollowerCount(1284);
                await new Promise(r => timeoutId = setTimeout(r, 2000));
                if (isUserInteracting) continue;

                setScene("vt_click"); // T = 0ms
                await new Promise(r => timeoutId = setTimeout(r, 100));

                setScene("vt_snapshot"); // T = 10ms (scaled)
                await new Promise(r => timeoutId = setTimeout(r, 400));

                setScene("vt_morph"); // T = 100ms (scaled)
                await new Promise(r => timeoutId = setTimeout(r, 800));
                if (isUserInteracting) continue;

                // --- 2. SUSPENSE ---
                setScene("suspense_shell"); // T = 0ms (after transition)
                await new Promise(r => timeoutId = setTimeout(r, 200));

                setScene("suspense_pending"); // T = 50ms (scaled)
                await new Promise(r => timeoutId = setTimeout(r, 2500));

                setScene("suspense_pop"); // T = 500ms (scaled)
                await new Promise(r => timeoutId = setTimeout(r, 2000));
                if (isUserInteracting) continue;

                // --- 3. OPTIMISTIC UPDATES ---
                setScene("optimistic_click"); // T = 0ms
                await new Promise(r => timeoutId = setTimeout(r, 1200)); // Time to move cursor

                // OPTIMISTIC UPDATE: T = 10ms
                setScene("optimistic_success");
                setFollowing(true);
                setFollowerCount(1285);
                await new Promise(r => timeoutId = setTimeout(r, 800));

                if (isUserInteracting) continue;

                // T = 50ms -> 400ms (scaled)
                setScene("optimistic_sync");
                await new Promise(r => timeoutId = setTimeout(r, 3500));
            }
        };
        runLoop();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <LayoutGroup>
            <div ref={containerRef} className="relative w-full h-full flex flex-col items-stretch">

                {/* --- Top Section: Server (40%) --- */}
                <div className="absolute top-0 left-0 w-full h-[40%] bg-white/[0.02] border-b border-white/5 overflow-hidden">
                    <div className="text-[7px] absolute top-2 right-4 uppercase tracking-[0.2em] text-white/10 font-mono font-bold">
                        Server Runtime
                    </div>

                    {/* Server Active Indicator */}
                    {(scene === "suspense_pending" || scene === "optimistic_sync") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center p-8"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-full h-full rounded-full bg-orange-500/10 blur-3xl"
                            />
                        </motion.div>
                    )}

                    {/* Concept Title Overlay */}
                    <div className="absolute inset-x-0 top-8 flex justify-center z-50 pointer-events-none">
                        <AnimatePresence mode="wait">
                            {scene !== "idle" && (
                                <motion.div
                                    key={scene.startsWith("vt") ? "vt" : scene.startsWith("suspense") ? "suspense" : "optimistic"}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    className="px-4 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md shadow-2xl"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500/90">
                                        {scene.startsWith("vt") ? "View Transitions" :
                                            scene.startsWith("suspense") ? "Suspense" :
                                                "Optimistic Updates"}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Vertical Conduit */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1px] h-[10%] bg-gradient-to-b from-white/20 to-transparent z-0" />

                {/* Server Action Transport (Upward) - The background sync */}
                <AnimatePresence>
                    {scene === "optimistic_sync" && (
                        <div className="absolute inset-0 pointer-events-none z-10">
                            {[0].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ top: "75%", left: "50%", x: "-50%", opacity: 0, scale: 0.5 }}
                                    animate={{
                                        top: "25%",
                                        opacity: [0, 1, 1, 0],
                                        scale: [0.5, 1, 1, 0.5]
                                    }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    className="absolute w-1.5 h-1.5 rounded-full bg-dark-accent shadow-[0_0_12px_var(--color-dark-accent)]"
                                >
                                    <div className="absolute top-full h-12 bg-gradient-to-t from-transparent to-dark-accent/40 left-1/2 -translate-x-1/2 w-[1px]" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* Scene 1: Initial List View in Browser */}
                <div className="absolute bottom-4 left-4 right-4 top-[50%] bg-[#2b1810] dark:bg-dark-panel rounded-lg border border-[#4a2b1f] dark:border-dark-border shadow-2xl overflow-hidden flex flex-col z-20 transition-colors duration-200">
                    <div className="h-6 bg-[#3d241a] dark:bg-dark-panel-light border-b border-[#4a2b1f] dark:border-dark-border flex items-center px-2 gap-1.5 shrink-0 relative transition-colors duration-200">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                        <div className="ml-2 h-3 w-32 bg-white/10 rounded-full" />
                    </div>

                    <div className="flex-1 relative overflow-hidden flex flex-col">
                        <AnimatePresence mode="wait">
                            {["idle", "vt_click", "vt_snapshot"].includes(scene) && (
                                <motion.div
                                    key="list"
                                    layout
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                    className="p-3 flex flex-col gap-3 h-full"
                                >
                                    <div className="text-[7px] uppercase tracking-widest text-white/20 font-bold">People you follow</div>

                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] relative overflow-hidden group">
                                        {/* Snapshot/Capture Pulse */}
                                        {scene === "vt_snapshot" && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 border border-orange-500/50 rounded-lg z-20"
                                            />
                                        )}
                                        {/* Click Pulse Effect */}
                                        {scene === "vt_click" && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 1 }}
                                                animate={{ scale: 5, opacity: 0 }}
                                                transition={{ duration: 0.8 }}
                                                className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/30 rounded-full"
                                            />
                                        )}

                                        <motion.div
                                            layoutId="profile-avatar"
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F17543] to-[#E9B46A] flex-shrink-0 z-10 shadow-lg"
                                        />

                                        <div className="flex-1">
                                            <div className="h-1.5 w-20 bg-white/20 rounded-full mb-1" />
                                            <div className="h-1 w-12 bg-white/5 rounded-full" />
                                        </div>

                                        <div className="text-[6px] text-white/40 font-bold px-1.5 py-0.5 rounded border border-white/10">View</div>
                                    </div>

                                    {/* Animated Cursor */}
                                    {scene === "vt_click" && (
                                        <motion.div
                                            initial={{ x: 100, y: 100, opacity: 0 }}
                                            animate={{ x: 80, y: 35, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute pointer-events-none z-50 text-white drop-shadow-2xl"
                                        >
                                            <IconCursor />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/* Profile View */}
                            {!["idle", "vt_click", "vt_snapshot"].includes(scene) && (
                                <motion.div
                                    key="profile"
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 flex flex-col items-center h-full"
                                >
                                    {/* Profile Header with Shared Avatar */}
                                    <div className="relative mb-3 mt-1">
                                        {(scene === "vt_morph" || scene === "suspense_shell") && (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-dark-accent/30 dark:bg-dark-accent/30 blur-xl rounded-full"
                                            />
                                        )}
                                        <motion.div
                                            layoutId="profile-avatar"
                                            className="w-14 h-14 rounded-full bg-gradient-to-br from-dark-accent to-[#E9B46A] dark:to-dark-accent/50 shadow-2xl relative z-10"
                                        />
                                    </div>

                                    {/* Shimmer / Content */}
                                    <div className="w-full flex flex-col items-center gap-2 mb-4">
                                        {(scene === "suspense_pending" || scene === "vt_morph" || scene === "suspense_shell") ? (
                                            <motion.div
                                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="w-full flex flex-col items-center gap-2"
                                            >
                                                <div className="h-3 w-32 bg-white/15 rounded-full" />
                                                <div className="flex gap-4 mt-1 opacity-20">
                                                    <div className="flex flex-col items-center">
                                                        <div className="h-2.5 w-8 bg-white/50 rounded" />
                                                        <div className="h-1 w-6 bg-white/20 rounded-full mt-1" />
                                                    </div>
                                                    <div className="flex flex-col items-center border-l border-white/10 pl-4">
                                                        <div className="h-2.5 w-6 bg-white/50 rounded" />
                                                        <div className="h-1 w-8 bg-white/20 rounded-full mt-1" />
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-40 bg-white/10 rounded-full mt-1" />
                                                <div className="mt-2 px-2 py-0.5 rounded border border-white/5 bg-white/5">
                                                    <span className="text-[6px] uppercase tracking-widest text-white/20 font-mono">Suspense...</span>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                className="w-full flex flex-col items-center gap-1.5"
                                            >
                                                <div className="h-2 w-32 bg-white/40 rounded-full" />
                                                <div className="flex gap-4 mt-1">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-[10px] font-bold text-white leading-none">{followerCount}</span>
                                                        <span className="text-[5px] text-white/30 uppercase tracking-tighter">Followers</span>
                                                    </div>
                                                    <div className="flex flex-col items-center border-l border-white/10 pl-4">
                                                        <span className="text-[10px] font-bold text-white leading-none">42</span>
                                                        <span className="text-[5px] text-white/30 uppercase tracking-tighter">Following</span>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-40 bg-white/10 rounded-full mt-1" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Action Area */}
                                    {(scene === "suspense_pop" || scene === "optimistic_click" || scene === "optimistic_success" || scene === "optimistic_sync") && (
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="w-full mt-auto"
                                        >
                                            <motion.button
                                                onClick={handleFollow}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.95 }}
                                                animate={{
                                                    scale: scene === "optimistic_click" ? 0.92 : 1,
                                                    backgroundColor: following ? "#22c55e" : "#F17543",
                                                    boxShadow: following ? "0 0 20px rgba(34,197,94,0.3)" : "0 4px 12px rgba(241,117,67,0.3)"
                                                }}
                                                className={`w-full py-2.5 rounded-xl font-bold text-[9px] uppercase tracking-[0.1em] text-white overflow-hidden relative transition-colors duration-400 z-50`}
                                            >
                                                {/* Confetti Particles */}
                                                <AnimatePresence>
                                                    {scene === "optimistic_sync" && (
                                                        <div className="absolute inset-0 pointer-events-none">
                                                            {[...Array(12)].map((_, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ x: "50%", y: "50%", scale: 1, opacity: 1 }}
                                                                    animate={{
                                                                        x: `${50 + (Math.random() - 0.5) * 160}%`,
                                                                        y: `${50 + (Math.random() - 0.5) * 160}%`,
                                                                        opacity: 0,
                                                                        scale: 0,
                                                                        rotate: Math.random() * 360
                                                                    }}
                                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                                    className="absolute w-1.5 h-1.5 bg-white/80 rounded shadow-sm"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </AnimatePresence>
                                                <span className="relative z-10 flex flex-col items-center justify-center leading-tight">
                                                    <span className="flex items-center gap-1.5">
                                                        {following ? <><span className="text-xs">✓</span> Following</> : "Follow"}
                                                    </span>
                                                    {scene === "optimistic_success" && (
                                                        <motion.span
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-[5px] text-white/60 tracking-[0.2em] font-mono"
                                                        >
                                                            Predictive Success
                                                        </motion.span>
                                                    )}
                                                </span>
                                            </motion.button>

                                            {/* Background Sync Ring */}
                                            {scene === "optimistic_sync" && (
                                                <div className="mt-3 flex items-center justify-center gap-2">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                        className="w-2.5 h-2.5 border-[2px] border-green-500/20 border-t-green-500 rounded-full"
                                                    />
                                                    <span className="text-[7px] text-white/40 uppercase tracking-[0.15em] font-mono">Server background sync...</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Cursor for Follow Action */}
                                    {scene === "optimistic_click" && (
                                        <motion.div
                                            initial={{ x: 80, y: 80, opacity: 0 }}
                                            animate={{ x: 40, y: 35, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute pointer-events-none z-50 text-white drop-shadow-xl"
                                        >
                                            <IconCursor />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </LayoutGroup>
    );
}
