"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <footer
            className="relative flex flex-col px-8 md:px-14 pt-20 pb-10 overflow-hidden"
            style={{ minHeight: "55vh" }}
            role="contentinfo"
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 z-0"
                aria-hidden="true"
                style={{
                    background:
                        "linear-gradient(180deg, #0a0a0b 0%, #0a0a0b 40%, #0f0b18 72%, #1a0d2e 100%)",
                }}
            />

            {/* Purple bloom at bottom */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[280px] z-[1] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
                }}
            />

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full py-8">
                {/* Decorative rule */}
                <motion.div
                    initial={shouldReduceMotion ? false : { scaleX: 0, originX: "50%" }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease }}
                    className="h-px mx-auto mb-14"
                    aria-hidden="true"
                    style={{
                        width: "40%",
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                    }}
                />

                {/* Headline */}
                <motion.h2
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                    className="text-white leading-[1.08] tracking-[-0.025em]"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                    }}
                >
                    {t.footer.titlePart1}{" "}
                    <span
                        className="text-transparent bg-clip-text"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
                        }}
                    >
                        {t.footer.titlePart2}
                    </span>
                </motion.h2>

                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className="mt-5 text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t.footer.subtitle}
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease }}
                    className="mt-10"
                >
                    <motion.a
                        href="/contact"
                        className="group inline-flex items-center gap-3 hoverable"
                        whileHover={shouldReduceMotion ? {} : { y: -2 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            color: "rgba(255,255,255,0.75)",
                            padding: "0.875rem 2.25rem",
                            border: "1px solid rgba(139, 92, 246, 0.28)",
                            borderRadius: "3px",
                            background: "rgba(139, 92, 246, 0.07)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            boxShadow:
                                "0 4px 24px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                            transition: "all 0.35s ease",
                            textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(139, 92, 246, 0.55)";
                            el.style.background = "rgba(139, 92, 246, 0.14)";
                            el.style.color = "rgba(255,255,255,1)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(139, 92, 246, 0.28)";
                            el.style.background = "rgba(139, 92, 246, 0.07)";
                            el.style.color = "rgba(255,255,255,0.75)";
                        }}
                    >
                        <span>{t.footer.cta}</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        >
                            <path
                                d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>

            {/* Bottom meta — in normal flow, never overlaps button */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 mt-6"
            >
                <p
                    className="text-white/15 text-xs max-w-sm leading-relaxed text-center sm:text-left"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t.footer.disclaimer}
                </p>
                <p
                    className="text-white/15 text-xs shrink-0"
                    style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                >
                    {t.footer.copyright}
                </p>
            </motion.div>
        </footer>
    );
}
