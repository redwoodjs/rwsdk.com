---
title: "Using Cloudflare Hyperdrive with an External MySQL: Migrations and Seeding"
description: "Private, low-latency MySQL from Workers using Hyperdrive—plus a clean split for Worker runtime access vs Node-based migrations and seeds."
date: "2025-11-13"
author:
  id: "herman"
heroImage: "e1894d1b-f9b2-40e9-be1e-d0a141681a00"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/b84a4952-3bab-4801-26fd-1b354af75900/public"
tags: ["cloudflare", "workers", "hyperdrive", "mysql", "kysely"]
---

# Using Cloudflare Hyperdrive with an External MySQL: Migrations and Seeding

If you’re building on [Cloudflare Workers](https://developers.cloudflare.com/workers/) and you already have a MySQL database (PlanetScale, Vitess, or self-managed), **[Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/)** gives you private, low-latency access from the edge without exposing your database to the public internet. In practice, this means production connections are brokered by Cloudflare, connections are short‑lived, and credentials are issued per request—so you don’t have to ship static database secrets to the edge.

This post shows the end‑to‑end shape of a setup that keeps your Worker runtime simple (Kysely + `mysql2`), while running migrations and seeds in Node where local dev and CI are easiest. We’ll wire up Wrangler, create a Worker‑side DB client, build a Node‑side client for tooling, and cover migrations and idempotent seeding—with a few production footguns to avoid along the way.

## Why Hyperdrive

Hyperdrive is a great fit when:

- You want to keep your DB private but still connect from the edge. Cloudflare runs a secure proxy close to your origin, so connections stay fast and private.
- You want to avoid long‑lived credentials in Workers. Hyperdrive issues ephemeral, per‑request credentials, reducing secret sprawl.
- You already have MySQL (including [Vitess](https://vitess.io/) / [PlanetScale](https://planetscale.com/)) and want it to “just work” with familiar tools like [Kysely](https://kysely.dev/) and [`mysql2`](https://github.com/sidorares/node-mysql2).

## Wrangler configuration

You declare a Hyperdrive binding per environment in your `wrangler.json`/`wrangler.jsonc`. For local development and CI, a `localConnectionString` lets you point the binding at a local or containerized MySQL instance while keeping the rest of your code unchanged. See [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) and Hyperdrive [bindings](https://developers.cloudflare.com/hyperdrive/platform/bindings/) for details.

- Declare a Hyperdrive binding per environment; use `localConnectionString` for dev/CI:

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "localConnectionString": "mysql://user:pass@localhost:3306/app_db"
    }
  ]
}
```

## Worker database (Kysely + mysql2)

Inside your Worker, construct a Kysely instance using connection details from the Hyperdrive binding. Enabling `nodejs_compat` unlocks the Node client library so you can use `mysql2` from the Workers runtime. This keeps your runtime code identical across dev and prod, while Hyperdrive abstracts where the connection terminates.

- Use the bound Hyperdrive fields to create a Kysely dialect:

```ts
// db/index.ts (Worker runtime)
import { env } from 'cloudflare:workers'
import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'

export function createDb() {
  const { host, port, user, password, database } = env.HYPERDRIVE
  const dialect = new MysqlDialect({
    pool: createPool({ host, port, user, password, database, connectionLimit: 10 }),
  })
  return new Kysely({ dialect })
}
```

## Node tooling (migrations/seeding)

Migrations and seeding are better run outside Workers so you can iterate quickly, reuse the same scripts in CI, and avoid tying long‑running actions to the request lifecycle. For that, create a Node‑side Kysely client that reads a regular `DATABASE_URL`. This pairs nicely with `localConnectionString` in development and connects directly to MySQL in CI.

- Migrations and seeding run outside Workers, using `DATABASE_URL`:

```ts
// db/utils.ts (Node scripts)
import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'

export function createLocalDb() {
  const dialect = new MysqlDialect({ pool: createPool(process.env.DATABASE_URL!) })
  return new Kysely({ dialect })
}
```

### Migrations with Kysely

Kysely’s migration system is simple and file‑based, which makes it easy to wire into `tsx`/`ts-node` scripts and CI. You can create a small CLI that applies the latest migration, steps up/down one migration, or lists current state. See the official docs for more options: [Kysely migrations](https://kysely.dev/docs/migrations/).

- File-based migrations and a simple CLI:

```ts
// db/migrate.ts (conceptual)
const migrator = new Migrator({
  db: createLocalDb(),
  provider: new FileMigrationProvider({ fs, path, migrationFolder: 'src/db/migrations' }),
  allowUnorderedMigrations: true,
})
await migrator.migrateToLatest()
```

Commands:

- Latest: `tsx src/db/migrate.ts`
- Up one: `tsx src/db/migrate.ts up`
- Down one: `tsx src/db/migrate.ts down`
- List: `tsx src/db/migrate.ts list`

If you’re on [Vitess](https://vitess.io/) (including [PlanetScale](https://planetscale.com/)), avoid database‑level foreign keys—they’re not supported. Enforce referential integrity in your services and/or via application‑level checks instead.

### Seeding strategy (idempotent)

Your seed should be safe to run multiple times: **idempotent**. Using MySQL’s `INSERT ... ON DUPLICATE KEY UPDATE` (exposed by Kysely via `onDuplicateKeyUpdate`) lets you upsert a consistent baseline dataset for dev and CI. That means you can wipe the DB, run migrations, seed, and get a predictable world—every time. See the MySQL docs: [INSERT ... ON DUPLICATE KEY UPDATE](https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html).

```ts
// db/scripts/seed.ts (conceptual)
const db = createLocalDb()
await db.insertInto('company').values({ name: 'Default Co', /* ... */ })
  .onDuplicateKeyUpdate({ updatedAt: sql`now()` }).execute()

await db.insertInto('auth_user').values({ email: adminEmail, role: 'admin', /* ... */ })
  .onDuplicateKeyUpdate({ role: sql`VALUES(role)` }).execute()

// Seed auth_account with hashed passwords; insert accounts/trucks/calls similarly
```

## Environment guidance

In development and CI, prefer speed and iteration: point Hyperdrive’s `localConnectionString` at a local container or dev DB, and let your Node scripts use `DATABASE_URL` directly. In staging and production, bind your Worker to the managed Hyperdrive `id` and let Cloudflare handle credential brokering and connection pooling at the edge.

- Dev/CI: `localConnectionString` maps Hyperdrive to local Docker or a local port; scripts use `DATABASE_URL`.
- Staging/Prod: bind to the managed Hyperdrive `id`; no `localConnectionString`.
- Node compat: enable [`nodejs_compat`](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) to use `mysql2` from Workers code.
- Pool sizing: keep connection limits conservative per isolate; Workers scale horizontally.

## Pitfalls and patterns

There are a few easy wins to keep things smooth in production. Don’t duplicate database credentials into Worker `vars`—let Hyperdrive issue ephemeral credentials per request. Make seeds idempotent so CI can re‑run them without surprises. If your DB layer can’t enforce foreign keys (Vitess), push integrity checks into your service layer. Finally, provision distinct databases per environment (dev/test/staging/prod) to avoid accidental cross‑contamination.

## What you gain

With this setup, you get **production‑grade external MySQL** from Workers with minimal ops, a **clean separation** between Worker‑time database access and Node‑based tooling, and **deterministic dev/CI** through repeatable migrations and idempotent seeds. It’s a small amount of structure that pays for itself the first time you rotate credentials, rebuild CI from scratch, or diagnose a tricky edge‑only bug.



