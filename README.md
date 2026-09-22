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

Featured article slots on the homepage draw from the newest featured MDX files. All files are published at build time, including future-dated files: keep drafts outside `content/articles`. Missing images, required fields, invalid slugs, and duplicate slugs fail the build with a useful message. Only trusted repository contributors should author MDX; it can execute code. Use regular Markdown syntax for the simplest workflow.

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

Article index, client-side search, static MDX routes, related articles, and copy-link sharing work. Our Mission is a published page. Videos, podcast, events, support, and contact have explicit coming-soon pages. No payment data is collected.

The newsletter form submits through a Next.js server route to the configured email provider. It requires a server-capable deployment such as Vercel; static exports cannot serve the `/api/newsletter` endpoint. Keep provider credentials server-side, and add consent and rate limiting as appropriate.

No articles are currently published. Reintroduce the article-detail route alongside the first MDX article before publishing it. The requested “Join Thousands” headline is supplied brand copy, not a verified subscriber count; confirm that claim or revise it before launch.

## Photos

The homepage hero, `dc-blue-sky.png`, is an AI-generated illustrative D.C. panorama. Generation details and the prompt are recorded in `brand/dc-landscape-generation.md`.

Photos are stored locally for reliable loading and served through Next Image optimization. All are used as illustrative placeholders; pictured people do not endorse the platform. Replace the group photo with owned event photography when available.

- `hero.jpg`: Perry Kibler, Sawtooth Range, Idaho — https://unsplash.com/photos/uHuOg5xjdKc
- `landscape.jpg`: Sean Nufer, American flag — https://unsplash.com/photos/yOVIM4Jpe_o
- `community.jpg`: Small Group Network, group conversation — https://unsplash.com/photos/6jzYgQYPIEw
- License: https://unsplash.com/license

Typography uses local system font stacks (Impact/Arial Narrow, Georgia, Arial) without external font requests. The layout works with fallback fonts across platforms.

## Reference-matched homepage

The homepage follows the supplied September 2026 mockup: integrated hero header, striped typographic wordmark, six-item platform strip, four image-overlay featured cards, monument/event split, compact signup, landscape banner, and dark footer. Article cards use the MDX content system; podcast and video cards lead to clearly marked coming-soon pages. Social icons are labeled placeholders until official profiles are supplied.

`getFeaturedArticles()` provides newest-first featured content for the homepage when articles are published.

Additional local placeholder photography (no endorsement implied):

- `dc-sunrise.jpg`: Sara Cottle, golden Washington skyline — https://unsplash.com/photos/silhouette-of-trees-and-buildings-during-sunset-F_CHcgDY9fI
- `flag-close.jpg`: Osman Rana — https://unsplash.com/photos/closeup-photo-of-usa-flag-5suZOn9jRas
- `monument.jpg`: Philipp Katzenberger, Lincoln Memorial — https://unsplash.com/photos/abraham-lincoln-statue-2aq5aGBQC-s
- `capitol.jpg`: Louis Velazquez — https://unsplash.com/photos/united-states-capitol-building-in-washington-XWW746i6WoM
- `podcast.jpg`: cottonbro studio — https://www.pexels.com/photo/a-man-sitting-on-a-table-with-a-microphone-6883798/
- `campus.jpg`: Allan Lee, Operation Welcome Home parade (illustrative community gathering, not a Take Back America event) — https://www.pexels.com/photo/people-gathering-on-street-for-a-parade-9483730/
- `essay.jpg`: Atlantic Ambience — https://www.pexels.com/photo/unrecognizable-person-with-american-flag-7911934/
- Licenses: https://unsplash.com/license and https://www.pexels.com/license/

## Active branding

The header, hero, footer, and browser icons now use the owner-supplied media package. The original ZIP and asset documentation are preserved in `brand/`; see `brand/README.md` for the exact source-to-website mapping. Earlier logo concepts are archived in `brand/logo-workshop/` and are no longer served by the website.
