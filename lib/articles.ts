import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  imagePosition?: string;
  featured: boolean;
  sample?: boolean;
  content: string;
  readingTime: number;
};
const directory = path.join(process.cwd(), "content/articles");
export function getAllArticles(): Article[] {
  const articles = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      for (const key of [
        "title",
        "slug",
        "excerpt",
        "date",
        "author",
        "category",
      ]) {
        if (typeof data[key] !== "string" || !data[key].trim())
          throw new Error(
            `${file}: ${key} must be a nonempty string (quote dates).`,
          );
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug))
        throw new Error(`${file}: invalid slug`);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
        Number.isNaN(Date.parse(data.date))
      )
        throw new Error(`${file}: invalid date`);
      if (typeof data.featured !== "boolean")
        throw new Error(`${file}: featured must be true or false`);
      if (
        data.image !== undefined &&
        (typeof data.image !== "string" ||
          !data.image.startsWith("/images/") ||
          data.image.includes("..") ||
          !fs.existsSync(path.join(process.cwd(), "public", data.image)))
      )
        throw new Error(`${file}: image must exist in public/images`);
      if (data.imagePosition !== undefined && (typeof data.imagePosition !== "string" || !/^\d{1,3}% \d{1,3}%$/.test(data.imagePosition)))
        throw new Error(`${file}: imagePosition must be two percentages`);
      return {
        ...data,
        content,
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
      } as Article;
    });
  if (new Set(articles.map((a) => a.slug)).size !== articles.length)
    throw new Error("Article slugs must be unique");
  return articles.sort((a, b) => b.date.localeCompare(a.date));
}
export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function getFeaturedArticles() {
  return getAllArticles().filter((article) => article.featured);
}
