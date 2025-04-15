import { Author, authors } from './authors';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: Author;
  image: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    slug: 'introducing-redwood-sdk',
    title: 'Introducing Redwood SDK',
    description: 'A comprehensive guide to getting started with Redwood SDK',
    date: '2024-03-20',
    readTime: '5 min read',
    author: authors['peter'],
    image: '782e6243-41a3-47ee-0cdc-e322ef043700',
    tags: ['redwood', 'sdk', 'tutorial']
  },
]; 