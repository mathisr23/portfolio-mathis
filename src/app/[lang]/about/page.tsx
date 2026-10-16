import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { alternatesFor, isLocale } from "@/lib/i18n";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const t = lang === "fr" ? fr : en;
    return { title: t.meta.about, description: t.about.intro, alternates: alternatesFor("/about", lang) };
}

export default function AboutPage() {
    return (
        <PageTransition>
            <main>
                <Navbar />
                <About />
                <Footer />
            </main>
        </PageTransition>
    );
}
