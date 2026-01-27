"use client";

import React from "react";


const authors: Record<string, { name: string; handle: string; platform: string; url: string; quote?: string; date?: string }> = {
  mojombo: {
    name: "Tom Preston-Werner",
    handle: "mojombo",
    platform: "x",
    url: "https://x.com/mojombo/status/1971357781946138656",
    quote: "RedwoodSDK up and to the right! If you like @Cloudflare and you like @reactjs, but especially if you like to SHIP PRODUCT, you should put your 👀 on this.",
    date: "Jan 2026",
  },
  PaulHenri_L: {
    name: "Paul-Henri",
    handle: "PaulHenri_L",
    platform: "x",
    url: "https://x.com/PaulHenri_L",
    quote: "Feels like @RedwoodJS is the JS spiritual successor of Laravel. All batteries included, similar routing/middleware logic.",
    date: "Dec 2025",
  },
  "Odd-Appeal6543": {
    name: "Odd-Appeal6543",
    handle: "Odd-Appeal6543",
    platform: "reddit",
    url: "https://reddit.com",
    quote: "The boilerplate reduction that happens when you have a clear separation of server routes and client leafs... is mind blowing. Maximum control without the magic.",
    date: "Feb 2026",
  },
  wesbos: {
    name: "Wes Bos",
    handle: "wesbos",
    platform: "x",
    url: "https://x.com/wesbos/status/1917263290104963507",
    quote: "Interesting pivot for Redwood... a React framework for Cloudflare with full support for RSC. Vite Plugin, file-based routing, middleware... tight (but not required) integration.",
    date: "Jan 2026",
  },
  dok2001: {
    name: "Dane Knecht",
    handle: "dok2001",
    platform: "x",
    url: "https://x.com/dok2001",
    quote: "Very cool... RedwoodJS lives up to its documentation 🫡🔥",
    date: "Jan 2026",
  },
  Zephraph: {
    name: "Justin Bennett",
    handle: "Zephraph",
    platform: "x",
    url: "https://x.com/Zephraph/status/1910800212408615136",
    quote: "I'm a fan. The defineApp api is incredibly smart. Great way to actually flow middleware types through to handlers.",
    date: "Jan 2026",
  },
  Frown360Turn: {
    name: "Ryan Quinn",
    handle: "Frown360Turn",
    platform: "x",
    url: "https://x.com/Frown360Turn",
    quote: "My analogy for SDK: 'instead of trying to explain your order to the chef... you get to just step into the kitchen and make it.' Feels like cheating for how nice it’s felt.",
    date: "Dec 2025",
  },
  nwbotha: {
    name: "Nico Botha",
    handle: "nwbotha",
    platform: "x",
    url: "https://x.com/nwbotha",
    quote: "Started building last night... it's been a great experience so far. Easy to pick up, and everything just works. It's the full-stack framework I've always wanted!",
    date: "Feb 2026",
  },
  estebanrules: {
    name: "Damian Esteban",
    handle: "estebanrules",
    platform: "x",
    url: "https://x.com/estebanrules/status/1921636694169706782",
    quote: "I’m building the prototype of a RAG-based application... it has been an incredibly smooth developer experience.",
    date: "Jan 2026",
  },
  DiscordUser: {
    name: "Tim",
    handle: "DiscordUser",
    platform: "discord",
    url: "#",
    quote: "Wow, just wow. I've never seen a proper framework that's so easy to use. The integration is simple; you can easily create new pages.",
    date: "Feb 2026",
  },
  thatkid02: {
    name: "thatkid",
    handle: "thatkid02",
    platform: "x",
    url: "https://x.com/thatkid02",
    quote: "I struggled setting up a fullstack app on Workers and switched back to AWS. This time, setup was smooth with almost no heavy lifting.",
    date: "Jan 2026",
  },
  its_tev: {
    name: "Muad'dev",
    handle: "its_tev",
    platform: "x",
    url: "https://x.com/its_tev",
    quote: "This is what I’ve been dreaming of in a react framework. Redwood just came back to eat everyone’s lunch.",
    date: "Jan 2026",
  },
  osener: {
    name: "osener",
    handle: "osener",
    platform: "reddit",
    url: "https://reddit.com/u/osener",
    quote: "It’s the best approach for a solo maker/small team... Vercel + Next.js is the straight-up guillotine. These folks really seem to get it.",
    date: "Jan 2026",
  },
  laurentlahmy: {
    name: "laurentlahmy",
    handle: "laurentlahmy",
    platform: "other",
    url: "#",
    quote: "You enable what comes after the serverless revolution, you enable full edge computing. This is BIG... You solve the React 19 and Next.js conundrum.",
    date: "Dec 2025",
  },
};

export const Citation = ({
  id,
  children
}: {
  id: keyof typeof authors,
  children: React.ReactNode
}) => {
  const author = authors[id];

  return (
    <span className="group relative inline cursor-help">
      <span className="relative z-10 box-decoration-clone px-0.5 transition-colors group-hover:bg-orange-50/50 group-hover:border-b-2 group-hover:border-orange-200">
        {children}
        <span className="inline-flex items-center justify-center align-middle ml-2 -mt-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-slate-100 border border-white shadow-sm overflow-hidden select-none">
          <img
            src={`https://unavatar.io/${author.platform === 'x' ? 'twitter' : author.platform}/${author.handle}`}
            alt={author.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`;
            }}
          />
        </span>
      </span>

      {/* Tooltip */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg z-50 pointer-events-none w-max max-w-[250px] whitespace-normal text-center">
        <div className="font-bold border-b border-slate-700 pb-1 mb-1">
          {author.name} (@{author.handle})
        </div>
        {author.quote && (
          <div className="italic text-slate-300 leading-relaxed">
            "{author.quote}"
          </div>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
};

export function Love() {
  return (
    <div className="leading-[2]">
      <p>
        RedwoodSDK <Citation id="wesbos">is composable.</Citation> It is
        <Citation id="Zephraph">
          built to be server-first, centering entirely on the request-response lifecycle.
        </Citation>
        <Citation id="nwbotha">
          This makes the architecture intuitive and easy to grasp.
        </Citation>
      </p>
      <br />

      <p>
        <Citation id="mojombo">But simple doesn’t mean limited.</Citation>
        <Citation id="Odd-Appeal6543">
          The framework is deeply powerful, stripping away complexity without sacrificing scale.
        </Citation>
      </p>
      <br />
      <p><Citation id="Frown360Turn">You are in total control.</Citation></p>
    </div>
  );
}
