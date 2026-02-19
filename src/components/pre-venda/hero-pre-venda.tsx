"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const urgencyBadges = [
  { icon: Clock, label: "Oferta por tempo limitado" },
  { icon: Shield, label: "Garantia de 7 dias" },
  { icon: Zap, label: "Acesso imediato" },
];

export function HeroPreVenda() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-emerald-50 pt-20">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zapfy-coin/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-zapfy px-4 py-20 text-center relative z-10">
        <StaggerContainer className="space-y-6 max-w-4xl mx-auto">
          {/* Badge de urgência */}
          <StaggerItem>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 border border-amber-300 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              🔥 Pré-venda com desconto exclusivo — Vagas limitadas!
            </div>
          </StaggerItem>

          {/* Headline */}
          <StaggerItem>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Seu Filho Aprendendo{" "}
              <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                Educação Financeira
              </span>{" "}
              de Forma Divertida
            </h1>
          </StaggerItem>

          {/* Subheadline */}
          <StaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              O Zapfy usa gamificação, missões e recompensas para ensinar crianças de 7 a 14 anos
              a lidar com dinheiro — 5 minutos por dia são suficientes.
              <strong className="text-foreground"> Garanta acesso agora com preço de fundador!</strong>
            </p>
          </StaggerItem>

          {/* CTA principal */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <motion.a
                href="#preco"
                className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-10 py-4 rounded-full shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all text-lg group inline-flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Garantir Meu Acesso Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <a
                href="#preco"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium underline underline-offset-4"
              >
                Ver o preço especial ↓
              </a>
            </div>
          </StaggerItem>

          {/* Trust badges */}
          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              {urgencyBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="w-4 h-4 text-primary-500" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Emoji visual */}
        <motion.div
          className="mt-16 flex justify-center gap-8 text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {["⚡", "🏆", "💰", "🎯", "⭐"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
