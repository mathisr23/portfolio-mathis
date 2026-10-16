"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
    animate,
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useInView,
    type MotionValue,
} from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { reel, type ReelItem } from "@/data/projects";
import { scrollToY } from "@/components/SmoothScroll";
import LoopVideo from "@/components/LoopVideo";
import { markFrame } from "@/lib/frame-transition";

const ease = [0.22, 1, 0.36, 1] as const;
const count = reel.length;
/** Scroll distance per project, in svh: long enough to feel each frame, short enough to skim */
const STEP_SVH = 70;

type T = ReturnType<typeof useLanguage>["t"];

/** Everything the reel needs to show for one project, whatever its type */
function describe(item: ReelItem, t: T, language: "en" | "fr", href: (p: string) => string) {
    if (item.type === "featured") {
        const p = item.project;
        return {
            title: p.title,
            image: p.cover,
            video: p.video,
            meta: `${t.work.kinds[p.kind]}, ${p.year}`,
            description: p.tagline[language],
            cta: t.reel.caseStudy,
            to: href(`/work/${p.slug}`),
            external: false,
            slug: p.slug as string | undefined,
        };
    }
    const p = item.project;
    return {
        title: p.title,
        image: p.image,
        video: p.video,
        meta: p.label[language],
        description: p.description[language],
        cta: t.reel.openSite,
        to: p.link,
        external: true,
        slug: undefined,
    };
}

type Info = ReturnType<typeof describe>;


/** Size giant titles by their length so the longest one still fits the frame width */
const titleSize = (title: string, max: string) =>
    `min(${max}, calc((100vw - 4rem) / ${Math.max(title.length, 6) * 0.98}))`;

/**
 * Link to a project. For case studies, the frame (`frame`, or the link itself) is named
 * at click time so it morphs into the case study cover.
 */
function ProjectLink({
    info,
    className,
    children,
    frame,
}: {
    info: Info;
    className?: string;
    children: React.ReactNode;
    frame?: RefObject<HTMLElement | null>;
}) {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        track("Project Clicked", { title: info.title });
        if (!info.external) markFrame(frame ? frame.current : e.currentTarget);
    };
    if (info.external) {
        return (
            <a href={info.to} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
                {children}
            </a>
        );
    }
    return (
        <Link href={info.to} onClick={onClick} className={className}>
            {children}
        </Link>
    );
}

export default function Reel() {
    const { t, language, href } = useLanguage();
    const reduce = useReducedMotion() ?? false;
    const items = reel.map((item) => describe(item, t, language, href));

    return (
        <section id="work" aria-labelledby="work-heading" className="relative">
            <h2 id="work-heading" className="sr-only">
                {t.work.heading}
            </h2>
            <DesktopReel items={items} reduce={reduce} />
            <MobileReel items={items} reduce={reduce} />
        </section>
    );
}

