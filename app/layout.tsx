import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { description, siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Take Back America", template: "%s | Take Back America" },
  description,
  openGraph: {
    type: "website",
    siteName: "Take Back America",
    title: "Take Back America",
    description,
  },
  twitter: { card: "summary", title: "Take Back America", description },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
