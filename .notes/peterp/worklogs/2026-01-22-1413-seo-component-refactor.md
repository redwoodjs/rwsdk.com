---
title: SEO Component Refactor
date: 2026-01-22 14:13
author: peterp
---

# SEO Component Refactor

## Summary
Refactored the SEO and meta tag implementation across multiple pages into a single, reusable `SEO` component to eliminate duplication and ensure consistency.

## The Problem
SEO tags (title, meta description, OpenGraph, Twitter, and JSON-LD structured data) were duplicated across several page components (`HireUs.tsx`, `Home.tsx`, `Start.tsx`, etc.). This made maintenance difficult and prone to inconsistencies.

## Investigation & Timeline
* **Initial State:** Multiple pages had manually defined meta tags and structured data scripts.
* **Attempts:** 
    * Identified all pages with SEO duplication.
    * Created `src/app/components/SEO.tsx` to centralize the logic.
    * Progressively refactored pages: `HireUs.tsx` -> `Home.tsx` -> `Start.tsx` -> `404.tsx` -> `BlogPage.tsx` -> `BlogList.tsx` -> `PersonalSoftware.tsx`.
    * Discovered `Start.tsx` needed `robots` tags, so updated the `SEO` component to support an optional `robots` prop.
    * Fixed a lint error in `Start.tsx` where an `@ts-expect-error` was no longer needed after the refactor.

## Discovery & Key Findings
* Centralizing SEO metadata simplifies page components significantly, reducing boilerplate by ~30 lines per page.
* Found a bug in `HireUs.tsx` where the `og:url` was incorrectly set to `/team`.

## Resolution
Created a robust `SEO` component and successfully migrated all main pages to use it.

```tsx
// src/app/components/SEO.tsx
export function SEO({ title, description, ...props }) {
  // Centralized rendering of meta, OG, Twitter, and JSON-LD tags
}
```

## Next Steps
- [x] Verify meta tags on staging
- [ ] Review blog post metadata for further optimization
