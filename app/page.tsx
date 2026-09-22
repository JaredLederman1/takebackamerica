import Hero from "@/components/Hero";
import ArticleMagazine from "@/components/ArticleMagazine";
import MissionSection from "@/components/MissionSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllArticles } from "@/lib/articles";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="container home-latest-articles">
        <ArticleMagazine articles={getAllArticles()} showAllLink />
      </div>
      <MissionSection />
      <NewsletterSignup />
    </>
  );
}
