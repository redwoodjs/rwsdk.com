---
title: "Sprinkle Interactivity into Markdown with Web Components in RedwoodSDK"
description: "How to add a copy-to-clipboard button to Markdown code blocks using RedwoodSDK and Web Components."
date: "2025-08-25"
author: 
  id: "herman"
heroImage: "549cf820-5dba-4a30-56e4-37b23dde3300"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/b206f340-ab90-4e0c-7a8d-df498a91d300/public"
tags: ["redwoodsdk", "markdown", "webcomponents"]
---

# Sprinkle some Interactivity into Markdown with Web Components in RedwoodSDK

_When your Markdown becomes HTML, how do you keep it interactive?_  
Let’s add a **Copy to clipboard** button to every code block in a RedwoodSDK blog without MDX or heavy remark plugins.

---

## The Problem

Rendering Markdown in RedwoodSDK is simple: turn it into HTML and drop it into the page. But:

- React doesn’t “own” the nodes created by `dangerouslySetInnerHTML`.
- Server-rendered HTML can’t hydrate unknown components without mismatches.
- We want interactivity — but without rewriting all Markdown as JSX.

Classic example: **copy-to-clipboard buttons on code blocks.**

---

## The Trick: Web Components

Browsers natively support **Custom Elements**. That means:

1. Render `<copy-button>` right in your HTML.
2. Browser ignores it until you define it.
3. Call `customElements.define(...)` on the client.
4. Browser upgrades all `<copy-button>` tags into live components with logic.

This makes Web Components a perfect match for Markdown:  
they can be embedded in static HTML, yet still work interactively.

---

## Step 1: Markdown Renderer

Here’s a RedwoodSDK client component that highlights code with `highlight.js`:

```tsx
"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

export default function Content({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <div
      ref={ref}
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
```

---

## Step 2: Define `<copy-button>`

Inside the same component, register the custom element on the client:

```tsx
useEffect(() => {
  if (typeof window !== "undefined" && !customElements.get("copy-button")) {
    class CopyButtonEl extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const btn = document.createElement("button");
        btn.textContent = "Copy";
        btn.onclick = async () => {
          const pre = this.parentElement;
          const code = pre?.querySelector("code")?.textContent ?? "";
          await navigator.clipboard.writeText(code);
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 1200);
        };
        shadow.append(btn);
      }
    }
    customElements.define("copy-button", CopyButtonEl);
  }
}, []);
```

---

## Step 3: Inject Buttons into Code Blocks

Still inside the effect, loop through `<pre>` tags and append:

```tsx
const pres = ref.current.querySelectorAll("pre");
pres.forEach((pre) => {
  if (!pre.querySelector("copy-button")) {
    pre.style.position = "relative";
    pre.appendChild(document.createElement("copy-button"));
  }
});
```

Now every `<pre>` gets its own button.

---

## Why This Works (and Why It’s Cool)

- **No MDX required.** Keep Markdown as Markdown.  
- **Framework-agnostic.** Works in RedwoodSDK, Next.js, Vue, anywhere.  
- **SSR safe.** Server renders `<copy-button>`. Browser upgrades it.  
- **Progressive enhancement.** Without JS: plain code block. With JS: copy button.  

This trick applies to more than copy buttons: think tabs, spoilers, tooltips, callouts, etc.

---

## Final Thoughts

Web Components are the simplest way to sprinkle interactivity into Markdown-rendered content.  
With RedwoodSDK’s RSC/SSR model, you get the best of both worlds:

- Server-rendered HTML for performance.  
- Lightweight client-side upgrades for interactivity.  
---

Happy building!