import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import PlatformNav from "@/components/PlatformNav";
import FeaturedCard, { type FeaturedItem } from "@/components/FeaturedCard";
import MissionSection from "@/components/MissionSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getFeaturedArticles } from "@/lib/articles";
export default function Home() {
  const articles = getFeaturedArticles();
  const essay = articles[0];
  const latest =
    articles.find(
      (a) => a.slug !== essay?.slug && a.slug !== "same-land-brighter-tomorrow",
    ) ?? articles[1];
  const cards: FeaturedItem[] = [
    ...(essay
      ? [
          {
            title: essay.title,
            label: "Featured essay",
            excerpt: essay.excerpt,
            image: essay.image,
            href: `/articles/${essay.slug}`,
          },
        ]
      : []),
    {
      title: "What Went Wrong and How We Fix It",
      label: "Latest podcast",
      excerpt: "A conversation on culture, politics, and the next generation.",
      image: "/images/podcast.jpg",
      href: "/podcast",
      play: true,
      comingSoon: true,
    },
    {
      title: "Same Land. A Brighter Tomorrow.",
      label: "Featured video",
      excerpt: "A short film on what’s still worth fighting for.",
      image: "/images/hero.jpg",
      href: "/videos",
      play: true,
      comingSoon: true,
    },
    ...(latest
      ? [
          {
            title: latest.title,
            label: "Latest article",
            excerpt: latest.excerpt,
            image: latest.image,
            href: `/articles/${latest.slug}`,
          },
        ]
      : []),
  ];
  return (
    <>
      <Hero />
      <PlatformNav />
      <section className="featured">
        <div className="container">
          <div className="featured-heading">
            <h2>FEATURED</h2>
            <Link href="/articles">
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="featured-grid">
            {cards.map((item) => (
              <FeaturedCard item={item} key={item.href} />
            ))}
          </div>
        </div>
      </section>
      <MissionSection />
      <NewsletterSignup />
      <section className="closing-banner">
        <Image
          src="/images/hero.jpg"
          alt="Sunrise over the Sawtooth mountains in Idaho"
          fill
          sizes="100vw"
        />
        <div>
          <h2>HIGHER PEOPLE. HIGHER STANDARDS.</h2>
          <span />
        </div>
      </section>
    </>
  );
}
