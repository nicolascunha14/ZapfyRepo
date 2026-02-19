"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Seu filho recebe missões práticas",
    description:
      "Missões curtas, interativas e adaptadas para 6–9 anos. Conteúdo prático, não teórico.",
  },
  {
    number: "02",
    title: "Vocês realizam juntos — no app e no mundo real",
    description:
      "Desafios semanais que acontecem fora da tela, com a família participando ativamente.",
  },
  {
    number: "03",
    title: "Ele evolui dentro do app",
    description:
      "Sistema de níveis, recompensas e progresso que mantém a criança motivada.",
  },
];

export function ComoFunciona() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-zapfy max-w-2xl mx-auto">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">
              Como funciona?
            </h2>
            <p className="text-slate-500 text-lg">Simples, rápido e eficaz.</p>
          </div>
        </ScrollAnimation>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary-600 text-white font-display font-bold text-sm flex items-center justify-center">
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-slate-900 text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
