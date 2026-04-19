import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xiaomi SU7 — La révolution électrique",
  description:
    "Découvrez le Xiaomi SU7, le véhicule électrique premium qui redéfinit l'excellence. Performance, autonomie et design au sommet.",
  openGraph: {
    title: "Xiaomi SU7 — La révolution électrique",
    description: "Le véhicule électrique premium qui redéfinit l'excellence.",
    images: ["/hero.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${bodoniModa.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
