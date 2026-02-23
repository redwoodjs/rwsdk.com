import { defineApp } from "rwsdk/worker";
import { render, route, prefix, layout } from "rwsdk/router";
import { Document } from "src/document";
import Home from "src/pages/home/page";
import { setCommonHeaders } from "src/headers";
import sitemap from "./sitemap";
import PersonalSoftware from "src/pages/readme/personal-software/page";
import { notFound } from "src/utils/notFound";

import { changelogRoutes } from "src/addons/changelog/routes";
import { blogRoutes } from "./app/addons/blog";
import StartPage from "./app/pages/start/page";
import Layout from "./app/components/layout";

import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { env } from "cloudflare:workers";

const GLOBAL_STATS_KEY = "global-stats";
const PRESENCE_KEY = "global-presence";

type GlobalStats = {
  count: number;
  history: { hour: number; count: number; date: string }[];
};

/**
 * Extends the base SyncedStateServer Durable Object to add:
 * - KV-backed persistence for global stats (survives DO restarts).
 * - Expiring 24h activity history (per-hour buckets reset each new day).
 * - Real-time presence tracking via WebSocket connection counting.
 */
export class ActivitySyncedStateServer extends SyncedStateServer {
  /** Tracks last-seen timestamp per userId for heartbeat presence. */
  private presenceMap = new Map<string, number>();
  private initialized = false;

  /** Hydrate in-memory state from KV before serving the first request. */
  private async ensureInitialized() {
    if (this.initialized) return;
    this.initialized = true;
    const kv = (env as any).SYNCED_STATE_KV as KVNamespace;
    const persisted = await kv.get<GlobalStats>(GLOBAL_STATS_KEY, "json");
    if (persisted) {
      // Normalize: old KV data may be missing the `date` field; adding it
      // prevents the expiry check from resetting every bucket on first write.
      if (Array.isArray(persisted.history)) {
        persisted.history = persisted.history.map((h) => ({
          ...h,
          date: (h as any).date ?? "",
        })) as GlobalStats["history"];
      }
      super.setState(persisted, GLOBAL_STATS_KEY);
    }
  }

  override async fetch(request: Request): Promise<Response> {
    await this.ensureInitialized();
    return super.fetch(request);
  }

  override setState(value: unknown, key: string): void {
    super.setState(value, key);

    if (typeof key !== "string") return;

    if (key.startsWith("user-counter:")) {
      void this.aggregateUserCounter(key, value);
    }

    // Heartbeat presence: client calls setHeartbeat({ts}) every 20s.
    // We record the timestamp and recount how many are within 45s.
    if (key.startsWith("user-presence-heartbeat:")) {
      const ts = typeof (value as any)?.ts === "number" ? (value as any).ts : Date.now();
      this.presenceMap.set(key, ts);
      const cutoff = Date.now() - 45_000;
      let active = 0;
      for (const seen of this.presenceMap.values()) {
        if (seen > cutoff) active++;
      }
      super.setState(active, PRESENCE_KEY);
    }
  }

  private async aggregateUserCounter(userKey: string, value: unknown) {
    const lastKey = `last:${userKey}`;
    const currentCount = typeof (value as any)?.count === "number" ? (value as any).count : 0;
    const prevCount = (super.getState(lastKey) as number) ?? 0;
    const diff = currentCount - prevCount;

    console.log(`[Activity] key=${userKey} current=${currentCount} prev=${prevCount} diff=${diff}`);

    if (diff <= 0) return;

    super.setState(currentCount, lastKey);

    const existing = super.getState(GLOBAL_STATS_KEY) as GlobalStats | undefined;

    // Deep-copy history items so we don't mutate the stored references
    const newGlobal: GlobalStats = {
      count: (existing?.count ?? 0) + diff,
      history: existing?.history
        ? existing.history.map((h) => ({ ...h }))
        : Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0, date: "" })),
    };

    // Update the hourly bucket — reset count if we're on a new UTC day
    const nowDate = new Date().toISOString().slice(0, 10);
    const currentHour = new Date().getUTCHours();
    const bucket = newGlobal.history.find((h) => h.hour === currentHour);
    if (bucket) {
      if (bucket.date !== nowDate) {
        bucket.count = 0;
        bucket.date = nowDate;
      }
      bucket.count += diff;
    }

    console.log(`[Activity] global count=${newGlobal.count} hour=${currentHour} bucket=${bucket?.count}`);

    super.setState(newGlobal, GLOBAL_STATS_KEY);

    // Persist to KV
    try {
      const kv = (env as any).SYNCED_STATE_KV as KVNamespace;
      await kv.put(GLOBAL_STATS_KEY, JSON.stringify(newGlobal));
    } catch (err) {
      console.error("[ActivitySyncedStateServer] KV put failed:", err);
    }
  }
}

export { SyncedStateServer };

export default defineApp([
  setCommonHeaders(),

  ...syncedStateRoutes((env: any) => env.SYNCED_STATE),

  render(Document, [
    ...layout(Layout, [
      route("/", Home),
      route("/personal-software", PersonalSoftware),
      prefix("/blog", blogRoutes),
    ]),

    route("/start", StartPage),

    route("/docs", async () => {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "https://docs.rwsdk.com",
        },
      });
    }),

    route("/docs/getting-started/quick-start/", async () => {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "https://docs.rwsdk.com/getting-started/quick-start/",
        },
      });
    }),
    route("/sitemap.xml", async () => {
      // this should become an addon, and it should take other sitemaps as inputs and merge them together
      return new Response(sitemap, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    }),
    route("/robots.txt", async () => {
      const robotsTxt = `User-agent: *
        Allow: /
        Disallow: /start
        Sitemap: https://rwsdk.com/sitemap.xml`;

      return new Response(robotsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }),

    prefix("/changelog", changelogRoutes),

    route("*", async () => {
      return notFound();
    }),
  ]),
]);
