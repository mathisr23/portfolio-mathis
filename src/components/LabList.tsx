"use client";

import { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { labProjects } from "@/data/projects";

const PREVIEW_W = 320;
const PREVIEW_H = 200;
const ease = [0.22, 1, 0.36, 1] as const;

export default function LabList() {
    const { t, language } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [canHover, setCanHover] = useState(false);

    // Motion values update the preview position without re-rendering the list
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 400, damping: 40 });
    const springY = useSpring(y, { stiffness: 400, damping: 40 });

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
        const update = () => setCanHover(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!canHover) return;
        const onMouseMove = (e: MouseEvent) => {
            // Clamp preview within viewport
            x.set(Math.min(e.clientX + 28, window.innerWidth - PREVIEW_W - 16));
            y.set(
                Math.max(
                    Math.min(e.clientY - PREVIEW_H / 2, window.innerHeight - PREVIEW_H - 16),
                    72
                )
            );
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [canHover, x, y]);

    return (
        <section
            className="pb-20 md:pb-32 px-8 md:px-14 relative"
            aria-labelledby="lab-heading"
        >
            {/* Section header */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14"
            >
                <h2
                    id="lab-heading"
                    className="text-white leading-none tracking-[-0.02em]"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    }}
                >
                    {t.work.labLabel}
                </h2>
                <p
                    className="text-white/35 text-sm"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t.work.labIntro}
                </p>
            </motion.div>

            <ul aria-labelledby="lab-heading">
                {labProjects.map((project, index) => {
                    const description = project.description[language];
                    const isHovered = hoveredIndex === index;

                    return (
                        <motion.li
                            key={project.title}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.55, delay: index * 0.04, ease }}
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
                                className="group relative flex items-center gap-4 md:gap-6 lg:gap-10 py-5 md:py-6 border-t border-white/[0.07] hoverable w-full"
                                aria-label={`${project.title} — ${description} ${t.work.opensNewTab}.`}
                            >
                                {/* Title */}
                                <h3
                                    className="flex-1 min-w-0 leading-none tracking-tight transition-colors duration-300"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                                        color: isHovered
                                            ? "rgba(255,255,255,1)"
                                            : "rgba(255,255,255,0.6)",
                                    }}
                                >
                                    {project.title}
                                </h3>

                                {/* Description — desktop only */}
                                <p
                                    className="hidden xl:block shrink-0 text-right leading-snug transition-colors duration-300 max-w-[260px]"
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
                                    {project.stack.slice(0, 2).map((tech) => (
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
                                <div
                                    className="shrink-0 w-16 h-10 rounded overflow-hidden relative md:hidden"
                                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
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

                                {/* External arrow */}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="shrink-0 transition-all duration-300"
                                    style={{
                                        color: isHovered
                                            ? "rgba(255,255,255,0.7)"
                                            : "rgba(255,255,255,0.15)",
                                        transform: isHovered
                                            ? "translate(2px, -2px)"
                                            : "translate(0, 0)",
                                    }}
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 12L12 4M12 4H5.5M12 4V10.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                {/* Hover line — scales from left */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-px w-full"
                                    aria-hidden="true"
                                    initial={{ scaleX: 0, originX: "0%" }}
                                    animate={{ scaleX: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease }}
                                    style={{
                                        background:
                                            "linear-gradient(90deg, rgba(139,92,246,0.5) 0%, transparent 80%)",
                                    }}
                                />
                            </a>
                        </motion.li>
                    );
                })}

                {/* Bottom rule */}
                <li aria-hidden="true" className="list-none">
                    <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                </li>
            </ul>

            {/* Floating cursor preview — hover-capable desktop only */}
            {!shouldReduceMotion && canHover && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-40"
                    style={{ x: springX, y: springY, width: PREVIEW_W, height: PREVIEW_H }}
                    aria-hidden="true"
                >
                    <AnimatePresence mode="wait">
                        {hoveredIndex !== null && (
                            <motion.div
                                key={hoveredIndex}
                                className="w-full h-full rounded overflow-hidden relative"
                                style={{
                                    border: "1px solid rgba(139, 92, 246, 0.18)",
                                    boxShadow:
                                        "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)",
                                }}
                                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                                transition={{ duration: 0.22, ease }}
                            >
                                <Image
                                    src={labProjects[hoveredIndex].image}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes={`${PREVIEW_W}px`}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                                    }}
                                />
                                <div
                                    className="absolute bottom-3 left-4 uppercase"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.62rem",
                                        letterSpacing: "0.1em",
                                        color: "rgba(255,255,255,0.5)",
                                    }}
                                >
                                    {labProjects[hoveredIndex].stack.join(" · ")}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    );
}
