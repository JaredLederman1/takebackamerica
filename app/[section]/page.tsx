import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
const sections: Record<
  string,
  {
    title: string;
    eyebrow: string;
    copy: string;
    detail: string;
    soon: boolean;
  }
> = {
  about: {
    title: "A HIGHER STANDARD.",
    eyebrow: "OUR MISSION",
    copy: "A stronger America starts with the people we choose to be.",
    detail:
      "Take Back America is a media platform and movement for ideas, public debate, and shared responsibility. We focus on character, family, community, and excellence—and on the everyday work of building something better. Read, question, listen, and join the conversation.",
    soon: false,
  },
  videos: {
    title: "IDEAS IN FOCUS.",
    eyebrow: "VIDEOS",
    copy: "A new perspective. A deeper conversation.",
    detail:
      "Our video library is taking shape. In the meantime, explore the ideas behind the platform in our latest articles.",
    soon: true,
  },
  podcast: {
    title: "MAKE ROOM FOR CONVERSATION.",
    eyebrow: "THE PODCAST",
    copy: "Thoughtful questions deserve more than a sound bite.",
    detail:
      "The Take Back America podcast is in development. Episodes and listening links will appear here when we launch.",
    soon: true,
  },
  events: {
    title: "LET’S COME TOGETHER.",
    eyebrow: "EVENTS & COMMUNITY",
    copy: "Real people. Real conversations. Real change.",
    detail:
      "We’re building a space for public discussion, campus conversations, and community participation. No events are scheduled yet. Check back for dates and details.",
    soon: true,
  },
  "get-involved": {
    title: "YOUR PART STARTS HERE.",
    eyebrow: "GET INVOLVED",
    copy: "Bring your curiosity. Raise your standards. Build with others.",
    detail:
      "Start with an article, share an idea with someone you know, and make room for a thoughtful conversation. More ways to participate are on the way.",
    soon: true,
  },
  support: {
    title: "HELP BUILD WHAT’S NEXT.",
    eyebrow: "SUPPORT THE MISSION",
    copy: "Good ideas deserve a place to grow.",
    detail:
      "Our donation program is not open yet, and this website does not collect payments. For now, you can support the conversation by reading and sharing our articles.",
    soon: true,
  },
  contact: {
    title: "STAY IN THE CONVERSATION.",
    eyebrow: "CONTACT",
    copy: "We’re getting ready to hear from you.",
    detail:
      "Our public contact channel is being prepared. Contact details and submission guidelines will be posted here when they are available.",
    soon: true,
  },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const page = sections[section];
  return page
    ? {
        title: page.eyebrow,
        description: page.copy,
        alternates: { canonical: `/${section}` },
      }
    : { title: "Not found" };
}
export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const page = sections[(await params).section];
  if (!page) notFound();
  return (
    <>
      <section className="container info-page">
        <span className="eyebrow red">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        {page.soon && <span className="status-label">Coming soon</span>}
        <p className="article-deck">{page.copy}</p>
        <p>{page.detail}</p>
        <Link className="button" href="/articles">
          Explore the articles ↗
        </Link>
      </section>
      <NewsletterSignup />
    </>
  );
}
