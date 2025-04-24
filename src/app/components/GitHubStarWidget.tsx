import Constants from 'src/lib/Constants';
import { env } from "cloudflare:workers";

interface GitHubRepoData {
  stargazers_count: number;
}

interface GitHubError {
  message: string;
}

export async function GitHubStarWidget() {
  let starCount: number | null = null;
  let error: string | null = null;
  const startTime = Date.now();

  try {
    const headers: HeadersInit = {
      'User-Agent': 'RedwoodSDK',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    const githubToken = env.VITE_GITHUB_TOKEN;
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    console.log(githubToken);

    const response = await fetch('https://api.github.com/repos/redwoodjs/sdk', {
      method: 'GET',
      headers,
      cf: {
        cacheTtl: 14400, // Cache for 4 hours
        cacheEverything: true
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as GitHubError | null;
      const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
      
      if (response.status === 403 && errorMessage.includes('rate limit')) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      
      throw new Error(errorMessage);
    }
    
    const data: GitHubRepoData = await response.json();
    starCount = data.stargazers_count;
    
    // Log the response time
    console.log(`GitHub API call took ${Date.now() - startTime}ms`);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error('GitHub API Error:', err);
  }

  return (
    <div className="flex items-center gap-2">
      <a className="hidden sm:block" href={Constants.GITHUB_REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a
        href="https://github.com/redwoodjs/sdk"
        target="_blank"
        rel="noopener noreferrer"
        className="github-start inline-flex items-center gap-2 px-1 border-2 border-black text-black leading-none transition-colors font-jersey h-[24px]"
      >
        <svg
          id="github-star"
          data-name="Github Star"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16.524"
          height="15.715"
          viewBox="0 0 16.524 15.715"
        >
          <path
            d="M8.262.443,10.6,5.178l5.227.764L12.044,9.626l.893,5.2L8.262,12.372,3.587,14.831l.893-5.2L.7,5.942l5.227-.764Z"
            fill="none"
            stroke="#1b1b1b"
            strokeLinecap="square"
            strokeLinejoin="bevel"
            strokeWidth="2"
            className="hover:fill-orange"
          />
        </svg>
        <span className="font-jersey">
          {error ? 'Error' : starCount === null ? '...' : starCount.toLocaleString()}
        </span>
      </a>
    </div>
  );
} 