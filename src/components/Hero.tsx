"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// WebGL loads after the text so it never blocks the first paint
const HeroParticles = dynamic(() => import("@/components/HeroParticles"), { ssr: false });

// The second line finishes its reveal at 0.25s + 1.1s
const REVEAL_END_MS = 1450;
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [particlesOn, setParticlesOn] = useState(false);
    const handleParticlesReady = useCallback(() => setParticlesOn(true), []);

    const line = (text: string, delay: number) => (
        // Padding gives accents room inside the reveal mask
        <span data-hero-line className="block overflow-hidden pt-[0.16em] -mt-[0.16em]">
            <motion.span
                className="block"
                initial={shouldReduceMotion ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay }}
            >
                {text}
            </motion.span>
        </span>
    );

    return (
        <section
            id="main-content"
            data-nav-tone="snow"
            className="relative md:min-h-[88svh] flex flex-col justify-end bg-signal text-snow px-5 md:px-10 pb-12 md:pb-10 pt-40 md:pt-28 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Particle name — decorative layer over the real h1 */}
            {!shouldReduceMotion && (
                <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
                    <HeroParticles
                        targetRef={headingRef}
                        startDelay={REVEAL_END_MS}
                        onReady={handleParticlesReady}
                    />
                </div>
            )}

            <h1
                ref={headingRef}
                id="hero-heading"
                className="font-display font-extrabold leading-[0.86] tracking-[-0.02em] transition-colors duration-700 text-[length:min(17.5vw,17rem)]"
                style={{
                    fontStretch: "125%",
                    fontVariationSettings: '"wdth" 125',
                    // Stays in the DOM for screen readers and selection once particles take over
                    color: particlesOn ? "transparent" : "var(--snow)",
                }}
            >
                {line("Mathis", 0.15)}
                {line("Rivière", 0.25)}
            </h1>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="mt-10 md:mt-14 grid gap-6 md:grid-cols-12 items-end"
            >
                <p className="md:col-span-7 lg:col-span-6 text-[1.4rem] md:text-[2rem] leading-[1.18] tracking-[-0.01em] max-w-[30ch]">
                    {t.hero.statement}
                </p>
                <p className="md:col-span-5 lg:col-span-6 md:text-right italic text-snow/75 text-lg">
                    {t.hero.availability}
                </p>
            </motion.div>
        </section>
    );
}
