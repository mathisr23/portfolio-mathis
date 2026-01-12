"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "fr" : "en");
    };

    return (
        <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full hoverable"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: isHovered
                    ? "0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                transition: "box-shadow 0.3s ease",
            }}
        >
            {/* Purple glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-full -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                    filter: "blur(10px)",
                }}
            />

            {/* Language options */}
            <motion.span
                animate={{
                    opacity: language === "en" ? 1 : 0.4,
                    scale: language === "en" ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
                style={{
                    color: language === "en" ? "rgba(139, 92, 246, 1)" : "rgba(255, 255, 255, 0.6)",
                }}
            >
                EN
            </motion.span>

            {/* Divider */}
            <div className="w-px h-4 bg-white/20" />

            <motion.span
                animate={{
                    opacity: language === "fr" ? 1 : 0.4,
                    scale: language === "fr" ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
                style={{
                    color: language === "fr" ? "rgba(139, 92, 246, 1)" : "rgba(255, 255, 255, 0.6)",
                }}
            >
                FR
            </motion.span>
        </motion.button>
    );
}
