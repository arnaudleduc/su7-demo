"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Specs", href: "#specs" },
  { label: "Design", href: "#design" },
  { label: "Configurateur", href: "#configurateur" },
  { label: "Motorisation", href: "#motorisation" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "12px 16px" : "24px 0",
      }}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-500"
        style={
          scrolled
            ? {
                background: "var(--neo-bg)",
                boxShadow:
                  "8px 8px 20px var(--neo-shadow-dark), -8px -8px 20px var(--neo-shadow-light)",
                borderRadius: "20px",
                padding: "14px 28px",
              }
            : { padding: "0 32px" }
        }
      >
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold tracking-widest transition-colors duration-300"
          style={{
            fontFamily: "var(--font-heading), Georgia, serif",
            fontStyle: "italic",
            color: scrolled ? "var(--neo-text)" : "white",
            textDecoration: "none",
          }}
        >
          SU7
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{
                color: scrolled ? "var(--neo-text-muted)" : "rgba(255,255,255,0.8)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#reserver"
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300"
          style={
            scrolled
              ? {
                  background: "var(--neo-accent)",
                  color: "white",
                  borderRadius: "50px",
                  boxShadow:
                    "4px 4px 12px rgba(185,28,28,0.45), -2px -2px 6px rgba(255,255,255,0.25)",
                  textDecoration: "none",
                }
              : {
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  borderRadius: "50px",
                  textDecoration: "none",
                }
          }
        >
          Réserver
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: scrolled ? "var(--neo-text)" : "white" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mx-4 mt-2 p-6 flex flex-col gap-4"
          style={{
            background: "var(--neo-bg)",
            boxShadow:
              "8px 8px 20px var(--neo-shadow-dark), -8px -8px 20px var(--neo-shadow-light)",
            borderRadius: "20px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium"
              style={{
                color: "var(--neo-text)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserver"
            onClick={() => setMenuOpen(false)}
            className="neo-btn-accent text-center px-6 py-3 text-sm font-semibold"
            style={{ textDecoration: "none" }}
          >
            Réserver
          </a>
        </div>
      )}
    </header>
  );
}
