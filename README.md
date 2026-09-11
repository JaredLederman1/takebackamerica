# Take Back America

A responsive editorial platform built with Next.js App Router, TypeScript, CSS, and local MDX. Requires Node.js 22+.

## Develop

```sh
npm ci
npm run dev
```

## Publish an article

1. Add an image to `public/images/`.
2. Create `content/articles/your-article.mdx` with the frontmatter below. Dates must be quoted. Slugs must be unique lowercase words separated by hyphens.
3. Write Markdown below the frontmatter, commit, and push. Vercel rebuilds the index, article routes, and sitemap automatically.

```mdx
---
title: "Your article headline"
slug: "your-article"
excerpt: "A short editorial deck."
date: "2026-09-11"
author: "Author Name"
category: "Culture"
image: "/images/your-image.jpg"
featured: true
---

Your opening paragraph.

## A section heading

More of your article.
```

Three featured articles appear on the homepage, newest first. All files are published at build time, including future-dated files: keep drafts outside `content/articles`. Missing images, required fields, invalid slugs, and duplicate slugs fail the build with a useful message. Only trusted repository contributors should author MDX; it can execute code. Use regular Markdown syntax for the simplest workflow.

## Validate

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## Deploy on Vercel

Import this GitHub repository into Vercel and select the Next.js framework preset. Use the default build command (`npm run build`) and output settings. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS origin (no trailing slash) for canonical URLs, structured data, sitemap, and robots. Without it, the Vercel production project URL is used. No database or other service is required.

## Current scope

Article index, client-side search, static MDX routes, related articles, and copy-link sharing work. About is a published mission page. Videos, podcast, events, support, contact, and involvement have explicit coming-soon pages. No payment data is collected.

The newsletter form validates an email and shows an honest local preview response; it does **not** store or transmit emails. Integrate an email provider through a server-side route before enabling actual subscriptions, keep provider credentials server-side, and add consent, rate limiting, and provider-error handling as appropriate. Do not change the success copy to claim a subscription until the provider confirms it.

Sample articles are explicitly labeled on their reading pages and should be replaced or approved before launch. The requested “Join Thousands” headline is supplied brand copy, not a verified subscriber count; confirm that claim or revise it before launch.

## Photos

Photos are stored locally for reliable loading and served through Next Image optimization. All are used as illustrative placeholders; pictured people do not endorse the platform. Replace the group photo with owned event photography when available.

- `hero.jpg`: Perry Kibler, Sawtooth Range, Idaho — https://unsplash.com/photos/uHuOg5xjdKc
- `landscape.jpg`: Sean Nufer, American flag — https://unsplash.com/photos/yOVIM4Jpe_o
- `community.jpg`: Small Group Network, group conversation — https://unsplash.com/photos/6jzYgQYPIEw
- License: https://unsplash.com/license

Typography uses local system font stacks (Impact/Arial Narrow, Georgia, Arial) without external font requests. The layout works with fallback fonts across platforms.
