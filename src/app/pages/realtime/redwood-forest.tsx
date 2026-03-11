"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tree = {
    id: string;
    seed: number;       // procedural generation key
    slot: number;       // 0–15 grid position
    growth: number;     // 0 = sapling, increments on click (max ~10)
    plantedBy: string;
};

type ForestState = {
    days?: Record<string, (Tree | null)[]>; // Legacy
    globalSlots?: (Tree | null)[];
};

const MAX_GROWTH = 10;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getToday = () => new Date().toISOString().slice(0, 10);

const getUserId = () => {
    if (typeof window === "undefined") return "anon";
    let id = sessionStorage.getItem("rwsdk_forest_uid");
    if (!id) {
        id = Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem("rwsdk_forest_uid", id);
    }
    return id;
};

/** Seeded PRNG (mulberry32) — deterministic from seed. */
function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ─── Isometric Pixel Art Tree Generator ──────────────────────────────────────

const TREE_W = 36;
const TREE_H = 64;

/**
 * Draw a unique isometric-style 8-bit pixel art redwood tree at a given
 * growth stage. Growth 0 = tiny sapling, growth MAX_GROWTH = fully grown giant.
 *
 * Three archetypes provide distinct silhouettes:
 *   - Columnar: tall & narrow, classic coast redwood
 *   - Spreading: wider canopy, more branches
 *   - Ancient: massive trunk with gnarled features
 */
