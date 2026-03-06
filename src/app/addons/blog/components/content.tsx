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
            :host { position:absolute; top:.75rem; right:.75rem; opacity:0; transition:opacity .2s }
            button { font-family:'JetBrains Mono',monospace; font-size:11px; padding:.25rem .6rem; border-radius:6px; border:1px solid rgba(233,180,106,.25); background:rgba(13,13,13,.8); color:#E9B46A; cursor:pointer; transition:all .15s }
            button:hover { background:rgba(233,180,106,.15); border-color:rgba(233,180,106,.5) }
          `;
          shadow.append(style, btn);
        }
        connectedCallback() {
          const pre = this.parentElement;
          if (pre) {
            pre.addEventListener("mouseenter", () => (this.style.opacity = "1"));
            pre.addEventListener("mouseleave", () => (this.style.opacity = "0"));
          }
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
      className="prose prose-slate dark:prose-invert prose-lg w-full max-w-none prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-dark-primary prose-headings:leading-tight prose-p:text-slate-700 dark:prose-p:text-dark-secondary prose-p:leading-relaxed dark:prose-strong:text-dark-primary dark:prose-a:text-dark-accent dark:prose-blockquote:text-dark-secondary dark:prose-code:text-dark-primary dark:prose-li:text-dark-secondary"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}