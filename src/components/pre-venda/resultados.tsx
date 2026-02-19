"use client";

import { CheckCircle } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const results = [
  {
    title: "Entender a diferença entre querer e precisar",
    subtitle: "Consciência financeira desde cedo",
  },
  {
    title: "Aprender a poupar para objetivos",
    subtitle: "Com metas reais e conquistas dentro do app",
  },
  {
    title: "Entender como o dinheiro funciona",
    subtitle: "De onde vem, para onde vai, como cresce",
  },
  {
    title: "Desenvolver noções de responsabilidade",
    subtitle: "Decisões com consequências reais e seguras",
  },
];

export function Resultados() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy max-w-2xl mx-auto">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">
              Em{" "}
              <span className="text-primary-600">12 semanas</span>{" "}
              seu filho vai:
            </h2>
            <p className="text-slate-500 text-lg">
              Resultados concretos, não promessas vagas.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="space-y-4">
          {results.map((result) => (
            <StaggerItem key={result.title}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-primary-200 transition-colors">
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-slate-900">
                    {result.title}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {result.subtitle}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
