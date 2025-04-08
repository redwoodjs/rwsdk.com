// import Constants from '../lib/Constants';
// import GithubButton from '../components/GitHubButton';
// import { Newsletter } from 'src/components/Newsletter';

import Constants from "src/lib/Constants";
import { CloudflareImage, ResponsiveCloudflareImage, CloudflareBackground } from "src/components/CloudflareImage";
import { Navbar } from 'src/components/Navbar';


export default function Home() {
  return (
    <div>
      <title>RedwoodSDK - From Concept to Cloud in a Day</title>

      <Navbar />

      {/* Hero section */}
      <div className="relative min-h-[70vh] sm:min-h-screen w-full mb-10 sm:mb-20">
        <CloudflareImage
          imageId="09339bc3-132e-456d-2a2d-cd3457dba700"
          alt="Family using RedwoodSDK application"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-[70vh] sm:min-h-screen px-3 sm:px-4 md:px-8 text-center max-w-[1260px] mx-auto">
          <div className="mb-[100px] sm:mb-[150px] md:mb-[182px] flex flex-col gap-3 sm:gap-4">
            <h1 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[100px] text-[var(--color-light)] font-bold font-jersey leading-[81%] mix-blend-multiply">THIS COULD BE THE START OF SOMETHING SMALL</h1>
            <h3 className="text-[18px] sm:text-[24px] md:text-[32px] font-jersey text-center leading-[0.9] text-[var(--color-light)] max-w-[600px] mx-auto">
              RedwoodSDK is a composable framework for building server-side web apps on Cloudflare.
            </h3>
            <div className="flex justify-center">
              <a 
                href={Constants.DOCS_URL}
                className="text-white border border-2 border-orange bg-black px-4 sm:px-6 md:px-8 py-2 font-jersey text-[18px] sm:text-[20px] md:text-[24px] w-fit hover:bg-orange-dark transition-colors"
              >
                GET STARTED!
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <section className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 max-w-[743px] text-center lg:text-left">
          <h2 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[80px] font-bold font-jersey leading-[81%] mix-blend-multiply mb-3 sm:mb-4 md:mb-8 grid-bg">GO FROM CONCEPT TO CLOUD IN A DAY<span className="text-orange cursor-blink">|</span></h2>
          <p className="text-[18px] sm:text-[24px] md:text-[32px] font-jersey">
            <span className="text-orange">RedwoodSDK is a composable framework for building server-side web apps on Cloudflare.</span> It begins
            as a Vite plugin that unlocks SSR, React Server Components, Server Functions and realtime features{' '}
            <a href={Constants.DOCS_URL} className="text-orange hover:text-orange-dark inline-flex items-center">
              <span className="ml-2 text-[24px] sm:text-[28px] md:text-[32px]">→</span>
            </a>
          </p>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] font-light font-chivo">
            Local deveopment feels native. Production feels magic. No suprises. No config hell. No "it works on my machine".
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              href={Constants.DOCS_URL}
              className="text-white border border-2 border-orange bg-black px-4 sm:px-6 md:px-8 py-2 font-jersey text-[18px] sm:text-[20px] md:text-[24px] w-fit hover:bg-orange-dark transition-colors"
            >
              GET STARTED!
            </a>
          </div>
        </div>

        <CloudflareBackground
          imageId="0fa4e819-9895-4368-0883-56c1e3722a00"
          className="w-full sm:w-[80%] lg:w-full h-[300px] sm:h-[400px] md:h-[514px] bg-center bg-no-repeat bg-contain flex items-center justify-center hidden lg:block"
        />
      </section>

      {/* Features section, 3 columns */}
      <section className="w-full grid-bg py-8 sm:py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-center py-6 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6 bg-baige p-3 sm:p-4">
            <h2 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-center leading-[0.9] mb-2 sm:mb-4">React Server Components <br /> <span className="text-orange">Reimagined</span></h2>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo">
              We started Redwood to help developers build faster, reduce friction and accelerate creation. Now, we're going further. We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 bg-baige p-3 sm:p-4">
            <h2 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-center leading-[0.9] mb-2 sm:mb-4">Concept to <br /> <span className="text-orange">Cloudflare</span></h2>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo">
              We started Redwood to help developers build faster, reduce friction and accelerate creation. Now, we're going further. We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 bg-baige p-3 sm:p-4 text-center">
            <h2 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-center leading-[0.9] mb-2 sm:mb-4">One Response <br /> <span className="text-orange">to Build Them All</span></h2>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo">
              We started Redwood to help developers build faster, reduce friction and accelerate creation. Now, we're going further. We want to be the framework - and the movement - behind personal software.  Software you can build, own, share, and modify.
            </p>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
        <CloudflareImage
          imageId="b3b61460-b3e5-4a95-08f4-6c8553c4f000"
          alt="RedwoodSDK Developer Experience Diagram"
          className="w-full sm:w-[80%] lg:w-auto h-auto"
        />
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey">Built for <span className="text-orange">Builders</span></h3>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo font-bold ">
              RedwoodSDK is your canvas for personal software. Whether you're shipping a side project, running a micro-SaaS, or building the next big thing—this stack stays out of your way.
            </p>
            <ul className="list-none text-[14px] sm:text-[16px] font-chivo">
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Bring your own tools: Vite, Tailwind, Prisma, YOU DO YOU</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Realtime support, baked in—not bolted on</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Predictable, composable responses that just work</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Build software you own, on infrastructure you control</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey">Ship faster, <span className="text-orange">Flow Longer</span></h3>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo font-bold">
              With a framework that brings frontend, backend, database and deployment together in one cohesive experience, you can literally build something awesome every day!
            </p>
            <ul className="list-none text-[14px] sm:text-[16px] font-chivo">
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>No wrappers. No black boxes. Just tools that work as they should.</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>HMR Live reloads. Type safety. Cloudflare-native from the jump</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Familiar tools like Vite and JSX, supercharged for the edge</span>
              </li>
              <li className="flex items-baseline">
                <span className="text-orange inline-block min-w-[20px]">*</span>
                <span>Work locally in the same runtime as production: D1 (SQL), R2 (object storage), Queues, Workers AI, and more—zero config required</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}