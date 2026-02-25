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
import { Talks } from "./app/pages/talks/page";

import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { env } from "cloudflare:workers";

const GLOBAL_STATS_KEY = "global-stats";
const PRESENCE_KEY = "global-presence";
const ACTIVITY_STATS_KEY = "global-activity-stats";
const ACTIVITY_PRESENCE_KEY = "global-activity-presence";

type GlobalStats = {
  count: number;
  history: { hour: number; count: number; date: string }[];
};

type ActivityHourBucket = {
  hourId: number;
  scrollBins: Record<number, number>;
  clickBins: Record<number, number>;
};

type GlobalActivityStats = {
  // Bins representing percentage down the page (0-100)
  scrollBins: Record<number, number>;
  clickBins: Record<number, number>;
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
  private activityBuckets: ActivityHourBucket[] = [];
  private activityWriteTimeout: any = null;

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

    const persistedActivity = await kv.get<{ buckets: ActivityHourBucket[] }>(ACTIVITY_STATS_KEY, "json");
    if (persistedActivity && Array.isArray(persistedActivity.buckets)) {
      this.activityBuckets = persistedActivity.buckets;
      this.recalculateActivityStats();
    }
  }

  override async fetch(request: Request): Promise<Response> {
    await this.ensureInitialized();
    return super.fetch(request);
  }

  private commitActivityStats(stats: GlobalActivityStats) {
    super.setState({
      scrollBins: { ...stats.scrollBins },
      clickBins: { ...stats.clickBins }
    }, ACTIVITY_STATS_KEY);
  }

  private commitActivityPresence(presence: Record<string, number>) {
    super.setState({ ...presence }, ACTIVITY_PRESENCE_KEY);
  }

  // Initialize empty activity stats if missing
  private getOrCreateActivityStats(): GlobalActivityStats {
    const existing = super.getState(ACTIVITY_STATS_KEY) as GlobalActivityStats | undefined;
    if (existing) return existing;
    return {
      scrollBins: {},
      clickBins: {}
    };
  }

  private getOrCreateActivityPresence(): Record<string, number> {
    const existing = super.getState(ACTIVITY_PRESENCE_KEY) as Record<string, number> | undefined;
    if (existing) return existing;
    return {};
  }

  private recalculateActivityStats() {
    const stats = this.getOrCreateActivityStats();

    // clean up deprecated selectionBins
    delete (stats as any).selectionBins;

    stats.scrollBins = {};
    stats.clickBins = {};

    const currentHourId = Math.floor(Date.now() / (1000 * 60 * 60));
    // this.activityBuckets = this.activityBuckets.filter(b => b.hourId >= currentHourId - 24);

    for (const b of this.activityBuckets) {
      for (const [bin, count] of Object.entries(b.scrollBins)) {
        stats.scrollBins[Number(bin)] = (stats.scrollBins[Number(bin)] || 0) + count;
      }
      for (const [bin, count] of Object.entries(b.clickBins)) {
        stats.clickBins[Number(bin)] = (stats.clickBins[Number(bin)] || 0) + count;
      }
    }

    this.commitActivityStats(stats);
  }

  private scheduleActivitySave() {
    if (this.activityWriteTimeout) return;
    this.activityWriteTimeout = setTimeout(() => {
      this.activityWriteTimeout = null;
      const kv = (env as any).SYNCED_STATE_KV as KVNamespace;
      kv.put(ACTIVITY_STATS_KEY, JSON.stringify({ buckets: this.activityBuckets })).catch(err => {
        console.error("[ActivitySyncedStateServer] KV put for ACTIVITY_STATS_KEY failed:", err);
      });
    }, 10000);
  }

  override setState(value: unknown, key: string): void {
    super.setState(value, key);

    if (typeof key !== "string") return;

    if (key.startsWith("user-counter:")) {
      void this.aggregateUserCounter(key, value);
    }

    // Activity Minimap: handle individual user activity streams
    if (key.startsWith("user-activity:")) {
      const userId = key.split(":")[1];
      void this.aggregateUserActivity(userId, value);
    }

    // Heartbeat presence: client calls setHeartbeat({ts}) every 20s.
    // We record the timestamp and recount how many are within 45s.
    if (key.startsWith("user-presence-heartbeat:")) {
      const ts = typeof (value as any)?.ts === "number" ? (value as any).ts : Date.now();
      this.presenceMap.set(key, ts);
      const cutoff = Date.now() - 45_000;
      let active = 0;
      let hasDeletions = false;
      const presence = this.getOrCreateActivityPresence();
      for (const [pKey, seen] of this.presenceMap.entries()) {
        if (seen > cutoff) {
          active++;
        } else {
          // Cleanup stale active viewports
          const staleUserId = pKey.split(":")[1];
          if (staleUserId) {
            if (presence[staleUserId] !== undefined) {
              delete presence[staleUserId];
              hasDeletions = true;
            }
          }
        }
      }
      if (hasDeletions) {
        this.commitActivityPresence(presence);
      }
      super.setState(active, PRESENCE_KEY);
    }
  }

  private async aggregateUserActivity(userId: string, value: unknown) {
    if (!userId || !value || typeof value !== "object") return;

    const delta = value as any;
    let updatedViewports = false;
    let updatedBuckets = false;

    if (typeof delta.scrollPercent === "number") {
      const presence = this.getOrCreateActivityPresence();
      presence[userId] = delta.scrollPercent;
      this.commitActivityPresence(presence);
      updatedViewports = true;
    } else if (delta.disconnected === true) {
      const presence = this.getOrCreateActivityPresence();
      if (presence[userId] !== undefined) {
        delete presence[userId];
        this.commitActivityPresence(presence);
      }
      return; // Stop processing stats logging if they just disconnected
    }

    const currentHourId = Math.floor(Date.now() / (1000 * 60 * 60));
    let currentBucket = this.activityBuckets.find(b => b.hourId === currentHourId);
    if (!currentBucket) {
      currentBucket = { hourId: currentHourId, scrollBins: {}, clickBins: {} };
      this.activityBuckets.push(currentBucket);
      updatedBuckets = true;
    }

    if (typeof delta.scrollPercent === "number") {
      const bin = Math.floor(delta.scrollPercent);
      currentBucket.scrollBins[bin] = (currentBucket.scrollBins[bin] || 0) + 1;
      updatedBuckets = true;
    }

    if (Array.isArray(delta.clicks)) {
      for (const pct of delta.clicks) {
        if (typeof pct === "number") {
          const bin = Math.floor(pct);
          currentBucket.clickBins[bin] = (currentBucket.clickBins[bin] || 0) + 1;
          updatedBuckets = true;
        }
      }
    }

    if (updatedBuckets) {
      this.recalculateActivityStats();
      this.scheduleActivitySave();
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
      route("/talks", Talks),
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
