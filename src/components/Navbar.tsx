"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/NavItem";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
    const { t } = useLanguage();
    const navItems = [t.nav.work, t.nav.about, t.nav.contact];
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            role="banner"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div
                className="flex items-center justify-between px-8 pl-8 pr-8 md:pl-14 md:pr-36 py-5 transition-all duration-500"
                style={{
                    background: scrolled
                        ? "rgba(10, 10, 11, 0.88)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(24px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
                }}
            >
                {/* Brand mark */}
                <a
                    href="/"
                    className="nav-brand hoverable"
                    aria-label="Mathis Rivière — Home"
                >
                    MR.
                </a>

                {/* Navigation */}
                <nav aria-label="Main navigation">
                    <ul className="flex items-center gap-0" role="list">
                        {navItems.map((item, index) => (
                            <li key={item}>
                                <NavItem label={item} index={index} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Hairline border on scroll */}
            <div
                className="absolute bottom-0 left-0 w-full h-px transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.25) 40%, rgba(139, 92, 246, 0.25) 60%, transparent 100%)",
                    opacity: scrolled ? 1 : 0,
                }}
                aria-hidden="true"
            />
        </motion.header>
    );
}
