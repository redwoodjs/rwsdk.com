import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    tailwindcss(),
    redwood(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
  ],
});
