export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0f172a",
        padding: "60px 0 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-4xl mb-3"
              style={{
                fontFamily: "var(--font-heading), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              SU7
            </p>
            <p
              className="text-sm max-w-xs"
              style={{
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
              }}
            >
              Xiaomi Automobile — L&apos;excellence électrique réinventée.
              Un véhicule pensé pour ceux qui refusent les compromis.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "var(--neo-accent)", fontFamily: "var(--font-body)" }}
              >
                Véhicule
              </p>
              <ul className="flex flex-col gap-3">
                {["Performances", "Design", "Technologie", "Sécurité"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "var(--neo-accent)", fontFamily: "var(--font-body)" }}
              >
                Xiaomi
              </p>
              <ul className="flex flex-col gap-3">
                {["À propos", "Actualités", "Contact", "Configurateur"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            marginBottom: "24px",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          >
            © {year} Xiaomi Corporation. Site démo — non officiel.
          </p>
          <div className="flex gap-6">
            {["Confidentialité", "Mentions légales", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-white/60"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
