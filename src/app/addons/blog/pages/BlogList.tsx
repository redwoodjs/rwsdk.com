import { CloudflareImage } from 'src/components/CloudflareImage';
import { blogPosts } from '../data/posts/index';
import { Navbar } from 'src/components/Navbar';
import { Footer } from 'src/components/Footer';

export default async function BlogList() {
    // Fetch and parse all blog posts
    const posts = await Promise.all(Object.entries(blogPosts).map(async ([slug, getPost]) => {
        const { data } = await (getPost as () => Promise<{ data: any }>)();
        return { ...data, slug };
    }));

    // Sort blogs by date to get the latest one
    const sortedBlogs = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestBlog = sortedBlogs[0];
    const otherBlogs = sortedBlogs.slice(1);

    return (
        <div className="min-h-screen bg-baige">
            {/* SEO Metadata */}
            <title>Blog | RedwoodSDK</title>
            <meta name="description" content="Latest articles and tutorials about RedwoodSDK, Cloudflare development, and modern web technologies." />
            <meta property="og:title" content="Blog | RedwoodSDK" />
            <meta property="og:description" content="Latest articles and tutorials about RedwoodSDK, Cloudflare development, and modern web technologies." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://rwsdk.com/blog" />
            <meta property="og:image" content="https://imagedelivery.net/EBSSfnGYYD9-tGTmYMjDgg/ee6336e7-f053-406f-1622-ee4082b6e800/public" />

            <Navbar activePage="blog" />

            {/* Hero Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 py-12 sm:py-16 lg:py-20">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-jersey text-black mb-4 text-center lg:text-left">
                    RedwoodSDK Blog
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl text-center lg:text-left">
                    Latest articles and tutorials about RedwoodSDK, The React Framework for Cloudflare.
                </p>
            </div>

            {/* Latest Blog */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 mb-20">
                <article className="group rounded-lg overflow-hidden transition-shadow duration-300">
                    <a href={`/blog/${latestBlog.slug}`} className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-6">
                            <h2 className="text-3xl font-jersey text-black mb-4 group-hover:text-orange transition-colors">
                                {latestBlog.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {latestBlog.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <CloudflareImage
                                            imageId={latestBlog.author.avatar}
                                            alt={latestBlog.author.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <span>{latestBlog.author.name}</span>
                                    </div>
                                    <time dateTime={latestBlog.date}>
                                        {new Date(latestBlog.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <CloudflareImage
                                imageId={latestBlog.image}
                                alt={latestBlog.title}
                                className="object-cover w-full h-full lg:block hidden"
                            />
                        </div>
                    </a>
                </article>
            </div>

            {/* Other Blogs Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {otherBlogs.map((blog) => (
                        <article key={blog.slug} className="group">
                            <a 
                                href={`/blog/${blog.slug}`}
                                className="block rounded-lg overflow-hidden transition-shadow duration-300 h-full"
                            >
                                <div className="p-6">
                                <h2 className="text-3xl font-jersey text-black mb-4 group-hover:text-orange transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {blog.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-2">
                                                <CloudflareImage
                                                    imageId={blog.author.avatar}
                                                    alt={blog.author.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <span>{blog.author.name}</span>
                                            </div>
                                            <time dateTime={blog.date}>
                                                {new Date(blog.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </div>  
    );
}