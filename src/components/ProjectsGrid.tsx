"use client";

import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
    {
        title: "CosmicData",
        image: "/CosmicData.png",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://cosmic-data.vercel.app/",
        descriptionKey: "cosmicData",
    },
    {
        title: "CoupleCalendar",
        image: "/CoupleCalendar.png",
        techStack: ["React", "TypeScript", "Vite", "Supabase"],
        link: "https://calendar-couple.vercel.app/",
        descriptionKey: "coupleCalendar",
    },
    {
        title: "FlowDesk",
        image: "/FlowDesk.png",
        techStack: ["Next.js (App Router)", "TypeScript"],
        link: "https://flowdesk-ui.vercel.app/",
        descriptionKey: "flowDesk",
    },
    {
        title: "FlowSync",
        image: "/FlowSync.png",
        techStack: ["HTML", "CSS", "JavaScript"],
        link: "https://flow-sync-ui.vercel.app/",
        descriptionKey: "flowSync",
    },
    {
        title: "MoodTime",
        image: "/MoodTime.png",
        techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        link: "https://mood-time-alpha.vercel.app/",
        descriptionKey: "moodTime",
    },
    {
        title: "PokéGacha",
        image: "/PokéGacha.png",
        techStack: ["React", "Vite", "Tailwind CSS"],
        link: "https://poke-gacha-ui.vercel.app/",
        descriptionKey: "pokeGacha",
    },
    {
        title: "UnemployedCountup",
        image: "/UnemployedCountup.png",
        techStack: ["HTML", "CSS", "JavaScript"],
        link: "https://unemployed-countup.vercel.app/",
        descriptionKey: "unemployedCountup",
    },
];

export default function ProjectsGrid() {
    const { t } = useLanguage();

    return (
        <section
            id="work"
            className="pt-32 pb-32 relative w-full"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/purple-projects.jpg"
                    alt="Projects Background"
                    fill
                    quality={90}
                    className="object-fill object-top"
                />
            </div>

            {/* Fade transition from hero - gradient overlay at top */}
            <div
                className="absolute top-0 left-0 w-full h-[300px] z-[1] pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, #0a0a0b 0%, rgba(10, 10, 11, 0.8) 30%, rgba(10, 10, 11, 0) 100%)",
                }}
            />

            {/* Subtle overlay for better contrast */}
            <div className="absolute inset-0 z-[1] bg-black/50" />

            <div className="max-w-[1600px] mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            image={project.image}
                            techStack={project.techStack}
                            index={index}
                            link={project.link}
                            description={t.projects.descriptions[project.descriptionKey as keyof typeof t.projects.descriptions]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
