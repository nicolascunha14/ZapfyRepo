"use client";

import { Star, Users, Award } from "lucide-react";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";
import Link from "next/link";

const stats = [
  { icon: Users, value: "500+", label: "Famílias Ativas" },
  { icon: Star, value: "4.9", label: "Avaliação Média" },
  { icon: Award, value: "95%", label: "Taxa de Conclusão" },
];

const features = [
  "Jogos interativos de economia e investimento",
  "Sistema de recompensas com moedas virtuais",
  "Lições personalizadas por faixa etária",
  "Relatórios de progresso para os pais",
];

export function Demo() {
  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      <div className="container-zapfy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: App mockup */}
          <ScrollAnimation animation="fadeLeft">
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 to-zapfy-mint rounded-3xl shadow-[var(--shadow-floating)] flex items-center justify-center overflow-hidden relative">
                <div className="text-center text-white z-10">
                  <div className="text-5xl mb-4">📱</div>
                  <p className="font-display font-bold text-2xl">
                    Interface Zapfy
                  </p>
                  <p className="text-white/80 text-sm mt-2">
                    Gamificada e intuitiva
                  </p>
                </div>

                {/* Floating cards */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg float-animation">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zapfy-coin/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🏅</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        Nível Poupador
                      </p>
                      <p className="text-[10px] text-gray-500">Desbloqueado!</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg float-animation"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zapfy-mint/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🪙</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        +50 moedas
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Missão completa
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
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Interface Intuitiva e{" "}
                  <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                    Gamificada
                  </span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-muted-foreground text-lg">
                  Cada detalhe foi pensado para engajar e ensinar. Veja como a
                  Zapfy transforma conceitos financeiros em experiências
                  memoráveis.
                </p>
              </StaggerItem>
            </StaggerContainer>

            <ScrollAnimation animation="fadeUp" delay={0.2}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-display font-bold">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.3}>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-zapfy-mint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-zapfy-mint" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.4}>
              <Link href="/signup">
                <button className="btn-secondary">Quero Experimentar</button>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
