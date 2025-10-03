"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

// ---
// Proof-of-concept single file page for Next.js (App Router):
// Place this file at: app/batik/page.tsx
// Then run: npm i gsap
// Start dev: npm run dev and open /batik
// ---

// Lightweight, inline SVGs to mimic decorative batik swirls/leaves
const Leaf = ({ className = "", opacity = 1 }) => (
    <svg
        className={className}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
    >
        <path
            d="M15 65c30-40 70-50 90-45-20 15-45 30-60 55 20-5 40-3 60 8-30 10-70 6-90-18z"
            fill="currentColor"
        />
    </svg>
);

const Swirl = ({ className = "", opacity = 1 }) => (
    <svg
        className={className}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
    >
        <path
            d="M20 100c0-44 36-80 80-80s80 36 80 80c0 22-9 42-23 56 9-13 14-28 14-44 0-40-31-72-71-72S29 72 29 112c0 28 15 52 37 65-28-10-46-38-46-77z"
            fill="currentColor"
        />
    </svg>
);

// Simple background patterns using CSS gradients (batik-inspired feel)
const patternStyles: Record<string, React.CSSProperties> = {
    parang: {
        backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 8px, transparent 8px, transparent 16px), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 40%), linear-gradient(120deg, #5b3a29, #2f1e14)",
    },
    megaMendung: {
        backgroundImage:
            "repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0 6px, transparent 6px 12px), linear-gradient(120deg, #0e3a6f, #09203f)",
    },
    kawung: {
        backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0 8px, transparent 8px 40px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.12) 0 8px, transparent 8px 40px), linear-gradient(120deg, #6d3b5d, #321a2d)",
    },
    hero: {
        backgroundImage:
            "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.12), transparent 40%), linear-gradient(120deg, #7b4b1e, #2c1202)",
    },
};

type ParallaxLayer = {
    src: string;
    opacity: number;
    width?: string;
    height?: string;
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    transform?: string;
    depth: string;
    rotate: string;
    // NEW:
    attach?: "left-top" | "left-middle" | "left-bottom"
    | "center-top" | "center-middle" | "center-bottom"
    | "right-top" | "right-middle" | "right-bottom";
    offsetX?: number; // px offset from attach point
    offsetY?: number; // px
    scaleByCard?: number; // 0.25 => 25% of card width for layer width
};

type SlideDef = {
    key: string;
    Component: React.FC;
    background: {
        image: string;
        position?: string;
        size?: string;
    };
    parallaxLayers: ParallaxLayer[];
};

