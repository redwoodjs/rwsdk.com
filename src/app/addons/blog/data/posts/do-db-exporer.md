---
title: "Explore Your Durable Object SQLite DB with RedwoodSDK"
description: "How to build a simple DO SQLite Explorer with RedwoodSDK — browse schema, view rows, edit, insert and AI-seed data."
date: "2025-09-08"
author:
  id: "herman"
heroImage: "1a0a818f-5622-45df-cc35-2b879249b500"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/61ed8d85-22b1-496a-770b-f16d8370d900/public"
tags: ["redwoodsdk", "durable-objects", "sqlite", "fullstack"]
---

# Explore Your Durable Object SQLite DB with RedwoodSDK

_Need to peek inside your [Durable Object](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/) SQLite database? This mini app lets you browse tables, view and edit rows, insert new records, and even seed data with AI — all in one coherent RedwoodSDK project._

---

## The Problem

When you’re iterating on a [Durable Object](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/) (DO) backing a SQLite database, it’s cumbersome to:

1. Inspect tables and row counts
2. Read and normalize row data for display
3. Perform quick CRUD operations
4. Seed realistic data for development

You want this without spinning up extra services, and you want it to run the same on localhost and in production.

---

## The Approach

Using RedwoodSDK’s full-stack primitives, we built a simple explorer that:

- **Hard-codes the DO binding and DB key** for simplicity
- **Lists tables** from `sqlite_master`
- **Displays normalized rows** for quick readability
- **Supports edit, insert, delete**
- **Discovers FK-like references** from the CREATE TABLE statement
- **Seeds tables using Workers AI**, coercing types to match the schema

All in a single Worker, with straightforward routes and React Server Components.

---

