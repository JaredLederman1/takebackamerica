import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo">
        <Image
          src="/images/dc-sunrise.jpg"
          alt="Washington, D.C. skyline and the Washington Monument in warm golden light"
          fill
          loading="eager"
          sizes="100vw"
        />
      </div>
      <div className="hero-flag">
        <Image
          src="/images/flag-close.jpg"
          alt="American flag"
          fill
          loading="eager"
          sizes="40vw"
        />
      </div>
      <div className="container hero-content">
        <p className="hero-eyebrow">BOLDER PEOPLE. A BRIGHTER TOMORROW.</p>
        <div className="hero-title hero-brand">
          <h1 className="sr-only">Take Back America</h1>
          <Image src="/brand/logo-full.png" alt="Take Back America — A Stronger Tomorrow" width={1600} height={854} loading="eager" sizes="(max-width: 600px) 90vw, 600px" />
        </div>
        <p className="hero-tagline">Ideas. People. Action.</p>
        <p className="hero-description">
          A media platform and movement for a stronger, freer America.
        </p>
        <div className="hero-buttons">
          <Link href="#newsletter" className="button">
            Join the movement <ArrowRight size={18} />
          </Link>
          <Link href="/videos" className="button watch-button">
            <span className="play-solid">
              <Play size={13} fill="currentColor" />
            </span>
            Watch latest
          </Link>
        </div>
      </div>
      <aside className="hero-side" aria-label="Our principles">
        <p>
          IDEAS
          <br />
          PEOPLE
          <br />
          ACTION
          <br />
          RESULTS
        </p>
        <span />
        <p>
          SAME LAND.
          <br />
          HIGHER
          <br />
          STANDARDS.
        </p>
      </aside>
    </section>
  );
}
