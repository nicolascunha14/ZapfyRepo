"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="section-padding bg-slate-900">
      <div className="container-zapfy max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            A escola não ensina como usar dinheiro na vida real.
          </p>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            A maioria das pessoas só aprende depois de errar.
          </p>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Seu filho vai aprender sobre dinheiro na vida.
          </p>

          <p className="text-2xl md:text-3xl font-display font-bold text-primary-400 leading-snug pt-2">
            A pergunta é: antes ou depois de sofrer com isso?
          </p>

          <p className="text-slate-400 text-lg max-w-xl mx-auto pt-2">
            A Zapfy existe para mudar isso — começando cedo, de forma
            divertida, dentro da família.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
