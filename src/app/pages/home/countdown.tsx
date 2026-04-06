import Constants from "src/lib/Constants";

export function Countdown() {
    return (
        <div className="mt-16 flex flex-col items-center justify-center animate-fade-in relative z-20">
            <div className="text-[#f27d26] dark:text-dark-accent font-mono text-2xl sm:text-3xl md:text-4xl bg-[#2b1810] dark:bg-dark-panel border border-[#4a2b1f] dark:border-dark-border px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-2xl transition-colors duration-200 font-medium tracking-widest mb-4">
                v1.0 is here
            </div>
            <div className="font-mono text-sm tracking-widest mt-2 opacity-80 text-charcoal dark:text-dark-secondary flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>Wanna help?</span>
                <a href={Constants.GITHUB_REPO} target="_blank" rel="noreferrer" className="text-dark-accent hover:text-zinc-500 focus-visible:text-zinc-500 dark:hover:text-dark-primary dark:focus-visible:text-dark-primary transition-colors underline decoration-dark-accent/40 hover:decoration-zinc-400/40 focus-visible:decoration-zinc-400/40 dark:hover:decoration-dark-primary/40 dark:focus-visible:decoration-dark-primary/40 underline-offset-4">Star us!</a>
                <span className="opacity-40">·</span>
                <a href="/blog/redwood-v1-getting-out-of-the-weeds" className="text-dark-accent hover:text-zinc-500 focus-visible:text-zinc-500 dark:hover:text-dark-primary dark:focus-visible:text-dark-primary transition-colors underline decoration-dark-accent/40 hover:decoration-zinc-400/40 focus-visible:decoration-zinc-400/40 dark:hover:decoration-dark-primary/40 dark:focus-visible:decoration-dark-primary/40 underline-offset-4">Read the announcement</a>
            </div>
        </div>
    );
}
