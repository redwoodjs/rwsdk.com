---
title: "Zero‑drama Cloudflare Workers releases with GitHub Actions"
description: "A simple, repeatable GitHub Actions workflow to build and deploy a Worker with Wrangler, environment inputs, and secrets."
date: "2025-11-17"
author:
  id: "herman"
heroImage: "9646a06a-4db9-49c7-b743-b9fcd542ad00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/6138e964-58e1-4170-49b4-e486b8839500/public"
tags: ["cloudflare", "workers", "wrangler", "github-actions", "ci-cd"]
---

# Zero‑drama Cloudflare Workers releases with GitHub Actions

## Goals

- Single click (or API) deploys to staging/production  
- Deterministic builds with pinned toolchains  
- Secure secrets and environment handling  
- Clear, fast pipeline

## Workflow at a glance

- Manually triggered workflow with an environment selector (`staging` or `production`)
- Set up Node + pnpm, pin `wrangler`, install dependencies
- Builds the app, then deploys with `wrangler deploy --env <env>`

```yaml
# .github/workflows/deploy-worker.yml
name: Deploy Worker

on:
  workflow_dispatch:
    inputs:
      cloudflare_env:
        description: "Target environment"
        type: choice
        required: true
        options:
          - staging
          - production

concurrency:
  group: deploy-${{ github.event.inputs.cloudflare_env }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.cloudflare_env }}
    permissions:
      contents: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
          run_install: false

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Deploy with Wrangler
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: |
          pnpm dlx wrangler@3.78.10 deploy \
            --env "${{ github.event.inputs.cloudflare_env }}" \
            --config "dist/worker/wrangler.json"
```

Notes:

- `--env` maps to your `wrangler.jsonc` env sections (e.g., `staging`, `production`).
- This uses the generated config at `dist/worker/wrangler.json` after build.
- Pin `wrangler` for reproducibility. Adjust Node/pnpm versions to match your project.

## Required secrets and environments

Set these in GitHub Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN`: API token with “Workers Scripts:Edit” and “Account:Read”
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

Optional per‑environment variables can be configured using GitHub Environments (`staging`, `production`) to scope secrets and approvals.

## Tips for reliable deploys

- Cache pnpm via `actions/setup-node` `cache: pnpm` for faster installs.
- Use `concurrency` to avoid overlapping deploys to the same environment.
- Keep build artifacts minimal; let Wrangler bundle based on your `wrangler.jsonc`.
- For canary releases, add an input like `--dry-run` or a `canary` env and route only a subset of traffic at the DNS/route level.

## Troubleshooting

- 403 from Wrangler: verify `CLOUDFLARE_API_TOKEN` scopes and `CLOUDFLARE_ACCOUNT_ID`.
- Env not found: ensure an `[env.<name>]` block exists in `wrangler.jsonc`.
- Build can’t find config: confirm `dist/worker/wrangler.json` exists post‑build or switch to the root config if your build doesn’t generate one.

This yields dependable, low‑touch releases: one button (or API call), the same way every time.


