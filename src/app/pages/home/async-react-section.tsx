"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import RPCAnimation from "./rpc-animation";
import ActionLoopAnimation from "./action-loop-animation";

// --- Visual Constants ---
const BLUEPRINT_BG = "bg-[#0D0D0D]";
const BLUEPRINT_LINE = "border-white/10";
const COLOR_DB = "#F17543"; // Orange (Brand)
const COLOR_COMPUTE = "#fbbf24"; // Amber-400
const COLOR_DATA = "#F17543"; // Orange
const COLOR_UI = "#fbbf24"; // Amber
const COLOR_SUCCESS = "#22c55e"; // Green-500

// --- Icons ---
const IconDatabase = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);

const IconChip = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
);

const IconCursor = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ filter: "drop-shadow(0 0 4px #F17543)" }}>
        <path d="M5.5 3.5L11 18.5L13.5 13L19 10.5L5.5 3.5Z" />
    </svg>
);

const IconCloud = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
        <path d="M4 16.2403C2.84656 15.6318 2.05106 14.3976 2.05106 13C2.05106 10.7909 3.84192 9 6.05106 9C6.18433 9 6.31599 9.00661 6.44569 9.01957C7.07633 6.13054 9.63668 4 12.6511 4C16.3524 4 19.3511 6.99873 19.3511 10.7C19.3511 10.7788 19.349 10.857 19.3449 10.9348C21.4391 11.2368 23 13.0646 23 15.2C23 17.5755 21.0755 19.5 18.7 19.5H6C4.89543 19.5 4 18.6046 4 17.5V16.2403Z" />
    </svg>
);

// --- Shared Layout Wrapper ---
interface StageProps {
    children?: React.ReactNode;
    title: string;
    description: string;
    isLoading?: boolean;
    overlay?: React.ReactNode;
    serverActivity?: {
        db?: boolean;
        compute?: boolean;
        cloud?: boolean;
    };
    variant?: "default" | "vertical";
}

// --- REVISED TILE 1 & LAYOUT ---

