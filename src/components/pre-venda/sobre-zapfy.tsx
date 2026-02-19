"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function SobreZapfy() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy max-w-2xl mx-auto text-center">
        <ScrollAnimation animation="fadeUp">
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Nossa missão
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
            Quem é a{" "}
            <span className="text-primary-600">Zapfy</span>?
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-4">
            A Zapfy está sendo construída com um objetivo simples: ensinar
            crianças a lidar com dinheiro antes que o mundo ensine da forma
            difícil.
          </p>
          <p className="text-slate-500 text-lg leading-relaxed">
            Estamos começando com um grupo pequeno de pais fundadores que
            acreditam nessa missão.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
