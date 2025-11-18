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

Shipping a [Cloudflare Workers](https://developers.cloudflare.com/workers/) release should be boring—in a good way. This workflow is a small, repeatable [GitHub Actions](https://docs.github.com/actions) pipeline you can trigger on demand with an environment selector (`staging` or `production`). It pins the toolchain for deterministic builds, keeps secrets in the right place, and runs fast so releases feel like a single click or API call.

At a glance, the job checks out the repository, sets up Node and pnpm, installs dependencies, builds the project, and then deploys with [Wrangler](https://developers.cloudflare.com/workers/wrangler/) using `wrangler deploy --env <env>`. Concurrency is enabled to prevent overlapping deploys to the same environment, so each release is serialized per target ([GitHub Actions concurrency](https://docs.github.com/actions/using-jobs/using-concurrency)). The workflow is triggered manually with a typed input ([`workflow_dispatch` inputs](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)).

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

A couple of notes to keep it smooth: `--env` maps to your `wrangler.jsonc` environment sections (for example, `staging` and `production`)—see [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/configuration/environments/). This example uses a generated config at `dist/worker/wrangler.json` after build; if your project uses a root config, point Wrangler there instead. Pinning `wrangler` (and matching Node/pnpm) keeps builds reproducible; adjust versions to match your project and CI base image. The steps reference well‑known actions: [`actions/checkout`](https://github.com/actions/checkout), [`actions/setup-node`](https://github.com/actions/setup-node), and [`pnpm/action-setup`](https://github.com/pnpm/action-setup). Deploy uses `wrangler deploy` ([command reference](https://developers.cloudflare.com/workers/wrangler/commands/#deploy)).

For secrets, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` under GitHub Settings → Secrets and variables → Actions. The token should include “Workers Scripts:Edit” and “Account:Read”; create or scope it appropriately via [Cloudflare API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). If you want environment‑specific secrets or approvals, configure [GitHub Environments](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment) named `staging` and `production` and keep sensitive values scoped there.

A few pragmatic tips: cache pnpm via `actions/setup-node`’s `cache: pnpm` input to speed up installs; keep build artifacts minimal and let Wrangler bundle based on your `wrangler.jsonc`; and if you want canaries, add a `canary` environment or a `--dry-run` input and route only a subset of traffic at the DNS/route level.

If something goes wrong, start here: a 403 from Wrangler usually means the token scopes or account ID are off; an “env not found” error means the `[env.<name>]` block is missing in `wrangler.jsonc`; and if the build can’t find your config, ensure `dist/worker/wrangler.json` exists post‑build or point Wrangler at your root config.

The result is dependable, low‑touch releases: press a button (or hit the API), and ship the same way every time.