const LayoutWrapper = ({ children, title, description, isLoading, overlay, serverActivity, variant = "default" }: StageProps) => (
    <div className="flex flex-col gap-4">
        <div className={`${BLUEPRINT_BG} border ${BLUEPRINT_LINE} rounded-xl relative overflow-hidden h-[340px]`}>
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />

            {variant === "default" ? (
                <>
                    {/* --- Top Half: Server Infrastructure --- */}
                    <div className="absolute top-0 left-0 w-full h-[40%] border-b border-white/5 bg-white/[0.02] overflow-hidden">
                        {/* Cloud Enclosure - Larger */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                animate={{
                                    opacity: serverActivity?.cloud ? 0.4 : 0.2,
                                    scale: serverActivity?.cloud ? 1.05 : 1
                                }}
                            >
                                <IconCloud className="w-[300px] h-[150px] text-white/40 fill-white/5" />
                            </motion.div>
                        </div>

                        {/* Database (Left - 38%) */}
                        <div className="absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 z-10">
                            <motion.div
                                animate={{
                                    scale: serverActivity?.db ? 1.2 : 1,
                                    color: serverActivity?.db ? "#F17543" : "#F1754390",
                                    x: serverActivity?.db ? [0, -1, 1, -1, 1, 0] : 0,
                                    y: serverActivity?.db ? [0, 1, -1, 1, -1, 0] : 0
                                }}
                                transition={serverActivity?.db ? { repeat: Infinity, duration: 0.2 } : {}}
                                className="p-2"
                            >
                                <IconDatabase className="w-8 h-8" style={{ filter: serverActivity?.db ? "drop-shadow(0 0 12px #F17543)" : "none" }} />
                            </motion.div>
                        </div>

                        {/* Compute (Right - 62%) */}
                        <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 z-10">
                            <motion.div
                                animate={{
                                    scale: serverActivity?.compute ? 1.2 : 1,
                                    color: serverActivity?.compute ? "#fbbf24" : "#fbbf2490",
                                    x: serverActivity?.compute ? [0, 1, -1, 1, -1, 0] : 0,
                                    y: serverActivity?.compute ? [0, -1, 1, -1, 1, 0] : 0
                                }}
                                transition={serverActivity?.compute ? { repeat: Infinity, duration: 0.2 } : {}}
                                className="p-2"
                            >
                                <IconChip className="w-8 h-8" style={{ filter: serverActivity?.compute ? "drop-shadow(0 0 12px #fbbf24)" : "none" }} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Conduit Graphic */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[2px] h-[10%] bg-gradient-to-b from-white/10 to-transparent z-0" />

                    {/* --- Bottom Half: Browser --- */}
                    <div className="absolute bottom-4 left-4 right-4 top-[50%] bg-[#1a1a1a] rounded-lg border border-white/10 shadow-2xl overflow-hidden flex flex-col z-20">
                        <div className="h-6 bg-[#252525] border-b border-white/5 flex items-center px-2 gap-1.5 shrink-0 relative">
                            <div className="w-2 h-2 rounded-full bg-red-500/40" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                            <div className="w-2 h-2 rounded-full bg-green-500/40" />
                            <div className="ml-2 h-3 w-32 bg-white/10 rounded-full overflow-hidden relative">
                                {isLoading && (
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-orange-500/30"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden p-3">
                            {children}
                        </div>
                    </div>
                </>
            ) : (
                <div className="absolute inset-0">
                    {children}
                </div>
            )}

            {/* --- Global Overlay --- */}
            {overlay}
        </div>

        <div className="text-center">
            <h3 className="text-lg font-medium mb-1 text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400 text-balance px-2">
                {description}
            </p>
        </div>
    </div>
);


// --- TILE 1: THE REQUEST CYCLE ---
export function Tile1_AsyncEngine() {
    type Phase = "idle" | "upward" | "processing" | "flight1" | "flight2" | "resolve1" | "resolve2" | "complete";
    const [phase, setPhase] = React.useState<Phase>("idle");
    const [stage, setStage] = React.useState<{ header: "none" | "skeleton" | "content", grid: "none" | "skeleton" | "content" }>({
        header: "none",
        grid: "none"
    });

    React.useEffect(() => {
        const sequence = async () => {
            while (true) {
                setPhase("idle");
                setStage({ header: "none", grid: "none" });
                await new Promise(r => setTimeout(r, 1000));

                setPhase("upward");
                await new Promise(r => setTimeout(r, 800));

                setPhase("processing");
                await new Promise(r => setTimeout(r, 1000));

                // Flight 1: Header Skeleton
                setPhase("flight1");
                await new Promise(r => setTimeout(r, 600));
                setStage(s => ({ ...s, header: "skeleton" }));
                await new Promise(r => setTimeout(r, 1200));

                // Flight 2: Grid Skeletons
                setPhase("flight2");
                await new Promise(r => setTimeout(r, 600));
                setStage(s => ({ ...s, grid: "skeleton" }));
                await new Promise(r => setTimeout(r, 1500));

                // Resolve 1: Header Content
                setPhase("resolve1");
                await new Promise(r => setTimeout(r, 600));
                setStage(s => ({ ...s, header: "content" }));
                await new Promise(r => setTimeout(r, 1200));

                // Resolve 2: Grid Content
                setPhase("resolve2");
                await new Promise(r => setTimeout(r, 600));
                setStage(s => ({ ...s, grid: "content" }));
                await new Promise(r => setTimeout(r, 1500));

                setPhase("complete");
                await new Promise(r => setTimeout(r, 4000));
            }
        };
        sequence();
    }, []);

    const isArrival = phase === "flight1" || phase === "flight2" || phase === "resolve1" || phase === "resolve2";

    return (
        <LayoutWrapper
            title="Streamed Components"
            description="Partial UI. The server sends the page in flight. The layout appears instantly; the data fills the gaps as it arrives."
            isLoading={phase !== "idle" && phase !== "complete"}
            serverActivity={{
                compute: phase === "processing",
                db: phase === "processing",
                cloud: phase !== "idle"
            }}
            overlay={
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
                    <AnimatePresence mode="popLayout">
                        {/* Phase 1: Request Packet (Upward) */}
                        {phase === "upward" && (
                            <motion.div
                                key="upward"
                                initial={{ left: "50%", top: "75%", opacity: 0, scale: 0.5 }}
                                animate={{ top: "20%", opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_15px_#F17543]"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />
                        )}

                        {/* Phase 2: Processing Flash */}
                        {phase === "processing" && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8 }}
                                className="absolute top-[20%] left-[50%] -translate-y-1/2 w-[15%] h-[1px] bg-orange-400"
                                style={{ transform: "translateX(-100%)" }}
                            />
                        )}

                        {/* Phase 3: Packet 1 (Header Skeleton) */}
                        {phase === "flight1" && (
                            <motion.div
                                key="flight1"
                                initial={{ left: "50%", top: "20%", opacity: 0, scale: 0.5 }}
                                animate={{ top: "75%", opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: "blur(4px)" }}
                                transition={{ duration: 0.6, ease: "easeIn" }}
                                className="absolute w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_#fbbf24] z-10"
                                style={{ transform: "translate(-50%, -50%)" }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                                    <div className="w-4 h-1 bg-amber-500/40 rounded-full" />
                                    <div className="w-2 h-1 bg-amber-500/40 rounded-full" />
                                </div>
                            </motion.div>
                        )}

                        {/* Phase 4: Packets 2 (Grid Skeletons) */}
                        {phase === "flight2" && (
                            <motion.div
                                key="flight2"
                                initial={{ left: "50%", top: "20%", opacity: 0, scale: 0.5 }}
                                animate={{ top: "75%", opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: "blur(4px)" }}
                                transition={{ duration: 0.6, ease: "easeIn" }}
                                className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] z-10"
                                style={{ transform: "translate(-50%, -50%)" }}
                            >
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1">
                                    <div className="w-3 h-0.5 bg-amber-400/40 rounded-full" />
                                    <div className="w-1.5 h-0.5 bg-amber-400/40 rounded-full" />
                                    <div className="w-2 h-0.5 bg-amber-400/40 rounded-full" />
                                </div>
                            </motion.div>
                        )}

                        {/* Phase 5/6: Resolving packets */}
                        {(phase === "resolve1" || phase === "resolve2") && (
                            <motion.div
                                key="resolve"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0"
                            >
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ left: "50%", top: "20%", opacity: 0 }}
                                        animate={{
                                            top: ["20%", "75%"],
                                            opacity: [0, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: i * 0.25,
                                            ease: "linear"
                                        }}
                                        className="absolute w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#F17543]"
                                        style={{ transform: "translate(-50%, -50%)" }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            }
        >
            <div className="w-full h-full flex flex-col gap-4 p-2 relative">
                {/* Header Chunk */}
                <div className="h-12 w-full">
                    <AnimatePresence mode="wait">
                        {stage.header === "skeleton" && (
                            <motion.div
                                key="h_skeleton"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 overflow-hidden relative">
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: "0%" }}
                                        transition={{ duration: 1.5 }}
                                        className="absolute inset-0 bg-white/10"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-1.5 w-[60%] bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "0%" }}
                                            transition={{ duration: 1.2 }}
                                            className="absolute inset-0 bg-white/10"
                                        />
                                    </div>
                                    <div className="h-1 w-[30%] bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "0%" }}
                                            transition={{ duration: 1.0, delay: 0.3 }}
                                            className="absolute inset-0 bg-white/10"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {stage.header === "content" && (
                            <motion.div
                                key="h_content"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-orange-500/40" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-2 w-24 bg-white/40 rounded-full" />
                                    <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Grid Items Chunk */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {stage.grid === "skeleton" && (
                            <motion.div
                                key="g_skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                className="grid grid-cols-2 gap-3 h-full"
                            >
                                {/* Skeleton 1: Metric Shape */}
                                <div className="h-24 bg-white/[0.03] border border-white/5 rounded-lg p-3 flex flex-col justify-between overflow-hidden">
                                    <div className="h-2 w-1/2 bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-white/10" />
                                    </div>
                                    <div className="h-6 w-3/4 bg-white/5 rounded relative overflow-hidden">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute inset-0 bg-white/10" />
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded relative overflow-hidden">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.0, delay: 0.4 }} className="absolute inset-0 bg-white/10" />
                                    </div>
                                </div>
                                {/* Skeleton 2: Status Shape */}
                                <div className="h-24 bg-white/[0.03] border border-white/5 rounded-lg p-3 flex flex-col justify-between overflow-hidden">
                                    <div className="h-2 w-1/3 bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-2/3 bg-white/5 rounded-full relative overflow-hidden">
                                            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute inset-0 bg-white/10" />
                                        </div>
                                        <div className="h-2 w-1/2 bg-white/5 rounded-full relative overflow-hidden">
                                            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.0, delay: 0.4 }} className="absolute inset-0 bg-white/10" />
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-1/4 bg-white/5 rounded-full relative overflow-hidden">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute inset-0 bg-white/10" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {stage.grid === "content" && (
                            <motion.div
                                key="g_content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-2 gap-3 h-full"
                            >
                                {/* Card 1: Metric */}
                                <div className="h-24 bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="h-1.5 w-10 bg-white/20 rounded-full" />
                                        <div className="h-1.5 w-6 bg-green-500/20 rounded-full" />
                                    </div>
                                    <div className="h-4 w-16 bg-white/60 rounded" />
                                    <div className="h-4 flex items-end gap-0.5">
                                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                            <div key={i} className="flex-1 bg-orange-500/20 rounded-t-[1px]" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>

                                {/* Card 2: Status */}
                                <div className="h-24 bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col justify-between">
                                    <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            <div className="h-1 w-14 bg-white/40 rounded-full" />
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            <div className="h-1 w-10 bg-white/40 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="h-1 w-8 bg-white/10 rounded-full" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Sync */}
                <motion.div
                    animate={{ opacity: phase === "complete" ? 1 : 0 }}
                    className="flex justify-between items-center h-4"
                >
                    <div className="h-1 w-12 bg-white/20 rounded-full" />
                    <div className="h-4 px-2 flex items-center rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="h-1 w-8 bg-green-500/40 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </LayoutWrapper>
    );
}

export function Tile2_StreamingBridge() {
    return (
        <LayoutWrapper
            title="RPC with RSC"
            description="Direct Logic. No APIs. Buttons call server functions directly. The UI and server act as one unified loop."
            variant="vertical"
        >
            <RPCAnimation />
        </LayoutWrapper>
    );
}

export function Tile3_ActionLoop() {
    return (
        <LayoutWrapper
            title="Latency"
            description="Fake Speed. Optimistic: Update the UI before the server finishes. Morph: Use animations to hide the fetch time."
            variant="vertical"
        >
            <ActionLoopAnimation />
        </LayoutWrapper>
    );
}
