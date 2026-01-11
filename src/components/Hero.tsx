"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const scrollToWork = () => {
        const workSection = document.getElementById("work");
        if (workSection) {
            workSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/purple-background-hero.jpg"
                    alt="Hero Background"
                    fill
                    priority
                    quality={90}
                    className="object-cover"
                />
            </div>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-black/30" />

            {/* Fade to black at bottom for smooth transition */}
            <div
                className="absolute bottom-0 left-0 w-full h-[100%] z-[2] pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(10, 10, 11, 0.7) 60%, #0a0a0b 100%)",
                }}
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                className="text-center relative z-10"
            >
                <h1
                    className="text-[clamp(3rem,12vw,10rem)] font-serif leading-[0.9] tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    All Work
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-6 text-white/70 text-lg tracking-wide"
                >
                    Selected Projects & Experiments
                </motion.p>

                {/* Scroll to Work Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    onClick={scrollToWork}
                    className="mt-12 flex flex-col items-center gap-3 mx-auto hoverable group"
                >
                    <span className="text-white/60 text-sm tracking-widest uppercase group-hover:text-white/90 transition-colors">
                        View Projects
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 group-hover:border-white/60 transition-colors"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"
                        />
                    </motion.div>
                </motion.button>
            </motion.div>
        </section>
    );
}
