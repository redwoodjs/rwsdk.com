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

Modern apps earn trust by putting the right guardrails in the right places. For routing, that means keeping authentication and authorization decisions close to the edges where requests first land, expressing policies declaratively, and composing them in small, testable units. In rwsdk, the building block for this is the interruptor: a tiny async function that can short‑circuit a request before it hits your page or action handler.

If you’ve ever scattered permission checks across components or buried them deep in handlers, you’ve felt the pain: rules drift, duplication creeps in, and reviewing access becomes guesswork. By moving these checks to the router with interruptors, policy becomes obvious, local, and easy to reason about—while still staying flexible enough to model roles, permissions, and “least privilege” access.

What follows is a practical blueprint you can lift into your app. We’ll define a couple of foundational interruptors for auth and admin gating, centralize permission helpers, compose them at the router, and shape context once so every check reads from the same source of truth.

Along the way we’ll link to the relevant rwsdk docs so you can dive deeper, and we’ll call out patterns that keep things robust as your surface area grows.

## Interruptors for authentication and admin gating

[Interruptors](https://docs.rwsdk.com/core/routing/#interrupters) are small async functions that run before a route’s handler. If they return a `Response`, rwsdk stops and returns it immediately—perfect for redirects (on unauthenticated access) or 403s (on authorization failures).

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

## Centralized permission helpers

Rather than scattering ad‑hoc string checks everywhere, define a small set of permission utilities once. This keeps rules DRY and reviewable, and lets routes compose richer gatekeeping without repeating logic.

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

## Compose policies at the router

Attach interruptors directly to routes so policy is obvious where it matters most: at the edge. Your router becomes a living map of access rules—easy to scan, easy to test, and hard to bypass.

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

## Shape context once, enforce many times

Populate `ctx.user` once (in auth/session middleware) and let every interruptor rely on it. Centralizing identity and permissions in the request context keeps checks fast, deterministic, and consistent across the app.

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

## Pitfalls and patterns to keep you out of trouble

Avoid hiding permission checks deep in components; keep them at the route edge so they’re unskippable and auditable. Use a broad gate like `requireAdmin` for `/admin/*` and layer fine‑grained `requirePermission` per route for true [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). Co‑locate interruptors and permission helpers under `src/shared/auth/**` to avoid cycles and keep discoverability high. And keep helpers small and deterministic—permission checks should not reach over the network.

If you’re new to composing routes in rwsdk, the router guide is a good companion read: see [Routing](https://docs.rwsdk.com/core/routing/) and, specifically, [Interruptors](https://docs.rwsdk.com/core/routing/#interrupters).

## Wrapping up

Use interruptors to keep auth and permissions declarative at the router. Centralize policy in small helpers like `requirePermission`, then compose per route for clarity, testability, and [least‑privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) access. Your future self—and your security reviews—will thank you.


