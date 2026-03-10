"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { track } from "@vercel/analytics";

const projects = [
    {
        title: "CosmicData",
        image: "/CosmicData.png",
        techStack: ["Next.js", "TypeScript", "Tailwind"],
        link: "https://cosmic-data.vercel.app/",
        descriptionKey: "cosmicData",
    },
    {
        title: "CoupleCalendar",
        image: "/CoupleCalendar.png",
        techStack: ["React", "TypeScript", "Supabase"],
        link: "https://calendar-couple.vercel.app/",
        descriptionKey: "coupleCalendar",
    },
    {
        title: "FlowDesk",
        image: "/FlowDesk.png",
        techStack: ["Next.js", "TypeScript"],
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
        techStack: ["React", "TypeScript", "Tailwind"],
        link: "https://mood-time-alpha.vercel.app/",
        descriptionKey: "moodTime",
    },
    {
        title: "PokéGacha",
        image: "/PokéGacha.png",
        techStack: ["React", "Vite", "Tailwind"],
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

const PREVIEW_W = 320;
const PREVIEW_H = 200;

export default function ProjectsGrid() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [viewport, setViewport] = useState({ w: 1440, h: 900 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const update = () => {
            setViewport({ w: window.innerWidth, h: window.innerHeight });
            setIsMobile(window.innerWidth < 768);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    // Clamp preview within viewport
    const previewLeft = Math.min(mousePos.x + 28, viewport.w - PREVIEW_W - 16);
    const previewTop = Math.max(
        Math.min(mousePos.y - PREVIEW_H / 2, viewport.h - PREVIEW_H - 16),
        72
    );

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <section
            id="work"
            ref={sectionRef}
            className="py-20 md:py-32 px-8 md:px-14 relative"
            aria-label="Selected projects"
        >
            {/* Subtle background accent */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139, 92, 246, 0.04) 0%, transparent 70%)",
                }}
            />

            {/* Section header */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-5 mb-16 md:mb-20"
            >
                <span
                    className="text-purple-500/50 text-xs uppercase tracking-[0.28em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {projects.length.toString().padStart(2, "0")} Projects
                </span>
                <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    aria-hidden="true"
                />
            </motion.div>

            {/* Project list */}
            <ul aria-label="Project list">
                {projects.map((project, index) => {
                    const description =
                        t.projects.descriptions[
                            project.descriptionKey as keyof typeof t.projects.descriptions
                        ];
                    const isHovered = hoveredIndex === index;

                    return (
                        <motion.li
                            key={project.title}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.55,
                                delay: index * 0.04,
                                ease,
                            }}
                            className="list-none"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                    track("Project Clicked", {
                                        title: project.title,
                                        link: project.link,
                                    })
                                }
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative flex items-center gap-4 md:gap-6 lg:gap-10 py-6 md:py-7 border-t border-white/[0.07] hoverable w-full"
                                aria-label={`${project.title} — ${description}. Opens in new tab.`}
                            >
                                {/* Index */}
                                <span
                                    className="shrink-0 w-7 transition-colors duration-300"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.7rem",
                                        color: isHovered
                                            ? "rgba(139, 92, 246, 0.7)"
                                            : "rgba(255,255,255,0.18)",
                                        letterSpacing: "0.06em",
                                    }}
                                    aria-hidden="true"
                                >
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>

                                {/* Title */}
                                <h3
                                    className="flex-1 min-w-0 leading-none tracking-tight transition-colors duration-300"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        fontSize: "clamp(1.6rem, 4.5vw, 3.5rem)",
                                        color: isHovered
                                            ? "rgba(255,255,255,1)"
                                            : "rgba(255,255,255,0.65)",
                                    }}
                                >
                                    {project.title}
                                </h3>

                                {/* Description — desktop only */}
                                <p
                                    className="hidden xl:block shrink-0 text-right leading-snug transition-colors duration-300 max-w-[200px]"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.8rem",
                                        color: isHovered
                                            ? "rgba(255,255,255,0.45)"
                                            : "rgba(255,255,255,0.2)",
                                    }}
                                    aria-hidden="true"
                                >
                                    {description}
                                </p>

                                {/* Tech — md+ */}
                                <div
                                    className="hidden md:flex shrink-0 gap-3 transition-opacity duration-300"
                                    style={{ opacity: isHovered ? 0.7 : 0.3 }}
                                    aria-hidden="true"
                                >
                                    {project.techStack.slice(0, 2).map((tech) => (
                                        <span
                                            key={tech}
                                            className="uppercase"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "0.62rem",
                                                letterSpacing: "0.1em",
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Mobile thumbnail */}
                                {isMobile && (
                                    <div
                                        className="shrink-0 w-16 h-10 rounded overflow-hidden relative md:hidden"
                                        style={{
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                        aria-hidden="true"
                                    >
                                        <Image
                                            src={project.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                )}

                                {/* Arrow */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    className="shrink-0 transition-all duration-300"
                                    style={{
                                        color: isHovered
                                            ? "rgba(255,255,255,0.7)"
                                            : "rgba(255,255,255,0.15)",
                                        transform: isHovered ? "translateX(3px)" : "translateX(0)",
                                    }}
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M3 9H15M15 9L10.5 4.5M15 9L10.5 13.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                {/* Hover line — scales from left */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-px"
                                    aria-hidden="true"
                                    initial={{ scaleX: 0, originX: "0%" }}
                                    animate={{ scaleX: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease }}
                                    style={{
                                        width: "100%",
                                        background:
                                            "linear-gradient(90deg, rgba(139,92,246,0.5) 0%, transparent 80%)",
                                    }}
                                />
                            </a>
                        </motion.li>
                    );
                })}

                {/* Bottom rule */}
                <li aria-hidden="true">
                    <div
                        className="h-px"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                    />
                </li>
            </ul>

            {/* Floating cursor preview — desktop only */}
            {!shouldReduceMotion && (
                <AnimatePresence mode="wait">
                    {hoveredIndex !== null && !isMobile && (
                        <motion.div
                            key={hoveredIndex}
                            className="fixed pointer-events-none z-40"
                            style={{
                                left: previewLeft,
                                top: previewTop,
                                width: PREVIEW_W,
                                height: PREVIEW_H,
                            }}
                            initial={{ opacity: 0, scale: 0.9, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -4 }}
                            transition={{ duration: 0.22, ease }}
                        >
                            <div
                                className="w-full h-full rounded overflow-hidden relative shadow-2xl"
                                style={{
                                    border: "1px solid rgba(139, 92, 246, 0.18)",
                                    boxShadow:
                                        "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)",
                                }}
                            >
                                <Image
                                    src={projects[hoveredIndex].image}
                                    alt={projects[hoveredIndex].title}
                                    fill
                                    className="object-cover"
                                    sizes={`${PREVIEW_W}px`}
                                />
                                <div
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                                    }}
                                />
                                {/* Project name label */}
                                <div
                                    className="absolute bottom-3 left-4"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.62rem",
                                        letterSpacing: "0.1em",
                                        color: "rgba(255,255,255,0.5)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {projects[hoveredIndex].techStack.join(" · ")}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </section>
    );
}
