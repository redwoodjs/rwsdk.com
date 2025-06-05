// Use Vite's import.meta.glob to get all markdown files
const blogModules = import.meta.glob('./*.md', { as: 'raw', eager: true });

// Get all available blog post slugs
const blogPostSlugs = Object.keys(blogModules).map(key => key.replace('./', '').replace('.md', ''));

export type BlogPostSlug = string;

export function getBlogModule(slug: BlogPostSlug) {
    const key = `./${slug}.md`;
    return blogModules[key];
}

export function getAllBlogSlugs() {
    return blogPostSlugs;
} 