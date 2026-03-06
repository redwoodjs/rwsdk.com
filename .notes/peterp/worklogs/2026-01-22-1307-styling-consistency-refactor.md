---
title: Consistent Styling Refactor with Tailwind CSS
date: 2026-01-22 13:07
author: peterp
---

# Consistent Styling Refactor with Tailwind CSS

## Summary
We refactored the RedwoodSDK website to achieve a consistent, premium design (lol, AI.) across all pages. This involved migrating component-specific styles from a global `styles.css` to Tailwind CSS, implementing a standard font hierarchy (Noto Sans for body/titles, Playfair Display for page-level accents), and refining link underlining rules.

## The Problem
The website had inconsistent styling:
- Secondary pages (Blog, Start, 404) didn't match the homepage aesthetic.
- Global `styles.css` contained many ad-hoc component styles.
- Link underlining was inconsistent (some were underlined, many weren't).
- Font hierarchy wasn't strictly enforced across the MDX blog content and page components.

## Investigation & Timeline
*   **Initial State:** A mix of global CSS and some Tailwind classes. Global `styles.css` handles most layout and typography but is hard to maintain.
*   **Attempts:**
    *   **Attempt 1:** Applied a global `a { @apply underline; }` and `font-playfair` to all headings.
    *   **Feedback:** User preferred blog post titles and descriptions to be sans-serif (Noto Sans) and found global underlines too "busy" in specific contexts like the GitHub star widget and blog post content.
    *   **Attempt 2:** Reverted blog post titles/descriptions to sans-serif and removed the global underline rule in favor of specific styling or cleaner defaults.

## Discovery & Key Findings
*   **Typography Control:** `prose` (Tailwind Typography) needs explicit classes like `prose-headings:font-bold` to override default serif-less styles if global defaults aren't enough.
*   **Global Rules vs. Specificity:** A global underline rule on `a` tags is often too aggressive for UI elements (logos, widgets) and requires frequent `no-underline` overrides. It's cleaner to handle it per-component or for specific content blocks.

## Resolution
*   Cleaned up `src/app/styles.css` to focus on global resets and animations.
*   Updated `src/app/Document.tsx` to set `font-noto` as the global body font.
*   Applied `font-playfair` (Serif) to major page-level headings in:
    *   `Start.tsx`
    *   `404.tsx`
    *   `PersonalSoftware.tsx`
*   Set main headings in `HireUs.tsx` and `BlogList.tsx` to bold sans-serif for clarity.
*   Updated `Content.tsx` to use bold sans-serif for blog post subheadings.
*   Refined `Navbar.tsx` and `GitHubStarWidget.tsx` to remove stray underlines.
*   Ensured consistent layout widths (`max-w-[800px]`) for blog posts.