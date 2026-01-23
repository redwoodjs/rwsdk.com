import { env } from "cloudflare:workers";

import { type GitHubRelease } from "../types";
import { LocalizedDate } from "./localized-date";

export const UserInfo = ({ author }: { author: GitHubRelease["author"] }) => {
  return (
    <div className="flex gap-2 mt-4 items-center">
      <img
        src={author.avatar_url}
        alt={author.login}
        className="rounded-full w-7 h-7 "
      />
      {author.login}
    </div>
  );
};

export const ReleaseDetail = async ({ cacheKey }: { cacheKey: string }) => {
  const release = await env.KV_ADDON_CHANGELOG.get<GitHubRelease>(cacheKey, {
    type: "json",
  });

  if (!release) {
    return <div>Release not found</div>;
  }

  return (
    <div key={release.id} className="flex flex-row text-sm gap-8 relative">
      <div className="flex-1/6 text-xs">
        <LocalizedDate date={release.created_at} className="text-gray-800" />
        <UserInfo author={release.author} />
      </div>

      <div className="flex-5/6 mb-16">
        <h2 className="mb-8 font-bold text-3xl">{release.name}</h2>

        <div
          dangerouslySetInnerHTML={{ __html: release.body }}
          className="max-w-2xl prose"
        />
      </div>
    </div>
  );
};
