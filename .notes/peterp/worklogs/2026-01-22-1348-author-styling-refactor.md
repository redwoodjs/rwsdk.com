---
title: Author Styling Refactor
date: 2026-01-22 13:48
author: peterp
---

# Author Styling Refactor

## Summary
We refactored the author and date metadata across the blog (individual posts and list page). The author info was moved from a large standalone block to a compact metadata line under the post heading, featuring a small, grayscale, pixelated avatar.

## The Problem
The original design had a large author section below the hero image that felt disconnected. The goal was to consolidate this info into a single cohesive line with the date, using a specific "retro" aesthetic (pixelated, grayscale).

## Investigation & Timeline
* **Initial State:** standalone author block with large circular avatar, name, and role below the hero image.
* **Attempts:**
    * **B&W + Right-Aligned:** First attempt moved the image next to the date on the right.
    * **Orange Tint + Pixelated:** Tried an orange filter with pixelated rendering.
    * **Grayscale + Left-Aligned:** Switched back to grayscale and moved the metadata line to the left.
    * **Final Format:** Settled on `by [IMAGE] [NAME] • [DATE]` (later refined to `[IMAGE] [NAME], [DATE]`) placed directly under the main heading.

## Discovery & Key Findings
* Using `[image-rendering:pixelated]` combined with CSS filters (`grayscale(1)`) effectively achieves the desired aesthetic without needing new assets.
* Moving metadata under the heading improved the reading flow and reduced visual clutter below the hero image.

## Resolution
The metadata line was unified across `Post.tsx` and `BlogList.tsx`.

**Final Metadata Structure:**
```tsx
<div className="flex flex-row items-center gap-1 mb-4 text-xs sm:text-sm text-slate-600">
  {blog.author && (
    <div className="flex items-center gap-1">
      <CloudflareImage
        imageId={blog.author.avatar}
        alt={blog.author.name}
        className="w-6 h-6 rounded-full object-cover [image-rendering:pixelated] grayscale"
      />
      <span>{blog.author.name},</span>
    </div>
  )}
  <div>{formattedDate}</div>
</div>
```