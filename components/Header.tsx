"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
const links = [
  ["Articles", "/articles"],
  ["Videos", "/videos"],
  ["Podcast", "/podcast"],
  ["Events", "/events"],
  ["Our Mission", "/about"],
];
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 20;
const getServerScrolled = () => false;

export default function Header() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  function close() {
    setMenuPath(null);
    toggle.current?.focus();
  }
  return (
    <header
      className={`header ${pathname === "/" ? "header-home" : ""} ${open ? "menu-open" : ""} ${scrolled ? "header-scrolled" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/support" className="button donate-link">
            Donate
          </Link>
          <Link
            href="/join"
            className="button join-link"
            onClick={() => setMenuPath(null)}
          >
            Join
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setMenuPath(open ? null : pathname)}
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
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuPath(null)}>
              {label}
            </Link>
          ))}
          <Link href="/support" onClick={() => setMenuPath(null)}>
            Donate
          </Link>
        </nav>
      )}
    </header>
  );
}
