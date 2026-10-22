import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ebenezer Sambieni — Développeur Web & Mobile",
  description:
    "Portfolio d'Ebenezer Sambieni, développeur web et mobile : applications de gestion, sites professionnels et interfaces d'administration, du frontend au backend.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${sora.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Classe "js" posée avant le rendu : permet de masquer le hero jusqu'à son animation d'entrée */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
