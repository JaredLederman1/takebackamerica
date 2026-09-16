import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleGrid from "@/components/ArticleGrid";
export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore ideas on character, culture, responsibility, and American renewal.",
  alternates: { canonical: "/articles" },
};
export default function Articles() {
  return (
    <div className="container">
      <div className="page-intro">
        <h1>Articles</h1>
        <p className="articles-subtitle">
          Read closely, engage honestly, and share the ideas worth carrying forward.
        </p>
      </div>
      <ArticleGrid
        articles={getAllArticles().map((a) => ({ ...a, content: "" }))}
      />
    </div>
  );
}