function generateTreeImage(seed: number, growth: number): string {
    const rng = mulberry32(seed);
    const r = () => rng();

    const canvas = document.createElement("canvas");
    canvas.width = TREE_W;
    canvas.height = TREE_H;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const stage = Math.min(1, growth / MAX_GROWTH);

    // ── Archetype selection (deterministic per seed) ──
    const archRoll = r();
    const archetype = archRoll < 0.45 ? "columnar" : archRoll < 0.75 ? "spreading" : "ancient";

    // ── Seed-driven variation (wider ranges for more variety) ──
    const heightVar = r();
    const widthVar = r();
    const canopyVar = r();
    const densityVar = r(); // canopy density

    // Base dimensions by archetype
    let baseHeight: number, maxExtraHeight: number;
    let baseTrunkW: number, maxTrunkWGrowth: number;
    let baseTiers: number, maxExtraTiers: number;
    let baseCanopyW: number, maxExtraCanopyW: number;
    let canopyStart: number; // how far up the trunk before canopy begins (0=ground, 1=top)

    if (archetype === "columnar") {
        baseHeight = 10 + heightVar * 6;        // 10–16
        maxExtraHeight = 28 + heightVar * 14;    // tallest
        baseTrunkW = 2;
        maxTrunkWGrowth = 2.5;
        baseTiers = 3 + Math.floor(canopyVar * 2);
        maxExtraTiers = 3 + Math.floor(canopyVar * 3);
        baseCanopyW = 5 + canopyVar * 3;
        maxExtraCanopyW = 6 + canopyVar * 5;     // narrower
        canopyStart = 0.55 + canopyVar * 0.15;    // canopy only in upper half
    } else if (archetype === "spreading") {
        baseHeight = 8 + heightVar * 5;
        maxExtraHeight = 20 + heightVar * 12;
        baseTrunkW = 2 + widthVar;
        maxTrunkWGrowth = 3;
        baseTiers = 2 + Math.floor(canopyVar * 2);
        maxExtraTiers = 3 + Math.floor(canopyVar * 4);
        baseCanopyW = 7 + canopyVar * 4;
        maxExtraCanopyW = 10 + canopyVar * 8;     // widest
        canopyStart = 0.35 + canopyVar * 0.15;
    } else { // ancient
        baseHeight = 9 + heightVar * 5;
        maxExtraHeight = 24 + heightVar * 14;
        baseTrunkW = 3 + widthVar;
        maxTrunkWGrowth = 4;
        baseTiers = 2 + Math.floor(canopyVar);
        maxExtraTiers = 2 + Math.floor(canopyVar * 3);
        baseCanopyW = 6 + canopyVar * 3;
        maxExtraCanopyW = 8 + canopyVar * 6;
        canopyStart = 0.45 + canopyVar * 0.2;
    }

    const leanDir = r() > 0.5 ? 1 : -1;
    const leanAmount = r() * (archetype === "ancient" ? 2.5 : 1.5);

    // ── Computed values scaled by growth ──
    const trunkHeight = Math.floor(baseHeight + maxExtraHeight * stage);
    const trunkWidth = Math.max(2, Math.floor(baseTrunkW + stage * maxTrunkWGrowth));
    const numTiers = Math.max(2, Math.floor(baseTiers + maxExtraTiers * stage));
    const canopyMaxW = Math.floor(baseCanopyW + maxExtraCanopyW * stage);
    const leanPx = Math.floor(leanDir * leanAmount * stage);

    // ── Bark color — wider hue range for variety ──
    const barkHueBase = archetype === "ancient" ? 5 : 10;
    const barkHue = Math.floor(barkHueBase + r() * 20);  // 5–30 (warm reds to orangey-browns)
    const barkSat = Math.floor(25 + r() * 35);           // 25–60
    const barkLit = Math.floor(14 + r() * 14);           // 14–28

    // ── Foliage color — more varied greens ──
    const foliageHue = Math.floor(95 + r() * 65);        // 95–160 (yellow-green to blue-green)
    const foliageSat = Math.floor(25 + r() * 40);        // 25–65
    const foliageLitBase = Math.floor(12 + r() * 16);    // 12–28

    const cx = Math.floor(TREE_W / 2);
    const groundY = TREE_H - 4;

    // ── Isometric ground diamond (shadow) ──
    const shadowW = Math.floor(5 + canopyMaxW * 0.5);
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    drawIsoDiamond(ctx, cx, groundY, shadowW, Math.floor(shadowW * 0.4));

    // ── Buttress roots (ancient trees at high growth) ──
    if (stage > 0.5 && archetype === "ancient") {
        const numRoots = Math.floor(2 + r() * 3);
        for (let ri = 0; ri < numRoots; ri++) {
            const rDir = r() > 0.5 ? 1 : -1;
            const rLen = Math.floor(2 + r() * 3 * stage);
            const rY = groundY - Math.floor(r() * 4);
            ctx.fillStyle = `hsl(${barkHue}, ${barkSat - 5}%, ${barkLit - 3}%)`;
            const rx = rDir > 0 ? cx + Math.floor(trunkWidth / 2) : cx - Math.floor(trunkWidth / 2) - rLen;
            // Tapered root
            for (let ry = 0; ry < 3; ry++) {
                const w = Math.max(1, rLen - ry);
                ctx.fillRect(rx, rY + ry, w, 1);
            }
        }
    }

    // ── Root flare ──
    if (stage > 0.2) {
        const flare = Math.floor(1 + stage * (archetype === "ancient" ? 3.5 : 2));
        ctx.fillStyle = `hsl(${barkHue}, ${barkSat}%, ${barkLit - 4}%)`;
        ctx.fillRect(cx - Math.floor(trunkWidth / 2) - flare, groundY - 3, trunkWidth + flare * 2, 3);
    }

    // ── Main trunk column ──
    const trunkTopY = groundY - trunkHeight;
    const trunkX = cx - Math.floor(trunkWidth / 2);

    // Trunk with slight taper (wider at base for large trees)
    for (let y = trunkTopY; y < groundY - (stage > 0.2 ? 3 : 0); y++) {
        const yP = (y - trunkTopY) / Math.max(1, trunkHeight);
        const lean = Math.floor(leanPx * yP);
        // Taper: slightly wider at base
        const taper = stage > 0.4 ? Math.floor(yP * stage * 1.5) : 0;
        const tw = trunkWidth + taper;
        const tx = cx - Math.floor(tw / 2);

        // Left face (darker)
        ctx.fillStyle = `hsl(${barkHue}, ${barkSat}%, ${barkLit - 2}%)`;
        ctx.fillRect(tx + lean, y, Math.floor(tw / 2), 1);
        // Right face (lighter)
        ctx.fillStyle = `hsl(${barkHue}, ${barkSat - 5}%, ${barkLit + 3}%)`;
        ctx.fillRect(tx + lean + Math.floor(tw / 2), y, tw - Math.floor(tw / 2), 1);
    }

    // ── Fibrous bark texture (redwood signature) ──
    const numGrooves = Math.floor(2 + r() * 3 + stage * 3);
    for (let g = 0; g < numGrooves; g++) {
        const gx = trunkX + Math.floor(r() * Math.max(1, trunkWidth));
        const groove = r() > 0.5;
        const grColor = groove
            ? `hsl(${barkHue}, ${barkSat - 5}%, ${barkLit - 8}%)`
            : `hsl(${barkHue + 3}, ${barkSat + 5}%, ${barkLit + 5}%)`;
        ctx.fillStyle = grColor;

        // Vertical groove/ridge runs down the trunk
        const startY = trunkTopY + 2 + Math.floor(r() * Math.max(1, trunkHeight * 0.3));
        const endY = Math.min(groundY - 4, startY + Math.floor(4 + r() * trunkHeight * 0.5));
        for (let y = startY; y < endY; y += (r() > 0.3 ? 1 : 2)) {
            const lean = Math.floor(leanPx * ((y - trunkTopY) / Math.max(1, trunkHeight)));
            ctx.fillRect(gx + lean, y, 1, 1);
        }
    }

    // ── Knots and burls ──
    const numKnots = Math.floor(r() * 3 * stage + (archetype === "ancient" ? stage * 2 : 0));
    for (let k = 0; k < numKnots; k++) {
        const kx = trunkX + 1 + Math.floor(r() * Math.max(1, trunkWidth - 2));
        const ky = trunkTopY + 4 + Math.floor(r() * Math.max(1, trunkHeight - 8));
        const lean = Math.floor(leanPx * ((ky - trunkTopY) / Math.max(1, trunkHeight)));
        const kSize = archetype === "ancient" ? Math.min(3, Math.floor(1 + r() * 2)) : Math.min(2, trunkWidth);
        ctx.fillStyle = `hsl(${barkHue}, ${barkSat + 5}%, ${barkLit - 8}%)`;
        ctx.fillRect(kx + lean, ky, kSize, 1);
        if (kSize > 1 && r() > 0.5) ctx.fillRect(kx + lean, ky + 1, kSize - 1, 1);
    }

    // ── Dead branch stubs (mature trees) ──
    if (stage > 0.6) {
        const numStubs = Math.floor(r() * 2 + (archetype === "ancient" ? 2 : 1));
        for (let s = 0; s < numStubs; s++) {
            // Only on exposed trunk below canopy
            const sy = trunkTopY + Math.floor(trunkHeight * (0.3 + r() * canopyStart * 0.5));
            const sDir = r() > 0.5 ? 1 : -1;
            const sLen = Math.floor(1 + r() * 2);
            const lean = Math.floor(leanPx * ((sy - trunkTopY) / Math.max(1, trunkHeight)));
            ctx.fillStyle = `hsl(${barkHue - 5}, ${barkSat - 10}%, ${barkLit - 4}%)`;
            const sx = sDir > 0 ? trunkX + trunkWidth + lean : trunkX + lean - sLen;
            ctx.fillRect(sx, sy, sLen, 1);
        }
    }

    // ── Canopy tiers ──
    // Redwood canopy starts high on the trunk with bare trunk visible below
    const canopyBottomY = trunkTopY + Math.floor(trunkHeight * canopyStart);
    const canopyTopY = Math.max(1, trunkTopY - Math.floor(trunkHeight * 0.15));
    const canopyTotalH = canopyBottomY - canopyTopY;

    for (let t = 0; t < numTiers; t++) {
        const tierProgress = numTiers > 1 ? t / (numTiers - 1) : 0;
        const tierY = canopyTopY + Math.floor(tierProgress * canopyTotalH);

        // Shape by archetype
        let tierW: number;
        if (archetype === "columnar") {
            // Narrow oval — widest in the middle tiers
            const bellCurve = Math.sin(tierProgress * Math.PI);
            tierW = Math.max(3, Math.floor(canopyMaxW * (0.3 + bellCurve * 0.7)));
        } else if (archetype === "spreading") {
            // Wide at bottom, tapers to top
            tierW = Math.max(3, Math.floor(canopyMaxW * (0.25 + tierProgress * 0.75)));
        } else {
            // Irregular — knobby ancient crown
            const wobble = 0.7 + r() * 0.6;
            tierW = Math.max(3, Math.floor(canopyMaxW * (0.3 + tierProgress * 0.5) * wobble));
        }

        const tierH = Math.max(3, Math.floor((canopyTotalH / numTiers) * (1.2 + r() * 0.4)));

        // Color variation per tier (wider range)
        const hueShift = Math.floor(r() * 14) - 7;
        const litShift = Math.floor(r() * 10) - 5;
        const darkG = `hsl(${foliageHue + hueShift}, ${foliageSat + 5}%, ${foliageLitBase + litShift}%)`;
        const midG = `hsl(${foliageHue + hueShift + 3}, ${foliageSat - 3}%, ${foliageLitBase + litShift + 6}%)`;
        const lightG = `hsl(${foliageHue + hueShift + 5}, ${foliageSat - 8}%, ${foliageLitBase + litShift + 12}%)`;

        const tierCX = cx + Math.floor(leanPx * (1 - tierProgress) * 0.5);
        const topY = tierY - Math.floor(tierH / 2);
        const botY = tierY + Math.floor(tierH / 2);

        for (let y = topY; y <= botY; y++) {
            if (y < 0 || y >= TREE_H) continue;
            const rowP = (y - topY) / Math.max(1, botY - topY);

            // Conical shape: narrow at top, wide at bottom
            const shapeP = archetype === "columnar"
                ? Math.sin(rowP * Math.PI) // oval
                : rowP; // conical
            const rowW = Math.max(1, Math.floor(tierW * (0.2 + shapeP * 0.8)));
            const x0 = tierCX - Math.floor(rowW / 2);

            for (let px = 0; px < rowW; px++) {
                const pxP = rowW > 1 ? px / (rowW - 1) : 0.5;
                const skipChance = densityVar > 0.5 ? 0.78 : 0.85;

                // Isometric shading: left dark, center mid, right light
                let color: string;
                if (pxP < 0.3) {
                    color = r() > skipChance ? midG : darkG;
                } else if (pxP > 0.7) {
                    color = r() > skipChance ? midG : lightG;
                } else {
                    color = r() > skipChance ? lightG : midG;
                }

                // Organic edges
                if ((px === 0 || px === rowW - 1) && r() > 0.55) continue;
                if ((px === 1 || px === rowW - 2) && r() > 0.88) continue;

                ctx.fillStyle = color;
                ctx.fillRect(x0 + px, y, 1, 1);
            }
        }

        // Tip pixel at top of tier
        if (topY - 1 >= 0 && r() > 0.3) {
            ctx.fillStyle = midG;
            ctx.fillRect(tierCX, topY - 1, 1, 1);
        }
    }

    // ── Living branches (below canopy on exposed trunk) ──
    if (stage > 0.25) {
        const maxBranches = archetype === "spreading"
            ? Math.floor(3 + r() * 4 * stage)
            : Math.floor(1 + r() * 3 * stage);
        for (let b = 0; b < maxBranches; b++) {
            // Branches in the exposed trunk zone
            const by = trunkTopY + Math.floor(trunkHeight * (canopyStart * 0.3 + r() * canopyStart * 0.6));
            const dir = r() > 0.5 ? 1 : -1;
            const bLen = Math.floor(2 + r() * 3 * stage);
            const lean = Math.floor(leanPx * ((by - trunkTopY) / Math.max(1, trunkHeight)));
            ctx.fillStyle = `hsl(${barkHue}, ${barkSat - 5}%, ${barkLit + 2}%)`;
            const bx = dir > 0 ? trunkX + trunkWidth + lean : trunkX + lean - bLen;
            // Branch line (slight droop)
            for (let bi = 0; bi < bLen; bi++) {
                const droop = Math.floor(bi * 0.3);
                ctx.fillRect(bx + (dir > 0 ? bi : bLen - 1 - bi), by + droop, 1, 1);
            }
            // Leaf cluster at tip
            if (stage > 0.4 && r() > 0.3) {
                const tipX = dir > 0 ? bx + bLen : bx - 1;
                const tipY = by + Math.floor((bLen - 1) * 0.3);
                const clusterSize = Math.floor(1 + r() * 2);
                ctx.fillStyle = `hsl(${foliageHue}, ${foliageSat - 8}%, ${foliageLitBase + 8}%)`;
                ctx.fillRect(tipX, tipY - 1, clusterSize, clusterSize);
                ctx.fillStyle = `hsl(${foliageHue + 5}, ${foliageSat - 12}%, ${foliageLitBase + 14}%)`;
                ctx.fillRect(tipX + (dir > 0 ? 1 : -1), tipY, 1, 1);
            }
        }
    }

    // ── Hanging moss / epiphytes (ancient trees at high maturity) ──
    if (stage > 0.7 && archetype === "ancient" && r() > 0.3) {
        const numMoss = Math.floor(1 + r() * 3);
        for (let m = 0; m < numMoss; m++) {
            const mx = cx - Math.floor(canopyMaxW * 0.3) + Math.floor(r() * canopyMaxW * 0.6);
            const my = canopyTopY + Math.floor(r() * canopyTotalH * 0.7);
            const mLen = Math.floor(2 + r() * 3);
            ctx.fillStyle = `hsl(80, 20%, ${25 + Math.floor(r() * 10)}%)`;
            for (let mi = 0; mi < mLen; mi++) {
                ctx.fillRect(mx + (r() > 0.5 ? 1 : 0), my + mi, 1, 1);
            }
        }
    }

    return canvas.toDataURL();
}

