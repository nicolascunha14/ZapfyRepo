"use client";

import { Star, Users, Award } from "lucide-react";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";
import Link from "next/link";

const stats = [
  { icon: Users, value: "10.347", label: "Famílias Ativas" },
  { icon: Star, value: "4.9/5", label: "Avaliação" },
  { icon: Award, value: "95%", label: "Completam 1ª Missão" },
];

const features = [
  "Missões práticas que usa na vida real (ex: calcular troco)",
  "Ganha pontos e badges (igual videogame)",
  "Conteúdo certo para idade do SEU filho (7-15 anos)",
  "Você vê o que ele aprendeu (dashboard atualizado)",
];

export function Demo() {
  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      <div className="container-zapfy">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="text-center space-y-6 mb-16">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                É Assim Que{" "}
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  Seu Filho Vai Aprender
                </span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interface igual a jogos que seu filho já conhece.
                <br />
                Mas em vez de apenas jogar, ele aprende finanças de verdade.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: App mockup */}
            <ScrollAnimation animation="fadeLeft">
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 to-zapfy-mint rounded-3xl shadow-[var(--shadow-floating)] flex items-center justify-center overflow-hidden relative hover:scale-105 transition-transform">
                  <div className="text-center text-white z-10">
                    <div className="text-5xl mb-4">📱</div>
                    <p className="font-display font-bold text-2xl">
                      Interface Zapfy
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      Gamificada e intuitiva
                    </p>
                  </div>

                  {/* Floating achievement */}
                  <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-bounce">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-zapfy-coin/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm">🏆</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          Conquista!
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Nível Poupador
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating coins */}
                  <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg float-animation">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">💰</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          + 50 moedas
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Lição completa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right: Content */}
            <div className="space-y-8">
              <StaggerContainer className="space-y-4">
                <StaggerItem>
                  <h3 className="text-2xl font-display font-bold">
                    Interface Igual a Um Jogo
                  </h3>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <span>✨</span> Colorido, intuitivo, divertido
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🎯</span> Navegação simples (criança usa sozinha)
                    </p>
                    <p className="flex items-center gap-2">
                      <span>💰</span> Moedas, badges, ranking
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📊</span> Dashboard de progresso (para pais)
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg font-display font-semibold text-primary-500">
                    Parece Duolingo, mas para dinheiro.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <ScrollAnimation animation="fadeUp" delay={0.2}>
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-zapfy-mint rounded-xl flex items-center justify-center mx-auto">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-display font-bold text-primary-500">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={0.3}>
                <div className="space-y-4">
                  <h4 className="font-display font-semibold">
                    Principais Recursos:
                  </h4>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-zapfy-mint rounded-full" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={0.4}>
                <Link href="/signup">
                  <button className="btn-hero group w-full sm:w-auto flex items-center justify-center">
                    Quero Ver Meu Filho Usando
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </Link>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
