"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Display text whose width axis stretches while hovered or focused.
 * Use inside a link/button that has the `group` class.
 */
export default function StretchText({
    children,
    from = 100,
    to = 150,
    className = "",
}: {
    children: React.ReactNode;
    from?: number;
    to?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();
    return (
        <motion.span
            className={`font-display inline-block ${className}`}
            initial={false}
            variants={{
                rest: { fontVariationSettings: `"wdth" ${from}` },
                hover: { fontVariationSettings: `"wdth" ${reduce ? from : to}` },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.span>
    );
}
