import { SEO } from "src/components/seo";
import { Section } from "src/components/section";
import { Copy } from "src/components/copy";
import RedwoodForest from "./redwood-forest";

export default function RealtimePage() {
    return (
        <div>
            <SEO
                title="Realtime | RedwoodSDK"
                description="useSyncedState is a drop-in replacement for useState that synchronizes state across every connected client — instantly. Built into RedwoodSDK, powered by Cloudflare Durable Objects."
                ogUrl="https://rwsdk.com/realtime"
                ogImageAlt="RedwoodSDK Realtime — useSyncedState"
            />

            {/* ═══════════════════════════════════════════
          Section 1: Hero
          ═══════════════════════════════════════════ */}
            <Section className="relative max-w-5xl mx-auto px-6 pt-12 md:pt-32 pb-16 border-none !mt-0">
                <div className="flex flex-col items-center text-center">
                    <div className="font-mono text-xs text-dark-accent tracking-widest uppercase mb-6">
                        Built into RedwoodSDK
                    </div>
                    <h1 className="font-serif tracking-tight leading-[0.95] font-medium text-zinc-900 dark:text-dark-primary text-5xl md:text-8xl">
                        Hook, line, {" "}
                        <span className="italic font-light text-[#4a2b1f] dark:text-[#d4b8a8]">
                            and sync
                        </span>
                    </h1>
                    <p className="mt-10 text-xl md:text-2xl text-zinc-500 dark:text-dark-secondary max-w-2xl mx-auto leading-relaxed font-light">
                        <code className="bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-dark-primary px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-zinc-200/60 dark:border-white/20">
                            useSyncedState
                        </code>{" "}
                        is a drop-in replacement for{" "}
                        <code className="bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-dark-primary px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-zinc-200/60 dark:border-white/20">
                            useState
                        </code>{" "}
                        that synchronizes state across every connected client, instantly.
                    </p>

                    {/* The diff */}
                    <div className="mt-12 w-full max-w-2xl">
                        <div className="bg-dark-code-bg rounded-[1.5rem] overflow-hidden shadow-xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
                            <div className="flex items-center px-6 py-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-dark-border"></div>
                                    <div className="w-3 h-3 rounded-full bg-dark-border"></div>
                                    <div className="w-3 h-3 rounded-full bg-dark-border"></div>
                                </div>
                            </div>
                            <div className="pb-6 pt-1 font-mono text-[11px] md:text-[13px] tracking-wide">
                                <div className="flex bg-red-900/50 px-6 py-3 items-start">
                                    <span className="text-[#f87171] w-6 select-none shrink-0 font-medium">
                                        -
                                    </span>
                                    <span className="text-dark-secondary/70 line-through decoration-dark-secondary/50">
                                        const [count, setCount] = useState(0);
                                    </span>
                                </div>
                                <div className="flex bg-dark-success-bg px-6 py-3 items-start">
                                    <span className="text-dark-success-text w-6 select-none shrink-0 font-medium">
                                        +
                                    </span>
                                    <span className="text-dark-success-text">
                                        const [count, setCount] = useSyncedState(0, "counter");
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 2: Redwood Forest - Live Demo
          ═══════════════════════════════════════════ */}
            <Section className="max-w-6xl mx-auto px-6 pb-16">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                        Plant a forest. One click at a time.
                    </h2>
                    <p className="text-xl text-zinc-500 dark:text-dark-secondary font-light leading-relaxed max-w-2xl mx-auto">
                        Every tree is procedurally generated (unique 8-bit pixel art,
                        no two alike.) Plant as many as you want.
                        Together, we grow a forest, synced across every browser, instantly.
                    </p>
                </div>
                <RedwoodForest />
                <p className="text-center mt-6 text-sm text-zinc-400 dark:text-dark-secondary/60 font-light italic">
                    Open this page in another tab. Plant a tree there. See it appear here.
                    Every tree is unique.{" "}
                    <code className="bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-dark-primary/80 px-1 py-0.5 rounded text-[0.85em] font-mono border border-zinc-200/60 dark:border-white/10">
                        useSyncedState
                    </code>{" "}
                    in action.
                </p>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 3: The Code — "This is all it takes."
          ═══════════════════════════════════════════ */}
            <Section className="max-w-5xl mx-auto px-6 pb-32">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                    This is all it takes.
                </h2>
                <p className="text-xl text-zinc-500 dark:text-dark-secondary mb-12 font-light leading-relaxed max-w-2xl">
                    No WebSocket handlers. No pub/sub. No third-party service. Just React,
                    Cloudflare, and one hook.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Code Block 1: The Component */}
                    <div className="bg-dark-code-bg rounded-2xl overflow-hidden shadow-xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
                        <div className="px-5 py-4 border-b border-[#4a2b1f]/50 dark:border-dark-border/50">
                            <div className="font-mono text-[10px] text-dark-accent tracking-widest uppercase">
                                1. Your Component
                            </div>
                        </div>
                        <pre className="p-5 font-mono text-[11px] md:text-[12px] leading-relaxed overflow-x-auto text-[#E9B46A]">
                            <code>
                                <span className="text-[#3B82F6] italic">
                                    {"// That's it. Really."}
                                </span>
                                {"\n"}
                                <span className="text-[#C55447]">{"const"}</span>
                                {" [count, setCount] = "}
                                {"\n  "}
                                <span className="text-[#D58052]">{"useSyncedState"}</span>
                                {"("}
                                <span className="text-[#995369]">0</span>
                                {", "}
                                <span className="text-[#E9B46A]">{'"counter"'}</span>
                                {");"}
                            </code>
                        </pre>
                    </div>

                    {/* Code Block 2: The Worker */}
                    <div className="bg-dark-code-bg rounded-2xl overflow-hidden shadow-xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
                        <div className="px-5 py-4 border-b border-[#4a2b1f]/50 dark:border-dark-border/50">
                            <div className="font-mono text-[10px] text-dark-accent tracking-widest uppercase">
                                2. Worker Routes
                            </div>
                        </div>
                        <pre className="p-5 font-mono text-[11px] md:text-[12px] leading-relaxed overflow-x-auto text-[#E9B46A]">
                            <code>
                                <span className="text-[#C55447]">{"export"}</span>
                                {" { "}
                                <span className="text-[#D58052]">SyncedStateServer</span>
                                {" };"}
                                {"\n\n"}
                                <span className="text-[#C55447]">{"export default"}</span>
                                {" "}
                                <span className="text-[#D58052]">{"defineApp"}</span>
                                {"(["}
                                {"\n  ..."}
                                <span className="text-[#D58052]">syncedStateRoutes</span>
                                {"("}
                                {"\n    () => env.SYNCED_STATE"}
                                {"\n  ),"}
                                {"\n]);"}
                            </code>
                        </pre>
                    </div>

                    {/* Code Block 3: The Config */}
                    <div className="bg-dark-code-bg rounded-2xl overflow-hidden shadow-xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
                        <div className="px-5 py-4 border-b border-[#4a2b1f]/50 dark:border-dark-border/50">
                            <div className="font-mono text-[10px] text-dark-accent tracking-widest uppercase">
                                3. Wrangler Config
                            </div>
                        </div>
                        <pre className="p-5 font-mono text-[11px] md:text-[12px] leading-relaxed overflow-x-auto text-[#E9B46A]">
                            <code>
                                <span className="text-[#3B82F6] italic">
                                    {"// wrangler.jsonc"}
                                </span>
                                {"\n"}
                                <span className="text-[#C55447]">{'"durable_objects"'}</span>
                                {": {"}
                                {'\n  "bindings": [{\n    '}
                                <span className="text-[#C55447]">{'"name"'}</span>
                                {": "}
                                <span className="text-[#E9B46A]">{'"SYNCED_STATE"'}</span>
                                {",\n    "}
                                <span className="text-[#C55447]">{'"class_name"'}</span>
                                {": "}
                                <span className="text-[#E9B46A]">{'"SyncedStateServer"'}</span>
                                {"\n  }]"}
                                {"\n}"}
                            </code>
                        </pre>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 4: Security — Server-side enforcement
          ═══════════════════════════════════════════ */}
            <Section className="max-w-5xl mx-auto px-6 pb-32">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                    Security? The client doesn't decide.
                    <br />
                    <span className="italic font-light text-[#4a2b1f] dark:text-[#d4b8a8]">
                        The server does.
                    </span>
                </h2>
                <p className="text-xl text-zinc-500 dark:text-dark-secondary mb-12 font-light leading-relaxed max-w-2xl">
                    Your frontend is intentionally user-agnostic. Server-side key handlers
                    and room handlers enforce isolation — with full access to your auth
                    context. The client never sees the scoping logic.
                </p>

                <div className="bg-[#2b1810] dark:bg-dark-panel rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#4a2b1f] dark:border-dark-border transition-colors duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Left: Frontend */}
                        <div>
                            <div className="font-mono text-[10px] text-dark-accent tracking-widest uppercase mb-4">
                                Frontend · User-agnostic
                            </div>
                            <div className="space-y-4">
                                <div className="bg-dark-code-bg rounded-xl p-5 border border-[#4a2b1f]/50 dark:border-dark-border/50">
                                    <pre className="font-mono text-[11px] md:text-[12px] text-[#E9B46A] leading-relaxed">
                                        <code>
                                            <span className="text-[#3B82F6] italic">
                                                {"// Component just says 'private'"}
                                            </span>
                                            {"\n"}
                                            <span className="text-[#C55447]">const</span>
                                            {" [notes, setNotes] =\n  "}
                                            <span className="text-[#D58052]">useSyncedState</span>
                                            {"("}
                                            <span className="text-[#E9B46A]">{'"", "notes"'}</span>
                                            {", "}
                                            <span className="text-[#E9B46A]">{'"private"'}</span>
                                            {");"}
                                        </code>
                                    </pre>
                                </div>
                                <p className="text-[#d4b8a8] dark:text-dark-secondary text-sm font-light leading-relaxed">
                                    The component doesn't know who the user is. It just requests a{" "}
                                    <code className="text-dark-primary text-[0.9em]">
                                        "private"
                                    </code>{" "}
                                    room.
                                </p>
                            </div>
                        </div>

                        {/* Right: Server */}
                        <div>
                            <div className="font-mono text-[10px] text-dark-accent tracking-widest uppercase mb-4">
                                Server · Enforces Access
                            </div>
                            <div className="space-y-4">
                                <div className="bg-dark-code-bg rounded-xl p-5 border border-[#4a2b1f]/50 dark:border-dark-border/50">
                                    <pre className="font-mono text-[11px] md:text-[12px] text-[#E9B46A] leading-relaxed">
                                        <code>
                                            <span className="text-[#3B82F6] italic">
                                                {"// Server knows what 'private' means"}
                                            </span>
                                            {"\n"}
                                            <span className="text-[#D58052]">
                                                registerRoomHandler
                                            </span>
                                            {"((roomId) => {\n  "}
                                            <span className="text-[#C55447]">if</span>
                                            {" (roomId === "}
                                            <span className="text-[#E9B46A]">{'"private"'}</span>
                                            {")\n    "}
                                            <span className="text-[#C55447]">return</span>
                                            {" "}
                                            <span className="text-[#E9B46A]">
                                                {"`user:${userId}`"}
                                            </span>
                                            {";\n});"}
                                        </code>
                                    </pre>
                                </div>
                                <p className="text-[#d4b8a8] dark:text-dark-secondary text-sm font-light leading-relaxed">
                                    The server transforms{" "}
                                    <code className="text-dark-primary text-[0.9em]">
                                        "private"
                                    </code>{" "}
                                    →{" "}
                                    <code className="text-dark-primary text-[0.9em]">
                                        "user:abc123"
                                    </code>
                                    . Each user gets their own isolated state — enforced on the
                                    server.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#4a2b1f]/50 dark:border-dark-border/50">
                        <p className="text-center text-[#d4b8a8] dark:text-dark-secondary font-light leading-relaxed max-w-lg mx-auto">
                            Rooms aren't just for grouping — they're a{" "}
                            <span className="text-dark-primary font-medium">
                                security boundary
                            </span>
                            . Key handlers and room handlers run on the server, with full
                            access to your auth context.
                        </p>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 5: Architecture
          ═══════════════════════════════════════════ */}
            <Section className="max-w-5xl mx-auto px-6 pb-32">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                    Powered by Cloudflare
                    <br />
                    <span className="italic font-light text-[#4a2b1f] dark:text-[#d4b8a8]">
                        and the Web.
                    </span>
                </h2>
                <p className="text-xl text-zinc-500 dark:text-dark-secondary mb-12 font-light leading-relaxed max-w-2xl">
                    Your server is the source of truth. Cloudflare Durable Objects handle
                    coordination, persistence, and global distribution. You write React.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Step 1 */}
                    <div className="bg-[#2b1810] dark:bg-dark-panel rounded-2xl p-8 border border-[#4a2b1f] dark:border-dark-border shadow-xl transition-colors duration-200 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-dark-accent/10 border border-dark-accent/20 flex items-center justify-center mx-auto mb-5">
                            <span className="text-dark-accent font-mono text-lg font-bold">
                                1
                            </span>
                        </div>
                        <h3 className="font-serif text-xl font-medium text-dark-primary mb-3">
                            Client calls setState
                        </h3>
                        <p className="text-[#d4b8a8] dark:text-dark-secondary text-sm font-light leading-relaxed">
                            Your React component calls{" "}
                            <code className="text-dark-primary text-[0.9em]">
                                setCount(c =&gt; c + 1)
                            </code>
                            . Standard React. Nothing unusual.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#2b1810] dark:bg-dark-panel rounded-2xl p-8 border border-[#4a2b1f] dark:border-dark-border shadow-xl transition-colors duration-200 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-dark-accent/10 border border-dark-accent/20 flex items-center justify-center mx-auto mb-5">
                            <span className="text-dark-accent font-mono text-lg font-bold">
                                2
                            </span>
                        </div>
                        <h3 className="font-serif text-xl font-medium text-dark-primary mb-3">
                            Durable Object syncs
                        </h3>
                        <p className="text-[#d4b8a8] dark:text-dark-secondary text-sm font-light leading-relaxed">
                            A Cloudflare Durable Object receives the update, stores it as the
                            source of truth, and broadcasts to all connected WebSockets.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#2b1810] dark:bg-dark-panel rounded-2xl p-8 border border-[#4a2b1f] dark:border-dark-border shadow-xl transition-colors duration-200 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-dark-accent/10 border border-dark-accent/20 flex items-center justify-center mx-auto mb-5">
                            <span className="text-dark-accent font-mono text-lg font-bold">
                                3
                            </span>
                        </div>
                        <h3 className="font-serif text-xl font-medium text-dark-primary mb-3">
                            Every client updates
                        </h3>
                        <p className="text-[#d4b8a8] dark:text-dark-secondary text-sm font-light leading-relaxed">
                            All connected clients receive the new state via standard
                            WebSockets. React re-renders. Instantly.
                        </p>
                    </div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 6: Use Cases
          ═══════════════════════════════════════════ */}
            <Section className="max-w-5xl mx-auto px-6 pb-32">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                    What will you build?
                </h2>
                <p className="text-xl text-zinc-500 dark:text-dark-secondary mb-12 font-light leading-relaxed">
                    Anything where data should update instantly for everyone.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            emoji: "💬",
                            title: "Chat",
                            desc: "Real-time messaging between users",
                        },
                        {
                            emoji: "📊",
                            title: "Live Dashboards",
                            desc: "Data that updates for everyone simultaneously",
                        },
                        {
                            emoji: "🎮",
                            title: "Multiplayer",
                            desc: "Game state synchronized across players",
                        },
                        {
                            emoji: "✍️",
                            title: "Collaborative Editing",
                            desc: "Shared documents and whiteboards",
                        },
                        {
                            emoji: "👥",
                            title: "Presence",
                            desc: "See who's online and what they're viewing",
                        },
                        {
                            emoji: "📋",
                            title: "Live Forms",
                            desc: "Multi-user form filling and voting",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-white/50 dark:bg-dark-panel rounded-2xl p-6 border border-zinc-200/60 dark:border-dark-border shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="text-3xl mb-3">{item.emoji}</div>
                            <h3 className="font-serif text-lg font-medium mb-1 text-zinc-900 dark:text-dark-primary">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-dark-secondary font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ═══════════════════════════════════════════
          Section 7: CTA
          ═══════════════════════════════════════════ */}
            <Section className="max-w-5xl mx-auto px-6 pb-32">
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 font-medium tracking-tight">
                        Start building for <i>real</i> this <i>time</i>
                    </h2>
                    <p className="text-xl text-zinc-500 dark:text-dark-secondary mb-10 font-light">
                        Scaffold a project and start syncing state in under a minute.
                    </p>

                    <div className="max-w-xl mx-auto bg-[#2b1810] dark:bg-dark-panel border border-[#4a2b1f] dark:border-dark-border text-[#f27d26] dark:text-dark-accent font-mono text-sm p-4 sm:p-6 rounded-2xl flex items-center justify-between shadow-2xl overflow-x-auto transition-colors duration-200 mb-8">
                        <span className="flex-1 whitespace-nowrap pr-4">
                            <span className="text-dark-secondary mr-2 select-none">$</span>
                            npx create-rwsdk my-project
                        </span>
                        <span className="text-dark-secondary hover:text-dark-primary transition-colors">
                            <Copy text="npx create-rwsdk my-project" />
                        </span>
                    </div>

                    <a
                        href="https://docs.rwsdk.com/experimental/realtime/"
                        className="inline-flex items-center gap-2 text-dark-accent hover:text-[#e05236] font-medium transition-colors"
                    >
                        Read the docs
                        <span className="text-lg">→</span>
                    </a>
                </div>
            </Section >
        </div >
    );
}
