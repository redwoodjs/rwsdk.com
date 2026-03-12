import { SEO } from "src/components/seo";
import { Section } from "src/components/section";
import {
  featuredContributors,
  allContributors,
  type Contributor,
} from "src/data/contributors";

function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <a
      href={contributor.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 dark:bg-dark-panel border border-zinc-200/60 dark:border-dark-border hover:border-[#4a2b1f] dark:hover:border-dark-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <img
        src={contributor.avatarUrl}
        alt={contributor.login}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full ring-2 ring-zinc-200/60 dark:ring-dark-border group-hover:ring-[#4a2b1f] dark:group-hover:ring-dark-accent/50 transition-all duration-300"
        loading="lazy"
      />
      <span className="font-medium text-sm text-zinc-800 dark:text-dark-primary group-hover:text-[#4a2b1f] dark:group-hover:text-dark-accent transition-colors">
        {contributor.login}
      </span>
      <span className="font-mono text-xs text-zinc-400 dark:text-dark-secondary/70">
        {contributor.contributions}{" "}
        {contributor.contributions === 1 ? "contribution" : "contributions"}
      </span>
    </a>
  );
}

function FeaturedContributorCard({
  contributor,
}: {
  contributor: Contributor;
}) {
  return (
    <a
      href={contributor.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-[#2b1810] dark:bg-dark-panel border border-[#4a2b1f] dark:border-dark-border hover:border-dark-accent/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <img
        src={contributor.avatarUrl}
        alt={contributor.login}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full ring-3 ring-[#4a2b1f] dark:ring-dark-border group-hover:ring-dark-accent/60 transition-all duration-300"
        loading="lazy"
      />
      <span className="font-serif text-xl font-medium text-dark-primary group-hover:text-dark-accent transition-colors">
        {contributor.login}
      </span>
      <span className="font-mono text-xs text-dark-secondary/70 tracking-wide">
        {contributor.contributions.toLocaleString()} contributions
      </span>
    </a>
  );
}

export default function ContributorsPage() {
  const totalContributions = [
    ...featuredContributors,
    ...allContributors,
  ].reduce((sum, c) => sum + c.contributions, 0);

  return (
    <div>
      <SEO
        title="Contributors | RedwoodSDK"
        description="Meet the people who build RedwoodSDK. Thank you to every contributor who has helped shape this framework."
        ogUrl="https://rwsdk.com/contributors"
        ogImageAlt="RedwoodSDK Contributors"
      />

      {/* Hero */}
      <Section className="relative max-w-5xl mx-auto px-6 pt-12 md:pt-32 pb-16 border-none !mt-0">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[0.95] text-zinc-900 dark:text-dark-primary">
            Built by{" "}
            <span className="italic font-light text-[#4a2b1f] dark:text-[#d4b8a8]">
              humans
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-500 dark:text-dark-secondary max-w-2xl mx-auto leading-relaxed font-light">
            RedwoodSDK exists because of the contributions of{" "}
            <span className="font-medium text-zinc-700 dark:text-dark-primary">
              {featuredContributors.length + allContributors.length} people
            </span>{" "}
            who have collectively made{" "}
            <span className="font-medium text-zinc-700 dark:text-dark-primary">
              {totalContributions.toLocaleString()} contributions
            </span>{" "}
            across the RedwoodSDK and GraphQL repos.
          </p>
        </div>
      </Section>

      {/* Featured founders */}
      <Section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredContributors.map((contributor) => (
            <FeaturedContributorCard
              key={contributor.login}
              contributor={contributor}
            />
          ))}
        </div>
      </Section>

      {/* All contributors */}
      <Section className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-3xl md:text-4xl mb-4 font-medium tracking-tight text-center">
          Contributors
        </h2>
        <p className="text-center text-zinc-500 dark:text-dark-secondary font-light mb-12">
          Thank you to every person who has helped shape RedwoodSDK.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allContributors.map((contributor) => (
            <ContributorCard
              key={contributor.login}
              contributor={contributor}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
