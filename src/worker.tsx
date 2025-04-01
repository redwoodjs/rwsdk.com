import { defineApp } from "@redwoodjs/sdk/worker";
import { index, document, route } from "@redwoodjs/sdk/router";
import { Document } from "src/Document";
import Home from "src/pages/Home";
import { setCommonHeaders } from "src/headers";
import sitemap from "./sitemap";
import PersonalSoftware, { meta as personalSoftwareMeta } from "src/pages/readme/PersonalSoftware";

type Context = {};

export default defineApp<Context>([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  document((props) => <Document {...props} />, [
    index([() => <Home />]),
    route("/personal-software", [() => <Document meta={personalSoftwareMeta}><PersonalSoftware /></Document>]),
    route("/docs", async () => {
      return new Response(null, {
        status: 301,
        headers: {
          "Location": "https://docs.rwsdk.com",
        },
      });
    }),
    route("/docs/getting-started/quick-start/", async () => {
      return new Response(null, {
        status: 301,
        headers: {
          "Location": "https://docs.rwsdk.com/getting-started/quick-start/",
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
  ]),
]);
