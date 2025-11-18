---
title: "Splitting Admin and App in RedwoodSDK: Why, How, and What You Gain"
description: "Separate admin from your main app to improve performance, security, and developer experience using RedwoodSDK’s multi-render model."
date: "2025-11-18"
author:
  id: "herman"
heroImage: "7f4b39d4-e914-4eea-0f52-075215da0a00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/20d9f6a5-04bf-476d-8338-821b38517600/public"
tags: ["redwoodsdk", "architecture", "routing", "auth"]
---

# Splitting Admin and App in RedwoodSDK: Why, How, and What You Gain

Splitting your admin console from the customer-facing app is one of those small architectural decisions that pays off every day. In RedwoodSDK, the split leans into the framework’s multi-render model and declarative router. The main app stays lean and fast for everyday workflows, while the admin console can ship heavier UI and management tooling without making customers pay for it. Security becomes clearer too: admin-only routes, assets, and UI are isolated and consistently gated behind admin checks instead of sprinkled ad‑hoc across the app. Because each surface has its own `Document`, layout, and top‑level navigation, you get complete design autonomy—different look-and-feel, fonts, CSP, and shell behaviors—without complex conditionals. Operationally, you can roll admin changes separately, test them in isolation, and keep admin-only bundles out of your main app’s critical path and caches. The result is better developer ergonomics and a simpler mental model for routing and middleware.

Here’s how it works in practice. Mount two independent rendering trees under a single Worker—one for the app, one for admin—each with its own `Document` and `Layout`, distinct route trees, and their own middleware chains. You’re composing standard primitives from the router and Worker APIs, so it stays obvious and testable. If you’re new to these pieces, the router is covered in the docs at `https://docs.rwsdk.com/core/routing/`, and interruptors (route‑level middleware) are introduced here: `https://docs.rwsdk.com/core/routing/#interrupters`. For a deeper dive on policy composition, see the companion post on route‑level permissions: `/blog/route-level-permissions-rwsdk-interruptors`.

```tsx
// src/worker.tsx
import { defineApp } from "rwsdk/worker";
import { render, route, prefix, layout } from "rwsdk/router";

import { Document as AppDocument } from "@/app/Document";
import { AdminDocument } from "@/admin/Document";
import { AppLayout } from "@/app/layout/Layout";
import { AdminLayout } from "@/admin/layout/Layout";

import { requireAuth } from "@/app/interruptors";
import { requireAdmin } from "@/admin/interruptors";

import { callsRoutes } from "@/app/pages/calls/routes";
import { accountsRoutes } from "@/app/pages/accounts/routes";
import { settingsRoutes } from "@/app/pages/settings/routes";
import { authRoutes } from "@/app/pages/auth/routes";
import { adminRoutes } from "@/admin/pages/routes";

export default defineApp([
  render(AppDocument, [
    layout(AppLayout, [
      route("/", [requireAuth, /* Home */]),
      prefix("/calls", callsRoutes),
      prefix("/accounts", accountsRoutes),
      prefix("/settings", settingsRoutes),
      prefix("/auth", authRoutes),
    ]),
  ]),

  render(AdminDocument, [
    layout(AdminLayout, [
      prefix("/admin", [requireAdmin, adminRoutes]),
    ]),
  ]),
]);
```

What this structure gives you is clean separation by default. You get separate Documents (`src/app/Document.tsx` vs `src/admin/Document.tsx`) to set different head tags, fonts, meta, CSP, and base shells. You get separate Layouts (`src/app/layout/Layout.tsx` vs `src/admin/layout/Layout.tsx`) so top nav, sidebars, and chrome don’t bleed across surfaces. You can hydrate and bundle independently with distinct entry clients (`src/app/client.tsx` and `src/admin/client.tsx`), enabling different code‑splitting strategies. And the route trees are distinct and predictable: the app mounts at `/` for customer workflows; admin mounts under `/admin` for admin‑only tooling, each with its own guards like `requireAuth` and `requireAdmin`.

On authentication, sessions, and context, a simple rule of thumb keeps things robust: shape the request once, then enforce policies many times. Populate a common `ctx.user` per request (typically in your auth/session layer) and rely on interruptors to gate access—app routes use `requireAuth` and fine‑grained helpers like `requirePermission(...)`, while admin routes apply `requireAdmin` to everything under `/admin`. This keeps login state unified while applying stricter policies where it matters. If you want to see concrete patterns for composing these checks, the permissions blueprint here goes deeper: `/blog/route-level-permissions-rwsdk-interruptors`. You can also reference the request/response and context model at `https://docs.rwsdk.com/core/request-response/`.

In day‑to‑day use, the benefits compound. Customer flows don’t pay the cost of admin UI, icons, and libraries, which keeps the app fast and cache‑friendly. Security becomes a lot easier to reason about when a single choke point (`requireAdmin`) gates the admin tree and finer‑grained checks live right next to the routes they protect. Each surface can evolve independently—admin gets the complex tables, sidebars, and management screens it needs, while the app keeps a streamlined shell for speed. Tests become clearer, too: end‑to‑end coverage can target `/admin/*` separately with its own fixtures, and code owners can move faster without cross‑surface conflicts.

There are a few best practices that help the split stay clean. Prefer not to share heavy UI components by default; duplicating a small wrapper is often cheaper than dragging admin dependencies into the app bundle. Keep route guards declarative at the edge with interruptors (`requireAdmin`, `requirePermission`) instead of scattering conditionals inside components. Use distinct navigation and chrome components so you don’t end up with brittle branching. And align CI with the architecture: build, lint, and test admin and app independently when you can.

When is this worth it? If your admin console is materially different from the customer app in look, needs, and team ownership—or you find yourself fighting bundle bloat and adding exceptions for admin‑only features—making the split usually pays for itself. It also simplifies authorization and testing by giving you obvious boundaries and fewer surprises.

A lightweight migration path looks like this: create `src/admin/Document.tsx` and `src/admin/layout/Layout.tsx` (and verify the equivalents under `src/app`); add separate entry clients at `src/admin/client.tsx` and `src/app/client.tsx`; mount the two render trees in your Worker with distinct middleware chains and route prefixes (as shown above); move admin‑only pages and components under `src/admin` and wire them into `adminRoutes`; keep shared domain logic in `src/shared/**` while avoiding imports of admin‑only UI from app routes; and finally, add E2E coverage for both surfaces, including auth guards.

The net result is a main app that remains fast and focused on customer workflows, an admin surface that can scale in complexity without taxing the user experience, and authorization boundaries that are obvious and enforced at the right layer. Teams collaborate more cleanly, and changes ship with less drama.

