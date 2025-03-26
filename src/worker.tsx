import { defineApp } from "@redwoodjs/sdk/worker";
import { index, layout, route } from "@redwoodjs/sdk/router";
import { Document } from "src/Document";
import Home from "src/pages/Home";
import { setCommonHeaders } from "src/headers";
import sitemap from "./sitemap";

type Context = {};

export default defineApp<Context>([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  layout(Document, [
    index([Home]),
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
  ]),
]);
