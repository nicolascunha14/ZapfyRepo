"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export function HeroPreVenda() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white pt-24 pb-20">
      <div className="container-zapfy px-4 text-center relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            ✦ Turma Fundadora 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-6"
        >
          Seu filho pode aprender a lidar com dinheiro{" "}
          <span className="text-primary-600">no mundo real</span>{" "}
          — antes dos 10 anos.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A Zapfy é um app com missões práticas em família.{" "}
          <strong className="text-slate-700">A Turma Fundadora</strong> terá
          acesso antecipado nas próximas semanas.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.a
            href="#preco"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Garantir vaga na Turma Fundadora
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            Acesso antecipado previsto para Março 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
