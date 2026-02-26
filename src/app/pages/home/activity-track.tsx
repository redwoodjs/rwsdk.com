"use client";

import { useActivityData } from "./use-activity-data";
import { useState, useEffect, startTransition } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";

const getUserId = () => {
    if (typeof window === "undefined") return null;
    let id = sessionStorage.getItem("rwsdk_user_id");
    if (!id) {
        id = Math.random().toString(36).substring(2, 6).toUpperCase();
        sessionStorage.setItem("rwsdk_user_id", id);
    }
    return id;
};

// For the graph, we need points spanning 0-100% horizontally.
// We'll use 80 bins for higher fidelity waveform graph data
const NUM_BINS = 80;
const BIN_SIZE = 100 / NUM_BINS;
const BINS = Array.from({ length: NUM_BINS }, (_, i) => i);

export function RealtimeCounter() {
    const [userId, setUserId] = useState<string | null>(null);
    const [count, setCount] = useSyncedState<number>(0, 'global-count');
    const [optimisticCount, setOptimisticCount] = useState<number | null>(null);

    useEffect(() => {
        setUserId(getUserId());
    }, []);

    useEffect(() => {
        setOptimisticCount(null);
    }, [count]);

    const handleIncrement = () => {
        const nextValue = (optimisticCount !== null ? optimisticCount : (count || 0)) + 1;
        setOptimisticCount(nextValue);
        startTransition(() => {
            setCount(c => (c || 0) + 1);
        });
    };

    return (
        <div className="bg-[#2b1810] dark:bg-dark-panel rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-between min-h-[450px] shadow-2xl relative border border-[#4a2b1f] dark:border-dark-border w-full transition-colors duration-200">
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#d4b8a8] dark:text-dark-secondary tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-dark-accent"></div>
                    YOUR SESSION: {userId ? `#${userId}` : '...'}
                </div>
                <div className="flex items-center gap-2 bg-green-950/30 dark:bg-dark-success-bg text-green-400 dark:text-dark-success-text px-3 py-1.5 rounded-md text-[10px] font-mono border border-green-900/50 dark:border-dark-success-border transition-colors duration-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-dark-success-text animate-pulse"></div>
                    LIVE
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full mt-12">
                <div className="min-w-32 h-36 px-8 border-[3px] border-dark-primary/20 rounded-[3rem] flex items-center justify-center mb-10 transition-transform active:scale-95 duration-150">
                    <span className="text-dark-primary text-7xl font-light tabular-nums">{optimisticCount !== null ? optimisticCount : (count || 0)}</span>
                </div>
                <button
                    onClick={handleIncrement}
                    className="bg-dark-primary text-dark-panel font-medium px-10 py-4 rounded-xl hover:bg-white transition-all w-full max-w-[220px] text-sm active:scale-95"
                >
                    Increment
                </button>
            </div>

            <div className="font-mono text-[10px] text-[#d4b8a8]/60 dark:text-dark-secondary/60 tracking-widest mt-10 uppercase text-center">
                Syncing to Cloudflare KV
            </div>
        </div>
    );
}

