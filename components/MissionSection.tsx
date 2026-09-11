import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function MissionSection() {
  return (
    <section className="mission" id="mission">
      <div className="mission-panel">
        <Image
          src="/images/monument.jpg"
          alt="Classical monumental sculpture"
          fill
          sizes="(max-width: 760px) 100vw, 54vw"
        />
        <div className="mission-copy">
          <span className="spaced-label">OUR MISSION</span>
          <h2>
            A HIGHER
            <br />
            STANDARD
          </h2>
          <div className="brush-rule" />
          <p>
            We believe in a stronger people, a stronger culture, and a stronger
            America. Through ideas, media, and action, we&apos;re building a
            generation that chooses responsibility over comfort, excellence over
            complacency, and a brighter future over decline.
          </p>
          <Link href="/about" className="button outline-button">
            About our mission <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      <div className="community-panel">
        <div className="community-image">
          <Image
            src="/images/campus.jpg"
            alt="An outdoor gathering with an American flag"
            fill
            sizes="(max-width: 760px) 55vw, 25vw"
          />
        </div>
        <div className="community-copy">
          <h2>
            REAL PEOPLE.
            <br />
            REAL CONVERSATIONS.
            <br />
            REAL CHANGE.
          </h2>
          <p>
            From college campuses to communities across the country, we&apos;re
            taking the conversation back to where it belongs — with the people.
          </p>
          <Link href="/events" className="button outline-button">
            Upcoming events <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
