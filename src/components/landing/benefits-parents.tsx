"use client";

import { Heart, Eye, GraduationCap } from "lucide-react";
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
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Momentos em Família",
      description:
        "Missões especiais para fazer junto com seu filho. Momentos de qualidade que fortalecem laços e ensinam ao mesmo tempo.",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Você Também Aprende",
      description:
        "Dicas exclusivas para pais em cada fase. Aprenda junto com seu filho e se surpreenda com os resultados.",
    },
    {
      icon: <Eye className="w-8 h-8 text-white" />,
      title: "Progresso Visível",
      description:
        "Acompanhe em tempo real o que seu filho está aprendendo. Veja a evolução semana a semana com relatórios claros.",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-primary-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-zapfy-mint/10 to-transparent rounded-full blur-2xl" />

      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                O Que os{" "}
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  Pais Ganham
                </span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Não é só seu filho que evolui. A Zapfy transforma a relação da
                família inteira com o dinheiro.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <ScrollAnimation animation="scale" delay={0.2}>
            <SectionCarousel items={benefits} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="card-zapfy text-center">
                <p className="text-3xl font-display font-bold text-primary-500">
                  93%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  dos pais dizem que aprender sobre finanças com os filhos
                  fortalece os laços familiares
                </p>
              </div>
              <div className="card-zapfy text-center">
                <p className="text-3xl font-display font-bold text-zapfy-mint">
                  95%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  dos pais notam mudanças positivas em menos de 1 mês
                </p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.4}>
            <div className="bg-gradient-to-r from-primary-500/10 to-zapfy-mint/10 rounded-2xl p-8 border border-primary-500/20">
              <p className="text-lg font-display font-semibold text-center mb-2">
                &ldquo;Depois de 3 semanas, minha filha de 10 anos perguntou se
                era melhor comprar à vista ou parcelado. Fiquei emocionada.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground text-center">
                — Paula, mãe da Ana Beatriz
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.5}>
            <Link href="/signup">
              <button className="btn-hero">
                Quero Fazer Parte Dessa Transformação
              </button>
            </Link>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
