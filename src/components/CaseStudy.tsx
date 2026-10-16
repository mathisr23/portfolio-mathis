"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { featuredProjects, type FeaturedProject } from "@/data/projects";
import StretchText from "@/components/StretchText";
import LoopVideo from "@/components/LoopVideo";
import { FRAME_NAME } from "@/lib/frame-transition";
import { resetScroll } from "@/components/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;
const MotionLink = motion.create(Link);

export default function CaseStudy({ project }: { project: FeaturedProject }) {
    const { t, language, href } = useLanguage();
    const reduce = useReducedMotion() ?? false;

    // Arriving from the reel, the page must be at the top before the view transition
    // captures it, otherwise the cover morphs to the wrong place and then jumps.
    // Layout effects run inside that commit; a regular effect would be too late.
    useLayoutEffect(() => {
        resetScroll();
    }, [project.slug]);

    const index = featuredProjects.findIndex((p) => p.slug === project.slug);
    const next = featuredProjects[(index + 1) % featuredProjects.length];

    const meta = [
        { label: t.caseStudy.role, value: project.role[language] },
        { label: t.caseStudy.year, value: project.year },
        { label: t.caseStudy.type, value: t.work.kinds[project.kind] },
        { label: t.caseStudy.stack, value: project.stack.join(", ") },
    ];

    const titleSize = `min(12rem, calc((100vw - 3rem) / ${Math.max(project.title.length, 6) * 0.8}))`;

    return (
        <article id="main-content">
            <header className="px-5 md:px-10 pt-28 md:pt-36">
                <Link href={href("/#work")} className="font-display link-line">
                    {t.caseStudy.back}
                </Link>

                <h1
                    className="mt-10 md:mt-14 font-display font-extrabold leading-[0.92] tracking-[-0.025em] whitespace-nowrap overflow-hidden pt-[0.1em]"
                    style={{ fontSize: titleSize, fontVariationSettings: '"wdth" 125' }}
                    aria-label={project.title}
                >
                    {Array.from(project.title).map((ch, i) => (
                        <motion.span
                            key={i}
                            aria-hidden="true"
                            className="inline-block"
                            initial={reduce ? false : { y: "105%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.03 }}
                        >
                            {ch === " " ? " " : ch}
                        </motion.span>
                    ))}
                </h1>

                <div className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-12">
                    <p className="lg:col-span-6 text-2xl md:text-[2rem] leading-[1.2] tracking-[-0.01em] max-w-[30ch]">
                        {project.tagline[language]}
                    </p>
                    <dl className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
                        {meta.map((item) => (
                            <div key={item.label} className="border-t border-mist pt-3">
                                <dt className="font-display text-sm text-grey">{item.label}</dt>
                                <dd className="mt-1 text-lg leading-snug">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </header>

            {/* Same name as a clicked reel frame: arriving from the reel, the frame morphs into this cover */}
            <div
                className="relative mt-16 md:mt-24 mx-5 md:mx-10 aspect-[16/10] bg-ink overflow-hidden"
                style={{ viewTransitionName: FRAME_NAME }}
            >
                <LoopVideo
                    poster={project.cover}
                    video={project.video}
                    playing
                    priority
                    sizes="(min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
                    alt={`${project.title}: ${project.tagline[language]}`}
                />
            </div>

            <section className="px-5 md:px-10 py-24 md:py-36 grid lg:grid-cols-12 gap-8" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="lg:col-span-3 font-display text-grey">
                    {t.caseStudy.overview}
                </h2>
                <p className="lg:col-span-8 lg:col-start-5 text-2xl md:text-[2.1rem] leading-[1.3] tracking-[-0.01em] max-w-[34ch]">
                    {project.overview[language]}
                </p>
            </section>

            <section className="px-5 md:px-10 pb-24 md:pb-36" aria-labelledby="highlights-heading">
                <h2 id="highlights-heading" className="sr-only">
                    {t.caseStudy.highlights}
                </h2>
                <ul className="grid md:grid-cols-3 gap-12 md:gap-10">
                    {project.highlights.map((item) => (
                        <li key={item.title.en} className="border-t border-ink pt-6">
                            <h3
                                className="font-display font-bold text-2xl leading-tight tracking-[-0.01em]"
                                style={{ fontVariationSettings: '"wdth" 112' }}
                            >
                                {item.title[language]}
                            </h3>
                            <p className="mt-4 text-lg leading-[1.55] text-ink/80">{item.body[language]}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {project.gallery.length > 0 && (
                <section className="px-5 md:px-10 pb-24 md:pb-36 flex flex-col gap-8 md:gap-12" aria-label={project.title}>
                    {project.gallery.map((src) => (
                        <div key={src} className="relative aspect-[16/10] bg-ink overflow-hidden">
                            <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
                        </div>
                    ))}
                </section>
            )}

            <section className="px-5 md:px-10 pb-24 md:pb-32 flex flex-wrap items-baseline gap-x-10 gap-y-4 font-display text-xl md:text-2xl" aria-label={project.title}>
                {project.links.live ? (
                    <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Case Study Visit", { slug: project.slug })}
                        className="link-line"
                    >
                        {t.caseStudy.visit}
                    </a>
                ) : (
                    <p className="font-text italic text-grey">{t.caseStudy.notLive}</p>
                )}
                {project.links.source && (
                    <a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("Case Study Source", { slug: project.slug })}
                        className="link-line"
                    >
                        {t.caseStudy.source}
                    </a>
                )}
            </section>

            <nav aria-label={t.caseStudy.next} className="px-5 md:px-10 border-t border-ink">
                <MotionLink
                    href={href(`/work/${next.slug}`)}
                    className="block py-14 md:py-20"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileFocus="hover"
                >
                        <span className="italic text-grey text-lg">{t.caseStudy.next}</span>
                        <span
                            className="mt-2 block font-extrabold leading-[0.95] tracking-[-0.025em] whitespace-nowrap overflow-hidden"
                            style={{ fontSize: `min(9rem, calc((100vw - 3rem) / ${Math.max(next.title.length, 6) * 0.95}))` }}
                        >
                            <StretchText from={100} to={135}>
                                {next.title}
                            </StretchText>
                        </span>
                </MotionLink>
            </nav>
        </article>
    );
}
