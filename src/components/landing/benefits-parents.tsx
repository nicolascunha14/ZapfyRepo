"use client";

import { Heart, BarChart3, Smartphone } from "lucide-react";
import { SectionCarousel } from "@/components/ui/section-carousel";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";
import Link from "next/link";

export function BenefitsForParents() {
  const benefits = [
    {
      icon: <Heart className="w-7 h-7 text-white" />,
      title: "Momentos em Família",
      description:
        '"Papai, vamos fazer a missão?" Missões de 5 minutos que vocês fazem juntos. Não é obrigação. É diversão com propósito.',
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-white" />,
      title: "Você Também Aprende",
      description:
        'Dicas exclusivas para pais em cada missão. "Como falar de dinheiro sem criar trauma" e "Respostas para perguntas que você não esperava".',
    },
    {
      icon: <Smartphone className="w-7 h-7 text-white" />,
      title: "Progresso Visível",
      description:
        "Dashboard para pais. Veja em tempo real: conceitos aprendidos, missões completadas, áreas de melhoria.",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-zapfy-coin/15 to-transparent rounded-full blur-xl float-animation" />
      <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-lg animate-pulse" />
      <div className="absolute top-2/3 left-1/4 w-12 h-12 bg-gradient-to-br from-zapfy-mint/15 to-transparent rounded-full blur-md pulse-slow" />

      <div className="container-zapfy relative z-10">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="text-center space-y-6 mb-16">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  5 Minutos Por Dia.
                </span>{" "}
                Pais e Filhos Juntos.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <strong>9 de 10 pais</strong> dizem que fazer missões com os
                filhos fortaleceu a relação familiar.
                <br />
                <br />
                Na Zapfy, você não dá aula. Você participa da aventura.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <ScrollAnimation animation="scale" delay={0.1}>
            <SectionCarousel items={benefits} />
          </ScrollAnimation>

          <div className="mt-16 space-y-8">
            <ScrollAnimation animation="fadeUp" delay={0.2}>
              <div className="bg-gradient-to-r from-zapfy-coin/10 to-primary-500/10 rounded-2xl p-6 border border-zapfy-coin/20 max-w-2xl mx-auto">
                <p className="text-base text-muted-foreground italic mb-3">
                  &quot;Meu filho de 10 anos me perguntou se vale a pena comprar
                  um brinquedo parcelado. Fiquei em choque!&quot;
                </p>
                <p className="text-sm font-display font-semibold text-primary-500">
                  — Paula, após 3 semanas
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.3}>
              <div className="text-center">
                <Link href="/signup">
                  <button className="btn-hero group flex items-center justify-center mx-auto">
                    Experimentar Ensinar Junto
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={0.4}>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="inline-flex items-center gap-2 bg-zapfy-mint/20 text-foreground px-6 py-3 rounded-full">
                  <span className="font-display font-semibold">
                    95% dos pais notam mudanças em menos de 1 mês
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  (Pesquisa com 847 famílias, Dez/2025)
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
