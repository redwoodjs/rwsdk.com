
export const routerWalkthroughSteps = [
  {
    title: "The Basics",
    description: "A route matches a request and hands it to a function that returns a response.",
    code: `import { defineApp } from "@rwsdk/worker"
import { route } from "@rwsdk/router"

export default defineApp([
  // Match paths to route handlers
  route("/", () => {
    return <h1>Hello, World!</h1>
  }),
])`,
    highlightLines: [5, 6, 7, 8],
    focusLine: 5,
  },
  {
    title: "Response Types",
    description: "You can colocate API and UI routes in the same file, API routes return Response objects, UI routes return JSX.",
    code: `import { defineApp } from "@rwsdk/worker"
import { route } from "@rwsdk/router"

export default defineApp([
  route("/", () => {
    // Returns JSX
    return <h1>Hello, World!</h1>
  }),
  route("/api", () => {
    // Returns Response objects
    return new Response(
      JSON.stringify({ message: "Hello, World!" })
    )
  }),
])`,
    highlightLines: [6, 7, 10, 11, 12, 13],
    focusLine: 7,
  },
  {
    title: "Composability",
    description: "Use standard language features to organize your routes",
    code: `import { defineApp } from "@rwsdk/worker"
import { route, prefix } from "@rwsdk/router"

// Use standard language features to organize routes.
const apiRoutes = [
  route("/users", userRoutes),
  route("/posts", postRoutes),
]

export default defineApp([
  route("/", () => <h1>Hello, World!</h1>),
  prefix("/api", apiRoutes),
  // Becomes:
  //     /api/users
  //     /api/posts
])`,
    highlightLines: [4, 5, 6, 7, 8, 12, 13, 14, 15],
    focusLine: 5,
  },
  
  {
    title: "Middleware",
    description: "Middleware runs before route handlers, can view the request (pathname, headers, cookies, etc.) and modify the context.",
    code: `import { defineApp } from "@rwsdk/worker"
import { route, prefix } from "@rwsdk/router"

export default defineApp([
  // Middleware runs before every route
  async function middleware({ ctx }) {
    ctx.startTime = Date.now();
  },
  route("/", ({ ctx }) => <h1>Hello, World! {ctx.startTime}</h1>),
  // Group related routes
  prefix("/api", [
    route("/users", userRoutes),
    route("/posts", postRoutes)
  ])
])`,
    
    highlightLines: [5, 6, 7, 8],
    focusLine: 6,
  },
  {
    title: "Interrupters",
    description: "Interrupters are 'per-route middleware' that can short-circuit a route's response; which you can use for auth, rate limiting, etc.",
    code: `import { defineApp } from "@rwsdk/worker"
import { route, prefix } from "@rwsdk/router"

function requireAuth({ ctx }) {
  if (!ctx.user.isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }
}

export default defineApp([
  route('/admin', [
    requireAuth,
    AdminDashboard
  ])
])`,
    highlightLines: [4, 5, 6, 7, 8, 12],
    focusLine: 12,
  }
];
