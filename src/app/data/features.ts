export interface FeatureBlock {
  title: string;
  items: string[];
  animatedGif?: string;
  code?: string[];
}

export const featureBlocks: FeatureBlock[] = [
  {
    title: "Every route is just a function",
    items: [
      "Return JSX, stream a response, or upgrade to websockets.",
      "There’s no special syntax or compiler magic. ",
      "A route is a standard function that takes a Request and returns a Response - or even a <Page />"
    ],
    code:[ `
  export default defineApp([
    render(Document, [
      index(Home), // JSX page
      route("/users", UsersPage), // JSX page
      route("ping", () => new Response(
        "pong", { status: 200 }
      )),
    ]),
  ]);
    `],
    animatedGif: "/images/request-response.gif"
  },
  {
    title: "Built on Standards",
    items: [
      "Request and Response follow the native Web API.",
      "Stream responses, upgrade protocols, debug in DevTools — no wrappers or black boxes."
    ],
    animatedGif: "/images/react-server-components.gif",
    code: [`
    defineApp([
      route("/upload/", async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        // Stream the file directly to R2
        const r2ObjectKey = \`/storage/\${file.name}\`;
        await env.R2.put(r2ObjectKey, file.stream(), {
          httpMetadata: {
            contentType: file.type,
          },
        });

        return new Response(JSON.stringify({ key: r2ObjectKey }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }),
    ]);
    `]
  },
  {
    title:"Co-Locate Logic and UI",
    items: [
      "Define your API and UI in the same place.",
      "Keep your JSON and JSX responses together, scoped to a single router.",
      "One file, one mental model."
    ],
    code: [`
    const authRoutes = [
      route("/login", Login),
      route("/account", [
        async ({ ctx, request }) => {
          if (!ctx.user) {
            const headers = new Headers();
            await sessions.remove(request, headers);
            headers.set("Location", "/auth/login");

            return new Response(null, {
              status: 302,
              headers,
            });
          }
        },
        AccountPage
      ]),
    ];

    export default authRoutes;
    `]
  },
  {
    title: "Interruptors",
    items: [
      "Shape the request flow before it hits your route.",
      "Interruptors let you intercept requests, check auth, redirect, or halt the response, on a per route basis, with full access to the environment and context."
    ],
    code: [`
   function isAuthenticated({ request, ctx }) {
      // Ensure that this user is authenticated
      if (!ctx.user) {
        return new Response("Unauthorized", { status: 401 })
      }
    }

    defineApp([
      route("/blog/:slug/edit", [isAuthenticated, EditBlogPage]);
      // EditBlogPage will only run if isAuthenticated = true
    ])`]
  },
  {
    title: "Middleware That Matters",
    items: [
      "Run logic before and after your routes.",
      "Middleware is part of the request/response flow — ideal for injecting headers, setting up context, or streaming from the edge.",
    ],
    code: [`
    defineApp([
      sessionMiddleware,
      async function getUserMiddleware({ request, ctx }) {
        if (ctx.session.userId) {
          ctx.user = await db.user.find({ where: { id: ctx.session.userId } });
        }
      },
      route("/hello", [
        function ({ ctx }) {
          if (!ctx.user) {
            return new Response("Unauthorized", { status: 401 });
          }
        },
        function ({ ctx }) {
          return new Response(\`Hello \${ctx.user.username}!\`);
        },
      ]), 
    ]);
`]
  },
  {
    title: "Total Control Over the Document",
    items: [
      "Render the HTML document yourself — no hidden magic.",
      "You choose what goes over the wire. Turn client-side React on or off.",
      "Inject headers, preload tags, inline styles, or raw HTML.",
      "You’re in control of the entire response, from status code to closing tag."
    ],
    code: [`
    import { Document } from "@/pages/Document";
    import { NoJSDocument } from "@/pages/NoJSDocument";
    import { HomePage } from "@/pages/HomePage";

    export default defineApp([
      render(Document, [route("/", HomePage)]),
      render(NoJSDocument, [
        route("/no-js", () => new Response(
          "No Javascript injected in this Document, just plain HTML", 
          { status: 200 })
        )
      ])
    ]);
    `,
  `
  export const Document = ({ children }) => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script type="module" src="/src/client.tsx"></script>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
  `,
`
export const NoJSDocument = ({ children }) => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
`]
  }
]; 