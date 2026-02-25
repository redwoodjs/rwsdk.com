import { CloudflareImage } from "src/components/cloudflare-image";
import { blogPostSlugs, getBlogPost } from "../data/posts/index";
import { link } from "src/shared/links";
import { SEO } from "src/components/seo";

export default async function BlogList() {
  // Fetch and parse all blog posts
  const posts = await Promise.all(
    blogPostSlugs.map(async (slug) => {
      const { data } = await getBlogPost(slug);
      return { ...data, slug };
    })
  );

  // Filter out draft posts
  const publishedPosts = posts.filter((post) => !post.draft);

  // Sort blogs by date
  const sortedBlogs = publishedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const topBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-800 font-sans selection:bg-[#F27D26] selection:text-white">
      <SEO
        title="Blog | RedwoodSDK"
        description="RedwoodSDK is loved because it's simple. This is our blog about building the framework and how we help teams ship high-velocity software on Cloudflare."
        ogUrl="https://rwsdk.com/blog"
        ogImage="https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/ee6336e7-f053-406f-1622-ee4082b6e800/public"
      />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 border-none !mt-0">
        <div className="relative z-10 max-w-4xl mx-auto w-full mb-16">
          <div className="flex flex-col">
            <h1 className="!font-serif !text-5xl md:!text-6xl !mb-6 !font-medium !tracking-tight !text-zinc-900 !break-words">
              Our Blog
            </h1>
            <p className="!text-xl !text-zinc-500 !mb-10 !font-light !leading-relaxed max-w-2xl">
              RedwoodSDK is loved because it&apos;s simple. We created it to stay
              understandable. This is our blog about building the framework and how
              we help teams ship high-velocity software on Cloudflare.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16 mt-8">
          {topBlog && (
            <article className="group max-w-4xl mx-auto w-full">
              <a
                href={link("/blog/:slug", { slug: topBlog.slug })}
                className="flex flex-col h-full no-underline"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-2 mb-6 text-[#f27d26] font-mono text-xs font-semibold uppercase tracking-widest opacity-80">
                    {topBlog.author && (
                      <div className="flex items-center gap-2">
                        {topBlog.author.avatar && (
                          <CloudflareImage
                            imageId={topBlog.author.avatar}
                            alt={topBlog.author.name}
                            className="w-8 h-8 rounded-full object-cover [image-rendering:pixelated]"
                          />
                        )}
                        <span>{topBlog.author.name}</span>
                      </div>
                    )}
                    <span className="opacity-50">&bull;</span>
                    <div>
                      {new Date(topBlog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <h3 className="!font-serif !text-[1.75rem] sm:!text-[2rem] md:!text-[2.5rem] lg:!text-[3rem] !font-medium !mb-8 group-hover:!text-[#f27d26] !transition-colors !text-zinc-900 !leading-tight !tracking-tight">
                    {topBlog.title}
                  </h3>

                  <p className="text-zinc-600 text-lg md:text-xl leading-relaxed mb-6 flex-grow line-clamp-4">
                    {topBlog.description}
                  </p>

                  <div className="text-[#f27d26] font-mono text-xs font-semibold uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform opacity-80">
                    Read featured post <span className="ml-2 font-serif text-base">&rarr;</span>
                  </div>
                </div>
              </a>
            </article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
            {otherBlogs.map((blog) => (
              <article key={blog.slug} className="group flex flex-col h-full bg-[#fcfaf8] rounded-3xl border border-zinc-200/60 overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300/80">
                <a
                  href={link("/blog/:slug", { slug: blog.slug })}
                  className="flex flex-col h-full no-underline"
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex flex-row items-center gap-2 mb-6 text-[#f27d26] font-mono text-xs font-semibold uppercase tracking-widest opacity-80">
                      {blog.author && (
                        <div className="flex items-center gap-2">
                          {blog.author.avatar && (
                            <CloudflareImage
                              imageId={blog.author.avatar}
                              alt={blog.author.name}
                              className="w-6 h-6 rounded-full object-cover [image-rendering:pixelated]"
                            />
                          )}
                          <span>{blog.author.name}</span>
                        </div>
                      )}
                      <span className="opacity-50">&bull;</span>
                      <div>
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-medium mb-4 group-hover:text-[#f27d26] transition-colors text-zinc-900 leading-tight">
                      {blog.title}
                    </h3>

                    <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="mt-auto text-[#f27d26] font-mono text-xs font-semibold uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform opacity-80">
                      Read post <span className="ml-2 font-serif text-base">&rarr;</span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
