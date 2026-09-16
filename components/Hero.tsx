import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo">
        <Image
          src="/images/dc-blue-sky.png"
          alt="AI-generated Washington, D.C. panorama with the Lincoln Memorial, Washington Monument, and U.S. Capitol beneath a blue sky"
          fill
          loading="eager"
          sizes="100vw"
        />
      </div>
      <div className="container hero-content">
        <p className="hero-eyebrow">Build a Future Worth Inheriting</p>
        <div className="hero-title hero-brand">
          <h1 className="sr-only">Take Back America</h1>
          <Image src="/brand/logo-wordmark.png" alt="Take Back America — A Stronger Tomorrow" width={1200} height={202} loading="eager" sizes="(max-width: 600px) 90vw, 780px" />
        </div>
        <div className="hero-buttons">
          <Link href="/about" className="button">
            Learn more <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
