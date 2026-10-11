import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Syne, Space_Mono } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { alternatesFor, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
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
    <html lang={lang} className="dark">
      <body
        className={`${cormorant.variable} ${syne.variable} ${spaceMono.variable} antialiased bg-[#0a0a0b] text-white overflow-x-hidden`}
      >
        <a href="#main-content" className="skip-link">
          {t.meta.skip}
        </a>
        <LanguageProvider language={lang}>
          <SmoothScroll />
          <LanguageToggle />
          {children}
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
