import { Author } from '../authors';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: Author;
    image: string;
    tags: string[];
    content: string;
} 