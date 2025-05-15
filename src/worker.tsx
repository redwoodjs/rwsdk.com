import { defineApp } from "rwsdk/worker";
import { index, render, route, prefix } from "rwsdk/router";
import { Document } from "src/Document";
import Home from "src/pages/Home";
import { setCommonHeaders } from "src/headers";
import sitemap from "./sitemap";
import PersonalSoftware from "src/pages/readme/PersonalSoftware";
import { blogRoutes } from "src/pages/blog/routes";
import { notFound } from "src/utils/notFound";
import { addonChangelog } from "src/addons/changelog/routes";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),

  render(Document, [
    index([Home]),
    route("/personal-software", [PersonalSoftware]),
    prefix("/blog", blogRoutes),

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
        Disallow: /search
        Sitemap: https://rwsdk.com/sitemap.xml`;

      return new Response(robotsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }),
    addonChangelog({ routePrefix: "/changelog" }),
    route("*", async () => {
      return notFound();
    }),
  ]),
]);
