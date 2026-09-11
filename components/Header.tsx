"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
const links = [
  ["Articles", "/articles"],
  ["Videos", "/videos"],
  ["Podcast", "/podcast"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Get Involved", "/get-involved"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/articles#search"
            className="search-link"
            aria-label="Search articles"
          >
            <Search size={19} />
          </Link>
          <Link href="/support" className="donate-link">
            Donate
          </Link>
          <Link href="/#newsletter" className="button small">
            Join <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {links.map(([title, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {title}
            </Link>
          ))}
          <Link href="/support" onClick={() => setOpen(false)}>
            Support our work
          </Link>
        </nav>
      )}
    </header>
  );
}
