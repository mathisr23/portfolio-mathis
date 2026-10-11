"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
attribute float aSize;
attribute float aEnergy;
attribute float aAlpha;
uniform float uPixelRatio;
varying float vEnergy;
varying float vAlpha;

void main(){
  vEnergy = aEnergy;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uPixelRatio * (1.0 + aEnergy * 0.8);
}
`;

const fragmentShader = /* glsl */ `
uniform float uOpacity;
varying float vEnergy;
varying float vAlpha;

void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.15, d);
  // Snow at rest, ink while being pushed around
  vec3 snow = vec3(0.98, 0.98, 0.98);
  vec3 ink = vec3(0.05, 0.055, 0.07);
  vec3 col = mix(snow, ink, clamp(vEnergy * 1.6, 0.0, 1.0));
  gl_FragColor = vec4(col, soft * vAlpha * uOpacity);
}
`;

interface Props {
    /** The h1 whose `[data-hero-line]` children are turned into particles */
    targetRef: RefObject<HTMLElement | null>;
    /** Wait for the text reveal to finish before taking over */
    startDelay: number;
    onReady: () => void;
}

interface Field {
    count: number;
    home: Float32Array;
    pos: Float32Array;
    vel: Float32Array;
    drift: Float32Array;
}

/** Rasterise each line of the heading exactly where the DOM draws it, then sample its pixels. */
function sampleHeading(heading: HTMLElement, host: DOMRect, maxCount: number): Float32Array {
    const style = getComputedStyle(heading);
    const fontSize = parseFloat(style.fontSize);
    // Canvas only takes width as a keyword, so map the CSS percentage onto the nearest one
    const stretchPct = parseFloat(style.fontStretch) || 100;
    const stretches: [number, CanvasFontStretch][] = [
        [50, "ultra-condensed"], [62.5, "extra-condensed"], [75, "condensed"], [87.5, "semi-condensed"],
        [100, "normal"], [112.5, "semi-expanded"], [125, "expanded"], [150, "extra-expanded"], [200, "ultra-expanded"],
    ];
    const stretch = stretches.reduce((a, b) => (Math.abs(b[0] - stretchPct) < Math.abs(a[0] - stretchPct) ? b : a))[1];
    const font = `${style.fontStyle} ${style.fontWeight} ${stretch} ${fontSize}px ${style.fontFamily}`;
    const letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(host.width);
    canvas.height = Math.ceil(host.height);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return new Float32Array();

    ctx.font = font;
    if ("fontStretch" in ctx) ctx.fontStretch = stretch;
    if ("letterSpacing" in ctx) ctx.letterSpacing = letterSpacing;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";

    heading.querySelectorAll<HTMLElement>("[data-hero-line]").forEach((wrapper) => {
        const line = wrapper.firstElementChild as HTMLElement | null;
        if (!line) return;
        // Measure the untransformed wrapper so the reveal animation can't skew the result
        const box = wrapper.getBoundingClientRect();
        const ws = getComputedStyle(wrapper);
        const ls = getComputedStyle(line);
        const lineTop = box.top - host.top + parseFloat(ws.paddingTop);
        const lineHeight = parseFloat(ls.lineHeight) || fontSize;
        const m = ctx.measureText(line.textContent ?? "");
        const ascent = m.fontBoundingBoxAscent;
        const descent = m.fontBoundingBoxDescent;
        // CSS centres the font's content area inside the line box
        const baseline = lineTop + (lineHeight - (ascent + descent)) / 2 + ascent;
        const x = box.left - host.left + parseFloat(ls.paddingLeft);
        ctx.fillText(line.textContent ?? "", x, baseline);
    });

    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let filled = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
    const step = Math.max(1, Math.ceil(Math.sqrt(filled / maxCount)));

    const points: number[] = [];
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            if (data[(y * width + x) * 4 + 3] > 128) {
                points.push(x + (Math.random() - 0.5) * step, y + (Math.random() - 0.5) * step);
            }
        }
    }
    return new Float32Array(points);
}

export default function HeroParticles({ targetRef, startDelay, onReady }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const heading = targetRef.current;
        if (!container || !heading) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        } catch {
            return; // No WebGL — the DOM heading simply stays visible
        }
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.opacity = "0";
        renderer.domElement.style.transition = "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -1, 1); // pixel space, y down
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            uniforms: { uPixelRatio: { value: pixelRatio }, uOpacity: { value: 1 } },
        });
        const points = new THREE.Points(geometry, material);
        points.frustumCulled = false;
        scene.add(points);

        let field: Field | null = null;
        let energy = new Float32Array();
        let alpha = new Float32Array();
        const pointer = { x: -9999, y: -9999, active: false };
        let disposed = false;

        const build = () => {
            const host = container.getBoundingClientRect();
            renderer.setSize(host.width, host.height, false);
            camera.right = host.width;
            camera.bottom = host.height;
            camera.updateProjectionMatrix();

            const maxCount = host.width < 768 ? 6000 : 16000;
            const home = sampleHeading(heading, host, maxCount);
            const count = home.length / 2;
            const pos = new Float32Array(count * 3);
            const drift = new Float32Array(count * 2);
            for (let i = 0; i < count; i++) {
                pos[i * 3] = home[i * 2];
                pos[i * 3 + 1] = home[i * 2 + 1];
                // Scroll scatter: mostly upward and outward, each particle its own way
                const a = Math.random() * Math.PI * 2;
                const r = 0.4 + Math.random();
                drift[i * 2] = Math.cos(a) * r;
                drift[i * 2 + 1] = Math.sin(a) * r - 0.6;
            }
            const sizes = new Float32Array(count);
            const scale = host.width < 768 ? 0.75 : 1;
            for (let i = 0; i < count; i++) sizes[i] = (1.1 + Math.random() * 1.3) * scale;
            energy = new Float32Array(count);
            alpha = new Float32Array(count).fill(1);

            geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute("aEnergy", new THREE.BufferAttribute(energy, 1));
            geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
            field = { count, home, pos, vel: new Float32Array(count * 2), drift };
        };

        const onPointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
            pointer.active = true;
        };
        const onPointerLeave = () => {
            pointer.active = false;
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("pointerleave", onPointerLeave);

        const RADIUS = 120;
        const step = () => {
            if (!field) return;
            const { count, home, pos, vel, drift } = field;
            const scroll = Math.min(window.scrollY / (container.clientHeight * 0.75), 1);
            const scatter = scroll * scroll * 420;
            const fade = 1 - scroll;

            for (let i = 0; i < count; i++) {
                const ix = i * 3;
                const iv = i * 2;
                const tx = home[iv] + drift[iv] * scatter;
                const ty = home[iv + 1] + drift[iv + 1] * scatter;
                let vx = vel[iv] + (tx - pos[ix]) * 0.055;
                let vy = vel[iv + 1] + (ty - pos[ix + 1]) * 0.055;

                if (pointer.active) {
                    const dx = pos[ix] - pointer.x;
                    const dy = pos[ix + 1] - pointer.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < RADIUS * RADIUS && d2 > 0.01) {
                        const d = Math.sqrt(d2);
                        const f = (1 - d / RADIUS) ** 2 * 7;
                        vx += (dx / d) * f;
                        vy += (dy / d) * f;
                    }
                }

                vx *= 0.84;
                vy *= 0.84;
                vel[iv] = vx;
                vel[iv + 1] = vy;
                pos[ix] += vx;
                pos[ix + 1] += vy;

                const speed = Math.min(Math.sqrt(vx * vx + vy * vy) / 6, 1);
                energy[i] += (speed - energy[i]) * 0.12;
                alpha[i] = fade;
            }
            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.aEnergy.needsUpdate = true;
            geometry.attributes.aAlpha.needsUpdate = true;
        };

        let raf = 0;
        let visible = true;
        const loop = () => {
            raf = 0;
            if (!visible || document.hidden || disposed) return;
            step();
            renderer.render(scene, camera);
            raf = requestAnimationFrame(loop);
        };
        const start = () => {
            if (!raf && field) raf = requestAnimationFrame(loop);
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
        });
        io.observe(container);
        const onVisibility = () => !document.hidden && start();
        document.addEventListener("visibilitychange", onVisibility);

        // Rebuild when the layout changes (debounced)
        let resizeTimer = 0;
        let lastWidth = container.clientWidth;
        const ro = new ResizeObserver(() => {
            // Ignore height-only changes from mobile browser toolbars
            if (!field || container.clientWidth === lastWidth) return;
            lastWidth = container.clientWidth;
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(build, 200);
        });
        ro.observe(container);

        // Take over from the DOM text once fonts are loaded and the reveal has finished
        const timer = window.setTimeout(async () => {
            await document.fonts.ready;
            if (disposed) return;
            build();
            if (!field || field.count === 0) return;
            renderer.render(scene, camera);
            renderer.domElement.style.opacity = "1";
            onReady();
            // A small kick so the name visibly comes alive
            for (let i = 0; i < field.vel.length; i++) field.vel[i] = (Math.random() - 0.5) * 2.5;
            start();
        }, startDelay);

        return () => {
            disposed = true;
            window.clearTimeout(timer);
            window.clearTimeout(resizeTimer);
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerleave", onPointerLeave);
            document.removeEventListener("visibilitychange", onVisibility);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, [targetRef, startDelay, onReady]);

    return <div ref={containerRef} className="absolute inset-0 [&>canvas]:w-full [&>canvas]:h-full" />;
}