function DesktopReel({ items, reduce }: { items: Info[]; reduce: boolean }) {
    const { t } = useLanguage();
    const stageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const { scrollYProgress, scrollY } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
        setIndex((prev) => (prev === next ? prev : next));
    });

    // Fast scrolling squeezes the title; it relaxes back to full width when you stop
    const velocity = useSpring(useVelocity(scrollY), { stiffness: 180, damping: 40 });
    const width = useTransform(velocity, (v) => {
        const amount = reduce ? 0 : Math.min(Math.abs(v) / 2600, 1);
        return `"wdth" ${125 - amount * 70}`;
    });
    const progress = useTransform(scrollYProgress, (p) => (p * count) % 1 || (p >= 1 ? 1 : 0));

    const jump = (i: number) => {
        const el = sectionRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const travel = el.offsetHeight - window.innerHeight;
        scrollToY(top + ((i + 0.5) / count) * travel);
    };

    const info = items[index];
    const swap = { duration: reduce ? 0 : 0.9, ease };

    return (
        <div ref={sectionRef} className="hidden md:block relative" style={{ height: `${count * STEP_SVH}svh` }}>
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper px-10 pt-20 pb-8 flex flex-col">
                {/* Position in the reel */}
                <div className="flex items-baseline justify-between font-display text-sm text-grey">
                    <p aria-live="polite" className="tabular-nums">
                        <span className="text-ink">{index + 1}</span>/{count}
                    </p>
                    <div className="w-40 h-px bg-mist overflow-hidden" aria-hidden="true">
                        <motion.div className="h-full bg-ink origin-left" style={{ scaleX: progress }} />
                    </div>
                </div>

                <div className="mt-4 flex-1 min-h-0 grid grid-cols-12 gap-8">
                    {/* Frame: the next project opens through a slit over the last one,
                        and morphs into the case study cover when clicked */}
                    <ProjectLink
                        info={info}
                        frame={stageRef}
                        className="col-span-9 relative h-full min-h-0 bg-ink overflow-hidden block"
                    >
                        <span className="sr-only">{`${info.title}, ${info.cta}`}</span>
                        <div ref={stageRef} className="absolute inset-0">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={index}
                                    className="absolute inset-0"
                                    initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
                                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                                    exit={{ scale: 1.04 }}
                                    transition={swap}
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ scale: reduce ? 1 : 1.12 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: reduce ? 0 : 1.6, ease }}
                                    >
                                        <LoopVideo
                                            poster={info.image}
                                            video={info.video}
                                            playing
                                            // Same candidate as the mobile frame below 768px, so a phone downloads it once
                                            sizes="(min-width: 768px) 75vw, calc(100vw - 2.5rem)"
                                            priority={index === 0}
                                        />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                            {/* Calm, dark band where the title overlaps, so the inverted title always reads */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
                            />
                        </div>
                    </ProjectLink>

                    {/* Index of the whole reel */}
                    <nav aria-label={t.reel.index} className="col-span-3 self-center">
                        <ol className="font-display text-[0.95rem] leading-[1.9]">
                            {items.map((item, i) => (
                                <li key={item.title}>
                                    <button
                                        type="button"
                                        onClick={() => jump(i)}
                                        aria-current={i === index ? "true" : undefined}
                                        className={`group flex items-center gap-3 text-left transition-colors duration-300 ${
                                            i === index ? "text-ink" : "text-grey hover:text-ink"
                                        }`}
                                    >
                                        <span className="relative w-6 h-px" aria-hidden="true">
                                            {i === index && (
                                                <motion.span
                                                    layoutId="reel-marker"
                                                    className="absolute inset-0 bg-ink"
                                                    transition={{ duration: reduce ? 0 : 0.5, ease }}
                                                />
                                            )}
                                        </span>
                                        {item.title}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>

                {/* Title flips letter by letter, like a departure board */}
                <div className="relative -mt-[0.42em] overflow-hidden pointer-events-none" style={{ fontSize: titleSize(info.title, "11rem") }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.h3
                            key={index}
                            className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] whitespace-nowrap text-paper mix-blend-difference"
                            style={{ fontVariationSettings: width }}
                            aria-label={info.title}
                        >
                            {Array.from(info.title).map((ch, i) => (
                                <motion.span
                                    key={i}
                                    aria-hidden="true"
                                    className="inline-block"
                                    initial={reduce ? false : { y: "105%" }}
                                    animate={{ y: "0%" }}
                                    exit={reduce ? undefined : { y: "-105%" }}
                                    transition={{ duration: 0.55, ease, delay: i * 0.022 }}
                                >
                                    {ch === " " ? " " : ch}
                                </motion.span>
                            ))}
                        </motion.h3>
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={index}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-5 grid grid-cols-12 gap-8 items-baseline"
                    >
                        <p className="col-span-3 italic text-grey text-lg">{info.meta}</p>
                        <p className="col-span-6 text-xl leading-snug max-w-[46ch]">{info.description}</p>
                        <ProjectLink info={info} frame={stageRef} className="col-span-3 font-display text-base justify-self-start">
                            <span className="link-line">{info.cta}</span>
                        </ProjectLink>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/**
 * Phones get the reel sideways: native scroll-snap for the swipe, the centred card plays,
 * and swipe speed squeezes the titles like scroll speed does on desktop.
 */
function MobileReel({ items, reduce }: { items: Info[]; reduce: boolean }) {
    const { t } = useLanguage();
    const trackRef = useRef<HTMLOListElement>(null);
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [active, setActive] = useState(0);

    // The active card is the one mostly visible inside the track
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
                }
            },
            { root: track, threshold: 0.6 }
        );
        cardRefs.current.forEach((card) => card && io.observe(card));
        return () => io.disconnect();
    }, []);

    const { scrollX, scrollXProgress } = useScroll({ container: trackRef });
    const velocity = useSpring(useVelocity(scrollX), { stiffness: 180, damping: 40 });
    const width = useTransform(velocity, (v) => {
        const amount = reduce ? 0 : Math.min(Math.abs(v) / 1800, 1);
        return `"wdth" ${125 - amount * 55}`;
    });

    // One small nudge the first time the reel comes into view, to show it moves sideways
    const inView = useInView(trackRef, { once: true, amount: 0.5 });
    useEffect(() => {
        const track = trackRef.current;
        if (!inView || reduce || !track) return;
        const controls = animate(track, { x: [0, -36, 0] }, { duration: 1.1, ease, delay: 0.4 });
        return () => controls.stop();
    }, [inView, reduce]);

    const goTo = (i: number) => {
        const track = trackRef.current;
        const card = cardRefs.current[i];
        if (!track || !card) return;
        // Cards snap to the track's 1.25rem side padding
        track.scrollTo({ left: card.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <div className="md:hidden pt-14 pb-10">
            <div className="px-5 flex items-baseline justify-between font-display text-sm">
                <p aria-live="polite" className="tabular-nums text-grey">
                    <span className="text-ink">{active + 1}</span>/{count}
                </p>
                <div className="flex gap-5">
                    <button
                        type="button"
                        onClick={() => goTo(active - 1)}
                        disabled={active === 0}
                        className="link-line disabled:opacity-30"
                    >
                        {t.reel.previous}
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(active + 1)}
                        disabled={active === count - 1}
                        className="link-line disabled:opacity-30"
                    >
                        {t.reel.next}
                    </button>
                </div>
            </div>

            {/* data-lenis-prevent: smooth scroll must leave this horizontal scroller alone */}
            <ol
                ref={trackRef}
                aria-label={t.reel.index}
                data-lenis-prevent
                className="relative mt-5 flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((info, i) => (
                    <li
                        key={info.title}
                        ref={(el) => {
                            cardRefs.current[i] = el;
                        }}
                        data-index={i}
                        aria-label={`${i + 1}/${count}`}
                        className="snap-start shrink-0 w-[86%]"
                    >
                        <MobileCard info={info} active={i === active} first={i === 0} width={width} reduce={reduce} />
                    </li>
                ))}
            </ol>

            <div className="mx-5 mt-6 h-px bg-mist overflow-hidden" aria-hidden="true">
                <motion.div className="h-full bg-ink origin-left" style={{ scaleX: scrollXProgress }} />
            </div>
        </div>
    );
}

