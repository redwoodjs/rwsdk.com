import Constants from "src/lib/Constants";
import { SEO } from "src/components/seo";
import { link } from "src/shared/links";

export function Talks() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Podcasts & Talks | RedwoodSDK",
        description: "A collection of podcasts and talks about RedwoodSDK presented by Peter Pistorius and others.",
        url: "https://rwsdk.com/talks",
    };

    const talks = [
        {
            title: "Decentralization is dangerous (if you're not prepared)",
            date: "Feb 2026",
            source: "Cloudflare TV",
            speaker: "Peter Pistorius",
        },
        {
            title: "RedwoodSDK: Web Standards Meet Full-Stack React",
            date: "Jan 2026",
            source: "React Conf 2025",
            speaker: "Peter Pistorius & Aurora Scharff",
        },
        {
            title: "Interview with Peter Pistorius and Aurora Scharff",
            date: "Jan 2026",
            source: "React Conf 2025",
            speaker: "Peter Pistorius & Aurora Scharff",
        },
        {
            title: "Peter Pistorius - Redwood SDK",
            date: "Jun 2025",
            source: "DevTools FM",
            speaker: "Peter Pistorius",
        },
        {
            title: "669: Peter Pistorius on Developing RedwoodSDK",
            date: "Jun 2025",
            source: "ShopTalk Show",
            speaker: "Peter Pistorius",
        },
        {
            title: "Fullstack Cloudflare with React and Vite (Redwood SDK)",
            date: "May 2025",
            source: "Syntax podcast",
            speaker: "Peter Pistorius",
        },
        {
            title: "RedwoodSDK with Peter Pistorius",
            date: "May 2025",
            source: "PodRocket",
            speaker: "Peter Pistorius",
        },
        {
            title: "Redwood Talk and Demo",
            date: "Apr 2020",
            source: "RedwoodJS",
            speaker: "Peter Pistorius",
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-zinc-800 font-sans selection:bg-[#F27D26] selection:text-white">
            <SEO
                title="Podcasts & Talks | RedwoodSDK"
                description="A collection of podcasts and talks about RedwoodSDK presented by Peter Pistorius and others."
                ogUrl="https://rwsdk.com/talks"
                structuredData={structuredData}
            />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 border-none !mt-0">
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col mb-16">
                        <h1 className="font-serif text-[4.5rem] md:text-[110px] tracking-tight leading-[0.95] font-medium text-zinc-900 break-words">
                            Podcasts
                            <br />
                            <span className="italic font-light text-[#4a2b1f]">& Talks</span>
                        </h1>
                        <p className="mt-10 text-zinc-500 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-light">
                            Dive deep into the philosophy, mechanics, and vision behind RedwoodSDK.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {talks.map((talk, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-zinc-200/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F47238]">
                                            {talk.source}
                                        </span>
                                        <span className="text-zinc-600 text-sm">{talk.date}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 leading-tight mb-2">
                                        {talk.title}
                                    </h3>
                                    <p className="text-zinc-500 font-light mt-2 text-sm md:text-base">
                                        By <span className="font-medium">{talk.speaker}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
