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
    days: Record<string, (Tree | null)[]>; // dateString → 16-slot array
};

const GRID_COLS = 256;
const MAX_GROWTH = 30;

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

// ─── Isometric Grid Constants ────────────────────────────────────────────────

const ISO_ROWS = 16;
const ISO_COLS = 16;
// Tile dimensions (the diamond footprint each tree/slot occupies)
const TILE_W = 32; // px — width of the diamond
const TILE_H = 16;  // px — height of the diamond (half of width for 2:1 iso)

// Tree display scale
const TREE_SCALE = 1.2;
const TREE_DISPLAY_W = TREE_W * TREE_SCALE;
const TREE_DISPLAY_H = TREE_H * TREE_SCALE;
// The tree's visual base (root flare) is ~6 canvas pixels from the bottom of the sprite
const TREE_GROUND_OFFSET = 6 * TREE_SCALE;

/**
 * Convert grid (row, col) to screen (x, y) for isometric projection.
 * Origin is at top-center of the grid.
 */
function isoToScreen(row: number, col: number) {
    return {
        x: (col - row) * (TILE_W / 2),
        y: (col + row) * (TILE_H / 2),
    };
}

// Compute grid bounding box so we can size the container
const isoGridWidth = (ISO_ROWS + ISO_COLS) * (TILE_W / 2);
const isoGridHeight = (ISO_ROWS + ISO_COLS) * (TILE_H / 2);

// ─── Isometric Floor Tile ────────────────────────────────────────────────────

function IsoTile({
    row,
    col,
    isToday,
    hasTree,
    onClick,
}: {
    row: number;
    col: number;
    isToday: boolean;
    hasTree: boolean;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);

    const baseFill =
        (row + col) % 2 === 0
            ? "rgba(90,122,46,0.15)"
            : "rgba(74,107,32,0.15)";
    const hoverFill = "rgba(120,170,60,0.45)";
    const baseStroke = "rgba(61,90,24,0.2)";
    const hoverStroke = "rgba(100,150,40,0.7)";

    return (
        <svg
            width={TILE_W}
            height={TILE_H}
            viewBox={`0 0 ${TILE_W} ${TILE_H}`}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                cursor: isToday ? "pointer" : "default",
            }}
            onClick={onClick}
            onMouseEnter={() => isToday && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <polygon
                points={`${TILE_W / 2},0 ${TILE_W},${TILE_H / 2} ${TILE_W / 2},${TILE_H} 0,${TILE_H / 2}`}
                fill={hovered ? hoverFill : baseFill}
                stroke={hovered ? hoverStroke : baseStroke}
                strokeWidth={hovered ? "1" : "0.5"}
                style={{ transition: "fill 0.15s, stroke 0.15s" }}
            />
            {/* "+" hint for empty plantable slots */}
            {!hasTree && isToday && (
                <text
                    x={TILE_W / 2}
                    y={TILE_H / 2 + 5}
                    textAnchor="middle"
                    fill={hovered ? "rgba(74,222,128,0.8)" : "rgba(74,222,128,0.3)"}
                    style={{
                        fontSize: "16px",
                        fontFamily: "monospace",
                        transition: "fill 0.15s",
                        pointerEvents: "none",
                    }}
                >
                    +
                </text>
            )}
        </svg>
    );
}

// ─── Day Row (True Isometric Grid) ───────────────────────────────────────────

