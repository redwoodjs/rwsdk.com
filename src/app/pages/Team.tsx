import { CloudflareImage } from "src/components/CloudflareImage";
import Constants from "src/lib/Constants";

export default function Team() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RedwoodJS Inc. - Consultancy",
    description:
      "Your codebase is too heavy. We're here to lighten it. A self-sustainable consultancy based in GMT+2specializing in simplifying complex codebases.",
    url: "https://rwsdk.com/team",
    mainEntity: {
      "@type": "Organization",
      name: "RedwoodJS, Inc.",
      description:
        "A self-sustainable consultancy based in GMT+2. We are simplifiers, not just problem solvers.",
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
        content="Your codebase is too heavy. We're here to lighten it. A self-sustainable consultancy based in South Africa specializing in simplifying complex codebases."
      />
      <meta property="og:title" content="RedwoodJS Inc. - Consultancy" />
      <meta
        property="og:description"
        content="Your codebase is too heavy. We're here to lighten it. A self-sustainable consultancy based in South Africa specializing in simplifying complex codebases."
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
          href="mailto:peter@redwoodjs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm sm:text-base text-slate-800 hover:text-slate-600 underline"
        >
          Chat with Peter (peter@redwoodjs.com)
        </a>
      </header>

      {/* Section 1: Hero */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="prose prose-slate max-w-none">
          <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
            00 TEAM // HIRE US
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            We delete complexity for a living.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed">
            Zero-magic systems, built to stay understandable under AI velocity.
          </p>
        </div>
      </section>

      {/* Section 2: The 5 C's Philosophy */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="space-y-8 sm:space-y-10">
          {/* Character */}
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              01 CHARACTER
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              We are simplifiers. In an industry that rewards complexity with
              billable hours, we operate with a radical commitment to
              architectural editing. We favor Zero-Magic patterns over
              proprietary abstractions. If the web platform can handle a task
              natively, we do not invent a new way to do it.
            </p>
          </div>

          {/* Capacity */}
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              02 CAPACITY
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Leverage over headcount. We outperform larger agencies by
              automating the friction that slows development down. We build the
              Golden Path: The infrastructure for high-confidence validation and
              instant deployment. We ensure your team can move faster without
              the traditional tax of technical debt.
            </p>
          </div>

          {/* Compatibility */}
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              03 COMPATIBILITY
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Built for stability. We are the ideal partners for technical
              leaders who recognize that as AI generates more code, the
              underlying architecture must be incredibly stable. We fit best
              with organizations that prioritize deterministic testing and
              high-confidence, type-safe deployments.
            </p>
          </div>

          {/* Constraint */}
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              04 CONSTRAINT
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              The Maintenance-First Mandate. Our refusal to build black boxes is
              your greatest safety feature. If we would not want to support it
              for a decade, we will not build it for you. This constraint
              ensures no vendor lock-in; you remain the absolute owner of your
              software.
            </p>
          </div>

          {/* Confidence */}
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              05 CONFIDENCE
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Proven in the Lab. RedwoodJS Inc. is powered by the research and
              development behind RedwoodJS (The original framework) and
              RedwoodSDK. We don't just theorize about the web; we build the
              frameworks and tooling that define it. We apply these distilled,
              battle-tested solutions directly to your project.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What We Do */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            What We Do: The Paved Road
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            As platform engineers, we design the "Golden Path" that allows lean
            teams to ship code without the traditional tax of complexity.
          </p>
          <ul className="list-none space-y-4 text-base sm:text-lg text-slate-700">
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-slate-600">
              <strong className="font-semibold">
                K.I.S.S. The Keep it Simple Stack:
              </strong>{" "}
              Experts in Vite, React, TypeScript, and Cloudflare. We've built
              the framework, twice! And implemented React Server Components from
              scratch, we understand it intimately.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-slate-600">
              <strong className="font-semibold">
                Deterministic Validation:
              </strong>{" "}
              We engineer reliable E2E pipelines that ensure AI-generated
              features are validated with zero flakiness.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-slate-600">
              <strong className="font-semibold">
                Standardized Infrastructure:
              </strong>{" "}
              Automated Infrastructure-as-Code providing per-PR previews,
              ephemeral databases, and automated secrets management.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-slate-600">
              <strong className="font-semibold">Type-Safe Governance:</strong>{" "}
              We enforce strict, end-to-end type safety to catch architectural
              rot before it reaches production.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4: Who We Are */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            Who We Are
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            RedwoodJS Inc. is a maintenance-first consultancy built by the
            people behind Redwood.
          </p>
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            Redwood started as an independent open-source project initiated and
            sponsored by Tom Preston-Werner, GitHub cofounder and the creator of
            Jekyll, Gravatar, Semantic Versioning, and TOML.
          </p>
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            RedwoodJS was founded by Tom Preston-Werner, Peter Pistorius, Rob
            Cameron, and David Price.
          </p>
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            In late 2024, Tom asked Peter to take over stewardship of the
            project. That handoff marked the start of the next chapter: a
            renewed focus on server-first React, zero-magic patterns, and the
            kind of foundations that don't collapse under AI-driven velocity.
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            We don't just advise on these ideas, we build them. The R&D behind
            RedwoodJS and RedwoodSDK is the lab that powers our consulting work.
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            In additional to consulting, we are also building an AI product
            called Machinen (Currently in private beta).
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto border-t border-slate-300 mt-12">
        <div className="prose prose-slate max-w-none">
          <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
            RedwoodJS Inc. is a consultancy based in GMT+2. We do not build to
            exit. We build to last.
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
