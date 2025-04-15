import matter from 'gray-matter';
import { marked } from 'marked';
import { blogPosts, BlogPostSlug } from '../app/data/blog/manifest';

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    tags: string[];
    content: string;
    slug: string;
}

export async function getBlogPost(slug: BlogPostSlug): Promise<BlogPost> {
    if (!blogPosts.includes(slug)) {
        throw new Error(`Blog post not found: ${slug}`);
    }

    try {
        const post = await import(`../app/data/blog/${slug}.md?raw`);
        const { data, content } = matter(post.default);
        
        return {
            ...data as Omit<BlogPost, 'content' | 'slug'>,
            content: marked.parse(content) as string,
            slug
        };
    } catch (error) {
        throw new Error(`Failed to load blog post: ${slug}`);
    }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const posts = await Promise.all(
        blogPosts.map(slug => getBlogPost(slug))
    );
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 