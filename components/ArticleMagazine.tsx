import Link from "next/link";
import type { Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

type ArticleMagazineProps = {
  articles: Article[];
  showAllLink?: boolean;
  showCategorySections?: boolean;
};

function CategorySections({ articles }: { articles: Article[] }) {
  const categories = new Map<string, Article[]>();
  for (const article of articles) {
    const categoryArticles = categories.get(article.category) || [];
    categoryArticles.push(article);
    categories.set(article.category, categoryArticles);
  }

  return (
    <div className="magazine-categories">
      {[...categories].map(([category, categoryArticles]) => (
        <section className="magazine-category" key={category} aria-labelledby={`category-${category}`}>
          <div className="magazine-category-heading">
            <span className="eyebrow red">{category}</span>
            <h2 id={`category-${category}`}>{category}</h2>
          </div>
          <div className="magazine-category-grid">
            {categoryArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function ArticleMagazine({ articles, showAllLink = false, showCategorySections = false }: ArticleMagazineProps) {
  if (!articles.length) {
    return <div className="empty-results"><h2>Articles coming soon.</h2><p>Check back soon for the latest from Take Back America.</p></div>;
  }

  const latest = articles.slice(0, 5);
  const lead = latest[0];
  const leftColumn = latest.slice(1, 3);
  const rightColumn = latest.slice(3, 5);
  const remainingArticles = articles.slice(5);

  return (
    <section className="magazine">
      {showAllLink && <div className="magazine-all-link"><Link href="/articles" className="text-button">All articles</Link></div>}
      <div className="magazine-latest">
        <div className="magazine-supporting magazine-supporting-left">
          {leftColumn.map((article) => <ArticleCard article={article} key={article.slug} />)}
        </div>
        <div className="magazine-lead"><ArticleCard article={lead} large /></div>
        <div className="magazine-supporting magazine-supporting-right">
          {rightColumn.map((article) => <ArticleCard article={article} key={article.slug} />)}
        </div>
      </div>
      {showCategorySections && remainingArticles.length > 0 && <CategorySections articles={remainingArticles} />}
    </section>
  );
}
