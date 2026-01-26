"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BLUEPRINT_BG = "bg-[#1A1A1A]"; // Charcoal
const BLUEPRINT_LINE = "border-white/20";
const ACCENT = "text-[#f47238]"; // Redwood Orange
const ACCENT_BG = "bg-[#f47238]";
const TEXT_MAIN = "text-white";
const TEXT_SUB = "text-white/60";

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
    <div
      className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl p-6 flex flex-col items-center justify-between h-[400px] relative overflow-hidden`}
    >
      <div className="flex flex-col items-center z-10">
        <IconServer className={`w-12 h-12 ${ACCENT} mb-2`} />
        <span className="text-xs font-mono uppercase tracking-widest text-white/50">
          Source of Truth
        </span>
      </div>

      {/* Animated Stream */}
      <div className="flex-1 w-[2px] bg-white/10 relative overflow-hidden my-4">
        <motion.div
          className={`absolute top-0 left-0 w-full h-[40%] ${ACCENT_BG}`}
          animate={{ top: ["-40%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center z-10 w-full">
        <div className="mb-2 text-xs font-mono uppercase tracking-widest text-white/50">
          Thin Client
        </div>
        <div className="border border-white/20 rounded w-3/4 h-24 p-2 relative">
           <div className="w-full h-2 bg-white/10 mb-2 rounded" />
           <div className="w-2/3 h-2 bg-white/10 rounded" />
           <motion.div 
             className={`absolute inset-0 bg-gradient-to-b from-${ACCENT}/20 to-transparent`}
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 0.5, 0] }}
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
           />
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
        </div>
      </div>

      <div className="mt-6 z-10 text-center">
         <h3 className="text-lg font-medium mb-1">Server-First Rendering</h3>
         <p className={`text-sm ${TEXT_SUB}`}>Everything originates from the server. The browser simply renders the stream.</p>
      </div>
    </div>
  );
}

// Tile 2: Server Functions (Action vs Query)
export function Tile2_ServerFunctions() {
  return (
    <div
      className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl relative overflow-hidden h-[400px] flex flex-col`}
    >
        <div className="flex flex-1 relative z-10">
            {/* Left: Action */}
            <div className="w-1/2 border-r border-white/10 p-4 flex flex-col items-center pt-8">
                <span className={`text-xs font-mono uppercase ${ACCENT} mb-4`}>Mutate</span>
                <div className="border border-white/20 p-2 rounded w-full mb-2 bg-white/5">
                    <div className="w-full h-6 bg-white/10 rounded mb-2 flex items-center justify-center text-[10px]">Submit</div>
                </div>
                
                {/* Flow Animation */}
                <div className="h-16 w-[1px] bg-white/10 relative my-2">
                    <motion.div 
                         className={`absolute top-0 w-full h-4 ${ACCENT_BG}`}
                         animate={{ top: ["0%", "100%"] }}
                         transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                <IconDatabase className="w-6 h-6 text-white/50 mb-2" />
                
                {/* Revalidation Flash */}
                <motion.div 
                    className="w-full h-12 bg-white/5 border border-white/10 rounded mt-2"
                    animate={{ backgroundColor: ["rgba(255,255,255,0.05)", "rgba(244,114,56,0.2)", "rgba(255,255,255,0.05)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
            </div>

            {/* Right: Query */}
            <div className="w-1/2 p-4 flex flex-col items-center pt-8">
                <span className={`text-xs font-mono uppercase ${ACCENT} mb-4`}>Fetch</span>
                 <div className="border border-white/20 p-2 rounded w-full mb-2 bg-white/5">
                    <div className="w-full h-6 border border-white/10 rounded mb-2 flex items-center px-2 text-[10px] text-white/40">Search...</div>
                </div>
                
                {/* Flow Animation */}
                <div className="h-16 w-[1px] bg-white/10 relative my-2">
                    <motion.div 
                         className="absolute top-0 w-full h-4 bg-white"
                         animate={{ top: ["0%", "100%", "0%"] }}
                         transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                <IconServer className="w-6 h-6 text-white/50 mb-2" />

                <div className="w-full space-y-1 mt-2">
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <motion.div 
                        className={`h-2 w-2/3 bg-white/10 rounded`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <div className="h-2 w-full bg-white/10 rounded" />
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-white/10 z-10 bg-[#1A1A1A]">
             <h3 className="text-lg font-medium mb-1">Server Functions</h3>
             <p className={`text-sm ${TEXT_SUB}`}>Typesafe sharing of data and intent. Actions sync the view; Queries fetch data.</p>
        </div>

         <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
        </div>
    </div>
  );
}

// Tile 3: Smooth Navigation
export function Tile3_Navigation() {
    const [page, setPage] = useState("A");

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(p => p === "A" ? "B" : "A");
        }, 3000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div
      className={`${BLUEPRINT_BG} ${TEXT_MAIN} border ${BLUEPRINT_LINE} rounded-xl relative overflow-hidden h-[400px] flex flex-col`}
    >
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
             <div className="flex items-center gap-8 w-full justify-center mb-8">
                 {/* Link Click */}
                 <div className="flex flex-col items-center">
                     <div className={`text-xs font-mono mb-2 ${ACCENT}`}>Link</div>
                     <motion.div 
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center cursor-pointer"
                        animate={{ scale: [1, 0.9, 1] }}
                        transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 1] }}
                     >
                         <div className="w-2 h-2 bg-white rounded-full" />
                     </motion.div>
                 </div>

                 {/* Server Pipe */}
                 <div className="flex-1 h-[2px] bg-white/10 relative">
                     <motion.div 
                        className={`absolute left-0 h-full w-12 ${ACCENT_BG}`}
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                     />
                 </div>

                 {/* Server */}
                 <div className="flex flex-col items-center">
                     <div className="text-xs font-mono mb-2 opacity-50">Auth</div>
                     <IconServer className="w-8 h-8 text-white/50" />
                 </div>
             </div>

             {/* Browser Window */}
             <div className="w-full max-w-[200px] aspect-[4/3] border border-white/20 rounded bg-black/20 relative overflow-hidden">
                 <div className="absolute top-0 w-full h-4 border-b border-white/10 flex items-center px-2 gap-1">
                     <div className="w-2 h-2 rounded-full bg-white/20" />
                     <div className="w-2 h-2 rounded-full bg-white/20" />
                 </div>
                 
                 <div className="p-4 pt-8 h-full relative">
                     <motion.div
                        key={page}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute inset-0 p-4 pt-8"
                     >
                        <div className="w-1/2 h-4 bg-white/10 rounded mb-2" />
                        <div className="w-full h-2 bg-white/5 rounded mb-1" />
                        <div className="w-3/4 h-2 bg-white/5 rounded" />
                        <div className={`mt-4 text-xs ${ACCENT}`}>Page {page}</div>
                     </motion.div>
                 </div>
             </div>
        </div>

        <div className="p-6 border-t border-white/10 z-10 bg-[#1A1A1A]">
             <h3 className="text-lg font-medium mb-1">Smooth Navigation</h3>
             <p className={`text-sm ${TEXT_SUB}`}>Secure routing with the fluid motion of a Single Page App. Zero full-page reloads.</p>
        </div>

         <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
        </div>
    </div>
  );
}
