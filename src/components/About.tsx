"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

type Entry = { period: string; role: string; detail: string };

function Timeline({ heading, id, entries }: { heading: string; id: string; entries: Entry[] }) {
    return (
        <section className="mt-20 md:mt-28" aria-labelledby={id}>
            <h2 id={id} className="font-display text-grey">
                {heading}
            </h2>
            <ol className="mt-6">
                {entries.map((entry) => (
                    <li
                        key={entry.period + entry.role}
                        className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr] gap-x-6 border-t border-mist py-6"
                    >
                        <span className="font-display text-sm text-grey tabular-nums pt-1">{entry.period}</span>
                        <div>
                            <h3
                                className="font-display font-bold text-lg md:text-xl leading-snug"
                                style={{ fontVariationSettings: '"wdth" 110' }}
                            >
                                {entry.role}
                            </h3>
                            {entry.detail && (
                                <p className="mt-2 text-lg leading-[1.5] text-ink/80 max-w-[58ch]">{entry.detail}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function About() {
    const { t } = useLanguage();
    const reduce = useReducedMotion();
    const a = t.about;

    return (
        <section id="main-content" className="px-5 md:px-10 pt-28 md:pt-40 pb-24 md:pb-36" aria-labelledby="about-heading">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
                {/* Portrait: pinned beside the text on large screens, first on phones */}
                <div className="lg:col-span-4">
                    <motion.div
                        initial={reduce ? false : { clipPath: "inset(50% 0% 50% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: 1.1, ease, delay: 0.15 }}
                        className="relative aspect-[2/3] max-w-sm lg:max-w-none bg-ink overflow-hidden lg:sticky lg:top-28"
                    >
                        <Image
                            src="/about/mathis-riviere.webp"
                            alt={a.photoAlt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 30vw, 24rem"
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                    <h1
                        id="about-heading"
                        className="text-[2rem] md:text-[3rem] leading-[1.12] tracking-[-0.015em] max-w-[24ch]"
                    >
                        {a.intro}
                    </h1>

                    <a
                        href="/about/mathis-riviere-cv.pdf"
                        download="Mathis-Riviere-CV.pdf"
                        onClick={() => track("CV Downloaded")}
                        className="mt-10 inline-block font-display text-lg link-line"
                    >
                        {a.cv}
                    </a>

                    <Timeline heading={a.experienceHeading} id="experience-heading" entries={a.experience} />
                    <Timeline heading={a.educationHeading} id="education-heading" entries={a.education} />

                    <section className="mt-20 md:mt-28" aria-labelledby="principles-heading">
                        <h2 id="principles-heading" className="font-display text-grey">
                            {a.principlesHeading}
                        </h2>
                        <div className="mt-6 grid md:grid-cols-3 gap-10 md:gap-8">
                            {a.items.map((item) => (
                                <article key={item.title} className="border-t border-ink pt-5">
                                    <h3
                                        className="font-display font-bold text-xl leading-tight"
                                        style={{ fontVariationSettings: '"wdth" 110' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-lg leading-[1.5] text-ink/80">{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mt-20 md:mt-28" aria-labelledby="toolbox-heading">
                        <h2 id="toolbox-heading" className="font-display text-grey">
                            {a.toolboxHeading}
                        </h2>
                        <p className="mt-6 text-xl md:text-2xl leading-[1.45] max-w-[52ch]">{a.toolbox}</p>
                    </section>

                    <section className="mt-20 md:mt-28" aria-labelledby="offscreen-heading">
                        <h2 id="offscreen-heading" className="font-display text-grey">
                            {a.offScreenHeading}
                        </h2>
                        <ul className="mt-6">
                            {a.offScreen.map((line) => (
                                <li key={line} className="border-t border-mist py-4 text-xl leading-snug">
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    );
}
