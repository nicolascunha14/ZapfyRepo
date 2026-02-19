import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HeroPreVenda } from "@/components/pre-venda/hero-pre-venda";
import { OfertaDetalhes } from "@/components/pre-venda/oferta-detalhes";
import { PrecoPreVenda } from "@/components/pre-venda/preco-prevenda";
import { FaqPreVenda } from "@/components/pre-venda/faq-pre-venda";
import { StickyCtaMobile } from "@/components/pre-venda/sticky-cta-mobile";

export const metadata: Metadata = {
  title: "Pré-venda Fundadores — Zapfy",
  description:
    "Garanta acesso vitalício ao Zapfy com preço exclusivo de fundador. Educação financeira gamificada para crianças de 7 a 15 anos. Oferta por tempo limitado.",
  openGraph: {
    title: "Pré-venda Fundadores — Zapfy",
    description:
      "Garanta acesso vitalício ao Zapfy com preço exclusivo de fundador. Oferta por tempo limitado.",
    url: "https://zapfy.app/pre-venda",
    type: "website",
  },
};

export default function PreVendaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroPreVenda />
      <OfertaDetalhes />
      <PrecoPreVenda />
      <FaqPreVenda />
      <Footer />
      {/* Sticky buy button visible only on mobile */}
      <StickyCtaMobile />
    </main>
  );
}
