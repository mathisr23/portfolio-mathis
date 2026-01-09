"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative min-h-[100vh] flex flex-col items-center justify-center px-6">
            {/* Gradient background: black to dark purple */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(180deg, #0a0a0b 0%, #0a0a0b 60%, #1a0a2e 85%, #2d1b4e 100%)",
                }}
            />

            {/* Purple glow accent */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] z-[1] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Catchy headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[clamp(2.5rem,8vw,5rem)] font-serif leading-[1.1] tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    Let's build something
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                        extraordinary
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="mt-6 text-white/60 text-lg max-w-2xl mx-auto"
                >
                    Have a project in mind? I'd love to hear about it. Let's create something amazing together.
                </motion.p>

                {/* Animated Get in touch button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="mt-12"
                >
                    <motion.a
                        href="/contact"
                        className="group relative inline-flex items-center gap-3 px-12 py-6 text-lg font-medium text-white rounded-2xl overflow-hidden hoverable"
                        whileHover={{
                            scale: 1.05,
                            rotateX: -5,
                            rotateY: 5,
                            z: 50,
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                            background: "rgba(139, 92, 246, 0.15)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                        }}
                    >
                        {/* Animated glow border */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)",
                                backgroundSize: "200% 100%",
                            }}
                            animate={{
                                backgroundPosition: ["200% 0%", "-200% 0%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Inner glass layer */}
                        <div
                            className="absolute inset-[1px] rounded-2xl z-[1]"
                            style={{
                                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(30, 20, 50, 0.8) 100%)",
                            }}
                        />

                        {/* Shine sweep animation */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]"
                            initial={{ x: "-100%" }}
                            animate={{ x: ["−100%", "200%"] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                            }}
                        />

                        <span className="relative z-10 drop-shadow-lg">Get in touch</span>

                        {/* Arrow icon with animation */}
                        <motion.svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <path
                                d="M4 10H16M16 10L11 5M16 10L11 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>

                        {/* Hover glow effect */}
                        <motion.div
                            className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                            style={{
                                background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                                filter: "blur(20px)",
                            }}
                        />
                    </motion.a>
                </motion.div>
            </div>

            {/* Disclaimer */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-16 text-white/30 text-xs max-w-md text-center px-6 font-light"
            >
                Please note that these deployed projects are initial versions. <br className="hidden sm:block" />
                If you encounter any issues, I would appreciate your feedback to help refine them.
            </motion.p>

            {/* Bottom copyright */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-6 text-white/20 text-xs"
            >
                © 2026 Mathis Portfolio. All rights reserved.
            </motion.div>
        </footer>
    );
}
