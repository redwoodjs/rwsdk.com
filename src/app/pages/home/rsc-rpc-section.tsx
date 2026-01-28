"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BLUEPRINT_BG = "bg-[#0D0D0D]";
const BLUEPRINT_LINE = "border-white/10";
const ACCENT = "text-[#F17543]";
const ACCENT_BG = "bg-[#F17543]";
const TEXT_MAIN = "text-white";
const TEXT_SUB = "text-slate-400";

const IconServer = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const IconBrowser = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const IconDatabase = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// Tile 1: Server-First Rendering
export function Tile1_ServerFirst() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl p-6 flex flex-col items-center justify-between h-[400px] relative overflow-hidden`}
      >
        <div className="flex flex-col items-center z-10">
          <IconServer className={`w-12 h-12 ${ACCENT} mb-2`} />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Source of Truth
          </span>
        </div>

        {/* Animated Stream */}
        <div className="flex-1 w-[2px] bg-slate-200 relative overflow-hidden my-4">
          <motion.div
            className={`absolute top-0 left-0 w-full h-[40%] ${ACCENT_BG}`}
            animate={{ top: ["-40%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="flex flex-col items-center z-10 w-full">
          <div className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            Browser
          </div>
          <div className="border border-white/10 rounded-xl w-3/4 h-24 p-2 relative bg-editor">
            <div className="w-full h-2 bg-slate-800 mb-2 rounded" />
            <div className="w-2/3 h-2 bg-slate-800 rounded" />
            <motion.div
              className={`absolute inset-0 bg-gradient-to-b from-${ACCENT}/20 to-transparent`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium mb-1 text-slate-900">Server-First Rendering</h3>
        <p className="text-sm text-slate-600 text-balance px-2">Server-first allows you to focus on a single source of truth. Everything originates from the server; the browser just renders it.</p>
      </div>
    </div>
  );
}

// Tile 2: Server Functions (Action vs Query)
export function Tile2_ServerFunctions() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl relative overflow-hidden h-[400px] flex flex-col`}
      >
        <div className="flex flex-1 relative z-10">
          {/* Left: Action */}
          <div className="w-1/2 border-r border-white/10 px-2 pt-8 pb-4 flex flex-col items-center">
            <span className={`text-xs font-mono uppercase ${ACCENT} mb-4`}>Mutate</span>
            <div className="border border-white/10 p-2 rounded-xl w-full mb-2 bg-editor">
              <div className="w-full h-6 bg-slate-800 rounded mb-2 flex items-center justify-center text-[10px]">Submit</div>
            </div>

            {/* Flow Animation */}
            <div className="h-16 w-[1px] bg-white/10 relative my-2">
              <motion.div
                className={`absolute top-0 w-full h-4 ${ACCENT_BG}`}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <IconDatabase className="w-6 h-6 text-slate-300 mb-2" />

            {/* Revalidation Flash */}
            <motion.div
              className="w-full h-24 bg-editor border border-white/5 rounded-xl mt-2 mb-4"
              animate={{ backgroundColor: ["#0F172A", "rgba(241,117,67,0.15)", "#0F172A"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            <p className="!text-[10px] text-slate-400 text-center leading-tight pb-4 text-balance px-1">
              Page automatically reloads with new server supplied state.
            </p>
          </div>

          {/* Right: Query */}
          <div className="w-1/2 px-2 pt-8 pb-4 flex flex-col items-center">
            <span className={`text-xs font-mono uppercase ${ACCENT} mb-4`}>Fetch</span>
            <div className="border border-white/10 p-2 rounded-xl w-full mb-2 bg-editor">
              <div className="w-full h-6 border border-white/5 rounded mb-2 flex items-center px-2 text-[10px] text-slate-500">Search...</div>
            </div>

            {/* Flow Animation */}
            <div className="h-16 w-[1px] bg-white/10 relative my-2">
              <motion.div
                className="absolute top-0 w-full h-4 bg-slate-400"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <IconServer className="w-6 h-6 text-slate-300 mb-2" />

            <div className="w-full space-y-1 mt-2 mb-4">
              <div className="h-2 w-full bg-slate-800 rounded" />
              <motion.div
                className={`h-2 w-2/3 bg-slate-800 rounded`}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <div className="h-2 w-full bg-slate-800 rounded" />
              <div className="h-2 w-4/5 bg-slate-800 rounded" />
            </div>

            <p className="!text-[10px] text-slate-400 text-center leading-tight pb-4 text-balance px-1">
              State is managed client side.
            </p>
          </div>
        </div>
      </div>

      <div className={`p-6 border-t border-white/10 z-10 ${BLUEPRINT_BG} rounded-xl hidden`}>
        {/* Hidden old text block to ensure clean removal if needed, but actually we want to render it outside */}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium mb-1 text-slate-900">Server Functions</h3>
        <p className="text-sm text-slate-600 text-balance px-1">You get a single mechanism to reason about passing data back and forth. Queries and mutations make it type safe and simple.</p>
      </div>
    </div>
  );
}

// Tile 3: Smooth Navigation
export function Tile3_Navigation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 6);
    }, 1500); // 1.5s per step
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Browser", sub: "Link Click" },
    { label: "Navigation", sub: "Routing" },
    { label: "Middleware", sub: "Server Security" },
    { label: "Page Handler", sub: "Server Rendering" },
    { label: "Hydration", sub: "Client State" },
    { label: "View Transition", sub: "Smooth Update" }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl relative overflow-hidden h-[400px] flex flex-col`}
      >
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">

          {/* Timeline Indicator */}
          <div className="flex items-center justify-center w-full px-8 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="contents">
                {/* Dot */}
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= step ? `${ACCENT_BG} scale-125` : "bg-white/5"}`} />
                {/* Line (if not last) */}
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-1 transition-colors duration-300 ${i < step ? ACCENT_BG : "bg-white/5"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Label */}
          <div className="text-center h-10 mb-6">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <span className={`font-mono text-xs uppercase tracking-widest ${ACCENT} mb-1`}>
                {steps[step].sub}
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                {steps[step].label}
              </span>
            </motion.div>
          </div>

          <div className="flex items-center gap-8 w-full justify-center">
            {/* Browser/Link */}
            <div className={`flex flex-col items-center transition-opacity duration-300 ${[0, 1].includes(step) ? "opacity-100" : "opacity-30"}`}>
              <motion.div
                className={`w-8 h-8 rounded-full border flex items-center justify-center ${step === 0 ? `border-${ACCENT} shadow-[0_0_15px_rgba(244,114,56,0.2)]` : "border-slate-200"}`}
                animate={step === 0 ? { scale: [1, 0.9, 1] } : { scale: 1 }}
              >
                <div className={`w-2 h-2 rounded-full ${step === 0 ? "bg-[#f47238]" : "bg-slate-200"}`} />
              </motion.div>
            </div>

            {/* Connection Pipe */}
            <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden">
              {step === 1 && (
                <motion.div
                  className={`absolute left-0 h-full w-12 ${ACCENT_BG}`}
                  initial={{ left: "-20%" }}
                  animate={{ left: "120%" }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              )}
            </div>

            {/* Server Steps */}
            <div className={`flex flex-col items-center transition-opacity duration-300 ${[2, 3].includes(step) ? "opacity-100" : "opacity-30"}`}>
              <IconServer className={`w-8 h-8 ${[2, 3].includes(step) ? "text-white" : "text-slate-700"}`} />

              {/* Server Activity Indicator */}
              {[2, 3].includes(step) && (
                <motion.div
                  className={`absolute -bottom-4 w-12 h-1 ${ACCENT_BG}`}
                  layoutId="server-activity"
                />
              )}
            </div>
          </div>

          {/* Browser Window (Hydration & View Transition) */}
          <div className={`w-full max-w-[200px] aspect-[4/3] border rounded-xl bg-editor relative overflow-hidden transition-all duration-500 mt-8 ${[4, 5].includes(step) ? `border-[#F17543]/50` : "border-white/10"}`}>
            <div className="absolute top-0 w-full h-4 border-b border-white/5 flex items-center px-2 gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            <div className="p-4 pt-8 h-full relative overflow-hidden">
              <AnimatePresence mode="popLayout">
                {step === 5 ? (
                  <motion.div
                    key="page-b"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 p-4 pt-8 bg-editor"
                  >
                    <div className="flex flex-col gap-2">
                      {/* Header - Different visual for Page B */}
                      <div className={`w-1/2 h-4 ${ACCENT_BG} rounded mb-2 opacity-80`} />
                      <div className={`w-full h-2 bg-slate-800 rounded`}></div>
                      <div className="w-3/4 h-2 bg-slate-800 rounded" />
                    </div>
                    <div className={`mt-4 text-[10px] ${ACCENT} font-mono uppercase tracking-widest`}>Page B</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="page-a"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }} // When Step 5 comes, Page A leaves to left? Wait. Transition implies A -> B. Usually B comes from Right, A goes to Left. 
                    // So if showing Page A (Step != 5), and we go to Step 5: A should exit Left.
                    // But here logic is: If Step 5 (Show B), Else (Show A).
                    // If moving 4 -> 5: A exits. exit prop should be x: -100%.
                    // If moving 5 -> 0: B exits. exit prop on B should be... wait.
                    // If 5 -> 0, B is unmounted. B's exit prop is triggered. 
                    // Since we are resetting, maybe it doesn't matter, or we want B to slide out Left?
                    // Let's stick to standard slide Left for navigation.
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 p-4 pt-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="w-1/2 h-4 bg-slate-800 rounded mb-2" />
                      <div className="w-full h-2 bg-slate-800 rounded" />
                      <div className="w-3/4 h-2 bg-slate-800 rounded" />
                    </div>
                    <div className="mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">Page A</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hydration Flash for Step 4 */}
              {step === 4 && (
                <motion.div
                  className="absolute inset-0 bg-white/10 pointer-events-none"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium mb-1 text-slate-900">Smooth Navigation</h3>
        <p className="text-sm text-slate-600 text-balance px-4">Client-side navigation makes it fast. Secure routing with the fluid motion of a Single Page App.</p>
      </div>
    </div>
  );
}
