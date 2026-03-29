import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Báltico — Restaurante & Marisquería | La Guaira",
  description:
    "Vive la experiencia gastronómica más exclusiva del litoral. Mariscos frescos, atardeceres infinitos y la mejor vida nocturna en La Guaira, Venezuela.",
  keywords: [
    "restaurante",
    "marisquería",
    "La Guaira",
    "Venezuela",
    "mariscos",
    "reservaciones",
    "vista al mar",
  ],
  openGraph: {
    title: "Báltico — Restaurante & Marisquería",
    description: "Donde el mar se encuentra con el sabor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