Full source code: [redwoodjs/sdk-experiments › do-db-explorer](https://github.com/redwoodjs/sdk-experiments/tree/main/do-db-explorer)

## Key Files and Concepts

### Routing (single Worker)

We keep routing minimal: the homepage and a table slug, and add a middleware to interrupt requests in non-local environments to avoid exposing the explorer.

```ts
// src/worker.tsx
export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // middleware interruptor to stop the request if not localhost
    isLocalhost();
    ctx;
  },
  render(Document, [
    route("/", Home),
    route("/:table", Home),
  ]),
]);
```

The `isLocalhost` middleware short-circuits non-local requests so the table viewer only appears on localhost.

### Reading the `:table` param in `Home`

We read the `:table` route param from `params` and validate it against discovered tables. If the param is missing or invalid, we fallback to the first available table.

```ts
// src/app/pages/Home.tsx (excerpt)
"use server";

export async function Home({ params }: { params: { table: string } }) {
  const table = params.table;
  const selectedTable: string | undefined = table;

  // Discover tables
  const masterRows = await (db as any)
    .selectFrom("sqlite_master")
    .selectAll()
    .execute();
  const tableNames = masterRows
    .filter((r: any) => r.type === "table" && typeof r.name === "string" && !r.name.startsWith("sqlite_"))
    .map((r: any) => r.name as string)
    .sort((a: string, b: string) => a.localeCompare(b));

  const activeTable =
    selectedTable && tableNames.includes(selectedTable) ? selectedTable : tableNames[0];

  // ...
}
```

### Hard-coded binding + DB key

The explorer uses a single Durable Object binding and database key defined in `src/db/db.ts` for simplicity.

```ts
// src/db/db.ts
import { env } from "cloudflare:workers";
import { type Database, createDb } from "rwsdk/db";
import { type migrations } from "@/db/migrations";

export type AppDatabase = Database<typeof migrations>;
export const db = createDb<AppDatabase>(env.APP_DURABLE_OBJECT, "main-database");
```

### Opening the DB from a Durable Object

We define a Durable Object class that applies migrations, and the app connects via the `db` instance above.

```ts
// src/db/durableObject.ts
import { SqliteDurableObject } from "rwsdk/db";
import { migrations } from "@/db/migrations";

export class AppDurableObject extends SqliteDurableObject {
  migrations = migrations;
}
```

For background and API details, see the RedwoodSDK Database (Durable Objects) docs: [Database (Durable Objects)](https://docs.rwsdk.com/core/database-do/).

And the DO is declared in `wrangler.jsonc`:

```json
{
  "durable_objects": {
    "bindings": [
      { "name": "APP_DURABLE_OBJECT", "class_name": "AppDurableObject" }
    ]
  },
  "ai": { "binding": "AI" },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["AppDurableObject"] }
  ]
}
```

Refer to Cloudflare’s docs for configuration and schema changes: [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) and [Migrations](https://developers.cloudflare.com/workers/wrangler/migrations/).

### Table discovery and normalized rows

We introspect `sqlite_master`, parse a table’s CREATE statement for columns, and normalize values to strings for reliable rendering.

```ts
// src/app/pages/Home.tsx (excerpt)
const masterRows = await (db as any)
  .selectFrom("sqlite_master")
  .selectAll()
  .execute();

const tableNames = masterRows
  .filter((r: any) => r.type === "table" && typeof r.name === "string" && !r.name.startsWith("sqlite_"))
  .map((r: any) => r.name as string)
  .sort((a, b) => a.localeCompare(b));

// Normalize row values
if (rows.length > 0 && columns.length > 0) {
  rows = rows.map((row: any) => {
    const out: Record<string, string> = {};
    for (const key of columns) {
      const value = row[key];
      out[key] = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
    }
    return out;
  });
}
```

### Quick CRUD helpers

Server actions power insert/update/delete with basic table checks:

```ts
// src/app/pages/functions.ts (excerpt)
export async function insertRow(tableName: string, row: Record<string, string>) {
  const adb: any = db;
  const masterRows = await adb.selectFrom("sqlite_master").selectAll().execute();
  const table = masterRows.find((r: any) => r.name === tableName);
  if (!table) throw new Error(`Table ${tableName} not found`);
  await adb.insertInto(tableName as any).values(row).execute();
}
```

### Schema-aware reference options

We parse the CREATE statement to derive simple reference options for foreign-key-like columns and show picklists.

```ts
// src/app/pages/functions.ts (excerpt)
export async function listRefOptions(tableName: string, columnName: string) {
  const adb: any = db;
  const masterRows = await adb.selectFrom("sqlite_master").selectAll().execute();
  const table = masterRows.find((r: any) => r.name === tableName);
  if (!table) return [];

  const { extractColumnsFromCreate } = await import("@/utils/schema");
  const schema = extractColumnsFromCreate(table.sql || "");
  const col = schema.find((c: any) => c.name === columnName);
  const ref = col?.references;
  if (!ref?.table) return [];

  const targetColumn = ref.column || "id";
  try {
    const rows = await adb.selectFrom(ref.table).select([targetColumn]).execute();
    return rows.map((r: any) => String(r[targetColumn]));
  } catch {
    return [];
  }
}
```

### One-click AI seeding (Workers AI)

For rapid iteration, we seed with Workers AI and then coerce types to match the SQLite schema.

```ts
// src/app/pages/functions.ts (excerpt)
// @ts-ignore
const ai = env.AI;
const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
  prompt: `Generate 10 rows for table ...`,
  max_tokens: 4000,
  temperature: 0.2,
});

// Coerce text columns to strings, validate NOT NULLs, then insert
await adb.deleteFrom(tableName as any).execute();
await adb.insertInto(tableName as any).values(coercedData).execute();
```

---

## UX Notes

- Left-hand nav lists tables with row counts
- Clicking a table navigates to `/:table`
- Inline editing for quick tweaks
- Insert row form appears at the bottom of the table
- A seed button refreshes the table with AI-generated data

---

## Why RedwoodSDK

RedwoodSDK keeps everything — routes, server logic, durable objects, and UI — in one cohesive codebase. You get the full Request/Response control, dev ergonomics, and production readiness without juggling multiple services.

Learn more in the official docs: [Database (Durable Objects)](https://docs.rwsdk.com/core/database-do/). Also see Cloudflare Durable Objects docs: [Overview](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/), [Storage](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/storage/), and [Alarms](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/alarms/).

---

## Build on this base

This explorer is intentionally minimal so you can fork it and evolve it to fit your workflow:

- Add authentication and role-based access for production safety
- Support multiple DO bindings and switch between them at runtime
- Add filtering, sorting, and pagination for large tables
- Show CREATE TABLE DDL and inferred relationships in a schema view
- Import/export CSV or JSON snapshots
- Add per-column editors (date pickers, JSON editors) and validation

It’s a solid foundation for internal tooling — clone it and make it yours.

---

## Next Steps

- Add filtering, pagination, and sorting
- Switch between multiple DOs (toggle bindings) when needed
- Export/import table data snapshots
- Guard sensitive actions in production

---

## Cloudflare Durable Objects: References

- **Overview**: https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
- **Storage API**: https://developers.cloudflare.com/workers/runtime-apis/durable-objects/storage/
- **Alarms**: https://developers.cloudflare.com/workers/runtime-apis/durable-objects/alarms/
- **Wrangler configuration**: https://developers.cloudflare.com/workers/wrangler/configuration/
- **Wrangler migrations**: https://developers.cloudflare.com/workers/wrangler/migrations/

Happy exploring!