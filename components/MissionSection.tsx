import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function MissionSection() {
  return (
    <section className="mission" id="mission">
      <div className="mission-image">
        <Image
          src="/images/landscape.jpg"
          alt="An American flag against an open sky"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span>THE FUTURE IS OURS TO BUILD.</span>
      </div>
      <div className="mission-copy">
        <span className="eyebrow">OUR MISSION</span>
        <h2>
          A HIGHER
          <br />
          STANDARD<span>.</span>
        </h2>
        <div className="red-rule" />
        <p className="mission-lead">
          A stronger country starts with the people we choose to be.
        </p>
        <p>
          Character. Responsibility. Family. Community. We believe in doing the
          work, pursuing excellence, and building something that lasts.
        </p>
        <p>Less standing on the sidelines. More showing up.</p>
        <Link href="/about" className="button cream-button">
          About our mission <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
