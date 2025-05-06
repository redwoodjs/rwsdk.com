import { BlogPost } from "./types";
import { authors } from "../authors";

export const blogPosts: BlogPost[] = [
  {
    slug: "redwoodjs-to-redwoodsdk",
    title: "From RedwoodJS to RedwoodSDK",
    description:
      "RedwoodSDK is here. RedwoodJS is not going anywhere. We are excited to share that our focus is evolving to a new direction: RedwoodSDK 🚀",
    date: "2025-04-01",
    author: authors["peter"],
    image: "86a788b0-00dd-481b-30c3-e05e9d372800",
    tags: ["redwoodjs", "redwoodsdk"],
    content: "Content will be loaded from markdown file...",
  },
  {
    slug: "redwoodsdk-and-cloudflare-environments",
    title:
      "Managing Production and Staging Environments with RedwoodSDK and Cloudflare",
    description:
      "Learn how to easily manage production and staging environments for your RedwoodSDK application using Cloudflare's environment variables and deployment commands.",
    date: "2025-04-10",
    author: authors["herman"],
    image: "077a4d25-89e1-46f4-6f62-71d8ee160500",
    tags: ["redwoodsdk", "cloudflare", "deployment", "environments"],
    content: "Content will be loaded from markdown file...",
  },
  {
    slug: "redwoodsdk-streaming-guide",
    title: "How to use React Server Function Streams in RedwoodSDK",
    description:
      "RedwoodSDK introduces a powerful feature: React Server Function Streams. This allows developers to stream partial responses from the server to the client, enabling real-time updates and improved user experiences.",
    date: "2025-04-22",
    author: authors["herman"],
    image: "7a9d155b-1d08-4158-2f45-f42a723fbc00",
    tags: ["redwoodsdk", "streaming", "guide", "realtime"],
    content: "Content will be loaded from markdown file...",
  },
  {
    slug: "redwoodsdk-multiple-documents",
    title: "Per-Route Documents in RedwoodSDK: Total Control Over Your HTML",
    description: "You control every byte over the wire.",
    date: "2025-04-23",
    author: authors["peter"],
    image: "a63a9f22-bb6f-440d-36a4-c230a784bd00",
    tags: ["redwoodsdk", "html", "guide"],
    content: "Content will be loaded from markdown file...",
  },
  {
    slug: "back-to-the-future",
    title: "Back to the Future",
    description: "RedwoodSDK is the back to the future of web development. \"Now in cinemas\".  Join me on my personal evolution of web development.",
    date: "2025-05-06",
    author: authors["herman"],
    image: "3e1d4578-e67b-4444-b056-70b495fce800",
    tags: ["redwoodsdk", "personal"],
    content: "Content will be loaded from markdown file...",
  },
];

export type BlogPostSlug = (typeof blogPosts)[number]["slug"];
