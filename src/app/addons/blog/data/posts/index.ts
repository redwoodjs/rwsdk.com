import { Author, authors } from '../authors';
import { getBlogModule, getAllBlogSlugs, BlogPostSlug } from './modules';

type BlogPostData = {
    title: string;
    description: string;
    date: string;
    author: Author;
    heroImage: string;
    tags?: string[];
    draft?: boolean;
    [key: string]: any; // Allow additional properties
};

async function parseFrontmatter(content: string) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { data: {} as BlogPostData, content };
    }

    const frontmatter = match[1];
    const markdown = content.slice(match[0].length);

    // Initialize the data object
    const data: BlogPostData = {
        title: '',
        description: '',
        date: '',
        author: {
            name: '',
            role: '',
            avatar: ''
        },
        heroImage: '',
        tags: [],
        draft: false
    };

    // Parse YAML frontmatter
    const lines = frontmatter.split('\n');
    let currentKey = '';
    let authorId = '';

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;

        // Handle nested objects
        if (line.startsWith('  ')) {
            const [key, ...values] = line.trim().split(':');
            if (key && values.length > 0) {
                const value = values.join(':').trim().replace(/^["']|["']$/g, '');
                if (currentKey === 'author' && key === 'id') {
                    authorId = value;
                }
            }
            continue;
        }

        // Handle top-level keys
        const [key, ...values] = line.split(':');
        if (key && values.length > 0) {
            const value = values.join(':').trim().replace(/^["']|["']$/g, '');
            currentKey = key.trim();
            
            if (currentKey === 'tags') {
                // Handle tags array
                const tagsMatch = value.match(/\[(.*?)\]/);
                if (tagsMatch) {
                    data.tags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/^["']|["']$/g, ''));
                }
            } else if (currentKey === 'draft') {
                // Handle draft boolean
                data.draft = value.toLowerCase() === 'true';
            } else if (currentKey !== 'author') {
                const dataKey = currentKey as keyof BlogPostData;
                if (dataKey !== 'author' && dataKey !== 'tags' && dataKey !== 'draft') {
                    data[dataKey] = value as any;
                }
            }
        }
    }

    // Set author data if we have an author ID
    if (authorId && authors[authorId]) {
        data.author = authors[authorId];
    }

    return { data, content: markdown };
}

// Create a function to get blog posts instead of an object
export async function getBlogPost(slug: BlogPostSlug) {
    const module = getBlogModule(slug);
    if (!module) {
        throw new Error(`Blog post ${slug} not found`);
    }
    const content = module as string;
    return parseFrontmatter(content);
}

// Get all available blog post slugs
export const blogPostSlugs = getAllBlogSlugs(); 