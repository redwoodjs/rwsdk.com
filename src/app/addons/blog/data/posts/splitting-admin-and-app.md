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

## Why split admin from the main app?

- **Performance and UX focus**: The customer-facing app stays lean and fast, while the admin console can ship heavier UI and management tooling without slowing down day-to-day workflows.
- **Security and authorization clarity**: Admin-only routes, assets, and UI are isolated and consistently gated behind admin checks, reducing accidental exposure in the main app.
- **Design and navigation autonomy**: Each surface has its own `Document`, layout, and top-level navigation, allowing totally different look-and-feel, fonts, CSP, and shell behaviors.
- **Operational flexibility**: You can roll admin changes separately, test them in isolation, and keep admin-only assets out of your main app’s critical path and caches.
- **Developer ergonomics**: Clear boundaries lead to clearer ownership, easier end-to-end tests, and simpler mental models for routing and middleware.

## How it works

Mount two independent rendering trees under one Worker: app and admin. Each has its own `Document` and `Layout`, with different route trees and middleware chains.

Wire the two surfaces like this:

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

What this gives you:

- **Separate Documents**: `src/app/Document.tsx` vs `src/admin/Document.tsx` so you can use different head tags, fonts, meta, CSP, and base shells.
- **Separate Layouts**: `src/app/layout/Layout.tsx` vs `src/admin/layout/Layout.tsx` for top nav, sidebars, and app chrome that don’t bleed across surfaces.
- **Separate Clients**: `src/app/client.tsx` and `src/admin/client.tsx` let you hydrate and bundle independently (different entry points, different code-splitting).
- **Distinct route trees**: The app mounts at `/` with customer workflows; admin mounts under `/admin` with admin-only tooling. Each tree has its own guards (`requireAuth`, `requireAdmin`).

## Auth, sessions, and context

- Populate a common `ctx.user` once per request (e.g., via your auth/session layer), then enforce different authorization rules per surface:
  - App routes use `requireAuth` and fine-grained `requirePermission(...)`.
  - Admin routes use `requireAdmin` to gate everything under `/admin`.
- This keeps the login state unified while applying stricter policies where needed.

## Benefits in detail

- **Faster main app**:
  - Customer flows are not paying for admin UI, icons, and libraries.
  - Better cache locality: admin bundles don’t pollute app caches/CDN.
- **Cleaner security posture**:
  - One choke point (`requireAdmin`) gates the entire admin tree.
  - Fine-grained checks live closer to the UI they protect.
- **Independent composition**:
  - Admin can have complex sidebars, tables, and management screens.
  - App maintains a streamlined nav and minimal shell for speed.
- **Testing and DX**:
  - End-to-end tests can target `/admin/*` separately with their own fixtures.
  - Code owners can evolve each surface without constant conflicts.

## Gotchas and best practices

- **Don’t share heavy components by default.** Duplication of a small wrapper is often cheaper than pulling large admin dependencies into the app bundle.
- **Keep route guards declarative** at the route level (`requireAdmin`, `requirePermission`) to avoid ad hoc checks scattered in components.
- **Use distinct `TopNav`/chrome components**; sharing nav between surfaces often leads to messy conditional logic.
- **Align CI steps with the split**: build, lint, and test admin and app independently when possible.

## When to consider this split

- Your admin console is materially different from the customer app in look, needs, and team ownership.
- You’re fighting bundle bloat or repeatedly adding exceptions for admin-only features.
- You need tighter controls and simpler mental models for authorization and testing.

## Migration checklist

- Create `src/admin/Document.tsx` and `src/admin/layout/Layout.tsx`; do the same (or verify) for `src/app`.
- Add separate entry clients: `src/admin/client.tsx` and `src/app/client.tsx`.
- In your worker, mount two render trees with distinct middlewares and route prefixes (as shown above).
- Move admin-only pages and components under `src/admin` and wire them into `adminRoutes`.
- Keep shared domain logic in `src/shared/**`; avoid importing admin-only UI from app routes.
- Add E2E coverage for both surfaces, including auth guards.

## Results

- The app stays fast and focused for customer workflows.
- The admin side scales in complexity without taxing the main experience.
- Auth boundaries are obvious and enforced at the right layer.
- Teams collaborate more cleanly with fewer cross-surface regressions.

