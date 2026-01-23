"use client";
import React, { useState } from "react";
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

export default function RouterWalkthrough() {
  const [currentStep, setCurrentStep] = useState(4);
  const step = routerWalkthroughSteps[currentStep];

  // Track the code from the previous render to detect step changes
  const previousCodeRef = React.useRef<string>("");
  const prevKeysRef = React.useRef<Set<string>>(new Set());
  const isFirstMountRef = React.useRef(true);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Description Side */}
        <div className="lg:col-span-1 space-y-6 pt-4">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-widest">
                  Step {currentStep + 1}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed min-h-[80px]">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Previous step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex gap-2">
              {routerWalkthroughSteps.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === index 
                      ? "w-8 bg-slate-800" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(Math.min(routerWalkthroughSteps.length - 1, currentStep + 1))}
              disabled={currentStep === routerWalkthroughSteps.length - 1}
              className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              aria-label="Next step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Code Side */}
        <div className="lg:col-span-2 relative">
          <div className="relative bg-[#1B1B1B] rounded-xl overflow-hidden shadow-2xl min-h-[400px]">
            <div className="p-4 overflow-auto custom-scrollbar">
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
                              {...getLineProps({ line, key: i })}
                              className="flex w-full overflow-hidden shrink-0 relative"
                            >
                              <span className="shrink-0 text-right pr-4 select-none opacity-30 w-8">
                                {lineNumber}
                              </span>
                              <span className="grow">
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token, key })} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
