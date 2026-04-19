"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {/* Background image */}
      <Image
        src="/hero.jpeg"
        alt="Xiaomi SU7 — vue de profil"
        fill
        priority
        quality={90}
        style={{ objectFit: "cover", objectPosition: "60% center" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,14,22,0.85) 0%, rgba(10,14,22,0.55) 55%, rgba(10,14,22,0.15) 100%)",
        }}
      />

      {/* Bottom fade to neo-bg */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, transparent, var(--neo-bg))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center pb-28 md:pb-0 px-8 md:px-20 max-w-7xl mx-auto">
        {/* Xiaomi badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 self-start"
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50px",
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.08)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Xiaomi Automobile
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--neo-accent)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            2024
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-white leading-none mb-4"
          style={{
            fontFamily: "var(--font-heading), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(4rem, 10vw, 9rem)",
            letterSpacing: "-0.03em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
          }}
        >
          SU7
        </h1>

        <p
          className="text-white/70 mb-3 font-light"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          L&apos;excellence électrique réinventée
        </p>

        <p
          className="mb-10 max-w-md"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s",
          }}
        >
          Quand l&apos;ingénierie de précision rencontre le design de demain.
          Une berline électrique hors du commun, née pour dépasser les limites.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s",
          }}
        >
          <a
            href="#specs"
            className="px-8 py-4 text-sm font-semibold tracking-wide"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "50px",
              color: "white",
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.08)",
              textDecoration: "none",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.16)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)";
            }}
          >
            Explorer
          </a>
          <a
            href="#reserver"
            className="neo-btn-accent px-8 py-4 text-sm font-semibold tracking-wide"
            style={{ textDecoration: "none" }}
          >
            Réserver maintenant
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 0.6 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
        >
          Défiler
        </span>
        <div
          className="w-px bg-white/30"
          style={{
            height: "40px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
