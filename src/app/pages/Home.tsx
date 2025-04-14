import Constants from "src/lib/Constants";
import { CloudflareImage, CloudflareBackground } from "src/components/CloudflareImage";
import { Navbar } from 'src/components/Navbar';
import { Footer } from 'src/components/Footer';
import { featureBlocks, FeatureBlock } from 'src/data/features';
import { builderSections, BuilderSection } from 'src/data/builders';
import { SDKButton } from 'src/components/SDKButton';
import React from 'react';
import { Newsletter } from "src/components/Newsletter";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RedwoodSDK",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cloudflare Workers",
    "description": "RedwoodSDK is a React Framework for Cloudfare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features. Its standards-based router, with support for middleware and interruptors, gives you fine-grained control over every request and response.",
    "keywords": "RedwoodSDK, RedwoodJS, React, TypeScript, Prisma, TailwindCSS, Cloudflare Workers",
    "url": "https://rwsdk.com",
    "logo": "https://rwsdk.com/images/logo--light.svg",
    "sameAs": [
      Constants.GITHUB_REPO,
      Constants.DISCORD_URL
    ],
    "featureList": featureBlocks.map(block => ({
      "@type": "SoftwareFeature",
      "name": `${block.title} ${block.titleHighlight}`,
      "description": block.description,
      "featureList": block.items
    })),
    "applicationSubCategory": "Web Framework",
    "operatingSystemVersion": "Cloudflare Workers",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "RedwoodJS Inc.",
      "url": "https://rwsdk.com",
      "logo": "https://rwsdk.com/images/logo--light.svg"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <title>RedwoodSDK | The React Framework for Cloudfare</title>
      <meta property="og:title" content="RedwoodSDK | The React Framework for Cloudflare" />
      <meta property="og:description" content="RedwoodSDK is a React Framework for Cloudflare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features.  Its standards-based router, with support for middleware and  interruptors, gives you fine-grained control over every request and  response." />
      <meta property="og:image" content="https://rwsdk.com/images/Homepage-og.png" />
      <meta property="og:url" content="https://rwsdk.com" />
      <meta property="og:site_name" content="RedwoodSDK" />
      <meta property="og:image:alt" content="RedwoodSDK - The React Framework for Cloudflare" />
      <Navbar />
      {/* Hero section */}
      <div className="relative min-h-[70vh] sm:min-h-screen w-full mb-10 sm:mb-20 fixed top-[-60px]">

        <CloudflareImage
          imageId="83ce73f8-4da8-4812-d10a-81f3e3610c00"
          alt="Family using RedwoodSDK application"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-[70vh] sm:min-h-screen px-3 sm:px-4 md:px-8 text-center max-w-[1260px] mx-auto">
          <div className="mb-[100px] sm:mb-[100px] md:mb-[63px] flex flex-col gap-3 sm:gap-8">
            <h1 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[90px] text-baige font-bold font-jersey leading-[81%]">THIS COULD BE THE START OF SOMETHING SMALL</h1>
            <h3 className="text-[18px] sm:text-[24px] md:text-[40px] font-jersey text-center leading-[0.9] text-orange-light max-w-[1060px] mx-auto">
              RedwoodSDK is a React Framework for building server-side web apps on Cloudflare.
            </h3>
            <div className="flex justify-center">
              <SDKButton size="large" text="READ THE DOCS" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <section className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 max-w-[743px] text-center lg:text-left">
          <h2 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[80px] font-bold font-jersey leading-[81%] mb-3 grid-bg py-4 px-2">
            GO FROM CONCEPT TO CLOUD <span className="text-orange-light cursor-blink">|</span>
          </h2>

          <div className="bg-black mb-4 p-4 rounded-lg font-mono text-[16px] sm:text-[18px] md:text-[20px]">
            <span className="text-orange">$</span> <span className="text-orange-light">npm release</span>
          </div>
          
          <p className="text-[18px] sm:text-[24px] md:text-[32px] font-jersey leading-[1]">
            It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features, <a href="/personal-software" className="text-orange hover:text-orange-light inline-flex items-center font-jersey">
              and it ends with you building something awesome!
            </a>
          </p>
        </div>

        <CloudflareBackground
          imageId="0fa4e819-9895-4368-0883-56c1e3722a00"
          className="w-full sm:w-[80%] lg:w-full h-[300px] sm:h-[400px] md:h-[514px] bg-center bg-no-repeat bg-contain flex items-center justify-center hidden lg:block"
        />
      </section>

      {/* Features section, 3 columns */}
      <section className="w-full grid-bg">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-16 items-stretch justify-center py-6 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
          {featureBlocks.map((block: FeatureBlock, index: number) => (
            <div key={index} className="flex flex-col gap-4 sm:gap-6 bg-baige p-3 sm:p-4 text-center w-full md:w-1/3">
              <h2 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-center leading-[0.9] mb-2 sm:mb-4">
                {block.title} <br /> <span className="text-purple">{block.titleHighlight}</span>
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo font-medium">
                {block.description}
              </p>
              <ul className="list-none text-[14px] sm:text-[16px] font-chivo text-center sm:text-left">
                {block.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex}>
                    <span className="text-purple font-[200] inline-block min-w-[20px]">→</span>
                    {item.includes('<Page />') ? (
                      <>
                        {item.split('<Page />').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="whitespace-nowrap">&lt;Page /&gt;</span>}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center justify-center py-8 sm:py-8 md:py-16 px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
        <CloudflareImage
          imageId="b3b61460-b3e5-4a95-08f4-6c8553c4f000"
          alt="RedwoodSDK Developer Experience Diagram"
          className="w-full sm:w-[80%] lg:w-auto h-auto"
        />

        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          {builderSections.map((section: BuilderSection, index: number) => (
            <div key={index} className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey">{section.title} <span className="text-purple">{section.titleHighlight}</span></h3>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-chivo font-medium">
                {section.description}
              </p>
              <ul className="list-none text-[14px] sm:text-[16px] font-chivo">
                {section.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="flex items-baseline">
                    <span className="text-purple inline-block min-w-[20px]">▶︎</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <SDKButton size="large" />

        </div>
      </section>

      {/* Newsletter section */}
      <Newsletter />

      {/* Footer section */}
      <Footer />
    </div>
  );
}