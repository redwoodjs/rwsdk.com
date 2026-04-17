import { RouteMiddleware } from "rwsdk/router";
import { homeMarkdown } from "./home.md";

/**
 * Per-path markdown bodies returned when an agent sends `Accept: text/markdown`.
 * Keep the keys aligned with the router so additions stay discoverable.
 */
const MARKDOWN_RESPONSES: Record<string, string> = {
  "/": homeMarkdown,
};

/**
 * Agent-facing Link header emitted on the homepage (RFC 8288).
 * Surfaces the well-known agent-discovery endpoints without requiring the
 * agent to guess paths or parse HTML.
 */
const HOME_LINK_HEADER = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `<https://docs.rwsdk.com>; rel="service-doc"; type="text/html"`,
  `</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"`,
  `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
].join(", ");

/**
 * Content-negotiate HTML vs Markdown for agent clients.
 *
 * When the request's `Accept` header includes `text/markdown`, return a
 * hand-authored markdown body for the path (if we have one) and short-circuit
 * routing. Browsers don't send `text/markdown`, so they keep getting HTML.
 *
 * Responses set `Vary: Accept` so intermediaries cache HTML and markdown
 * separately, and `x-markdown-tokens` as a coarse-grained token hint for
 * agents sizing context windows.
 *
 * See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
export const markdownForAgents = (): RouteMiddleware => ({ request }) => {
  const accept = request.headers.get("Accept") ?? "";
  if (!accept.toLowerCase().includes("text/markdown")) return;

  const url = new URL(request.url);
  const body = MARKDOWN_RESPONSES[url.pathname];
  if (!body) return;

  // Rough token estimate: ~4 chars per token. Good enough as a hint for agents
  // that want to size context before fetching.
  const tokenEstimate = Math.ceil(body.length / 4);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "x-markdown-tokens": String(tokenEstimate),
      "Cache-Control": "public, max-age=300",
    },
  });
};

/**
 * Attach `Link` and `Vary` headers on the homepage so agents can discover
 * supporting resources (api-catalog, docs, sitemap, skills index) without
 * parsing HTML, and so caches key HTML vs markdown responses separately.
 */
export const setAgentDiscoveryHeaders = (): RouteMiddleware => ({ request, response }) => {
  const url = new URL(request.url);
  if (url.pathname !== "/") return;

  response.headers.set("Link", HOME_LINK_HEADER);

  // We content-negotiate on Accept for `/` (markdown vs HTML), so advertise it.
  const existingVary = response.headers.get("Vary");
  response.headers.set(
    "Vary",
    existingVary ? `${existingVary}, Accept` : "Accept",
  );
};
