"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { track } from "@vercel/analytics";

export default function Contact() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);
    const email = "rivieremathis23@gmail.com";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        track('Email Copied');
        setTimeout(() => setCopied(false), 2000);
    };

    const getMailtoLink = () => {
        const subject = encodeURIComponent("Hello from your portfolio");
        const body = encodeURIComponent("Hi Mathis,\n\nI came across your portfolio and wanted to reach out.\n\n\n\nBest,");
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen py-20 px-6 flex items-center"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/contact-background.jpg"
                    alt="Contact Background"
                    fill
                    quality={90}
                    className="object-cover"
                />
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 z-0 bg-black/60" />

            {/* Subtle purple glow */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none z-[1]"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
                }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center mb-8"
                >
                    <p className="text-purple-400/80 text-sm uppercase tracking-[0.2em] mb-4">
                        {t.contact.label}
                    </p>
                    <h1
                        className="text-[clamp(2.5rem,7vw,4.5rem)] font-serif leading-[1.1] tracking-[-0.02em] text-white mb-6"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t.contact.title}
                    </h1>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        {t.contact.subtitle}
                    </p>
                    <p className="text-white/40 text-base mt-2">
                        {t.contact.description}
                    </p>
                </motion.div>

                {/* Email display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center mb-6"
                >
                    <p
                        className="text-[clamp(1.5rem,4vw,2.5rem)] font-medium text-white/90 mb-6 hoverable"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        {email}
                    </p>

                    {/* Copy button */}
                    <motion.button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hoverable"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            color: "rgba(255, 255, 255, 0.8)",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex items-center gap-2 text-green-400"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {t.contact.copied}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="copy"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex items-center gap-2"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    {t.contact.copyEmail}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center mb-8"
                >
                    <motion.a
                        href={getMailtoLink()}
                        onClick={() => track('Email Link Opened')}
                        className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-medium text-white rounded-2xl overflow-hidden hoverable"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: "rgba(139, 92, 246, 0.2)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(139, 92, 246, 0.4)",
                            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
                        }}
                    >
                        {/* Glow effect */}
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: "linear-gradient(180deg, rgba(139, 92, 246, 0.3) 0%, transparent 50%, rgba(139, 92, 246, 0.3) 100%)",
                            }}
                        />
                        <span className="relative z-10">{t.contact.openEmail}</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="relative z-10 transition-transform group-hover:translate-x-1"
                        >
                            <path
                                d="M4 10H16M16 10L11 5M16 10L11 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.a>
                </motion.div>

                {/* Divider */}
                <div className="w-16 h-px bg-white/10 mx-auto mb-6" />

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center"
                >
                    <div className="flex justify-center gap-4 mb-8">
                        {/* LinkedIn */}
                        <motion.a
                            href="https://www.linkedin.com/in/mathis-rivi%C3%A8re-0a308a1a1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('Social Clicked', { platform: 'LinkedIn' })}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hoverable"
                            whileHover={{ scale: 1.05, y: -2 }}
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "rgba(255, 255, 255, 0.7)",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            {t.contact.linkedin}
                        </motion.a>

                        {/* GitHub */}
                        <motion.a
                            href="https://github.com/mathisr23"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('Social Clicked', { platform: 'GitHub' })}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hoverable"
                            whileHover={{ scale: 1.05, y: -2 }}
                            style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "rgba(255, 255, 255, 0.7)",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            {t.contact.github}
                        </motion.a>
                    </div>

                    {/* Timezone */}
                    <p className="text-white/30 text-sm">
                        {t.contact.location}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
