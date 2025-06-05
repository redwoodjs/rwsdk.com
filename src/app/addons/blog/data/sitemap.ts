import { blogPostSlugs, getBlogPost } from "./posts/index";

export async function generateBlogSitemap() {
  const posts = await Promise.all(
    blogPostSlugs.map(async (slug) => {
      const { data } = await getBlogPost(slug);
      return { slug, date: data.date };
    })
  );

  const blogUrls = posts.map(({ slug, date }) => {
    return `  <url>\n    <loc>https://rwsdk.com/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
  });

  return blogUrls;
}