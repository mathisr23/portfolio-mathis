"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import StretchText from "@/components/StretchText";

export default function NotFound() {
    const { t, href } = useLanguage();

    return (
        <main id="main-content" className="min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pb-12">
            <Navbar />
            <motion.h1
                initial="rest"
                animate="rest"
                whileHover="hover"
                className="font-extrabold leading-[0.8] tracking-[-0.04em] text-[length:clamp(8rem,38vw,34rem)]"
            >
                <StretchText from={60} to={150}>
                    404
                </StretchText>
            </motion.h1>
            <div className="mt-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
                <p className="text-2xl max-w-[30ch]">{t.notFound.text}</p>
                <Link href={href("/")} className="font-display text-xl link-line self-start">
                    {t.notFound.back}
                </Link>
            </div>
        </main>
    );
}
