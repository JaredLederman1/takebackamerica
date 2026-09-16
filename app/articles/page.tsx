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
      <ArticleGrid
        articles={getAllArticles().map((a) => ({ ...a, content: "" }))}
      />
    </div>
  );
}
