import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  environments: {
    // workaround(justinvdm, 25 Mar 2025):
    // * tailwindcss currently uses the non-deprecated internal createResolver() vite API method:
    // https://github.com/tailwindlabs/tailwindcss/blob/main/packages/%40tailwindcss-vite/src/index.ts#L22
    // * The code and its docstring indicate that it relies on an `ssr` being present:
    // https://github.com/vitejs/vite/blob/c0e3dba3108e479ab839205cfb046db327bdaf43/packages/vite/src/node/config.ts#L1498
    // * This isn't the case for us, since we only have a `worker` environment instead of `ssr`
    // * To prevent builds getting blocked on this, we stub out the ssr environment here
    ssr: {},
  },
  plugins: [
    tailwindcss(),
    redwood(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
  ],
});
