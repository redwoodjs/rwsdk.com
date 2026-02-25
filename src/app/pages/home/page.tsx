import Constants from "src/lib/Constants";
import { featureBlocks } from "src/data/features";
import RouterWalkthrough from "./router-walkthrough";
import { Love } from "./love";
import {
  Tile1_AsyncEngine,
  Tile2_StreamingBridge,
  Tile3_ActionLoop,
} from "./async-react-section";
import ActivityTrack, { RealtimeCounter } from "./activity-track";
import LatestBlogs from "./latest-blogs";
import { Copy } from "src/components/copy";
import { Section } from "src/components/section";
import { Countdown } from "./countdown";

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
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .hero-h1 { font-size: 4.5rem; }
              .hero-p { font-size: 1.25rem; }
              @media (min-width: 768px) {
                .hero-h1 { font-size: 110px; }
                .hero-p { font-size: 1.5rem; /* 2xl equivalent */ }
              }
            `,
              }}
            />
            <h1 className="hero-h1 font-serif tracking-tight leading-[0.95] font-medium text-zinc-900 break-words">
              A simple framework
              <br />
              <span className="italic font-light text-[#4a2b1f]">
                for humans
              </span>
            </h1>
            <p className="hero-p mt-10 text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light">
              Server-first React, running on the Cloudflare platform.
              <br />
              Simple to build. Easy to maintain.
            </p>
            {/* Countdown section */}
            <Countdown />
          </div>
        </div>
      </Section>

      {/* Get started */}
      <Section id="get-started" className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
          Get started
        </h2>
        <p className="text-xl text-zinc-500 mb-8 font-light leading-relaxed">
          Scaffold a Vite project powered by RedwoodSDK. Includes RSC, type-safe
          routing/SQL, and Cloudflare integration.
        </p>

        <div className="bg-[#2b1810] border border-[#4a2b1f] text-[#f27d26] font-mono text-sm p-4 sm:p-6 rounded-2xl flex items-center justify-between shadow-2xl overflow-x-auto">
          <span className="flex-1 whitespace-nowrap pr-4">
            <span className="text-[#d4b8a8] mr-2">$</span>
            npx create-rwsdk my-project-name
          </span>
          <span
            className="text-[#d4b8a8] hover:text-[#e8d5c4] transition-colors"
            id="get-started"
          >
            <Copy text="npx create-rwsdk my-project-name" />
          </span>
        </div>
      </Section>

      {/* Principles */}
      <Section className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
          Principles
        </h2>
        <p className="text-xl text-zinc-500 mb-10 font-light leading-relaxed">
          Simplicity for humans is clarity for AI. By using React, TypeScript,
          and Cloudflare without custom "noise," AI focuses on your business
          logic instead of navigating framework rules.
        </p>

        <div className="bg-[#2b1810] text-[#e8d5c4] rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-[#4a2b1f]">
          <div className="hidden md:grid grid-cols-3 gap-16 mb-16">
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest opacity-80">
              Principle
            </div>
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest opacity-80">
              Technical Reality
            </div>
            <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest opacity-80">
              AI Advantage
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 border-b border-[#4a2b1f]/50 pb-12 md:pb-0 md:border-0 last:border-0 last:pb-0">
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Principle
                </div>
                <div className="font-serif text-2xl md:text-3xl font-medium text-white">
                  Without
                  <br />
                  <span className="italic font-light text-[#d4b8a8]">Magic</span>
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Technical Reality
                </div>
                <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">
                  No code-gen or implied routing
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  AI Advantage
                </div>
                <div className="text-base md:text-lg font-light leading-relaxed">
                  <span className="font-medium text-white">Clarity:</span>{" "}
                  <span className="text-[#d4b8a8]">
                    AI reads exactly what executes
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 border-b border-[#4a2b1f]/50 pb-12 md:pb-0 md:border-0 last:border-0 last:pb-0">
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Principle
                </div>
                <div className="font-serif text-2xl md:text-3xl font-medium text-white">
                  Composability
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Technical Reality
                </div>
                <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">
                  Standard functions and types
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  AI Advantage
                </div>
                <div className="text-base md:text-lg font-light leading-relaxed">
                  <span className="font-medium text-white">Logic:</span>{" "}
                  <span className="text-[#d4b8a8]">
                    AI follows your code, not a policy
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 border-b border-[#4a2b1f]/50 pb-12 md:pb-0 md:border-0 last:border-0 last:pb-0">
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Principle
                </div>
                <div className="font-serif text-2xl md:text-3xl font-medium text-white">
                  Web
                  <br className="hidden md:block" />
                  <span className="italic font-light text-[#d4b8a8]">
                    Standards
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Technical Reality
                </div>
                <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">
                  If the browser or platform has it, we use it
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  AI Advantage
                </div>
                <div className="text-base md:text-lg font-light leading-relaxed">
                  <span className="font-medium text-white">Context:</span>{" "}
                  <span className="text-[#d4b8a8]">AI uses core web knowledge</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 border-b border-[#4a2b1f]/50 pb-12 md:pb-0 md:border-0 last:border-0 last:pb-0">
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Principle
                </div>
                <div className="font-serif text-2xl md:text-3xl font-medium text-white">
                  Server-First
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  Technical Reality
                </div>
                <div className="text-[#d4b8a8] text-base md:text-lg font-light leading-relaxed">
                  Linear data flow
                </div>
              </div>
              <div>
                <div className="text-[#f27d26] font-mono text-xs uppercase tracking-widest mb-3 opacity-80 md:hidden">
                  AI Advantage
                </div>
                <div className="text-base md:text-lg font-light leading-relaxed">
                  <span className="font-medium text-white">Signal:</span>{" "}
                  <span className="text-[#d4b8a8]">
                    Higher accuracy for auditing/writing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Social proof */}
      <Section className="py-12">
        <h2 className="font-mono text-sm! text-zinc-400 font-light tracking-widest! uppercase mb-10 text-center">
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
          Composable functions that describe your app using standard TypeScript.
        </p>
        <RouterWalkthrough />

        <div className="my-32"></div>

        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
          Async React
        </h2>
        <p className="text-xl text-zinc-500 mb-12 font-light leading-relaxed">
          A unified mental model for bridging the gap between the client and
          server.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Tile1_AsyncEngine />
          <Tile2_StreamingBridge />
          <Tile3_ActionLoop />
        </div>

        <div className="my-32"></div>

        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
          Realtime
        </h2>
        <div className="text-xl text-zinc-500 mb-12 font-light leading-relaxed space-y-6">
          <p>
            <code className="bg-black/5 text-zinc-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-zinc-200/60">useSyncedState</code> is a drop-in replacement for <code className="bg-black/5 text-zinc-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-zinc-200/60">useState</code> that synchronizes state across all connected clients in real-time.
          </p>
        </div>

        {/* Drop-in replacement section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Box: Text and Code */}
            <div className="flex flex-col">
              <div className="bg-[#1e1c19] rounded-[1.5rem] overflow-hidden shadow-xl border border-[#2c2a26] mb-10">
                <div className="flex items-center px-6 py-5">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#4a4744]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4a4744]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4a4744]"></div>
                  </div>
                </div>

                <div className="pb-8 pt-2 font-mono text-[13px] md:text-[15px] tracking-wide">
                  <div className="flex px-6 md:px-10 py-3 items-center">
                    <span className="text-[#f87171] w-8 select-none shrink-0 font-medium">-</span>
                    <span className="text-[#84817a] line-through decoration-[#84817a]/80">const [count, setCount] = useState(0);</span>
                  </div>
                  <div className="flex bg-[#172a20] px-6 md:px-10 py-4 items-center">
                    <span className="text-[#10b981] w-8 select-none shrink-0 font-medium">+</span>
                    <span className="text-[#10b981]">
                      const [count, setCount] = useSyncedState('global-count', 0);
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed mt-auto">
                Transform any local state into a globally synchronized, bi-directional data stream. When you call <code className="bg-black/5 text-zinc-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-zinc-200/60">useSyncedState</code>, it persists the state on your server automatically. Your server can push data down to the clients, or the clients can push data up to the server—all without writing a single WebSocket handler.
              </p>
            </div>

            {/* Right Box: Live Counter */}
            <div className="flex">
              <RealtimeCounter />
            </div>
          </div>
        </div>

        <p className="italic text-zinc-400 mb-12 font-light">
          Try it: The activity bar below shows multiple users interacting with our website and updates in real-time. Open this page in multiple tabs to see how state is synced from client &rarr; server &rarr; client.
        </p>
        <ActivityTrack />
      </Section>

      <LatestBlogs />
    </div>
  );
}
