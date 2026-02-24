"use client";

import { useActivityData } from "./use-activity-data";
import { useState, useEffect } from "react";

const getUserId = () => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("rwsdk_user_id");
    if (!id) {
        id = Math.random().toString(36).substring(2, 6).toUpperCase();
        localStorage.setItem("rwsdk_user_id", id);
    }
    return id;
};

// Represents 60 bins for the 100% of the page height
const NUM_BINS = 60;
const BIN_SIZE = 100 / NUM_BINS;
const BINS = Array.from({ length: NUM_BINS }, (_, i) => i);

export default function RealtimeSection() {
    const [userId, setUserId] = useState<string | null>(null);
    const [showMinimap, setShowMinimap] = useState(false);

    // Animation states
    const [particles, setParticles] = useState<Array<{ id: number, bin: number, type: string }>>([]);

    useEffect(() => {
        setUserId(getUserId());

        // Hide the scrollbar physically on html and body while on the homepage
        document.documentElement.classList.add('hide-native-scrollbar');
        document.body.classList.add('hide-native-scrollbar');

        const handleScroll = () => {
            setShowMinimap(window.scrollY > 200); // 200px down to clear the header
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.documentElement.classList.remove('hide-native-scrollbar');
            document.body.classList.remove('hide-native-scrollbar');
        };
    }, []);

    const { stats, viewportRange, actionEvent } = useActivityData(userId);

    // Calculate current user's active bin index, clamping it to the maximum bin
    const currentActiveBinIndex = Math.min(NUM_BINS - 1, Math.floor(viewportRange.bottom / BIN_SIZE));

    // Fire particle animation whenever an action occurs
    useEffect(() => {
        if (!actionEvent) return;

        // Force the animation and highlight to spawn exactly on the cell "You" are tracking
        const actionBin = currentActiveBinIndex;

        // Add particle
        const newParticle = { id: actionEvent.id, bin: actionBin, type: actionEvent.type };
        setParticles(prev => [...prev, newParticle]);

        // Remove particle after animation completes (600ms)
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 600);
    }, [actionEvent, currentActiveBinIndex]);

    const scrollToPercent = (percent: number) => {
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const targetY = (percent / 100) * scrollHeight;
        // The minimap percentage represents the *bottom* of the user's viewport.
        // So we subtract the window height to find the actual top-edge scroll position,
        // and aggressively clamp it so it never evaluates out of bounds bounds (e.g., negative).
        const maxScroll = scrollHeight - window.innerHeight;
        const clampedTop = Math.max(0, Math.min(targetY - window.innerHeight, maxScroll));

        window.scrollTo({
            top: clampedTop,
            behavior: "smooth"
        });
    };

    // Safe destructuring of stats with fallbacks
    const scrollBins = stats?.scrollBins || {};
    const clickBins = stats?.clickBins || {};
    const activeViewports = stats?.activeViewports || {};

    const totalGlobalScrolls = Object.values(scrollBins).reduce((acc: any, val: any) => acc + val, 0) as number;
    const totalGlobalClicks = Object.values(clickBins).reduce((acc: any, val: any) => acc + val, 0) as number;

    return (
        <div>
            {/* The Cards from zip App.tsx wrapped around live data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Left Card */}
                <div className="bg-[#2b1810] border border-[#4a2b1f] rounded-[2.5rem] p-10 flex flex-col items-center justify-between min-h-[450px] shadow-2xl relative">
                    <div className="absolute top-8 left-8 flex items-center gap-3 font-mono text-[10px] text-[#d4b8a8] tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-[#f27d26]"></div>
                        YOUR SESSION: {userId ? `#${userId}` : '...'}
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center w-full mt-12">
                        <div className="w-28 h-36 border-[3px] border-[#e8d5c4]/20 rounded-[3rem] flex items-center justify-center mb-10">
                            <span className="text-[#e8d5c4] text-7xl font-light">0</span>
                        </div>
                        <div className="text-[#d4b8a8] font-mono text-xs tracking-widest mb-8">YOUR CONTRIBUTIONS</div>
                        <button className="bg-[#e8d5c4] text-[#2b1810] font-medium px-10 py-4 rounded-xl hover:bg-white transition-colors w-full max-w-[220px] text-sm">
                            Increment
                        </button>
                    </div>

                    <div className="font-mono text-[10px] text-[#d4b8a8]/60 tracking-widest mt-10">
                        SYNCING TO GLOBAL DB VIA BINARY DELTA
                    </div>
                </div>

                {/* Right Card */}
                <div className="bg-[#2b1810] border border-[#4a2b1f] rounded-[2.5rem] p-10 flex flex-col min-h-[450px] shadow-2xl relative">
                    <div className="flex justify-between items-start mb-16">
                        <div className="font-mono text-[10px] text-[#d4b8a8] tracking-widest">
                            COLLECTIVE ACTIVITY
                        </div>
                        <div className="flex items-center gap-2 bg-green-950/30 text-green-400 px-3 py-1.5 rounded-md text-[10px] font-mono border border-green-900/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                            LIVE
                        </div>
                    </div>

                    <div className="mb-auto">
                        <div className="flex items-baseline gap-4">
                            <span className="text-[#e8d5c4] text-6xl font-light tracking-tight">{totalGlobalScrolls + totalGlobalClicks}</span>
                            <span className="text-[#d4b8a8] font-mono text-xs tracking-widest">INTERACTIONS</span>
                        </div>
                    </div>

                    <div className="mt-16">
                        {/* Chart */}
                        <div className="h-36 flex items-end gap-1.5 mb-6">
                            {[40, 30, 60, 40, 80, 50, 30, 40, 90, 60, 40, 30, 50, 70, 40, 30, 20].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#5c3a21] rounded-t-sm hover:bg-[#f27d26] transition-colors" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-[#d4b8a8] text-xs max-w-[220px] leading-relaxed font-light">
                                Aggregated server-side from all connected client buckets.
                            </p>
                            <div className="text-right">
                                <div className="text-[#d4b8a8] font-mono text-[10px] tracking-widest mb-1">LAST 24</div>
                                <div className="text-[#d4b8a8] font-mono text-[10px] tracking-widest">HOURS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`fixed right-0 top-0 h-screen w-[16px] z-[100] flex flex-col justify-center transition-all duration-700 pointer-events-none ${showMinimap ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
            >
                <div className="relative flex flex-col items-end w-full h-full justify-center">

                    {/* Floating labels for 'You' and other active readers tracking their current cell */}
                    {BINS.map(binIndex => {
                        const isCurrentUserHere = binIndex === currentActiveBinIndex;

                        let otherCount = 0;
                        Object.entries(activeViewports).forEach(([uid, viewportPercent]) => {
                            if (uid !== userId) {
                                const otherActiveBinIndex = Math.min(NUM_BINS - 1, Math.floor((viewportPercent as number) / BIN_SIZE));
                                if (otherActiveBinIndex === binIndex) otherCount++;
                            }
                        });

                        if (!isCurrentUserHere && otherCount === 0) return null;

                        const isOnlyYou = isCurrentUserHere && otherCount === 0;
                        const isBoth = isCurrentUserHere && otherCount > 0;
                        const isOnlyOthers = !isCurrentUserHere && otherCount > 0;

                        let text = "";
                        let textColor = "";
                        let lineColor = "";
                        let zIndex = "";

                        if (isOnlyYou) {
                            text = "You";
                            textColor = "text-slate-500";
                            lineColor = "bg-slate-400";
                            zIndex = "z-40";
                        } else if (isBoth) {
                            text = `You +${otherCount}`;
                            textColor = "text-slate-500";
                            lineColor = "bg-slate-400";
                            zIndex = "z-40";
                        } else if (isOnlyOthers) {
                            text = `+${otherCount}`;
                            textColor = "text-slate-600";
                            lineColor = "bg-slate-600";
                            zIndex = "z-30";
                        }

                        return (
                            <div
                                key={`indicator-${binIndex}`}
                                className={`absolute right-[12px] flex items-center justify-end gap-1.5 flex-row transition-all duration-300 ease-out ${zIndex} opacity-100 pointer-events-none w-max`}
                                style={{
                                    top: `${((binIndex + 0.5) / NUM_BINS) * 100}%`,
                                    transform: 'translateY(-50%)',
                                    marginTop: '0px'
                                }}
                            >
                                <span className={`text-[10px] whitespace-nowrap font-mono font-semibold ${textColor} uppercase leading-none tracking-widest drop-shadow-sm`}>
                                    {text}
                                </span>
                                <div className={`w-1 h-[1px] ${lineColor}`} />
                            </div>
                        );
                    })}

                    <div
                        className="relative flex flex-col justify-center gap-0 h-full bg-transparent py-0 pr-1 rounded-l-md pointer-events-auto group"
                        title="Activity Minimap: Click a cell to scroll"
                    >
                        {BINS.map((binIndex) => {
                            const startPct = binIndex * BIN_SIZE;
                            const endPct = (binIndex + 1) * BIN_SIZE;

                            let scrollHeat = 0;
                            let clickHeat = 0;
                            for (let p = Math.floor(startPct); p < Math.ceil(endPct); p++) {
                                scrollHeat += scrollBins[p] || 0;
                                clickHeat += clickBins[p] || 0;
                            }

                            // Score scrolls and clicks exactly the same (+1 each)
                            const totalHeat = scrollHeat + clickHeat;

                            // GitHub style activity colors
                            let bgColorClass = "bg-black/5 border-transparent"; // Empty/Cold
                            if (totalHeat > 8) bgColorClass = "bg-[#39D353]/80 border-transparent"; // Hottest
                            else if (totalHeat > 4) bgColorClass = "bg-[#26A641]/80 border-transparent";
                            else if (totalHeat > 2) bgColorClass = "bg-[#006D32]/80 border-transparent";
                            else if (totalHeat > 0) bgColorClass = "bg-[#0E4429]/80 border-transparent"; // Warm

                            // Is the current user bottom anchored here?
                            const isCurrentUserBottom = binIndex === currentActiveBinIndex;

                            // Does this bin have an active particle animation right now?
                            const activeParticlesInBin = particles.filter(p => p.bin === binIndex);
                            const justAnimated = activeParticlesInBin.length > 0;

                            // Is another active user bottom anchored here?
                            const isOtherUserBottom = Object.entries(activeViewports).some(([uid, viewportPercent]) => {
                                if (uid === userId) return false;
                                const otherActiveBinIndex = Math.min(NUM_BINS - 1, Math.floor(viewportPercent / BIN_SIZE));
                                return binIndex === otherActiveBinIndex;
                            });

                            return (
                                <div
                                    key={binIndex}
                                    onClick={() => scrollToPercent(startPct)}
                                    title={`Total interactions: ${totalHeat}`}
                                    className={`w-[8px] flex-1 rounded-[1px] cursor-pointer transition-all duration-300 relative flex items-center justify-center border border-solid ${bgColorClass} hover:bg-white/20 hover:border-white/30 ${justAnimated ? 'scale-[1.2] shadow-[0_0_8px_rgba(255,255,255,0.2)] brightness-125 z-30' : 'z-10'} my-[1px]`}
                                >

                                    {/* Particle Animation coming from the 'You' label */}
                                    {activeParticlesInBin.map((p, i) => (
                                        <div
                                            key={`${p.id}-${i}`}
                                            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-2 h-[2px] bg-white rounded-full z-50 pointer-events-none animate-[slideInRight_0.3s_ease-out_forwards]"
                                        />
                                    ))}

                                    {/* Current User Bottom Highlight */}
                                    {isCurrentUserBottom && (
                                        <div className="absolute inset-[-1px] rounded-[2px] border-[1.5px] border-orange-500 z-20 pointer-events-none" />
                                    )}

                                    {/* Other Active Users Indicator (Subtle Hollow Box) */}
                                    {isOtherUserBottom && !isCurrentUserBottom && (
                                        <div className="absolute inset-[0px] border border-slate-600/50 rounded-[1px] z-10 animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
                                    )}
                                </div>
                            );
                        })}

                        {/* Floating Label / Legend */}
                        <div className="absolute w-[200px] left-[-230px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex py-4 justify-end z-50">
                            <div className="bg-[#2b1810] text-[#e8d5c4] border border-[#4a2b1f] px-4 py-3 rounded-lg text-xs font-mono shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col gap-3">
                                <div className="font-bold text-[#d4b8a8] uppercase tracking-widest text-[10px] pb-1 border-b border-[#4a2b1f] flex justify-between items-center">
                                    <span>Activity Map</span>
                                    <span className="text-[#e8d5c4]/40">{totalGlobalScrolls + totalGlobalClicks} Total</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3d241a] border-[1.5px] border-orange-500 shadow-[0_0_4px_rgba(232,213,196,0.2)]" />
                                        <span className="text-[#e8d5c4]">You</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 bg-[#3d241a] border-[1.5px] border-[#5c3a21] rounded-[2px]" />
                                        <span className="text-[#e8d5c4]">Other Readers</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex justify-between text-[10px] text-[#d4b8a8]">
                                        <span>Scroll Pauses</span>
                                        <span className="text-[#e8d5c4] font-bold">{totalGlobalScrolls}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-[#d4b8a8]">
                                        <span>Clicks</span>
                                        <span className="text-[#e8d5c4] font-bold">{totalGlobalClicks}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 mt-1 pt-2 border-t border-[#4a2b1f]">
                                    <span className="text-[10px] text-[#d4b8a8]">Activity Level</span>
                                    <div className="flex items-center justify-between text-[10px] text-[#e8d5c4]/60">
                                        Less
                                        <div className="flex gap-[3px]">
                                            <div className="w-2 h-2 rounded-[1px] bg-[#3d241a] border border-[#4a2b1f]" />
                                            <div className="w-2 h-2 rounded-[1px] bg-[#5c3a21] border border-[#4a2b1f]" />
                                            <div className="w-2 h-2 rounded-[1px] bg-[#8c5a35] border border-[#5c3a21]" />
                                            <div className="w-2 h-2 rounded-[1px] bg-[#bf7d4a] border border-[#8c5a35]" />
                                            <div className="w-2 h-2 rounded-[1px] bg-[#f27d26] border border-[#bf7d4a]" />
                                        </div>
                                        More
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Inject local keyframes for the particle animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideInRight {
                    0% { transform: translate(-10px, -50%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(10px, -50%); opacity: 0; width: 4px; }
                }
            `}} />
        </div>
    );
}
