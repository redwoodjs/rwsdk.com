// Markdown representation of the RedwoodSDK homepage, served to agents
// that request `Accept: text/markdown` (see `markdownForAgents` middleware).
//
// Keep this file human-authored and semantically aligned with the HTML home
// page so agents get a clean, prose-first summary without stripping decoration
// from the React tree.

export const homeMarkdown = `# RedwoodSDK

> A simple framework for humans.
>
> Server-first React, running on the Cloudflare platform.
> Simple to build. Easy to maintain.

## Get started

Scaffold a Vite project powered by RedwoodSDK. Includes RSC, type-safe routing/SQL, and Cloudflare integration.

\`\`\`sh
npx create-rwsdk my-project-name
\`\`\`

## Principles

Simplicity for humans is clarity for AI. By using React, TypeScript, and Cloudflare without custom "noise," AI focuses on your business logic instead of navigating framework rules.

| Principle        | Technical Reality                               | AI Advantage                                            |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------- |
| Without Magic    | No code-gen or implied routing                  | **Clarity:** AI reads exactly what executes              |
| Composability    | Standard functions and types                    | **Logic:** AI follows your code, not a policy            |
| Web Standards    | If the browser or platform has it, we use it    | **Context:** AI uses core web knowledge                  |
| Server-First     | Linear data flow                                | **Signal:** Higher accuracy for auditing/writing         |

## Routing

Composable functions that describe your app using standard TypeScript.

## Async React

A unified mental model for bridging the gap between the client and server.

- **Async Engine** — server components can \`await\` anywhere.
- **Streaming Bridge** — stream server output into the client progressively.
- **Action Loop** — server actions compose with async React out of the box.

## Realtime

\`useSyncedState\` is a drop-in replacement for \`useState\` that synchronizes state across all connected clients in real-time.

\`\`\`tsx
// Before
const [count, setCount] = useState(0);

// After
const [count, setCount] = useSyncedState(0, 'global-count');
\`\`\`

Transform any local state into a globally synchronized, bi-directional data stream. When you call \`useSyncedState\`, it persists the state on your server automatically. Your server can push data down to the clients, or clients can push data up to the server — without writing a single WebSocket handler.

Learn more: https://rwsdk.com/realtime

## Links for agents

- Documentation: https://docs.rwsdk.com
- API catalog: https://rwsdk.com/.well-known/api-catalog
- Agent skills: https://rwsdk.com/.well-known/agent-skills/index.json
- Sitemap: https://rwsdk.com/sitemap.xml
- Blog: https://rwsdk.com/blog
- Talks: https://rwsdk.com/talks
- Contributors: https://rwsdk.com/contributors
- GitHub: https://github.com/redwoodjs/sdk
`;
