import Header from "src/components/Header";
import HeroImage from "src/components/HeroImage";
import { Navbar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";

export default function PersonalSoftware() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "RedwoodSDK | The React Framework for Cloudfare and personal software",
    "description": "RedwoodSDK is a React Framework for Cloudfare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features.  Its standards-based router, with support for middleware and  interruptors, gives you fine-grained control over every request and  response",
    "url": "https://rwsdk.com/personal-software",
    "mainEntity": {
      "@type": "Article",
      "headline": "The Personal Software Revolution",
      "description": "RedwoodSDK is a React Framework for Cloudfare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features.  Its standards-based router, with support for middleware and  interruptors, gives you fine-grained control over every request and  response",
      "author": {
        "@type": "Organization",
        "name": "RedwoodJS Inc.",
        "url": "https://rwsdk.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RedwoodJS Inc.",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rwsdk.com/images/logo--light.svg"
        }
      },
      "datePublished": "2024-03-20",
      "dateModified": "2024-03-20"
    }
  };

  return (
    <div>
      <Navbar activePage="personal-software" />
      <div className="flex flex-col lg:flex-row min-h-screen font-chivo bg-[#EDEBE6] text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <title>Personal Software | RedwoodSDK</title>
        <meta
          name="description"
          content="The joy of writing software, and the joy of using it - they should go hand in hand. We want to bring that joy back. Join us in the personal software revolution with RedwoodSDK."
        />
        <meta
          property="og:title"
          content="The Personal Software Revolution | RedwoodSDK"
        />
        <meta
          property="og:description"
          content="Build fast, server-driven webapps on Cloudflare with SSR, RSC, and realtime. "
        />
        <meta property="og:url" content="https://rwsdk.com/personal-software" />
        <meta
          property="og:image"
          content="https://rwsdk.com/images/PersonalSoftware-og.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:logo" content="https://rwsdk.com/images/logo--light.svg" />
        <meta property="og:locale" content="en_US" />
        <HeroImage />
        <div className="flex-1 flex flex-col">
          <Header />

          <div className="flex items-center justify-center lg:hidden w-full">
            <img
              src="/images/hero-small.png"
              alt="Hero Image"
              className="w-[188px] h-full"
            />
          </div>

          <main className="flex-1 overflow-y-auto px-6 lg:pr-16 py-8 space-y-12">
            <a href="/" aria-label="RedwoodSDK" className="hidden lg:block">
              <img
                src="/images/logo--light.svg"
                alt="RedwoodSDK"
                className="h-10"
              />
            </a>
            <section className="space-y-6">
              <h1 className="text-[48px] sm:text-[72px] lg:text-[100px] font-bold font-jersey leading-[81%] mix-blend-multiply mb-4 sm:mb-8 grid-bg">
                <div>
                  It started with a blinking cursor
                  <span className="text-orange cursor-blink"> | </span>
                </div>
              </h1>

              <p className="text-base lg:text-md font-light leading-8">
                A blank file.
                <br />
                A few keystrokes.
                <br />
                <code className="mt-1 text-[#F47238] font-mono inline-block">
                  print("hello, world")
                </code>
                <br />
                You ran it.
                <br />
                And the computer responded.
                <br />
                <strong className="font-bold">
                  You told a machine what to do – and it listened.
                </strong>
                <br />
                That moment has sparked millions of journeys.
                <br />
                Kids in bedrooms. Students in labs. Curious minds in internet
                cafés.
                <br />A generation &ndash; and then another &ndash; learned the
                magic of software.
                <br />
                They stayed up too late.
                <br />
                They built games. Tools. Mods. Scripts to make life easier.
                <br />
                They shared zip files on forums. Burned CDs for friends.
                <br />
                They made things.{" "}
                <strong className="font-bold">Because they could!</strong>
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold font-jersey uppercase text-[28px]">
                But the software we built changed
              </h2>

              <p className="text-base lg:text-md leading-8 font-light">
                Small tools made by small teams gave way to big tools and big
                teams.
                <br />
                Suddenly, we have massive platforms backed by massive money.{" "}
                <br />
                We got jobs.
                <br />
                We went to stand ups.
                <br />
                We joined sprint planning calls and added tickets to Jira.
                <br />
                Software became a business.
                <br />
                <strong className="font-bold">
                  And business became the reason software existed.
                </strong>
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold font-jersey uppercase text-[28px]">
                There's nothing inherently wrong with software at scale
              </h2>

              <p className="text-base lg:text-md leading-8 font-light">
                Enterprise software pays the bills.
                <br />
                It keeps the lights on. But something got lost along the way.
                <br />
                That magic.
                <br />
                That feeling.
                <br />
                That spark.
                <br />
                <strong className="font-bold">That joy of creation.</strong>
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold font-jersey uppercase text-[28px]">
                What if it could be different?
              </h2>
              <p className="text-base lg:text-md leading-8 font-light">
                What if you could build a tool just for you &ndash; because you
                needed it?
                <br />
                What if it didn't require five services and a Terraform config?
                <br />
                What if you didn't need to be "professional developer" to make it
                happen?
                <br />
                What if writing software was like picking up a power drill &ndash;
                a tool to get something done?
                <br />
                Not a startup. Not a business. Not a side hustle. <br />
                Just a piece of software that works. That's yours. That you own.
                That you can share (if you want to).
              </p>

              <h3 className="text-xl font-bold font-jersey uppercase text-[28px]">
                Personal software is coming back
              </h3>

              <p className="text-base lg:text-md leading-8 font-light">
                AI is lowering the barrier to entry.
                <br />
                Serverless hosting is erasing the friction.
                <br />
                Frameworks like Redwood are simplifying the plumbing.
                <br />
                You don't need to ask permission anymore.
                <br />
                You don't need to scale.
                <br />
                You don't need to monetize.
                <br />
                You just need a reason.
                <br />
                An itch to scratch.
                <br />
                A thing to build.
                <br />
                <strong className="font-bold">
                  It's a personal software revolution. And it's coming.
                </strong>
              </p>

              <h3 className="text-xl font-bold font-jersey uppercase text-[28px]">
                Redwood is here for that reason
              </h3>

              <p className="text-base lg:text-md leading-8 font-light">
                We started Redwood to help developers build faster.
                <br />
                To reduce friction. To accelerate creation.
                <br />
                Now, we're going further.
                <br />
                We want to be the toolkit - and the movement - behind personal
                software.
                <br />
                Software you can build, own, share, and modify (like it used to
                be).
                <br />
                Software that solves your problem.
                <br />
                Software that doesn't try to lock you in or track your usage or
                upsell you into a higher tier.
                <br />
                Because here's the thing:
                <br />
                <strong className="font-bold">
                  The joy of writing software, and the joy of using it - they
                  should go hand in hand.{" "}
                </strong>
                <br />
                We want to bring that joy back.
              </p>

              <h3 className="text-xl font-bold font-jersey uppercase text-[28px]">
                The Personal Software Revolution
              </h3>

              <p className="text-base lg:text-md leading-8 font-light">
                We believe software can be personal again.
                <br />
                Not just technically, but philosophically.
                <br />
                Owned. Forkable. Shareable. Local. Beautiful.
                <br />
                Built for use, not for scale.
                <br />
                Built with love, not venture funding.
                <br />
                Built for yourself - and maybe a few others.
                <br />
                If this resonates with you, come join us. We're not just building
                a framework. <br />
                <strong className="font-bold">
                  We're building a future where software is yours again.
                </strong>
              </p>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
