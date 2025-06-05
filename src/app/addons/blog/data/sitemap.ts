import { blogPosts } from "./posts/index";

export async function generateBlogSitemap() {
  const posts = await Promise.all(
    Object.entries(blogPosts).map(async ([slug, getPost]) => {
      const { data } = await getPost();
      return { slug, date: data.date };
    })
  );

  const blogUrls = posts.map(({ slug, date }) => {
    return `  <url>\n    <loc>https://rwsdk.com/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
  });

  return blogUrls;
}