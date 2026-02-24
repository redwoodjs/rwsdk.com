"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight } from "prism-react-renderer";
import { rwsdkCodeTheme } from "./styled-code-block";

const CODE_SNIPPET = `// actions.ts
export const saveData = 
  async (text: string) => {
    await db.save(text);
  };`;

export default function RPCAnimation() {
    const [phase, setPhase] = useState<"cursor" | "click" | "label" | "travel" | "server" | "resolve">("cursor");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const runSequence = async () => {
            while (true) {
                setPhase("cursor");
                await new Promise(r => timeoutId = setTimeout(r, 1500)); // Time for cursor to move

                setPhase("click");
                await new Promise(r => timeoutId = setTimeout(r, 300));

                setPhase("label");
                await new Promise(r => timeoutId = setTimeout(r, 800));

                setPhase("travel");
                await new Promise(r => timeoutId = setTimeout(r, 800));

                setPhase("server");
                await new Promise(r => timeoutId = setTimeout(r, 1200));

                setPhase("resolve");
                await new Promise(r => timeoutId = setTimeout(r, 2000));
            }
        };
        runSequence();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex flex-col items-stretch">

            {/* --- Top Section: Server Runtime (40%) --- */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-white/[0.02] border-b border-white/5 overflow-hidden flex flex-col items-center">
                <div className="text-[7px] absolute top-2 right-4 uppercase tracking-[0.2em] text-white/10 font-mono font-bold">
                    Server Runtime
                </div>

                <div className="mt-6 font-mono text-[9px] leading-tight relative z-10 w-full px-4">
                    <Highlight code={CODE_SNIPPET} language="tsx" theme={rwsdkCodeTheme}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={className} style={{ ...style, background: "transparent" }}>
                                {tokens.map((line, i) => {
                                    const { key: _lineKey, ...lineProps } = getLineProps({ line, key: i });
                                    const isSaveDataLine = line.some(t => t.content.includes("saveData"));
                                    const isDbLine = line.some(t => t.content.includes("db.save"));

                                    return (
                                        <motion.div
                                            key={i}
                                            {...lineProps}
                                            animate={{
                                                x: (isDbLine && phase === "server") ? [0, 1, -1, 0] : 0,
                                                filter: (isDbLine && phase === "server") ? "drop-shadow(0 0 8px rgba(241, 117, 67, 0.4))" : "none"
                                            }}
                                            className={`relative px-1 py-0.5 rounded transition-all duration-300 ${isSaveDataLine && (phase === "label" || phase === "travel") ? "bg-[#3B82F6]/5 ring-1 ring-[#3B82F6]/10" : ""} ${isDbLine && phase === "server" ? "bg-[#F17543]/20 ring-1 ring-[#F17543]/40 shadow-[0_0_20px_rgba(241,117,67,0.15)]" : ""}`}
                                        >
                                            {isDbLine && phase === "server" && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F17543]/30 to-transparent z-0"
                                                    animate={{ x: ["-100%", "100%"] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}

                                            {line.map((token, k) => {
                                                const { key: _tokenKey, ...tokenProps } = getTokenProps({ token, key: k });
                                                return (
                                                    <span
                                                        key={k}
                                                        {...tokenProps}
                                                        className={`relative z-10 transition-colors duration-300 ${isSaveDataLine && (phase === "label" || phase === "travel") && token.content === "saveData" ? "text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" : ""} ${isDbLine && phase === "server" ? "text-white brightness-125" : ""}`}
                                                    />
                                                );
                                            })}
                                        </motion.div>
                                    );
                                })}
                            </pre>
                        )}
                    </Highlight>
                </div>

                {/* Response Pulse (Visual only) */}
                <AnimatePresence>
                    {phase === "server" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#F17543]/5 pointer-events-none z-10"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Vertical Conduit */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1px] h-[10%] bg-gradient-to-b from-white/20 to-transparent z-0" />

            {/* Boundary Label reveal (Step 2) */}
            <AnimatePresence>
                {(phase === "label" || phase === "travel") && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3B82F6]/20 backdrop-blur-sm border border-[#3B82F6]/40 px-2 py-0.5 rounded text-[8px] font-mono text-[#3B82F6] font-bold z-30 shadow-2xl"
                    >
                        saveData("...")
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Traveling Dot (Step 3) - Global to bridge segments */}
            <AnimatePresence>
                {phase === "travel" && (
                    <motion.div className="absolute inset-0 pointer-events-none z-40 flex justify-center">
                        <motion.div
                            initial={{ top: "75%", opacity: 0, scale: 0.5 }}
                            animate={{
                                top: ["75%", "20%"],
                                opacity: [0, 1, 1],
                                scale: [0.5, 1, 1]
                            }}
                            exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_15px_#3B82F6] flex items-center justify-center"
                        >
                            <div className="absolute top-full w-1.5 h-10 bg-gradient-to-b from-[#3B82F6]/40 to-transparent blur-[1px]" />
                            <div className="absolute top-1/2 left-5 -translate-y-1/2 whitespace-nowrap text-[7px] bg-black/80 border border-white/20 px-1.5 py-0.5 rounded-full text-[#E9B46A] font-mono shadow-xl">
                                string
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Bottom Section: Client Runtime (Browser Window) --- */}
            <div className="absolute bottom-4 left-4 right-4 top-[50%] bg-[#2b1810] rounded-lg border border-[#4a2b1f] shadow-2xl overflow-hidden flex flex-col z-20">
                <div className="h-6 bg-[#3d241a] border-b border-[#4a2b1f] flex items-center px-2 gap-1.5 shrink-0 relative">
                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    <div className="ml-2 h-3 w-32 bg-white/10 rounded-full" />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-2 relative">
                    <div className="relative">
                        <motion.div
                            animate={{
                                opacity: (phase === "cursor" || phase === "click") ? 0.05 : 0.1,
                                scale: (phase === "cursor" || phase === "click") ? 1 : 1.1
                            }}
                            className="absolute inset-0 bg-[#F17543] blur-[15px] rounded-full"
                        />

                        <motion.div
                            animate={{
                                scale: phase === "click" ? 0.92 : phase === "resolve" ? [1, 1.05, 1] : 1,
                                backgroundColor: phase === "resolve" ? "#22c55e" : "#3d241a"
                            }}
                            className={`
                  relative px-4 py-2 rounded font-bold text-[9px] tracking-wide overflow-hidden
                  transition-colors duration-400 ease-out
                  ${phase === "resolve" ? "text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "text-[#e8d5c4]/90 border border-[#4a2b1f]"}
                  shadow-[0_2px_8px_-1px_rgba(0,0,0,0.5)]
              `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            <span className="relative z-10 flex items-center gap-2">
                                {phase === "resolve" ? "✓ Saved" : "Save Data"}
                            </span>
                        </motion.div>
                    </div>

                    {/* Animated Cursor (Step 1) */}
                    <AnimatePresence>
                        {phase === "cursor" && (
                            <motion.div
                                initial={{ x: 60, y: 60, opacity: 0 }}
                                animate={{ x: 25, y: 12, opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute pointer-events-none z-50 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5.5 3.5L11 18.5L13.5 13L19 10.5L5.5 3.5Z" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Global Return Pulse */}
            <AnimatePresence>
                {phase === "resolve" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                        <motion.div
                            initial={{ y: -40, opacity: 0, scale: 0.5 }}
                            animate={{ y: 20, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md">
                                <span className="text-lg mt-0.5">🤝</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
