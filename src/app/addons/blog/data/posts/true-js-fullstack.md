---
title: "Fullstack in the true sense"
description: "Lets shine the spotlite on some of the true fullstack features of RedwoodSDK."
date: "2025-05-07"
author:
  id: "herman"
heroImage: "e35b945c-dd4e-42ad-e635-04ef2d475800"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/d80b1b68-f5a9-4af6-5cf0-924663a2e000/public"
tags: ["redwoodsdk", "fullstack", "server components"]
---
# Fullstack in the true sense

In this post, I'd like to focus on some specifics why **RedwoodSDK is truly a fullstack framework**, and why that matters.

---

### The "Problem" with "Fullstack" Frontends

Classical front-end frameworks are often disjointed. There's considerable overhead just to get started:

- Setting up a database
- Spinning up a server or backend
- Writing and exposing APIs (REST or GraphQL)
- Wiring it all together

This fragmented approach slows things down and introduces complexity.

---

### RedwoodSDK: The Fullstack Reimagined

RedwoodSDK uses **React Server Components** (when you need them), eliminating much of that overhead.

It places the **[database](https://docs.rwsdk.com/core/database/), [queues](https://docs.rwsdk.com/core/queues/), [storage](https://docs.rwsdk.com/core/storage/) and more** right inside the runtime—powered by [Cloudflare Workers](https://developers.cloudflare.com/workers/). No extra server setup. No need to expose APIs just to access your own data.

And the exciting part?  
**What runs locally *mirrors* production.**  
No more "but it works on my machine" headaches. Your local dev environment mirrors production so that you can be more at ease with deployments.

---

### Classic vs RedwoodSDK

Let's compare a typical setup in a classic React frontend vs. a RedwoodSDK app.

#### Classic React Frontend: Fetching via API

```js
// React component
export default function UsersPage() {
    const [users, setUsers] = useState([])
    useEffect(() => {
    fetch('/api/users')
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);

    return ...
}

// Node / Python etc server, on a seperate server somewhere
app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});
```

#### RedwoodSDK Server Component: Direct DB Access

```js
    // users.ts (server function)
    "use server"
    import { db } from "@/db";

    export async function getUsers() {
        const users = await db.users.findAll();
        return users;
    }

    // UserList.tsx (server component)
    import { getUsers } from "./users";

    export default async function UsersPage() {
        const users = await getUsers();
        return (
            <div>
                <ul>
                    {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
```

📘 [Read more here on how to setup your Database](https://docs.rwsdk.com/core/database/) with RedwoodSDK

### Request/Response: You're in Control

Don't think you're limited to React Server Components.

RedwoodSDK operates on a [Request/Response cycle](https://docs.rwsdk.com/core/routing/), which means you can write routes that return any valid Response:
	•	JSON
	•	HTML
	•	XML
	•	Plain text
	•	Anything you need

#### Example: Custom API Route

```js
// worker.tsx
export default defineApp([
  setCommonHeaders(),
  render(Document, [
    index([UsersPage]),
    route("/docs", async () => {
      return new Response(null, {
        status: 301,
        headers: {
          "Location": "https://docs.rwsdk.com",
        },
      });
    }),
    route("/sitemap.xml", async () => {
      return new Response(sitemap, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    }),
    route("/robots.txt", async () => {
      const robotsTxt = `User-agent: *
        Allow: /
        Disallow: /search
        Sitemap: https://rwsdk.com/sitemap.xml`;

      return new Response(robotsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }),
    route("*", async () => {
      return notFound();
    }),
  ]),
]);
```
📘 Read more in our [Request/Response docs]((https://docs.rwsdk.com/core/routing/)).

### RedwoodSDK Gives You Freedom

With RedwoodSDK, you can:
	•	Use Server Components or traditional APIs
	•	Fetch data directly from the DB
	•	Write fullstack features without gluing together disparate tools

It's flexible and It's fullstack.

**_To have this full setup running won't cost you a penny, even in production! Cloudflare has generous free tier offerings._**
