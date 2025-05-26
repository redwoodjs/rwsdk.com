---
title: "Your React Meta-Framework Feels Broken, Here's Why"
description: "Lets shine the spotlite on some of the true fullstack features of RedwoodSDK."
date: "2025-05-25"
author: { id:"peter" }
heroImage: "23343616-ea1c-4f38-7bb2-c21f95439900"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/23343616-ea1c-4f38-7bb2-c21f95439900/public"
tags: ["redwoodsdk", "fullstack", "server components", "remix", "next"]
---

# Your React Meta-Framework Feels Broken, Here's Why

<!-- have you felt this pain?,
the pain is because of X,
it doesn't have to be X, it could be Y,
here's a comparison of X and Y,
Use Y -->

Do you ever feel disjointed when building a web app? Like the pieces don’t exactly fit in the puzzle, both mentally and in the code?

Bewildered and lost in a convention-heavy file structure that makes routing feel more like its own language rather than straightforward pattern matching?

Right-click+Inspect doesn't go anywhere meaningful?

## The Abstraction Trap

Frameworks promise simplicity, but often deliver indirection. Modern frameworks don’t just abstract the platform, they abstract your own code!

And you, the developer, are stuck trying to reason about your app in plain JavaScript... Whilst your framework speaks in tongues.

It’s death by a thousand cuts.

You write a function, but it’s not really a function: it’s a macro wrapped in a build step.

You see a type: but it’s not defined anywhere. It’s generated at build time, and you won't know it's broken until the generation step is run.

Every layer hides the layer beneath it, until you’re debugging a stack trace that feels like it came from another planet.

This isn’t developer experience. This is a mirage. Real DX doesn’t require a glossary. It doesn’t hide execution. It doesn’t make your editor lie to you. It's meant to be idiomatic!

And we’ve normalized it. We tell ourselves that if we just learn the right mental model, it’ll all click. But the truth is, many frameworks today ask you to abandon the mental model of JavaScript itself:

They fight the web.  
They abstract the platform.  
They demand trust instead of understanding.

## What if it didn’t have to be this way?

What if you could build full-stack apps without rewriting JavaScript’s rules?

- No custom syntax.
- No invisible transformations. (Besides JSX, React, and TypeScript)
- No framework-specific magic words.

Just TypeScript, modules, functions, values, and types.
A router that returns JSX or a Response.
Middleware you can write yourself.
Server components that stream.
Local dev that’s identical to production.

You don’t need a new language to build modern apps! You just need to stop fighting the one you already have!

That’s why we built RedwoodSDK, a framework that _is_ the platform. Not built in spite of the browser, or in denial of the network. But on top of them.

## Concrete Examples: Magic vs the Platform

### In Next.js:

Next.js has two routing systems: App Router and Pages Router. The newer App Router maps files to routes using filesystem conventions like `[slug]` for dynamic params. Each page exports a React component—its return value is rendered as HTML.

With App Router, you can load data inline (since pages are Server Components) and define metadata using the special `generateMetadata` export.

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [`https://example.com/og/${post.slug}.png`],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <div>{post}</div>;
}
```

Functions like `generateStaticParams` and `generateMetadata` are magic exports—Next.js calls them behind the scenes. This adds indirection: you can’t fully understand how a page works just by reading the code. You need to know the framework’s rules.

Then there are **File-system spells**: `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `(group)`, `@modal` segment, etc. Also, the logic about when which rendering you get. like if you access cookies, or headers, then a page is no longer static etc. It's not traceable! You must know the rules of the framework. Hidden knowledge that you need to be effective.

### In React Router - RSC Preview (Remix):

```tsx
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [route("blog/:slug", "routes/blog.tsx")] satisfies RouteConfig;
```

`"routes/blog.tsx"` is indirectly associated to `blog/:slug`.

```tsx
// routes/blog.tsx
export async function loader({ request, params }) {
  return { post };
}

export async function ServerComponent({ loaderData }) {
  // Must be called `ServerComponent`
  return <div>{loaderData.post}</div>;
}
```

Remix is way better, but you can't trace how this page gets to the browser just from the code alone. The framework pulls in extra behavior by convention.

### In RedwoodSDK:

```tsx
// worker.tsx

import { defineApp } from "rwsdk/worker";
import { route } from "rwsdk/router";

export default defineApp([
  route("/blog/:slug", ({ params }) => {
    const post = await getPost(params.slug);
    return <div>{post}</div>;
  }),
]);
```

In RedwoodJS you define a route, and return a JSX element (Or a response object). The JSX element can be a client or server component.

## The Web Is Enough

You don’t need a framework that pretends to be a language. You don’t need layers of build steps to speak HTTP. You don’t need magic.

You need something that works with the web—not against it.

That’s why we built RedwoodSDK:

- Zero magic: RedwoodSDK does have a build step, but we keep the boring-visible: TypeScript in, JSX out. No secret macros.
- Web APIs: fetch, Request, Response. No wrappers.
- One Command Deploys: Runs on Cloudflare. Feels like local.
- Composable by Default: Drop in routes, features, or entire apps.

You already know JavaScript. Now you can build everything with it.

--

Sometimes you've got to burn it all down, start from ash, and rebuild from first principles. This is what we did with RedwoodJS. We built it from scratch so that we could deliver a framework that allowed you to focus on the software you want to write rather than the platform or the framework that it runs on. RedwoodJS is just TypeScript, React, Vite, and Cloudflare.

RedwoodSDK's principles are enshrined in making the obvious... obvious. People that use our framework have described it as invisible.

Read more about it here:

- [Per-Route Documents in RedwoodSDK: Total Control Over Your HTML](/blog/redwoodsdk-multiple-documents)
- [Fullstack co-location](/blog/full-stack-colocation)
- [Streaming with fetch](/blog/redwoodsdk-streaming-guide)
- [Documentation](https://docs.rwsdk.com/)

[1]: RedwoodJS is guilty of this. We introduced specific exports for Cells.
