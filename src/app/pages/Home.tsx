// import Constants from '../lib/Constants';
// import GithubButton from '../components/GitHubButton';
// import { Newsletter } from 'src/components/Newsletter';

import Constants from "src/lib/Constants";
import { CloudflareImage, ResponsiveCloudflareImage, CloudflareBackground } from "src/components/CloudflareImage";


export default function Home() {
  return (
    <div>
      <title>RedwoodSDK - From Concept to Cloud in a Day</title>

      {/* Nav bar */}
      <div className="flex flex-col sm:flex-row justify-between sticky top-0 bg-baige z-99 items-center py-4 px-4 sm:px-8">
        <CloudflareImage
          imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
          alt="logo"
          className="w-[140px] sm:w-[186px]"
        />
        <div className="flex gap-2 sm:gap-4 font-jersey text-[16px] sm:text-[20px] mt-4 sm:mt-0">
          <a href={Constants.DOCS_URL} className="hover:text-orange-dark">Docs</a>
          <span className="text-orange">/</span>
          <a href={Constants.DISCORD_URL} className="hover:text-orange-dark">Discord</a>
          <span className="text-orange-dark">/</span>
          <a href={Constants.GITHUB_URL} className="hover:text-orange-dark">Github</a>
          <span className="text-orange-dark">/</span>
          <a href="/personal-software" className="hover:text-orange-dark">Personal Software</a>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative min-h-screen w-full mb-20">
        <CloudflareImage
          imageId="09339bc3-132e-456d-2a2d-cd3457dba700"
          alt="Family using RedwoodSDK application"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 sm:px-8 text-center max-w-[1260px] mx-auto">
          <h1 className="text-[48px] sm:text-[72px] lg:text-[100px] text-[var(--color-light)] font-bold font-jersey leading-[81%] mix-blend-multiply mb-[182px]">This could be the start of something small</h1>
        </div>
      </div>

      {/* Call to action section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center justify-center py-8 sm:py-16 px-4 sm:px-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-4 max-w-[743px]">
          <h2 className="text-[48px] sm:text-[72px] lg:text-[80px] font-bold font-jersey leading-[81%] mix-blend-multiply mb-4 sm:mb-8 grid-bg">GO FROM CONCEPT TO CLOUD IN A DAY<span className="text-orange cursor-blink">|</span></h2>
          <p className="text-[24px] sm:text-[32px] font-jersey">
            <span className="text-orange">RedwoodSDK is a composable framework for building server-side web apps on Cloudflare.</span> It begins
            as a Vite plugin that unlocks SSR, React Server Components, Server Functions and realtime features.
          </p>
          <p className="text-[18px] sm:text-[18px] font-light font-chivo">
            Local deveopment feels native. Production feels magic. No suprises. No config hell. No "it works on my machine".
          </p>
        </div>

        <CloudflareBackground
          imageId="0fa4e819-9895-4368-0883-56c1e3722a00"
          className="w-full h-[514px] bg-center bg-no-repeat bg-contain flex items-center justify-center"
        >
          <a 
            href={Constants.DOCS_URL} 
            className="inline-flex items-center justify-center text-white border border-2 border-orange bg-black px-8 py-2 font-jersey text-[24px] mb-20"
          >
            GET STARTED!
          </a>
        </CloudflareBackground>
      </section>

      {/* Features section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center py-8 sm:py-16 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <CloudflareImage
          imageId="065200fd-e827-4deb-57b1-0fc42cadab00"
          alt="RedwoodSDK Developer Experience Diagram"
          className="w-full lg:w-auto h-auto"
        />
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-jersey">Let's make it personal</h2>
            <p className="text-[16px] sm:text-[18px] font-chivo">
              We started Redwood to help developers build faster, reduce friction and accelerate creation. Now, we're going further. We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify.
            </p>
          </div>
          <div>
            <h3 className="text-[24px] sm:text-[32px] font-jersey">An app a day, keeps the boredom away</h3>
            <p className="text-[16px] sm:text-[18px] font-chivo">
              With a framework that brings frontend, backend, database and deployment together in one cohesive experience, you can literally build something awesome every day!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}