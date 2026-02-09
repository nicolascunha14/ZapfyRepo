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
        'Não é teoria abstrata: "o que são juros compostos?" É prática do dia a dia: "quanto custa seu lanche favorito?" Aprende fazendo. Usa no mesmo dia.',
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Ambiente Seguro",
      description:
        "Zero riscos. Zero exposição. Sem cartões reais, sem compras, sem dados bancários. Apenas diversão educativa com total controle dos pais.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Resultados Reais",
      description:
        'Em 2 semanas, você vai notar: "Quanto falta para comprar aquilo?" "Isso vale o preço que custa?" Menos birra, mais consciência.',
    },
  ];

  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
                Você quer ensinar seu filho sobre dinheiro, mas não sabe como
                começar.
                <br />
                <br />
                Nós também não sabíamos. Por isso criamos a Zapfy: uma solução
                simples, divertida e que realmente funciona — testada com
                centenas de famílias reais.
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
              <p className="text-lg font-display font-semibold text-center mb-2 italic">
                &quot;Meu filho de 9 anos me perguntou se o brinquedo &apos;valia
                mesmo R$80&apos;. Nunca pensei que seria TÃO rápido.&quot;
              </p>
              <p className="text-sm text-muted-foreground text-center">
                — Mariana, mãe do Lucas (9 anos)
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <div className="text-center">
              <button onClick={scrollToDemo} className="btn-outline-zapfy">
                Veja Como Funciona
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
