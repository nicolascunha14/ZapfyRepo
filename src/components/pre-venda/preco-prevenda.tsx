"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const features = [
  "Acesso vitalício à plataforma",
  "Conteúdo para 3 faixas etárias",
  "Painel parental completo",
  "Módulo Fundador (bônus exclusivo)",
  "Atualizações sem custo adicional",
  "Suporte por e-mail prioritário",
  "Múltiplos perfis de filhos",
  "Garantia de 7 dias",
];

export function PrecoPreVenda() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Erro ao iniciar o checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tente novamente em instantes");
      setLoading(false);
    }
  }

  return (
    <section id="preco" className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-zapfy">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-10">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              ⏰ Preço de fundador — por tempo limitado
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Invista no futuro financeiro do seu filho
            </h2>
          </div>
        </ScrollAnimation>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border-2 border-primary-200 shadow-xl shadow-primary-100/50 overflow-hidden"
          >
            {/* Card header */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-8 py-8 text-center text-white">
              <div className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                🏅 Acesso Fundador
              </div>
              <div className="flex items-end justify-center gap-1">
                <span className="text-2xl font-bold">R$</span>
                <span className="text-6xl font-display font-bold leading-none">19</span>
                <span className="text-4xl font-display font-bold">,90</span>
              </div>
              <p className="text-white/80 text-sm">pagamento único</p>
              <p className="text-white/80 text-sm mt-2">Pagamento único — sem mensalidade</p>
            </div>

            {/* Features list */}
            <div className="px-8 py-6 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-8 pb-8 space-y-4">
              {error && (
                <p className="text-center text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">
                  {error}
                </p>
              )}

              <motion.button
                onClick={handleBuy}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
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
                    Comprar Agora — R$ 19,90
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Pagamento seguro via Stripe · Garantia de 7 dias · Acesso imediato</span>
              </div>
            </div>
          </motion.div>

          {/* Social proof */}
          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                "Minha filha adora as missões! Em 2 semanas ela já entendeu o conceito de poupar." —{" "}
                <span className="font-medium text-foreground">Ana, mãe de 8 anos</span>
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
