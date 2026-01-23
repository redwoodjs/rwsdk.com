"use client";
import React, { useState, useEffect } from "react";
import { Highlight } from "prism-react-renderer";
import type { PrismTheme } from "prism-react-renderer";
import {
  tutorialSteps,
  type TutorialStep,
  type Annotation,
} from "../../data/tutorial";
import RPCVisualizer from "./rpc-visualizer";

// Matching theme from StyledCodeBlock
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
      style: { color: "#6E6A5E", fontStyle: "italic" as const },
    },
    { types: ["punctuation", "variable"], style: { color: "#9C9781" } },
    { types: ["tag"], style: { color: "#C55447" } },
    { types: ["attr-name"], style: { color: "#D58052" } },
  ],
};

interface CodeWalkthroughProps {
  steps?: TutorialStep[];
}

export default function CodeWalkthrough({
  steps = tutorialSteps,
}: CodeWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(
    null
  );

  const step: TutorialStep = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goToPrevious = () => {
    if (isFirst) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setVisible(true);
    }, 150);
  };

  const goToNext = () => {
    if (isLast) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setVisible(true);
    }, 150);
  };

  useEffect(() => {
    setHoveredAnnotation(null);
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]); // Re-bind so closures have fresh state or use functional updates in setters if preferred

  return (
    <div className="w-full">
      {/* Container for the window and its dithered shadow */}
      <div className="relative mb-6">
        {/* Modern-Retro Window Frame */}
        <div className="relative bg-[#1B1B1B] rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[400px]">
            {/* Code Content Area (Sunken) */}
            <div className="flex-[2] bg-[#1B1B1B] overflow-auto custom-scrollbar p-3">
              <div
                className={`transition-opacity duration-200 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                <Highlight
                  key={currentStep}
                  code={step.code}
                  language="tsx"
                  theme={walkthroughTheme}
                >
                  {({
                    className = "",
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={`${className} font-mono text-[11px] sm:text-[13px] leading-relaxed`}
                      style={{ ...style, backgroundColor: "transparent" }}
                    >
                      {tokens.map((line, i) => {
                        const lineNumber = i + 1;
                        const isHighlighted =
                          step.highlightLines?.includes(lineNumber);
                        const { key: _k, ...restLine } = getLineProps({
                          line,
                          key: i,
                        });

                        return (
                          <div
                            key={i}
                            {...restLine}
                            className={`flex gap-4 ${
                              isHighlighted ? "bg-slate-700/50" : ""
                            } ${
                              hoveredAnnotation?.lines?.includes(lineNumber)
                                ? "bg-slate-700/30"
                                : ""
                            } transition-all duration-150 py-0.5`}
                          >
                            {/* Line Number Gutter */}
                            <span
                              className={`w-8 text-right select-none opacity-40 ${
                                isHighlighted ||
                                hoveredAnnotation?.lines?.includes(lineNumber)
                                  ? "text-white opacity-100"
                                  : ""
                              }`}
                            >
                              {lineNumber}
                            </span>
                            {/* Line Content */}
                            <div
                              className={`flex-1 ${
                                !isHighlighted &&
                                !visible &&
                                !hoveredAnnotation?.lines?.includes(lineNumber)
                                  ? "opacity-0"
                                  : !isHighlighted &&
                                    !hoveredAnnotation?.lines?.includes(
                                      lineNumber
                                    )
                                  ? "opacity-40"
                                  : "opacity-100"
                              }`}
                            >
                              {line.map((token, k) => {
                                const { key: _key, ...restToken } =
                                  getTokenProps({
                                    token,
                                    key: k,
                                  });

                                const isHoveredText =
                                  hoveredAnnotation?.text &&
                                  hoveredAnnotation.lines?.includes(
                                    lineNumber
                                  ) &&
                                  (token.content.includes(
                                    hoveredAnnotation.text.replace(/['"]/g, "")
                                  ) ||
                                    (hoveredAnnotation.text.includes(
                                      token.content
                                    ) &&
                                      token.content.trim().length > 1));

                                return (
                                  <span
                                    key={k}
                                    {...restToken}
                                    className={`${
                                      isHoveredText
                                        ? "underline decoration-orange-400 decoration-2 underline-offset-4 transition-all duration-300"
                                        : ""
                                    }`}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>

            {/* Sidebar (Sunken) */}
            <div className="flex-1 bg-slate-800/50 p-4 overflow-auto custom-scrollbar">
              <div
                className={`transition-opacity duration-200 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-[#E9B46A] text-xs sm:text-sm leading-relaxed mb-6">
                  {step.annotations
                    ? step.description.split(/(\s+)/).map((part, i) => {
                        const cleanWord = part.replace(/[.,]/g, "").trim();
                        const annotation = step.annotations?.find(
                          (a) => a.word === cleanWord
                        );

                        if (annotation) {
                          return (
                            <span
                              key={i}
                              onMouseEnter={() =>
                                setHoveredAnnotation(annotation)
                              }
                              onMouseLeave={() => setHoveredAnnotation(null)}
                              className="underline decoration-slate-500 hover:decoration-orange-400 cursor-help transition-colors"
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })
                    : step.description}
                </p>

                {step.interactionKey?.startsWith("rpc-") && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <RPCVisualizer interactionKey={step.interactionKey} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retro-Modern Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrevious}
          disabled={isFirst}
          className={`px-4 py-2 text-xs font-bold uppercase border-2 transition-all active:translate-y-[1px] ${
            isFirst
              ? "bg-[#E0E0E0] border-slate-200 text-slate-300 cursor-not-allowed"
              : "bg-[#C0C0C0] border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-black active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white hover:bg-[#D0D0D0]"
          }`}
        >
          ←
        </button>

        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {currentStep + 1} / {steps.length}
        </div>

        <button
          onClick={goToNext}
          disabled={isLast}
          className={`px-4 py-2 text-xs font-bold uppercase border-2 transition-all active:translate-y-[1px] ${
            isLast
              ? "bg-[#E0E0E0] border-slate-200 text-slate-300 cursor-not-allowed"
              : "bg-[#C0C0C0] border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-black active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white hover:bg-[#D0D0D0]"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}
