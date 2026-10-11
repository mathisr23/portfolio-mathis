"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// WebGL loads after the text so it never blocks the first paint
const HeroParticles = dynamic(() => import("@/components/HeroParticles"), { ssr: false });

// Last name line finishes revealing at 0.58s + 1.1s
const REVEAL_END_MS = 1700;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [particlesOn, setParticlesOn] = useState(false);
    const handleParticlesReady = useCallback(() => setParticlesOn(true), []);

    const scrollToWork = () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    };

    const nameLine = (text: string, delay: number, indent = false) => (
        // Padding gives accents and descenders room inside the reveal mask
        <span data-hero-line className="block overflow-hidden pt-[0.18em] pb-[0.06em] -mt-[0.18em]">
            <motion.span
                className={`block ${indent ? "pl-[0.6em] md:pl-[1.6em] lg:pl-[2.8em]" : ""}`}
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
            className="relative min-h-[100svh] flex flex-col px-8 md:px-14 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Violet bloom behind the name */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 45% at 48% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
                }}
            />

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

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 w-full h-48 z-[1] pointer-events-none"
                aria-hidden="true"
                style={{ background: "linear-gradient(180deg, transparent 0%, #0a0a0b 100%)" }}
            />

            {/* Top label */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="relative z-10 pt-32 md:pt-40 flex items-center gap-4"
            >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-400" />
                </span>
                <p
                    className="text-white/45 uppercase text-[0.68rem] tracking-[0.32em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {t.hero.label}
                </p>
            </motion.div>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end md:justify-center pt-16 md:pt-0">
                <h1
                    ref={headingRef}
                    id="hero-heading"
                    className="leading-[0.84] tracking-[-0.035em] transition-colors duration-700 text-[clamp(4.25rem,25vw,8rem)] md:text-[clamp(4.25rem,16vw,15rem)]"
                    style={{
                        // Stays in the DOM for screen readers and selection once particles take over
                        color: particlesOn ? "transparent" : "#fff",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 300,
                    }}
                >
                    {nameLine("Mathis", 0.45)}
                    {nameLine("Rivière", 0.58, true)}
                </h1>

                {/* Ruled line — draws left to right */}
                <motion.div
                    className="mt-8 md:mt-10 h-px max-w-3xl"
                    aria-hidden="true"
                    initial={shouldReduceMotion ? false : { scaleX: 0, originX: "0%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, delay: 0.9, ease }}
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(139, 92, 246, 0.7) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)",
                    }}
                />

                {/* Statement + scroll */}
                <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
                    <div className="max-w-md">
                        <motion.p
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.05, ease }}
                            className="text-white/70 text-lg md:text-xl leading-snug"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t.hero.statement}
                        </motion.p>
                        <motion.p
                            initial={shouldReduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.25 }}
                            className="mt-4 text-white/30 text-[0.65rem] uppercase tracking-[0.2em]"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {t.hero.availability}
                        </motion.p>
                    </div>

                    <motion.button
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 1.4 }}
                        onClick={scrollToWork}
                        className="group flex items-center gap-3 hoverable"
                    >
                        <span
                            className="text-white/35 text-[0.68rem] uppercase tracking-[0.22em] group-hover:text-white/70 transition-colors duration-300"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {t.hero.viewProjects}
                        </span>
                        <motion.span
                            animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-8 h-8 border border-white/15 rounded-full flex items-center justify-center group-hover:border-purple-500/50 transition-colors duration-300"
                            aria-hidden="true"
                        >
                            <svg
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                className="text-white/40 group-hover:text-white/70 transition-colors"
                            >
                                <path
                                    d="M5.5 1v9M2 7l3.5 3L9 7"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.span>
                    </motion.button>
                </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-16 md:h-24 relative z-10" aria-hidden="true" />
        </section>
    );
}
