import Constants from "../lib/Constants";
import { CloudflareImage } from "./cloudflare-image";
import { link } from "src/shared/links";

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <a
        href={href}
        className={`hover:text-orange focus:text-orange transition-colors ${className || ""
          }`}
      >
        {children}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8 sm:py-12 md:py-[61px] text-white">
      <div className="max-w-[1400px] mx-auto py-8 sm:py-12 md:py-[61px] px-4 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-8 md:gap-20">
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-sans font-bold mb-3">
              About
            </h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-sans space-y-2 text-white/70">
              <FooterLink
                href={link("/blog/:slug", {
                  slug: "why-cloudflare-unified-platform",
                })}
              >
                Why Cloudflare?
              </FooterLink>
              <FooterLink href={link("/personal-software")}>
                Personal Software
              </FooterLink>

              <FooterLink href={link("/blog")}>Blog</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-sans font-bold mb-3">
              Resources
            </h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-sans space-y-2 text-white/70">
              <FooterLink href={Constants.QUICK_START_URL}>
                Quick Start
              </FooterLink>
              <FooterLink href={Constants.DOCS_URL}>Docs</FooterLink>
              <FooterLink href={Constants.CLOUDFLARE_DOCS_URL}>
                Cloudflare RedwoodSDK Docs
              </FooterLink>
              <FooterLink href="https://syntax.fm/show/902/fullstack-cloudflare-with-react-and-vite-redwood-sdk">
                SyntaxFM Interview
              </FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-sans font-bold mb-3">
              Social
            </h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-sans space-y-2 text-white/70">
              <FooterLink
                href={Constants.GITHUB_REPO}
                className="flex items-center"
              >
                <img
                  src="/images/github.svg"
                  alt="Github"
                  className="w-4 h-4 inline-block mr-2 invert"
                />{" "}
                GitHub
              </FooterLink>
              <FooterLink
                href={Constants.DISCORD_URL}
                className="flex items-center"
              >
                <img
                  src="/images/discord.svg"
                  alt="Discord"
                  className="w-4 h-4 inline-block mr-2"
                />{" "}
                Discord
              </FooterLink>
              <FooterLink href={Constants.X_URL} className="flex items-center">
                <img
                  src="/images/x.svg"
                  alt="X"
                  className="w-4 h-4 inline-block mr-2"
                />{" "}
                X
              </FooterLink>
            </ul>
          </div>
          <div className="flex flex-col gap-4 max-w-[600px]">
            <CloudflareImage
              imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
              alt="logo"
              className="w-[186px] invert"
            />
            <p className="text-[14px] sm:text-[12px] font-sans font-light text-white/60">
              A simple framework for humans. Server-first React with zero magic.
              Built to stay understandable. RedwoodSDK begins as a Vite plugin
              that unlocks SSR, React Server Components, Server Functions, and
              realtime features. Its standards-based router, with support for
              middleware and interruptors, gives you fine-grained control over
              every request and response. With built-in access to Cloudflare
              Workers, D1 (Database), R2 (Storage), Queues, AI, and full local
              emulation via Miniflare, development feels just like production.
            </p>
            <p className="text-[14px] sm:text-[12px] font-sans text-white/40">
              Copyright © 2026 RedwoodJS Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
