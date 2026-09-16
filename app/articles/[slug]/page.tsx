import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug((await params).slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug((await params).slug);
  if (!article) notFound();
  return (
    <article>
      <header className="container article-heading article-heading-no-image">
        <h1>{article.title}</h1>
        <p className="article-deck">{article.excerpt}</p>
      </header>
      <div className="container prose article-prose">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
