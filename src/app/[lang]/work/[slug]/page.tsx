import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudy from "@/components/CaseStudy";
import Footer from "@/components/Footer";
import { featuredProjects, getFeaturedProject } from "@/data/projects";
import { alternatesFor, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const project = getFeaturedProject(slug);
    if (!project || !isLocale(lang)) return {};

    const description = project.tagline[lang];
    return {
        title: project.title,
        description,
        alternates: alternatesFor(`/work/${project.slug}`, lang),
        openGraph: {
            title: `${project.title} — Mathis Rivière`,
            description,
            images: [{ url: project.cover }],
        },
    };
}

export default async function WorkPage({ params }: Props) {
    const project = getFeaturedProject((await params).slug);
    if (!project) notFound();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10">
                <Navbar />
                <CaseStudy project={project} />
                <Footer />
            </div>
        </main>
    );
}
