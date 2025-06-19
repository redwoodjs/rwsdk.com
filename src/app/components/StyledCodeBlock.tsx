"use client";
import React, { useEffect, useState } from "react";
import { Highlight } from "prism-react-renderer";
import type { PrismTheme } from "prism-react-renderer";

const customTheme: PrismTheme = {
  plain: {
    backgroundColor: "#1B1B1B",
    color: "#E9B46A",
  },
  styles: [
    { types: ["keyword"], style: { color: "#C55447" } },
    { types: ["function"], style: { color: "#D58052" } },
    { types: ["string", "attr-value"], style: { color: "#E9B46A" } },
    { types: ["number"], style: { color: "#995369" } },
    { types: ["comment"], style: { color: "#6E6A5E", fontStyle: "italic" as const } },
    { types: ["punctuation"], style: { color: "#9C9781" } },
    { types: ["variable"], style: { color: "#9C9781" } },
    // HTML specific
    { types: ["tag"], style: { color: "#C55447" } },
    { types: ["attr-name"], style: { color: "#D58052" } },
  ],
};

interface Props {
  codeBlocks: string[];
}

export default function StyledCodeBlock({ codeBlocks }: Props) {
  const blocks = codeBlocks.length ? codeBlocks : [""];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // calculate tallest block to prevent layout shift
  const maxLines = React.useMemo(() => {
    return Math.max(...blocks.map((b) => b.split("\n").length));
  }, [blocks]);

  // helper to transition to next index smoothly
  const fadeTo = (next: number) => {
    if (next === index) return;
    setVisible(false);
    setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, 250); // half of transition duration
  };

  useEffect(() => {
    if (blocks.length <= 1) return;
    const id = setInterval(() => {
      fadeTo((index + 1) % blocks.length);
    }, 5000);
    return () => clearInterval(id);
  }, [blocks.length, index]);

  // handle fade effect on index change
  useEffect(() => {
    // ensure visibility reset when blocks change externally
    setVisible(true);
    const t = setTimeout(() => setVisible(true), 50); // trigger fade-in
    return () => clearTimeout(t);
  }, [index]);

  return (
    <>
    <div
      style={{
        minHeight: `${maxLines * 1.5}em`,
        backgroundColor: customTheme.plain.backgroundColor,
        borderRadius: "8px",
        padding: "1em",
      }}
    >
      <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Highlight key={index} code={blocks[index]} language="tsx" theme={customTheme}>
        {({ className = "", style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: "1em",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => {
              const { key: _k, ...restLine } = getLineProps({ line, key: i });
              return (
                <div key={i} {...restLine}>
                  {line.map((token, k) => {
                    const { key: _key, ...restToken } = getTokenProps({ token, key: k });
                    return <span key={k} {...restToken} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
      </div>
    </div>

    {/* pagination dots */}
    {blocks.length > 1 && (
      <div className="flex justify-center gap-2 mt-2">
        {blocks.map((_, i) => (
          <button
            key={i}
            onClick={() => fadeTo(i)}
            className={`w-2 h-2 rounded-full cursor-pointer focus:outline-none ${i === index ? 'bg-orange-400' : 'bg-gray-500 opacity-50'}`}
            aria-label={`Show code snippet ${i + 1}`}
          />
        ))}
      </div>
    )}
    </>
  );
}