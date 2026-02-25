import { CloudflareImage } from "src/components/cloudflare-image";
import { blogPostSlugs, getBlogPost } from "../../addons/blog/data/posts/index";
import { link } from "src/shared/links";
import { Section } from "src/components/section";

export default async function LatestBlogs() {
    // Fetch and parse all blog posts
    const posts = await Promise.all(
        blogPostSlugs.map(async (slug: string) => {
            const { data } = await getBlogPost(slug);
            return { ...data, slug };
        })
    );

    // Filter out draft posts
    const publishedPosts = posts.filter((post: any) => !post.draft);

    // Sort blogs by date to get the latest ones
    const sortedBlogs = publishedPosts.sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Get latest 3
    const latestBlogs = sortedBlogs.slice(0, 3);

    return (
        <Section className="max-w-5xl mx-auto px-6 pb-32">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium tracking-tight">
                Latest from the Blog
            </h2>
            <p className="text-xl text-zinc-500 mb-10 font-light leading-relaxed">
                Read about how we build RedwoodSDK and help teams ship high-velocity software on Cloudflare.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestBlogs.map((blog: any) => (
                    <article key={blog.slug} className="group flex flex-col h-full bg-[#fcfaf8] rounded-3xl border border-zinc-200/60 overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300/80">
                        <a
                            href={link("/blog/:slug", { slug: blog.slug })}
                            className="flex flex-col h-full no-underline"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex flex-row items-center gap-2 mb-6 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                    {blog.author && (
                                        <div className="flex items-center gap-2">
                                            {blog.author.avatar && (
                                                <CloudflareImage
                                                    imageId={blog.author.avatar}
                                                    alt={blog.author.name}
                                                    className="w-5 h-5 rounded-full object-cover [image-rendering:pixelated]"
                                                />
                                            )}
                                            <span>{blog.author.name}</span>
                                        </div>
                                    )}
                                    <span className="opacity-50">&bull;</span>
                                    <div className="opacity-80">
                                        {new Date(blog.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>

                                <h3 className="font-serif text-2xl font-medium mb-4 group-hover:text-[#f27d26] transition-colors text-zinc-900 leading-tight">
                                    {blog.title}
                                </h3>

                                <p className="text-base text-zinc-500 mb-8 flex-grow leading-relaxed font-light line-clamp-3">
                                    {blog.description}
                                </p>

                                <div className="mt-auto font-mono text-xs text-[#f27d26] font-medium tracking-widest uppercase flex items-center group-hover:translate-x-1 transition-transform">
                                    Read post <span className="ml-2 font-serif text-sm">&rarr;</span>
                                </div>
                            </div>
                        </a>
                    </article>
                ))}
            </div>

            <div className="mt-16 text-center">
                <a
                    href={link("/blog")}
                    className="font-mono text-xs text-zinc-400 tracking-widest hover:text-zinc-600 transition-colors uppercase border-b border-zinc-300 pb-1"
                >
                    View All Posts
                </a>
            </div>
        </Section>
    );
}
