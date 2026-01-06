export interface Annotation {
  word: string;
  lines?: number[];
  text?: string;
}

export interface CodeBlockStep {
  code?: string; // Step-specific code snippet (overrides block code if provided)
  description: string;
  highlightLines?: number[]; // Line numbers (1-indexed) to highlight
  annotations?: Annotation[];
}

export interface CodeBlock {
  code: string;
  steps: CodeBlockStep[];
}

export interface TutorialStep {
  code: string;
  description: string;
  highlightLines?: number[];
  annotations?: Annotation[];
  codeBlockIndex: number;
  stepIndex: number;
}

// Flattened structure for easy navigation
export const tutorialSteps: TutorialStep[] = [];

// Code blocks with multiple steps
export const codeBlocks: CodeBlock[] = [
  {
    code: `\
// Default code (fallback if step doesn't specify)
export default defineApp([]);`,
    steps: [
      {
        code: `\
// Browser - Standard fetch or navigation
fetch('/api/users/123')
  .then(res => res.json())
  .then(data => console.log(data));`,
        description:
          "The Browser Request: It starts with a standard fetch or navigation. Because RedwoodSDK is built on Vite and Cloudflare, there are no proprietary wrappers here.",
        highlightLines: [1, 2],
        annotations: [
          {
            word: "fetch",
            text: "fetch",
            lines: [2],
          },
        ],
      },
      {
        code: `\
// worker.tsx - The Entry Point
export default defineApp([
  // All routes and middleware go here
]);`,
        description:
          "The Worker (The Entry): The request hits a Cloudflare Worker. This is defined in your worker.tsx using defineApp. It's the gateway for all traffic.",
        highlightLines: [2],
        annotations: [
          {
            word: "defineApp",
            text: "defineApp",
            lines: [2],
          },
        ],
      },
      {
        code: `\
// Middleware runs before routes
export default defineApp([
  async function logMiddleware({ request }) {
    console.log(\`\${request.method} \${request.url}\`);
  },
  
  async function authMiddleware({ ctx, request }) {
    const session = await getSession(request);
    if (session) {
      ctx.user = await db.user.find({ id: session.userId });
    }
  },
  
  // Routes follow...
]);`,
        description:
          "Middleware: Before hitting a route, the request passes through global or per-router middleware. This is where you inject headers, handle sessions, or log telemetry.",
        highlightLines: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        annotations: [
          {
            word: "Middleware",
            text: "logMiddleware",
            lines: [3],
          },
          {
            word: "sessions",
            text: "getSession",
            lines: [7],
          },
        ],
      },
      {
        code: `\
// Interruptor: Can halt the flow
function requireAuth({ ctx }) {
  if (!ctx.user) {
    return new Response('Unauthorized', { status: 401 });
  }
}

route('/api/users/:id', [
  requireAuth, // Interruptor runs first
  async function handler({ request, params }) {
    // This only runs if requireAuth doesn't return
  }
]);`,
        description:
          "Interruptors: Unlike traditional middleware, interruptors can halt the flow. If a user isn't authenticated, the interruptor returns a Response (like a 401 or 302 redirect) before the route handler ever executes.",
        highlightLines: [1, 2, 3, 4, 5],
        annotations: [
          {
            word: "Interruptors",
            text: "requireAuth",
            lines: [2],
          },
          {
            word: "halt",
            text: "return new Response",
            lines: [4],
          },
        ],
      },
      {
        code: `\
// The Route: A function that matches a path
route('/api/users/:id', [
  async function handler({ request, params }) {
    // Handler logic here
  }
]);`,
        description:
          "The Route: If the request clears the guards, it matches a route. In RedwoodSDK, every route is just a function.",
        highlightLines: [2],
        annotations: [
          {
            word: "Route",
            text: "route('/api/users/:id'",
            lines: [2],
          },
        ],
      },
      {
        code: `\
// Request Handler: Takes Request, returns Response
route('/api/users/:id', [
  async function handler({ request, params }) {
    const user = await db.user.find({ id: params.id });
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
]);`,
        description:
          "Request Handler: This function takes a Request and returns a Response (or a JSX element, which the SDK converts into a response).",
        highlightLines: [3, 4, 5, 6, 7],
        annotations: [
          {
            word: "Request",
            text: "{ request, params }",
            lines: [3],
          },
          {
            word: "Response",
            text: "new Response",
            lines: [5],
          },
        ],
      },
    ],
  },
  {
    code: `\
// Default code (fallback)
export const Document = ({ children }) => <html>{children}</html>;`,
    steps: [
      {
        code: `\
// Document.tsx - Total Control Over the Document
export const Document = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>My App</title>
      <script type="module" src="/src/client.tsx"></script>
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
);`,
        description:
          "The Document: You have total control over the Document component. No hidden <head> tags; you decide exactly what is sent.",
        highlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        annotations: [
          {
            word: "Document",
            text: "Document",
            lines: [2],
          },
          {
            word: "control",
            text: "<head>",
            lines: [4],
          },
        ],
      },
      {
        code: `\
// pages/Home.tsx - Server Component (RSC)
export default function Home() {
  return (
    <div>
      <h1>Server-First React</h1>
      <ServerData />
    </div>
  );
}`,
        description:
          "Layouts & JSX: Components are rendered server-side. If a page returns JSX, RedwoodSDK renders it to a stream.",
        highlightLines: [3, 4, 5, 6, 7, 8],
        annotations: [
          {
            word: "JSX",
            text: "return (",
            lines: [3],
          },
          {
            word: "server-side",
            text: "export default function",
            lines: [2],
          },
        ],
      },
      {
        code: `\
// components/ServerData.tsx - RSC with streaming
export default async function ServerData() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  return <div>{json.content}</div>;
}`,
        description:
          "Network Streaming: Instead of waiting for the whole page to render, the HTML is streamed as it's generated. This is where React Server Components (RSC) shine—sending the UI structure without the heavy JS bundles.",
        highlightLines: [2, 3, 4, 5],
        annotations: [
          {
            word: "Streaming",
            text: "async function",
            lines: [2],
          },
          {
            word: "RSC",
            text: "ServerData",
            lines: [2],
          },
        ],
      },
      {
        code: `\
// Document.tsx - Hydration script
export const Document = ({ children }) => (
  <html lang="en">
    <head>
      <script type="module" src="/src/client.tsx"></script>
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
);`,
        description:
          "Hydration: On the client, React 'wakes up.' It attaches event listeners to the existing HTML.",
        highlightLines: [5],
        annotations: [
          {
            word: "Hydration",
            text: 'script type="module"',
            lines: [5],
          },
        ],
      },
      {
        code: `\
// components/InteractiveButton.tsx - Client Component
'use client';
import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
        description:
          "Interactivity: Components marked with 'use client' become interactive, handling local state and browser events.",
        highlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        annotations: [
          {
            word: "use client",
            text: "'use client'",
            lines: [1],
          },
          {
            word: "interactive",
            text: "onClick",
            lines: [7],
          },
        ],
      },
    ],
  },
  {
    code: `\
// Default code (fallback)
'use server';
export async function example() {}`,
    steps: [
      {
        code: `\
// server/actions.ts - Server Function
'use server';

export async function createPost(title: string, content: string) {
  const post = await db.post.create({
    title,
    content,
    authorId: ctx.user.id
  });
  return { id: post.id, title: post.title };
}`,
        description:
          "'use server': You define a function in a file with the 'use server' directive.",
        highlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        annotations: [
          {
            word: "use server",
            text: "'use server'",
            lines: [2],
          },
          {
            word: "function",
            text: "createPost",
            lines: [4],
          },
        ],
      },
      {
        code: `\
// components/CreatePostForm.tsx - Client Component
'use client';
import { createPost } from '@/server/actions';

export function CreatePostForm() {
  // Vite/RedwoodSDK creates a Server Reference here
  // (a unique ID and URL)
  return <form>...</form>;
}`,
        description:
          "The Reference: When you import this into a Client Component, Vite/RedwoodSDK creates a Server Reference (a unique ID and URL).",
        highlightLines: [3],
        annotations: [
          {
            word: "Reference",
            text: "import { createPost }",
            lines: [3],
          },
        ],
      },
      {
        code: `\
// Client Component - The Call
'use client';
import { createPost } from '@/server/actions';

export function CreatePostForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Client sends POST request to hidden RPC endpoint
    const result = await createPost(
      formData.get('title') as string,
      formData.get('content') as string
    );
    
    console.log('Post created:', result);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Create Post</button>
    </form>
  );
}`,
        description:
          "The Call: When the user clicks a button, the client sends a POST request to that hidden RPC endpoint.",
        highlightLines: [10, 11, 12, 13, 14],
        annotations: [
          {
            word: "Call",
            text: "await createPost",
            lines: [11],
          },
          {
            word: "POST",
            text: "handleSubmit",
            lines: [6],
          },
        ],
      },
      {
        code: `\
// server/actions.ts - Execution on Server
'use server';

export async function createPost(title: string, content: string) {
  // Cloudflare Worker recognizes RPC ID
  // Executes function on server
  const post = await db.post.create({
    title,
    content,
    authorId: ctx.user.id
  });
  
  // Returns serialized result (or RSC chunks)
  return { id: post.id, title: post.title };
}`,
        description:
          "Execution: The Cloudflare Worker recognizes the RPC ID, executes the function on the server, and returns the serialized result (or even new RSC chunks) back to the client.",
        highlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        annotations: [
          {
            word: "Execution",
            text: "await db.post.create",
            lines: [5],
          },
          {
            word: "serialized",
            text: "return { id: post.id",
            lines: [11],
          },
        ],
      },
    ],
  },
];

// Helper to get steps for a specific code block
export function getStepsForBlock(blockIndex: number): TutorialStep[] {
  const block = codeBlocks[blockIndex];
  if (!block) return [];

  return block.steps.map((step, stepIndex) => ({
    code: step.code || block.code, // Use step-specific code if provided, otherwise fall back to block code
    description: step.description,
    highlightLines: step.highlightLines,
    annotations: step.annotations,
    codeBlockIndex: blockIndex,
    stepIndex: stepIndex,
  }));
}

// Flatten code blocks into steps for navigation
codeBlocks.forEach((_, blockIndex) => {
  tutorialSteps.push(...getStepsForBlock(blockIndex));
});
