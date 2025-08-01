---
title: "JavaScript isn’t the problem. Replacing the browser was."
description: "We spent a decade rebuilding the browser by hijacking routing, manually syncing state, rebuilding forms and transitions in JavaScript to match native app expectations. Now the browser has caught up. It's time to stop the hacks and build on the web again, but properly."
date: "2025-08-01"
author:
  id: "peter"
heroImage: "a2a0ca5a-69b4-409f-bab9-ba31110c8f00"
tags: ["redwoodsdk", "streaming", "html", "forms", "performance"]
---

We spent a decade rebuilding the browser by hijacking routing, manually syncing state, rebuilding forms and transitions in JavaScript to match native app expectations. Now the browser has caught up. It's time to stop the hacks and build on the web again, but properly.

When a "single-page app" is picked for the tech stack it's not because of performance, it's because of usability: In a previous life, I was an iOS developer, and every year Apple released the Human Interface Guidelines. I read them cover to cover, because they taught you how Apple thought about interaction design. That design philosophy was enforced in the APIs. One of the key principles was view transitions. When a user tapped on a row, the next screen slid into view. It helped users stay oriented. They understood where they came from, and how to go back.

The web didn't offer that. A full page reload meant the new screen just appeared. Users had to mentally stitch the experience together themselves. So as developers, we started hacking around the browser. We invented SPAs. Not because we loved JavaScript, but because we were trying to keep up with user expectations. We were trying to match Apple.

But now, the browser (and the networks) have caught up. We have view transitions. We have streaming. We have edge compute. We have everything we need to give users a great experience without rewriting how the web works.

There was a time when you had to polyfill everything. Every feature needed a workaround, a patch, a library. But today's browsers are mostly aligned. The platform is strong. The baseline is higher.

With RedwoodSDK, we decided to go all in on server-side routing and rendering. That means we don't emulate the browser inside the browser by hijacking routing, manually syncing state, rebuilding forms and transitions in JavaScript. Instead, we use the browser as the foundation of the framework. This simplifies a whole bunch of complexity that library authors have had to work around for years just to mimic native app behavior. By leaning on the web platform, we reduce the amount of JavaScript shipped to the client, which makes apps faster, lighter, and easier to reason about.

> History: it's worth briefly looking at how we got here. The concept of the Single-Page Application (SPA) emerged in the early 2000s. Microsoft introduced the XMLHttpRequest object in 1999, which allowed web pages to fetch data asynchronously without refreshing. Gmail and Google Maps (launched in 2004 and 2005) were the first apps that truly showcased the potential of this technique. In 2005, the term "AJAX" was coined, and developers began to build fully interactive applications in the browser. Frameworks like Backbone, Ember, AngularJS, and eventually React made it easier to manage the complexity that came with SPAs. But these apps weren't about performance. They were about usability. They emerged because the web was trying to compete with native apps.

And just because we've chosen a server-first architecture doesn't mean you ship a worse user-experience. Quite the opposite. We progressively enhance the browser based on what your app needs. For example, we support client-side navigation for routes where you want smoother transitions.

```
// src/client.tsx

import { initClient, initClientNavigation } from "rwsdk/client";

initClientNavigation();
initClient()
```

Behind the scenes, we intercept clicks on anchor tags, fetch the next page as a React Server Component (RSC) Flight stream, and seamlessly update the DOM using React hydration. The result feels like a client-side app, but it's still using the request-response model of the web. You get cookies, redirects, and proper error codes. Everything you've always had in HTTP, preserved.

This is important: You're not giving anything up. You're building apps the way the web was meant to be used, with URLs, with forms, with the tools that have worked for decades. There are places where SPA’s do make sense: Zero latency, offline support, and client heavy interactions. You can still support those use-cases yourself, but for the majority of cases you’ll be covered.

The key takeaway is this. We can finally stop fighting the browser. We can stop re-implementing it. And we can start building on top of it, natively, progressively, and with confidence. JavaScript isn’t the problem. Replacing the browser was.

[Read the Client Side Navigation Docs](https://docs.rwsdk.com/guides/frontend/client-side-nav/)

_(Thanks Barrett, Simon & MJ for the early feedback.)_
