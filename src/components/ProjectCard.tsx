"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
    title: string;
    image: string;
    techStack: string[];
    index: number;
    link?: string;
    description?: string;
}

export default function ProjectCard({ title, image, techStack, index, link, description }: ProjectCardProps) {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        setMousePosition({ x, y });
    };

    const content = (
        <div className="aspect-[16/10] overflow-hidden rounded-xl relative">
            <motion.div
                className="w-full h-full relative"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6 }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>

            {/* Dark Gradient Overlay - Always visible at bottom for text readability, intensifies on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 0.85 : 0.7 }}
                transition={{ duration: 0.4 }}
                style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.95) 100%)",
                }}
            />

            {/* Centered Glass Pill - Appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                        scale: isHovered ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md"
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <span className="text-white font-medium text-sm tracking-wide">
                        {t.projects.viewProject}
                    </span>
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end">
                {/* Project Title */}
                <motion.h3
                    initial={{ y: 0 }}
                    animate={{ y: isHovered ? -5 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-medium text-white mb-3"
                >
                    {title}
                </motion.h3>

                {/* Tech Stack - Always visible */}
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                color: "rgba(255, 255, 255, 0.9)",
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Description - Always visible on mobile, fades in on hover for desktop */}
                {description && (
                    <motion.p
                        initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 10 }}
                        animate={{
                            opacity: isMobile || isHovered ? 1 : 0,
                            y: isMobile || isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-3 text-sm text-white/80 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 + index * 0.1 }}
            className="project-card hoverable group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.3s ease-out",
            }}
        >
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    onClick={() => track('Project Clicked', { title, link })}
                >
                    {content}
                </a>
            ) : (
                <div onClick={() => track('Project Clicked', { title, link: 'no-link' })}>
                    {content}
                </div>
            )}
        </motion.div>
    );
}
