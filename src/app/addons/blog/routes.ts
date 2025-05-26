import { route, index } from "rwsdk/router";
import BlogList from "./pages/BlogList";
import BlogPage from "./pages/BlogPage";
import { notFound } from "src/utils/notFound";
import { blogPosts } from "./data/posts";

export const blogRoutes = [
    index(BlogList),
    route("/:slug", [
      async ({ params }) => {
      const slug = params.slug;
      if (!Object.keys(blogPosts).includes(slug)) {
        return notFound();
      }
    },
    BlogPage,
  ]),
]