/** Draw a filled isometric diamond. */
function drawIsoDiamond(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number
) {
    const hw = Math.floor(w / 2);
    const hh = Math.floor(h / 2);
    for (let dy = -hh; dy <= hh; dy++) {
        const rowW = Math.floor(hw * (1 - Math.abs(dy) / hh));
        if (rowW <= 0) continue;
        ctx.fillRect(cx - rowW, cy + dy, rowW * 2, 1);
    }
}

// ─── Image cache (keyed by seed + growth) ────────────────────────────────────

const treeImageCache = new Map<string, string>();

function getTreeImage(seed: number, growth: number): string {
    const key = `${seed}:${growth}`;
    if (treeImageCache.has(key)) return treeImageCache.get(key)!;
    const img = generateTreeImage(seed, growth);
    treeImageCache.set(key, img);
    return img;
}

// ─── PixelTree component ─────────────────────────────────────────────────────

function PixelTree({
    tree,
    scale = 1,
    isToday,
}: {
    tree: Tree;
    scale?: number;
    isToday: boolean;
}) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        setSrc(getTreeImage(tree.seed, tree.growth));
    }, [tree.seed, tree.growth]);

    if (!src) return null;

    const displayW = TREE_W * TREE_SCALE * scale;
    const displayH = TREE_H * TREE_SCALE * scale;

    return (
        <img
            src={src}
            alt="pixel redwood"
            width={displayW}
            height={displayH}
            draggable={false}
            className="select-none"
            style={{
                imageRendering: "pixelated",
                display: "block",
            }}
            title={
                isToday && tree.growth < MAX_GROWTH
                    ? `Click the ground to grow (${tree.growth}/${MAX_GROWTH})`
                    : tree.growth >= MAX_GROWTH
                        ? "Fully grown! 🌲"
                        : undefined
            }
        />
    );
}

