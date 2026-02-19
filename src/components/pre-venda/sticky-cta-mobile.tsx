"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export function StickyCtaMobile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Erro ao iniciar o checkout");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tente novamente em instantes");
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-border/50 md:hidden">
      {error && <p className="text-center text-xs text-red-500 mb-2">{error}</p>}
      <motion.button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-display font-bold px-6 py-3.5 rounded-2xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm"
        whileTap={!loading ? { scale: 0.97 } : {}}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecionando...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Garantir Acesso — R$ 19,90
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </motion.button>
      <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-muted-foreground">
        <ShieldCheck className="w-3 h-3 text-emerald-500" />
        <span>Pagamento seguro · Garantia de 7 dias</span>
      </div>
    </div>
  );
}
