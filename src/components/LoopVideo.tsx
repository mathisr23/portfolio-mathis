"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface Props {
    poster: string;
    /** Base path without extension; .webm and .mp4 are expected next to each other */
    video?: string;
    /** Play only while true; nothing is downloaded until the first time it is */
    playing: boolean;
    sizes: string;
    priority?: boolean;
    alt?: string;
}

/**
 * A muted loop drawn over its own first frame. The poster is a regular optimised image,
 * so the frame is never blank; the video fades in once it is actually playing.
 */
export default function LoopVideo({ poster, video, playing, sizes, priority, alt = "" }: Props) {
    const ref = useRef<HTMLVideoElement>(null);
    const reduce = useReducedMotion();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (playing) {
            // play() also starts the download, so nothing loads before the first play
            el.play().catch(() => {
                // Autoplay refused (e.g. data saver): the poster stays
            });
        } else {
            el.pause();
        }
    }, [playing]);

    return (
        <>
            <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
            {video && !reduce && (
                <video
                    ref={ref}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    onPlaying={() => setVisible(true)}
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
                        visible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <source src={`${video}.webm`} type="video/webm" />
                    <source src={`${video}.mp4`} type="video/mp4" />
                </video>
            )}
        </>
    );
}
