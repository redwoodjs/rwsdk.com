import { CloudflareImage } from "src/components/CloudflareImage";
import Constants from "src/lib/Constants";
import { link } from "src/shared/links";

export default function Team() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RedwoodJS Inc. - Consultancy",
    description:
      "We build software for the long term. We partner with technical founders and engineering leaders to design 'Golden Path' systems: high-velocity infrastructure built to remain understandable under the weight of AI-driven development.",
    url: "https://rwsdk.com/team",
    mainEntity: {
      "@type": "Organization",
      name: "RedwoodJS, Inc.",
      description:
        "A maintenance-first consultancy based in GMT+2. We build the frameworks and tooling that define the modern web.",
      url: "https://rwsdk.com/team",
    },
  };

  return (
    <div className="bg-[#F9F7F2] text-slate-800 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <title>RedwoodJS, Inc. - Consultancy</title>
      <meta
        name="description"
        content="We build software for the long term. We partner with technical founders and engineering leaders to design 'Golden Path' systems: high-velocity infrastructure built to remain understandable under the weight of AI-driven development."
      />
      <meta property="og:title" content="RedwoodJS Inc. - Consultancy" />
      <meta
        property="og:description"
        content="We build software for the long term. We partner with technical founders and engineering leaders to design 'Golden Path' systems: high-velocity infrastructure built to remain understandable under the weight of AI-driven development."
      />
      <meta property="og:url" content="https://rwsdk.com/team" />
      <meta
        property="og:image"
        content="https://rwsdk.com/images/Homepage-og.png"
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:logo"
        content="https://rwsdk.com/images/logo--light.svg"
      />
      <meta property="og:locale" content="en_US" />

      {/* Header */}
      <header className="flex justify-between items-center py-6 px-4 sm:px-8 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 group">
          <a href="/">
            <CloudflareImage
              imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
              alt="RedwoodSDK logo"
              className="w-[120px] sm:w-[140px] grayscale"
            />
          </a>
        </div>
        <a
          href="https://calendar.app.google/p4UeizJNkdYexKwL9"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm sm:text-base text-slate-800 hover:text-slate-600 underline"
        >
          Book a call
        </a>
      </header>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="space-y-12 sm:space-y-16">
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              00 TEAM // HIRE US
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              We build software for the long term.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed">
              We partner with technical founders and engineering leaders to
              design "Golden Path" systems: high-velocity infrastructure built
              to remain understandable under the weight of AI-driven
              development.
            </p>
            <div className="flex flex-wrap gap-6 sm:gap-8 text-sm sm:text-base">
              <a
                href="https://calendar.app.google/p4UeizJNkdYexKwL9"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Book a call
              </a>
              <a
                href="mailto:peter@redwoodjs.com"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Email
              </a>
              <a
                href={Constants.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Discord
              </a>
            </div>
          </div>

          <br />

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              01 THE THESIS
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <p className="leading-relaxed">
                AI-generated code has turned architectural discipline into a
                survival requirement. Because AI is a force multiplier for code
                volume, it is inherently a force multiplier for technical debt.
                We believe in the Guardrail Mandate: building rigid,
                deterministic systems through type-safe boundaries and automated
                validation. These guardrails prevent AI agents from
                hallucinating your architecture into a corner.
              </p>
              <p className="leading-relaxed">
                True speed requires Understandability over Magic. If code is too
                clever, AI cannot reason about it and humans cannot debug it. We
                build "Zero-Magic" systems that stay legible to both. In this
                era, the value of engineering shifted from writing code to
                managing the "Paved Road" it runs on. We build that platform so
                your team can focus entirely on product logic.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              02 PRINCIPLES
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <p className="leading-relaxed">
                We practice Architectural Editing. We don't just ship features;
                we curate the codebase to ensure it remains an asset. This means
                favoring native web platform features over proprietary
                abstractions. If the browser can handle a task natively, we do
                not invent a new way to do it.
              </p>
              <p className="leading-relaxed">
                Our Maintenance-First constraint ensures no vendor lock-in. If
                we would not support the code for a decade, we will not build it
                for you. This philosophy is enforced through Deterministic
                Validation. We replace flaky tests with high-confidence E2E
                pipelines, ensuring every feature is validated with zero noise,
                even when generated by an LLM.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              03 CAPABILITY
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <p className="leading-relaxed">
                We are platform engineers who build the tools that define the
                modern web. Our expertise is rooted in the K.I.S.S. Stack: Vite,
                React, TypeScript, and Cloudflare. Having built the framework
                twice, we understand React Server Components from the metal up.
                We use this depth to enforce Type-Safe Governance, catching
                architectural rot before it reaches production. Our work on
                Machinen, our own AI product, allows us to battle-test these
                theories in a live environment.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              04 STEWARDSHIP
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <p className="leading-relaxed">
                RedwoodJS was initiated by Tom Preston-Werner, the co-founder of
                GitHub, to bring "Golden Path" discipline to the web. In 2024,
                stewardship moved to Peter Pistorius, marking the start of
                RedwoodJS Inc. We operate as a maintenance-first consultancy to
                fund open-source innovation. We solve the hardest architectural
                problems for our clients to ensure the framework's longevity. We
                are not building to exit; we are building to last.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              05 CONTACT
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <p className="leading-relaxed">
                We partner with organizations that prioritize stability and
                type-safe deployments. We offer Advisory for architectural
                reviews, Implementation for V1 builds or migrations, and
                Embedded Engineering to accelerate your team.
              </p>
              <p className="leading-relaxed">
                Ready to build on a solid foundation? Whether starting fresh or
                upgrading an existing React/Vite/TS stack, let's talk. We
                partner with teams worldwide to handle the platform while they
                focus on the product.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://calendar.app.google/p4UeizJNkdYexKwL9"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Book a call
              </a>
              <a
                href="mailto:peter@redwoodjs.com"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Email
              </a>
              <a
                href={Constants.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-slate-600 underline font-mono"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto border-t border-slate-300 mt-12">
        <div className="prose prose-slate max-w-none">
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            RedwoodJS Inc. is a maintenance-first consultancy based in GMT+2. We
            do not build to exit. We build to last.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
            <a
              href={Constants.GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-slate-600 underline font-mono"
            >
              GitHub
            </a>
            <a
              href={Constants.X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-slate-600 underline font-mono"
            >
              Twitter
            </a>
            <a
              href={Constants.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-slate-600 underline font-mono"
            >
              Discord
            </a>
            <a
              href="mailto:peter@redwoodjs.com"
              className="text-slate-800 hover:text-slate-600 underline font-mono"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
