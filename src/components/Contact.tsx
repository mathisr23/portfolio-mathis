"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { track } from "@vercel/analytics";

export default function Contact() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const email = "rivieremathis23@gmail.com";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        track("Email Copied");
        setTimeout(() => setCopied(false), 2200);
    };

    const getMailtoLink = () => {
        const subject = encodeURIComponent("Hello from your portfolio");
        const body = encodeURIComponent(
            "Hi Mathis,\n\nI came across your portfolio and wanted to reach out.\n\n\n\nBest,"
        );
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <section
            id="contact"
            className="relative min-h-screen py-20 md:py-28 px-8 md:px-14 flex flex-col justify-center overflow-hidden"
            aria-labelledby="contact-heading"
            style={{
                background:
                    "linear-gradient(160deg, #0a0a0b 0%, #0e0b14 50%, #0a0a0b 100%)",
            }}
        >
            {/* Ambient purple glow — top center */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                }}
            />

            {/* Bottom glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139, 92, 246, 0.07) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-3xl mx-auto w-full relative z-10">

                {/* Top label */}
                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="text-purple-500/60 uppercase text-xs tracking-[0.32em] mb-8"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {t.contact.label}
                </motion.p>

                {/* Main headline */}
                <motion.h1
                    id="contact-heading"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                    className="text-white leading-[1.05] tracking-[-0.025em] mb-6"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
                    }}
                >
                    {t.contact.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="text-white/45 text-base md:text-lg leading-relaxed mb-2"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t.contact.subtitle}
                </motion.p>

                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease }}
                    className="text-white/25 text-sm mb-14"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t.contact.description}
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={shouldReduceMotion ? false : { scaleX: 0, originX: "0%" }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease }}
                    className="h-px mb-14"
                    aria-hidden="true"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                    }}
                />

                {/* Email — the hero element */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.45, ease }}
                    className="mb-8"
                >
                    <p
                        className="text-white/80 mb-5 leading-none tracking-tight"
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(1.1rem, 3.2vw, 2rem)",
                            fontWeight: 400,
                        }}
                    >
                        {email}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                        {/* Copy button */}
                        <motion.button
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 px-5 py-2.5 hoverable"
                            whileHover={shouldReduceMotion ? {} : { y: -1 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "3px",
                                background: "transparent",
                                color: "rgba(255,255,255,0.55)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.span
                                        key="copied"
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
                                        className="flex items-center gap-2"
                                        style={{ color: "rgba(139,92,246,0.9)" }}
                                        aria-live="assertive"
                                    >
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M2 6.5L5 9.5L11 3.5"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {t.contact.copied}
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy"
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
                                        className="flex items-center gap-2"
                                    >
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="4"
                                                y="4"
                                                width="8"
                                                height="8"
                                                rx="1.5"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                            />
                                            <path
                                                d="M9 4V2C9 1.44772 8.55228 1 8 1H2C1.44772 1 1 1.44772 1 2V8C1 8.55228 1.44772 9 2 9H4"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                            />
                                        </svg>
                                        {t.contact.copyEmail}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Open email */}
                        <motion.a
                            href={getMailtoLink()}
                            onClick={() => track("Email Link Opened")}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 hoverable"
                            whileHover={shouldReduceMotion ? {} : { y: -1 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                border: "1px solid rgba(139,92,246,0.3)",
                                borderRadius: "3px",
                                background: "rgba(139,92,246,0.08)",
                                color: "rgba(139,92,246,0.9)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {t.contact.openEmail}
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 6H10M10 6L7 3M10 6L7 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>

                {/* Divider */}
                <div
                    className="h-px mb-8"
                    aria-hidden="true"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                />

                {/* Social links + location */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6, ease }}
                    className="flex flex-wrap items-center justify-between gap-4"
                >
                    <div className="flex gap-4">
                        {/* LinkedIn */}
                        <motion.a
                            href="https://www.linkedin.com/in/mathis-rivi%C3%A8re-0a308a1a1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Social Clicked", { platform: "LinkedIn" })
                            }
                            className="flex items-center gap-2 hoverable group"
                            whileHover={shouldReduceMotion ? {} : { y: -1 }}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.35)",
                                transition: "color 0.3s ease",
                            }}
                            aria-label="LinkedIn profile — opens in new tab"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="group-hover:text-white/70 transition-colors"
                                aria-hidden="true"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="group-hover:text-white/60 transition-colors">
                                {t.contact.linkedin}
                            </span>
                        </motion.a>

                        {/* GitHub */}
                        <motion.a
                            href="https://github.com/mathisr23"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track("Social Clicked", { platform: "GitHub" })
                            }
                            className="flex items-center gap-2 hoverable group"
                            whileHover={shouldReduceMotion ? {} : { y: -1 }}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.35)",
                                transition: "color 0.3s ease",
                            }}
                            aria-label="GitHub profile — opens in new tab"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="group-hover:text-white/70 transition-colors"
                                aria-hidden="true"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="group-hover:text-white/60 transition-colors">
                                {t.contact.github}
                            </span>
                        </motion.a>
                    </div>

                    {/* Location */}
                    <p
                        className="text-white/20 text-xs"
                        style={{
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.06em",
                        }}
                    >
                        {t.contact.location}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
