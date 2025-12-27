---
title: "Why Cloudflare? The Case for a Unified Platform"
description: "Moving away from the 'Service Soup' and toward a Unified Platform. Why RedwoodSDK is doubling down on Cloudflare's architecture."
date: "2025-01-15"
author:
  id: "peter"
heroImage: "6958b1db-b3b7-4073-21c6-dfb65e6b9000"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6958b1db-b3b7-4073-21c6-dfb65e6b9000/public"
tags: ["cloudflare", "platform", "unified-platform", "redwoodsdk"]
draft: true
---

# Why Cloudflare? The Case for a Unified Platform

In a [previous post](https://rwsdk.com/blog/saas-is-just-vendor-lock-in-with-better-branding), I wrote about how modern SaaS is often just "vendor lock-in with better branding." Every time you bolt a "Best of Breed" service onto your stack—whether it's Auth, Queuing, or Storage—you pay a series of hidden taxes: Discovery, Sign-up, Integration, Local Dev setup, and Production taxes.

When I took over RedwoodJS, I realized that for developers to be truly competitive, we have to stop paying these taxes. We need to move away from the "Service Soup" and toward a **Unified Platform**: a place where you no longer have to think about the framework or the infrastructure, so you can focus entirely on your code and the problem's it's trying to solve.

To build web applications, you need a minimum of four things: **Compute, Database, Storage, and Queues.** We evaluated the landscape to see who could provide all four in a unified way:

- **Vercel:** Great DX, but it’s married to Next.js, and service integration is an add-on.
- **Supabase:** Incredible toolset, but the compute is Deno-based and they already have their own framework.
- **Pocketbase:** A beautiful piece of software, but doesn't reach the right audience.

Which left **Cloudflare**.

## The "Odd Duck" That quacks like a winner

At first, I was skeptical. Cloudflare is a bit of an "odd duck." It quacks like Node.js, but isn't. It’s a networking company that happens to offer compute. But as we leaned in and started prototyping RedwoodSDK on top of Cloudflare’s **workerd** (Compute), we were blown away.

Usually, when a platform ticks all the marketing boxes, you discover the deficiencies six months later. We’ve been digging for a while now—and we still haven't found them.

### Collapsing the Distance: The Unified Environment

The magic of Cloudflare is that your compute, storage, database, and queues all exist in the same environment. You aren't wrangling five different API keys or configuring five different third-party services.

With **Workers** and **Durable Objects**, Cloudflare has enabled a development model that is fundamentally browser-native. They’ve turned `fetch` into the "Unix pipe" of the web. By using standard web APIs and **Bindings**, services communicate with each other as if they were in-memory.

The easier it becomes to share memory between your services, your server, and your frontend, the more productive you become. On Cloudflare, enabling a new service isn't an infrastructure project; it’s a simple configuration change.

### Addressing the Latency Reality

We have to be intellectually honest: Cloudflare isn't magic. There is still latency in their services. If your user is in Lagos and your data is in Frankfurt, the speed of light still dictates a delay.

However, Cloudflare allows us to eliminate **Architectural Latency.**

In the "Service Soup" model, your serverless function has to jump through a public gateway and re-authenticate just to talk to your own database. These self-inflicted delays add up to hundreds of milliseconds. On Cloudflare, a **Binding** is a direct pipe within the same runtime. We aren't just moving code closer to the user; we are collapsing the distance between your code and your services.

### The Vision: "Open Bindings" and Service Agnosticism

If I'm arguing against vendor lock-in, why choose a "Cloudflare Only" path?

It’s because we are building **Open Bindings** and **Open Durable Objects** alongside RedwoodSDK:

Our goal is to be **service agnostic** while remaining **platform optimized.** We are creating a specification for bindings that allows you to swap the underlying provider without changing your application logic. You get the world-class DX and performance of Cloudflare today, with the peace of mind that your code follows an open standard. We are building the "Open Platform" on top of the best engine currently available.

## Economic Freedom: No Credit Card Required

Finally, this mission is about accessibility. Being based in Africa, I see the "Credit Card Barrier" daily. Most platforms require a credit card just to start—effectively locking out millions of developers.

Cloudflare’s commitment to a generous free tier that **doesn’t require a credit card to ship** is a game-changer. If it’s not free, it’s cheap. This democratizes high-performance infrastructure for developers in my community and across the continent.

## Conclusion: From Framework to Platform

RedwoodJS gave us the "Integrated Web Framework." RedwoodSDK on Cloudflare gives us the **"Integrated Web Platform."** By choosing a unified platform, we stop being "Integration Engineers" and go back to being "Product Engineers." We stop paying the SaaS taxes and start finding "Flow." We aren't just giving you a place to host code; we're giving you a world-class engine that is consistent, fast, affordable, and accessible to everyone, everywhere.
