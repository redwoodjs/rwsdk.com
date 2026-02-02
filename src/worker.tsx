import { defineApp } from "rwsdk/worker";
import { index, render, route, prefix, layout } from "rwsdk/router";
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

export { SyncedStateServer };

// Server-side state aggregation and activity tracking
SyncedStateServer.registerSetStateHandler(async (key: any, value: any) => {
  if (typeof key === "string" && key.startsWith("user-counter:")) {
    const globalKey = "global-stats";
    const lastKey = `last:${key}`;
    const namespace = (env as any).SYNCED_STATE as DurableObjectNamespace<SyncedStateServer>;

    // We get a stub to the same room (default is "syncedState")
    const stub = namespace.get(namespace.idFromName("syncedState"));

    try {
      // 1. Get previous recorded count for this user and current global stats
      // Since it's the same DO instance, this is quick.
      const [lastCount, globalState] = await Promise.all([
        stub.getState(lastKey),
        stub.getState(globalKey)
      ]);

      const currentCount = value?.count || 0;
      const prevCount = (lastCount as number) || 0;
      const diff = currentCount - prevCount;

      if (diff > 0) {
        const newGlobalState: any = (globalState as any) || {
          count: 1000,
          history: Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 }))
        };

        newGlobalState.count += diff;

        // 2. Update 24-hour activity history
        const currentHour = new Date().getUTCHours();
        if (!newGlobalState.history || newGlobalState.history.length === 0) {
          newGlobalState.history = Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 }));
        }

        const historyItem = newGlobalState.history.find((h: any) => h.hour === currentHour);
        if (historyItem) {
          historyItem.count += diff;
        } else {
          newGlobalState.history.push({ hour: currentHour, count: diff });
          if (newGlobalState.history.length > 24) newGlobalState.history.shift();
        }

        // 3. Persist and broadcast updates
        await Promise.all([
          stub.setState(newGlobalState, globalKey),
          stub.setState(currentCount, lastKey)
        ]);
      }
    } catch (err) {
      console.error("Aggregation Error:", err);
    }
  }
});

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