function MobileCard({
    info,
    active,
    first,
    width,
    reduce,
}: {
    info: Info;
    active: boolean;
    /** On screen at load: it is the page's largest paint, so load it eagerly */
    first: boolean;
    width: MotionValue<string>;
    reduce: boolean;
}) {
    const frameRef = useRef<HTMLDivElement>(null);

    return (
        <ProjectLink
            info={info}
            frame={frameRef}
            className={`block transition-opacity duration-500 ${active ? "opacity-100" : "opacity-45"}`}
        >
            <div ref={frameRef} className="relative aspect-[16/10] bg-ink overflow-hidden">
                <LoopVideo
                    poster={info.image}
                    video={info.video}
                    playing={active}
                    sizes="(min-width: 768px) 75vw, calc(100vw - 2.5rem)"
                    priority={first}
                />
            </div>
            <p className="mt-4 italic text-grey">{info.meta}</p>
            <motion.h3
                className="mt-1 font-display font-extrabold leading-[0.95] tracking-[-0.02em] whitespace-nowrap overflow-hidden"
                style={{
                    fontSize: `min(4.5rem, calc((86vw - 1rem) / ${Math.max(info.title.length, 6) * 0.98}))`,
                    fontVariationSettings: width,
                }}
                aria-label={info.title}
            >
                {/* Re-keyed on activation so the letters flip in each time the card arrives */}
                <span key={active ? "on" : "off"} className="block" aria-hidden="true">
                    {Array.from(info.title).map((ch, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            initial={active && !reduce ? { y: "105%" } : false}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.55, ease, delay: i * 0.022 }}
                        >
                            {ch === " " ? " " : ch}
                        </motion.span>
                    ))}
                </span>
            </motion.h3>
            <p className="mt-3 text-lg leading-snug">{info.description}</p>
            <span className="mt-3 inline-block font-display link-line">{info.cta}</span>
        </ProjectLink>
    );
}
