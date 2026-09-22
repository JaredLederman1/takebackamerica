import Link from "next/link";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Logo />
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
