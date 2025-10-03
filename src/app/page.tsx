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
  width: string; // Use vw units (e.g., "40vw") or max-width approach
  height: string; // Use vw units for aspect ratio consistency
  left?: string; // Use % or vw
  top?: string; // Use % or vh
  right?: string; // Alternative to left
  bottom?: string; // Alternative to top
  transform?: string; // For centering: "translate(-50%, -50%)"
  depth: string;
  rotate: string;
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

const SlideParang: React.FC = () => {
  const [showBackground, setShowBackground] = useState(false);

  return (
    <>
      <div
        className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 rounded-2xl shadow-2xl sm:grid-cols-2 border border-white/10 z-10"
        style={{ ...(patternStyles.parang as React.CSSProperties) }}
      >
        <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10 flex flex-col justify-between">
          {/* Header section */}
          <div>
            <div className="mb-6 border-l-4 border-white/60 pl-4">
              <h2 className="batik-title mb-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Batik Parang
              </h2>
              <div className="mt-2 h-px w-16 bg-gradient-to-r from-white/60 to-transparent"></div>
            </div>

            {/* Info grid */}
            <div className="mb-6 grid gap-4">
              <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
                  Asal
                </div>
                <div className="text-sm font-medium text-white/90">
                  Yogyakarta & Surakarta • Jawa Tengah
                </div>
              </div>

              <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
                  Filosofi
                </div>
                <div className="text-sm font-medium text-white/90">
                  Kekuatan & Keberlanjutan
                </div>
              </div>
            </div>

            {/* Description with accent */}
            <div className="relative">
              <div className="absolute -left-3 top-0 text-6xl font-serif text-white/10">
                "
              </div>
              <p className="batik-body relative z-10 leading-relaxed text-white/90 pl-6">
                Motif Parang dianggap salah satu yang tertua di Indonesia. Garis
                diagonal berulang menyerupai ombak samudra yang tak henti,
                melambangkan keteguhan hati, keberanian, dan kesinambungan
                hidup.
              </p>
            </div>
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
            <div
              className="h-72 w-72 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/50"
              style={{
                backgroundImage:
                  "url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
                backgroundSize: "300%",
                backgroundPosition: "center",
              }}
              title="Click to toggle background"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SlideMegaMendung: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
    style={{ ...(patternStyles.megaMendung as React.CSSProperties) }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-6 border-l-4 border-white/60 pl-4">
          <h2 className="batik-title mb-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Batik Mega Mendung
          </h2>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-white/60 to-transparent"></div>
        </div>

        {/* Info grid */}
        <div className="mb-6 grid gap-4">
          <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
              Asal
            </div>
            <div className="text-sm font-medium text-white/90">
              Cirebon • Jawa Barat
            </div>
          </div>

          <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
              Filosofi
            </div>
            <div className="text-sm font-medium text-white/90">
              Ketenangan & Kebijaksanaan
            </div>
          </div>
        </div>

        {/* Description with accent */}
        <div className="relative">
          <div className="absolute -left-3 top-0 text-6xl font-serif text-white/10">
            "
          </div>
          <p className="batik-body relative z-10 leading-relaxed text-white/90 pl-6">
            Motif Mega Mendung dipengaruhi budaya Tiongkok yang berakulturasi di
            Cirebon. Bentuk awan bertumpuk mencerminkan kesabaran,
            kebijaksanaan, dan kemampuan menahan amarah.
          </p>
        </div>
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
        <div
          className="h-72 w-72 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/50"
          style={{
            backgroundImage: "url('/assets/megamendung/bg.jpg')",
            backgroundSize: "300%",
            backgroundPosition: "center",
          }}
          title="Click to toggle background"
        />
      </div>
    </div>
  </div>
);

const SlideKawung: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
    style={{ ...(patternStyles.kawung as React.CSSProperties) }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[1px] bg-black/10 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-6 border-l-4 border-white/60 pl-4">
          <h2 className="batik-title mb-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Batik Kawung
          </h2>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-white/60 to-transparent"></div>
        </div>

        {/* Info grid */}
        <div className="mb-6 grid gap-4">
          <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
              Asal
            </div>
            <div className="text-sm font-medium text-white/90">
              Yogyakarta • Jawa Tengah
            </div>
          </div>

          <div className="batik-subtitle rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-xs uppercase tracking-wider text-white/60">
              Filosofi
            </div>
            <div className="text-sm font-medium text-white/90">
              Kesucian & Keadilan
            </div>
          </div>
        </div>

        {/* Description with accent */}
        <div className="relative">
          <div className="absolute -left-3 top-0 text-6xl font-serif text-white/10">
            "
          </div>
          <p className="batik-body relative z-10 leading-relaxed text-white/90 pl-6">
            Kawung menampilkan elips bersilangan yang melambangkan kesucian niat
            dan keadilan. Simetrinya mengingatkan pada keseimbangan batin serta
            amanah dalam kepemimpinan.
          </p>
        </div>
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
        <div
          className="h-72 w-72 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/50"
          style={{
            backgroundImage: "url('/assets/kawung/highlight.png')",
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
          title="Click to toggle background"
        />
      </div>
    </div>
  </div>
);

const SlideSidiq: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#9B6B4C]/30"
    style={{
      backgroundImage:
        "radial-gradient(circle at 20% 30%, rgba(139,69,19,0.25) 0 6px, transparent 6px 35px), radial-gradient(circle at 80% 70%, rgba(160,82,45,0.2) 0 6px, transparent 6px 35px), linear-gradient(135deg, #5C3D2E 0%, #3D2817 50%, #2B1810 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#8B4513]/10 to-black/20 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-4xl sm:text-5xl font-bold tracking-tight text-[#D4AF37]/90 mb-3 leading-tight">
            The Hands of Batik
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#D4AF37]/80 via-[#C9A87C]/50 to-transparent"></div>
        </div>

        {/* Subtitle badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#8B4513]/20 border border-[#C9A87C]/20 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-[#E8D4B8]">
            Dedication & Patience
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-base leading-relaxed text-[#E8D4B8]/95">
            Di balik setiap kain batik tulis ada tangan-tangan pengrajin yang
            bekerja dengan sabar. Mereka duduk berjam-jam, menorehkan malam
            panas titik demi titik, garis demi garis. Bagi para pengrajin,
            membatik bukan hanya pekerjaan, tetapi bentuk pengabdian—sebuah cara
            untuk menjaga warisan leluhur agar tetap hidup. Setiap kain adalah
            cerita, setiap motif adalah doa yang ditulis dengan kesungguhan.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#8B4513]/15 to-[#5C3D2E]/10 border border-[#9B6B4C]/25 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#D4AF37]/20">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#E8D4B8] italic pl-4">
            Membatik adalah meditasi, satu titik demi satu garis.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#D4AF37]/20 rotate-180">
            "
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#8B4513]/20 to-[#5C3D2E]/10 overflow-hidden">
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,175,55,0.08) 0 3px, transparent 3px 6px)",
        }}
      />
      <div></div>
      {/* Main image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
        style={{
          backgroundImage: "url('/assets/sidiq/highlight.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 80px rgba(139,69,19,0.4), inset 0 0 120px rgba(45,24,16,0.3)",
        }}
        title="The Hands of Batik"
      />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#2B1810]/40 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideCommunity: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#D4A574]/30"
    style={{
      backgroundImage:
        "radial-gradient(circle at 30% 20%, rgba(139,69,19,0.2) 0 5px, transparent 5px 30px), radial-gradient(circle at 70% 80%, rgba(184,134,11,0.15) 0 5px, transparent 5px 30px), linear-gradient(120deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#6D4C41]/15 to-black/25 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-4xl sm:text-5xl font-bold tracking-tight text-[#D4A574]/90 mb-3 leading-tight">
            The Community of Batik
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-[#D4A574]/80 via-[#B8860B]/50 to-transparent"></div>
        </div>

        {/* Subtitle badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#6D4C41]/25 border border-[#D4A574]/25 px-4 py-2 backdrop-blur-sm">
          <svg
            className="w-3 h-3 text-[#D4A574]/70"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span className="text-sm font-medium text-[#E8D4B8]">
            Tradition & Togetherness
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-sm leading-relaxed text-[#E8D4B8]/95">
            Para pengrajin batik tidak pernah berjalan sendiri. Mereka berkumpul
            di kampung-kampung batik, berbagi ilmu, saling menguatkan ketika
            pesanan sepi, dan bersuka cita ketika motif mereka digemari. Bagi
            komunitas batik, melestarikan tradisi adalah tugas bersama: menjaga
            pakem motif, mengajarkan teknik kepada generasi muda, sekaligus
            berinovasi agar batik tetap relevan di zaman yang berubah. Dalam
            kebersamaan, batik menemukan napasnya.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#6D4C41]/20 to-[#5D4037]/15 border border-[#D4A574]/25 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#D4A574]/20">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#E8D4B8] italic pl-4">
            Komunitas adalah tempat warisan ini bertahan, berakar, dan tumbuh
            kembali.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#D4A574]/20 rotate-180">
            "
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#6D4C41]/20 to-[#5D4037]/15 overflow-hidden">
      {/* Main community image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
        style={{
          backgroundImage: "url('/assets/community/community.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 80px rgba(109,76,65,0.4), inset 0 0 120px rgba(62,39,35,0.3)",
        }}
        title="The Community of Batik"
      />
      {/* Secondary image overlay - bottom corner */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 border-2 border-[#D4A574]/40 rounded-tl-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:border-[#D4A574]/60"
        style={{
          backgroundImage: "url('/assets/community/community2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,165,116,0.08) 0 3px, transparent 3px 6px)",
        }}
      />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3E2723]/40 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideKeraton: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#D4AF37]/40"
    style={{
      backgroundImage:
        "radial-gradient(circle at 25% 30%, rgba(75,0,130,0.15) 0 8px, transparent 8px 40px), radial-gradient(circle at 75% 70%, rgba(138,43,226,0.12) 0 8px, transparent 8px 40px), linear-gradient(135deg, #1A0B2E 0%, #2D1B3D 50%, #4A1942 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#4B0082]/10 to-black/30 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-4xl sm:text-5xl font-bold tracking-tight text-[#D4AF37] mb-3 leading-tight">
            Batik Keraton
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-[#D4AF37] via-[#FFD700]/60 to-transparent"></div>
        </div>

        {/* Subtitle badge with crown icon */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#4B0082]/20 border border-[#D4AF37]/30 px-4 py-2 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-[#D4AF37]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-[#F5E6D3]">
            Dari Simbol Kehormatan ke Warisan Bersama
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-sm leading-relaxed text-[#F5E6D3]/95">
            Pada masa lalu, batik keraton hanya boleh dikenakan oleh keluarga
            bangsawan. Motif parang, kawung, dan sido mukti bukan sekadar corak,
            melainkan lambang status dan kehormatan. Namun seiring waktu, batik
            meninggalkan tembok keraton dan meresap ke kehidupan rakyat. Kini,
            batik tidak lagi terikat kasta—ia menjadi identitas bersama yang
            dipakai dengan bangga oleh semua kalangan.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#4B0082]/25 to-[#2D1B3D]/20 border border-[#D4AF37]/30 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#D4AF37]/25">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#F5E6D3] italic pl-4">
            Dulu tanda kehormatan, kini jadi kebanggaan bangsa.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#D4AF37]/25 rotate-180">
            "
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#4B0082]/15 to-[#2D1B3D]/20 overflow-hidden">
      {/* Decorative overlay with royal pattern */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,175,55,0.1) 0 4px, transparent 4px 8px)",
        }}
      />
      {/* Placeholder for keraton image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(212,175,55,0.2) 0%, rgba(45,27,61,0.5) 100%)",
          boxShadow:
            "inset 0 0 100px rgba(75,0,130,0.4), inset 0 0 150px rgba(26,11,46,0.4)",
        }}
        title="Batik Keraton"
      >
        <div
          className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/assets/keraton/highlight2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "inset 0 0 80px rgba(139,69,19,0.4), inset 0 0 120px rgba(45,24,16,0.3)",
          }}
          title="The Hands of Batik"
        />
      </div>
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#1A0B2E]/50 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideUNESCO: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#87CEEB]/30"
    style={{
      backgroundImage:
        "radial-gradient(circle at 30% 25%, rgba(0,119,182,0.15) 0 6px, transparent 6px 35px), radial-gradient(circle at 70% 75%, rgba(135,206,235,0.12) 0 6px, transparent 6px 35px), linear-gradient(135deg, #0A1929 0%, #1A2F42 50%, #2C4A63 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#0077B6]/10 to-black/30 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-3xl sm:text-4xl font-bold tracking-tight text-[#87CEEB] mb-3 leading-tight">
            UNESCO Intangible Cultural Heritage
          </h2>
          <div className="h-0.5 w-40 bg-gradient-to-r from-[#87CEEB] via-[#4A9ED8]/60 to-transparent"></div>
        </div>

        {/* Subtitle badge with globe icon */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0077B6]/20 border border-[#87CEEB]/30 px-4 py-2 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-[#87CEEB]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-[#E3F2FD]">
            Dari Wastra Lokal ke Warisan Dunia
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-sm leading-relaxed text-[#E3F2FD]/95">
            Tahun 2009, UNESCO menetapkan batik Indonesia sebagai Warisan Budaya
            Takbenda Dunia. Pengakuan ini menegaskan bahwa batik bukan sekadar
            kain bermotif, melainkan pengetahuan, filosofi, dan tradisi yang
            diwariskan lintas generasi. Sejak saat itu, 2 Oktober dirayakan
            sebagai Hari Batik Nasional—hari di mana seluruh bangsa mengenakan
            batik sebagai bentuk kebanggaan kolektif.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#0077B6]/25 to-[#1A2F42]/20 border border-[#87CEEB]/30 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#87CEEB]/25">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#E3F2FD] italic pl-4">
            Dari malam panas di tangan perajin, batik akhirnya diakui dunia.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#87CEEB]/25 rotate-180">
            "
          </div>
        </div>

        {/* Year badge */}
        <div className="mt-6 inline-flex items-center gap-3">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#87CEEB]/15 border-2 border-[#87CEEB]/30">
            <span className="text-2xl font-bold text-[#87CEEB]">09</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#87CEEB]/70">
              UNESCO Recognition
            </div>
            <div className="text-lg font-bold text-[#E3F2FD]">
              2 Oktober 2009
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#0077B6]/15 to-[#1A2F42]/20 overflow-hidden">
      {/* Decorative overlay with international pattern */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(135,206,235,0.1) 0 4px, transparent 4px 8px)",
        }}
      />
      {/* Placeholder for UNESCO/batik image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105 flex items-center justify-center"
        style={{
          boxShadow:
            "inset 0 0 100px rgba(0,119,182,0.3), inset 0 0 150px rgba(10,25,41,0.4)",
        }}
        title="UNESCO Intangible Cultural Heritage"
      >
        <div
          className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/assets/unesco/highlight.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "inset 0 0 80px rgba(139,69,19,0.4), inset 0 0 120px rgba(45,24,16,0.3)",
          }}
          title="The Hands of Batik"
        />
      </div>
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0A1929]/50 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideKontemporer: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#FF6B9D]/30"
    style={{
      backgroundImage:
        "radial-gradient(circle at 30% 25%, rgba(236,72,153,0.12) 0 5px, transparent 5px 30px), radial-gradient(circle at 70% 75%, rgba(244,114,182,0.1) 0 5px, transparent 5px 30px), linear-gradient(135deg, #1F1B24 0%, #2D2433 50%, #3A2E42 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#EC4899]/10 to-black/30 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-4xl sm:text-5xl font-bold tracking-tight text-[#FF6B9D] mb-3 leading-tight">
            Batik Kontemporer
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-[#FF6B9D] via-[#F472B6]/60 to-transparent"></div>
        </div>

        {/* Subtitle badge with sparkle icon */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EC4899]/20 border border-[#FF6B9D]/30 px-4 py-2 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-[#FF6B9D]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-[#FCE7F3]">
            Dari Tradisi ke Tren Global
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-sm leading-relaxed text-[#FCE7F3]/95">
            Generasi muda membawa batik ke panggung baru. Mereka memadukan motif
            klasik dengan desain modern: jaket bomber, sneakers, gaun haute
            couture, hingga streetwear. Dengan kreativitas, batik tidak lagi
            hanya untuk acara formal, tetapi juga identitas harian yang stylish.
            Inovasi ini membuktikan bahwa batik mampu hidup di setiap zaman
            tanpa kehilangan akar budayanya.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#EC4899]/25 to-[#2D2433]/20 border border-[#FF6B9D]/30 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#FF6B9D]/25">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#FCE7F3] italic pl-4">
            Batik adalah gaya, bukan sekadar seragam.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#FF6B9D]/25 rotate-180">
            "
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#EC4899]/15 to-[#2D2433]/20 overflow-hidden">
      {/* Decorative overlay with fashion pattern */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,107,157,0.1) 0 4px, transparent 4px 8px)",
        }}
      />
      {/* Spotlight rays effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#FF6B9D]/30 to-transparent transform -translate-x-1/2 rotate-12"></div>
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#FF6B9D]/20 to-transparent transform -translate-x-1/2 -rotate-12"></div>
      </div>
      {/* Placeholder for contemporary fashion image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,107,157,0.2) 0%, rgba(45,36,51,0.5) 100%)",
          boxShadow:
            "inset 0 0 100px rgba(236,72,153,0.3), inset 0 0 150px rgba(31,27,36,0.4)",
        }}
        title="Batik Kontemporer"
      >
        <div
          className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/assets/kontemporer/highlight.jpeg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow:
              "inset 0 0 80px rgba(139,69,19,0.4), inset 0 0 120px rgba(45,24,16,0.3)",
          }}
          title="The Hands of Batik"
        />
      </div>
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#1F1B24]/50 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideDigital: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2 border border-[#10B981]/30"
    style={{
      backgroundImage:
        "radial-gradient(circle at 30% 25%, rgba(16,185,129,0.12) 0 5px, transparent 5px 30px), radial-gradient(circle at 70% 75%, rgba(52,211,153,0.1) 0 5px, transparent 5px 30px), linear-gradient(135deg, #0C1F1C 0%, #134E3A 50%, #166534 100%)",
    }}
  >
    <div className="p-8 sm:p-12 backdrop-blur-[2px] bg-gradient-to-br from-[#10B981]/10 to-black/30 flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-4 inline-block">
          <h2 className="batik-title text-4xl sm:text-5xl font-bold tracking-tight text-[#10B981] mb-3 leading-tight">
            Batik Digital & Inovasi
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-[#10B981] via-[#34D399]/60 to-transparent"></div>
        </div>

        {/* Subtitle badge with tech icon */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 px-4 py-2 backdrop-blur-sm">
          <svg
            className="w-4 h-4 text-[#10B981]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-[#D1FAE5]">
            Tradisi Bertemu Teknologi
          </span>
        </div>

        {/* Body text */}
        <div className="mb-6">
          <p className="batik-body text-sm leading-relaxed text-[#D1FAE5]/95">
            Di era digital, batik hadir dalam bentuk baru: desain grafis, motif
            cetak digital, bahkan karya NFT. Generasi kreatif menggabungkan
            filosofi batik dengan teknologi, menjadikannya media ekspresi yang
            melintasi batas ruang dan waktu. Inovasi ini membuka peluang baru,
            sekaligus menjaga agar batik terus relevan di masa depan.
          </p>
        </div>

        {/* Quote section */}
        <div className="relative rounded-xl bg-gradient-to-br from-[#10B981]/25 to-[#134E3A]/20 border border-[#10B981]/30 p-5 backdrop-blur-sm">
          <div className="absolute -top-3 -left-2 text-5xl font-serif text-[#10B981]/25">
            "
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-[#D1FAE5] italic pl-4">
            Dari malam panas ke piksel cahaya.
          </p>
          <div className="absolute -bottom-3 -right-2 text-5xl font-serif text-[#10B981]/25 rotate-180">
            "
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-64 sm:h-full bg-gradient-to-br from-[#10B981]/15 to-[#134E3A]/20 overflow-hidden">
      {/* Grid/circuit board overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Particle effects layer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#34D399] rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse delay-200"></div>
      </div>
      {/* Placeholder for digital batik image */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(16,185,129,0.2) 0%, rgba(19,78,58,0.5) 100%)",
          boxShadow:
            "inset 0 0 100px rgba(16,185,129,0.3), inset 0 0 150px rgba(12,31,28,0.4)",
        }}
        title="Batik Digital & Inovasi"
      >
        <div
          className="absolute inset-0 cursor-pointer transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/assets/modern/highlight.jpg')",
            backgroundPosition: "center",
            boxShadow:
              "inset 0 0 80px rgba(139,69,19,0.4), inset 0 0 120px rgba(45,24,16,0.3)",
            backgroundSize: "cover",
          }}
          title="The Hands of Batik"
        />
      </div>
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0C1F1C]/50 pointer-events-none z-10"></div>
    </div>
  </div>
);

const SlideHero: React.FC = () => (
  <div
    className="batik-card relative mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-2xl sm:grid-cols-2"
    style={{
      backgroundImage:
        "radial-gradient(circle at 30% 25%, rgba(220,38,38,0.12) 0 6px, transparent 6px 35px), radial-gradient(circle at 70% 75%, rgba(234,179,8,0.1) 0 6px, transparent 6px 35px), linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B91C1C 100%)",
    }}
  ></div>
);

const slides: SlideDef[] = [
  {
    key: "hero",
    Component: SlideHero,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/assets/hero/bg.svg')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/hero/text1.svg",
        opacity: 1,
        width: "80vw",
        height: "80vw",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Position from bottom instead of top
        depth: "0.15",
        rotate: "0",
      },
      {
        src: "/assets/hero/text2.svg",
        opacity: 1,
        width: "80vw",
        height: "80vw",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Position from bottom instead of top
        depth: "0.5",
        rotate: "0",
      },
      {
        src: "/assets/hero/sar.svg",
        opacity: 1,
        width: "15vw",
        height: "15vw",
        left: "50%",
        top: "80%",
        transform: "translate(-50%, -50%)", // Position from bottom instead of top
        depth: "0.15",
        rotate: "0",
      },
      {
        src: "/assets/hero/edge1.svg",
        opacity: 1,
        width: "100vw",
        height: "100vw",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Position from bottom instead of top
        depth: "0.8",
        rotate: "0",
      },
      {
        src: "/assets/hero/edge2.svg",
        opacity: 1,
        width: "100vw",
        height: "100vw",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Position from bottom instead of top
        depth: "0.8",
        rotate: "0",
      },
    ],
  },
  {
    key: "parang",
    Component: SlideParang,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/parang/vecteezy_batik-parang-style-illustration-for-background-wallpaper_48387544.jpg')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/parang/component1.svg",
        opacity: 0.9,
        width: "50vw", // 50% of viewport width (scales with screen)
        height: "50vw", // Keep aspect ratio square
        left: "-5vw", // Slight offset from left edge
        top: "-15vh", // 10% from top
        depth: "0.9",
        rotate: "320",
      },
      {
        src: "/assets/parang/component2.svg",
        opacity: 0.9,
        width: "50vw", // 50% of viewport width (scales with screen)
        height: "50vw", // Keep aspect ratio square
        left: "52%", // Slight offset from left edge
        top: "35%", // 10% from top
        depth: "0.2",
        rotate: "130",
      },
    ],
  },
  {
    key: "megaMendung",
    Component: SlideMegaMendung,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/megamendung/bg.jpg')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/component2.svg",
        opacity: 0.85,
        width: "36vw",
        height: "36vw",
        right: "5vw", // Position from right side
        top: "-15vh",
        depth: "0.6",
        rotate: "0",
      },
      {
        src: "/assets/component2.svg",
        opacity: 0.85,
        width: "36vw",
        height: "36vw",
        left: "5vw", // Position from right side
        top: "55vh",
        depth: "0.9",
        rotate: "0",
      },
    ],
  },
  {
    key: "kawung",
    Component: SlideKawung,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/kawung/bg.png')",
      position: "center",
      size: "repeat",
    },
    parallaxLayers: [
      {
        src: "/assets/kawung/component1.svg",
        opacity: 1,
        width: "48vw",
        height: "48vw",
        left: "82%", // Center horizontally
        top: "73%", // Center vertically
        transform: "translate(-50%, -50%)", // Offset by half to truly center
        depth: "0.9",
        rotate: "22",
      },
      {
        src: "/assets/kawung/component2.svg",
        opacity: 1,
        width: "48vw",
        height: "48vw",
        left: "32%", // Center horizontally
        top: "22%", // Center vertically
        transform: "translate(-50%, -50%)", // Offset by half to truly center
        depth: "0.45",
        rotate: "22",
      },
      {
        src: "/assets/kawung/component3.svg",
        opacity: 1,
        width: "48vw",
        height: "48vw",
        left: "15%", // Center horizontally
        top: "90%", // Center vertically
        transform: "translate(-50%, -50%)", // Offset by half to truly center
        depth: "0.15",
        rotate: "0",
      },
    ],
  },
  {
    key: "sidiq",
    Component: SlideSidiq,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/assets/sidiq/bg.jpg')",
      position: "center",
    },
    parallaxLayers: [
      {
        src: "/assets/sidiq/component1.svg",
        opacity: 0.75,
        width: "52vw",
        height: "52vw",
        left: "1%",
        bottom: "-15%", // Position from bottom instead of top
        depth: "0.6",
        rotate: "0",
      },
      {
        src: "/assets/sidiq/component2.svg",
        opacity: 0.95,
        width: "52vw",
        height: "52vw",
        right: "-6%",
        top: "-15%", // Position from bottom instead of top
        depth: "0.9",
        rotate: "0",
      },
    ],
  },
  {
    key: "community",
    Component: SlideCommunity,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/community/bg.avif')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/community/component1.svg",
        opacity: 0.9,
        width: "45vw",
        height: "45vw",
        right: "0vw",
        top: "50%",
        transform: "translate(0, -50%)",
        depth: "0.6",
        rotate: "75",
      },
      {
        src: "/assets/community/component1.svg",
        opacity: 0.9,
        width: "45vw",
        height: "45vw",
        left: "0vw",
        top: "65%",
        transform: "translate(0, -50%)",
        depth: "0.7",
        rotate: "285",
      },
    ],
  },
  {
    key: "keraton",
    Component: SlideKeraton,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/keraton/bg.png')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/parang/component2.svg",
        opacity: 0.5,
        width: "55vw",
        height: "55vw",
        left: "-10vw",
        top: "50%",
        transform: "translate(0, -50%)",
        depth: "0.25",
        rotate: "15",
      },
    ],
  },
  {
    key: "unesco",
    Component: SlideUNESCO,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/unesco/bg.jpg')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/unesco/component1.svg",
        opacity: 0.8,
        width: "50vw",
        height: "50vw",
        right: "-8vw",
        bottom: "-10vh",
        depth: "0.8",
        rotate: "90",
      },
      {
        src: "/assets/unesco/component1.svg",
        opacity: 0.8,
        width: "50vw",
        height: "50vw",
        left: "-8vw",
        top: "-10vh",
        depth: "0.9",
        rotate: "270",
      },
    ],
  },
  {
    key: "kontemporer",
    Component: SlideKontemporer,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/kontemporer/bg.webp')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/kontemporer/component1.svg",
        opacity: 0.9,
        width: "48vw",
        height: "48vw",
        left: "4vw",
        top: "6vh",
        depth: "0.6",
        rotate: "45",
      },
      {
        src: "/assets/kontemporer/component1.svg",
        opacity: 0.9,
        width: "48vw",
        height: "48vw",
        right: "2vw",
        bottom: "3vh",
        depth: "0.6",
        rotate: "315",
      },
      {
        src: "/assets/kontemporer/component2.svg",
        opacity: 0.9,
        width: "30vw",
        height: "30vw",
        left: "-6vw",
        bottom: "-6vh",
        depth: "0.9",
        rotate: "80",
      },
      {
        src: "/assets/kontemporer/component2.svg",
        opacity: 0.9,
        width: "30vw",
        height: "30vw",
        right: "-8vw",
        top: "-6vh",
        depth: "0.8",
        rotate: "280",
      },
    ],
  },
  {
    key: "digital",
    Component: SlideDigital,
    background: {
      image:
        "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/assets/modern/bg.jpg')",
      position: "center",
      size: "cover",
    },
    parallaxLayers: [
      {
        src: "/assets/modern/component2.svg",
        opacity: 0.91,
        width: "52vw",
        height: "52vw",
        right: "-10vw",
        top: "10vh",
        depth: "0.2",
        rotate: "60",
      },
      {
        src: "/assets/modern/component1.svg",
        opacity: 0.91,
        width: "52vw",
        height: "52vw",
        left: "-10vw",
        top: "10vh",
        depth: "0.2",
        rotate: "106",
      },
    ],
  },
];

