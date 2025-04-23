---
title: "Per-Route Documents in RedwoodSDK: Total Control Over Your HTML"
description: "Most frameworks give you a fixed HTML document: a `<!DOCTYPE html>` page with a `<head>`, a `<body>`, and a root div for React to hydrate into. You might be able to tweak the title or inject a meta tag—but the structure? That’s locked down."
date: "2025-05-23"
author:
  id: "peter"
heroImage: "a63a9f22-bb6f-440d-36a4-c230a784bd00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/a63a9f22-bb6f-440d-36a4-c230a784bd00/public"
tags: ["redwoodsdk", "html", "guide"]
---

# Per-Route Documents in RedwoodSDK: Total Control Over Your HTML

Most frameworks give you a fixed HTML document: a `<!DOCTYPE html>` page with a `<head>`, a `<body>`, and a root div for React to hydrate into. You might be able to tweak the title or inject a meta tag—but the structure? That’s locked down.

**RedwoodSDK takes a different approach.**

In Redwood, every route can define its own document. Not just the content. The **document**. That means you choose the structure, the scripts, and even whether React runs in the browser at all.

Here’s what that looks like:

```tsx
// src/app/Document.tsx

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>My App</title>
      <link rel="preload" href="/src/client.tsx" as="script" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script src="/src/client.tsx"></script>
    </body>
  </html>
);
```

Simple, explicit, and powerful.

---

## Why This Matters

Let’s break it down:

- **No React in the browser?** Remove the `<script>` tag. You’re shipping static HTML.
- **Want client-side interactivity?** Include a `<script>` to hydrate the page.
- **Custom behavior per route?** Define a different `Document` component for each one.

If you don’t include hydration, React is used purely as a **templating language**—it renders HTML on the server, and that’s it. That’s perfect for marketing pages, blog posts, docs—things that don’t need JavaScript at all.

Want to add React Server Components that personalize content server-side? You can.

Want to hydrate a dynamic dashboard? Just include the right script.

Want to replace the `<script>` with a socket-based hydration strategy? Nothing’s stopping you.

---

## One App, Many Modes

Because you define the document per route, you can build:

- `/`: a static homepage with zero JavaScript
- `/app/user/login`: an interactive form with client-side validation
- `/app/dashboard`: a realtime UI hydrated over websockets

```tsx
// src/worker.tsx

import { defineApp } from '@redwoodjs/sdk/worker'
import { render, route, prefix } from '@redwoodjs/sdk/router'

import { StaticDocument } from '@/app/StaticDocument.tsx'
import { StandardDocument } from '@/app/StandardDocument.tsx'
import { RealtimeDocument } from '@/app/RealtimeDocument.tsx'

export default defineApp([
  render(StaticDocument, [
    route('/', HomePage),
    prefix('/blog', blogRoutes),
  ]),

  render(StandardDocument, [
    prefix('/app/user', userRoutes),
  ])

  render(RealtimeDocument, [
    prefix('/app/dashboard', dashboardRoutes),
  ])
])
```

All in the same app. All running in the same Cloudflare worker.

That’s not common. Most frameworks treat the document as a global, one-size-fits-all concern. RedwoodSDK treats it as just another component—one you control.

---

## Why We Designed It This Way

RedwoodSDK is built for Cloudflare, where the edge is the server. That means low-latency rendering, streaming responses, and precise control over what gets sent down the wire.

We don’t want to hide that. We want to **hand it to you**.

This model encourages you to think like a browser. To optimize where it matters. To ship the right payload for the job.

It’s personal software thinking applied to web apps.

---

## TL;DR

RedwoodSDK gives you full control over your HTML document, per route.

- Define your own structure with a `Document` component
- Choose when (and if) to hydrate with React
- Build fast, static, dynamic, or realtime—all in one app

It’s HTML-first, React-powered, and totally under your control.
