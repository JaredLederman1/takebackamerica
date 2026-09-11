import Link from "next/link";
export function StripeMark({ className = "" }: { className?: string }) {
  return (
    <span className={`stripe-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Take Back America home">
      <span>
        TAKE BACK
        <br />
        <span className="word-america">AMERICA</span>
      </span>
      <StripeMark />
    </Link>
  );
}
