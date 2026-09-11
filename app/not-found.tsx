import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container info-page">
      <span className="eyebrow red">404 · PAGE NOT FOUND</span>
      <h1>A DIFFERENT DIRECTION.</h1>
      <p>That page isn’t here. There are still plenty of ideas to explore.</p>
      <Link href="/articles" className="button">
        Read the latest
      </Link>
    </section>
  );
}
