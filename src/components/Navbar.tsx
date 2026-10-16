"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Tone = "snow" | "ink";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * One line of navigation. Its colour follows whatever section sits under it:
 * sections declare `data-nav-tone="snow"` when they are dark, otherwise it is ink.
 * On phones the links move into a full-screen menu.
 */
export default function Navbar() {
    const { t, href, language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const reduce = useReducedMotion();
    const [tone, setTone] = useState<Tone>("ink");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const probe = 32; // roughly the nav's vertical centre
            let next: Tone = "ink";
            document.querySelectorAll<HTMLElement>("[data-nav-tone]").forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.top <= probe && r.bottom > probe) next = el.dataset.navTone as Tone;
            });
            setTone(next);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [pathname]);

    // While the menu is open: no page scroll, Escape closes, focus goes in and comes back out
    useEffect(() => {
        if (!menuOpen) return;
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = "hidden";
        firstMenuLinkRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        const button = menuButtonRef.current;
        return () => {
            root.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
            button?.focus();
        };
    }, [menuOpen]);

    const links = [
        { label: t.nav.work, to: href("/#work") },
        { label: t.nav.about, to: href("/about") },
        { label: t.nav.contact, to: href("/contact") },
    ];
    const other = language === "en" ? "fr" : "en";
    const isCurrent = (to: string) => !to.includes("#") && pathname === to;

    const languageSwitch = (onSwitch?: () => void) => (
        <>
            {/* The current language is plain, the other is the action */}
            <span className="sr-only">{t.nav.language}: </span>
            <span aria-current="true" className="uppercase">
                {language}
            </span>
            <span aria-hidden="true" className="opacity-40 mx-1">
                /
            </span>
            <button
                type="button"
                onClick={() => {
                    onSwitch?.();
                    setLanguage(other);
                }}
                lang={other}
                className="uppercase opacity-70 hover:opacity-100 transition-opacity"
                aria-label={t.nav.switchTo}
            >
                {other}
            </button>
        </>
    );

    return (
        <>
            <header
                className={`site-nav fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
                    tone === "snow" ? "text-snow" : "text-ink"
                }`}
            >
                <div className="flex items-baseline justify-between gap-6 px-5 md:px-10 py-5 font-display text-base">
                    <Link href={href("/")} className="font-medium tracking-tight whitespace-nowrap">
                        Mathis Rivière
                    </Link>

                    <nav aria-label={t.nav.label} className="hidden md:block">
                        <ul className="flex items-baseline gap-8">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        href={link.to}
                                        aria-current={isCurrent(link.to) ? "page" : undefined}
                                        className={
                                            isCurrent(link.to)
                                                ? "link-line"
                                                : "opacity-70 hover:opacity-100 transition-opacity"
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="whitespace-nowrap">{languageSwitch()}</li>
                        </ul>
                    </nav>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden link-line"
                    >
                        {t.nav.menu}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t.nav.label}
                        className="md:hidden fixed inset-0 z-[60] bg-signal text-snow flex flex-col px-5 pb-8"
                        initial={reduce ? { opacity: 0 } : { clipPath: "inset(50% 0% 50% 0%)" }}
                        animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={reduce ? { opacity: 0 } : { clipPath: "inset(50% 0% 50% 0%)" }}
                        transition={{ duration: reduce ? 0.15 : 0.6, ease }}
                    >
                        <div className="flex items-baseline justify-between py-5 font-display text-base">
                            <Link href={href("/")} onClick={() => setMenuOpen(false)} className="font-medium tracking-tight">
                                Mathis Rivière
                            </Link>
                            <button type="button" onClick={() => setMenuOpen(false)} className="link-line">
                                {t.nav.close}
                            </button>
                        </div>

                        <nav aria-label={t.nav.label} className="flex-1 flex flex-col justify-center">
                            <ul className="flex flex-col gap-2">
                                {links.map((link, i) => (
                                    <li key={link.to} className="overflow-hidden">
                                        <motion.div
                                            initial={reduce ? false : { y: "105%" }}
                                            animate={{ y: "0%" }}
                                            transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                                        >
                                            <Link
                                                ref={i === 0 ? firstMenuLinkRef : undefined}
                                                href={link.to}
                                                onClick={() => setMenuOpen(false)}
                                                aria-current={isCurrent(link.to) ? "page" : undefined}
                                                className="block whitespace-nowrap font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-[length:min(12vw,5rem)]"
                                                style={{ fontVariationSettings: '"wdth" 125' }}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="font-display text-lg">{languageSwitch(() => setMenuOpen(false))}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
