import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getAllArticles, getArticleBySlug } from "@/lib/articles";
import { assetPath } from "@/lib/paths";
import { hasAuthorSession } from "@/lib/author-auth";
import Link from "next/link";
import ArticleHeadline from "@/components/ArticleHeadline";

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
  const isAdmin = await hasAuthorSession();
  return (
    <article>
      <header className="container article-heading article-feature-header">
        <div className="article-feature-copy">
          <h1><ArticleHeadline title={article.title} /></h1>
          <p className="article-deck">{article.excerpt}</p>
          <div className="article-feature-byline">
            <Image
              src={assetPath("/images/jared-lederman.png")}
              alt="Jared Lederman"
              width={64}
              height={64}
            />
            <div>
              <span>By {article.author}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <i aria-hidden="true" />
            </div>
          </div>
          {isAdmin && <Link className="article-edit-button" href={`/post?slug=${encodeURIComponent(article.slug)}`}>Edit piece</Link>}
        </div>
        {article.image && (
          <div className="article-feature-image">
          <Image
            src={assetPath(article.image)}
            alt="Silhouetted couple holding hands at sunset"
            fill
            style={{ objectPosition: article.imagePosition || "50% 50%" }}
            sizes="(max-width: 760px) 100vw, 50vw"
            priority
          />
          </div>
        )}
      </header>
      <div className="container prose article-prose">
        <MDXRemote source={article.content} />
        <p className="photo-credit">Photo by Caleb Ekeroth on Unsplash</p>
      </div>
      <aside className="container author-profile" aria-label="About the author">
        <Image
          src={assetPath("/images/jared-lederman.png")}
          alt="Jared Lederman"
          width={160}
          height={160}
        />
        <div>
          <span className="eyebrow red">About the author</span>
          <h2>Jared Lederman</h2>
          <p>
            Jared Lederman is the founder of Take Back America and a senior at
            Cornell University. He writes on culture, family, faith, and the
            responsibilities that shape a stronger America.
          </p>
        </div>
      </aside>
    </article>
  );
}
