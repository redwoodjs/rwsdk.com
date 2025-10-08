---
title: "RedwoodSDK 1.0 Beta: A Major Milestone at the Edge 🚀"
description: "We're excited to share that RedwoodSDK 1.0 Beta has officially landed! This marks an important step on our journey to a stable v1.0 release."
date: "2025-10-08"
author:
  id: "herman"
heroImage: "dfe10477-7c62-4481-49f6-edd20aa03d00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/4b7a124b-6a74-4d9b-aade-b26871b30500/public"
tags: ["redwoodsdk", "cloudflare", "v1.0.0", "beta"]
---
# RedwoodSDK 1.0 Beta: A Major Milestone at the Edge 🚀

We're excited to share that **RedwoodSDK 1.0 Beta** has officially
landed! This marks an important step on our journey to a stable v1.0
release, bringing greater stability, clarity, and performance to
developers building full-stack React apps on Cloudflare Workers.

👉 [Download the beta on
GitHub](https://github.com/redwoodjs/sdk/releases/tag/v1.0.0-beta.9)\
👉 [Get started with
`create-rwsdk`](https://github.com/redwoodjs/create-rwsdk)\
👉 [Migration guide for existing
projects](https://docs.rwsdk.com/migrating)

------------------------------------------------------------------------

## Why v1 Matters

Since the early days of RedwoodSDK, our mission has been simple:\
**make it effortless to build full-stack React apps that run natively on
the edge.**

We've heard from developers who want three things:

1.  **Predictability** --- A stable dev loop that works the same locally
    as it does in production.\
2.  **Clarity** --- Less hidden magic, more visibility into what your
    code is doing.\
3.  **Integration** --- First-class access to Cloudflare's primitives:
    Durable Objects, D1, R2, and beyond.

The **1.0 Beta** is where those promises start to solidify.

------------------------------------------------------------------------

## What's New in 1.0 Beta

This beta release focuses on **foundational stability** and a few
carefully chosen architectural improvements:

-   **Simpler Project Scaffolding**\
    We've unified the starter templates into a single clean foundation.
    Authentication is now available as an optional, version-locked
    Passkey addon.

-   **Improved Hydration and Streaming**\
    Our server-side rendering pipeline has been re-architected to
    eliminate `useId` hydration mismatches and improve streaming
    performance.

-   **UI Library Examples**\
    We've added an end-to-end tested playground showcasing integration
    with popular libraries including **shadcn/ui (Radix)**, **Base UI**,
    and **Chakra UI**.

-   **Consistent Middleware**\
    RSC Actions now run through the same global middleware pipeline as
    page requests, enabling consistent authentication, session, and
    business logic across your entire app.

------------------------------------------------------------------------

## A Clear Roadmap to v1.0

We want to be transparent about where we're headed:

-   **1.0 Beta → Foundational Stability & Breaking Changes**\
    Fixing show-stoppers and executing necessary breaking changes to
    make the dev loop reliable.

-   **1.0 → Public Surface Stability**\
    Documentation improvements, clearer error messages, and solidifying
    which features are stable vs. preview.

-   **1.x → Growth & Hardening**\
    Backwards-compatible features and continued polish on experimental
    areas.

-   **Future → Big Ideas**\
    Larger quality-of-life improvements and architectural explorations.

For a detailed view of our progress, you can follow along on GitHub. We
use labels to organize work for each phase. For instance, you can see
everything planned for the 1.0 release
[here](https://github.com/redwoodjs/sdk/issues?q=is:issue%20state:open%20label:1.0).

Our documentation already marks experimental features, giving you a
clear picture of what's stable for production use.

------------------------------------------------------------------------

## Migration Path

For existing users on the **0.x** channel:

-   The **0.3.x branch is no longer actively maintained**.\
-   Follow our step-by-step [migration
    guide](https://docs.rwsdk.com/migrating) to upgrade smoothly.\
-   Expect minor adjustments, especially around project scaffolding and
    middleware.

------------------------------------------------------------------------

## Try It Out Today

To start fresh:

``` bash
npx create-rwsdk my-app
cd my-app
pnpm install
pnpm dev
```

You'll be up and running with a modern React edge app in minutes.

------------------------------------------------------------------------

## Feedback Welcome 🙌

This beta is a huge step forward, but it's still a beta. We'd love your
feedback as we approach the **stable v1.0** release:

-   File issues and ideas on
    [GitHub](https://github.com/redwoodjs/sdk).\
-   Join the conversation on [Discord](https://discord.gg/redwoodjs).\
-   Tell us what works well, and what gets in your way.

------------------------------------------------------------------------

## Looking Ahead

This release is the beginning of a new chapter. With RedwoodSDK v1,
we're moving closer to a world where building **edge-native, full-stack
React apps** feels natural, productive, and fun.

The beta is ready for you today. We can't wait to see what you build.

🚀 **RedwoodSDK 1.0 Beta is here --- let's go!**