function attachPoint(rect: DOMRect, attach: NonNullable<ParallaxLayer["attach"]>) {
    const map: Record<string, { x: number; y: number }> = {
        "left-top": { x: rect.left, y: rect.top },
        "left-middle": { x: rect.left, y: rect.top + rect.height / 2 },
        "left-bottom": { x: rect.left, y: rect.bottom },
        "center-top": { x: rect.left + rect.width / 2, y: rect.top },
        "center-middle": { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
        "center-bottom": { x: rect.left + rect.width / 2, y: rect.bottom },
        "right-top": { x: rect.right, y: rect.top },
        "right-middle": { x: rect.right, y: rect.top + rect.height / 2 },
        "right-bottom": { x: rect.right, y: rect.bottom },
    };
    return map[attach];
}

function layoutParallaxToCard(opts: {
    containerEl: HTMLElement;      // containerRef.current
    decoEl: HTMLElement;           // decoRef.current
    slideRoot: HTMLElement;        // current slide element (slide-enter)
    layers: NodeListOf<HTMLElement>;
    def: SlideDef;                 // current slide definition
}) {
    const { containerEl, decoEl, slideRoot, layers, def } = opts;
    const containerRect = containerEl.getBoundingClientRect();
    const card = slideRoot.querySelector(".batik-card") as HTMLElement | null;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();

    layers.forEach((node, i) => {
        const layerDef = def.parallaxLayers[i];
        if (!layerDef) return;

        // If the layer declares an anchor, compute its absolute x/y in the container
        if (layerDef.attach) {
            const ap = attachPoint(cardRect, layerDef.attach);
            const xInContainer = ap.x - containerRect.left + (layerDef.offsetX || 0);
            const yInContainer = ap.y - containerRect.top + (layerDef.offsetY || 0);

            // Responsive scale: set width based on card width (keep natural aspect)
            if (layerDef.scaleByCard) {
                const w = Math.max(220, Math.min(cardRect.width * layerDef.scaleByCard, 900)); // clamp
                node.style.width = `${w}px`;
                node.style.height = "auto";
            }

            // Place the layer so its center sits on the anchor (use x/y + -50% translate)
            gsap.set(node, {
                position: "absolute",
                left: 0,
                top: 0,
                x: xInContainer,
                y: yInContainer,
                xPercent: -50,
                yPercent: -50,
            });
        } else {
            // Fallback to whatever inline left/top you already set in your style
        }
    });
}


const SlideParang: React.FC = () => (
    <div
        className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 rounded-2xl shadow-2xl sm:grid-cols-2 border border-white/10"
        style={{ ...(patternStyles.parang as React.CSSProperties) }}
    >
        <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10">
            <h2 className="batik-title mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Batik Parang
            </h2>
            <p className="batik-subtitle mb-4 text-sm uppercase tracking-widest text-white/80">
                Yogyakarta & Surakarta • Jawa Tengah
            </p>
            <p className="batik-subtitle mb-4 text-sm uppercase tracking-widest text-white/80">
                Kekuatan & Keberlanjutan
            </p>
            <p className="batik-body leading-relaxed text-white/90">
                Parang melambangkan keteguhan hati dan kontinuitas. Garis diagonal berulang menyerupai ombak samudra yang tak henti.
            </p>
            <p className="mt-6 text-xs text-white/60">*Deskripsi ringkas—konten placeholder untuk POC.</p>
        </div>
        <div className="relative h-64 sm:h-full">
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 12px)",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
            </div>
        </div>
    </div>
);

const SlideMegaMendung: React.FC = () => (
    <div
        className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
        style={{ ...(patternStyles.megaMendung as React.CSSProperties) }}
    >
        <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10">
            <h2 className="batik-title mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Batik Mega Mendung
            </h2>
            <p className="batik-subtitle mb-4 text-sm uppercase tracking-widest text-white/80">
                Ketenangan & kesejukan
            </p>
            <p className="batik-body leading-relaxed text-white/90">
                Awan bertumpuk dari Cirebon ini melambangkan kesabaran dan keteduhan. Lengkungannya menenangkan pandangan.
            </p>
            <p className="mt-6 text-xs text-white/60">*Deskripsi ringkas—konten placeholder untuk POC.</p>
        </div>
        <div className="relative h-64 sm:h-full">
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 12px)",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
            </div>
        </div>
    </div>
);

const SlideKawung: React.FC = () => (
    <div
        className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
        style={{ ...(patternStyles.kawung as React.CSSProperties) }}
    >
        <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10">
            <h2 className="batik-title mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Batik Kawung
            </h2>
            <p className="batik-subtitle mb-4 text-sm uppercase tracking-widest text-white/80">
                Kesucian & keadilan
            </p>
            <p className="batik-body leading-relaxed text-white/90">
                Motif elips seperti buah aren tersusun simetris, merepresentasikan keadilan dan kesederhanaan yang anggun.
            </p>
            <p className="mt-6 text-xs text-white/60">*Deskripsi ringkas—konten placeholder untuk POC.</p>
        </div>
        <div className="relative h-64 sm:h-full">
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 12px)",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
            </div>
        </div>
    </div>
);

