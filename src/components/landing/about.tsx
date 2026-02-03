"use client";

import { BookOpen, Shield, Trophy } from "lucide-react";
import { SectionCarousel } from "@/components/ui/section-carousel";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";

export function About() {
  const sections = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Educação Prática",
      description:
        "Conceitos financeiros reais traduzidos para a linguagem das crianças. Sem termos complicados, só aprendizado que fica pra vida.",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Ambiente Seguro",
      description:
        "Seu filho aprende sem riscos: sem cartões reais, sem compras, sem exposição. Apenas diversão educativa com total controle dos pais.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Resultados Reais",
      description:
        "Em 30 dias, você verá mudanças: crianças fazendo perguntas inteligentes sobre dinheiro e tomando decisões mais conscientes.",
    },
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-zapfy-mint/5 blur-3xl" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-primary-500/10 to-transparent rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-zapfy-mint/10 to-transparent rounded-full blur-xl pulse-slow" />

      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Criado por{" "}
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  Pais, para Pais
                </span>
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Sabemos que você quer ensinar seu filho sobre dinheiro, mas não
                sabe por onde começar. A Zapfy nasceu dessa mesma dor: pais que
                queriam preparar seus filhos para o futuro financeiro, mas
                encontravam apenas conteúdo chato e inacessível. Criamos uma
                solução simples, divertida e que realmente funciona — construída
                ouvindo centenas de famílias reais como a sua.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <ScrollAnimation animation="scale" delay={0.2}>
            <SectionCarousel items={sections} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.3}>
            <div className="bg-gradient-to-r from-primary-500/10 to-zapfy-mint/10 rounded-2xl p-8 border border-primary-500/20">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-zapfy-mint rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-zapfy-coin rounded-full animate-pulse" />
              </div>
              <p className="text-lg font-display font-semibold text-center mb-2">
                &ldquo;Finalmente encontrei algo que meu filho QUER
                fazer!&rdquo;
              </p>
              <p className="text-sm text-muted-foreground text-center">
                — Mariana, mãe de Lucas (9 anos) e Sofia (12 anos)
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
