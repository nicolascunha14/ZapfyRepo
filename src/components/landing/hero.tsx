"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ParticlesBackground } from "@/components/ui/particles-background";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const descY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      <AuroraBackground className="min-h-screen relative overflow-hidden">
        <ParticlesBackground particleCount={50} className="z-10" />

        <div className="container-zapfy section-padding relative z-20 pt-24">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            style={{ opacity }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-center gap-2 text-primary-500 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ y: subtitleY }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-display font-semibold text-sm uppercase tracking-wide">
                    Educação Financeira que Transforma
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl lg:text-8xl font-display font-bold leading-tight text-center tracking-tight mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                  style={{ y: titleY }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    Seu Filho Vai Pedir
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-foreground/90 to-zapfy-mint">
                    Pra Aprender Sobre Dinheiro
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  style={{ y: descY }}
                >
                  Missões práticas de 5 minutos que você faz COM seu filho.
                  Aprende finanças brincando. Sem você virar professor.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ y: buttonY }}
              >
                <Link href="/signup">
                  <motion.button
                    className="btn-hero group flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Começar Grátis Agora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-zapfy-mint">✓</span> Sem cartão de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-zapfy-mint">✓</span> Primeira missão em 2 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-zapfy-mint">✓</span> Funciona em qualquer celular
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-zapfy-mint rounded-full animate-pulse" />
                  <span>10.347 famílias já começaram</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-zapfy-coin rounded-full animate-pulse" />
                  <span>Usado em 234 escolas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                  <span>Crianças de 7 a 15 anos</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ opacity }}
        >
          <span className="text-xs text-muted-foreground font-medium">
            Role para explorar
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary-500 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
