// import { blogPosts } from "../public/blog/data/posts/index";

type Post = { slug: string; date: string };

const staticUrls = [`
  <url>
    <loc>https://rwsdk.com/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  `<url>
    <loc>https://rwsdk.com/personal-software</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  `<url>
    <loc>https://docs.rwsdk.com/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
  `<url>
    <loc>https://docs.rwsdk.com/getting-started/quick-start/</loc>
    <lastmod>2024-03-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
  `<url>
    <loc>https://rwsdk.com/blog</loc>
    <lastmod>2025-04-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
];

// const blogUrls = (blogPosts as Post[]).map(({ slug, date }) => {
//   return `  <url>\n    <loc>https://rwsdk.com/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
// });

// ${[...staticUrls, ...blogUrls].join("\n")}\n

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
</urlset>`;

export default sitemap;
