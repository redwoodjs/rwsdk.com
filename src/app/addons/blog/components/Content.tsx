"use client";
import { useEffect, useRef } from "react";
import hljs from 'highlight.js';

export default function Content({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Find all code blocks and highlight them
      const codeBlocks = ref.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <div
      ref={ref}
      className="prose prose-lg w-full max-w-none overflow-x-hidden
      [&_h1]:font-jersey [&_h1]:leading-[81%] [&_h1]:mb-4 [&_h1]:text-[36px] sm:[&_h1]:text-[48px] md:[&_h1]:text-[60px] lg:[&_h1]:text-[70px] [&_h1]:text-black [&_h1]:font-bold
    [&_h2]:font-jersey [&_h2]:leading-[81%] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-[24px] sm:[&_h2]:text-[32px] md:[&_h2]:text-[40px] lg:[&_h2]:text-[48px] [&_h2]:text-orange-dark [&_h2]:font-bold
    [&_h3]:font-jersey [&_h3]:leading-[81%] [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-[20px] sm:[&_h3]:text-[24px] md:[&_h3]:text-[32px] lg:[&_h3]:text-[40px] [&_h3]:text-orange-dark
    [&_p]:text-[14px] sm:[&_p]:text-[16px] md:[&_p]:text-[18px] [&_p]:font-chivo [&_p]:font-medium [&_p]:mb-4
    [&_a]:text-orange [&_a]:hover:text-orange-light
    [&_ul]:list-disc [&_ul]:text-[14px] sm:[&_ul]:text-[16px] [&_ul]:font-chivo [&_ul]:mb-4 [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:text-[14px] sm:[&_ol]:text-[16px] [&_ol]:font-chivo [&_ol]:mb-4 [&_ol]:pl-6
    [&_li]:text-[14px] sm:[&_li]:text-[16px] [&_li]:font-chivo [&_li]:mb-2
    [&_li_pre]:mt-2 [&_li_pre]:mb-2 [&_li_pre]:ml-4 [&_li_pre]:text-orange-dark
    [&_pre]:relative [&_pre]:bg-[#0d1117] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-[14px] sm:[&_pre]:text-[16px] [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:w-full [&_pre]:mx-0 [&_pre]:max-w-full [&_pre]:box-border [&_pre]:break-words
    [&_pre]:before:content-[''] [&_pre]:before:absolute [&_pre]:before:top-0 [&_pre]:before:left-0 [&_pre]:before:right-0 [&_pre]:before:h-8 [&_pre]:before:bg-[#161b22] [&_pre]:before:rounded-t-lg [&_pre]:before:flex [&_pre]:before:items-center [&_pre]:before:px-4
    [&_pre]:after:content-[''] [&_pre]:after:absolute [&_pre]:after:top-3 [&_pre]:after:left-4 [&_pre]:after:w-3 [&_pre]:after:h-3 [&_pre]:after:rounded-full [&_pre]:after:bg-[#ff5f56] [&_pre]:after:shadow-[20px_0_0_#ffbd2e,40px_0_0_#27c93f]
    [&_code]:font-mono [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-[13px] sm:[&_code]:text-[14px]
    [&_li_code]:text-orange-light
    [&_p_code]:text-orange-light
    [&_pre_code]:block [&_pre_code]:pt-8 [&_pre_code]:whitespace-pre-wrap [&_pre_code]:overflow-x-auto [&_pre_code]:px-4 [&_pre_code]:w-full [&_pre_code]:max-w-full [&_pre_code]:box-border [&_pre_code]:break-words [&_pre_code]:bg-transparent [&_pre_code]:text-inherit
    [&_pre:has(code:not([class*='language-']))]:bg-black [&_pre:has(code:not([class*='language-']))]:dark:bg-black [&_pre:has(code:not([class*='language-']))]:before:hidden [&_pre:has(code:not([class*='language-']))]:after:hidden [&_pre:has(code:not([class*='language-']))>code]:text-orange
    [&_blockquote]:border-l-4 [&_blockquote]:border-orange [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[14px] sm:[&_blockquote]:text-[16px] md:[&_blockquote]:text-[18px] [&_blockquote]:font-chivo [&_blockquote]:mb-4"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}