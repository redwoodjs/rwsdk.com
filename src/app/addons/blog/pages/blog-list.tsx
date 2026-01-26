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

  // Sort blogs by date to get the latest one
  const sortedBlogs = publishedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const otherBlogs = sortedBlogs

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog | RedwoodSDK"
        description="RedwoodSDK is loved because it's simple. This is our blog about building the framework and how we help teams ship high-velocity software on Cloudflare."
        ogUrl="https://rwsdk.com/blog"
        ogImage="https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/ee6336e7-f053-406f-1622-ee4082b6e800/public"
      />


      {/* Hero Section */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-32">
        <div className="font-mono text-xs sm:text-sm mb-2 opacity-50">
          BLOG
        </div>
        <h1 className="mb-6">
          We build RedwoodSDK. We build for you.
        </h1>
        <p className="leading-relaxed mb-6">
          RedwoodSDK is loved because it&apos;s simple. We created it to stay
          understandable. This is our blog about building the framework and how
          we help teams ship high-velocity software on Cloudflare.
        </p>
        <a
          href={link("/hire-us")}
          className="font-bold text-orange hover:text-orange-dark transition-colors"
        >
          Work with us &rarr;
        </a>
      </div>

     
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 pb-20">
        <div className="flex flex-col gap-12 max-w-[600px]">
          {otherBlogs.map((blog) => (
            <article key={blog.slug} className="group">
              <a
                href={link("/blog/:slug", { slug: blog.slug })}
                className="block rounded-lg overflow-hidden transition-shadow duration-300 h-full no-underline group"
              >
                <div className="p-0">
                  <h2 className="group-hover:text-orange transition-colors mb-2">
                    {blog.title}
                  </h2>
                  <div className="flex flex-row items-center gap-1 mb-4 text-xs sm:text-sm opacity-50">
                    {blog.author && (
                      <div className="flex items-center gap-1">
                        {blog.author.avatar && (
                          <CloudflareImage
                            imageId={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-6 h-6 rounded-full object-cover [image-rendering:pixelated] grayscale"
                          />
                        )}
                        <span>{blog.author.name},</span>
                      </div>
                    )}
                    <div>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <p className="mb-4">{blog.description}</p>


                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
