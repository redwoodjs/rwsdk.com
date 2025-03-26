import Constants from '../lib/Constants';

export function Home() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div>
      <header>
        <nav className="p-8">
          <ul className="flex items-center uppercase font-mono font-bold gap-2 md:gap-4 text-sm md:text-base">
            <li className="hidden md:block"><div className="bullet"></div></li>
            <li><a className="hover:text-mySin" href={Constants.QUICK_START_URL}>Quick Start</a></li>
            <li className="hidden md:block"><div className="bullet"></div></li>
            <li><a className="hover:text-mySin" href={Constants.DOCS_URL}>Doc<span className="inline md:hidden">s</span><span className="hidden md:inline">umentation</span></a></li>
            <li><div className="bullet"></div></li>
            <li><a className="hover:text-mySin" href={Constants.TUTORIAL_URL}>Tutorial</a></li>
            <li className="hidden md:block"><div className="bullet"></div></li>
          </ul>
        </nav>

        <div className="fixed right-0 top-0">
          <a href={Constants.GITHUB_REPO}>
            <img src="/images/github-corner.svg" alt="GitHub" />
          </a>
        </div>
      </header>
      <main className="page">
        <img src="/images/logo--dark.svg" alt="RedwoodSDK" className="mx-auto mb-[60px]" />

        {/* newsletter form */}
        <div className="border-mySin border-[3px] mb-10 md:mb-[100px]">
          <header className="px-4 py-5 md:p-10 pt-6 md:pt-12 relative border-b-[3px] border-mySin">
            <h2 className="font-bold uppercase bg-mySin text-black px-5 leading-[1.75] inline-block absolute left-1/2 -translate-x-1/2 -top-4 whitespace-nowrap">BE THE FIRST TO KNOW</h2>
            <p className="text-sm md:text-base">Sign up for our newsletter to receive exclusive updates on our progress, early access opportunities, and comprehensive guides as we approach launch. Be among the first to try RedwoodSDK and see how it makes your development workflow faster and more enjoyable.</p>
          </header>
          <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-x-[72px]">
            <div className="field mx-5 md:ml-10 md:mr-0">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="field mx-5 md:mr-10 md:ml-0">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <footer className="md:col-span-2 bg-alpine border-t-[3px] border-mySin flex justify-end">
              <button type="submit" className="bg-mySin text-black px-5 py-2 uppercase font-bold flex items-center gap-2 hover:bg-cinnabar hover:text-white border-l-mySin border-l-[3px] cursor-pointer">
                <img src="/images/triangle.svg" alt="triangle right" />
                Subscribe
              </button>
            </footer>
          </form>
        </div>

        {/* letter */}
        <div className="letter">
          <p>Today, we're sharing an important step forward for Redwood. To achieve our vision of empowering the next generation of personal software, we're aligning our efforts around two clearly defined paths: Redwood GraphQL and Redwood SDK.</p>

          <h2>Why We're Making This Change</h2>

          <p>From the start, RedwoodJS was built to simplify full-stack web development. We've seen incredible growth and community enthusiasm, but it's clear we have an opportunity to pursue a broader challenge: enabling people to build, own, and distribute their own software without the constraints of traditional SaaS.</p>

          <p>To fully pursue this vision, we're launching Redwood SDK, a new framework that will become the foundation for this personal software revolution. We'll be sharing more about this in the weeks to come.</p>

          <p>At the same time, we deeply value the users and teams who've invested heavily in Redwood. To minimize disruption and provide clarity going forward, we're renaming the existing RedwoodJS framework to Redwood GraphQL, reflecting its strength as a mature, stable framework built around GraphQL.</p>

          <h3>What this means for current Redwood users:</h3>

          <ul>
            <li>
              <strong><em>Continuity and Stability:</em></strong><br />
              Redwood GraphQL (formerly the RedwoodJS you use today) will continue to receive security patches and critical updates, ensuring you can confidently rely on it for your projects.
            </li>
            <li>
              <strong><em>Integrations:</em></strong><br />
              Over the coming months, we'll progressively unbundle third-party integrations—such as the authentication providers, Storybook, and others. These integrations will then be independently maintained by their original teams or the community, giving you greater flexibility, faster updates, and control over which integrations you adopt and support.
            </li>
            <li>
              <strong><em>Community Ownership:</em></strong><br />
              We will actively nurture and support third-party providers and the broader Redwood community in taking ownership of these integrations.
            </li>
          </ul>

          <h3>Looking Ahead: The Redwood SDK</h3>

          <p>Redwood SDK represents our commitment to the future we want to build - a software ecosystem designed for personal and modular software creation, distribution, and ownership. It will harness the power of modern serverless infrastructure, AI-driven development tools, and open ecosystems, ensuring that building personal and owned software is accessible to everyone.</p>

          <p>This is more than just technology. It's about rethinking how software gets created and shared. It's a commitment to making software personal again.</p>

          <p>We’ll share more about the Redwood SDK in the coming weeks. Until then, those of you are currently using Redwood GraphQL can rest assured - our intention is to ensure that it remains secure, reliable, and ready to power your projects long-term.</p>

          <p>Thanks for your continued support and excitement for the journey ahead.</p>

          <div className="flex items-center gap-4">
            <img src="/images/avatar-peter.jpg" alt="Peter" srcSet="/images/avatar-peter@2x.jpg 2x, /images/avatar-peter.jpg 1x" className="size-[76px] rounded-full" />
            <p className="!mb-0">— Peter and the Redwood team</p>
          </div>
        </div>

      </main>

      <footer className="page text-center mb-10">
        <hr />
        <p className="mb-5">Copyright &copy; {getCurrentYear()}. RedwoodJS Inc. All Rights Reserved.</p>
        <ul className="flex justify-center items-center uppercase font-mono font-bold gap-4 flex-wrap md:flex-nowrap">
          <li><div className="bullet"></div></li>
          <li><a href={Constants.GITHUB_REPO}>GITHUB</a></li>
          <li><div className="bullet"></div></li>
          <li><a href={Constants.LINKEDIN_URL}>LINKEDIN</a></li>
          <li><div className="bullet"></div></li>
          <li><a href={Constants.YOUTUBE_URL}>YOUTUBE</a></li>
          <li><div className="bullet"></div></li>
          <li><a href={Constants.BLUESKY_URL}>BLUESKY</a></li>
          <li><div className="bullet"></div></li>
          <li><a href={Constants.DISCORD_URL}>DISCORD</a></li>
          <li><div className="bullet"></div></li>
        </ul>
      </footer>
    </div>
  );
}
