import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleMagazine from "@/components/ArticleMagazine";
export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore ideas on character, culture, responsibility, and American renewal.",
  alternates: { canonical: "/articles" },
};
export default function Articles() {
  return (
    <main className="container magazine-page">
      <ArticleMagazine articles={getAllArticles()} title="Latest articles" showCategorySections />
    </main>
  );
}
