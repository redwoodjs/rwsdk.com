export interface BuilderSection {
  title: string;
  titleHighlight: string;
  description: string;
  items: string[];
}

export const builderSections: BuilderSection[] = [
  {
    title: "Built for",
    titleHighlight: "Builders",
    description: "RedwoodSDK is your canvas for personal software. Whether you're shipping a side project, running a micro-SaaS, or building the next big thing—this stack stays out of your way.",
    items: [
      "Bring your own tools: Vite, Tailwind, Prisma, YOU DO YOU",
      "Realtime support, baked in—not bolted on",
      "Predictable, composable responses that just work",
      "Build software you own, on infrastructure you control"
    ]
  },
  {
    title: "Ship faster,",
    titleHighlight: "Flow Longer",
    description: "No wrappers. No black boxes. Just tools that work as they should.",
    items: [
      "No wrappers. No black boxes. Just tools that work as they should.",
      "HMR Live reloads. Type safety. Cloudflare-native from the jump",
      "Familiar tools like Vite and JSX, supercharged for the edge",
      "Work locally in the same runtime as production: D1 (SQL), R2 (object storage), Queues, Workers AI, and more—zero config required"
    ]
  }
]; 