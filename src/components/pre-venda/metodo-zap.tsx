"use client";

import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const cards = [
  {
    emoji: "⚡",
    title: "Missões no mundo real",
    description:
      "Desafios práticos que acontecem fora do app — no mercado, em casa, na vida.",
  },
  {
    emoji: "👥",
    title: "Participação ativa dos pais",
    description:
      "Você faz parte da jornada, sem precisar dar aula ou ser especialista.",
  },
  {
    emoji: "🏆",
    title: "Sistema gamificado",
    description:
      "Pontos, níveis e recompensas que mantêm seu filho engajado semana após semana.",
  },
];

export function MetodoZap() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Método ZAP™
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Aprender fazendo.{" "}
              <span className="text-primary-600">Em família.</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Não é mais uma aula chata. É aprendizado real, no mundo real.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center hover:border-primary-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="font-display font-bold text-slate-900 mb-2 text-lg">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
