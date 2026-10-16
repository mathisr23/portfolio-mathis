"use client";

import { useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useInView,
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

function MobileReel({ items, reduce }: { items: Info[]; reduce: boolean }) {
    return (
        <ol className="md:hidden px-5 pt-16 pb-8 flex flex-col gap-20">
            {items.map((info, i) => (
                <MobileItem key={info.title} info={info} position={i + 1} reduce={reduce} first={i === 0} />
            ))}
        </ol>
    );
}

function MobileItem({
    info,
    position,
    reduce,
    first,
}: {
    info: Info;
    position: number;
    reduce: boolean;
    /** Already on screen at load on phones: shown at once, it is the page's largest paint */
    first: boolean;
}) {
    const frameRef = useRef<HTMLDivElement>(null);
    // Only the loop that is mostly on screen plays, so a phone never runs several at once
    const playing = useInView(frameRef, { amount: 0.6 });

    return (
        <li>
            <ProjectLink info={info} frame={frameRef} className="block">
                {/* Observe the unclipped wrapper: a fully clipped element never counts as in view */}
                <motion.div
                    ref={frameRef}
                    initial={reduce || first ? false : "closed"}
                    whileInView="open"
                    viewport={{ once: true, margin: "-15%" }}
                    className="relative aspect-[16/10]"
                >
                    <motion.div
                        variants={{
                            closed: { clipPath: "inset(50% 0% 50% 0%)" },
                            open: { clipPath: "inset(0% 0% 0% 0%)" },
                        }}
                        transition={{ duration: 0.9, ease }}
                        className="absolute inset-0 bg-ink overflow-hidden"
                    >
                        <LoopVideo
                            poster={info.image}
                            video={info.video}
                            playing={playing}
                            sizes="(min-width: 768px) 75vw, calc(100vw - 2.5rem)"
                            priority={first}
                        />
                    </motion.div>
                </motion.div>
                <div className="mt-4 flex items-baseline justify-between font-display text-sm text-grey">
                    <span className="italic font-text text-base">{info.meta}</span>
                    <span className="tabular-nums">
                        {position}/{count}
                    </span>
                </div>
                <h3
                    className="mt-1 font-display font-extrabold leading-[0.95] tracking-[-0.02em] whitespace-nowrap"
                    style={{ fontSize: titleSize(info.title, "4.5rem"), fontVariationSettings: '"wdth" 125' }}
                >
                    {info.title}
                </h3>
                <p className="mt-3 text-lg leading-snug">{info.description}</p>
                <span className="mt-3 inline-block font-display link-line">{info.cta}</span>
            </ProjectLink>
        </li>
    );
}
