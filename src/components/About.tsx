"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
    const { t } = useLanguage();
    const aboutItems = t.about.items;
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <section
            id="about"
            className="relative min-h-screen py-28 md:py-36 px-8 md:px-14 overflow-hidden"
            aria-labelledby="about-heading"
            style={{
                background:
                    "linear-gradient(180deg, #0a0a0b 0%, #0d0b13 40%, #100c18 70%, #0a0a0b 100%)",
            }}
        >
            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.055) 0%, transparent 60%)",
                }}
            />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

                    {/* Left column — sticky sidebar */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease }}
                        className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
                    >
                        {/* Section label */}
                        <p
                            id="about-heading"
                            className="text-white/30 uppercase text-xs tracking-[0.3em] mb-8"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {t.about.label}
                        </p>

                        {/* Intro */}
                        <p
                            className="text-white/50 text-base leading-relaxed mb-10"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            {t.about.intro}
                        </p>

                        {/* Active item detail panel */}
                        <div
                            className="relative min-h-[160px]"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                                    transition={{ duration: 0.3, ease }}
                                >
                                    <span
                                        className="block mb-3 text-xs uppercase tracking-[0.2em]"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            color: "rgba(139, 92, 246, 0.7)",
                                        }}
                                    >
                                        {aboutItems[activeIndex].number}
                                    </span>

                                    <h4
                                        className="text-white text-xl mb-3 leading-snug"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontStyle: "italic",
                                            fontWeight: 400,
                                        }}
                                    >
                                        {aboutItems[activeIndex].title}
                                    </h4>

                                    <p
                                        className="text-white/55 text-sm leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {aboutItems[activeIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Decorative rule */}
                        <motion.div
                            className="mt-8 h-px"
                            aria-hidden="true"
                            initial={shouldReduceMotion ? false : { scaleX: 0, originX: "0%" }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3, ease }}
                            style={{
                                width: "55%",
                                background:
                                    "linear-gradient(90deg, rgba(139, 92, 246, 0.45) 0%, transparent 100%)",
                            }}
                        />
                    </motion.div>

                    {/* Right column — interactive items */}
                    <div
                        className="lg:col-span-8"
                        role="list"
                        aria-label="About me topics"
                    >
                        {aboutItems.map((item, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <motion.div
                                    key={item.number}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.65,
                                        delay: index * 0.08,
                                        ease,
                                    }}
                                    role="listitem"
                                    className="group relative border-t py-8 md:py-10 hoverable"
                                    style={{
                                        borderColor: "rgba(255,255,255,0.07)",
                                    }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <motion.div
                                        className="flex items-baseline gap-5 md:gap-8"
                                        animate={shouldReduceMotion ? {} : {
                                            opacity: isActive ? 1 : 0.22,
                                            y: isActive ? -3 : 0,
                                        }}
                                        transition={{ duration: 0.4, ease }}
                                    >
                                        {/* Big number */}
                                        <motion.span
                                            className="shrink-0 text-sm tracking-[0.1em] uppercase"
                                            animate={shouldReduceMotion ? {} : {
                                                color: isActive
                                                    ? "rgba(139, 92, 246, 1)"
                                                    : "rgba(139, 92, 246, 0.3)",
                                            }}
                                            transition={{ duration: 0.35 }}
                                            style={{ fontFamily: "var(--font-mono)" }}
                                            aria-hidden="true"
                                        >
                                            {item.number}
                                        </motion.span>

                                        {/* Title in Cormorant */}
                                        <motion.h3
                                            className="leading-[1.05] tracking-[-0.02em]"
                                            animate={shouldReduceMotion ? {} : {
                                                color: isActive
                                                    ? "rgba(255,255,255,1)"
                                                    : "rgba(255,255,255,0.5)",
                                            }}
                                            transition={{ duration: 0.35 }}
                                            style={{
                                                fontFamily: "var(--font-serif)",
                                                fontStyle: "italic",
                                                fontWeight: 300,
                                                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                                            }}
                                        >
                                            {item.title}
                                        </motion.h3>
                                    </motion.div>

                                    {/* Active indicator line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-px"
                                        aria-hidden="true"
                                        initial={{ scaleX: 0, originX: "0%" }}
                                        animate={shouldReduceMotion ? {} : {
                                            scaleX: isActive ? 1 : 0,
                                            opacity: isActive ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.5, ease }}
                                        style={{
                                            width: "100%",
                                            background:
                                                "linear-gradient(90deg, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.1) 60%, transparent 100%)",
                                        }}
                                    />

                                    {/* Active row glow */}
                                    <motion.div
                                        className="absolute inset-0 -z-10 rounded"
                                        aria-hidden="true"
                                        animate={shouldReduceMotion ? {} : { opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            background:
                                                "linear-gradient(90deg, rgba(139, 92, 246, 0.04) 0%, transparent 60%)",
                                        }}
                                    />
                                </motion.div>
                            );
                        })}

                        {/* Final border */}
                        <div
                            className="h-px"
                            aria-hidden="true"
                            style={{ background: "rgba(255,255,255,0.07)" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
