---
title: "Using Cloudflare Hyperdrive with an External MySQL: Migrations and Seeding"
description: "Private, low-latency MySQL from Workers using Hyperdrive—plus a clean split for Worker runtime access vs Node-based migrations and seeds."
date: "2025-11-13"
author:
  id: "herman"
heroImage: "3d0544ee-7197-42a2-9954-b8524ab83100"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/b84a4952-3bab-4801-26fd-1b354af75900/public"
tags: ["cloudflare", "workers", "hyperdrive", "mysql", "kysely"]
---

# Using Cloudflare Hyperdrive with an External MySQL: Migrations and Seeding

## Why Hyperdrive

- **Private, low-latency DB access** from Workers (no public DB exposure).
- **Ephemeral, per-request credentials** (reduced secret handling).
- **Works with existing MySQL** (including Vitess/PlanetScale) and ORMs like Kysely.

## Wrangler configuration

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

For Vitess/PlanetScale, avoid DB‑level FKs; enforce integrity in services.

### Seeding strategy (idempotent)

- Upsert a baseline dataset (company, admin, drivers, accounts, trucks, calls) for dev/CI repeatability:

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

- **Dev/CI**: `localConnectionString` maps Hyperdrive to local Docker or a local port; scripts use `DATABASE_URL`.
- **Staging/Prod**: bind to the managed Hyperdrive `id`; no `localConnectionString`.
- **Node compat**: enable `nodejs_compat` to use `mysql2` from Workers code.
- **Pool sizing**: keep conservative per isolate; Workers scale horizontally.

## Pitfalls and patterns

- Enforce referential integrity in services if the DB doesn’t enforce FKs.
- Let Hyperdrive manage DB credentials; don’t duplicate in `vars`.
- Make seeds idempotent for reliable re-runs in CI.
- Provision distinct DBs per environment (dev/test/staging/prod).

## What you gain

- **Production-grade external MySQL** from Workers with minimal ops.
- **Clean separation** between Worker runtime DB access and Node scripts.
- **Deterministic dev/CI** environments with migrations and seeds.


