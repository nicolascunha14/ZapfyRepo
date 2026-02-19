"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Rocket, DollarSign, Users, Medal, Lightbulb } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const includes = [
  { icon: Rocket, label: "Acesso antecipado ao app" },
  { icon: DollarSign, label: "Preço fundador congelado para sempre" },
  { icon: Users, label: "Grupo exclusivo de pais fundadores" },
  { icon: Medal, label: "Badge especial dentro do app" },
  { icon: Lightbulb, label: "Influência direta no desenvolvimento" },
];

export function PrecoPreVenda() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Erro ao iniciar o checkout");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tente novamente em instantes");
      setLoading(false);
    }
  }

  return (
    <section id="preco" className="section-padding bg-slate-50">
      <div className="container-zapfy">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-10">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Vagas limitadas
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">
              Convite exclusivo:{" "}
              <span className="text-primary-600">Turma Fundadora Zapfy</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Estamos abrindo um número limitado de vagas para os primeiros pais
              que acreditam nessa missão.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-md mx-auto">
          {/* Scarcity bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 mb-5 text-center"
          >
            <p className="text-amber-800 text-sm font-semibold">
              ⚡ Apenas 50 vagas nesta fase — já reservamos 32+
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            {/* Card header */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-8 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                TURMA FUNDADORA 2026
              </p>
              <p className="text-xs opacity-70 mb-4">
                ACESSO FUNDADOR: PAGAMENTO ÚNICO HOJE DE R$19,90
              </p>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-2xl font-bold">R$</span>
                <span className="text-6xl font-display font-bold leading-none">19</span>
                <span className="text-4xl font-display font-bold">,90</span>
              </div>
              <p className="text-white/80 text-sm">
                para garantir sua vaga na Turma Fundadora
              </p>
            </div>

            {/* After launch note */}
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-4">
              <p className="text-xs text-slate-500 text-center mb-2 font-semibold uppercase tracking-wide">
                E depois
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-700 font-medium">
                    Assinatura mensal de R$19,90 começa apenas após o
                    lançamento oficial na App Store e Google Play.
                  </p>
                </div>
                <div className="shrink-0 ml-4 text-right">
                  <p className="text-lg font-display font-bold text-slate-900">
                    R$ 19,90<span className="text-sm font-normal text-slate-500">/mês</span>
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    🔒 Preço congelado para sempre
                  </p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="px-8 py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                O que está incluído
              </p>
              <div className="space-y-3">
                {includes.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8 space-y-3">
              {error && (
                <p className="text-center text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">
                  {error}
                </p>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition"
              />

              <motion.button
                onClick={handleBuy}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecionando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Quero garantir minha vaga
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </motion.button>

              <p className="text-center text-xs text-slate-400 leading-relaxed">
                Você não será cobrado mensalmente até o lançamento oficial.
              </p>
              <p className="text-center text-xs text-slate-400 leading-relaxed">
                Cobrança recorrente de R$19,90/mês começa somente após o
                lançamento oficial na App Store e Google Play. Cancele quando
                quiser.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
