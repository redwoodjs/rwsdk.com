---
title: "Building with React Server Components and Client Components in RedwoodSDK."
description: "At RedwoodSDK, we're embracing the latest patterns recommended by the React team by combining React Server Components (RSC) with client components to build efficient and scalable interfaces."
date: "2025-05-14"
author:
  id: "herman"
heroImage: "d16e15d2-102f-43f1-fd54-69fc743eb300"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/048929e3-2c10-4243-5741-51fb94fb7100/public"
tags: ["redwoodsdk", "cloudflare", "deployment", "environments"]
---
# Building with React Server Components and Client Components in RedwoodSDK

At RedwoodSDK, we're embracing the latest patterns recommended by the React team by combining React Server Components (RSC) with client components to build efficient and scalable interfaces.

Here's a quick example of our setup:

## ✅ React Server Component

```tsx
// src/app/Home.tsx

import { Suspense } from "react";
import UsersList from "./UsersList";
import { getUsers } from "./functions";

export default function Home() {
  const usersPromise = getUsers();
  return (
    <div>
      <h1>Home</h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </div>
  );
}
```

This is a [**React Server Component**](https://react.dev/reference/rsc/server-components) that fetches data on the server using the server function `getUsers()`, then passes the promise to a client component.

## ✅ Server Action (`getUsers`)

```ts
// src/app/functions.ts
"use server";

import { db } from "@/db";

export async function getUsers() {
  const users = await db.user.findMany();
  return users;
}
```

This function runs on the server and fetches data from our[ D1 Prisma-powered database](https://docs.rwsdk.com/core/database/).

## ✅ Client Component

```tsx
// src/app/UsersList.tsx

"use client";

import { use } from "react";
import { User } from "@prisma/client";

export default function UsersList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const users = use(usersPromise);
  
  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>
          <h1>{user.username}</h1>
        </div>
      ))}
    </div>
  );
}
```

## Why This Approach is Better

This pattern provides several advantages:

1. **Zero Client-Side Fetching**  
   The data is fetched entirely on the server. No `useEffect`, no loading spinners, no API calls from the client.

2. **Streaming and Suspense-Friendly**  
   By returning a promise to the client component, React can pause rendering until the data is ready. This works well with React's `Suspense` and streaming.

3. **Less Boilerplate**  
   Compared to using `useEffect` and state management to fetch and store users, this method eliminates complexity and makes components easier to test and maintain.

4. **Faster Time-to-Content**  
   Data fetching happens during server render, resulting in faster Time To First Byte (TTFB) and less JavaScript sent to the browser.

## Final Thoughts

By combining [React Server Components](https://docs.rwsdk.com/core/react-server-components/) with `use()` in client components, RedwoodSDK developers can leverage React’s modern data-fetching patterns to build fast, clean, and efficient UIs with minimal client-side logic.

This method aligns with React’s long-term vision: _server-first rendering with selective interactivity where needed._
