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
        <span className="eyebrow red">IDEAS. PERSPECTIVES. POSSIBILITY.</span>
        <h1>
          THE LATEST<span className="red">.</span>
        </h1>
        <p>
          Ideas worth reading. Questions worth asking. A conversation about what
          comes next.
        </p>
      </div>
      <ArticleGrid
        articles={getAllArticles().map((a) => ({ ...a, content: "" }))}
      />
    </div>
  );
}
