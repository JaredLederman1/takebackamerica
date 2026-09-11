import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Take Back America home">
      <span className="logo-stripes" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        TAKE BACK
        <br />
        AMERICA<span className="logo-period">.</span>
      </span>
    </Link>
  );
}
