import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudy from "@/components/CaseStudy";
import Footer from "@/components/Footer";
import { featuredProjects, getFeaturedProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getFeaturedProject((await params).slug);
    if (!project) return {};

    const title = `${project.title} — Mathis Rivière`;
    return {
        title,
        description: project.tagline.en,
        openGraph: {
            title,
            description: project.tagline.en,
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
