"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { contact } from "@/lib/contact";
import StretchText from "@/components/StretchText";

export default function Contact() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(contact.email);
        setCopied(true);
        track("Email Copied");
        setTimeout(() => setCopied(false), 2200);
    };

    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(t.contactMail.subject)}&body=${encodeURIComponent(
        t.contactMail.body
    )}`;

    return (
        <section
            id="main-content"
            data-nav-tone="snow"
            className="min-h-[100svh] bg-signal text-snow px-5 md:px-10 pt-36 md:pt-44 pb-10 flex flex-col"
            aria-labelledby="contact-heading"
        >
            <h1
                id="contact-heading"
                className="font-display font-extrabold leading-[0.9] tracking-[-0.025em] text-[length:clamp(3rem,10vw,10rem)]"
                style={{ fontVariationSettings: '"wdth" 125' }}
            >
                {t.contact.title}
            </h1>

            <div className="mt-10 md:mt-14 max-w-[40ch] text-xl md:text-2xl leading-snug">
                <p>{t.contact.subtitle}</p>
                <p className="mt-3 text-snow/75">{t.contact.description}</p>
            </div>

            <div className="mt-auto pt-20">
                <motion.a
                    href={mailto}
                    onClick={() => track("Email Opened")}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileFocus="hover"
                    className="block font-extrabold tracking-[-0.03em] leading-none whitespace-nowrap overflow-hidden"
                    style={{ fontSize: "min(7rem, calc((100vw - 2.5rem) / 20))" }}
                >
                    <StretchText from={100} to={118}>
                        {contact.email}
                    </StretchText>
                </motion.a>

                <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-display">
                    <button type="button" onClick={copyEmail} className="link-line">
                        {t.contact.copyEmail}
                    </button>
                    <a href={mailto} onClick={() => track("Email Opened")} className="link-line">
                        {t.contact.openEmail}
                    </a>
                    <span aria-live="polite" className="italic font-text text-lg text-snow/80">
                        {copied ? t.contact.copied : ""}
                    </span>
                </div>

                <div className="mt-16 pt-6 border-t border-snow/25 flex flex-col md:flex-row gap-4 md:justify-between md:items-baseline font-display text-sm">
                    <ul className="flex gap-6">
                        <li>
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line">
                                {t.contact.linkedin}
                            </a>
                        </li>
                        <li>
                            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-line">
                                {t.contact.github}
                            </a>
                        </li>
                    </ul>
                    <p className="font-text italic text-base text-snow/75">{t.contact.location}</p>
                </div>
            </div>
        </section>
    );
}