export default function BatikPOCPage() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
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
    indexRef.current = index;
  }, [index]);

  // Enter animations for first render
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure any data-rotate is applied before other animations, preserving existing transforms
      const rotateNodes =
        decoRef.current?.querySelectorAll<HTMLElement>("[data-rotate]") || [];
      rotateNodes.forEach((node, idx) => {
        const deg = parseFloat(node.dataset.rotate || "0");
        const layer = currentSlide.parallaxLayers[idx];
        // Combine rotation with existing transform (e.g., translate for centering)
        const baseTransform = layer?.transform || "";
        gsap.set(node, {
          rotate: deg,
          transformOrigin: "center center",
          // Preserve any existing transform like translate
          ...(baseTransform && {
            transform: `${baseTransform} rotate(${deg}deg)`,
          }),
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

  // Mouse and touch-based parallax on layered decorations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateParallax = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      cursor.current = { x, y };

      // Move children by data-depth with bounds checking
      const nodes =
        decoRef.current?.querySelectorAll<HTMLElement>("[data-depth]") || [];
      nodes.forEach((node) => {
        const depth = parseFloat(node.dataset.depth || "0");
        // Reduce parallax intensity and add bounds
        const maxMovement = Math.min(30, depth * 25); // Reduced from 40 to 25/30
        const mx = Math.max(
          -maxMovement,
          Math.min(maxMovement, (x - 0.5) * depth * 25)
        );
        const my = Math.max(
          -maxMovement,
          Math.min(maxMovement, (y - 0.5) * depth * 25)
        );
        gsap.to(node, { x: mx, y: my, duration: 0.6, ease: "power2.out" });
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateParallax(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateParallax(touch.clientX, touch.clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateParallax(touch.clientX, touch.clientY);
      }
    };

    // Reset parallax when touch ends or mouse leaves
    const resetParallax = () => {
      const nodes =
        decoRef.current?.querySelectorAll<HTMLElement>("[data-depth]") || [];
      nodes.forEach((node) => {
        gsap.to(node, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
      });
      cursor.current = { x: 0.5, y: 0.5 };
    };

    // Add event listeners
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", resetParallax);
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", resetParallax);
    el.addEventListener("touchcancel", resetParallax);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", resetParallax);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", resetParallax);
      el.removeEventListener("touchcancel", resetParallax);
    };
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
      tl.to(
        backgroundRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        0
      )
        .call(() => {
          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundImage = toBackground.image;
            backgroundRef.current.style.backgroundPosition =
              toBackground.position || "center";
            backgroundRef.current.style.backgroundSize =
              toBackground.size || "cover";
          }
        })
        .to(backgroundRef.current, {
          opacity: 1,
          duration: 0.4,
        });
    }

    // Animate parallax layers transition
    const parallaxNodes =
      decoRef.current?.querySelectorAll<HTMLElement>("[data-layer]") || [];
    tl.to(
      parallaxNodes,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
      },
      0
    );

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
    const parallaxNodes =
      decoRef.current?.querySelectorAll<HTMLElement>("[data-layer]") || [];
    if (parallaxNodes.length > 0) {
      // Set initial rotation and transforms
      parallaxNodes.forEach((node, idx) => {
        const deg = parseFloat(node.dataset.rotate || "0");
        const layer = currentSlide.parallaxLayers[idx];
        const baseTransform = layer?.transform || "";

        gsap.set(node, {
          rotate: deg,
          transformOrigin: "center center",
          ...(baseTransform && {
            transform: `${baseTransform} rotate(${deg}deg)`,
          }),
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

  // Autoplay: advance slides on interval, pause on hover and when tab hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const AUTO_PLAY_DELAY_MS = 10000;
    let intervalId: number | undefined;

    const start = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        const from = indexRef.current;
        const to = (from + 1) % slides.length;
        animateSlideChange(from, to, 1);
        setIndex(to);
      }, AUTO_PLAY_DELAY_MS);
    };

    const stop = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const currentSlide = slides[index];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white relative touch-pan-x touch-pan-y"
      style={{ touchAction: "pan-x pan-y" }}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: currentSlide.background.image,
          backgroundSize: currentSlide.background.size || "cover",
          backgroundPosition: currentSlide.background.position || "center",
          visibility: "visible",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/10 z-[1]"
        style={{
          backdropFilter: "blur(1px)",
        }}
      />
      {/* Decorative parallax layers */}

      <div
        ref={decoRef}
        className="decor pointer-events-none absolute inset-0 z-[15] overflow-hidden"
      >
        {currentSlide.parallaxLayers.map((layer, idx) => (
          <img
            key={`${currentSlide.key}-layer-${idx}`}
            src={layer.src}
            alt=""
            className="absolute will-change-transform"
            style={{
              opacity: layer.opacity,
              width: layer.width,
              height: layer.height,
              maxWidth: "2000px", // Increased to allow 100vw sizes
              maxHeight: "2000px",
              minWidth: "300px", // Ensure visibility on small screens
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
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 z-20">
        {slides.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
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

      {/* Design Credit */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-30">
        <div className="rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 px-3 py-2">
          <div className="text-xs text-white/70 font-medium tracking-wide">
            Design by{" "}
            <span className="text-white/90 font-semibold">
              Wilson Nathanael
            </span>
          </div>
        </div>
      </div>

      {/* Page title overlay */}
      {/*<div className="pointer-events-none absolute left-0 right-0 top-6 mx-auto w-full max-w-6xl px-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm tracking-widest text-white/70">Batik Showcase • POC</div>
                    <div className="text-xs text-white/60">Next.js × GSAP × Parallax</div>
                </div>
            </div>*/}
    </div>
  );
}