const SlideHero: React.FC = () => (
    <div
        className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
        style={{ ...(patternStyles.hero as React.CSSProperties) }}
    >
        <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10">
            <h2 className="batik-title mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Selamat Hari Batik Nasional 2025
            </h2>
            <p className="batik-subtitle mb-4 text-sm uppercase tracking-widest text-white/80">
                2 Oktober 2025
            </p>
            <p className="batik-body leading-relaxed text-white/90">
                Rayakan warisan wastra Indonesia. Cinta batik, bangga berkarya.
            </p>
            <div className="mt-6 text-sm text-white/80">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1">#HariBatikNasional</span>
            </div>
        </div>
        <div className="relative h-64 sm:h-full">
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 12px)",
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
            </div>
        </div>
    </div>
);

const slides: SlideDef[] = [
    {
        key: "parang",
        Component: SlideParang,
        background: {
            image: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
            position: "center",
            size: "cover",
        },
        parallaxLayers: [
            {
                src: "/assets/parang/component1.svg",
                opacity: 0.95,
                depth: "0.25",
                rotate: "320",
                // anchor to card:
                attach: "left-middle",
                offsetX: -60,      // push left outside the card
                offsetY: 0,
                scaleByCard: 0.55, // layer width = 55% of card width (responsive)
            },
        ],
    },
    {
        key: "megaMendung",
        Component: SlideMegaMendung,
        background: {
            image: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
            position: "center",
            size: "cover",
        },
        parallaxLayers: [
            {
                src: "/assets/parang/component2.svg",
                opacity: 0.85,
                width: "45vw",
                height: "45vw",
                right: "-5vw",      // Position from right side
                top: "5vh",
                depth: "0.3",
                rotate: "45",
            },
        ],
    },
    {
        key: "kawung",
        Component: SlideKawung,
        background: {
            image: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
            position: "center",
            size: "cover",
        },
        parallaxLayers: [
            {
                src: "/assets/component3.svg",
                opacity: 0.8,
                width: "48vw",
                height: "48vw",
                left: "50%",        // Center horizontally
                top: "50%",         // Center vertically
                transform: "translate(-50%, -50%)", // Offset by half to truly center
                depth: "0.25",
                rotate: "180",
            },
        ],
    },
    {
        key: "hero",
        Component: SlideHero,
        background: {
            image: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
            position: "center",
            size: "cover",
        },
        parallaxLayers: [
            {
                src: "/assets/component4.svg",
                opacity: 0.75,
                width: "52vw",
                height: "52vw",
                left: "2vw",
                bottom: "5vh",      // Position from bottom instead of top
                depth: "0.15",
                rotate: "270",
            },
        ],
    },
];

