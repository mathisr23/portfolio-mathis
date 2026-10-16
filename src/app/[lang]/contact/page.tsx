import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { alternatesFor, isLocale } from "@/lib/i18n";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const t = lang === "fr" ? fr : en;
    return {
        title: t.meta.contact,
        description: `${t.contact.subtitle} ${t.contact.description}`,
        alternates: alternatesFor("/contact", lang),
    };
}

export default function ContactPage() {
    return (
        <PageTransition>
            <main>
                <Navbar />
                <Contact />
            </main>
        </PageTransition>
    );
}
