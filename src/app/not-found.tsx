"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0b] text-white overflow-hidden">
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: "url('/noise.png')", // fallback or generated noise
                        opacity: 0.1,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10"
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p className="text-xl md:text-2xl text-purple-400 mb-8 font-mono">
                        Reality_Not_Found
                    </p>

                    <p className="text-white/40 mb-12 max-w-md mx-auto">
                        The page you are looking for has been lost in the digital void.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                        <span className="text-sm font-medium">Return to Base</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Grid */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
        </div>
    );
}
