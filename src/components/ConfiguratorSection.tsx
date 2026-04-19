"use client";

import dynamic from "next/dynamic";

const Configurator3D = dynamic(() => import("./Configurator3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "75vh",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            background: "#dc2626",
            borderRadius: "2px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  ),
});

export default function ConfiguratorSection() {
  return (
    <section
      id="configurateur"
      style={{ background: "#0f172a", padding: "100px 0 0" }}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "var(--neo-accent)", fontFamily: "var(--font-body)" }}
        >
          Configurateur 3D
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "white",
              margin: 0,
            }}
          >
            Faites-la vôtre
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "360px",
              fontFamily: "var(--font-body)",
            }}
          >
            Choisissez votre couleur de carrosserie et explorez chaque angle
            du SU7 en temps réel.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <Configurator3D />

      {/* Credits */}
      <div
        className="text-center py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
          Modèle 3D :{" "}
          <a
            href="https://skfb.ly/pCToS"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}
          >
            2024 Xiaomi SU7 Max
          </a>{" "}
          by Ddiaz Design — licensed under{" "}
          <a
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}
          >
            CC BY-NC-SA 4.0
          </a>
        </p>
      </div>
    </section>
  );
}
