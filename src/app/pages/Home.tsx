import Constants from "src/lib/Constants";
import {
  CloudflareImage,
  CloudflareBackground,
} from "src/components/CloudflareImage";
import { Navbar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";
import { featureBlocks } from "src/data/features";
import { SDKButton } from "src/components/SDKButton";
import { Newsletter } from "src/components/Newsletter";
import { Copy } from "src/components/Copy";
import StyledCodeBlock from "src/components/StyledCodeBlock";
import { link } from "src/shared/links";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <meta
        property="og:title"
        content="RedwoodSDK: A simple framework for humans"
      />
      <meta
        property="og:description"
        content="Server-first React with zero magic. Built to stay understandable."
      />
      <meta
        property="og:image"
        content="https://rwsdk.com/images/Homepage-og.png"
      />
      <meta property="og:url" content="https://rwsdk.com" />
      <meta property="og:site_name" content="RedwoodSDK" />
      <meta
        property="og:image:alt"
        content="RedwoodSDK: A simple framework for humans"
      />
      <Navbar />
      {/* Hero section */}
      <div className="relative min-h-[70vh] sm:min-h-screen w-full mb-10 sm:mb-20 top-[-60px]">
        <CloudflareImage
          imageId="83ce73f8-4da8-4812-d10a-81f3e3610c00"
          alt="Family using RedwoodSDK"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-[70vh] sm:min-h-screen px-3 sm:px-4 md:px-8 text-center max-w-[1260px] mx-auto">
          <div className="mb-[100px] sm:mb-[100px] md:mb-[63px] flex flex-col gap-3 sm:gap-8">
            <h1 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[90px] text-baige font-bold font-playfair leading-[81%]">
              A simple framework for humans
            </h1>
            <h3 className="text-[18px] sm:text-[24px] md:text-[32px] font-bold font-noto text-center leading-[0.9] text-orange-light max-w-[1060px] mx-auto">
              Server-first React with zero magic. Built to stay understandable.
            </h3>
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center font-bold font-noto">
                <SDKButton size="large" text="Read the docs" />
              </div>
              <span className="text-[12px] sm:text-[14px] font-noto text-baige bg-black/50 px-3 py-1 rounded-full border border-baige/30">
                Cloudflare only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <section className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 max-w-[743px] text-center lg:text-left">
          <h2 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[65px] font-bold font-playfair leading-[81%] mb-3 grid-bg py-4 px-2">
            From concept to cloud
          </h2>

          <p className="text-[18px] sm:text-[24px] md:text-[32px] font-noto font-medium leading-[1]">
            It begins as a Vite plugin that unlocks SSR, React Server
            Components, Server Functions, and realtime features.
            <a
              href={link("/personal-software")}
              className="text-orange hover:text-orange-light inline-flex items-center font-noto font-bold mt-4 "
            >
              And it ends with you building something awesome!
            </a>
          </p>

          <div className="bg-black mb-4 p-4 rounded-lg font-mono text-[16px] sm:text-[18px] md:text-[20px] flex items-center gap-2">
            <span className="text-orange">$</span>{" "}
            <span className="text-orange-light flex-1">
              npx create-rwsdk my-project-name
            </span>
            <span className="text-orange-light">
              <Copy text="npx create-rwsdk my-project-name" />
            </span>
          </div>
        </div>

        <CloudflareBackground
          imageId="ab6519e2-6484-4c91-6095-c49f9268ca00"
          className="w-full sm:w-[80%] lg:w-full h-[300px] sm:h-[400px] md:h-[514px] bg-center bg-no-repeat bg-contain flex items-center justify-center hidden lg:block"
        />
      </section>

      {/* Features section, 3 columns */}
      <section className="max-w-[1300px] mx-auto">
        <h3 className="text-[26px] sm:text-[48px] md:text-[58px] lg:text-[65px] font-light font-playfair leading-[81%] mb-3 grid-bg py-4 px-2  max-w-[1400px] mx-auto">
          One Response to build them all
        </h3>
        {featureBlocks.map((block, idx) => (
          <div key={block.title}>
            <div
              className={`flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-center py-6 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/3 text-left">
                <h3 className="font-noto font-bold text-[20px] sm:text-[24px] md:text-[32px] mb-2">
                  {block.title}
                </h3>
                <ul className="list-none text-[14px] sm:text-[16px]">
                  {block.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-2/3">
                <StyledCodeBlock codeBlocks={block.code ?? []} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="col-span-1 hidden sm:block">
          <div className="w-full">
            <CloudflareImage
              imageId="b62951b7-cb78-41ea-cec8-f65032610a00"
              alt="RedwoodSDK Developer Experience Diagram"
              className="w-full sm:w-[80%] lg:w-auto h-auto"
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h3 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[65px] font-light font-playfair leading-[81%] mb-3 grid-bg py-4 px-2  max-w-[1400px] mx-auto">
              React Server Components - as they're meant to be
            </h3>
            <p className="text-[18px] sm:text-[24px] md:text-[32px] font-noto font-bold leading-[1]">
              React Server Components are a powerful way to build server-side
              web apps on Cloudflare.
            </p>
            <p>
              Everything is server-first by default. Your components run on the
              server where they belong, streaming HTML straight to the browser.
              When you need interactivity, just mark a component with use
              client. It's the same mental model you'd use anywhere else—only
              now it runs on the edge.
            </p>
            <p>
              {" "}
              There's no need to wrestle with bundlers, patch frameworks, or
              manually split code between server and client. RedwoodSDK treats
              React's directives as first-class citizens and integrates them
              seamlessly with Vite and Cloudflare Workers. The result is
              lightning-fast time-to-interactive, zero boilerplate, and a dev
              environment that mirrors production—without any extra setup.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16 items-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-left">
            <h3 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[65px] font-light font-playfair leading-[81%] mb-3 grid-bg">
              Concept to Cloudflare
            </h3>
            <p className="text-[18px] sm:text-[24px] md:text-[32px] font-noto font-bold leading-[1]">
              RedwoodSDK is built for Cloudflare from the first line of code.
            </p>
            <p>
              No adapters, no shims. What runs locally is what runs in
              production. Development uses Miniflare to emulate Cloudflare
              Workers with uncanny accuracy. You're not faking the edge. You're
              building on it. No config drift. No "it worked on my machine."
              Just a clean path from idea to deploy.
            </p>
          </div>
        </div>
        <div className="col-span-1 hidden sm:block">
          <CloudflareImage
            imageId="b611b4f6-cd1c-41a2-cf41-7a86cb23e500"
            alt="RedwoodSDK Developer Experience Diagram"
            className="w-full sm:w-[80%] lg:w-auto h-[70%]"
          />
        </div>
      </section>

      <section className="py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <h3 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[65px] font-light font-playfair leading-[81%] mb-3 grid-bg py-4 px-2 mx-auto">
            PS… Built for Builders
          </h3>

          <p className="text-[18px] sm:text-[24px] md:text-[32px] font-noto font-bold leading-[1]">
            RedwoodSDK is for people who write software they own.
          </p>
          <p>
            It's built on browser standards, not vendor abstractions—just native
            Web APIs and predictable behavior from request to response.
          </p>
          <p>
            Bring your own tools. Use realtime out of the box. Run locally on
            Cloudflare's stack with zero config—D1, R2, Queues, Workers AI, and
            more.
          </p>
          <p>
            <span className="font-bold text-[#8B2243]">No wrappers.</span>
            <span className="font-bold text-[#F37337]">No black boxes.</span>
            <span className="font-bold text-[#FFAD48]">Just flow.</span>
          </p>
        </div>
      </section>

      {/* Newsletter section */}
      <Newsletter />

      {/* Footer section */}
      <Footer />
    </div>
  );
}
