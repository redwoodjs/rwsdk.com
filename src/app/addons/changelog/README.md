# GitHub Releases Addon

This addon fetches, caches, and displays the latest releases from a GitHub repo.

## Installation

### Dependencies & Tailwind CSS

Install the dependencies using your package manager (substitute `npm` for your package manger):

```bash
npm install @tailwindcss/typography marked marked-highlight highlight.js
```

Add the tailwind CSS typography plugin into `src/app/styles.css`

```diff
  @import "tailwindcss";
+ @plugin "@tailwindcss/typography";
```

If you do not have Tailwind installed, please [follow the documentation](https://docs.rwsdk.com/guides/frontend/tailwind/), and do so now.

### Cloudflare KV

Create a KV queue called `KV_ADDON_CHANGELOG`:

```bash
npx wrangler queues create KV_ADDON_CHANGELOG
```

### Integration

The final step is to add the routes to your worker:

```diff
+   import { changelogRoutes } from '@/addons/changelog/routes.tsx

    defineApp([
+        prefix('/changelog', changelogRoutes),
    ])

```

And changing the repo-name in the addon's routes.tsx file:

```diff
+   let releaseKeys = await fetchReleases("GITHUB_ORG/GITHUB_REPO");
```
