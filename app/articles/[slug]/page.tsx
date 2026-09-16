import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { assetPath } from "@/lib/paths";

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
      {article.image && (
        <div className="container article-cover">
          <Image
            src={assetPath(article.image)}
            alt="Silhouetted couple holding hands at sunset"
            fill
            sizes="(max-width: 760px) 100vw, 1100px"
            priority
          />
        </div>
      )}
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
