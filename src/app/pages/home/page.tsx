import Constants from "src/lib/Constants";
import { featureBlocks } from "src/data/features";
import RouterWalkthrough from "./router-walkthrough";
import { Love } from "./love";
import { Tile1_AsyncEngine, Tile2_StreamingBridge, Tile3_ActionLoop } from "./async-react-section";
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
      <Section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 border-none !mt-0">
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col">
            <h1 className="font-serif text-7xl md:text-[110px] tracking-tight leading-[0.95] font-medium text-zinc-900">
              A simple framework<br /><span className="italic font-light text-zinc-700">for humans</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light">
              Server-first React, running on the Cloudflare platform.<br />Simple to build. Easy to maintain.
            </p>
            {/* Add a down arrow that shows the user they need to scroll */}
            <div className="mt-20 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-subtle-bounce text-zinc-300"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </Section>




      {/* Get started */}
      <Section id="get-started" className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">Get started</h2>
        <p className="text-xl text-zinc-500 mb-8 font-light leading-relaxed">
          Scaffold a Vite project powered by RedwoodSDK. Includes RSC, type-safe routing/SQL, and Cloudflare integration.
        </p>

        <div className="bg-[#2b1810] border border-[#4a2b1f] text-[#f27d26] font-mono text-sm p-6 rounded-2xl flex items-center justify-between shadow-2xl">
          <span className="flex-1">
            <span className="text-[#d4b8a8] mr-2">$</span>
            npx create-rwsdk my-project-name
          </span>
          <span className="text-[#d4b8a8] hover:text-[#e8d5c4] transition-colors" id="get-started">
            <Copy text="npx create-rwsdk my-project-name" />
          </span>
        </div>

      </Section>

      {/* Principles */}
      <Section className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">Principles</h2>
        <p className="text-xl text-zinc-500 mb-10 font-light leading-relaxed">
          Simplicity for humans is clarity for AI. By using React, TypeScript, and Cloudflare without custom "noise," AI focuses on your business logic instead of navigating framework rules.
        </p>


        <div className="bg-[#2b1810] text-[#e8d5c4] rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-[#4a2b1f]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-2 md:mb-8 opacity-80">Principle</div>
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-2 md:mb-8 hidden md:block opacity-80">Technical Reality</div>
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-2 md:mb-8 hidden md:block opacity-80">AI Advantage</div>

            {/* Row 1 */}
            <div className="font-serif text-2xl md:text-3xl font-medium text-white">Without<br /><span className="italic font-light text-[#d4b8a8]">Magic</span></div>
            <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">No code-gen or implied routing</div>
            <div className="text-base md:text-lg font-light leading-relaxed"><span className="font-medium text-white">Clarity:</span> <span className="text-[#d4b8a8]">AI reads exactly what executes</span></div>

            {/* Row 2 */}
            <div className="font-serif text-2xl md:text-3xl font-medium text-white">Composability</div>
            <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">Standard functions and types</div>
            <div className="text-base md:text-lg font-light leading-relaxed"><span className="font-medium text-white">Logic:</span> <span className="text-[#d4b8a8]">AI follows your code, not a policy</span></div>

            {/* Row 3 */}
            <div className="font-serif text-2xl md:text-3xl font-medium text-white">Web<br /><span className="italic font-light text-[#d4b8a8]">Standards</span></div>
            <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">If the browser or platform has it, we use it</div>
            <div className="text-base md:text-lg font-light leading-relaxed"><span className="font-medium text-white">Context:</span> <span className="text-[#d4b8a8]">AI uses core web knowledge</span></div>

            {/* Row 4 */}
            <div className="font-serif text-2xl md:text-3xl font-medium text-white">Server-First</div>
            <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">Linear data flow</div>
            <div className="text-base md:text-lg font-light leading-relaxed"><span className="font-medium text-white">Signal:</span> <span className="text-[#d4b8a8]">Higher accuracy for auditing/writing</span></div>
          </div>
        </div>
      </Section>


      {/* Social proof */}
      <Section className="py-12">
        <h2 className="font-mono text-lg! text-zinc-500! tracking-widest! uppercase mb-10 text-center">
          In Developers' Own Words
        </h2>
        <Love />
      </Section>

      {/* The code */}
      <Section className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
          Routing
        </h2>
        <p className="text-xl text-zinc-500 mb-10 font-light leading-relaxed">
          Composable functions that describe your app using standard
          TypeScript.
        </p>
        <RouterWalkthrough />

        <div className="my-32"></div>

        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">Async React</h2>
        <p className="text-xl text-zinc-500 mb-12 font-light leading-relaxed">
          A unified mental model for bridging the gap between the client and server.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Tile1_AsyncEngine />
          <Tile2_StreamingBridge />
          <Tile3_ActionLoop />
        </div>

        <div className="my-32"></div>

        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">Realtime</h2>
        <p className="text-xl text-zinc-500 mb-4 font-light leading-relaxed">
          RedwoodSDK provides a unified state synchronization layer. Move beyond complex WebSockets with a simple hook that synchronizes state across all clients in real-time using a binary-packed protocol.
        </p>
        <p className="italic text-zinc-400 mb-12 font-light">
          Try it: Open this in multiple tabs to see how state is synced from client &rarr; server &rarr; client.
        </p>
        <RealtimeSection />

        <div className="mt-16 text-center">
          <a href="#" className="font-mono text-xs text-zinc-400 tracking-widest hover:text-zinc-600 transition-colors uppercase border-b border-zinc-300 pb-1">
            View Implementation
          </a>
        </div>
      </Section>
    </div >
  );
}
