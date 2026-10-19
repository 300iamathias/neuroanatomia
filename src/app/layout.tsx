import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#131018",
};

export const metadata: Metadata = {
  title: "NeuroAtlas · Sistema límbico, lóbulos y surcos",
  description:
    "Atlas interactivo para estudiar neuroanatomía: toca cada estructura del cerebro, gana XP, sube de nivel y domina tu examen práctico con el simulador.",
  keywords: ["neuroanatomía", "sistema límbico", "lóbulos cerebrales", "surcos y giros", "estudio", "examen", "quiz", "flashcards"],
  authors: [{ name: "NeuroAtlas" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-64.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "🧠 NeuroAtlas · Aprende neuroanatomía jugando",
    description:
      "Toca el cerebro, gana XP, desbloquea logros y clava tu examen práctico. 71 estructuras, 44 preguntas y un simulador con rúbrica real. ¡Gratis!",
    siteName: "NeuroAtlas",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "NeuroAtlas · Atlas interactivo de neuroanatomía" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "🧠 NeuroAtlas · Aprende neuroanatomía jugando",
    description: "Toca el cerebro, gana XP y clava tu examen. ¡Gratis!",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
