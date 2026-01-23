"use client";
import React, { useState, useEffect, useRef } from "react";
import { Highlight } from "prism-react-renderer";
import type { PrismTheme } from "prism-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
import { routerWalkthroughSteps } from "../data/router_walkthrough";

// Matching theme from StyledCodeBlock/CodeWalkthrough
const walkthroughTheme: PrismTheme = {
  plain: {
    backgroundColor: "#1B1B1B",
    color: "#E9B46A",
  },
  styles: [
    { types: ["keyword"], style: { color: "#C55447" } },
    { types: ["function"], style: { color: "#D58052" } },
    { types: ["string", "attr-value"], style: { color: "#E9B46A" } },
    { types: ["number"], style: { color: "#995369" } },
    {
      types: ["comment"],
      style: { color: "#3B82F6", fontStyle: "italic" as const },
    },
    { types: ["punctuation", "variable"], style: { color: "#9C9781" } },
    { types: ["tag"], style: { color: "#C55447" } },
    { types: ["attr-name"], style: { color: "#D58052" } },
  ],
};


function ActiveConnection({ 
  activeLine, 
  containerRef,
  scrollRef 
}: { 
  activeLine: number | undefined, 
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollRef: React.RefObject<HTMLDivElement | null>
}) {
  const [coords, setCoords] = useState<{sx:number, sy:number, ex:number, ey:number, side: 'left-swing' | 'right', containerLeft: number} | null>(null);

  useEffect(() => {
    if (!activeLine || !containerRef.current || !scrollRef.current) {
        setCoords(null);
        return;
    }

    const updatePosition = () => {
        const lineEl = document.getElementById(`code-line-${activeLine}`);
        const descEl = document.getElementById("description-panel");
        const container = containerRef.current;
        const scrollArea = scrollRef.current;

        if (!lineEl || !descEl || !container || !scrollArea) return;



        const lineRect = lineEl.getBoundingClientRect();
        const descRect = descEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Find the code container to check layout mode
        const codeContainer = scrollArea.parentElement;
        const codeContainerRect = codeContainer ? codeContainer.getBoundingClientRect() : containerRef.current?.querySelector('.lg\\:col-span-3')?.getBoundingClientRect();

        // Check if stacked based on window width matching Tailwind 'lg' breakpoint (1024px)
        // This is the most robust way to sync with the CSS grid layout changes.
        const isDesktop = window.innerWidth >= 1024;
        const isStacked = !isDesktop; 

        // --- Code Side (Target) ---
        const codeContentEl = lineEl.querySelector("span.grow");
        
        let codeX, codeY;

        if (isStacked) {
            // Stacked (Mobile): Connect to BOTTOM CENTER of the TEXT content
            // We want the center of the actual code characters, not the full line width
            
            // Get range of content
            const firstToken = codeContentEl?.firstElementChild;
            const lastToken = codeContentEl?.lastElementChild;
            
            let textLeft = lineRect.left;
            let textWidth = lineRect.width;
            
            if (firstToken && lastToken) {
                 const firstRect = firstToken.getBoundingClientRect();
                 const lastRect = lastToken.getBoundingClientRect();
                 textLeft = firstRect.left;
                 // Width is distance from left of first to right of last
                 textWidth = lastRect.right - firstRect.left;
            } else if (codeContentEl) {
                 // Fallback if no tokens (e.g. empty line or text node)
                 const rect = codeContentEl.getBoundingClientRect();
                 textLeft = rect.left;
                 textWidth = rect.width;
            }

            // Target the LEFT EDGE of the text (Arrow points Right)
            codeX = textLeft - containerRect.left - 8; // Small gap from text start
            
            // Connect to VERTICAL CENTER of the line
            codeY = lineRect.top - containerRect.top + (lineRect.height / 2);
        } else {
            // Desktop: Connect to RIGHT SIDE of the code
            const lastToken = codeContentEl?.lastElementChild || codeContentEl;
            const sourceRect = lastToken ? lastToken.getBoundingClientRect() : lineRect;
            
            codeX = sourceRect.right - containerRect.left + 4;
            codeY = sourceRect.top - containerRect.top + (sourceRect.height / 2);
        }
        
        // --- Text Side (Source) ---
        // Find the Header (h3) within the description panel
        // Use the span inside h3 to get the text width/center instead of full block width
        const headerEl = descEl.querySelector("h3 span") || descEl.querySelector("h3");
        // Fallback to descEl if header not found
        const headerRect = headerEl ? headerEl.getBoundingClientRect() : descRect;

        let textX, textY;

        if (isStacked) {
             // Stacked (Mobile): Connect to TOP CENTER of the Header
             textX = (headerEl ? headerRect.left : descRect.left) - containerRect.left + (headerRect.width / 2);
             textY = (headerEl ? headerRect.top : descRect.top) - containerRect.top;
        } else {
             // Desktop: Connect to LEFT of Header
             textX = (headerEl ? headerRect.left : descRect.left) - containerRect.left - 4;
             textY = (headerEl ? headerRect.top : descRect.top) - containerRect.top + (headerRect.height / 2);
        }

        setCoords({ 
            sx: textX, 
            sy: textY, 
            ex: codeX, 
            ey: codeY, 
            side: isStacked ? 'left-swing' : 'right',
            containerLeft: 0
        });
    };

    // Initial update
    updatePosition();
    
    // Continuous update for the duration of the animation (approx 600ms)
    // to track the moving text 'origin'
    let animationFrameId: number;
    const startTime = performance.now();
    
    const animate = () => {
        updatePosition();
        if (performance.now() - startTime < 600) {
            animationFrameId = requestAnimationFrame(animate);
        }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener("resize", updatePosition);
    scrollRef.current.addEventListener("scroll", updatePosition);

    return () => {
        window.removeEventListener("resize", updatePosition);
        scrollRef.current?.removeEventListener("scroll", updatePosition);
        cancelAnimationFrame(animationFrameId);
    };
  }, [activeLine, containerRef, scrollRef]);

  if (!coords) return null;

  const { sx, sy, ex, ey, side, containerLeft } = coords;
  
  // Path strategy: S-Curve
  // Start at Text (sx, sy), End at Code (ex, ey)
  
  let cp1x, cp1y, cp2x, cp2y;
  
  if (side === 'left-swing') {
      // Stacked Mode: "Swing" C-Curve
      // Curve starts STRAIGHT UP (vertical) then swings left
      
      const swingX = -10; // 40px left of container edge

      // Control Point 1 (Text): Go STRAIGHT UP from Text (sx)
      // This enforces the "straight start" from the text source
      cp1x = sx; 
      cp1y = sy - 40; // Go up 40px vertically before curving
      
      // Control Point 2 (Code): Swing mostly from the left, aiming at target height
      cp2x = swingX;
      cp2y = ey; 
  } else {
      // Desktop Mode: Horizontal S-Curve (Source Left -> Target Right)
      const xDiff = Math.abs(sx - ex);
      const dist = Math.max(xDiff * 0.5, 50);

      // Start (Text): Go LEFT
      cp1x = sx - dist;
      cp1y = sy;
      
      // End (Code): Go RIGHT (from code perspective)
      cp2x = ex + dist;
      cp2y = ey;
  }
  
  const path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
       <defs>
         <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" stopColor="#3B82F6" />   {/* Blue at Text */}
           <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan at Code */}
         </linearGradient>
         <linearGradient id="line-gradient-vertical" gradientUnits="userSpaceOnUse" x1={sx} y1={sy} x2={ex} y2={ey}>
           <stop offset="0%" stopColor="#3B82F6" />   {/* Blue at Text (Start) */}
           <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan at Code (End) */}
         </linearGradient>
         <filter id="glow">
           <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
           <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
           </feMerge>
         </filter>
       </defs>

       {/* Curve */}
       <motion.path 
         d={path} 
         stroke={side === 'left-swing' ? "url(#line-gradient-vertical)" : "url(#line-gradient)"}
         strokeWidth="3" 
         fill="none" 
         filter="url(#glow)"
         initial={{ pathLength: 0, opacity: 0 }} 
         animate={{ pathLength: 1, opacity: 1 }}
         transition={{ 
           pathLength: { duration: 0.4, ease: "easeOut" },
           opacity: { duration: 0.2 }
         }}
       />

       {/* Arrowhead at Code (Target) */}
       { side === 'left-swing' ? (
         // Pointing RIGHT (Target is approached from Left)
         <motion.path
           d={`M ${ex - 6} ${ey - 5} L ${ex} ${ey} L ${ex - 6} ${ey + 5}`}
           stroke="#22D3EE"
           strokeWidth="3"
           fill="none"
           strokeLinecap="round"
           strokeLinejoin="round"
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 0.2 }}
         />
       ) : side === 'right' ? (
         <motion.path
           d={`M ${ex + 6} ${ey - 5} L ${ex} ${ey} L ${ex + 6} ${ey + 5}`}
           stroke="#22D3EE"
           strokeWidth="3"
           fill="none"
           strokeLinecap="round"
           strokeLinejoin="round"
           initial={{ opacity: 0, x: 10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 0.2 }}
         />
       ) : (
         <motion.path
           d={`M ${ex - 6} ${ey - 5} L ${ex} ${ey} L ${ex - 6} ${ey + 5}`}
           stroke="#22D3EE"
           strokeWidth="3"
           fill="none"
           strokeLinecap="round"
           strokeLinejoin="round"
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 0.2 }}
         />
       )}
    </svg>
  );
}

