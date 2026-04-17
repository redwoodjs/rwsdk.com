/**
 * Handlers for the various `/.well-known/*` endpoints that advertise
 * agent-discovery metadata. Each handler returns a plain `Response` so the
 * router can mount them directly.
 */

const ORIGIN = "https://rwsdk.com";
const DOCS = "https://docs.rwsdk.com";

/**
 * RFC 9727 API Catalog — application/linkset+json.
 *
 * RedwoodSDK is a framework, not a hosted API, so the catalog currently
 * surfaces the documentation site as the primary service. If/when rwsdk.com
 * grows hosted APIs (e.g. the realtime endpoint) add new linkset entries with
 * `service-desc` (OpenAPI) alongside `service-doc` and `status`.
 */
export const apiCatalog = async () => {
  const body = {
    linkset: [
      {
        anchor: `${ORIGIN}/`,
        "service-doc": [
          {
            href: `${DOCS}/`,
            type: "text/html",
            hreflang: ["en"],
            title: "RedwoodSDK documentation",
          },
        ],
        status: [
          {
            href: `${ORIGIN}/`,
            type: "text/html",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

/**
 * Agent Skills Discovery index (https://agentskills.io, v0.2.0).
 *
 * We don't ship any skills yet — publishing the empty index still satisfies
 * discovery, and consumers can watch this URL rather than guessing whether
 * skills exist. Populate `skills[]` as we author them.
 */
export const agentSkillsIndex = async () => {
  const body = {
    $schema: "https://agentskills.io/schema/v0.2.0.json",
    version: "0.2.0",
    skills: [] as Array<{
      name: string;
      type: string;
      description: string;
      url: string;
      sha256: string;
    }>,
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
