import { blogPostSlugs, getBlogPost } from "./posts/index";
import { link } from "src/shared/links";

export async function generateBlogSitemap(): Promise<string[]> {
  const posts = await Promise.all(
    blogPostSlugs.map(async (slug) => {
      const { data } = await getBlogPost(slug);
      return { slug, date: data.date };
    })
  );

  const blogUrls: string[] = posts.map(({ slug, date }) => {
    return `  <url>\n    <loc>https://rwsdk.com${link("/blog/:slug", { slug })}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
  });

  return blogUrls;
}