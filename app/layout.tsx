import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
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
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M37WXW7EJE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M37WXW7EJE');`}
        </Script>
      </body>
    </html>
  );
}
