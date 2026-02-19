"use client";

import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function OfertaDetalhes() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-zapfy max-w-4xl mx-auto">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Preview exclusivo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Veja a Zapfy{" "}
              <span className="text-primary-600">em ação</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Missões práticas, sistema de níveis e recompensas — tudo dentro de
              um app pensado para crianças de 6 a 9 anos.
            </p>
          </div>
        </ScrollAnimation>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-64 md:w-72">
            {/* Phone frame */}
            <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Status bar */}
                <div className="bg-primary-600 px-5 pt-3 pb-6 text-white">
                  <div className="flex items-center justify-between text-xs mb-3 opacity-70">
                    <span>9:41</span>
                    <span>●●●</span>
                  </div>
                  <p className="text-xs font-semibold opacity-80 mb-1">Olá, Lucas! 👋</p>
                  <p className="text-xl font-display font-bold">Missão do dia</p>
                </div>

                {/* App content */}
                <div className="px-4 py-4 space-y-3">
                  {/* XP bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Nível 3 — Poupador</span>
                      <span>240 XP</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 bg-primary-500 rounded-full w-3/5" />
                    </div>
                  </div>

                  {/* Mission card */}
                  <div className="bg-primary-50 border border-primary-100 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⚡</span>
                      <span className="text-xs font-bold text-primary-700 uppercase tracking-wide">Missão em família</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      Regra dos 3 Potes
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Junto com seus pais, divida R$10 nos potes: gastar, poupar e doar.</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">+150 XP</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">+10 🪙</span>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex gap-2">
                    {["🏅", "⭐", "🎯"].map((emoji) => (
                      <div key={emoji} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2 text-center text-xl">
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
