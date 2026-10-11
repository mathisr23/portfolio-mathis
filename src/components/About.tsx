"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="main-content" className="px-5 md:px-10 pt-36 md:pt-48 pb-24 md:pb-36" aria-labelledby="about-heading">
            <h1
                id="about-heading"
                className="text-[2rem] md:text-[3.4rem] leading-[1.12] tracking-[-0.015em] max-w-[24ch]"
            >
                {t.about.intro}
            </h1>

            <div className="mt-20 md:mt-32 grid md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-20">
                {t.about.items.map((item) => (
                    <article key={item.title} className="border-t border-mist pt-6 max-w-[34rem]">
                        <h2
                            className="font-display font-bold text-2xl md:text-[1.9rem] leading-tight tracking-[-0.01em]"
                            style={{ fontVariationSettings: '"wdth" 112' }}
                        >
                            {item.title}
                        </h2>
                        <p className="mt-4 text-lg md:text-xl leading-[1.5] text-ink/80">{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
