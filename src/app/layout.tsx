import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRF34FHL');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${nunito.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRF34FHL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
