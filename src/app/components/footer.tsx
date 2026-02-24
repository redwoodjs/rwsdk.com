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
        className={`hover:text-white transition-colors ${className || ""
          }`}
      >
        {children}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2b1810] border-t border-[#4a2b1f] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div>
            <h4 className="font-mono text-xs text-zinc-500 tracking-widest mb-8 uppercase">
              About
            </h4>
            <ul className="list-none text-sm text-zinc-400 font-light space-y-4">
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
            <h4 className="font-mono text-xs text-zinc-500 tracking-widest mb-8 uppercase">
              Resources
            </h4>
            <ul className="list-none text-sm text-zinc-400 font-light space-y-4">
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
            <h4 className="font-mono text-xs text-zinc-500 tracking-widest mb-8 uppercase">
              Social
            </h4>
            <ul className="list-none text-sm text-zinc-400 font-light space-y-4">
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
          <div className="md:col-span-1 text-xs text-zinc-500 leading-relaxed font-light">
            <p className="mb-6">
              A simple framework for humans. Server-first React with zero magic.
              Built to stay understandable. RedwoodSDK begins as a Vite plugin
              that unlocks SSR, React Server Components, Server Functions, and
              realtime features. Its standards-based router, with support for
              middleware and interruptors, gives you fine-grained control over
              every request and response. With built-in access to Cloudflare
              Workers, D1 (Database), R2 (Storage), Queues, AI, and full local
              emulation via Miniflare, development feels just like production.
            </p>
            <p className="text-zinc-600 mt-6">
              Copyright © 2026 RedwoodJS Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
}
