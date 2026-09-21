import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Join the Discussion",
  description: "Join Take Back America for the latest ideas, videos, and event updates.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <section className="join-page" aria-labelledby="join-title">
      <div className="join-page-intro">
        <p className="eyebrow">JOIN THE DISCUSSION</p>
        <h1 id="join-title">Build a stronger America with us.</h1>
        <p>
          Get the latest articles, videos, and event updates delivered directly
          to your inbox.
        </p>
      </div>
      <NewsletterSignup standalone />
    </section>
  );
}
