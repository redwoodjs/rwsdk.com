import Constants from '../lib/Constants';
import { CloudflareImage } from './CloudflareImage';

export function Footer() {
  return (
    <footer className="bg-orange-light border-t border-orange-dark py-8 sm:py-12 md:py-[61px]">
      <div className="max-w-[1400px] mx-auto py-8 sm:py-12 md:py-[61px] px-4 sm:px-8 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-8 md:gap-20">
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-purple mb-3">About</h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-chivo space-y-2">
              <li>
                <a href="/personal-software" className="hover:text-baige font-jersey transition-colors">
                  Personal Software
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-purple mb-3">Resources</h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-chivo space-y-2">
              <li>
                <a href={Constants.DOCS_URL} className="hover:text-baige font-jersey transition-colors">
                  Docs
                </a>
              </li>
              <li>
                <a href={Constants.QUICK_START_URL} className="hover:text-baige font-jersey transition-colors">
                  Quick Start
                </a>
              </li>
              <li>
                <a href={Constants.REDWOODJS_URL} className="hover:text-baige font-jersey transition-colors">
                  RedwoodJS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-jersey text-purple mb-3">Social</h3>
            <ul className="list-none text-[16px] sm:text-[20px] font-chivo space-y-2">
              <li>
                <a href={Constants.GITHUB_REPO} className="hover:text-baige flex items-center font-jersey transition-colors">
                  <img src="/images/github.svg" alt="Github" className="w-4 h-4 inline-block mr-2" /> Github
                </a>
              </li>
              <li>
                <a href={Constants.DISCOURSE_URL} className="hover:text-baige flex items-center font-jersey transition-colors">
                  <img src="/images/discourse.svg" alt="Discourse" className="w-4 h-4 inline-block mr-2" /> Discourse
                </a>
              </li>
              <li>
                <a href={Constants.YOUTUBE_URL} className="hover:text-baige flex items-center font-jersey transition-colors">
                  <img src="/images/youtube.svg" alt="YouTube" className="w-4 h-4 inline-block mr-2" /> YouTube
                </a>
              </li>
              <li>
                <a href={Constants.X_URL} className="hover:text-baige flex items-center font-jersey transition-colors">
                  <img src="/images/x.svg" alt="X" className="w-4 h-4 inline-block mr-2" /> X
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 max-w-[600px]">
            <CloudflareImage
              imageId="37162c6c-890c-48e3-790a-48b2b87fcd00"
              alt="logo"
              className="w-[180px] sm:w-[220px] md:w-[300px]"
            />
            <p className="text-[14px] sm:text-[12px] font-chivo">
              RedwoodSDK is a composable framework for building server-side web apps on Cloudflare. It begins as a Vite plugin that unlocks SSR, React Server Components, Server Functions, and realtime features. Its standards-based router, with support for middleware and interruptors, gives you fine-grained control over every request and response. With built-in access to Cloudflare Workers, D1 (Database), R2 (Storage), Queues, AI, and full local emulation via Miniflare, development feels just like production.
            </p>
            <p className="text-[14px] sm:text-[12px] font-chivo">
              Copyright © 2025 RedwoodJS Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
