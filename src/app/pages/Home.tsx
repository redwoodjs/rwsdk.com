import Constants from "src/lib/Constants";
import { featureBlocks } from "src/data/features";
import RouterWalkthrough from "src/components/RouterWalkthrough";
import { Copy } from "src/components/Copy";

import { link } from "src/shared/links";
import { SEO } from "src/components/SEO";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RedwoodSDK",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloudflare Workers",
    description:
      "Server-first React with zero magic. Built to stay understandable.",
    keywords:
      "Server-first React, zero magic, understandable, framework, React, TypeScript, Cloudflare Workers",
    url: "https://rwsdk.com",
    logo: "https://rwsdk.com/images/logo--light.svg",
    sameAs: [Constants.GITHUB_REPO, Constants.DISCORD_URL],
    featureList: featureBlocks.map((block) => ({
      "@type": "SoftwareFeature",
      name: `${block.title}`,
      featureList: block.items,
    })),
    applicationSubCategory: "Web Framework",
    operatingSystemVersion: "Cloudflare Workers",
    softwareVersion: "1.0.0",
    author: {
      "@type": "Organization",
      name: "RedwoodJS Inc.",
      url: "https://rwsdk.com",
      logo: "https://rwsdk.com/images/logo--light.svg",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div>
      <SEO
        title="RedwoodSDK: A simple framework for humans"
        description="React and Cloudflare, without magic. Simple. Understandable."
        ogUrl="https://rwsdk.com"
        ogImageAlt="RedwoodSDK: A simple framework for humans"
        structuredData={structuredData}
      />
      {/* Hero section */}
      <div className="relative min-h-[70vh] sm:min-h-screen w-full mb-10 sm:mb-20">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-screen px-3 sm:px-4 md:px-8 text-center max-w-[1260px] mx-auto">
          <div className="mb-[100px] sm:mb-[100px] md:mb-[63px] flex flex-col gap-3 sm:gap-8">
            <h1 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[90px]  font-bold leading-[1.1]">
              A simple framework for humans*
            </h1>
            <h3 className="text-[18px] sm:text-[24px] md:text-[32px] font-bold text-center leading-[1.2] max-w-[1060px] mx-auto">
              React and Cloudflare, without magic. Simple. Understandable.
            </h3>
            <div className="flex flex-col items-center gap-3">
              <a
                href="#get-started"
                className="inline-block !no-underline text-[16px] sm:text-[18px] md:text-[16px] px-4 sm:px-3 md:px-8 py-1 bg-[#E0E0E0] border-2 border-t-white border-l-white border-r-[#A0A0A0] border-b-[#A0A0A0] rounded-[4px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#D0D0D0] active:border-t-[#A0A0A0] active:border-l-[#A0A0A0] active:border-r-white active:border-b-white active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] transition-all"
              >
                Get started
              </a>
              <br />
              <a
                href={link("/blog/:slug", {
                  slug: "why-cloudflare-unified-platform",
                })}
                className="!text-sm !text-slate-500 font-mono underline"
              >
                Built for
                <br />
                Cloudflare's Developer Platform
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
        <div className="prose prose-slate max-w-none space-y-6">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            *... and AI
          </h3>

          <div className="space-y-6 text-base sm:text-lg text-slate-700">
            <p className="leading-relaxed">
              <strong>Simplicity for humans is clarity for AI.</strong> We do
              not use custom syntax or hidden logic. By using TypeScript and
              providing direct access to the Request and Response, we remove the
              "noise" of the framework. Your AI assistant focuses on your
              specific logic rather than trying to navigate the rules of a
              complex library.
            </p>

            <h4 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-8 mb-4">
              Our Principles
            </h4>

            <p className="leading-relaxed">
              We use the web the way it works: standards, the browser, and the
              network. Built with React, TypeScript, Vite, and Cloudflare in a
              straightforward way. The result: systems that are easier to
              understand, easier to change, and cheaper to maintain.
            </p>

            <div className="not-prose bg-editor rounded-xl overflow-hidden mt-8 mb-12 border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="px-6 py-4 font-mono text-xs sm:text-sm text-slate-400">
                        Principle
                      </th>
                      <th className="w-[40%] px-6 py-4 font-mono text-xs sm:text-sm text-slate-400">
                        Technical Reality
                      </th>
                      <th className="w-[40%] px-6 py-4 font-mono text-xs sm:text-sm text-slate-400">
                        Why it helps the AI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800/50">
                      <td className="px-6 py-4 font-bold text-white text-sm">
                        Without Magic
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        No code generation or file-system conventions. What you
                        write is what runs.
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        No guessing. AI sees the exact code the engine executes.
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="px-6 py-4 font-bold text-white text-sm">
                        Composability
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        Build with functions and types. No rigid structures or
                        opinionated wrappers.
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        Predictable intent. AI follows your logic, not a
                        framework's policy.
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="px-6 py-4 font-bold text-white text-sm">
                        Web Standards
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        We avoid rebuilding primitives the browser already
                        provides. If the platform gives you a tool like the
                        Request object, you use it directly.
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        Standard training. AI uses its core web knowledge, not
                        custom workarounds.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-white text-sm">
                        Server-First
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        Each request is processed on the server through a clear
                        path to the response.
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        High signal. A linear data flow is easier for AI to
                        audit and write.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section
        id="get-started"
        className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[1200px] mx-auto"
      >
        <div className="flex flex-col gap-3 sm:gap-4 text-left">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Get started
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-4 leading-relaxed">
              Running this command installs Vite and the RedwoodSDK plugin which
              gives you React Server Components (RSC), a type-safe router,
              type-safe SQL, a Cloudflare development environment, and{" "}
              <a href="https://docs.rwsdk.com/core/overview/">more</a>.
            </p>
          </div>

          <div className="bg-black p-4 rounded-lg font-mono text-[14px] sm:text-[16px] md:text-[18px] flex items-center gap-2 max-w-[743px]">
            <span className="text-orange">$</span>{" "}
            <span className="text-orange-light flex-1">
              npx create-rwsdk my-project-name
            </span>
            <span className="text-orange-light">
              <Copy text="npx create-rwsdk my-project-name" />
            </span>
          </div>
        </div>
      </section>

      {/* Router Walkthrough Section */}
      <section className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            The Code
          </h3>

        <div className="mb-6 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            Routing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
             Composable functions that describe your app using standard TypeScript.
          </p>
        </div>
        
        <RouterWalkthrough />
      </section>
    </div>
  );
}
