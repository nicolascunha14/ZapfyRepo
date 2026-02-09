"use client";

import { Gamepad2, Gift, Clock } from "lucide-react";
import { SectionCarousel } from "@/components/ui/section-carousel";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";

export function BenefitsForKids() {
  const benefits = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      title: "É Como um Videogame!",
      description:
        'Missões progressivas (do fácil ao desafiante). Desafios com tempo limite. Conquistas desbloqueáveis. Exemplo: "Economize R$50 em 30 dias"',
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: "Conquistas e Badges",
      description:
        'Cada missão completada = pontos + badge. Sequência de dias (streak): "7 dias seguidos!" Badges especiais: "Investidor Junior". Motivação natural. Sem forçar.',
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Aprende no Seu Ritmo",
      description:
        "Cada missão = 5 minutos. Faz quando quiser (sem pressão). 3 níveis de dificuldade (7-9, 10-12, 13-15 anos). Aprende brincando. Sem perceber.",
    },
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-zapfy-coin/5 via-transparent to-primary-500/5 blur-2xl" />
      <div className="absolute top-1/3 right-0 w-40 h-40 bg-gradient-to-l from-zapfy-mint/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-28 h-28 bg-gradient-to-r from-primary-500/8 to-transparent rounded-full blur-2xl float-animation" />

      <div className="container-zapfy relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <StaggerContainer className="space-y-6 text-center">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  Parece Jogo.
                </span>{" "}
                É Educação Financeira de Verdade.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Missões como: &quot;Calcule o troco na padaria&quot;
                <br />
                Badges como: &quot;Mestre do Orçamento&quot;
                <br />
                Ranking: Compete com amigos (quem economiza mais?)
                <br />
                <br />
                É tão divertido que seu filho pede para fazer mais.
                <br />E aprende finanças de verdade enquanto joga.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <ScrollAnimation animation="scale">
            <SectionCarousel items={benefits} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <div className="bg-gradient-to-r from-primary-500/10 to-zapfy-mint/10 rounded-2xl p-6 border border-primary-500/20 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-display font-semibold text-primary-500">
                  Crianças ficam 15 minutos por dia no Zapfy
                </span>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">Compare:</p>
                <p>TikTok = 52 minutos/dia de entretenimento</p>
                <p>
                  <strong>Zapfy = 15 minutos/dia de aprendizado real</strong>
                </p>
                <p className="mt-3 font-semibold text-primary-500">
                  E ELE pede para fazer mais.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
