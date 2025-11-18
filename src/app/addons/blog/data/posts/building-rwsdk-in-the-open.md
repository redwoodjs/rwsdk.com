---
title: "Building RWSDK in the open — and shipping for real‑world teams"
description: "How we advance RWSDK while delivering high‑impact Cloudflare apps for real teams."
date: "2025-11-12"
author:
  id: "herman"
heroImage: "847ddf71-a4c6-41aa-8e57-08c049ab8700"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/0667df38-2e3d-40ad-892f-903e205b8100/public"
tags: ["rwsdk", "cloudflare", "workers", "consulting", "hyperdrive", "r2", "routing"]
---

# Building RWSDK in the open — and shipping for real‑world teams

## We built RWSDK — and we ship with it

RWSDK is our Cloudflare‑first framework for building fast, secure, developer‑friendly apps. We build it in the open — and we prove it in production on real systems.

On recent engagements, we’ve shipped multi‑tenant, mission‑critical apps on Cloudflare Workers using RWSDK’s routing model, interruptor‑based permissions, and a clean split between admin and end‑user surfaces.

### Go PRZM: Tow‑to‑claim platform on Cloudflare (in progress)

We’re building this with the [Go PRZM](https://www.goprzm.com/) team, using RWSDK.

- A towing/insurer platform spanning dispatch to release with auditable, end‑to‑end trails.
- Digital dispatching, police rotation, impound management, and time‑tracking/billing in one place.
- Insurer flows from FNOL to valuation and sale, with real‑time visibility while vehicles remain in‑facility.
- AI‑assisted damage review and valuation inputs to speed decisions.
- RWSDK under the hood: route‑level interruptors for auth/roles/permissions, admin/app split for bundle isolation, Hyperdrive for external MySQL, and R2 for images/video — all deployed via a deterministic CI/CD pipeline.

## Why Cloudflare + RWSDK

- **Performance by default**: Global edge execution keeps P95s low without extra ops.
- **Security built‑in**: Route‑level interruptors (auth, roles, permissions) guard access at the router.
- **Operational simplicity**: No servers to babysit. Use Workers, Hyperdrive for external DBs, and R2 for object storage.
- **Great DX**: A clear router, layered layouts, and typed contexts make teams faster and code easier to review.

## What we’ve been shipping

- **Two‑surface apps**: Dedicated admin and app shells, each with its own `Document` and `Layout` for clean UX and bundle isolation.
- **Route‑level authorization**: Interruptors for `requireAuth`, `requireAdmin`, and fine‑grained `requirePermission`.
- **Cloudflare‑native data**: External MySQL via Hyperdrive; asset storage on R2; secure, environment‑scoped bindings.
- **Repeatable environments**: Migrations and idempotent seeding for dev/CI; deterministic builds and deploys.
- **Confidence via tests**: Playwright E2E coverage for routing, permissions, and critical user journeys.

## What RWSDK brings

- [**First‑class routing**](https://docs.rwsdk.com/core/routing/): `render → layout → route/prefix` composition with typed `ctx`.
- [**Interruptors**](https://docs.rwsdk.com/core/routing/#interrupters): Small async functions that can short‑circuit requests for auth, permissions, and feature flags.
- [**Layouts & Documents**](https://docs.rwsdk.com/guides/frontend/layouts/): Layered UI shells per surface (e.g., admin vs app) without cross‑polluting bundles.
- **Cloudflare ergonomics**: Works seamlessly with Workers, R2, Hyperdrive, and wrangler multi‑env deployments.

## Consulting with the RWSDK team

We supplement framework work with consulting for teams that want Cloudflare‑native results, fast.

- **Greenfield builds**: Design and deliver production apps on Workers (admin + app, edge caching, secure routing).
- **Migrations**: Move from legacy stacks to Workers, preserving correctness and improving performance.
- **Performance & hardening**: Latency audits, permission model reviews, and secure bindings/secret hygiene.
- **Enablement**: Pair with your team, establish patterns, and leave you with a maintainable codebase.

Work with the team behind RWSDK; we apply these patterns in your codebase and feed improvements back into the framework.

## Let’s work together

Have a project you want to run on Cloudflare with RWSDK? We can help:

- Architecture and design sprints
- Implementation and delivery
- Audits, performance tuning, and training

Get in touch: [herman@redwoodjs.com](mailto:herman@redwoodjs.com)


