import { prefix, route } from "rwsdk/router";
import { env } from "cloudflare:workers";

import { LocalizedDate } from "./components/LocalizedDate";

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

interface GitHubReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface GitHubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: GitHubUser;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: any[]; // You might want to type this more specifically if needed
  tarball_url: string;
  zipball_url: string;
  body: string;
  reactions: GitHubReactions;
  mentions_count: number;
}

import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

async function fetchLatestRelease() {
  if (await env.KV_ADDON_CHANGELOG.get("lastUpdate")) {
    return await env.KV_ADDON_CHANGELOG.get<GitHubRelease>("releases", {
      type: "json",
    });
  }

  const response = await fetch(
    "https://api.github.com/repos/redwoodjs/sdk/releases/latest",
    {
      headers: {
        "User-Agent": "RedwoodSDK",
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json<GitHubRelease>();
  await env.KV_ADDON_CHANGELOG.put("lastUpdate", new Date().toISOString());
  data.body = await marked(data.body);
  await env.KV_ADDON_CHANGELOG.put("releases", JSON.stringify(data));
  return data;
}

export function addonChangelog({ routePrefix }: { routePrefix: string }) {
  return prefix(routePrefix, [
    route("/", async function () {
      let release = await fetchLatestRelease();

      if (!release) {
        return <div>No release found</div>;
      }

      return (
        <div>
          <h1 className="text-2xl font-bold">Changelog</h1>
          <div key={release.id} className="flex items-center gap-2">
            <div>
              <h2>{release.name}</h2>
              <LocalizedDate date={release.created_at} />
              <div className="flex items-center gap-2">
                <img
                  src={release.author.avatar_url}
                  alt={release.author.login}
                  className="rounded-full w-7 h-7"
                />
                {release.author.login}
              </div>
            </div>
          </div>

          <div>
            <div dangerouslySetInnerHTML={{ __html: release.body }} />
          </div>
        </div>
      );
    }),
  ]);
}
