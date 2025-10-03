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

type SlideDef = { key: string; Component: React.FC };

const SlideParang: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-white/10 box-shadow-lg"
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
  { key: "parang", Component: SlideParang },
  { key: "megaMendung", Component: SlideMegaMendung },
  { key: "kawung", Component: SlideKawung },
  { key: "hero", Component: SlideHero },
];

export default function BatikPOCPage() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decoRef = useRef<HTMLDivElement | null>(null);
  const cursor = useRef({ x: 0.5, y: 0.5 });

  const go = (dir: 1 | -1) => {
    const next = (index + dir + slides.length) % slides.length;
    animateSlideChange(index, next, dir);
    setIndex(next);
  };

  // Enter animations for first render
  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Keyboard arrows for quick testing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle darkening + blur over background */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" style={{
        backdropFilter: "blur(2px)",
      }} />
      {/* Decorative parallax layers */}
      <div ref={decoRef} className="decor pointer-events-none absolute inset-0">
        {/* back layer */}
        <img
          src="/assets/component5.svg"
          alt=""
          className="absolute -left-10 top-16 h-40 w-40"
          style={{
            opacity: 0.9,
            width: "500px",
            height: "500px",
            position: "absolute",
            left: "-165px",
            top: "-134px",
            rotate: "100deg",
          }}
          data-depth="0.2"
        />
        <Swirl
          className="absolute right-4 top-10 h-48 w-48 text-yellow-400/20"
          opacity={0.7}
          data-depth="0.25"
        />
        {/* mid layer */}
        <Leaf
          className="absolute bottom-10 left-10 h-48 w-48 text-amber-400/25"
          opacity={0.9}
          data-depth="0.45"
        />
        <Swirl
          className="absolute bottom-16 right-16 h-56 w-56 text-sky-400/25"
          opacity={0.85}
          data-depth="0.5"
        />
        {/* front layer */}
        <Leaf
          className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 text-fuchsia-400/25"
          opacity={0.9}
          data-depth="0.8"
        />
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
              transform: i === index ? "translateX(0%)" : "translateX(10%)",
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
