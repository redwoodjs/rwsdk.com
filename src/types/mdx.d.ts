declare module '*.mdx' {
    import { ComponentType } from 'react';
    const Component: ComponentType;
    export const frontmatter: {
        title: string;
        description: string;
        date: string;
        author: {
            name: string;
            role: string;
            avatar: string;
        };
        image: string;
        tags: string[];
    };
    export default Component;
}