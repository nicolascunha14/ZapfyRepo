"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export function FaqPreVenda() {
  async function handleBuy() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <section className="section-padding bg-slate-900">
      <div className="container-zapfy max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Educação financeira{" "}
            <span className="text-primary-400">começa agora.</span>
          </h2>
          <p className="text-slate-400 text-xl">
            Antes que a vida ensine do jeito difícil.
          </p>

          <div className="flex flex-col items-center gap-4 pt-4">
            <motion.button
              onClick={handleBuy}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Garantir minha vaga — R$19,90 hoje
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="flex items-center gap-1.5 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              Acesso antecipado previsto para Março 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
