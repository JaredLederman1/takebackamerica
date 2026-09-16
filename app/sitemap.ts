import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/articles` },
    { url: `${siteUrl}/about` },
    ...getAllArticles().map((a) => ({
      url: `${siteUrl}/articles/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ];
}
