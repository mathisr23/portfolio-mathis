"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
    const { t } = useLanguage();
    const aboutItems = t.about.items;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            id="about"
            className="relative min-h-screen py-32 px-6"
            style={{
                background: "linear-gradient(180deg, #0a0a0b 0%, #0f0a15 50%, #1a0a2e 100%)",
            }}
        >
            {/* Subtle purple glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
                }}
            />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                    {/* Left Column - Sticky Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
                    >
                        <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-6">
                            {t.about.label}
                        </p>

                        {/* Intro text */}
                        <p className="text-white/60 text-base leading-relaxed mb-8">
                            {t.about.intro}
                        </p>

                        {/* Dynamic description based on active item */}
                        <div className="relative min-h-[120px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                >
                                    {/* Active item number */}
                                    <span
                                        className="text-xs font-mono mb-3 block"
                                        style={{ color: "rgba(139, 92, 246, 0.8)" }}
                                    >
                                        {aboutItems[activeIndex].number}
                                    </span>

                                    {/* Active item title */}
                                    <h4 className="text-white text-lg font-medium mb-3">
                                        {aboutItems[activeIndex].title}
                                    </h4>

                                    {/* Active item description */}
                                    <p className="text-white/70 text-base leading-relaxed">
                                        {aboutItems[activeIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Decorative accent line */}
                        <motion.div
                            className="mt-8 h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent"
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        />
                    </motion.div>

                    {/* Right Column - Interactive Items */}
                    <div className="lg:col-span-8">
                        {aboutItems.map((item, index) => (
                            <motion.div
                                key={item.number}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className="group relative border-t border-white/10 py-8 hoverable"
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <motion.div
                                    className="flex items-baseline gap-6"
                                    animate={{
                                        opacity: activeIndex === index ? 1 : 0.25,
                                        y: activeIndex === index ? -4 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    {/* Number */}
                                    <motion.span
                                        className="text-sm font-mono"
                                        animate={{
                                            color: activeIndex === index
                                                ? "rgba(139, 92, 246, 1)"
                                                : "rgba(139, 92, 246, 0.4)",
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {item.number}
                                    </motion.span>

                                    {/* Title */}
                                    <motion.h3
                                        className="text-[clamp(2rem,5vw,4rem)] font-serif leading-[1.1] tracking-[-0.02em]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                        animate={{
                                            color: activeIndex === index
                                                ? "#ffffff"
                                                : "rgba(255, 255, 255, 0.6)",
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {item.title}
                                    </motion.h3>
                                </motion.div>

                                {/* Active underline indicator */}
                                <motion.div
                                    className="absolute bottom-4 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: activeIndex === index ? "100%" : 0,
                                        opacity: activeIndex === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                />

                                {/* Subtle glow on active */}
                                <motion.div
                                    className="absolute inset-0 -z-10 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeIndex === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
                                    }}
                                />
                            </motion.div>
                        ))}

                        {/* Bottom border */}
                        <div className="border-t border-white/10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
