---
title: "Route‑level permissions with rwsdk interruptors: a practical blueprint"
description: "Compose authentication, roles, and fine‑grained permissions at the router using rwsdk interruptors."
date: "2025-11-15"
author:
  id: "herman"
heroImage: "23d39d12-d5f9-40ff-c295-827142555900"
ogImage: "https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/223152b9-88ac-43c1-ab59-4305e4212700/public"
tags: ["rwsdk", "auth", "permissions", "interruptors", "routing"]
---

# Route‑level permissions with rwsdk interruptors: a practical blueprint

## Goals

- Keep auth and authorization close to routing
- Make policies composable and testable
- Express permissions declaratively, not hidden in components

## Building blocks

 - [Interruptors](https://docs.rwsdk.com/core/routing/#interrupters): small async functions that run before a route handler; return a Response to short‑circuit.
- Permission helpers: `can`, `cannot`, `requirePermission` utilities to centralize policy.

## 1) [Interruptors](https://docs.rwsdk.com/core/routing/#interrupters) for authentication and admin gating

```ts
// src/shared/auth/interruptors.ts
import type { RequestInfo } from 'rwsdk/worker'

export async function requireAuth({ ctx }: RequestInfo) {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/auth/login' },
    })
  }
}

export async function requireAdmin({ ctx }: RequestInfo) {
  const isAdmin = !!ctx.user && Array.isArray(ctx.user.roles) && ctx.user.roles.includes('admin')
  if (!isAdmin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
}
```

## 2) Centralized permission helpers

```ts
// src/shared/auth/permissions.ts
import type { RequestInfo } from 'rwsdk/worker'

export type Permission =
  | 'account:read'
  | 'account:write'
  | 'user:read'
  | 'user:delete'

export function can(ctx: any, permission: Permission): boolean {
  const perms: string[] = ctx.user?.permissions ?? []
  return perms.includes(permission)
}

export function cannot(ctx: any, permission: Permission): boolean {
  return !can(ctx, permission)
}

export function requirePermission(permission: Permission) {
  return async function requirePermissionInterruptor({ ctx }: RequestInfo) {
    if (cannot(ctx, permission)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }
  }
}

export function requireAnyPermission(...permissions: Permission[]) {
  return async function requireAny({ ctx }: RequestInfo) {
    const ok = permissions.some((p) => can(ctx, p))
    if (!ok) return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
}

export function requireAllPermissions(...permissions: Permission[]) {
  return async function requireAll({ ctx }: RequestInfo) {
    const ok = permissions.every((p) => can(ctx, p))
    if (!ok) return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
}
```

## 3) Route‑level composition at the router

Attach interruptors directly to routes so policy is obvious and local.

```ts
// src/app/pages/accounts/routes.ts
import { route } from 'rwsdk/router'
import { requireAuth } from 'src/shared/auth/interruptors'
import { requirePermission } from 'src/shared/auth/permissions'
import AccountsPage from './AccountsPage'

export default [
  route('/accounts', [requireAuth, requirePermission('account:read'), AccountsPage]),
]
```

```ts
// src/admin/pages/users/routes.ts
import { route } from 'rwsdk/router'
import { requireAdmin } from 'src/shared/auth/interruptors'
import { requirePermission } from 'src/shared/auth/permissions'
import UsersPage from './UsersPage'
import DeleteUserAction from './DeleteUserAction'

export default [
  route('/admin/users', [requireAdmin, requirePermission('user:read'), UsersPage]),
  route('/admin/users/:id/delete', [requireAdmin, requirePermission('user:delete'), DeleteUserAction]),
]
```

## 4) Shaping context once, enforcing policies many times

Populate `ctx.user` once (auth/session middleware), then rely on it in interruptors:

```ts
// worker.tsx (excerpt)
export default defineApp([
  async ({ ctx, request }) => {
    // Example: load session and user once
    const session = await sessions.load(request)
    if (session?.user) ctx.user = session.user
  },
  // ...render routes...
])
```

## 5) Pitfalls and patterns

- Don’t hide permission checks deep in components; keep them at the route edge.
- Prefer `requireAdmin` at `/admin/*` and fine‑grained `requirePermission` per route.
- Co‑locate interruptors/permissions under `src/shared/auth/**` to avoid cycles.
- Keep helpers small and deterministic; avoid reading from the network inside permission checks.

## TL;DR

Use interruptors to keep auth and permissions declarative at the router. Centralize policy in helpers like `requirePermission`, then compose per route for clarity, testability, and least‑privilege.


