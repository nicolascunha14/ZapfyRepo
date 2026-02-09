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
          <div className="absolute top-20 right-1/4 w-12 h-12 bg-zapfy-coin/20 rounded-full blur-sm animate-pulse" />
          <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-zapfy-mint/20 rounded-full float-animation" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <StaggerContainer className="space-y-4">
              <StaggerItem>
                <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Transforme o Futuro Financeiro do Seu Filho
                  </span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                  Está na Hora de{" "}
                  <span className="text-zapfy-coin">Transformar</span> o Futuro!
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-white/90">
                  Junte-se a mais de 10.000 famílias que já deram o primeiro
                  passo para criar filhos financeiramente conscientes, preparados
                  e confiantes. A jornada começa agora!
                </p>
              </StaggerItem>
            </StaggerContainer>

            <ScrollAnimation animation="fadeUp" delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-left"
                  >
                    <CheckCircle className="w-5 h-5 text-zapfy-coin flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={0.3}>
              <div className="space-y-6">
                <Link href="/signup">
                  <button className="relative overflow-hidden bg-white text-primary-500 font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group">
                    <span className="relative z-10 flex items-center justify-center">
                      Começar Agora Gratuitamente
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-zapfy-coin rounded-full animate-pulse" />
                    <span className="text-white">Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white">Sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-zapfy-coin rounded-full animate-pulse" />
                    <span className="text-white">Comece grátis</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={0.4}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-zapfy-coin" />
                  <h3 className="font-display font-bold text-white text-lg">
                    Bônus Exclusivo de Lançamento
                  </h3>
                </div>
                <p className="text-sm text-white/90">
                  As primeiras <strong>100 famílias</strong> ganham acesso
                  vitalício ao conteúdo premium + sessão de orientação com
                  especialista em educação financeira infantil (valor R$ 297)
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
