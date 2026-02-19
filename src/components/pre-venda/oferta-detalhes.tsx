"use client";

import { CheckCircle, BookOpen, Trophy, Users, Zap, Star, Lock } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const includes = [
  {
    icon: BookOpen,
    color: "text-primary-500",
    bg: "bg-primary-100",
    title: "27+ capítulos de conteúdo",
    description: "Missões educativas para 3 faixas etárias: 7-9, 10-12 e 13-15 anos",
  },
  {
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-100",
    title: "Sistema completo de gamificação",
    description: "XP, Zapcoins, badges, ranking e recompensas que mantêm as crianças engajadas",
  },
  {
    icon: Users,
    color: "text-emerald-500",
    bg: "bg-emerald-100",
    title: "Painel para pais",
    description: "Acompanhe o progresso, conquistas e evolução do seu filho em tempo real",
  },
  {
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-100",
    title: "Missões práticas em família",
    description: "O Módulo Fundador: 10 missões para praticar finanças no mundo real juntos",
  },
  {
    icon: Star,
    color: "text-rose-500",
    bg: "bg-rose-100",
    title: "Atualizações vitalícias",
    description: "Novos capítulos, missões e funcionalidades incluídos sem custo adicional",
  },
  {
    icon: Lock,
    color: "text-slate-500",
    bg: "bg-slate-100",
    title: "Acesso para múltiplos filhos",
    description: "Cadastre todos os seus filhos em uma única conta familiar",
  },
];

export function OfertaDetalhes() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-primary-100 text-primary-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              O que está incluso
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Tudo que você precisa para educar seu filho financeiramente
            </h2>
            <p className="text-muted-foreground text-lg">
              Uma plataforma completa, desenvolvida por especialistas em educação financeira e gamificação infantil.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {includes.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex gap-4 p-6 rounded-2xl border border-border/60 hover:border-primary-200 hover:shadow-md transition-all bg-white group">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bonus card */}
        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <div className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8 text-center">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Bônus Exclusivo para Fundadores
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Os primeiros compradores da pré-venda recebem acesso ao <strong>Módulo Fundador — Jornada Prática em Família</strong>,
              com 10 missões em família para praticar educação financeira no mundo real.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {[
                "De Onde Vem o Dinheiro?",
                "Regra dos 3 Potes",
                "Meu Primeiro Objetivo",
                "+7 missões exclusivas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 bg-white border border-amber-200 px-3 py-1.5 rounded-full text-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