export default function RouterWalkthrough() {
  const [currentStep, setCurrentStep] = useState(4);
  const step = routerWalkthroughSteps[currentStep];

  // Track the code from the previous render to detect step changes
  const previousCodeRef = React.useRef<string>("");
  const prevKeysRef = React.useRef<Set<string>>(new Set());
  const isFirstMountRef = React.useRef(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start relative" ref={containerRef}>
        <ActiveConnection 
          key={currentStep}
          activeLine={step.focusLine} 
          containerRef={containerRef}
          scrollRef={scrollContainerRef}
        />
        {/* Code Side */}
        <div className="lg:col-span-3 relative">
          <div className="relative bg-[#1B1B1B] rounded-xl overflow-hidden shadow-2xl h-[500px] flex flex-col">
            <div className="p-4 overflow-auto custom-scrollbar grow" ref={scrollContainerRef}>
              <Highlight
                code={step.code}
                language="tsx"
                theme={walkthroughTheme}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => {
                  const contentCounts: Record<string, number> = {};
                  const currentKeys = new Set<string>();

                  // First pass: generate stable keys for all lines
                  const linesWithKeys = tokens.map((line, i) => {
                    const content = line.map(t => t.content).join("");
                    const occurrence = contentCounts[content] || 0;
                    contentCounts[content] = occurrence + 1;
                    const key = `${content}-${occurrence}`;
                    currentKeys.add(key);
                    return { line, key, i };
                  });

                  // Detect step changes and first mount
                  const hasCodeChanged = step.code !== previousCodeRef.current;
                  const isFirstMount = isFirstMountRef.current;
                  
                  // Appearing keys are those that weren't in the LAST step
                  const appearingKeys = hasCodeChanged 
                    ? isFirstMount ? currentKeys : new Set([...currentKeys].filter(k => !prevKeysRef.current.has(k)))
                    : new Set<string>(); // Keep stable if code hasn't changed

                  const result = (
                    <pre
                        className={`${className} font-mono text-xs sm:text-sm leading-relaxed relative`}
                        style={{ ...style, backgroundColor: "transparent" }}
                      >
                        {linesWithKeys.map(({ line, key, i }) => {
                           const lineNumber = i + 1;
                           const isHighlighted = step.highlightLines?.includes(lineNumber);
                           const isNewLine = appearingKeys.has(key);

                           const variants = {
                             initial: { 
                               opacity: 1, 
                               height: "auto",
                               y: 0,
                               backgroundColor: isHighlighted ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0)"
                             },
                             enter: { 
                               opacity: 1, 
                               height: "auto",
                               y: 0,
                               backgroundColor: isHighlighted ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0)"
                             },
                             stable: { 
                               opacity: 1, 
                               height: "auto",
                               y: 0,
                               backgroundColor: isHighlighted ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0)"
                             }
                           };

                           return (
                            <motion.div
                              key={key}
                              variants={variants}
                              initial={isNewLine ? "initial" : "stable"}
                              animate={isNewLine ? "enter" : "stable"}
                              transition={{ duration: 0 }}
                              {...(() => {
                                const { key: _key, ...rest } = getLineProps({ line, key: i });
                                return rest;
                              })()}
                              className="flex w-full overflow-hidden shrink-0 relative"
                              id={`code-line-${lineNumber}`}
                            >
                              <span className="shrink-0 text-right pr-4 select-none opacity-30 w-8">
                                {lineNumber}
                              </span>
                              <span className="grow">
                                {line.map((token, key) => (
                                  <span key={key} {...(() => {
                                    const { key: _key, ...rest } = getTokenProps({ token, key });
                                    return rest;
                                  })()} />
                                ))}
                              </span>
                            </motion.div>
                          )
                        })}
                      </pre>
                  );

                  // Update refs for next render
                  if (hasCodeChanged) {
                    previousCodeRef.current = step.code;
                    prevKeysRef.current = currentKeys;
                    isFirstMountRef.current = false;
                  }

                  return result;
                }}
              </Highlight>
            </div>
            <div className="flex justify-center items-center gap-4 py-4 shrink-0 bg-[#1B1B1B] relative z-10 border-t border-white/5">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="p-2 text-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Previous step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="font-mono text-sm text-gray-400">
              {currentStep + 1} / {routerWalkthroughSteps.length}
            </div>

            <button
              onClick={() => setCurrentStep(Math.min(routerWalkthroughSteps.length - 1, currentStep + 1))}
              disabled={currentStep === routerWalkthroughSteps.length - 1}
              className="p-2 text-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Next step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          </div>
        </div>

        {/* Description Side */}
        <div className="lg:col-span-2 space-y-6">


          <div className="space-y-4" id="description-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  <span>{step.title}</span>
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed min-h-[80px]">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
