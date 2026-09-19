import Link from "next/link";

export default function ContributionSuccess() {
  return (
    <section className="container info-page contribution-success">
      <p className="eyebrow">THANK YOU</p>
      <h1>Thank you for your support.</h1>
      <p>Your contribution helps sustain Take Back America&apos;s media work and public conversation.</p>
      <Link className="button" href="/articles">Explore the articles ↗</Link>
    </section>
  );
}
