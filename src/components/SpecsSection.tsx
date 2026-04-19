"use client";

import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";

interface StatCardProps {
  value: number;
  decimals: number;
  unit: string;
  label: string;
  sublabel: string;
  delay: number;
  parentVisible: boolean;
}

function StatCard({ value, decimals, unit, label, sublabel, delay, parentVisible }: StatCardProps) {
  const count = useCountUp(value, 1800, decimals, parentVisible);

  return (
    <div
      className="reveal flex flex-col items-center text-center p-10 neo-surface-lg"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Neo inner ring */}
      <div
        className="flex flex-col items-center justify-center mb-4"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          boxShadow:
            "inset 5px 5px 12px var(--neo-shadow-dark), inset -5px -5px 12px var(--neo-shadow-light)",
          background: "var(--neo-bg)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading), Georgia, serif",
            fontStyle: "italic",
            fontSize: "2rem",
            fontWeight: 600,
            color: "var(--neo-accent)",
            lineHeight: 1,
          }}
        >
          {count.toFixed(decimals)}
          <span style={{ fontSize: "1rem", fontStyle: "normal" }}>{unit}</span>
        </span>
      </div>

      <p
        className="text-lg font-semibold mb-1"
        style={{ color: "var(--neo-text)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </p>
      <p
        className="text-sm"
        style={{ color: "var(--neo-text-muted)", fontFamily: "var(--font-body)" }}
      >
        {sublabel}
      </p>
    </div>
  );
}

const specs = [
  { value: 2.78, decimals: 2, unit: "s", label: "0 → 100 km/h", sublabel: "Accélération record" },
  { value: 800, decimals: 0, unit: "km", label: "Autonomie CLTC", sublabel: "SU7 Max — pleine charge" },
  { value: 673, decimals: 0, unit: "ch", label: "Puissance max", sublabel: "Double moteur AWD" },
];

export default function SpecsSection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="specs" style={{ background: "var(--neo-bg)", padding: "120px 0" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div
          className="text-center mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          ref={ref}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--neo-accent)", fontFamily: "var(--font-body)" }}
          >
            Performance
          </p>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Des chiffres qui parlent d&apos;eux-mêmes
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specs.map((s, i) => (
            <StatCard
              key={s.label}
              {...s}
              delay={i * 150}
              parentVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
