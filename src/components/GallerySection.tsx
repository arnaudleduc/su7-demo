"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  delay: number;
  parentVisible: boolean;
}

function GalleryImage({ src, alt, label, className = "", style = {}, delay, parentVisible }: GalleryImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: "20px",
        cursor: "zoom-in",
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={85}
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,14,22,0.7) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      >
        <p
          className="text-white text-sm font-medium tracking-wide"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

const images = [
  { src: "/3-4_front.jpg", alt: "Xiaomi SU7 vue 3/4 avant", label: "Façade avant — lignes de fuite sculpturales" },
  { src: "/3-4_back.jpg", alt: "Xiaomi SU7 vue 3/4 arrière", label: "Arrière — diffuseur aérodynamique intégré" },
  { src: "/interieur.jpg", alt: "Intérieur Xiaomi SU7", label: "Habitacle — cockpit driver-focused" },
  { src: "/detail.jpg", alt: "Détail Xiaomi SU7", label: "Détails — finitions premium" },
];

export default function GallerySection() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="design"
      style={{
        background: "#111827",
        padding: "120px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div
          ref={ref}
          className="mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--neo-accent)", fontFamily: "var(--font-body)" }}
          >
            Design
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "white",
            }}
          >
            Un design qui ne laisse pas indifférent
          </h2>
          <p
            className="mt-4 max-w-lg"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}
          >
            Chaque courbe, chaque surface, chaque détail a été pensé pour allier
            performance aérodynamique et élégance intemporelle.
          </p>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {images.map((img, i) => (
            <GalleryImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              label={img.label}
              style={{ height: 260 }}
              delay={i * 80}
              parentVisible={isVisible}
            />
          ))}
        </div>

        {/* Desktop: masonry grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4" style={{ gridAutoRows: "240px" }}>
          <GalleryImage
            src={images[0].src}
            alt={images[0].alt}
            label={images[0].label}
            style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}
            delay={0}
            parentVisible={isVisible}
          />
          <GalleryImage
            src={images[1].src}
            alt={images[1].alt}
            label={images[1].label}
            style={{ gridColumn: "2 / 4", gridRow: "1 / 2" }}
            delay={100}
            parentVisible={isVisible}
          />
          <GalleryImage
            src={images[2].src}
            alt={images[2].alt}
            label={images[2].label}
            style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}
            delay={200}
            parentVisible={isVisible}
          />
          <GalleryImage
            src={images[3].src}
            alt={images[3].alt}
            label={images[3].label}
            style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}
            delay={300}
            parentVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}
