import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { StripeMark } from "./Logo";
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
        <div className="hero-title">
          <h1>
            TAKE BACK
            <br />
            <span className="word-america">AMERICA</span>
          </h1>
          <StripeMark />
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
