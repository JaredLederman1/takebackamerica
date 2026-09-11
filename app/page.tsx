import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import PlatformNav from "@/components/PlatformNav";
import ArticleCard from "@/components/ArticleCard";
import MissionSection from "@/components/MissionSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllArticles } from "@/lib/articles";
export default function Home() {
  const articles = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);
  return (
    <>
      <Hero />
      <PlatformNav />
      <section className="container featured section-space">
        <div className="section-heading">
          <div>
            <span className="eyebrow red">IDEAS WORTH ENGAGING</span>
            <h2>
              FEATURED<span className="red">.</span>
            </h2>
          </div>
          <Link className="text-link" href="/articles">
            All articles <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="featured-grid">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} large={i === 0} />
          ))}
        </div>
      </section>
      <MissionSection />
      <section className="container community section-space">
        <div className="community-copy">
          <span className="eyebrow red">BE PART OF THE CONVERSATION</span>
          <h2>
            REAL PEOPLE.
            <br />
            REAL CONVERSATIONS.
            <br />
            <span>REAL CHANGE.</span>
          </h2>
          <p>
            Good ideas grow when people come together. On campus, in our
            communities, and across the country—there’s a place for your voice.
          </p>
          <Link href="/events" className="text-link">
            Upcoming events <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="community-image">
          <Image
            src="/images/community.jpg"
            alt="People coming together for a conversation"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span>SHOW UP. SPEAK UP. BUILD TOGETHER.</span>
        </div>
      </section>
      <NewsletterSignup />
      <section className="closing-banner">
        <Image src="/images/hero.jpg" alt="" fill sizes="100vw" />
        <div>
          <span className="eyebrow">LOOK AHEAD. AIM HIGHER.</span>
          <h2>
            HIGHER PEOPLE.
            <br />
            HIGHER STANDARDS.
          </h2>
        </div>
      </section>
    </>
  );
}
