"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

export default function Content({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- 1. Define <copy-button> if not already defined ---
    if (typeof window !== "undefined" && !customElements.get("copy-button")) {
      class CopyButtonEl extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          const btn = document.createElement("button");
          btn.textContent = "Copy";
          btn.addEventListener("click", async () => {
            const pre = this.parentElement;
            const codeEl = pre?.querySelector("code");
            const text = codeEl?.textContent ?? "";
            await navigator.clipboard.writeText(text);
            btn.textContent = "Copied!";
            setTimeout(() => (btn.textContent = "Copy"), 1200);
          });
          const style = document.createElement("style");
          style.textContent = `
            :host { position:absolute; top:.5rem; right:.5rem }
            button { font:inherit; padding:.25rem .5rem; border-radius:.375rem; border:1px solid currentColor; cursor:pointer }
          `;
          shadow.append(style, btn);
        }
      }
      customElements.define("copy-button", CopyButtonEl);
    }

    // --- 2. Highlight code blocks ---
    if (ref.current) {
      const codeBlocks = ref.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => hljs.highlightElement(block as HTMLElement));

      // --- 3. Append copy buttons to <pre> ---
      const pres = ref.current.querySelectorAll("pre");
      pres.forEach((pre, idx) => {
        if (!pre.querySelector("copy-button")) {
          pre.style.position = "relative";
          const btn = document.createElement("copy-button");
          pre.appendChild(btn);
        }
      });
    }
  }, [content]);

  return (
    <div
      ref={ref}
      className="prose prose-lg w-full max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}