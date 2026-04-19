"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Status = "idle" | "loading" | "success" | "error";

export default function ReservationSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "0.9rem",
    background: "var(--neo-bg)",
    boxShadow:
      "inset 5px 5px 12px var(--neo-shadow-dark), inset -5px -5px 12px var(--neo-shadow-light)",
    border: "none",
    borderRadius: "12px",
    color: "var(--neo-text)",
    fontFamily: "var(--font-body)",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--neo-text-muted)",
    marginBottom: "8px",
    fontFamily: "var(--font-body)",
  };

  return (
    <section
      id="reserver"
      style={{ background: "var(--neo-bg)", padding: "120px 0" }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div
          ref={ref}
          className="text-center mb-16"
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
            Réservation
          </p>
          <h2
            className="section-heading mb-4"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
          >
            Réservez votre SU7
          </h2>
          <p
            style={{
              color: "var(--neo-text-muted)",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}
          >
            Soyez parmi les premiers à prendre le volant. Notre équipe vous
            contactera sous 48h pour confirmer votre réservation.
          </p>
        </div>

        {/* Form card */}
        <div
          className="p-10 md:p-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            background: "var(--neo-bg)",
            boxShadow:
              "14px 14px 32px var(--neo-shadow-dark), -14px -14px 32px var(--neo-shadow-light)",
            borderRadius: "28px",
          }}
        >
          {status === "success" ? (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                style={{
                  borderRadius: "50%",
                  background: "var(--neo-bg)",
                  boxShadow:
                    "inset 5px 5px 12px var(--neo-shadow-dark), inset -5px -5px 12px var(--neo-shadow-light)",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="var(--neo-accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="section-heading mb-3"
                style={{ fontSize: "2rem" }}
              >
                Réservation confirmée
              </h3>
              <p
                style={{
                  color: "var(--neo-text-muted)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.7,
                }}
              >
                Merci pour votre intérêt. Notre équipe reviendra vers vous très
                prochainement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prenom" style={labelStyle}>Prénom</label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    placeholder="Jean"
                    style={inputStyle}
                    className="neo-input"
                  />
                </div>
                <div>
                  <label htmlFor="nom" style={labelStyle}>Nom</label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    placeholder="Dupont"
                    style={inputStyle}
                    className="neo-input"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jean.dupont@email.com"
                  style={inputStyle}
                  className="neo-input"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="modele" style={labelStyle}>Modèle souhaité</label>
                <select
                  id="modele"
                  name="modele"
                  required
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  className="neo-input"
                >
                  <option value="">Sélectionnez un modèle</option>
                  <option value="su7">SU7 — À partir de 45 000 €</option>
                  <option value="su7-pro">SU7 Pro — À partir de 55 000 €</option>
                  <option value="su7-max">SU7 Max — À partir de 72 000 €</option>
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="message" style={labelStyle}>Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Questions, précisions sur votre commande..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  className="neo-input"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="neo-btn-accent w-full py-4 text-base font-semibold tracking-wide flex items-center justify-center gap-3"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    "Envoyer ma réservation"
                  )}
                </button>
              </div>

              <p
                className="text-center mt-5 text-xs"
                style={{ color: "var(--neo-text-muted)", fontFamily: "var(--font-body)" }}
              >
                Vos données sont protégées et ne seront jamais partagées.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
