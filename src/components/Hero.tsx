"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const scrollToWork = () => {
        const workSection = document.getElementById("work");
        if (workSection) {
            workSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <section
            id="main-content"
            className="relative min-h-screen flex flex-col px-8 md:px-14 overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Background — treated as texture, not hero */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                    src="/purple-background-hero.jpg"
                    alt=""
                    fill
                    priority
                    quality={80}
                    className="object-cover"
                    style={{
                        opacity: 0.18,
                        filter: "saturate(0.6) brightness(0.8)",
                        transform: "scale(1.05)",
                    }}
                />
            </div>

            {/* Dark vignette */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 100% 80% at 60% 40%, transparent 30%, rgba(10,10,11,0.75) 70%, rgba(10,10,11,0.95) 100%)",
                }}
            />

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 w-full h-48 z-[2] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "linear-gradient(180deg, transparent 0%, #0a0a0b 100%)",
                }}
            />

            {/* Top label — appears after nav */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="relative z-10 pt-36 md:pt-44"
            >
                <p
                    className="text-white/30 uppercase text-xs tracking-[0.32em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    Creative Developer
                </p>
            </motion.div>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center -mt-4">
                {/* Display title */}
                <div className="overflow-hidden">
                    <motion.h1
                        id="hero-heading"
                        initial={shouldReduceMotion ? false : { y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 1.1, ease, delay: 0.45 }}
                        className="text-white leading-[0.82] tracking-[-0.03em]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(5rem,17vw,14rem)",
                        }}
                    >
                        {t.hero.title}
                    </motion.h1>
                </div>

                {/* Ruled line — draws left to right */}
                <motion.div
                    className="mt-8 md:mt-10 h-px"
                    aria-hidden="true"
                    initial={shouldReduceMotion ? false : { scaleX: 0, originX: "0%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, delay: 0.9, ease }}
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(139, 92, 246, 0.7) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)",
                    }}
                />

                {/* Bottom row — subtitle + scroll */}
                <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1, ease }}
                        className="text-white/40 text-base md:text-lg leading-relaxed max-w-[280px]"
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    <motion.button
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 1.3 }}
                        onClick={scrollToWork}
                        className="group flex items-center gap-3 hoverable"
                        aria-label="Scroll to projects section"
                    >
                        <span
                            className="text-white/35 text-[0.68rem] uppercase tracking-[0.22em] group-hover:text-white/65 transition-colors duration-300"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {t.hero.viewProjects}
                        </span>
                        <motion.div
                            animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
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
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-20 md:h-28 relative z-10" aria-hidden="true" />
        </section>
    );
}
