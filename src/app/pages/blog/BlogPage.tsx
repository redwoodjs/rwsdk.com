"use client"
import * as React from 'react'
import { Navbar } from 'src/components/Navbar';
import { Footer } from 'src/components/Footer';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { CloudflareImage } from 'src/components/CloudflareImage';

import { blogPosts, BlogPostSlug } from 'src/data/blog/manifest';
import { authors } from 'src/data/authors';

// Use Vite's import.meta.glob to get all markdown files
const blogModules = import.meta.glob('../../data/blog/*.{md,mdx}', { as: 'raw' });

// Configure marked with syntax highlighting
marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
}));

marked.setOptions({
    gfm: true,
    breaks: true
});

function parseFrontmatter(content: string) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content };
    }

    const frontmatter = match[1];
    const markdown = content.slice(match[0].length);

    // Simple YAML parser for frontmatter
    const data = frontmatter.split('\n').reduce((acc, line) => {
        const [key, ...values] = line.split(':');
        if (key && values.length > 0) {
            const value = values.join(':').trim();
            try {
                acc[key.trim()] = JSON.parse(value);
            } catch {
                acc[key.trim()] = value;
            }
        }
        return acc;
    }, {} as Record<string, any>);

    return { data, content: markdown };
}

export default function BlogPage({ params }: { params: { slug: BlogPostSlug } }) {
    const [post, setPost] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function loadPost() {
            try {
                if (!blogPosts.includes(params.slug)) {
                    throw new Error(`Blog post not found: ${params.slug}`);
                }

                const mdPath = `../../data/blog/${params.slug}.md`;
                const moduleLoader = blogModules[mdPath];
                
                if (!moduleLoader) {
                    throw new Error(`Module loader not found for: ${params.slug}`);
                }

                const module = await moduleLoader();
                const { data, content } = parseFrontmatter(module);
                if (data.id) {
                    data['author'] = authors[data.id];
                }

                setPost({
                    ...data,
                    content: marked(content.trim()),
                    slug: params.slug
                });

                console.log(post)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load post');
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [params.slug]);

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    if (!post) return <div className="flex items-center justify-center min-h-screen">Post not found</div>;

    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={post.description} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description} />
            <meta property="og:image" content={post.heroImage} />
            <meta property="og:url" content={`https://redwoodjs.com/blog/${post.slug}`} />
            <meta property="og:type" content="article" />

            <div className="flex flex-col min-h-screen">
                <Navbar activePage="blog" />
                <div className="w-full max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
                    <header className="mb-12">
                        {post.heroImage && (
                            <div className="w-full mb-8">
                                <CloudflareImage
                                    imageId={post.heroImage}
                                    alt={post.title}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                    loading="eager"
                                />
                            </div>
                        )}

                       {post.author && (
                            <div className="flex items-center gap-4">
                                {post.author.avatar && (
                                    <CloudflareImage
                                        imageId={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-orange"
                                        loading="eager"
                                    />
                                )}
                                <div>
                                    <p className="font-jersey text-xl text-black">{post.author.name}</p>
                                    <p className="text-sm text-orange-dark font-chivo">{post.author.role}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-chivo">{post.date}</p>
                                </div>
                            </div>
                       )}
                        
                    </header>
                    <article
                        className="prose prose-lg prose-slate dark:prose-invert w-full max-w-none overflow-x-hidden
                        [&_h1]:font-jersey [&_h1]:leading-[81%] [&_h1]:mb-4 [&_h1]:text-[36px] sm:[&_h1]:text-[48px] md:[&_h1]:text-[60px] lg:[&_h1]:text-[70px] [&_h1]:text-black [&_h1]:font-bold
                        [&_h2]:font-jersey [&_h2]:leading-[81%] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-[24px] sm:[&_h2]:text-[32px] md:[&_h2]:text-[40px] lg:[&_h2]:text-[48px] [&_h2]:text-orange-dark [&_h2]:font-bold
                        [&_h3]:font-jersey [&_h3]:leading-[81%] [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-[20px] sm:[&_h3]:text-[24px] md:[&_h3]:text-[32px] lg:[&_h3]:text-[40px] [&_h3]:text-orange-dark
                        [&_p]:text-[14px] sm:[&_p]:text-[16px] md:[&_p]:text-[18px] [&_p]:font-chivo [&_p]:font-medium [&_p]:mb-4
                        [&_a]:text-orange [&_a]:hover:text-orange-light
                        [&_ul]:list-none [&_ul]:text-[14px] sm:[&_ul]:text-[16px] [&_ul]:font-chivo [&_ul]:mb-4
                        [&_li]:flex [&_li]:items-baseline [&_li]:mb-2
                        [&_li>span:first-child]:text-purple [&_li>span:first-child]:inline-block [&_li>span:first-child]:min-w-[20px]
                        [&_pre]:relative [&_pre]:bg-[#0d1117] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-[14px] sm:[&_pre]:text-[16px] [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:w-full [&_pre]:mx-0 [&_pre]:max-w-full [&_pre]:box-border [&_pre]:break-words
                        [&_pre]:before:content-[''] [&_pre]:before:absolute [&_pre]:before:top-0 [&_pre]:before:left-0 [&_pre]:before:right-0 [&_pre]:before:h-8 [&_pre]:before:bg-[#161b22] [&_pre]:before:rounded-t-lg [&_pre]:before:flex [&_pre]:before:items-center [&_pre]:before:px-4
                        [&_pre]:after:content-[''] [&_pre]:after:absolute [&_pre]:after:top-3 [&_pre]:after:left-4 [&_pre]:after:w-3 [&_pre]:after:h-3 [&_pre]:after:rounded-full [&_pre]:after:bg-[#ff5f56] [&_pre]:after:shadow-[20px_0_0_#ffbd2e,40px_0_0_#27c93f]
                        [&_code]:block [&_code]:pt-8 [&_code]:whitespace-pre-wrap [&_code]:overflow-x-auto [&_code]:px-4 [&_code]:w-full [&_code]:max-w-full [&_code]:box-border [&_code]:break-words
                        [&_pre:has(code:not([class*='language-']))]:bg-black [&_pre:has(code:not([class*='language-']))]:dark:bg-black [&_pre:has(code:not([class*='language-']))]:before:hidden [&_pre:has(code:not([class*='language-']))]:after:hidden [&_pre:has(code:not([class*='language-']))>code]:text-orange
                        [&_blockquote]:border-l-4 [&_blockquote]:border-orange [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[14px] sm:[&_blockquote]:text-[16px] md:[&_blockquote]:text-[18px] [&_blockquote]:font-chivo [&_blockquote]:mb-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
} 