function DayRow({
    date,
    slots,
    isToday,
    depth,
    onPlant,
    onGrow,
}: {
    date: string;
    slots: (Tree | null)[];
    isToday: boolean;
    depth: number;
    onPlant: (slot: number) => void;
    onGrow: (slot: number) => void;
}) {
    const scale = Math.pow(0.82, depth);
    const opacity = Math.max(0.25, 1 - depth * 0.15);

    const label = isToday
        ? "Today"
        : depth === 1
            ? "Yesterday"
            : new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

    return (
        <div
            className="flex flex-col items-center"
            style={{
                transform: `scale(${scale})`,
                opacity,
                transformOrigin: "bottom center",
                marginTop: depth > 0 ? `-${Math.floor(40 * scale)}px` : 0,
                zIndex: 100 - depth,
                position: "relative",
            }}
        >
            {/* Date label */}
            <div
                className="font-mono tracking-widest uppercase mb-2 select-none"
                style={{
                    fontSize: `${Math.max(8, 10 * scale)}px`,
                    color: isToday ? "#F17543" : `rgba(212, 184, 168, ${opacity})`,
                }}
            >
                {label}
            </div>

            {/* Isometric grid container */}
            <div
                style={{
                    position: "relative",
                    width: isoGridWidth,
                    height: isoGridHeight + TREE_DISPLAY_H,
                }}
            >
                {Array.from({ length: ISO_ROWS }).map((_, row) =>
                    Array.from({ length: ISO_COLS }).map((_, col) => {
                        const slotIdx = row * ISO_COLS + col;
                        const tree = slots[slotIdx];
                        const { x, y } = isoToScreen(row, col);

                        // Center within container
                        const screenX = x + isoGridWidth / 2 - TILE_W / 2;
                        const screenY = y + TREE_DISPLAY_H; // offset so trees have room above

                        return (
                            <div
                                key={slotIdx}
                                style={{
                                    position: "absolute",
                                    left: screenX,
                                    top: screenY,
                                    width: TILE_W,
                                    height: TILE_H,
                                    zIndex: row + col, // back-to-front ordering
                                }}
                            >
                                <IsoTile
                                    row={row}
                                    col={col}
                                    isToday={isToday}
                                    hasTree={!!tree}
                                    onClick={
                                        isToday
                                            ? () => {
                                                if (tree) onGrow(slotIdx);
                                                else onPlant(slotIdx);
                                            }
                                            : undefined
                                    }
                                />

                                {/* Tree drawn above tile — pointer-events: none so clicks hit the floor */}
                                {tree && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: TILE_W / 2 - TREE_DISPLAY_W / 2,
                                            top: -(TREE_DISPLAY_H - TREE_GROUND_OFFSET) + TILE_H / 2 + 5,
                                            zIndex: 10 + row + col,
                                            pointerEvents: "none",
                                            animation: isToday
                                                ? "treeAppear 0.4s ease-out"
                                                : "none",
                                        }}
                                    >
                                        <PixelTree
                                            tree={tree}
                                            scale={1}
                                            isToday={isToday}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

function ensureSlotsArray(data: unknown): (Tree | null)[] {
    if (Array.isArray(data)) {
        const arr = data as (Tree | null)[];
        // Ensure exactly GRID_COLS slots
        while (arr.length < GRID_COLS) arr.push(null);
        return arr.slice(0, GRID_COLS);
    }
    return new Array(GRID_COLS).fill(null);
}

export default function RedwoodForest() {
    const [forestState, setForestState] = useSyncedState<ForestState>(
        { days: {} },
        "redwood-forest"
    );
    const userId = useRef(getUserId());

    const sortedDays = useMemo(() => {
        if (!forestState?.days) return [];
        const today = getToday();
        const keys = Object.keys(forestState.days).sort();
        if (!keys.includes(today)) keys.push(today);
        keys.sort();
        return keys;
    }, [forestState?.days]);

    const daysForDisplay = useMemo(() => {
        const today = getToday();
        const recent = sortedDays.slice(-7);
        return recent.map((date) => ({
            date,
            slots: ensureSlotsArray(forestState?.days?.[date]),
            isToday: date === today,
        }));
    }, [sortedDays, forestState?.days]);

    const handlePlant = useCallback(
        (slot: number) => {
            setForestState((prev) => {
                const current = prev || { days: {} };
                const today = getToday();
                const days = { ...current.days };
                const todaySlots = ensureSlotsArray(days[today]);

                // Slot already taken
                if (todaySlots[slot] !== null) return current;

                todaySlots[slot] = {
                    id: `${userId.current}-${Date.now()}`,
                    seed: Math.floor(Math.random() * 2147483647),
                    slot,
                    growth: 0,
                    plantedBy: userId.current,
                };

                days[today] = todaySlots;
                return { days };
            });
        },
        [setForestState]
    );

    const handleGrow = useCallback(
        (slot: number) => {
            setForestState((prev) => {
                const current = prev || { days: {} };
                const today = getToday();
                const days = { ...current.days };
                const todaySlots = ensureSlotsArray(days[today]);

                const tree = todaySlots[slot];
                if (!tree || tree.growth >= MAX_GROWTH) return current;

                todaySlots[slot] = { ...tree, growth: tree.growth + 1 };
                days[today] = todaySlots;
                return { days };
            });
        },
        [setForestState]
    );

    // Count today's trees
    const todaySlots = ensureSlotsArray(forestState?.days?.[getToday()]);
    const todayCount = todaySlots.filter((t) => t !== null).length;

    return (
        <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
            <style>{`
                @keyframes treeAppear {
                    0% { transform: translateY(10px) scaleY(0); opacity: 0; }
                    60% { transform: translateY(-3px) scaleY(1.05); opacity: 1; }
                    100% { transform: translateY(0) scaleY(1); opacity: 1; }
                }
            `}</style>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#2b1810] dark:bg-dark-panel border-b border-[#4a2b1f] dark:border-dark-border">
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#d4b8a8] dark:text-dark-secondary tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-dark-accent"></div>
                    Redwood Forest
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#d4b8a8]/70 dark:text-dark-secondary/70 tracking-widest uppercase">
                        {todayCount}/{GRID_COLS} planted today
                    </span>
                    <div className="flex items-center gap-2 bg-green-950/30 dark:bg-dark-success-bg text-green-400 dark:text-dark-success-text px-3 py-1.5 rounded-md text-[10px] font-mono border border-green-900/50 dark:border-dark-success-border transition-colors duration-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-dark-success-text animate-pulse"></div>
                        LIVE
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
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, rgba(180,200,220,0.12) 0%, transparent 35%)",
                    }}
                />

                {/* Day rows */}
                <div
                    className="flex flex-col items-center justify-end px-4 py-6"
                    style={{ minHeight: "380px" }}
                >
                    {daysForDisplay.map((day, i) => {
                        const depth = daysForDisplay.length - 1 - i;
                        return (
                            <DayRow
                                key={day.date}
                                date={day.date}
                                slots={day.slots}
                                isToday={day.isToday}
                                depth={depth}
                                onPlant={handlePlant}
                                onGrow={handleGrow}
                            />
                        );
                    })}
                </div>

                {/* Empty state prompt */}
                {todayCount === 0 && (
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
