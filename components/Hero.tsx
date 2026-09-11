import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo">
        <Image
          src="/images/hero.jpg"
          alt="Sunlight over the mountains and open landscape of America"
          fill
          loading="eager"
          sizes="100vw"
        />
      </div>
      <div className="container hero-content">
        <div className="eyebrow hero-eyebrow">
          <span /> BOLDER PEOPLE. A BRIGHTER TOMORROW.
        </div>
        <h1>
          TAKE BACK
          <br />
          <span>AMERICA</span>
          <b>.</b>
        </h1>
        <p className="hero-tagline">Ideas. People. Action.</p>
        <p className="hero-description">
          A media platform and movement for people ready
          <br className="desktop-break" /> to build a stronger America. Starting
          with ourselves.
        </p>
        <div className="hero-buttons">
          <Link className="button" href="#newsletter">
            Join the movement <ArrowUpRight size={18} />
          </Link>
          <Link className="hero-secondary" href="/articles">
            Read the latest <ArrowDown size={17} />
          </Link>
        </div>
        <div className="hero-caption">
          <span>ROOTED IN POSSIBILITY.</span>
          <span>BUILT FOR WHAT COMES NEXT.</span>
        </div>
      </div>
    </section>
  );
}
