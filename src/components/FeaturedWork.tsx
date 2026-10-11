"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { featuredProjects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedWork() {
    const { t, language, href } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id="work"
            className="py-20 md:py-32 px-8 md:px-14 relative"
            aria-labelledby="featured-heading"
        >
            {/* Subtle background accent */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139, 92, 246, 0.04) 0%, transparent 70%)",
                }}
            />

            {/* Section header */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-5 mb-16 md:mb-24"
            >
                <h2
                    id="featured-heading"
                    className="text-purple-500/50 text-xs uppercase tracking-[0.28em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {t.work.featuredLabel}
                </h2>
                <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    aria-hidden="true"
                />
                <span
                    className="text-white/25 text-xs tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                    aria-hidden="true"
                >
                    {featuredProjects.length.toString().padStart(2, "0")}
                </span>
            </motion.div>

            <ul className="flex flex-col gap-24 md:gap-40" aria-label={t.work.featuredLabel}>
                {featuredProjects.map((project, index) => {
                    const reversed = index % 2 === 1;

                    return (
                        <li key={project.slug} className="list-none">
                            <Link
                                href={href(`/work/${project.slug}`)}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center hoverable"
                            >
                                {/* Cover — clip reveal on enter */}
                                <motion.div
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }
                                    }
                                    whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 1.1, ease }}
                                    className={`relative aspect-[16/10] overflow-hidden rounded-sm md:col-span-7 ${
                                        reversed ? "md:order-2" : ""
                                    }`}
                                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    <Image
                                        src={project.cover}
                                        alt=""
                                        fill
                                        sizes="(min-width: 768px) 58vw, 100vw"
                                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                                    />
                                    <div
                                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                                        aria-hidden="true"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(10,10,11,0) 40%, rgba(10,10,11,0.45) 100%)",
                                        }}
                                    />
                                </motion.div>

                                {/* Text */}
                                <motion.div
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.8, delay: 0.15, ease }}
                                    className={`md:col-span-5 ${reversed ? "md:order-1" : ""}`}
                                >
                                    <div
                                        className="flex items-center gap-4 mb-5 text-[0.68rem] uppercase tracking-[0.2em]"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        <span className="text-purple-400/70">
                                            {(index + 1).toString().padStart(2, "0")}
                                        </span>
                                        <span className="text-white/25">
                                            {t.work.kinds[project.kind]} · {project.year}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-white/80 group-hover:text-white transition-colors duration-500 leading-[0.9] tracking-[-0.02em]"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontStyle: "italic",
                                            fontWeight: 300,
                                            fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                                        }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p
                                        className="mt-6 text-white/45 leading-relaxed max-w-md"
                                        style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}
                                    >
                                        {project.tagline[language]}
                                    </p>

                                    <p
                                        className="mt-6 text-white/25 uppercase text-[0.62rem] tracking-[0.12em]"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        {project.stack.join(" · ")}
                                    </p>

                                    {/* CTA with drawn underline */}
                                    <span className="relative inline-flex items-center gap-3 mt-10 pb-2">
                                        <span
                                            className="text-white/50 group-hover:text-white transition-colors duration-300 text-[0.7rem] uppercase tracking-[0.2em]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {t.work.viewCaseStudy}
                                        </span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
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
                                        <span
                                            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, rgba(139,92,246,0.7) 0%, transparent 100%)",
                                            }}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </motion.div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
