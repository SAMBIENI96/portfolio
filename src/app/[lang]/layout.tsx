import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Sora, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ContentProvider } from "@/content/ContentProvider";
import { getContent, hasLocale, locales } from "@/content";
import "../globals.css";

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

// Une page générée à l'avance par langue ; toute autre langue renvoie une 404 (voir notFound plus bas).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getContent(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: { title: meta.title, description: meta.description, locale: lang === "fr" ? "fr_FR" : "en_US", type: "website" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sora.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Classe "js" posée avant le rendu : permet de masquer le hero jusqu'à son animation d'entrée */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <ContentProvider content={getContent(lang)}>{children}</ContentProvider>
      </body>
    </html>
  );
}
