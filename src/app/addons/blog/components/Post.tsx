"use client";
import { CloudflareImage } from "src/components/CloudflareImage";
import { BlogPost } from "../data/posts/types";
import Content from "./Content";

export default function Post({ post }: { post: BlogPost }) {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-8 overflow-x-hidden">
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-row items-center gap-2 mb-8 font-mono text-xs sm:text-sm text-slate-600 uppercase">
          {post.author && (
            <div className="flex items-center gap-2 text-slate-400">
              <span>by</span>
              {post.author.avatar && (
                <CloudflareImage
                  imageId={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-sm object-cover [image-rendering:pixelated] grayscale"
                  loading="eager"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          )}
          {post.author && <span>•</span>}
          <div>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
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
      </header>

      <Content content={post.content} />
    </div>
  );
}