// ─── Grid Constants ──────────────────────────────────────────────────────────

// Tile dimensions for the hexagonal grid
const TILE_SIZE = 46; // px

// Tree display scale
const TREE_SCALE = 2;
const TREE_GROUND_OFFSET = 6 * TREE_SCALE;

// We use an 18-hex row pattern, with 10 rows visible at time
const ROW_SIZE = 18;
const MAX_VISIBLE_ROWS = 10;
const gridWidth = ROW_SIZE * TILE_SIZE;

// ─── Hexagonal Floor Tile ────────────────────────────────────────────────────

function FloorTile({
    isActive,
    hasTree,
    onClick,
    onHover,
}: {
    isActive: boolean;
    hasTree: boolean;
    onClick?: () => void;
    onHover?: (hovering: boolean) => void;
}) {
    const [hovered, setHovered] = useState(false);

    const baseBg = "rgba(90, 122, 46, 0.15)";
    const hoverBg = "rgba(120, 170, 60, 0.45)";

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => {
                if (isActive) setHovered(true);
                onHover?.(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
                onHover?.(false);
            }}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: hovered ? hoverBg : baseBg,
                // Hexagonal offset cut leaving an organic visual gap
                clipPath: "polygon(50% 1%, 99% 26%, 99% 74%, 50% 99%, 1% 74%, 1% 26%)",
                cursor: isActive ? 'pointer' : 'default',
                transition: 'background-color 0.1s',
                pointerEvents: 'all',
            }}
        />
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RedwoodForest() {
    const [forestState, setForestState] = useSyncedState<ForestState>(
        { globalSlots: [] },
        "redwood-forest"
    );
    const userId = useRef(getUserId());
    const [hoveredTree, setHoveredTree] = useState<Tree | null>(null);

    // Compute all dynamic slots logic
    const allSlots = useMemo(() => {
        let slots = [...(forestState?.globalSlots || [])];
        if (slots.length === 0) slots = Array(ROW_SIZE).fill(null);
        
        while (slots.length % ROW_SIZE !== 0) slots.push(null);
        
        let lastRowStartIndex = slots.length - ROW_SIZE;
        let lastRow = slots.slice(lastRowStartIndex);
        
        // When an entire row is full, a new row is added
        while (lastRow.length === ROW_SIZE && lastRow.every(t => t !== null)) {
            slots.push(...Array(ROW_SIZE).fill(null));
            lastRowStartIndex = slots.length - ROW_SIZE;
            lastRow = slots.slice(lastRowStartIndex);
        }
        
        return slots;
    }, [forestState?.globalSlots]);

    const handlePlant = useCallback(
        (slotIdx: number) => {
            setForestState((prev) => {
                const current = prev || { globalSlots: [] };
                let slots = [...(current.globalSlots || [])];
                if (slots.length === 0) slots = Array(ROW_SIZE).fill(null);
                
                while (slots.length <= slotIdx) slots.push(null);

                if (slots[slotIdx] !== null) return current;

                slots[slotIdx] = {
                    id: `${userId.current}-${Date.now()}`,
                    seed: Math.floor(Math.random() * 2147483647),
                    slot: slotIdx,
                    growth: 0,
                    plantedBy: userId.current,
                };

                return { ...current, globalSlots: slots };
            });
        },
        [setForestState]
    );

    const handleGrow = useCallback(
        (slotIdx: number) => {
             setForestState((prev) => {
                const current = prev || { globalSlots: [] };
                let slots = [...(current.globalSlots || [])];
                const tree = slots[slotIdx];
                if (!tree || tree.growth >= MAX_GROWTH) return current;
                
                slots[slotIdx] = { ...tree, growth: tree.growth + 1 };
                return { ...current, globalSlots: slots };
             });
        },
        [setForestState]
    );

    const totalCount = allSlots.filter((t) => t !== null).length;
    const maxRows = allSlots.length / ROW_SIZE;
    const startRowIndex = Math.max(0, maxRows - MAX_VISIBLE_ROWS);
    const visibleRowsCount = maxRows - startRowIndex;

    return (
        <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200 isolate z-0">
            <style>{`
                @keyframes treeAppear {
                    0% { transform: translateY(10px) scaleY(0); opacity: 0; }
                    60% { transform: translateY(-3px) scaleY(1.05); opacity: 1; }
                    100% { transform: translateY(0) scaleY(1); opacity: 1; }
                }
            `}</style>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#2b1810] dark:bg-dark-panel border-b border-[#4a2b1f] dark:border-dark-border relative z-50">
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#d4b8a8] dark:text-dark-secondary tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-dark-accent"></div>
                    Redwood Forest
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#d4b8a8]/70 dark:text-dark-secondary/70 tracking-widest uppercase flex items-center h-[26px]">
                        {totalCount} planted across {maxRows} rows
                    </span>
                    <div className="relative">
                        <div className="flex items-center gap-2 bg-green-950/30 dark:bg-dark-success-bg text-green-400 dark:text-dark-success-text px-3 py-1.5 rounded-md text-[10px] font-mono border border-green-900/50 dark:border-dark-success-border transition-colors duration-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-dark-success-text animate-pulse"></div>
                            LIVE
                        </div>
                        {/* Tooltip */}
                        {hoveredTree && (
                            <div className="absolute top-full right-0 mt-3 bg-black/80 dark:bg-dark-panel/90 backdrop-blur-md border border-[#4a2b1f]/30 dark:border-dark-border/50 px-4 py-3 rounded-xl shadow-2xl z-50 pointer-events-none flex flex-col gap-1 min-w-[120px]">
                                <div className="font-mono text-[9px] text-green-400 tracking-widest uppercase">
                                    Tree Growth
                                </div>
                                <div className="text-white text-sm font-mono flex items-end gap-1">
                                    <span className="text-lg leading-none">
                                        {allSlots[hoveredTree.slot]?.growth ?? hoveredTree.growth}
                                    </span>
                                    <span className="text-zinc-500 leading-none">/ {MAX_GROWTH}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Forest area */}
            <div
                className="relative overflow-hidden bg-gradient-to-b from-[#7CB9D8] via-[#B8D4E3] via-60% to-[#8aad5a] dark:from-[#1a1a2e] dark:via-[#1e2d3d] dark:via-60% dark:to-[#1e3510]"
                style={{ minHeight: "380px" }}
            >
                {/* Fog overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: "linear-gradient(to bottom, rgba(180,200,220,0.12) 0%, transparent 35%)",
                    }}
                />

                {/* Night time overlay */}
                <div className="absolute inset-0 pointer-events-none hidden dark:block z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/30 to-[#020617]/10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-blue-900/5 mix-blend-color" />
                </div>

                {/* Rows Grid */}
                <div
                    className="flex flex-col items-center justify-end px-4 py-6 relative z-10"
                    style={{ minHeight: "380px" }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            width: gridWidth + TILE_SIZE / 2,
                            transform: "perspective(1200px) rotateX(60deg)",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {Array.from({ length: visibleRowsCount }).map((_, i) => {
                            const absoluteRowIndex = startRowIndex + i;
                            const rowSlots = allSlots.slice(absoluteRowIndex * ROW_SIZE, (absoluteRowIndex + 1) * ROW_SIZE);

                            return (
                                <div
                                    key={`row-${absoluteRowIndex}`}
                                    style={{
                                        display: "flex",
                                        marginLeft: absoluteRowIndex % 2 !== 0 ? TILE_SIZE / 2 : 0,
                                        marginTop: i > 0 ? -Math.floor(TILE_SIZE / 4) : 0,
                                        // Fixed: applying opacity or zIndex breaks 'preserve-3d' and visually flattens children 
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {rowSlots.map((tree, col) => {
                                        const absoluteSlot = absoluteRowIndex * ROW_SIZE + col;
                                        const dynamicScale = tree ? 1 + (tree.growth / MAX_GROWTH) * 3 : 1;

                                        return (
                                            <div
                                                key={absoluteSlot}
                                                style={{
                                                    position: "relative",
                                                    width: TILE_SIZE,
                                                    height: TILE_SIZE,
                                                    transformStyle: "preserve-3d",
                                                }}
                                            >
                                                <FloorTile
                                                    isActive={true}
                                                    hasTree={!!tree}
                                                    onClick={() => {
                                                        if (tree) handleGrow(absoluteSlot);
                                                        else handlePlant(absoluteSlot);
                                                    }}
                                                    onHover={(hovering) => {
                                                        if (tree && setHoveredTree) {
                                                            setHoveredTree(hovering ? tree : null);
                                                        }
                                                    }}
                                                />

                                                {tree && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "50%",
                                                            bottom: "50%",
                                                            transform: `translate(-50%, ${TREE_GROUND_OFFSET}px) rotateX(-60deg)`,
                                                            transformOrigin: "bottom center",
                                                            pointerEvents: "none",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                animation: "treeAppear 0.4s ease-out",
                                                                transformOrigin: "bottom center",
                                                                transform: `scale(${dynamicScale})`,
                                                                transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                            }}
                                                        >
                                                            <PixelTree
                                                                tree={tree}
                                                                scale={1}
                                                                isToday={true}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Empty state prompt */}
                {totalCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-[#2b1810]/85 dark:bg-dark-panel/85 backdrop-blur-sm text-dark-primary px-6 py-3 rounded-xl font-mono text-sm border border-[#4a2b1f] dark:border-dark-border animate-pulse">
                            Click a slot to plant your first redwood 🌲
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#2b1810] dark:bg-dark-panel border-t border-[#4a2b1f] dark:border-dark-border">
                <p className="font-mono text-[10px] text-[#d4b8a8]/60 dark:text-dark-secondary/60 tracking-widest uppercase text-center">
                    Every tree is procedurally unique · Click trees to grow them · Synced
                    via useSyncedState
                </p>
            </div>
        </div>
    );
}

