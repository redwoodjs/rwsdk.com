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
            url: "https://cloudflare.tv/",
        },
        {
            title: "RedwoodSDK: Web Standards Meet Full-Stack React",
            date: "Jan 2026",
            source: "React Conf 2025",
            speaker: "Peter Pistorius & Aurora Scharff",
            youtubeUrl: "https://www.youtube.com/watch?v=react-conf-2025-peter",
            url: "https://conf.react.dev/",
        },
        {
            title: "Interview with Peter Pistorius and Aurora Scharff",
            date: "Jan 2026",
            source: "React Conf 2025",
            speaker: "Peter Pistorius & Aurora Scharff",
            youtubeUrl: "https://www.youtube.com/watch?v=react-conf-2025-interview",
            url: "https://conf.react.dev/",
        },
        {
            title: "Peter Pistorius - Redwood SDK",
            date: "Jun 2025",
            source: "DevTools FM",
            speaker: "Peter Pistorius",
            youtubeUrl: "https://www.youtube.com/watch?v=devtools-fm-87",
            url: "https://www.devtools.fm/episode/87",
        },
        {
            title: "669: Peter Pistorius on Developing RedwoodSDK",
            date: "Jun 2025",
            source: "ShopTalk Show",
            speaker: "Peter Pistorius",
            youtubeUrl: "https://www.youtube.com/watch?v=kY_4j_x_uRE",
            url: "https://shoptalkshow.com/669/",
        },
        {
            title: "Fullstack Cloudflare with React and Vite (Redwood SDK)",
            date: "May 2025",
            source: "Syntax podcast",
            speaker: "Peter Pistorius",
            youtubeUrl: "https://www.youtube.com/watch?v=syntax-902",
            url: "https://syntax.fm/show/902/fullstack-cloudflare-with-react-and-vite-redwood-sdk",
        },
        {
            title: "RedwoodSDK with Peter Pistorius",
            date: "May 2025",
            source: "PodRocket",
            speaker: "Peter Pistorius",
            youtubeUrl: "https://www.youtube.com/watch?v=FjI5jY6pT3E",
            url: "https://logrocket.com/podcasts/podrocket/redwoodsdk-peter-pistorius/",
        },
        {
            title: "Redwood Talk and Demo",
            date: "Apr 2020",
            source: "RedwoodJS",
            speaker: "Peter Pistorius",
            youtubeUrl: "https://www.youtube.com/watch?v=ZT82h7tq2LY",
            url: "https://redwoodjs.com/",
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] dark:bg-dark-bg text-zinc-800 dark:text-dark-primary font-sans selection:bg-dark-accent selection:text-dark-primary">
            <SEO
                title="Podcasts & Talks | RedwoodSDK"
                description="A collection of podcasts and talks about RedwoodSDK presented by Peter Pistorius and others."
                ogUrl="https://rwsdk.com/talks"
                structuredData={structuredData}
            />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 border-none !mt-0">
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col mb-16">
                        <h1 className="font-serif text-[4.5rem] md:text-[110px] tracking-tight leading-[0.95] font-medium text-zinc-900 dark:text-dark-primary break-words">
                            Podcasts
                            <br />
                            <span className="italic font-light text-dark-secondary">& Talks</span>
                        </h1>
                        <p className="mt-10 text-zinc-500 dark:text-dark-secondary max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-light">
                            Dive deep into the philosophy, mechanics, and vision behind RedwoodSDK.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {talks.map((talk, idx) => {
                        const targetUrl = talk.youtubeUrl || talk.url;
                        return (
                            <a
                                key={idx}
                                href={targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-[#fcfaf8] dark:bg-dark-panel p-6 sm:p-8 rounded-3xl border border-transparent dark:border-dark-border overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300/80 dark:hover:border-dark-accent/30 group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-dark-accent">
                                                {talk.source}
                                            </span>
                                            <span className="text-zinc-500 dark:text-dark-secondary text-xs font-mono uppercase tracking-widest opacity-80">{talk.date}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 dark:text-dark-primary group-hover:text-dark-accent transition-colors leading-tight mb-4">
                                            {talk.title}
                                        </h3>
                                        <p className="text-zinc-500 dark:text-dark-secondary font-light text-sm md:text-base">
                                            By <span className="font-medium">{talk.speaker}</span>
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-dark-panel-light group-hover:bg-dark-accent/10 text-zinc-400 dark:text-dark-secondary group-hover:text-dark-accent transition-colors">
                                        {talk.youtubeUrl ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.6,15.2V8.8l6.4,3.2L9.6,15.2z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
