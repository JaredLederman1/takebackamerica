import Link from "next/link";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Logo />
          <p>Ideas. People. Action.</p>
        </div>
        <nav aria-label="Footer navigation">
          {["Articles", "Videos", "Podcast", "Events", "About", "Contact"].map(
            (x) => (
              <Link key={x} href={"/" + x.toLowerCase()}>
                {x}
              </Link>
            ),
          )}
        </nav>
        <div className="footer-support">
          <Link href="/support">Support the mission ↗</Link>
          <span>Social channels coming soon</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Take Back America</span>
        <strong>A STRONGER TOMORROW IS A CHOICE.</strong>
      </div>
    </footer>
  );
}
