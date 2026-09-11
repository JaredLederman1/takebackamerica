import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug, formatDate } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import ShareButton from "@/components/ShareButton";
import { siteUrl } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug((await params).slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.excerpt,
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug((await params).slug);
  if (!article) notFound();
  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    image: `${siteUrl}${article.image}`,
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <header className="container article-heading">
          <Link href="/articles" className="back-link">
            ← All articles
          </Link>
          <div className="eyebrow red">{article.category}</div>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.excerpt}</p>
          <div className="article-byline">
            <div>
              <strong>{article.author}</strong>
              <div className="meta">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span>·</span>
                {article.readingTime} min read
              </div>
            </div>
            <ShareButton />
          </div>
        </header>
        <div className="container article-cover">
          <Image
            src={article.image}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 1100px"
          />
        </div>
        <div className="container prose">
          {article.sample && (
            <p className="sample-note">
              Sample editorial · This article demonstrates the publishing
              format. Photography is illustrative and does not imply
              endorsement.
            </p>
          )}
          <MDXRemote source={article.content} />
        </div>
      </article>
      <section className="container related">
        <div className="section-heading">
          <h2>
            KEEP READING<span className="red">.</span>
          </h2>
        </div>
        <div className="related-grid">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
