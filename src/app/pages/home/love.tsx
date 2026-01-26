"use client";

import React from "react";


const authors = {
  mojombo: {
    name: "Tom Preston-Werner",
    handle: "mojombo",
    platform: "x",
    url: "https://x.com/mojombo/status/1971357781946138656",
  },
  PaulHenri_L: {
    name: "Paul-Henri",
    handle: "PaulHenri_L",
    platform: "x",
    url: "https://x.com/PaulHenri_L",
  },
  "Odd-Appeal6543": {
    name: "Odd-Appeal6543",
    handle: "Odd-Appeal6543",
    platform: "reddit",
    url: "https://reddit.com",
  },
  wesbos: {
    name: "Wes Bos",
    handle: "wesbos",
    platform: "x",
    url: "https://x.com/wesbos/status/1917263290104963507",
  },
  dok2001: {
    name: "Dane Knecht",
    handle: "dok2001",
    platform: "x",
    url: "https://x.com/dok2001",
  },
  Zephraph: {
    name: "Justin Bennett",
    handle: "Zephraph",
    platform: "x",
    url: "https://x.com/Zephraph/status/1910800212408615136",
  },
  Frown360Turn: {
    name: "Ryan Quinn",
    handle: "Frown360Turn",
    platform: "x",
    url: "https://x.com/Frown360Turn",
  },
  osener: {
    name: "osener",
    handle: "osener",
    platform: "reddit",
    url: "https://reddit.com/u/osener",
  },
  estebanrules: {
    name: "Damian Esteban",
    handle: "estebanrules",
    platform: "x",
    url: "https://x.com/estebanrules",
  },
  nwbotha: {
    name: "Nico Botha",
    handle: "nwbotha",
    platform: "x",
    url: "https://x.com/nwbotha",
  },
};

const Citation = ({
  id,
  children
}: {
  id: keyof typeof authors,
  children: React.ReactNode
}) => {
  const author = authors[id];

  return (
    <span className="group relative inline cursor-help">
      <span className="relative z-10 border-b-2 border-orange-200 bg-orange-50/50 box-decoration-clone leading-[1.6] px-0.5 hover:bg-orange-100 transition-colors">
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
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none">
        {author.name} (@{author.handle})
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
};

export function Love() {
  return (
    <section className="py-32 px-4 sm:px-8 max-w-[900px] mx-auto">
      <div className="mb-12">
        <div className="font-mono text-xs sm:text-sm mb-2 opacity-50 uppercase leading-none">
          In Developers Own Words
        </div>

        <div className="space-y-12">
          <p className="font-serif leading-relaxed text-2xl">
            Modern development is a sea of hidden abstractions, but RedwoodSDK is built without magic. You get{" "}
            <Citation id="Odd-Appeal6543">the boilerplate reduction of a monolith with the maximum control</Citation> of a modular system. It is{" "}
            <Citation id="Zephraph">an incredibly smart</Citation>{" "}
            <Citation id="wesbos">Server-First React architecture</Citation> that finally{" "}
            <Citation id="dok2001">lives up to its documentation.</Citation>
          </p>

          <p className="font-serif leading-relaxed text-2xl">
            This is a proper framework that{" "}
            <Citation id="estebanrules">resets the bar for how fast "fast" can actually be.</Citation>{" "}
            <Citation id="Frown360Turn">You don’t have to explain your order to a chef; you just step into the kitchen and make it.</Citation> It is{" "}
            <Citation id="osener">the best approach for solo makers and small teams to own their entire stack without the "guillotine"</Citation> of complex infrastructure.
          </p>

          <p className="font-serif leading-relaxed text-2xl">
            <Citation id="mojombo">If you like to SHIP PRODUCT,</Citation>{" "}
            <Citation id="nwbotha">this is the full-stack experience you’ve been waiting for.</Citation>
          </p>
        </div>
      </div>

    </section>
  );
}
