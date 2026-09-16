import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/articles";
export default function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="empty-results">
        <h2>Articles coming soon.</h2>
        <p>Check back soon for the latest from Take Back America.</p>
      </div>
    );
  }
  return (
    <div className="article-index-grid">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
