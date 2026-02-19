"use client";

import { motion } from "framer-motion";

export function SocialProofSection() {
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
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 text-2xl">
            {["★", "★", "★", "★", "★"].map((star, i) => (
              <span key={i} className="text-amber-400">{star}</span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl text-white font-display font-semibold leading-relaxed">
            "Criado por pais que queriam que seus filhos aprendessem sobre
            dinheiro antes de cometer os mesmos erros que nós cometemos."
          </blockquote>

          {/* Body */}
          <p className="text-slate-400 leading-relaxed text-lg">
            A Zapfy surgiu como solução a uma dor que segue na vida dos
            brasileiros há anos. Vimos nossos próprios filhos crescerem sem
            saber o valor do dinheiro — e decidimos fazer algo sobre isso.
            Estamos aqui para fazer a mudança.
          </p>

          {/* Social badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-5 py-2.5 rounded-full">
            <span>💰🌟</span>
            <span className="text-slate-300 text-sm font-medium">
              +30 pais já demonstraram interesse no acesso antecipado
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
