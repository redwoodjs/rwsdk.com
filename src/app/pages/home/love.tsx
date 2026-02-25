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
  const [strategy, setStrategy] = React.useState<'center' | 'left' | 'right'>('center');
  const avatarRef = React.useRef<HTMLSpanElement>(null);

  const handleInteract = () => {
    if (window.innerWidth < 768 && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      // Measure the exact position of the avatar to determine tooltip strategy
      const center = rect.left + rect.width / 2;
      if (center < 120) setStrategy('left');
      else if (window.innerWidth - center < 120) setStrategy('right');
      else setStrategy('center');
    }
  };

  let tooltipPosition = "left-1/2 -translate-x-1/2 md:-translate-x-1/2";
  let arrowPosition = "left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2";

  if (strategy === 'left') {
    tooltipPosition = "left-0 md:left-auto md:left-1/2 md:-translate-x-1/2";
    arrowPosition = "left-[16px] -translate-x-1/2 md:left-[16px] md:-translate-x-1/2 md:left-1/2";
  } else if (strategy === 'right') {
    tooltipPosition = "right-0 md:right-auto md:left-1/2 md:-translate-x-1/2";
    arrowPosition = "right-[16px] translate-x-1/2 md:right-auto md:left-1/2 md:-translate-x-1/2";
  }

  return (
    <span
      className="group inline cursor-help"
      tabIndex={0}
      onMouseEnter={handleInteract}
      onFocus={handleInteract}
      onTouchStart={handleInteract}
    >
      <span className="relative z-10 group-hover:z-[100] group-focus:z-[100] box-decoration-clone px-0.5 transition-colors group-hover:bg-[#f27d26]/10 group-hover:border-b-2 group-hover:border-[#f27d26]/30 group-focus:bg-[#f27d26]/10 group-focus:border-b-2 group-focus:border-[#f27d26]/30">
        {children}
      </span>
      <span
        ref={avatarRef}
        className="relative z-10 group-hover:z-[100] group-focus:z-[100] inline-flex items-center justify-center align-middle ml-2 -mt-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 border-2 border-white shadow-md select-none"
      >
        <img
          src={`https://unavatar.io/${author.platform === 'x' ? 'twitter' : author.platform}/${author.handle}`}
          alt={author.name}
          className="w-full h-full object-cover rounded-full overflow-hidden"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`;
          }}
        />

        {/* Tooltip anchored directly to the Avatar */}
        <span className={`opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity absolute bottom-[calc(100%+10px)] md:bottom-[calc(100%+14px)] ${tooltipPosition} px-3 md:px-4 py-2.5 md:py-3 bg-[#2b1810] text-[#e8d5c4] text-xs md:text-base font-sans rounded-lg md:rounded-xl z-[60] pointer-events-none w-[240px] md:w-max md:max-w-[300px] whitespace-normal text-left shadow-2xl border border-[#4a2b1f]`}>
          <span className="block font-bold border-b border-[#4a2b1f] pb-1.5 md:pb-2 mb-1.5 md:mb-2 text-[#f27d26] text-sm md:text-base leading-tight md:leading-normal">
            {author.name} <span className="text-[#d4b8a8] font-normal text-xs md:text-sm">@{author.handle}</span>
          </span>
          {author.quote && (
            <span className="block italic text-[#d4b8a8] text-xs md:text-base leading-relaxed">
              "{author.quote}"
            </span>
          )}
          {/* Arrows */}
          <span className={`absolute top-full ${arrowPosition} border-[6px] md:border-8 border-transparent border-t-[#4a2b1f]`} />
          <span className={`absolute top-full mt-[-1px] ${arrowPosition} border-[6px] md:border-8 border-transparent border-t-[#2b1810]`} />
        </span>
      </span>
    </span>
  );
};

export function Love() {
  return (
    <div className="space-y-10 text-[#2b1810] text-2xl md:text-4xl font-serif leading-snug text-center max-w-3xl mx-auto">
      <p>
        RedwoodSDK <Citation id="wesbos">is composable.</Citation> It is{" "}
        <Citation id="Zephraph">
          built to be server-first, centering entirely on the request-response lifecycle.
        </Citation>{" "}
        <Citation id="nwbotha">
          This makes the architecture intuitive and easy to grasp.
        </Citation>
      </p>

      <p className="text-zinc-500 italic font-light">
        <Citation id="mojombo">But simple doesn't mean limited.</Citation>{" "}
        <Citation id="Odd-Appeal6543">
          The framework is deeply powerful, stripping away complexity without sacrificing scale.
        </Citation>
      </p>

      <p className="font-medium text-black">
        <Citation id="Frown360Turn">You are in total control.</Citation>
      </p>
    </div>
  );
}
