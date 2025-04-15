import { Author, authors } from './authors';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: Author;
  image: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    slug: 'redwoodjs-to-redwoodsdk',
    title: 'From RedwoodJS to RedwoodSDK',
    description: 'RedwoodSDK is here. RedwoodJS is not going anywhere. We are excited to share that our focus is evolving to a new direction: RedwoodSDK 🚀',
    date: '2025-04-01',
    author: authors['peter'],
    image: '86a788b0-00dd-481b-30c3-e05e9d372800',
    tags: ['redwoodjs', 'redwoodsdk'],
  },
]; 