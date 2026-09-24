import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { assetPath } from "@/lib/paths";
export default function ArticleCard({
  article,
  large = false,
  showCategory = true,
}: {
  article: Article;
  large?: boolean;
  showCategory?: boolean;
}) {
  return (
    <article className={`article-card ${large ? "card-large" : ""}`}>
      {article.image && (
        <Link
          href={`/articles/${article.slug}`}
          className="card-image"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={assetPath(article.image)}
            alt=""
            fill
            style={{ objectPosition: article.imagePosition || "50% 50%" }}
            sizes={
              large
                ? "(max-width: 760px) 100vw, 55vw"
                : "(max-width: 760px) 100vw, 33vw"
            }
          />
        </Link>
      )}
      <div className="card-copy">
        {showCategory && <span className="eyebrow red">{article.category}</span>}
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <div className="meta">
          <span>By {article.author}</span>
          <span>·</span>
          {formatDate(article.date)}
          <span>·</span>
          {article.readingTime} min read
        </div>
      </div>
    </article>
  );
}
