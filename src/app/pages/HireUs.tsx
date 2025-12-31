import { CloudflareImage } from "src/components/CloudflareImage";
import Constants from "src/lib/Constants";

export function HireUs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RedwoodJS Inc. - Consultancy",
    description:
      "RedwoodJS Inc. is a maintenance-first consultancy based in GMT+2. We do not build to exit. We build to last.",
    url: "https://rwsdk.com/hire-us",
  };

  return (
    <div className="min-h-screen">
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
          href="#contact"
          rel="noopener noreferrer"
          className="text-sm sm:text-base"
        >
          Get in touch
        </a>
      </header>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-[800px] mx-auto">
        <div className="space-y-12 sm:space-y-16">
          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              00 HIRE US
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              We build software that stays easy to run.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed">
              We are a consultancy that helps product teams remove the annoying,
              time-consuming parts of engineering. We take care of the platform
              work (builds, testing, environments, deployments, reliability) so
              your team can focus on shipping features.
            </p>
          </div>

          <br />

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              01 PROBLEM
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <strong>
                AI can write code fast. Your team still has to live with it.
              </strong>
              <p className="leading-relaxed">
                When code shows up faster than it can be reviewed, tested, and
                organized, it turns into confusion. Soon nobody is sure what's
                safe to change. Bugs increase, releases slow down, and engineers
                spend their days fixing yesterday instead of building tomorrow.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              02 SOLUTION
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <strong>We build on boring, proven foundations.</strong>
              <p className="leading-relaxed">
                We don't hide complexity behind clever abstractions. We use the
                web the way it works: standards, the browser, the network. Built
                with React, TypeScript, Vite, and Cloudflare in a
                straightforward way. The result: systems that are easier to
                understand, easier to change, and cheaper to maintain over time.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              03 TOOLS
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <strong className="leading-relaxed">
                We fix the things that quietly waste your team's time.
              </strong>
              <ul className="list-disc list-outside ml-6 space-y-4">
                <li>
                  <strong>Reliable end-to-end testing:</strong> We set up
                  Playwright so tests are stable and failures are easy to
                  diagnose.
                </li>
                <li>
                  <strong>Working PR previews:</strong> Every pull request gets
                  a real preview environment so you can review changes before
                  they ship.
                </li>
                <li>
                  <strong>Consistent dev environments:</strong> We isolate your
                  local development setups so "it worked on my machine" becomes
                  a thing of the past.
                </li>
                <li>
                  <strong>Safer dependency use:</strong> We reduce supply-chain
                  risk and keep packages updated without breaking your build.
                </li>
              </ul>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              04 STEWARDSHIP
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <strong>We maintain what we build.</strong>
              <p className="leading-relaxed">
                We maintain RedwoodSDK, a framework built on discipline and
                long-term maintenance. Client work funds open source, and open
                source keeps our standards high. We're here for the hard
                problems, and the boring ones that matter.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="font-mono text-xs sm:text-sm text-slate-600 mb-2">
              05 CONTACT
            </div>
            <div className="space-y-6 text-base sm:text-lg text-slate-700">
              <strong>Need your platform to stop being a distraction?</strong>
              <p className="leading-relaxed">
                We work with teams worldwide. Bring us in for an architecture
                review, brand new projects, a rebuild, or ongoing support.
              </p>
            </div>

            <div className="mt-8 flex gap-6" id="contact">
              <a href="https://calendar.app.google/p4UeizJNkdYexKwL9">
                Book a call
              </a>
              <a href="mailto:peter@redwoodjs.com">Email</a>
              <a
                href={Constants.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
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
        </div>
      </footer>
    </div>
  );
}
