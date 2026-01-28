import { CodeBlock } from "./tutorial";

interface ExtendedCodeBlock extends CodeBlock {
  title: string;
  description: string;
}

export const homeWalkthroughBlocks: ExtendedCodeBlock[] = [
  {
    title: "The Router",
    description: "Composable functions that describe your app using standard TypeScript.",
    code: "",
    steps: [
      {
        code: `import { defineApp } from "@rwsdk/worker"
import {  route } from "@rwsdk/router"

export default defineApp([
    route('/', function handler() { 
       return new Response('Hello, world!')
    })
])`,
        description:
          "A route is a simple incoming request matches a route and then hand it off to a function which returns a response.",
        highlightLines: [5, 6, 7],
      },
      {
        code: `import { defineApp } from "@rwsdk/worker"
import {  route, prefix } from "@rwsdk/router"

export default defineApp([
  // ...
  prefix("/api", [
    route("/users", UsersHandler),
    route("/posts", PostsHandler)
  ])
])`,
        description:
          "These are standard language features, so they're super composable. You can group related routes using prefix.",
        highlightLines: [6, 7, 8, 9],
      },
      {
        code: `export default defineApp([
  async function middleware({ ctx }) {
    ctx.startTime = Date.now();
    ctx.user = await getUserFromSession();
  },
  route('/', HomePage)
])`,
        description:
          "We have middleware that allows you to modify the context before it reaches your routes.",
        highlightLines: [2, 3, 4, 5],
      },
      {
        code: `route("/admin", [
  function authCheck({ ctx }) {
    if (!ctx.user.isAdmin) {
      return new Response("Forbidden", { status: 403 });
    }
  },
  AdminDashboard
])`,
        description:
          "We have per-route middleware called Interrupters that allows you to short-circuit the response and create a readable, composable flow in your app.",
        highlightLines: [2, 3, 4, 5, 6],
      },
      {
        code: `export default defineApp([
  route("/api/data", () => new Response(JSON.stringify(data))),
  route("/", () => <h1>Hello World</h1>)
])`,
        description:
          "That response can either be a web standard response object or JSX.",
        highlightLines: [2, 3],
      },
    ],
  },
  {
    title: "Server Functions",
    description: "A native RSC RPC framework. Built into React, using the 'flight' format and transpilation to bridge server and client for navigation, queries, and mutations.",
    code: ``,
    steps: [
      {
        code: `"use server";\nimport { requestInfo } from "rwsdk/worker";\n\nexport async function addTodo(formData: FormData) {\n  const { ctx } = requestInfo;\n  const title = formData.get("title");\n  await db.todo.create({ data: { title, userId: ctx.user.id } });\n}`,
        description: "Simple Server Function: Mark functions with 'use server' to automatically create RPC endpoints. Results are streamed via React's flight format.",
        highlightLines: [1, 4],
        interactionKey: "rpc-basic"
      },
      {
        code: `"use server";\nimport { serverQuery } from "rwsdk/worker";\n\nexport const getTodos = serverQuery(async (userId: string) => {\n  return db.todo.findMany({ where: { userId } });\n});`,
        description: "serverQuery: Optimized for fetching data. Returns serialized data and **skips hydration**, allowing you to update local state without a full-page re-render.",
        highlightLines: [4],
        interactionKey: "rpc-query"
      },
      {
        code: `"use server";\nimport { serverAction } from "rwsdk/worker";\n\nexport const createTodo = serverAction(async (title: string) => {\n  await db.todo.create({ data: { title } });\n});`,
        description: "serverAction: Handle mutations and navigation. Automatically triggers a server-side re-render to keep the client UI in sync.",
        highlightLines: [4],
        interactionKey: "rpc-action"
      }
    ]
  },
  {
    title: "Realtime",
    description: "A bidirectional (server-client) hook that syncs state across all connected clients in realtime. Completely pluggable, allowing you to persist data in any layer on the server.",
    code: ``,
    steps: [
      {
        code: `"use client";\nimport { useSyncedState } from "rwsdk/use-synced-state/client";\n\nexport function SharedCounter() {\n  // 1. Bidirectional sync: Local state changes push to the server\n  // and server-side updates push back to all browsers.\n  const [count, setCount] = useSyncedState(0, "counter");\n\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Shared Count: {count}\n    </button>\n  );\n}`,
        description: "Realtime Hook: useSyncedState works like useState, but synchronization is handled automatically across all connected clients.",
        highlightLines: [7]
      },
      {
        code: `import { SyncedStateServer } from "rwsdk/use-synced-state/worker";\n\n// 2. Pluggable persistence: define how state is saved on the server.\n// You can use D1, KV, or any external API.\nSyncedStateServer.registerSetStateHandler(async (key, value) => {\n  await db.state.upsert({ key, value });\n});`,
        description: "Pluggable Persistence: Decouple your realtime state from your storage. Define custom handlers to persist data wherever you need.",
        highlightLines: [5, 6, 7]
      },
      {
        code: `import { renderRealtimeClients } from "rwsdk/realtime/worker";\n\n// 3. Server-Push: Manually trigger a re-render for all clients\n// connected to a specific state atom.\nawait renderRealtimeClients({ key: "counter" });`,
        description: "Instant Updates: Updates propagate instantly. Use renderRealtimeClients to push server-initiated changes to all browsers.",
        highlightLines: [5]
      }
    ]
  },
  {
    title: "Server-First with SPA Speed",
    description: "The simplicity of the server-first web meets the performance of a SPA. Build using standard request/response patterns over native RSC RPC methods.",
    code: ``,
    steps: [
      {
        code: `import { initClient, initClientNavigation } from "rwsdk/client";\n\n// Intercepts clicks and fetches the next page's RSC payload\nconst { handleResponse } = initClientNavigation();\ninitClient({ handleResponse });`,
        description: "Standard Request/Response: We use RSC RPC methods to fetch the new page data. It feels like a SPA, but every navigation is a proper server-side request.",
        highlightLines: [4, 5]
      },
      {
        code: `// This link performs a client-side transition\n<a href="/dashboard">Go to Dashboard</a>`,
        description: "Click to Hydrate: When a user clicks, we fetch the RSC payload and hydrate the new page instantly, following how the web was meant to be built.",
        highlightLines: [2]
      },
      {
        code: `// Using a standard link tag to hint the browser\n<link rel="x-prefetch" href="/next-page" />\n\n// Or programmatically\nimport { prefetch } from "rwsdk/client";\nprefetch("/dashboard");`,
        description: "Incremental Speed: Use standard 'x-prefetch' tags to pre-load RSC payloads before the user even clicks, ensuring near-instant transitions.",
        highlightLines: [2, 6]
      },
      {
        code: `// RedwoodSDK supports the native View Transitions API\n// for seamless, animated page swaps.\ndocument.startViewTransition(() => {\n  navigate("/next-page");\n});`,
        description: "View Transitions: Modern page transitions using the browser's native API, perfectly integrated with our RSC navigation.",
        highlightLines: [3]
      }
    ]
  }
];
