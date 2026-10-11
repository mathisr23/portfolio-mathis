"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

type Tone = "snow" | "ink";

/**
 * One line of navigation. Its colour follows whatever section sits under it:
 * sections declare `data-nav-tone="snow"` when they are dark, otherwise it is ink.
 */
export default function Navbar() {
    const { t, href, language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const [tone, setTone] = useState<Tone>("ink");

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

    const links = [
        { label: t.nav.work, to: href("/#work") },
        { label: t.nav.about, to: href("/about") },
        { label: t.nav.contact, to: href("/contact") },
    ];
    const other = language === "en" ? "fr" : "en";

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
                tone === "snow" ? "text-snow" : "text-ink"
            }`}
        >
            <div className="flex items-baseline justify-between gap-6 px-5 md:px-10 py-5 font-display text-[0.95rem] md:text-base">
                <Link href={href("/")} className="font-medium tracking-tight whitespace-nowrap">
                    <span className="hidden sm:inline">Mathis Rivière</span>
                    <span className="sm:hidden" aria-label="Mathis Rivière">
                        M. Rivière
                    </span>
                </Link>

                <nav aria-label={t.nav.label}>
                    <ul className="flex items-baseline gap-4 md:gap-8">
                        {links.map((link) => {
                            const current = !link.to.includes("#") && pathname === link.to;
                            return (
                                <li key={link.to}>
                                    <Link
                                        href={link.to}
                                        aria-current={current ? "page" : undefined}
                                        className={current ? "link-line" : "opacity-70 hover:opacity-100 transition-opacity"}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            {/* Same style as the links: the current language is plain, the other is the action */}
                            <span className="sr-only">{t.nav.language}: </span>
                            <span aria-current="true" className="uppercase">
                                {language}
                            </span>
                            <span aria-hidden="true" className="opacity-40 mx-1">
                                /
                            </span>
                            <button
                                type="button"
                                onClick={() => setLanguage(other)}
                                lang={other}
                                className="uppercase opacity-70 hover:opacity-100 transition-opacity"
                                aria-label={t.nav.switchTo}
                            >
                                {other}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
