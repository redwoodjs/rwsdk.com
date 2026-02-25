import { SEO } from "src/components/seo";

export default function PersonalSoftware() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RedwoodSDK | The React Framework for Cloudfare and personal software",
    description:
      "A simple framework for humans. Server-first React, running on the Cloudflare platform. Simple to build. Easy to maintain. RedwoodSDK begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features. Its standards-based router, with support for middleware and interruptors, gives you fine-grained control over every request and response.",
    url: "https://rwsdk.com/personal-software",
    mainEntity: {
      "@type": "Article",
      headline: "The Personal Software Revolution",
      description:
        "A simple framework for humans. Server-first React, running on the Cloudflare platform. Simple to build. Easy to maintain. RedwoodSDK begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features. Its standards-based router, with support for middleware and interruptors, gives you fine-grained control over every request and response.",
      author: {
        "@type": "Organization",
        name: "RedwoodJS Inc.",
        url: "https://rwsdk.com",
      },
      publisher: {
        "@type": "Organization",
        name: "RedwoodJS Inc.",
        logo: {
          "@type": "ImageObject",
          url: "https://rwsdk.com/images/logo--light.svg",
        },
      },
      datePublished: "2024-03-20",
      dateModified: "2024-03-20",
    },
  };

  return (
    <div className="bg-[#FDFCFB] dark:bg-dark-bg text-zinc-800 dark:text-dark-primary font-sans selection:bg-dark-accent selection:text-dark-primary">
      <SEO
        title="Personal Software | RedwoodSDK"
        description="The joy of writing software, and the joy of using it - they should go hand in hand. We want to bring that joy back. Join us in the personal software revolution with RedwoodSDK."
        ogTitle="The Personal Software Revolution | RedwoodSDK"
        ogUrl="https://rwsdk.com/personal-software"
        ogImage="https://rwsdk.com/images/PersonalSoftware-og.png"
        structuredData={structuredData}
      />

      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Full Screen Image Side */}
        <div className="lg:w-1/3 hidden lg:block">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <img
              src="/images/hero.png"
              alt="Personal Software"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Header Image */}
        <div className="flex items-center justify-center lg:hidden w-full h-[40vh] relative">
          <img
            src="/images/hero-small.png"
            alt="Personal Software"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Side */}
        <div className="flex-1 flex flex-col items-center">
          <main className="flex-1 w-full max-w-3xl px-6 lg:px-16 pt-16 lg:pt-32 pb-24 border-none !mt-0">
            <div className="flex flex-col mb-16 lg:mb-20">
              <h1 className="font-serif text-[4rem] sm:text-[4.5rem] md:text-[80px] xl:text-[90px] tracking-tight leading-[0.95] font-medium text-zinc-900 dark:text-dark-primary break-words">
                Personal
                <br />
                <span className="italic font-light text-dark-secondary">Software</span>
              </h1>
              <p className="mt-8 text-zinc-500 dark:text-dark-secondary text-xl md:text-2xl leading-relaxed font-light">
                The joy of writing software, and the joy of using it - they should go hand in hand. We want to bring that joy back.
              </p>
            </div>

            <div className="space-y-16">
              <section>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  <div>
                    It started with a blinking cursor
                    <span className="text-orange dark:text-dark-accent cursor-blink"> | </span>
                  </div>
                </h2>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">A blank file.</span>
                  <span className="block">A few keystrokes.</span>
                  <code className="bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-dark-primary px-2 py-1 rounded text-sm font-mono border border-zinc-200 dark:border-white/20 mt-2 mb-2 inline-block">
                    print("hello, world")
                  </code>
                  <span className="block">You ran it.</span>
                  <span className="block">And the computer responded.</span>
                  <span className="block"><strong className="font-medium text-zinc-900 dark:text-dark-primary">You told a machine what to do – and it listened.</strong></span>
                  <span className="block mt-4">That moment has sparked millions of journeys.</span>
                  <span className="block">Kids in bedrooms. Students in labs. Curious minds in internet cafés.</span>
                  <span className="block">A generation &ndash; and then another &ndash; learned the magic of software.</span>
                  <span className="block mt-4">They stayed up too late.</span>
                  <span className="block">They built games. Tools. Mods. Scripts to make life easier.</span>
                  <span className="block">They shared zip files on forums. Burned CDs for friends.</span>
                  <span className="block">They made things. <strong className="font-medium text-zinc-900 dark:text-dark-primary">Because they could!</strong></span>
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  But the software we built changed
                </h2>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">Small tools made by small teams gave way to big tools and big teams.</span>
                  <span className="block">Suddenly, we have massive platforms backed by massive money.</span>
                  <span className="block mt-4">We got jobs.</span>
                  <span className="block">We went to stand ups.</span>
                  <span className="block">We joined sprint planning calls and added tickets to Jira.</span>
                  <span className="block mt-4">Software became a business.</span>
                  <span className="block"><strong className="font-medium text-zinc-900 dark:text-dark-primary">And business became the reason software existed.</strong></span>
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  There's nothing inherently wrong with software at scale
                </h2>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">Enterprise software pays the bills.</span>
                  <span className="block">It keeps the lights on. But something got lost along the way.</span>
                  <span className="block mt-4">That magic.</span>
                  <span className="block">That feeling.</span>
                  <span className="block">That spark.</span>
                  <span className="block"><strong className="font-medium text-zinc-900 dark:text-dark-primary">That joy of creation.</strong></span>
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  What if it could be different?
                </h2>
                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">What if you could build a tool just for you &ndash; because you needed it?</span>
                  <span className="block">What if it didn't require five services and a Terraform config?</span>
                  <span className="block">What if you didn't need to be a "professional developer" to make it happen?</span>
                  <span className="block">What if writing software was like picking up a power drill &ndash; a tool to get something done?</span>
                  <span className="block mt-4">Not a startup. Not a business. Not a side hustle.</span>
                  <span className="block">Just a piece of software that works. That's yours. That you own. That you can share (if you want to).</span>
                </p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  Personal software is coming back
                </h3>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">AI is lowering the barrier to entry.</span>
                  <span className="block">Serverless hosting is erasing the friction.</span>
                  <span className="block">Frameworks like RedwoodSDK are simplifying the plumbing.</span>
                  <span className="block mt-4">You don't need to ask permission anymore.</span>
                  <span className="block">You don't need to scale.</span>
                  <span className="block">You don't need to monetize.</span>
                  <span className="block mt-4">You just need a reason.</span>
                  <span className="block">An itch to scratch.</span>
                  <span className="block">A thing to build.</span>
                  <span className="block mt-4"><strong className="font-medium text-zinc-900 dark:text-dark-primary">It's a personal software revolution. And it's coming.</strong></span>
                </p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  RedwoodSDK is here for that reason
                </h3>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">We started Redwood to help developers build faster.</span>
                  <span className="block">To reduce friction. To accelerate creation.</span>
                  <span className="block mt-4">Now, we're going further.</span>
                  <span className="block">We want to be the toolkit - and the movement - behind personal software.</span>
                  <span className="block">Software you can build, own, share, and modify (like it used to be).</span>
                  <span className="block">Software that solves your problem.</span>
                  <span className="block">Software that doesn't try to lock you in or track your usage or upsell you into a higher tier.</span>
                  <span className="block mt-4">Because here's the thing:</span>
                  <span className="block"><strong className="font-medium text-zinc-900 dark:text-dark-primary">The joy of writing software, and the joy of using it - they should go hand in hand. </strong></span>
                  <span className="block">We want to bring that joy back.</span>
                </p>
              </section>

              <section>
                <h3 className="text-2xl md:text-3xl font-serif font-medium text-zinc-900 dark:text-dark-primary mb-6">
                  The Personal Software Revolution
                </h3>

                <p className="text-zinc-600 dark:text-dark-secondary text-lg leading-relaxed font-light space-y-4">
                  <span className="block">We believe software can be personal again.</span>
                  <span className="block">Not just technically, but philosophically.</span>
                  <span className="block">Owned. Forkable. Shareable. Local. Beautiful.</span>
                  <span className="block">Built for use, not for scale.</span>
                  <span className="block">Built with love, not venture funding.</span>
                  <span className="block">Built for yourself - and maybe a few others.</span>
                  <span className="block mt-4">If this resonates with you, come join us. We're not just building a framework.</span>
                  <span className="block"><strong className="font-medium text-zinc-900 dark:text-dark-primary">We're building a future where software is yours again.</strong></span>
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
