import Post from "../components/post";
import { blogPostSlugs, getBlogPost } from "../data/posts/index";
import { marked } from "marked";
import { link } from "src/shared/links";
import { SEO } from "src/components/seo";


interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const slug = params.slug;

  if (!blogPostSlugs.includes(slug)) {
    throw new Error(`Module loader not found for: ${slug}`);
  }

  const { data, content } = await getBlogPost(slug);
  const rawHtml = await marked(content.trim());
  // Strip the first <h1> from rendered markdown to avoid duplicating the title
  // that the Post component already renders from frontmatter.
  const trimmedContent = rawHtml.replace(/<h1[^>]*>.*?<\/h1>\s*/, "");
  return (
    <>
      <SEO
        title={`${data.title} | Blog | RedwoodSDK`}
        description={data.description}
        ogType="article"
        ogUrl={`https://rwsdk.com${link("/blog/:slug", { slug })}`}
        ogImage={data.ogImage}
      />

      <div className="flex flex-col min-h-screen">
        <Post
          post={{
            slug: slug,
            title: data.title,
            description: data.description,
            date: data.date,
            content: trimmedContent,
            author: data.author,
            image: data.heroImage,
            tags: data.tags || [],
          }}
        />
      </div>
    </>
  );
}
