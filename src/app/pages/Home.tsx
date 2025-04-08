// import Constants from '../lib/Constants';
// import GithubButton from '../components/GitHubButton';
// import { Newsletter } from 'src/components/Newsletter';

import Constants from "src/lib/Constants";


function Home() {

  return (
    <div>
      {/* Nav bar */}
      <div className="flex flex-col sm:flex-row justify-between sticky top-0 bg-baige z-10 items-center py-4 px-4 sm:px-8">
        <img src="/images/logo--light.svg" alt="logo" className="w-[140px] sm:w-[186px]" />
        <div className="flex gap-2 sm:gap-4 font-jersey text-[16px] sm:text-[20px] mt-4 sm:mt-0">
          <a href={Constants.DOCS_URL} className="hover:text-orange-dark">Docs</a>
          <span className="text-orange">/</span>
          <a href={Constants.DISCORD_URL} className="hover:text-orange-dark">Discord</a>
          <span className="text-orange-dark">/</span>
          <a href={Constants.GITHUB_URL} className="hover:text-orange-dark">Github</a>
        </div>
      </div>
      {/* Hero section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center py-8 sm:py-16 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-4 max-w-[743px]">
          <h1 className="text-[48px] sm:text-[72px] lg:text-[100px] font-bold font-jersey leading-[81%] mix-blend-multiply mb-4 sm:mb-8 grid-bg">GO FROM CONCEPT TO CLOUD IN A DAY<span className="text-orange">|</span></h1>
          <p className="text-[24px] sm:text-[32px] font-jersey">The composable framework for building server-side web apps on Cloudflare. A smoother path from idea to reality.</p>
          <p className="text-[24px] sm:text-[32px] font-jersey"><a href={Constants.DOCS_URL} className="text-orange">Join the personal software revolution →</a></p>
        </div>
        <div className="w-full lg:w-auto">
          <img src="/images/hero-start.png" alt="hero" className="w-full h-auto" />
        </div>
      </div>
      {/* Features section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center py-8 sm:py-16 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <img src="/images/redwoodsdk-dx.png" alt="feature" className="w-full lg:w-auto h-auto" />
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <p className="text-[24px] sm:text-[32px] font-jersey">Let's make it personal</p>
            <p className="text-[16px] sm:text-[18px] font-chivo">
              We started Redwood to help developers build faster, reduce friction and accelerate creation. Now, we're going further. We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify.
            </p>
          </div>
          <div>
            <p className="text-[24px] sm:text-[32px] font-jersey">An app a day, keeps the boredom away</p>
            <p className="text-[16px] sm:text-[18px] font-chivo">
              With a framework that brings frontend, backend, database and deployment together in one cohesive experience, you can literally build something awesome every day!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;