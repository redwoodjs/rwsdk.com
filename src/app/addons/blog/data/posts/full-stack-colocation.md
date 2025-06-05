---
title: "Full-stack Co-location"
description: "RedwoodSDK let's you co-locate everything, it makes software easier to reason about. When everything is in one place, you spend less time chasing ghosts through your codebase."
date: "2025-05-09"
author:
  id: "peter"
heroImage: "465ce5ca-1241-470a-318c-9a316e155d00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/9efc82a2-2831-4e48-5fd2-238ba2adb000/public"
tags: ["redwoodsdk", "react"]
---

## Full stack Co-location

One of the ideas that React popularized was if two things always change together, they should live together. We call this co-location. It means putting your component, your logic, your styles, and your tests all in the same folder. And for many of us, this changed the way we thought about organizing code.

Extending this even further is that you don't try to make a component infinitaly configurable, if you have an particular requirement, just duplicate the code and modify it. Don't-repeat-yourself be damned!

RedwoodSDK takes that idea and applies it not just to components, but to routes. It lets you co-locate _everything:_ Your page, your API logic, your middleware, your error boundary, even the root HTML document: they all live together, side by side.

### Why co-location matters

Co-location makes software easier to reason about. When everything is in one place, you spend less time chasing ghosts through your codebase. You don't have to wonder where the data is coming from, where the middleware modifies the context, or where that one random redirect is happening. It's all there in the same folder.

This style of development reduces friction. It shortens the distance between where you're looking and where the relevant code lives. It helps new contributors find their footing. It even helps experienced devs move faster, because everything you need is close.

Kent C. Dodds said it best: "Colocate everything until it hurts. Then abstract."

### Addons: Shipping functionality in a folder

In RedwoodSDK, we're going to introduced something we call an addon. An addon is a folder of code. But it's also a page, a route, some server logic, some client components, a form, and a database migration. All working together.

Addons are fully pluggable. You can drop one into your app and it just works. No glue code. No wiring. No dependency hell.

You want a forum? Drop in the forum addon. You want a blog? Drop in the blog addon. Comments, feedback widgets, newsletters — all of it can be shipped as addons. They're not packages. They're not libraries. They're features bundled in code.

### Example

Let's image a "blog" addon:

```tsx
// src/addons/blog/routes.tsx

import { render, route } from "rwsdk/router";

import { Document } from "./Document";

import { BlogHomePage } from "./pages/HomePage";
import { BlogPostPage } from "./pages/PostPage";

import RSS from "rss";

export const blogAddon = render(Document, [
  route("/", BlogHomePage),
  route("/:slug", BlogPostPage),
  route("/blog.rss", async function () {
    const feed = new RSS({});
    /* [snip] */
    return new Response(feed.xml(), {
      headers: { "content-type": "application/xml" },
    });
  }),
]);
```

Now I can use this addon in my worker.

```tsx
// src/worker.tsx
import { defineApp } from "rwsdk/worker";

import { blogAddon } from "./addons/blog/routes.tsx";

export default defineApp([
  // existing routes...
  prefix("/blog", blogAddon),
]);
```

Now you have a blog that's mounted on `/blog`, `/blog/:slug`!

### Addons are meant to be distributed

Because everything is co-located, addons are easy to share. You can copy and paste them. Fork them. Customize them. Email them to a friend. Whatever you want.

This is a big deal for indie developers. Most of us don't want to build everything from scratch, but we also don't want to inherit the complexity, and the inability to modify, someone else's code. Addons give you a middle path: fully built features, but readable, editable, and local to your codebase.

### This changes how we build

Most frameworks separate concerns so much that they become scattered. One part here, another part there. You spend more time connecting dots than writing logic.

RedwoodSDK flips that. You don't assemble your app from parts. You drop in a folder that already works. And if you need to change it? You open the folder and start typing. (Or start vibe coding.)

### The future of co-location

This isn't just about organization. It's about intent. When your code lives together, it evolves together. That's how software should feel. Think about your app. If something always changes together, maybe it should live together too.
