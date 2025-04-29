export interface FeatureBlock {
  title: string;
  titleHighlight: string;
  description: string;
  items: string[];
}

export const featureBlocks: FeatureBlock[] = [
  {
    title: "One Response",
    titleHighlight: "to Build Them All",
    description: "Every route is just a function. Every function can return a response or a component.",
    items: [
      "Code-based routing, zero boilerplate",
      "JSX as a response — literally return <Page />",
      "Stream requests, upgrade to WebSockets, no abstraction tax",
      "Interruptors for fine-grained control",
      "Middleware that feels built-in, not bolted on"
    ]
  },
  {
    title: "React Server Components",
    titleHighlight: "Reimagined",
    description: "RedwoodSDK gives you seamless, production-ready support for React Server Components—no hacks required.",
    items: [
      "Server-first by default, with streaming built-in and zero ceremony.",
      "SSR without the boilerplate",
      "Native use server/use client directives",
      "Realtime streaming via edge-rendered JSX",
      "Lightning-fast time-to-interactive"
    ]
  },
  {
    title: "Concept to",
    titleHighlight: "Cloudflare",
    description: "RedwoodSDK is built for Cloudflare from the first line of code. Local dev feels native. Production feels magic. No surprises. No config hell. No \"it works on my machine.\"",
    items: [
      "Miniflare-powered Cloudflare emulation",
      "Runs locally in workers just like production",
      "Fully traceable from request to response"
    ]
  }
]; 