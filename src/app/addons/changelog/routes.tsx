import { route } from "rwsdk/router";

import { fetchReleases } from "./githubApi";
import { ReleaseDetail } from "./components/ReleaseDetail";

export const changelogRoutes = [
  route("/", async function () {
    let releaseKeys = await fetchReleases("redwoodjs/sdk");

    return (
      <div className="max-w-4xl mx-auto">
        <title>Changelog — RedwoodSDK</title>
        <h1 className="text-4xl font-bold py-10 border-b-amber-800 border-b mb-16">
          Changelog
        </h1>

        {releaseKeys.map((key) => (
          <div key={key}>
            <ReleaseDetail cacheKey={key} />
          </div>
        ))}
      </div>
    );
  }),
];
