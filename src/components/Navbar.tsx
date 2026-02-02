"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/NavItem";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
    const { t } = useLanguage();
    const navItems = [t.nav.work, t.nav.about, t.nav.contact];
    const [isHovered, setIsHovered] = useState(false);
    const [mouseXPercent, setMouseXPercent] = useState(50);
    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();

        // Track horizontal position for glow X position (as percentage)
        const relativeX = e.clientX - rect.left;
        const percentX = (relativeX / rect.width) * 100;
        // Clamp between 15-85% so glow doesn't overflow at edges
        setMouseXPercent(Math.max(15, Math.min(85, percentX)));
    }, []);

    // Calculate side glow intensity based on mouse position (use raw position)
    const rawPercent = isHovered ? mouseXPercent : 50;
    const leftGlowOpacity = isHovered && rawPercent <= 20 ? Math.max(0, 1 - (rawPercent / 20)) : 0;
    const rightGlowOpacity = isHovered && rawPercent >= 80 ? Math.max(0, (rawPercent - 80) / 20) : 0;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div
                ref={navRef}
                className="nav-pill relative flex items-center gap-2 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                style={{
                    borderRadius: "16px",
                    border: "2px solid transparent",
                }}
            >
                {/* Top glow effect */}
                <span
                    style={{
                        position: "absolute",
                        left: `${mouseXPercent}%`,
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "6px",
                        background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 1) 0%, rgba(139, 92, 246, 0.6) 30%, rgba(139, 92, 246, 0.2) 60%, transparent 100%)",
                        filter: "blur(4px)",
                        opacity: isHovered ? 1 : 0,
                        top: "-3px",
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                    }}
                />
                {/* Bottom glow effect */}
                <span
                    style={{
                        position: "absolute",
                        left: `${mouseXPercent}%`,
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "6px",
                        background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 1) 0%, rgba(139, 92, 246, 0.6) 30%, rgba(139, 92, 246, 0.2) 60%, transparent 100%)",
                        filter: "blur(4px)",
                        opacity: isHovered ? 1 : 0,
                        bottom: "-3px",
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                    }}
                />

                {/* Top border glow line */}
                <span
                    style={{
                        position: "absolute",
                        left: `${mouseXPercent}%`,
                        transform: "translateX(-50%)",
                        width: "80px",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.9) 50%, transparent 100%)",
                        opacity: isHovered ? 1 : 0,
                        top: "-1px",
                        transition: "opacity 0.25s ease",
                        pointerEvents: "none",
                        zIndex: 11,
                    }}
                />
                {/* Bottom border glow line */}
                <span
                    style={{
                        position: "absolute",
                        left: `${mouseXPercent}%`,
                        transform: "translateX(-50%)",
                        width: "80px",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.9) 50%, transparent 100%)",
                        opacity: isHovered ? 1 : 0,
                        bottom: "-1px",
                        transition: "opacity 0.25s ease",
                        pointerEvents: "none",
                        zIndex: 11,
                    }}
                />

                {/* Left corner glow - curved effect */}
                <span
                    style={{
                        position: "absolute",
                        left: "-4px",
                        top: "-4px",
                        width: "40px",
                        height: "40px",
                        background: "radial-gradient(circle at 100% 100%, transparent 60%, rgba(139, 92, 246, 0.8) 70%, rgba(139, 92, 246, 0.4) 80%, transparent 100%)",
                        filter: "blur(3px)",
                        opacity: leftGlowOpacity,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                        borderTopLeftRadius: "16px",
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        left: "-4px",
                        bottom: "-4px",
                        width: "40px",
                        height: "40px",
                        background: "radial-gradient(circle at 100% 0%, transparent 60%, rgba(139, 92, 246, 0.8) 70%, rgba(139, 92, 246, 0.4) 80%, transparent 100%)",
                        filter: "blur(3px)",
                        opacity: leftGlowOpacity,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                        borderBottomLeftRadius: "16px",
                    }}
                />

                {/* Right corner glow - curved effect */}
                <span
                    style={{
                        position: "absolute",
                        right: "-4px",
                        top: "-4px",
                        width: "40px",
                        height: "40px",
                        background: "radial-gradient(circle at 0% 100%, transparent 60%, rgba(139, 92, 246, 0.8) 70%, rgba(139, 92, 246, 0.4) 80%, transparent 100%)",
                        filter: "blur(3px)",
                        opacity: rightGlowOpacity,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                        borderTopRightRadius: "16px",
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        right: "-4px",
                        bottom: "-4px",
                        width: "40px",
                        height: "40px",
                        background: "radial-gradient(circle at 0% 0%, transparent 60%, rgba(139, 92, 246, 0.8) 70%, rgba(139, 92, 246, 0.4) 80%, transparent 100%)",
                        filter: "blur(3px)",
                        opacity: rightGlowOpacity,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                        zIndex: 10,
                        borderBottomRightRadius: "16px",
                    }}
                />

                {navItems.map((item, index) => (
                    <NavItem key={item} label={item} index={index} />
                ))}
            </div>
        </motion.nav>
    );
}
