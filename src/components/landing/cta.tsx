"use client";

import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";
import Link from "next/link";

const benefits = [
  "100% digital e gamificado",
  "Funciona em qualquer dispositivo",
  "Primeiras lições grátis",
  "Cancele quando quiser",
];

export function Cta() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-zapfy">
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl px-6 py-16 md:py-20 text-center overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-4 left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-6 right-12 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <StaggerContainer className="space-y-4">
              <StaggerItem>
                <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Transforme o Futuro
                  </span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                  Pronto para Transformar o Futuro Financeiro do Seu Filho?
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-primary-100 text-lg">
                  Comece gratuitamente e veja a diferença em poucas semanas.
                </p>
              </StaggerItem>
            </StaggerContainer>

            <ScrollAnimation animation="fadeUp" delay={0.2}>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-white/90 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-zapfy-coin flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.3}>
              <Link href="/signup">
                <button className="btn-secondary group inline-flex items-center">
                  Começar Agora Gratuitamente
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/60">
                <span>Acesso imediato</span>
                <span className="hidden sm:block">•</span>
                <span>Sem compromisso</span>
                <span className="hidden sm:block">•</span>
                <span>Comece grátis</span>
              </div>
            </ScrollAnimation>

            {/* Bonus box */}
            <ScrollAnimation animation="scale" delay={0.5}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-zapfy-coin" />
                  <h3 className="font-display font-bold text-white text-lg">
                    Bônus Exclusivo de Lançamento
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Para as primeiras 100 famílias: acesso premium vitalício +
                  consultoria com especialista em educação financeira infantil.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
