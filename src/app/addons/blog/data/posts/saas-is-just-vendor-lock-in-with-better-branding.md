---
title: "SaaS Is Just Vendor Lock-In with Better Branding"
description: "The pitch of modern SaaS is "don't reinvent the wheel." But every wheel you bolt on comes with some friction."
date: "2025-06-06"
author:
  id: "peter"
heroImage: "6958b1db-b3b7-4073-21c6-dfb65e6b9000"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6958b1db-b3b7-4073-21c6-dfb65e6b9000/public"
tags: ["saas", "vendor-lock-in", "platforms"]
---

# SaaS Is Just Vendor Lock-In with Better Branding

Developers are told "to focus on the product" and let SaaS vendors handle the rest, but integrating third-party services, whether it's auth, queuing, file storage, or image optimization, comes at a cost. Not just in dollars but in time, friction, and mental overhead.

There are five hidden taxes you pay every time you integrate a SaaS into your stack.

## 1. The Discovery Tax

Before you can integrate anything, you first have to figure out what they're actually selling?

1.  What problems are they solving?
2.  Is it compatible with your stack?
3.  Is their price sane at your scale? a
4.  Are their docs clear and do they reveal any implementation weirdness?

This unpaid research work is usually non-transferable. What you learn about "Uploady" or "MegaQueue" doesn't help you next time when you're evaluating something else. It's also subjective. It's marketing, and does the marketing message resonate with you?

## 2. The Sign-Up Tax

You've decided on a service, and this is the moment when you hand over your email and credit card.

1. Do they support usage-based pricing or only lock-in tiers?
2. Can your team members access the dashboard, or do you have to pay more for that functionality? Despite only using the service the same amount!
3. Can you even test the product without hitting a paywall?

You're now on the hook, even if you haven't written a single line of code.

## 3. The Integration Tax

Now the real work begins.

1. You read the docs.
2. You install the libraries
3. You wire it into your framework.
4. And figure out the edge cases that the docs don't mention, because docs are marketing!

Often you're left fighting your own tooling. They're aiming for the lowest common denominator, and you're bleeding edge. Or the other way around!

## 4. The Local Development Tax

You need the SaaS service to work locally. Does it even offer a local emulator? Can you stub it out in tests? Do you need to tunnel to the cloud just to test one feature?

Now you've got branching configuration logic, one for production, one for staging, one for local… If you're lucky.

## 5. The Production Tax

This is the part where you're "done," except you're not.

1. Can you use this in your staging environment? What about pull request previews?
2. You need to securely manage the API keys.
3. Monitoring, logging, and alerting
4. Wondering why something worked in your laptop but fails in production?

You've integrated the service, but now you're on the hook for its reliability in production.

## Conclusion

The pitch of modern SaaS is "don't reinvent the wheel." But every wheel you bolt on comes with some friction. It's not just a service: It's a contract. It's a dependency. It's a subtle architectural shift, and it comes with taxes.

No matter what choice you make, it's always going to be vendor-locked in. Switching out something, even if it's open source and self-hosted, means that you're rewriting a lot of code.

So, my argument is, don't make those decisions. Just pick a platform. The thing that matters is the software that you want to write, not the framework or the services that it runs on.

Platforms like Cloudflare or Supabase shine. Where your database, queue, image service, and storage all live within the same platform and speak the same language. You avoid paying these taxes repeatedly. You simply pick the product that's already there.

1.  No context switching between vendors.
2.  No API key wrangling.
3.  No compatibility hacks or configuration forks.
4.  Just fast, local feeling integrations that work the same in dev and production.

It feels like everything is running on the same machine, and in a way it kind of is. That's the hidden superpower of integrated platforms. They collapse the distance between your code and your services. And in doing so, they give you back the one thing no SaaS vendor can sell you: "Flow."