export default function BatikPOCPage() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const decoRef = useRef<HTMLDivElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const cursor = useRef({ x: 0.5, y: 0.5 });

    const go = (dir: 1 | -1) => {
        const next = (index + dir + slides.length) % slides.length;
        animateSlideChange(index, next, dir);
        setIndex(next);
    };

    useEffect(() => {
        const el = containerRef.current;
        const deco = decoRef.current;
        if (!el || !deco) return;

        const doLayout = () => {
            const slideRoot = slideRefs.current[index];
            if (!slideRoot) return;
            const layers = deco.querySelectorAll<HTMLElement>("[data-layer]");
            layoutParallaxToCard({
                containerEl: el,
                decoEl: deco,
                slideRoot,
                layers,
                def: slides[index],
            });
        };

        // initial
        requestAnimationFrame(doLayout);

        // on resize (viewport changes)
        const ro = new ResizeObserver(doLayout);
        ro.observe(el);
        // observe the current card as well for grid/layout changes
        const currentCard = slideRefs.current[index]?.querySelector(".batik-card") as HTMLElement | null;
        if (currentCard) ro.observe(currentCard);

        // also update on window resize just in case
        const onWinResize = () => doLayout();
        window.addEventListener("resize", onWinResize);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", onWinResize);
        };
    }, [index]); // re-run when slide changes


    // Enter animations for first render
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ensure any data-rotate is applied before other animations, preserving existing transforms
            const rotateNodes = decoRef.current?.querySelectorAll<HTMLElement>("[data-rotate]") || [];
            rotateNodes.forEach((node, idx) => {
                const deg = parseFloat(node.dataset.rotate || "0");
                const layer = currentSlide.parallaxLayers[idx];
                // Combine rotation with existing transform (e.g., translate for centering)
                const baseTransform = layer?.transform || "";
                gsap.set(node, {
                    rotate: deg,
                    transformOrigin: "center center",
                    // Preserve any existing transform like translate
                    ...(baseTransform && { transform: `${baseTransform} rotate(${deg}deg)` })
                });
            });
            gsap.from(".slide-enter .batik-card", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
            gsap.from(".slide-enter .batik-title", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                delay: 0.15,
                ease: "power3.out",
            });
            gsap.from(".slide-enter .batik-subtitle, .slide-enter .batik-body", {
                y: 10,
                opacity: 0,
                duration: 0.6,
                delay: 0.25,
                stagger: 0.08,
                ease: "power3.out",
            });
            gsap.from(".decor > *", {
                duration: 1.2,
                opacity: 0,
                y: 30,
                stagger: 0.08,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse-based parallax on layered decorations
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            cursor.current = { x, y };
            // Move children by data-depth
            const nodes = decoRef.current?.querySelectorAll<HTMLElement>("[data-depth]") || [];
            nodes.forEach((node) => {
                const depth = parseFloat(node.dataset.depth || "0");
                const mx = (x - 0.5) * depth * 40; // range ~[-20, 20] * depth
                const my = (y - 0.5) * depth * 40;
                gsap.to(node, { x: mx, y: my, duration: 0.6, ease: "power2.out" });
            });
        };

        el.addEventListener("mousemove", onMove);
        return () => el.removeEventListener("mousemove", onMove);
    }, []);

    const animateSlideChange = (fromIdx: number, toIdx: number, dir: 1 | -1) => {
        const fromSlide = slideRefs.current[fromIdx];
        const toSlide = slideRefs.current[toIdx];
        if (!fromSlide || !toSlide) return;

        const fromContent = fromSlide.querySelector(".batik-card");
        const toContent = toSlide.querySelector(".batik-card");

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        // Animate background transition
        if (backgroundRef.current) {
            const toBackground = slides[toIdx].background;
            tl.to(backgroundRef.current, {
                opacity: 0,
                duration: 0.4,
            }, 0)
                .call(() => {
                    if (backgroundRef.current) {
                        backgroundRef.current.style.backgroundImage = toBackground.image;
                        backgroundRef.current.style.backgroundPosition = toBackground.position || "center";
                        backgroundRef.current.style.backgroundSize = toBackground.size || "cover";
                    }
                })
                .to(backgroundRef.current, {
                    opacity: 1,
                    duration: 0.4,
                });
        }

        // Animate parallax layers transition
        const parallaxNodes = decoRef.current?.querySelectorAll<HTMLElement>("[data-layer]") || [];
        tl.to(parallaxNodes, {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
        }, 0);

        tl.to(fromSlide, { xPercent: -dir * 20, opacity: 0, duration: 0.5 }, 0)
            .fromTo(
                toSlide,
                { xPercent: dir * 20, opacity: 0 },
                { xPercent: 0, opacity: 1, duration: 0.6 },
                0.1
            )
            .from(
                toContent,
                { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
                "+=0.0"
            );
    };

    // Animate parallax layers when slide changes
    useEffect(() => {
        const parallaxNodes = decoRef.current?.querySelectorAll<HTMLElement>("[data-layer]") || [];
        if (parallaxNodes.length > 0) {
            // Set initial rotation and transforms
            parallaxNodes.forEach((node, idx) => {
                const deg = parseFloat(node.dataset.rotate || "0");
                const layer = currentSlide.parallaxLayers[idx];
                const baseTransform = layer?.transform || "";

                gsap.set(node, {
                    rotate: deg,
                    transformOrigin: "center center",
                    ...(baseTransform && { transform: `${baseTransform} rotate(${deg}deg)` })
                });
            });

            // Animate in
            gsap.fromTo(
                parallaxNodes,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: (i, target) => {
                        const layer = currentSlide.parallaxLayers[i];
                        return layer ? layer.opacity : 1;
                    },
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                }
            );
        }
    }, [index]);

    // Keyboard arrows for quick testing
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [index]);

    const currentSlide = slides[index];

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden text-white relative"
        >
            <div
                ref={backgroundRef}
                className="absolute inset-0"
                style={{
                    backgroundImage: currentSlide.background.image,
                    backgroundSize: currentSlide.background.size || "cover",
                    backgroundPosition: currentSlide.background.position || "center",
                    visibility: "visible",
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/10" style={{
                backdropFilter: "blur(2px)",
            }} />
            {/* Decorative parallax layers */}

            <div ref={decoRef} className="decor pointer-events-none absolute inset-0">
                {currentSlide.parallaxLayers.map((layer, idx) => (
                    <img
                        key={`${currentSlide.key}-layer-${idx}`}
                        src={layer.src}
                        alt=""
                        className="absolute"
                        style={{
                            opacity: layer.opacity,
                            width: layer.width,
                            height: layer.height,
                            maxWidth: "800px",  // Prevent it from being too large on huge screens
                            maxHeight: "800px",
                            minWidth: "300px",  // Ensure visibility on small screens
                            minHeight: "300px",
                            position: "absolute",
                            ...(layer.left !== undefined && { left: layer.left }),
                            ...(layer.top !== undefined && { top: layer.top }),
                            ...(layer.right !== undefined && { right: layer.right }),
                            ...(layer.bottom !== undefined && { bottom: layer.bottom }),
                            ...(layer.transform && { transform: layer.transform }),
                        }}
                        data-depth={layer.depth}
                        data-rotate={layer.rotate}
                        data-layer="true"
                    />
                ))}
            </div>
            {/* Carousel */}
            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
                {slides.map((s, i) => (
                    <div
                        key={s.key}
                        ref={(el) => { slideRefs.current[i] = el }}
                        className={`absolute inset-x-0 mx-auto transition-opacity ${i === index ? "slide-enter" : "pointer-events-none"
                            }`}
                        style={{
                            opacity: i === index ? 1 : 0,
                        }}
                    >
                        <s.Component />
                    </div>
                ))}

                {/* Controls */}
                <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                    <div className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-2 backdrop-blur-sm">
                        <button
                            onClick={() => go(-1)}
                            className="rounded-full px-3 py-1 text-sm hover:bg-white/10"
                            aria-label="Previous"
                        >
                            ◀
                        </button>
                        <div className="flex items-center gap-1">
                            {slides.map((_, i) => (
                                <span
                                    key={i}
                                    onClick={() => {
                                        if (i !== index) {
                                            const dir = i > index ? 1 : -1;
                                            animateSlideChange(index, i, dir);
                                            setIndex(i);
                                        }
                                    }}
                                    className={`h-2 w-2 cursor-pointer rounded-full ${index === i ? "bg-white" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => go(1)}
                            className="rounded-full px-3 py-1 text-sm hover:bg-white/10"
                            aria-label="Next"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            </div>

            {/* Page title overlay */}
            <div className="pointer-events-none absolute left-0 right-0 top-6 mx-auto w-full max-w-6xl px-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm tracking-widest text-white/70">Batik Showcase • POC</div>
                    <div className="text-xs text-white/60">Next.js × GSAP × Parallax</div>
                </div>
            </div>
        </div>
    );
}
