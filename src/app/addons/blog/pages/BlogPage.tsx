import { Navbar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";
import Post from "../components/Post";
import { blogPostSlugs, getBlogPost } from "../data/posts/index";
import { marked } from "marked";
import { link } from "src/shared/links";


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
  // if (data.id) {
  //   data["author"] = authors[data.id];
  // }
  const trimmedContent = await marked(content.trim());
  return (
    <>
      {/* SEO Metadata */}
      <title>{`${data.title} | RedwoodSDK`}</title>
      <meta name="description" content={data.description} />
      <meta property="og:title" content={`${data.title} | RedwoodSDK`} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://rwsdk.com${link("/blog/:slug", { slug })}`} />
      <meta property="og:image" content={data.ogImage} />

      <div className="flex flex-col min-h-screen">
        <Navbar activePage="blog" />
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
        <Footer />
      </div>
    </>
  );
}
