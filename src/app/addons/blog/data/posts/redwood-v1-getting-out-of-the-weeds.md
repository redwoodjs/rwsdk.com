---
title: "Redwood v1.0: Getting Out of the Weeds"
description: "The journey to Redwood v1.0 wasn't a straight line. It took leaving to start my own company, hitting a wall, and coming back with a completely different perspective on what a framework should actually do."
date: "2026-03-10"
author:
  id: "peter"
tags: ["redwoodsdk", "v1.0", "cloudflare", "founder"]
---
<!-- heroImagePrompt: "8-bit pixel art dithered pattern depicting a redwood tree breaking through tangled weeds and code, representing getting out of the weeds to launch v1.0, muted dark green-gray tones with warm highlights" -->
# Redwood v1.0: Getting Out of the Weeds

I'm launching **v1.0 of [@RedwoodJS](https://x.com/RedwoodJS) (SDK)** tomorrow. 

The journey to this moment started in 2020 with [@mojombo](https://x.com/mojombo), [@cannikin](https://x.com/cannikin), and [@thedavidprice](https://x.com/thedavidprice). It was a blissful time of building in the open, but my path to v1.0 wasn't a straight line. It took leaving to start my own company, hitting a wall, and coming back with a completely different perspective on what a "framework" should actually do.

### The "Cool" Moment
It all started with a tweet. I remember lying in bed, commenting "that's cool" on Tom's post about Netlify functions. He slid into my DMs: **"Want to build a framework?"** At the time, I was a guy from South Africa who just wanted to be part of the Silicon Valley story. This was total validation. I literally jumped up and down on my bed until my wife shouted, "WTF?!"

Early on, our focus was split and we weren't moving fast. Tom told me he was thinking of paying someone to work on it full-time, and I blurted out: **"Dude, just pay me?!"** He did. That unlocked everything. 

### The Developer's Trap
But then, I tried to be a founder. 

I started my own startup using Redwood, and I realized something that was actually kind of embarrassing: **I wasn't the right kind of developer for an early-stage startup.** I was focused on the code, not the business. I thought they were the same thing, but they're not. 

I spent an enormous amount of time on the "nonsense"—hosting the DB, fighting restrictive Lambda functions, and gluing together infrastructure. To me, the business was just "adjacent" to the work. It was the place *where* I did things, not the *reason* I was doing them. I had to learn to care about things that weren't "code," and it was harder than I thought.

### The Misunderstood Disadvantage
Recently, Ahmad from Replit tweeted that knowing how to code can be a **disadvantage**. People crushed him for it, but I think they completely missed his point. 

He didn't mean coding is worthless. He meant that as developers, our expertise is often our cage. We get so obsessed with the "how"—the nitty-gritty, elegant plumbing—that we forget the "why." We solve the technical problem the tool was meant for, instead of the human problem the business exists for.

I've been that developer. I've been so "good" at my craft that I coded my way right into a speed trap.

### Radical Pragmatism: From GraphQL to SDK
When I took the reigns of Redwood back, I had to be honest about our constraints. I had a smaller team and a tighter budget. **RedwoodGraphQL** is a broad, ambitious engine, but I realized we couldn't just keep iterating on that scale with the hands we had. 

I wanted to build something that reflected **success**, not just technical elegance. 

That's why we built the **RedwoodSDK**. We moved to **Cloudflare** because it gives you the four things you actually need: storage, queues, a database, and functions. You ship with one command. 

But more importantly, we built it to be **understandable**. 

In an AI-driven world, understandability is your only insurance. If your logic is sound and your pieces are traceable, an AI agent can actually be an asset. If your stack is a mess of "nonsense" glue, the agent is just going to help you build a bigger cage. Redwood v1.0 is designed to be the "sound reasoning" that stays out of your way so you can focus on the business, not the weeds.

### The People Who Built the Bricks
We got here because of the people who stayed in the trenches with me:

* **[@dthyresson](https://x.com/dthyresson):** The maestro of auth and deep integrations.
* **[@simoncrypta](https://x.com/simoncrypta):** For tireless work on the ecosystem and DX.
* **[@tobbe](https://x.com/toaborman):** The CLI wizard and router extraordinaire.
* **[@pi0neerpat](https://x.com/pi0neerpat):** A pillar of the community and early adopter.
* **[@ajoslin](https://x.com/ajoslin):** For pushing the boundaries of what the SDK could do.
* **[@real_josh_flowers](https://x.com/real_josh_flowers):** For incredible documentation and support.

And to every contributor who opened a PR or helped a stranger in the forums: **Thank you.** I'm still that guy from South Africa who wanted to build something that mattered. With Redwood 1.0, I think we finally have the tool that lets you be a developer without the "disadvantage" of getting lost in the code.
