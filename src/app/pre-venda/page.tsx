import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HeroPreVenda } from "@/components/pre-venda/hero-pre-venda";
import { OfertaDetalhes } from "@/components/pre-venda/oferta-detalhes";
import { ProblemSection } from "@/components/pre-venda/problem-section";
import { MetodoZap } from "@/components/pre-venda/metodo-zap";
import { ComoFunciona } from "@/components/pre-venda/como-funciona";
import { Resultados } from "@/components/pre-venda/resultados";
import { SocialProofSection } from "@/components/pre-venda/social-proof-section";
import { SobreZapfy } from "@/components/pre-venda/sobre-zapfy";
import { PrecoPreVenda } from "@/components/pre-venda/preco-prevenda";
import { AccessTiming } from "@/components/pre-venda/access-timing";
import { FaqPreVenda } from "@/components/pre-venda/faq-pre-venda";
import { StickyCtaMobile } from "@/components/pre-venda/sticky-cta-mobile";

export const metadata: Metadata = {
  title: "Turma Fundadora 2026 — Zapfy",
  description:
    "Garanta a vaga do seu filho na Turma Fundadora da Zapfy. Um app com missões práticas em família para crianças aprenderem a lidar com dinheiro antes dos 10 anos.",
  openGraph: {
    title: "Turma Fundadora 2026 — Zapfy",
    description:
      "Missões práticas em família para seu filho aprender sobre dinheiro no mundo real — antes dos 10 anos.",
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
      <ProblemSection />
      <MetodoZap />
      <ComoFunciona />
      <Resultados />
      <SocialProofSection />
      <SobreZapfy />
      <PrecoPreVenda />
      <AccessTiming />
      <FaqPreVenda />
      <Footer />
      <StickyCtaMobile />
    </main>
  );
}
