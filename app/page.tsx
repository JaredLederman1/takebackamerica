import type { Viewport } from "next";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import NewsletterSignup from "@/components/NewsletterSignup";

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0b3867",
};

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSection />
      <NewsletterSignup />
    </>
  );
}
