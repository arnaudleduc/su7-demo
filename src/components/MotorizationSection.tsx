"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Trim {
  name: string;
  tagline: string;
  price: string;
  power: string;
  range: string;
  sprint: string;
  drive: string;
  featured: boolean;
  cta: string;
}

const trims: Trim[] = [
  {
    name: "SU7",
    tagline: "Le point d'entrée idéal",
    price: "À partir de 45 000 €",
    power: "299 ch",
    range: "668 km",
    sprint: "5.28 s",
    drive: "Propulsion AR",
    featured: false,
    cta: "En savoir plus",
  },
  {
    name: "SU7 Pro",
    tagline: "L'autonomie sans compromis",
    price: "À partir de 55 000 €",
    power: "299 ch",
    range: "830 km",
    sprint: "5.28 s",
    drive: "Propulsion AR",
    featured: false,
    cta: "En savoir plus",
  },
  {
    name: "SU7 Max",
    tagline: "Performance absolue",
    price: "À partir de 72 000 €",
    power: "673 ch",
    range: "800 km",
    sprint: "2.78 s",
    drive: "Double moteur AWD",
    featured: true,
    cta: "Réserver le Max",
  },
];

interface SpecRowProps {
  label: string;
  value: string;
  featured: boolean;
}

function SpecRow({ label, value, featured }: SpecRowProps) {
  return (
    <div
      className="flex justify-between items-center py-3"
      style={{
        borderBottom: `1px solid ${featured ? "rgba(220,38,38,0.15)" : "rgba(30,41,59,0.08)"}`,
      }}
    >
      <span
        className="text-sm"
        style={{ color: "var(--neo-text-muted)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold"
        style={{
          color: featured ? "var(--neo-accent)" : "var(--neo-text)",
          fontFamily: "var(--font-body)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function MotorizationSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="motorisation"
      style={{ background: "var(--neo-bg)", padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div
          ref={ref}
          className="text-center mb-20"
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
            Motorisation
          </p>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Choisissez votre niveau d&apos;ambition
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {trims.map((trim, i) => (
            <div
              key={trim.name}
              className="relative flex flex-col p-8"
              style={{
                ...(trim.featured
                  ? {
                      background: "var(--neo-bg)",
                      boxShadow:
                        "12px 12px 28px var(--neo-shadow-dark), -12px -12px 28px var(--neo-shadow-light), inset 0 0 0 2px var(--neo-accent)",
                      borderRadius: "24px",
                    }
                  : {
                      background: "var(--neo-bg)",
                      boxShadow:
                        "8px 8px 20px var(--neo-shadow-dark), -8px -8px 20px var(--neo-shadow-light)",
                      borderRadius: "20px",
                    }),
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
              }}
            >
              {/* Featured badge */}
              {trim.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5"
                  style={{
                    background: "var(--neo-accent)",
                    borderRadius: "50px",
                    boxShadow: "0 4px 12px rgba(220,38,38,0.4)",
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase text-white whitespace-nowrap"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Recommandé
                  </span>
                </div>
              )}

              {/* Name */}
              <h3
                className="mb-1"
                style={{
                  fontFamily: "var(--font-heading), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "1.8rem",
                  color: trim.featured ? "var(--neo-accent)" : "var(--neo-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {trim.name}
              </h3>

              <p
                className="text-sm mb-6"
                style={{ color: "var(--neo-text-muted)", fontFamily: "var(--font-body)" }}
              >
                {trim.tagline}
              </p>

              {/* Price neo inset */}
              <div
                className="py-4 px-5 mb-6 text-center"
                style={{
                  background: "var(--neo-bg)",
                  boxShadow:
                    "inset 4px 4px 10px var(--neo-shadow-dark), inset -4px -4px 10px var(--neo-shadow-light)",
                  borderRadius: "12px",
                }}
              >
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--neo-text)", fontFamily: "var(--font-body)" }}
                >
                  {trim.price}
                </span>
              </div>

              {/* Specs */}
              <div className="flex-1">
                <SpecRow label="Puissance" value={trim.power} featured={trim.featured} />
                <SpecRow label="Autonomie CLTC" value={trim.range} featured={trim.featured} />
                <SpecRow label="0 → 100 km/h" value={trim.sprint} featured={trim.featured} />
                <SpecRow label="Transmission" value={trim.drive} featured={trim.featured} />
              </div>

              {/* CTA */}
              <a
                href="#reserver"
                className="mt-8 text-center py-3.5 px-6 text-sm font-semibold tracking-wide block"
                style={{
                  ...(trim.featured
                    ? {
                        background: "var(--neo-accent)",
                        color: "white",
                        boxShadow:
                          "4px 4px 12px rgba(185,28,28,0.4), -2px -2px 6px rgba(255,255,255,0.2)",
                        borderRadius: "50px",
                      }
                    : {
                        background: "var(--neo-bg)",
                        color: "var(--neo-text)",
                        boxShadow:
                          "4px 4px 10px var(--neo-shadow-dark), -4px -4px 10px var(--neo-shadow-light)",
                        borderRadius: "50px",
                      }),
                  textDecoration: "none",
                  transition: "transform 0.15s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                {trim.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
