import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zapfy - Educação Financeira Gamificada para Crianças",
  description:
    "Plataforma de educação financeira gamificada para crianças de 7 a 14 anos. Ensine seu filho sobre dinheiro de forma divertida, segura e alinhada com a BNCC.",
  keywords: [
    "educação financeira",
    "crianças",
    "gamificação",
    "plataforma digital",
    "BNCC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
