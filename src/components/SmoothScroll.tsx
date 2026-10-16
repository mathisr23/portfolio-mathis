"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Smooth-scroll to a page offset, falling back to native scrolling */
export function scrollToY(y: number) {
    if (instance) instance.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
}

/** A reload starts from the top of the page instead of wherever the browser left it */
function resetOnReload() {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav?.type !== "reload") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
}

export default function SmoothScroll() {
    useEffect(() => {
        resetOnReload();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        instance = lenis;

        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            instance = null;
        };
    }, []);

    return null;
}
