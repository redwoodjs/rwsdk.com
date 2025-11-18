---
title: "Building RedwoodSDK in the open and shipping for real‑world teams"
description: "How we advance RedwoodSDK while delivering high‑impact Cloudflare apps for real teams."
date: "2025-11-12"
author:
  id: "herman"
heroImage: "847ddf71-a4c6-41aa-8e57-08c049ab8700"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/0667df38-2e3d-40ad-892f-903e205b8100/public"
tags: ["rwsdk", "cloudflare", "workers", "consulting", "hyperdrive", "r2", "routing"]
---

# Building RedwoodSDK in the open and shipping for real‑world teams

RedwoodSDK is our Cloudflare‑first framework for building fast, secure, developer‑friendly apps. We build it in the open—and we prove it in production with real teams. Over the past few months we’ve delivered multi‑tenant, mission‑critical apps on [Cloudflare Workers](https://developers.cloudflare.com/workers/) using RedwoodSDK’s routing model, interruptor‑based permissions, and a clean separation between administrative and end‑user surfaces.

One example: we’re working with the [Go PRZM](https://www.goprzm.com/) team on a tow‑to‑claim platform that spans dispatch through release with auditable, end‑to‑end trails. The system brings together police rotation and impound management, real‑time time‑tracking/billing, and insurer flows from FNOL through valuation and sale—while vehicles remain in‑facility. Under the hood, we use RedwoodSDK’s route‑level interruptors for auth/roles/permissions, a clean admin/app split for bundle isolation, [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) for external MySQL (see our write‑up: [Cloudflare Hyperdrive + external MySQL](/blog/cloudflare-hyperdrive-external-mysql)), and [R2](https://developers.cloudflare.com/r2/) for images and video—deployed via a deterministic CI/CD pipeline ([Zero‑drama Cloudflare Workers CI/CD](/blog/zero-drama-cloudflare-workers-github-actions)).

Why Cloudflare + RedwoodSDK? Performance arrives by default at the edge, keeping P95s low without extra ops. Security is enforced where it matters with route‑level interruptors that gate access at the router ([route‑level permissions](/blog/route-level-permissions-rwsdk-interruptors)). Operational overhead stays small—no servers to babysit—while Workers, Hyperdrive, and R2 cover the core data and storage needs. And the developer experience is intentionally simple: a clear router, layered layouts, and typed contexts that make teams faster and code easier to review.

In practice, this shows up as two‑surface apps with dedicated shells—each surface has its own `Document` and `Layout`—so admin and user experiences are isolated and load only what they need ([splitting admin and app](/blog/splitting-admin-and-app), [multiple documents](/blog/redwoodsdk-multiple-documents)). We implement authorization with small, composable interruptors like `requireAuth`, `requireAdmin`, and fine‑grained permission checks, and we run against external MySQL via Hyperdrive with assets stored in R2. We keep environments repeatable with migrations and idempotent seeding for dev/CI, wire up deterministic builds and deploys, and verify critical journeys with end‑to‑end tests using [Playwright](https://playwright.dev/).

If you’re new to RedwoodSDK, the core ideas are intentionally small. Start with [first‑class routing](https://docs.rwsdk.com/core/routing/) that composes `render → layout → route/prefix` with a typed `ctx`. Add [interruptors](https://docs.rwsdk.com/core/routing/#interrupters)—tiny async functions that can short‑circuit requests for auth, permissions, or feature flags. Layer on [Layouts & Documents](https://docs.rwsdk.com/guides/frontend/layouts/) to create durable UI shells per surface (e.g., admin vs app) without cross‑polluting bundles. All of this is designed to fit Cloudflare’s platform ergonomically—from Workers to R2, Hyperdrive, and wrangler multi‑env deployments.

We also partner directly with teams who want Cloudflare‑native results fast. That ranges from greenfield builds (admin + app, edge caching, secure routing) to migrations off legacy stacks and deep performance/hardening work—latency audits, permission model reviews, binding/secret hygiene. We frequently embed alongside your engineers to establish patterns and leave you with a maintainable codebase that your team can own.

If you have a project you want to run on Cloudflare with RedwoodSDK—architecture/design sprints, implementation and delivery, or audits and enablement, we’d love to help. Work with the team behind RedwoodSDK; we apply these patterns in your codebase and feed improvements back into the framework.

Get in touch: [peter@redwoodjs.com](mailto:peter@redwoodjs.com)


