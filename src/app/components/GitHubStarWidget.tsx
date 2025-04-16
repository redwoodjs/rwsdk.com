import Constants from 'src/lib/Constants';

interface GitHubRepoData {
  stargazers_count: number;
}

export const GitHubStarWidget = async () => {
  let starCount: number | null = null;
  let error: string | null = null;

  try {
    const response = await fetch('https://api.github.com/repos/redwoodjs/sdk', {
      headers: {
        'User-Agent': 'RedwoodSDK',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch star count');
    }
    
    const data: GitHubRepoData = await response.json();
    starCount = data.stargazers_count;
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error(err);
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
          {error ? 'Error' : `${starCount?.toLocaleString()}`}
        </span>
      </a>
    </div>
  );
}; 