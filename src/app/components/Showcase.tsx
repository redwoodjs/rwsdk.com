"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    author: "Tom Preston-Werner",
    handle: "mojombo",
    text: "RedwoodSDK up and to the right! If you like @Cloudflare and you like @reactjs, but especially if you like to SHIP PRODUCT, you should put your 👀 on this.",
    url: "https://x.com/mojombo/status/1971357781946138656",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Paul-Henri",
    handle: "PaulHenri_L",
    text: "Feels like @RedwoodJS is the JS spiritual successor of Laravel. All batteries included, similar routing/middleware logic.",
    url: "https://x.com/PaulHenri_L",
    date: "Dec 2025",
    platform: "x",
  },
  {
    author: "Odd-Appeal6543",
    handle: "Odd-Appeal6543",
    text: "The boilerplate reduction that happens when you have a clear separation of server routes and client leafs... is mind blowing. Maximum control without the magic.",
    url: "https://reddit.com",
    date: "Feb 2026",
    platform: "reddit",
  },
  {
    author: "Wes Bos",
    handle: "wesbos",
    text: "Interesting pivot for Redwood... a React framework for Cloudflare with full support for RSC. Vite Plugin, file-based routing, middleware... tight (but not required) integration.",
    url: "https://x.com/wesbos/status/1917263290104963507",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Dane Knecht",
    handle: "dok2001",
    text: "Very cool... RedwoodJS lives up to its documentation 🫡🔥",
    url: "https://x.com/dok2001",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Justin Bennett",
    handle: "Zephraph",
    text: "I'm a fan. The defineApp api is incredibly smart. Great way to actually flow middleware types through to handlers.",
    url: "https://x.com/Zephraph/status/1910800212408615136",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Ryan Quinn",
    handle: "Frown360Turn",
    text: "My analogy for SDK: 'instead of trying to explain your order to the chef... you get to just step into the kitchen and make it.' Feels like cheating for how nice it’s felt.",
    url: "https://x.com/Frown360Turn",
    date: "Dec 2025",
    platform: "x",
  },
  {
    author: "Nico Botha",
    handle: "nwbotha",
    text: "Started building last night... it's been a great experience so far. Easy to pick up, and everything just works. It's the full-stack framework I've always wanted!",
    url: "https://x.com/nwbotha",
    date: "Feb 2026",
    platform: "x",
  },
    {
    author: "Damian Esteban",
    handle: "estebanrules",
    text: "I’m building the prototype of a RAG-based application... it has been an incredibly smooth developer experience.",
    url: "https://x.com/estebanrules/status/1921636694169706782",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Tim",
    handle: "DiscordUser",
    text: "Wow, just wow. I've never seen a proper framework that's so easy to use. The integration is simple; you can easily create new pages.",
    url: "#",
    date: "Feb 2026",
    platform: "discord",
  },
  {
    author: "thatkid",
    handle: "thatkid02",
    text: "I struggled setting up a fullstack app on Workers and switched back to AWS. This time, setup was smooth with almost no heavy lifting.",
    url: "https://x.com/thatkid02",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "Muad'dev",
    handle: "its_tev",
    text: "This is what I’ve been dreaming of in a react framework. Redwood just came back to eat everyone’s lunch.",
    url: "https://x.com/its_tev",
    date: "Jan 2026",
    platform: "x",
  },
  {
    author: "osener",
    handle: "osener",
    text: "It’s the best approach for a solo maker/small team... Vercel + Next.js is the straight-up guillotine. These folks really seem to get it.",
    url: "https://reddit.com/u/osener",
    date: "Jan 2026",
    platform: "reddit",
  },
  {
    author: "laurentlahmy",
    handle: "laurentlahmy",
    text: "You enable what comes after the serverless revolution, you enable full edge computing. This is BIG... You solve the React 19 and Next.js conundrum.",
    url: "#",
    date: "Dec 2025",
    platform: "other",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "x":
      return <img src="/images/x.svg" alt="X" className="w-3 h-3 opacity-30 grayscale" />;
    case "discord":
      return <img src="/images/discord.svg" alt="Discord" className="w-3 h-3 opacity-30 grayscale" />;
    case "reddit":
      return <div className="text-[9px] font-bold text-orange opacity-30">Reddit</div>;
    default:
      return null;
  }
};

const QuoteCard = ({ 
  quote, 
  isLarge = false, 
  isWide = false, 
  isDark = false,
  className = "" 
}: { 
  quote: typeof quotes[0], 
  isLarge?: boolean, 
  isWide?: boolean, 
  isDark?: boolean,
  className?: string
}) => {
  return (
    <div 
      className={`
        relative group rounded-2xl p-6 transition-all duration-300
        ${!className && isWide ? 'md:col-span-6 lg:col-span-12 p-8 sm:p-10' : ''}
        ${!className && isLarge && !isWide ? 'md:col-span-6 lg:col-span-8 p-8 sm:p-10' : ''}
        ${!className && !isLarge && !isWide ? 'md:col-span-3 lg:col-span-4' : ''}
        ${isDark ? 'bg-slate-900 text-white hover:bg-slate-950' : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'}
        ${className}
      `}
    >
      
      <div className="relative z-10 flex flex-col h-full">
        <blockquote className={`
          ${isLarge ? 'text-lg sm:text-2xl' : 'text-[13px] sm:text-[14px]'} 
          ${isDark ? 'text-slate-100' : 'text-slate-800'}
          leading-relaxed font-medium mb-6 relative
        `}>
          {isLarge && (
            <span className="absolute -left-4 -top-6 text-slate-100 text-7xl font-serif select-none -z-10 group-hover:text-slate-200 transition-colors opacity-50">
              &ldquo;
            </span>
          )}
          <div>
             {quote.text}
          </div>
        </blockquote>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100/10">
          <div className="flex items-center gap-3">
            <img 
              src={`https://unavatar.io/${quote.platform === 'x' ? 'twitter' : quote.platform}/${quote.handle}`} 
              alt=""
              className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-slate-200/50 overflow-hidden"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(quote.author)}&background=random`;
              }}
            />
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{quote.author}</div>
              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>@{quote.handle}</div>
              <a 
                href={quote.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-[10px] ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:underline transition-colors`}
              >
                {quote.date}
              </a>
            </div>
          </div>
          <PlatformIcon platform={quote.platform} />
        </div>
      </div>
    </div>
  );
};

export default function Showcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-4 sm:px-8 max-w-[1240px] mx-auto overflow-hidden">
      <div className="text-left mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Wall of Love
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min mb-12 px-4">
        <QuoteCard quote={quotes[0]} className="col-span-1" />
        <QuoteCard quote={quotes[4]} className="col-span-1" />
        <QuoteCard quote={quotes[3]} className="col-span-1" />
        <QuoteCard quote={quotes[5]} className="col-span-1" />
      </div>

      {/* Marquee for the rest */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F9F7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F9F7F2] to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 overflow-hidden py-4">
          <motion.div 
            className="flex gap-6 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {(() => {
              const displayedIndices = [0, 4, 3, 5];
              const remainingQuotes = quotes.filter((_, i) => !displayedIndices.includes(i));
              return [...remainingQuotes, ...remainingQuotes].map((quote, i) => (
                <div key={i} className="w-[300px] shrink-0">
                  <QuoteCard quote={quote} />
                </div>
              ));
            })()}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
