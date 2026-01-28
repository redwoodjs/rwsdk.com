import Constants from "src/lib/Constants";
import { featureBlocks } from "src/data/features";
import RouterWalkthrough from "./router-walkthrough";
import { Love } from "./love";
import { Tile1_ServerFirst, Tile2_ServerFunctions, Tile3_Navigation } from "./rsc-rpc-section";
import RealtimeSection from "./realtime-section";
import { Copy } from "src/components/copy";
import { Section } from "src/components/section";

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
      <Section className="relative min-h-[60vh] sm:min-h-[80vh] !max-w-[700px] mx-auto flex items-center justify-center border-none !mt-0">
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col">
            <h1 className="text-hero">A simple framework for humans</h1>
            <h3 className="leading-[1.5] mx-auto">
              Server-first React, running on the Cloudflare platform.<br />Simple to build. Easy to maintain.
            </h3>
            {/* Add a down arrow that shows the user they need to scroll */}
            <div className="mt-12 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-subtle-bounce text-slate-400 opacity-30"
              >
                <path d="M7 13l5 5 5-5" />
                <path d="M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
      </Section>




      {/* Get started */}
      <Section id="get-started">
        <h2>Get started</h2>
        <p>
          Scaffold a Vite project powered by RedwoodSDK. Includes RSC, type-safe routing/SQL, and Cloudflare integration.
        </p>
        <br />

        <div className="bg-editor p-4 rounded-xl font-mono text-sm sm:text-base flex items-center gap-2 w-fit border border-white/10">
          <span className="text-orange">$</span>{" "}
          <span className="text-orange-light flex-1">
            npx create-rwsdk my-project-name
          </span>
          <span className="text-orange-light" id="get-started">
            <Copy text="npx create-rwsdk my-project-name" />
          </span>
        </div>

      </Section>

      {/* Principles */}
      <Section>
        <h2>Principles</h2>
        <p>
          Simplicity for humans is clarity for AI. By using React, TypeScript, and Cloudflare without custom "noise," AI focuses on your business logic instead of navigating framework rules.
        </p>
        <br />


        <div className="bg-editor rounded-xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="px-6 py-4 font-mono text-xs sm:text-sm text-[#e73c36]">
                    Principle
                  </th>
                  <th className="w-[40%] px-6 py-4 font-mono text-xs sm:text-sm text-[#F17543]">
                    Technical Reality
                  </th>
                  <th className="w-[40%] px-6 py-4 font-mono text-xs sm:text-sm text-[#ffad48]">
                    AI Advantage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="px-6 py-4 font-bold text-white text-sm">
                    Without Magic
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    No code-gen or implied routing
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    <strong className="text-[#ffad48]">Clarity:</strong> AI reads exactly what executes
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-6 py-4 font-bold text-white text-sm">
                    Composability
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    Standard functions and types
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    <strong className="text-[#ffad48]">Logic:</strong> AI follows your code, not a policy
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-6 py-4 font-bold text-white text-sm">
                    Web Standards
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    If the browser or platform has it, we use it
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    <strong className="text-[#ffad48]">Context:</strong> AI uses core web knowledge
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-white text-sm">
                    Server-First
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    Linear data flow
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    <strong className="text-[#ffad48]">Signal:</strong> Higher accuracy for auditing/writing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section >


      {/* Social proof */}
      <Section>
        <h2>In Developers' Own Words</h2>
        <Love />
      </Section>

      {/* The code */}
      <Section>
        <h2>
          Routing
        </h2>
        <p>
          Composable functions that describe your app using standard
          TypeScript.
        </p>
        <br />
        <RouterWalkthrough />

        <br />
        <br />

        <h2>React Server Components</h2>
        <p>
          At the core of our architecture is a unified mental model powered by React Server Components. Whether you are fetching data, handling a mutation, or navigating to a new page, you are working within a single, consistent system that works together by default.
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Tile1_ServerFirst />
          <Tile2_ServerFunctions />
          <Tile3_Navigation />
        </div>

        <br />
        <br />

        <h2>Realtime Consistency</h2>
        <p>
          RedwoodSDK provides a unified state synchronization layer. Move beyond complex WebSockets with a simple hook that synchronizes state across all clients in real-time using a binary-packed protocol.
        </p>
        <br />
        <RealtimeSection />
      </Section>
    </div >
  );
}
