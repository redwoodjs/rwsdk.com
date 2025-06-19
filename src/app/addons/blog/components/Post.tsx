"use client";
import { CloudflareImage } from "src/components/CloudflareImage";
import { BlogPost } from "../data/posts/types";
import Content from "./Content";

export default function Post({ post }: { post: BlogPost }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 overflow-x-hidden">
      <header className="mb-12">
        {post.image && (
          <div className="w-full mb-8">
            <CloudflareImage
              imageId={post.image}
              alt={post.title}
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        )}

        {post.author && (
          <div className="flex items-center gap-4">
            {post.author.avatar && (
              <CloudflareImage
                imageId={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange"
                loading="eager"
              />
            )}
            <div>
              <p className="font-jersey text-xl text-black">
                {post.author.name}
              </p>
              <p className="text-sm text-orange-dark font-chivo">
                {post.author.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-chivo">
                {post.date}
              </p>
            </div>
          </div>
        )}
      </header>
      <Content content={post.content} />
    </div>
  );
}
