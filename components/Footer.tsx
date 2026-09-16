import Link from "next/link";
import { Instagram, Youtube, Music2 } from "lucide-react";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Logo />
        <nav aria-label="Footer navigation">
          {[
            ["Articles", "/articles"],
            ["Videos", "/videos"],
            ["Podcast", "/podcast"],
            ["Events", "/events"],
            ["Our Mission", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
        </nav>
        <div className="social-icons" aria-label="Social channels coming soon">
          <span title="X — coming soon" aria-label="X — coming soon" role="img">
            𝕏
          </span>
          <span
            title="Instagram — coming soon"
            aria-label="Instagram — coming soon"
            role="img"
          >
            <Instagram size={18} />
          </span>
          <span
            title="YouTube — coming soon"
            aria-label="YouTube — coming soon"
            role="img"
          >
            <Youtube size={19} />
          </span>
          <span
            title="TikTok — coming soon"
            aria-label="TikTok — coming soon"
            role="img"
          >
            <Music2 size={18} />
          </span>
        </div>
        <Link className="button outline-button" href="/support">
          Donate
        </Link>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Take Back America. All rights reserved.
        </span>
        <strong>Build a Future Worth Inheriting</strong>
      </div>
    </footer>
  );
}
