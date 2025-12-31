import Constants from "src/lib/Constants";
import { GitHubStarWidget } from "src/components/GitHubStarWidget";
import { SDKButton } from "src/components/Button";
import { Copy } from "src/components/Copy";
import { link } from "src/shared/links";

export default function StartPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-3 sm:px-4 md:px-8 py-10 sm:py-14 md:py-20">
      {/* Instruct robots not to index this page */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <div className="flex items-center gap-3 mb-6">
        <a
          href={link("/")}
          aria-label="RedwoodSDK"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/logo--light.svg"
            alt="RedwoodSDK"
            className="h-10"
          />
        </a>
      </div>
      <div className="mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-[34px] sm:text-[48px] md:text-[64px] font-playfair font-bold leading-[0.9]">
          Welcome to RedwoodSDK
        </h1>
        <p className="text-[18px] sm:text-[22px] md:text-[26px] font-noto mt-3">
          You’ve just installed the minimal project. Here’s what to do next.
        </p>
      </div>

      <section className="mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-playfair font-bold mb-4">
          Next steps
        </h2>
        <ol className="list-decimal pl-6 space-y-3 text-[16px] sm:text-[18px] md:text-[20px]">
          <li>
            Read the quick start to learn the basics.{" "}
            <a
              className="text-orange hover:text-orange-light font-bold"
              href={Constants.DOCS_QUICKSTART_URL}
              target="_blank"
              rel="noreferrer"
            >
              Quick Start
            </a>
          </li>
          <li>
            Explore React Server Components and Server Functions in the docs.{" "}
            <a
              className="text-orange hover:text-orange-light font-bold"
              href={Constants.DOCS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </li>
        </ol>
        <div className="mt-6">
          <SDKButton text="Read the Quick Start" />
        </div>
      </section>

      <section className="mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-playfair font-bold mb-4">
          Star the repo
        </h2>
        <p className="mb-4">
          If this project helps you, please give us a star on GitHub:
        </p>
        {/* Server Component */}
        {/* @ts-expect-error Async Server Component */}
        <GitHubStarWidget />
      </section>

      <section className="mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-playfair font-bold mb-4">
          Share RedwoodSDK
        </h2>
        <div className="space-y-3 text-[16px] sm:text-[18px] md:text-[20px]">
          <p>Tell your friends you’re trying RedwoodSDK:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              className="border-2 border-black px-3 py-1 bg-black text-orange-medium hover:text-orange-light font-playfair"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                "I’m trying RedwoodSDK — a React framework for @Cloudflare. Check it out!"
              )}&url=${encodeURIComponent("https://rwsdk.com")}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on X
            </a>
            <a
              className="border-2 border-black px-3 py-1 bg-black text-orange-medium hover:text-orange-light font-playfair"
              href={`https://wa.me/?text=${encodeURIComponent(
                "I’m trying RedwoodSDK — a React framework for @Cloudflare. Check it out! https://rwsdk.com"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on WhatsApp
            </a>
            <a
              className="border-2 border-black px-3 py-1 bg-black text-orange-medium hover:text-orange-light font-playfair"
              href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                "I’m trying RedwoodSDK — a React framework for @Cloudflare. Check it out! https://rwsdk.com"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on Bluesky
            </a>
            <div className="bg-black p-2 border-2 border-orange-light inline-flex items-center gap-2">
              <code className="text-orange-light text-[14px] sm:text-[16px]">
                rwsdk.com
              </code>
              <Copy text="https://rwsdk.com" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-playfair font-bold mb-4">
          Deploy to Cloudflare
        </h2>
        <p className="text-[16px] sm:text-[18px] md:text-[20px] mb-4">
          RedwoodSDK runs on Cloudflare Workers. Here’s the quickest way to
          deploy.
        </p>
        <div className="space-y-3">
          <div className="bg-black p-4 rounded-lg font-mono text-[16px] sm:text-[18px] md:text-[20px] flex items-center gap-2">
            <span className="text-orange">$</span>
            <span className="text-orange-light flex-1">pnpm release</span>
            <span className="text-orange-light">
              <Copy text="pnpm release" />
            </span>
          </div>
          <p>
            Need more detail? Read the Cloudflare guide:{" "}
            <a
              className="text-orange hover:text-orange-light font-bold"
              href={Constants.CLOUDFLARE_DOCS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Deploy RedwoodSDK on Cloudflare
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
