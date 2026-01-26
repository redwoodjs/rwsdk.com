import Constants from "src/lib/Constants";
import { featureBlocks } from "src/data/features";
import RouterWalkthrough from "./router-walkthrough";
import { Love } from "./love";
import { Tile1_ServerFirst, Tile2_ServerFunctions, Tile3_Navigation } from "./rsc-rpc-section";
import { Copy } from "src/components/copy";

import { link } from "src/shared/links";
import { SEO } from "src/components/seo";

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
      <div className="relative min-h-[60vh] sm:min-h-[80vh] w-full mb-0 py-[160px]">
        <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-4 md:px-8 text-center max-w-[900px] mx-auto text-charcoal">
          <div className="flex flex-col gap-8">
            <h1 className="text-hero">A simple framework for humans*</h1>
            <h3 className="font-sans leading-[1.5] max-w-[600px] mx-auto">
              React and Cloudflare, without magic. Simple. Understandable.
            </h3>
            <div className="flex flex-col items-center gap-6 mt-4">
              <a href="#get-started" className="btn-primary">
                Get started
              </a>
              <a
                href={link("/blog/:slug", {
                  slug: "why-cloudflare-unified-platform",
                })}
                className="!text-[0.75rem] !text-slate-500 font-mono underline tracking-widest uppercase"
              >
                Built for Cloudflare's Developer Platform
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-32 px-4 sm:px-8 max-w-[900px] mx-auto -mt-24 relative z-20">
        <div className="space-y-6">
          <h2 className="mb-6">
            *... and AI
          </h2>

          <div className="space-y-6">
            <p className="leading-relaxed">
              <strong>Simplicity for humans is clarity for AI.</strong> We do
              not use custom syntax or hidden logic. By using TypeScript and
              providing direct access to the Request and Response, we remove the
              "noise" of the framework. Your AI assistant focuses on your
              specific logic rather than trying to navigate the rules of a
              complex library.
            </p>

            <h3 className="mt-8 mb-4 font-serif">
              Our Principles
            </h3>

            <p className="leading-relaxed">
              We use the web the way it works: standards, the browser, and the
              network. Built with React, TypeScript, Vite, and Cloudflare in a
              straightforward way. The result: systems that are easier to
              understand, easier to change, and cheaper to maintain.
            </p>

            <div className="bg-editor rounded-xl overflow-hidden mt-8 mb-12 border border-slate-800">
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
        className="flex flex-col items-start py-32 px-4 sm:px-8 max-w-[900px] mx-auto"
      >
        <div className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-6">
            <h2 className="">
              Get started
            </h2>

            <p className="leading-relaxed">
              Running this command installs Vite and the RedwoodSDK plugin which
              gives you React Server Components (RSC), a type-safe router,
              type-safe SQL, a Cloudflare development environment, and{" "}
              <a href="https://docs.rwsdk.com/core/overview/">more</a>.
            </p>
          </div>

          <div className="bg-editor p-4 rounded-xl font-mono text-sm sm:text-base flex items-center gap-2 w-fit border border-slate-800">
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

      <Love />

      {/* Router Walkthrough Section */}
      <section className="pt-32 pb-0 px-4 sm:px-8 mt-12 max-w-[900px] mx-auto">
        <div className="text-left">
          <div className="font-mono text-xs sm:text-sm mb-2 opacity-50 uppercase leading-none">
            The Code
          </div>

          <div className="mb-12 text-left">
            <h2 className="mb-6">
              Routing
            </h2>
            <p className="max-w-2xl leading-relaxed">
              Composable functions that describe your app using standard
              TypeScript.
            </p>
          </div>

          <RouterWalkthrough />
        </div>

        <section className="pt-12 py-24">
          <div className="mb-12">
            <h2 className="mb-4">React Server Components</h2>
            <p className="max-w-2xl leading-relaxed opacity-80">
              Server-first allows you to focus on a single source of truth, queries and mutations make
              it type safe, and client side navigation makes it fast!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Tile1_ServerFirst />
            <Tile2_ServerFunctions />
            <Tile3_Navigation />
          </div>
        </section>
      </section>


    </div>
  );
}