export default function ActivityTrack() {
    const [userId, setUserId] = useState<string | null>(null);
    const [showMinimap, setShowMinimap] = useState(false);
    const [unreachableBins, setUnreachableBins] = useState(0);

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

        const updateUnreachable = () => {
            const sh = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (sh > 0) {
                const minPct = (window.innerHeight / sh) * 100;
                setUnreachableBins(Math.floor(minPct / BIN_SIZE));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener('resize', updateUnreachable);
        // Initial check
        handleScroll();
        updateUnreachable();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', updateUnreachable);
            document.documentElement.classList.remove('hide-native-scrollbar');
            document.body.classList.remove('hide-native-scrollbar');
        };
    }, []);

    const { stats, activeViewports, viewportRange } = useActivityData(userId, (event) => {
        startTransition(() => {
            const actionBin = Math.min(NUM_BINS - 1, Math.floor(event.percent / BIN_SIZE));
            const newParticle = { id: event.id, bin: actionBin, type: event.type };
            setParticles(prev => [...prev, newParticle]);

            setTimeout(() => {
                startTransition(() => {
                    setParticles(prev => prev.filter(p => p.id !== newParticle.id));
                });
            }, 600);
        });
    });

    // Calculate current user's active bin index, clamping it to the maximum bin
    const currentActiveBinIndex = Math.min(NUM_BINS - 1, Math.floor(viewportRange.bottom / BIN_SIZE));

    const scrollToPercent = (percent: number) => {
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        // Target the center of the bin to ensure the mathematics reliably floor to the correct active bin
        const targetPercent = percent + (BIN_SIZE / 2);
        const targetY = (targetPercent / 100) * scrollHeight;

        // The stored percentage corresponds to the BOTTOM of the viewport
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

    const totalGlobalScrolls = Object.values(scrollBins).reduce((acc: any, val: any) => acc + val, 0) as number;
    const totalGlobalClicks = Object.values(clickBins).reduce((acc: any, val: any) => acc + val, 0) as number;

    // --- Graph Math: Spline Generation (Catmull-Rom to Cubic Bezier) ---
    // Generate an array of heat scores per bin (x = % width, y = heat severity)
    const heatData = BINS.map(binIndex => {
        const startPct = binIndex * BIN_SIZE;
        const endPct = (binIndex + 1) * BIN_SIZE;
        let heat = 0;
        for (let p = Math.floor(startPct); p <= Math.ceil(endPct); p++) {
            heat += (scrollBins[p] || 0) + (clickBins[p] || 0);
        }
        return heat;
    });

    const reachableBinsCount = NUM_BINS - unreachableBins;
    const VISUAL_BIN_SIZE = 100 / Math.max(1, reachableBinsCount);

    // Slice off unreachable heat data for scaling properly
    const reachableHeatData = heatData.slice(unreachableBins);
    const maxHeat = Math.max(1, ...reachableHeatData); // avoid div by zero

    const pointsNormalized = reachableHeatData.map((heat, i) => {
        return {
            x: i * VISUAL_BIN_SIZE + (VISUAL_BIN_SIZE / 2),
            // Boost small blips, cap massive spikes so graph stays relatively "organic"
            // Multiply by 0.85 to make provision for the top edge so stroke/glow isn't cut off
            y: Math.pow(heat / maxHeat, 0.4) * 0.85
        };
    });

    // We add padding points outside 0-100% to ensure spline doesn't curve weirdly down the ends
    const pts = [
        { x: -5, y: 0 },
        { x: 0, y: pointsNormalized[0].y },
        ...pointsNormalized,
        { x: 100, y: pointsNormalized[pointsNormalized.length - 1].y },
        { x: 105, y: 0 }
    ];

    // Helper to generate bezier curving spline commands with tension ~0.4
    const buildCatmullRomPath = (points: { x: number, y: number }[], tension = 0.45) => {
        let pathString = `M ${points[1].x} ${points[1].y * 100}`;
        for (let i = 1; i < points.length - 2; i++) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2];

            // Calculate bezier control points
            const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
            const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
            const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
            const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

            // Flip Y so higher heat goes UP (subtract from 100/max height)
            pathString += ` C ${cp1x.toFixed(2)} ${(1 - Math.max(0, cp1y)).toFixed(3)}, ${cp2x.toFixed(2)} ${(1 - Math.max(0, cp2y)).toFixed(3)}, ${p2.x.toFixed(2)} ${(1 - Math.max(0, Math.min(1, p2.y))).toFixed(3)}`;
        }
        return pathString;
    };

    const graphD = buildCatmullRomPath(pts, 0.4);

    // Calculate dynamic user coordinates along the X-axis for position markers
    const userXPctRaw = viewportRange.bottom;
    const userAbsoluteBinIndex = Math.min(NUM_BINS - 1, Math.floor(userXPctRaw / BIN_SIZE));
    const userVisualBinIndex = Math.max(0, userAbsoluteBinIndex - unreachableBins);
    const userXPct = userVisualBinIndex * VISUAL_BIN_SIZE + (VISUAL_BIN_SIZE / 2); // Center of the visual bin

    // Need to find exactly what percentage height our current bin corresponds to.
    const userBinBaseY = Math.max(0, Math.min(1, pointsNormalized[userVisualBinIndex]?.y || 0));

    // Y pixel = Max Height (60) - (Height * UserBinY)
    const userYPx = 60 - (60 * userBinBaseY);

    // Generate smooth area graph path for collective activity (YouTube heatmap style)
    const rawHeatData = [40, 30, 60, 40, 80, 50, 30, 40, 90, 60, 40, 30, 50, 70, 40, 30, 20];
    const globalMaxHeat = Math.max(...rawHeatData);
    const heatPoints = rawHeatData.map((v, i) => ({
        x: i * (100 / (rawHeatData.length - 1)),
        y: 100 - (v / globalMaxHeat * 90) // max height reaches 90%
    }));

    let heatLineD = `M ${heatPoints[0].x},${heatPoints[0].y}`;
    for (let i = 1; i < heatPoints.length; i++) {
        const prev = heatPoints[i - 1];
        const curr = heatPoints[i];
        const cpX = (prev.x + curr.x) / 2;
        heatLineD += ` C ${cpX},${prev.y} ${cpX},${curr.y} ${curr.x},${curr.y}`;
    }
    const heatAreaD = `${heatLineD} L 100,100 L 0,100 Z`;

    return (
        <div>

            <div
                className={`fixed right-0 left-0 bottom-0 w-full h-[60px] z-[100] flex flex-col justify-end transition-all duration-700 pointer-events-none ${showMinimap ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
            >
                <div className="relative flex items-end w-full h-[60px] pointer-events-auto group">

                    {/* Graph SVG Base */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 100 1">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(74,43,31,0.15)" className="dark:stop-color-[rgba(244,235,225,0.15)]" />
                                <stop offset="40%" stopColor="rgba(74,43,31,0.05)" className="dark:stop-color-[rgba(244,235,225,0.05)]" />
                                <stop offset="100%" stopColor="rgba(43,24,16,0.6)" className="dark:stop-color-[rgba(10,10,10,0.8)]" />
                            </linearGradient>
                        </defs>

                        {/* Fill / Area under the curve */}
                        <path
                            d={`${graphD} L 100 1 L 0 1 Z`}
                            fill="url(#areaGradient)"
                            pointerEvents="none"
                        />

                        {/* Dark Border / Glow underneath the white line */}
                        <path
                            d={graphD}
                            fill="none"
                            stroke="#000000"
                            strokeWidth="0.04" /* Thicker than the white line */
                            strokeLinecap="round"
                            className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] dark:stroke-dark-bg"
                            pointerEvents="none"
                        />

                        {/* Glowing Line */}
                        <path
                            d={graphD}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.015" /* ~ 1.5px in viewbox scaling coords */
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] dark:stroke-dark-primary/60 dark:drop-shadow-[0_0_8px_rgba(244,235,225,0.4)]"
                            pointerEvents="none"
                        />
                    </svg>

                    {/* Beam Animation Layer for particles (clicks and pauses) */}
                    <div className="absolute inset-0 z-[15] pointer-events-none">
                        {particles.map((p, i) => {
                            if (p.bin < unreachableBins) return null;
                            const visualBinIndex = p.bin - unreachableBins;
                            const startPct = visualBinIndex * VISUAL_BIN_SIZE;

                            const isClick = p.type === 'click';
                            // Clicks get the fiery orange beam, scrolls/pauses get a subtle white beam
                            const gradientColor = isClick ? "from-dark-accent/80" : "from-white/40 dark:from-dark-primary/30";

                            return (
                                <div
                                    key={`${p.id}-${i}`}
                                    className={`absolute bottom-0 h-full bg-gradient-to-t ${gradientColor} to-transparent animate-[beamFade_0.6s_ease-out_forwards]`}
                                    style={{
                                        left: `${startPct}%`,
                                        width: `${VISUAL_BIN_SIZE}%`
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Click layer grid mapping bins horizontally */}
                    <div className="absolute inset-0 z-20 w-full h-full flex" title="Activity Track: Click to scroll">
                        {BINS.slice(unreachableBins).map(binIndex => {
                            const startPct = binIndex * BIN_SIZE;
                            const heat = heatData[binIndex];
                            return (
                                <div
                                    key={binIndex}
                                    onClick={() => scrollToPercent(startPct)}
                                    className="h-full flex-1 cursor-pointer hover:bg-white/10 transition-colors relative group/bin"
                                >
                                    {/* Hover popup with interaction count */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bin:opacity-100 transition-opacity pointer-events-none bg-[#2b1810] dark:bg-dark-panel text-dark-primary border border-[#4a2b1f] dark:border-dark-border px-3 py-1.5 rounded-lg text-[10px] font-mono shadow-[0_0_20px_rgba(0,0,0,0.8)] z-[60] whitespace-nowrap flex flex-col items-center">
                                        <span className="text-[#d4b8a8] dark:text-dark-secondary pb-1 border-b border-dark-border/50 w-full text-center mb-1">SECTION {binIndex + 1}</span>
                                        <span className="font-bold text-xs">{heat} <span className="font-normal text-[#d4b8a8]/60 dark:text-dark-secondary/60 text-[10px]">Interactions</span></span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Standalone Indicators (Hovering on the line) */}
                    <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-30">
                        {/* Other People Indicator Dots (White) */}
                        {Object.entries(activeViewports).map(([uid, viewportPercent]) => {
                            if (uid === userId) return null; // Handled separately below

                            const otherAbsoluteBinIndex = Math.min(NUM_BINS - 1, Math.floor(viewportPercent / BIN_SIZE));
                            if (otherAbsoluteBinIndex < unreachableBins) return null;

                            const otherVisualBinIndex = Math.max(0, otherAbsoluteBinIndex - unreachableBins);
                            const otherCenterX = otherVisualBinIndex * VISUAL_BIN_SIZE + (VISUAL_BIN_SIZE / 2);
                            const otherBinY = Math.max(0, Math.min(1, pointsNormalized[otherVisualBinIndex]?.y || 0));
                            const otherYPx = 60 - (60 * otherBinY);

                            return (
                                <div
                                    key={uid}
                                    className="absolute w-3 h-3 rounded-full bg-white border-2 border-dark-panel transition-all duration-75 ease-linear pointer-events-none"
                                    style={{
                                        left: `calc(${otherCenterX}% - 6px)`,
                                        top: `${otherYPx - 6}px`
                                    }}
                                />
                            );
                        })}

                        {/* Current User Dot (Red, glowing) */}
                        <div
                            className="absolute w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-[0_0_12px_rgba(239,68,68,0.8)] z-40 transition-all duration-75 ease-linear pointer-events-none"
                            style={{
                                left: `calc(${userXPct}% - 6px)`,
                                top: `${userYPx - 6}px`
                            }}
                        />
                    </div>

                    {/* Simple Graph Legend Hover */}
                    <div className="absolute -top-14 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#2b1810] dark:bg-dark-panel text-dark-primary border border-[#4a2b1f] dark:border-dark-border px-4 py-2 rounded-lg text-xs font-mono shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
                            <span>You</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white/60" />
                            <span>Others</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inject local keyframes for the particle animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes beamFade {
                    0% { opacity: 1; transform: scaleY(0.5); transform-origin: bottom; }
                    20% { opacity: 1; transform: scaleY(1); }
                    100% { opacity: 0; transform: scaleY(1); }
                }
            `}} />
        </div>
    );
}
