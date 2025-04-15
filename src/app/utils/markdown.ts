import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

export function getBlogPost(slug: string): BlogPost {
    const filePath = path.join(process.cwd(), 'src/app/data/blog', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
        ...data as Omit<BlogPost, 'content' | 'slug'>,
        content: marked.parse(content),
        slug
    };
}

export function getAllBlogPosts(): BlogPost[] {
    const postsDirectory = path.join(process.cwd(), 'src/app/data/blog');
    const fileNames = fs.readdirSync(postsDirectory)
        .filter(file => file.endsWith('.md'));

    return fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        return getBlogPost(slug);
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 