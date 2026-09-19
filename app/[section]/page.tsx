import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
import Logo from "@/components/Logo";
import DonationCheckout from "@/components/DonationCheckout";
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
    title: "Our Mission",
    eyebrow: "OUR MISSION",
    copy: "The future of America will be decided by those willing to fight for it.",
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
  support: {
    title: "HELP BUILD WHAT’S NEXT.",
    eyebrow: "SUPPORT THE MISSION",
    copy: "Good ideas deserve a place to grow.",
    detail:
      "Your contribution supports Take Back America’s media work and the public conversation it makes possible.",
    soon: false,
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
  const section = (await params).section;
  const page = sections[section];
  if (!page) notFound();
  if (section === "about") {
    return (
      <>
        <section className="container info-page mission-page">
          <Logo />
          <div className="mission-statement">
            <p className="mission-statement-emphasis">
              The future of America will be decided by those willing to fight for it.
            </p>
            <p>
              Take Back America began with a simple idea: the country we inherit will not remain strong unless we are willing to defend, build, and improve it. We are a nation in distress. National pride has become something to apologize for. Faith is dismissed, marriage is vilified, children are treated as burdens, and youth are taught to pursue comfort before duty. We are told these changes are inevitable, that decline should be accepted as progress, and that there is little any one of us can do about it.
            </p>
            <p>
              That is why our flag flies upside down.
            </p>
            <p>
              For generations, an inverted American flag has served as a signal of distress. Ours is not an expression of contempt for America, but the opposite. We fly it upside down because we believe this country is worth fighting for, because we refuse to watch its institutions collapse, and because we believe our generation has an obligation to leave behind something stronger than what it inherited. We pray and work for the day when we can turn it right side up.
            </p>
            <p>
              When America’s founding generation broke with Britain, it did so in the language of natural rights, liberty, and the right of a people to govern themselves. When the Constitution was written eleven years later, its authors sought to establish justice, preserve domestic peace, promote the general welfare, and secure the blessings of liberty for generations yet unborn. The American experiment was built around an extraordinary proposition: that a free people could govern themselves. Take Back America begins from the belief that this experiment depends not only on laws and institutions, but on a culture capable of sustaining them. Liberty cannot long survive without responsibility, self-government without self-discipline, or a strong nation without citizens willing to sacrifice for something beyond themselves.
            </p>
            <p>
              That is why taking back America means taking action. Families, communities, schools, and religious institutions are where many of those habits are formed, and they do not sustain themselves. They depend on people who keep promises, raise children, serve their communities, defend what they believe, and accept responsibility for more than themselves. We cannot complain about a weaker country while refusing the obligations that make a country strong.
            </p>
            <p>
              My name is Jared Lederman. I founded Take Back America at 19 while finishing my senior year at Cornell University because I recognized that waiting for somebody else to take the lead was an inadequate response. I was raised in a household that emphasized faith, family, hard work, personal responsibility, and love of country. This instilled an understanding that freedom is not merely the absence of obligation. It is the opportunity to accept obligations that give life purpose. The future will belong to my generation whether we are prepared for it or not. We can remain spectators, or we can choose to shape it.
            </p>
            <p>
              Take Back America begins with ideas. We want young people to encounter arguments they disagree with, defend their beliefs honestly, and engage in serious debate without fear or contempt. College campuses are the ideal place for that work. Students should confront ideas that unsettle them, challenge their assumptions, and sometimes force them to reconsider the worldview they arrived with so they understand why they hold it. It is on these campuses that Take Back America will begin its mission.
            </p>
            <p>
              We believe America has strayed from some of the cultural foundations that help sustain a free and self-governing people. Strong marriages, children, religious faith, family, service, personal responsibility, and national loyalty are not relics of another age. We believe they cultivate the habits of responsibility, sacrifice, and commitment upon which healthy communities and durable institutions depend. Our purpose is not to recreate the past. It is to carry the principles that made the American experiment possible into the future.
            </p>
            <p>
              America is worth loving, worth improving, and worth fighting for. But love of country without action means very little.
            </p>
            <p>
              Our flag is upside down because we believe our nation is in distress. Our mission is to help build the country in which we can finally turn it right side up.
            </p>
            <p className="mission-statement-emphasis">
              The future belongs to all of us. It is time to act like it.
            </p>
          </div>
        </section>
        <NewsletterSignup />
      </>
    );
  }
  if (section === "support") {
    return (
      <>
        <section className="container info-page support-page">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="article-deck">{page.copy}</p>
          <p>{page.detail}</p>
          <DonationCheckout />
        </section>
        <NewsletterSignup />
      </>
    );
  }
  return (
    <>
      <section className="container info-page">
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
