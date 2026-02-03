"use client";

import { Gamepad2, Medal, Clock } from "lucide-react";
import { SectionCarousel } from "@/components/ui/section-carousel";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";

export function BenefitsForKids() {
  const benefits = [
    {
      icon: <Gamepad2 className="w-8 h-8 text-white" />,
      title: "É Como um Videogame!",
      description:
        "Missões diárias, desafios semanais e aventuras financeiras que fazem aprender sobre dinheiro ser tão divertido quanto jogar.",
    },
    {
      icon: <Medal className="w-8 h-8 text-white" />,
      title: "Conquistas e Badges",
      description:
        "Ganhe moedas virtuais, desbloqueie conquistas e evolua seu personagem. Cada lição completa é uma vitória celebrada!",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Aprende no Seu Ritmo",
      description:
        "Lições de 5-10 minutos, perfeitas para a rotina. Seu filho aprende no horário que funcionar melhor, sem pressão.",
    },
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zapfy-coin/5 via-transparent to-primary-500/5 blur-3xl" />

      <div className="container-zapfy relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Por Que as{" "}
                  <span className="bg-gradient-to-r from-zapfy-coin to-primary-500 bg-clip-text text-transparent">
                    Crianças Amam
                  </span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg text-muted-foreground">
                  As crianças passam em média 15 minutos por dia na Zapfy —
                  e pedem para voltar. Isso é gamificação bem feita.
                </p>
              </StaggerItem>
            </StaggerContainer>

            <ScrollAnimation animation="scale" delay={0.2}>
              <SectionCarousel items={benefits} />
            </ScrollAnimation>
          </div>

          {/* Right: Visual */}
          <ScrollAnimation animation="fadeRight" delay={0.3}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary-500/20 to-zapfy-mint/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-4 z-10">
                  <div className="text-6xl">🎮</div>
                  <p className="font-display font-bold text-xl">
                    Aprenda Brincando!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Missões, desafios e recompensas
                  </p>
                </div>

                {/* Floating elements */}
                <div className="absolute top-6 right-6 float-animation">
                  <div className="bg-zapfy-coin/20 backdrop-blur-sm rounded-2xl p-3">
                    <span className="text-2xl">🪙</span>
                  </div>
                </div>
                <div
                  className="absolute bottom-8 left-6 float-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="bg-primary-500/20 backdrop-blur-sm rounded-2xl p-3">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div
                  className="absolute top-1/2 left-4 float-animation"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="bg-zapfy-mint/20 backdrop-blur-sm rounded-2xl p-3">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
