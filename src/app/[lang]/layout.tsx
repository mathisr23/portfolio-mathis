import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Anybody, Newsreader } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { alternatesFor, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";

// Display + interface: variable width is part of the motion language
const anybody = Anybody({
  variable: "--nf-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

// Reading text: one static weight keeps it light (the variable font is ~185 KB)
const newsreader = Newsreader({
  variable: "--nf-text",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = lang === "fr" ? fr : en;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: "%s — Mathis Rivière" },
    description: t.meta.description,
    alternates: alternatesFor("/", lang),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = lang === "fr" ? fr : en;

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body
        className={`${anybody.variable} ${newsreader.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          {t.meta.skip}
        </a>
        <LanguageProvider language={lang}>
          <SmoothScroll />
          {children}
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
