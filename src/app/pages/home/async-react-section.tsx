"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import RPCAnimation from "./rpc-animation";

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
    label?: string;
    overlay?: React.ReactNode;
    serverActivity?: {
        db?: boolean;
        compute?: boolean;
        cloud?: boolean;
    };
    variant?: "default" | "vertical";
}

// --- REVISED TILE 1 & LAYOUT ---

const LayoutWrapper = ({ children, title, description, label, overlay, serverActivity, variant = "default" }: StageProps) => (
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
                            <div className="ml-2 h-3 w-32 bg-white/10 rounded-full" />
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
            <p className="text-sm text-slate-400 text-balance px-2 h-[40px]">
                {description}
            </p>
            <p className="text-xs text-[#F17543] font-mono mt-2 uppercase tracking-wide">{label}</p>
        </div>
    </div>
);


// --- TILE 1: THE REQUEST CYCLE ---
export function Tile1_AsyncEngine() {
    const [phase, setPhase] = React.useState<"idle" | "upward" | "processing" | "downward_skeleton" | "assembly" | "completed">("idle");
    const [showUI, setShowUI] = React.useState<"none" | "skeleton" | "content">("none");

    React.useEffect(() => {
        const sequence = async () => {
            while (true) {
                setPhase("idle");
                setShowUI("none");

                await new Promise(r => setTimeout(r, 300));

                setPhase("upward");
                await new Promise(r => setTimeout(r, 300));

                setPhase("processing");
                await new Promise(r => setTimeout(r, 300));

                // // Dot 1: Skeleton arrival
                setPhase("downward_skeleton");
                await new Promise(r => setTimeout(r, 500));
                setShowUI("skeleton");
                await new Promise(r => setTimeout(r, 500));

                setPhase("assembly");
                await new Promise(r => setTimeout(r, 1000));
                setShowUI("content");
                await new Promise(r => setTimeout(r, 1500));


                setPhase("completed");
                await new Promise(r => setTimeout(r, 3000));
            }
        };
        sequence();
    }, []);

    return (
        <LayoutWrapper
            title="The 'Async' Engine"
            description="Render and stream UI components seperately and asynchronously"
            serverActivity={{
                compute: phase === "processing",
                db: phase === "processing",
                cloud: phase !== "idle"
            }}
            overlay={
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
                    <AnimatePresence mode="wait">
                        {/* Phase 1: Request Packet (Upward) */}
                        {phase === "upward" && (
                            <motion.div
                                key="upward"
                                initial={{ left: "50%", top: "75%", opacity: 0, scale: 0.5 }}
                                animate={{ top: "20%", opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_#F17543]"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />
                        )}

                        {/* Phase 2: DB Query line flash & Return packet */}
                        {phase === "processing" && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="absolute inset-0"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.5, repeat: 1 }} // 1 second total
                                    className="absolute top-[20%] left-[50%] -translate-y-1/2 w-[12%] h-[1px] bg-orange-400"
                                    style={{ transform: "translateX(-100%)" }}
                                />
                                {/* Return packet to compute */}
                                <motion.div
                                    initial={{ left: "38%", top: "20%", opacity: 0 }}
                                    animate={{ left: "62%", opacity: 1 }}
                                    transition={{ delay: 1.0, duration: 0.5 }} // Starts after flash
                                    className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                                    style={{ transform: "translate(-50%, -50%)" }}
                                />
                            </motion.div>
                        )}

                        {/* Phase 3a: Response Packet 1 (Skeleton) */}
                        {phase === "downward_skeleton" && (
                            <motion.div
                                key="down_skeleton"
                                initial={{ left: "50%", top: "20%", opacity: 0, scale: 0.5 }}
                                animate={{ top: "75%", opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.8, ease: "easeIn" }}
                                className="absolute w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_#fbbf24]"
                                style={{ transform: "translate(-50%, -50%)" }}
                            />
                        )}



                        {/* Phase 4: Stream trailing packets during assembly */}
                        {phase === "assembly" && (
                            <motion.div
                                key="assembly"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="absolute inset-0"
                            >
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ left: "50%", top: "20%", opacity: 0 }}
                                        animate={{
                                            top: ["20%", "75%"],
                                            opacity: [0, 0.8, 0.8, 0]
                                        }}
                                        transition={{
                                            duration: 1.0,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "linear"
                                        }}
                                        className="absolute w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_6px_#F17543]"
                                        style={{ transform: "translate(-50%, -50%)" }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            }
        >
            <div className="w-full h-full flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {/* Stage 0: Initial Wait / Loading Bar */}
                    {showUI === "none" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col items-center gap-2"
                        >
                            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    className="h-full bg-orange-500/50"
                                    animate={{
                                        x: ["-100%", "100%"]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Stage 1: Skeleton (Initial Packet Arrival) - SIMPLER */}
                    {showUI === "skeleton" && (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-col gap-3 p-2"
                        >
                            <div className="w-2/3 h-4 bg-white/10 rounded animate-pulse" />
                            <div className="w-full h-8 bg-white/5 rounded animate-pulse" />
                            <div className="w-full h-8 bg-white/5 rounded animate-pulse" />
                            <div className="w-1/2 h-4 bg-white/10 rounded animate-pulse" />
                        </motion.div>
                    )}

                    {/* Stage 2: Content (Streaming & Completion) - ENRICHED */}
                    {showUI === "content" && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-full flex flex-col gap-4 p-2"
                        >
                            {/* Header / Profile */}
                            <motion.div
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-orange-500/40" />
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <div className="h-2.5 w-[60%] bg-white/20 rounded-full" />
                                    <div className="h-1.5 w-[30%] bg-white/10 rounded-full" />
                                </div>
                            </motion.div>

                            {/* Feed Items (Grid) */}
                            <div className="grid grid-cols-2 gap-3 flex-1">
                                {[1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 + (i * 0.1) }}
                                        className="h-20 bg-white/5 rounded-lg border border-white/10 p-2 flex flex-col justify-between"
                                    >
                                        <div className="h-6 w-full bg-white/10 rounded" />
                                        <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: phase === "completed" ? 1 : 0 }}
                                className="flex justify-between items-center"
                            >
                                <div className="text-[8px] text-white/30 font-mono">STREAMS_ACTIVE</div>
                                <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] text-green-500 font-mono">
                                    RENDER_SUCCESS
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LayoutWrapper>
    );
}




export function Tile2_StreamingBridge() {
    return (
        <LayoutWrapper
            title="Transparent RPC"
            description="Call server functions directly from your client components with full type safety."
            variant="vertical"
        >
            <RPCAnimation />
        </LayoutWrapper>
    );
}

export function Tile3_ActionLoop() {
    return (
        <LayoutWrapper
            title="The 'Action' Loop"
            description="Unified mutations with Server Actions and optimistic UI updates."
            label="State Sync"
        >
            <div className="w-full h-full flex items-center justify-center opacity-30 italic text-xs text-white/50">
                Visualizing...
            </div>
        </LayoutWrapper>
    );
}
