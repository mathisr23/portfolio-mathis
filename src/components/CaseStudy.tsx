"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { featuredProjects, type FeaturedProject } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

const monoLabel = "text-white/30 text-[0.65rem] uppercase tracking-[0.24em]";

function ArrowRight({ className = "" }: { className?: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
            <path
                d="M3 9H15M15 9L10.5 4.5M15 9L10.5 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
            <path
                d="M4 12L12 4M12 4H5.5M12 4V10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function CaseStudy({ project }: { project: FeaturedProject }) {
    const { t, language } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const index = featuredProjects.findIndex((p) => p.slug === project.slug);
    const next = featuredProjects[(index + 1) % featuredProjects.length];
    const total = featuredProjects.length.toString().padStart(2, "0");

    const reveal = (delay = 0) => ({
        initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.8, delay, ease },
    });

    const meta = [
        { label: t.caseStudy.role, value: project.role[language] },
        { label: t.caseStudy.year, value: project.year },
        { label: t.caseStudy.type, value: t.work.kinds[project.kind] },
        { label: t.caseStudy.stack, value: project.stack.join(", ") },
    ];

    return (
        <article id="main-content" className="relative">
            {/* ── Header ─────────────────────────────── */}
            <header className="px-8 md:px-14 pt-32 md:pt-40">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="flex items-center justify-between"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    <Link
                        href="/#work"
                        className="group inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 text-[0.68rem] uppercase tracking-[0.22em] hoverable"
                    >
                        <ArrowRight className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                        {t.caseStudy.back}
                    </Link>
                    <span className="text-white/25 text-[0.68rem] tracking-[0.2em]" aria-hidden="true">
                        <span className="text-purple-400/70">
                            {(index + 1).toString().padStart(2, "0")}
                        </span>{" "}
                        / {total}
                    </span>
                </motion.div>

                <div className="overflow-hidden mt-12 md:mt-16">
                    <motion.h1
                        initial={shouldReduceMotion ? false : { y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 1.1, delay: 0.3, ease }}
                        className="text-white leading-[0.85] tracking-[-0.03em] pb-[0.08em]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(3.5rem, 12vw, 11rem)",
                        }}
                    >
                        {project.title}
                    </motion.h1>
                </div>

                <motion.div
                    className="mt-8 md:mt-10 h-px"
                    aria-hidden="true"
                    initial={shouldReduceMotion ? false : { scaleX: 0, originX: "0%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, delay: 0.7, ease }}
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(139, 92, 246, 0.7) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)",
                    }}
                />

                <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.85, ease }}
                        className="lg:col-span-5 text-white/55 text-lg md:text-xl leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {project.tagline[language]}
                    </motion.p>

                    <motion.dl
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-x-8 gap-y-6"
                    >
                        {meta.map((item) => (
                            <div key={item.label}>
                                <dt className={monoLabel} style={{ fontFamily: "var(--font-mono)" }}>
                                    {item.label}
                                </dt>
                                <dd
                                    className="mt-2 text-white/75 text-sm leading-snug"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>
            </header>

            {/* ── Cover ──────────────────────────────── */}
            <motion.div
                initial={shouldReduceMotion ? false : { clipPath: "inset(18% 8% 0% 8%)", opacity: 0 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.6, ease }}
                className="relative mt-16 md:mt-24 mx-8 md:mx-14 aspect-[16/10] overflow-hidden rounded-sm"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
                <Image
                    src={project.cover}
                    alt={`${project.title} — ${project.tagline[language]}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>

            {/* ── Overview ───────────────────────────── */}
            <section
                className="px-8 md:px-14 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-8"
                aria-labelledby="overview-heading"
            >
                <motion.h2
                    {...reveal()}
                    id="overview-heading"
                    className={`lg:col-span-3 ${monoLabel}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {t.caseStudy.overview}
                </motion.h2>
                <motion.p
                    {...reveal(0.1)}
                    className="lg:col-span-8 lg:col-start-5 text-white/80 leading-[1.35] tracking-[-0.01em]"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    }}
                >
                    {project.overview[language]}
                </motion.p>
            </section>

            {/* ── Highlights ─────────────────────────── */}
            <section className="px-8 md:px-14 pb-24 md:pb-36" aria-labelledby="highlights-heading">
                <motion.h2
                    {...reveal()}
                    id="highlights-heading"
                    className={`mb-10 md:mb-14 ${monoLabel}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {t.caseStudy.highlights}
                </motion.h2>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                    {project.highlights.map((item, i) => (
                        <motion.li
                            key={item.title.en}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease }}
                            className="list-none border-t border-white/[0.08] pt-6"
                        >
                            <span
                                className="text-purple-400/70 text-[0.68rem] tracking-[0.2em]"
                                style={{ fontFamily: "var(--font-mono)" }}
                                aria-hidden="true"
                            >
                                {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <h3
                                className="mt-4 text-white leading-tight"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                    fontSize: "clamp(1.6rem, 2.4vw, 2rem)",
                                }}
                            >
                                {item.title[language]}
                            </h3>
                            <p
                                className="mt-4 text-white/45 text-[0.92rem] leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {item.body[language]}
                            </p>
                        </motion.li>
                    ))}
                </ol>
            </section>

            {/* ── Gallery ────────────────────────────── */}
            {project.gallery.length > 0 && (
                <section className="px-8 md:px-14 pb-24 md:pb-36 flex flex-col gap-8 md:gap-12" aria-label={project.title}>
                    {project.gallery.map((src) => (
                        <motion.div
                            key={src}
                            initial={shouldReduceMotion ? false : { clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
                            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.1, ease }}
                            className="relative aspect-[16/10] overflow-hidden rounded-sm"
                            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
                        </motion.div>
                    ))}
                </section>
            )}

            {/* ── Links ──────────────────────────────── */}
            <motion.section
                {...reveal()}
                className="px-8 md:px-14 pb-24 md:pb-32 flex flex-wrap items-center gap-4"
                aria-label={project.title}
            >
                {project.links.live ? (
                    <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Case Study Visit", { slug: project.slug })}
                        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-[#0a0a0b] hover:bg-purple-300 transition-colors duration-300 text-[0.7rem] uppercase tracking-[0.2em] hoverable"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {t.caseStudy.visit}
                        <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                ) : (
                    <span
                        className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/10 text-white/35 text-[0.7rem] uppercase tracking-[0.2em]"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {t.caseStudy.notLive}
                    </span>
                )}
                {project.links.source && (
                    <a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Case Study Source", { slug: project.slug })}
                        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-purple-400/60 transition-colors duration-300 text-[0.7rem] uppercase tracking-[0.2em] hoverable"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {t.caseStudy.source}
                        <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                )}
            </motion.section>

            {/* ── Next project ───────────────────────── */}
            <nav aria-label={t.caseStudy.next} className="px-8 md:px-14">
                <Link
                    href={`/work/${next.slug}`}
                    className="group relative block border-t border-white/[0.08] py-14 md:py-20 hoverable"
                >
                    <span className={monoLabel} style={{ fontFamily: "var(--font-mono)" }}>
                        {t.caseStudy.next}
                    </span>
                    <span className="mt-6 flex items-end justify-between gap-6">
                        <span
                            className="text-white/60 group-hover:text-white transition-colors duration-500 leading-[0.9] tracking-[-0.02em]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontStyle: "italic",
                                fontWeight: 300,
                                fontSize: "clamp(3rem, 9vw, 8rem)",
                            }}
                        >
                            {next.title}
                        </span>
                        <ArrowRight className="shrink-0 mb-4 w-8 h-8 md:w-12 md:h-12 text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                    </span>
                    <span
                        className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(139,92,246,0.7) 0%, transparent 80%)",
                        }}
                        aria-hidden="true"
                    />
                </Link>
            </nav>
        </article>
    );
}
