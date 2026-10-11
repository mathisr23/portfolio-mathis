"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { contact } from "@/lib/contact";
import StretchText from "@/components/StretchText";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer data-nav-tone="snow" className="bg-ink text-snow px-5 md:px-10 pt-24 md:pt-36 pb-8">
            <p className="text-2xl md:text-4xl leading-tight max-w-[22ch]">{t.footer.prompt}</p>

            <motion.a
                href={`mailto:${contact.email}`}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileFocus="hover"
                className="mt-6 md:mt-10 block font-extrabold tracking-[-0.03em] leading-none whitespace-nowrap overflow-hidden"
                style={{ fontSize: "min(7rem, calc((100vw - 2.5rem) / 20))" }}
            >
                <StretchText from={100} to={118}>
                    {contact.email}
                </StretchText>
            </motion.a>

            <div className="mt-20 md:mt-32 pt-6 border-t border-snow/20 flex flex-col md:flex-row gap-4 md:items-baseline md:justify-between font-display text-sm">
                <ul className="flex gap-6">
                    <li>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-line">
                            GitHub
                        </a>
                    </li>
                </ul>
                <p className="text-snow/60 font-text italic text-base">{t.footer.colophon}</p>
                <p className="text-snow/60">{t.footer.copyright}</p>
            </div>
        </footer>
    );
}
