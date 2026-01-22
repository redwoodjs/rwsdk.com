import Post from "../components/Post";
import { blogPostSlugs, getBlogPost } from "../data/posts/index";
import { marked } from "marked";
import { link } from "src/shared/links";
import { SEO } from "src/components/SEO";


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
  const trimmedContent = await marked(content.trim());
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
            slug: data.slug,
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
