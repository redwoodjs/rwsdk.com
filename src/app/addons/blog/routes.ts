import { route, index } from "rwsdk/router";

import  BlogList from "./pages/BlogList";
import BlogPage from "./pages/BlogPage";
import { notFound } from "src/utils/notFound";
import { blogPostSlugs, getBlogPost } from "./data/posts";

export const blogRoutes = [
  index(BlogList),
  route("/:slug", [
    async ({ params }) => {
      const slug = params.slug;
      if (!blogPostSlugs.includes(slug)) {
        return notFound();
      }
      // Check if post is a draft and block access
      const { data } = await getBlogPost(slug);
      if (data.draft) {
        return notFound();
      }
    },
    BlogPage,
  ]),
];
