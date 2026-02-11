"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  X,
  Sparkles,
  Shield,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  Gift,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

type Feature = {
  label: string;
  free: boolean | string;
  premium: boolean | string;
  icon: React.ElementType;
};

const FEATURES: Feature[] = [
  {
    label: "Missões básicas",
    free: true,
    premium: true,
    icon: BookOpen,
  },
  {
    label: "Sistema de pontos e níveis",
    free: true,
    premium: true,
    icon: Star,
  },
  {
    label: "Bônus diário (streak)",
    free: true,
    premium: true,
    icon: Zap,
  },
  {
    label: "Ranking global",
    free: true,
    premium: true,
    icon: Users,
  },
  {
    label: "Missões por faixa etária",
    free: "1 faixa",
    premium: "Todas",
    icon: BookOpen,
  },
  {
    label: "Painel dos pais (gráficos)",
    free: "Básico",
    premium: "Completo",
    icon: BarChart3,
  },
  {
    label: "Badges exclusivos",
    free: false,
    premium: true,
    icon: Crown,
  },
  {
    label: "Missões avançadas",
    free: false,
    premium: true,
    icon: Sparkles,
  },
  {
    label: "Conteúdo novo semanal",
    free: false,
    premium: true,
    icon: Gift,
  },
  {
    label: "Suporte prioritário",
    free: false,
    premium: true,
    icon: Shield,
  },
];

function FeatureCheck({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check size={16} className="text-emerald-500 mx-auto" />;
  if (value === false)
    return <X size={16} className="text-gray-300 mx-auto" />;
  return (
    <span className="text-xs font-medium text-muted-foreground">{value}</span>
  );
}

const STRIPE_URL = "https://buy.stripe.com/test_bJe4gBfxJ8Ml3Zd4c09k400";

export function PremiumPricing() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.is_anonymous || user?.user_metadata?.is_guest) {
        setIsGuest(true);
      }
    });
  }, []);

  function handleSubscribeClick(e: React.MouseEvent) {
    if (isGuest) {
      e.preventDefault();
      router.push("/signup?redirect=/premium");
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-lg ring-4 ring-amber-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        >
          <Crown size={36} className="text-amber-700" />
        </motion.div>
        <h2 className="font-display font-bold text-2xl text-foreground">
          Invista no futuro do seu filho
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Com o Zapfy Premium, seu filho tem acesso a todas as faixas etárias,
          missões avançadas e conteúdo novo toda semana.
        </p>
      </motion.div>

      {/* Pricing cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Free plan */}
        <Card>
          <CardContent className="pt-6 pb-6 space-y-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                Gratuito
              </p>
              <p className="text-4xl font-display font-bold mt-2">R$ 0</p>
              <p className="text-sm text-muted-foreground">Para sempre</p>
            </div>
            <ul className="space-y-2.5">
              {FEATURES.filter((f) => f.free).map((f) => (
                <li key={f.label} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>
                    {f.label}
                    {typeof f.free === "string" && (
                      <span className="text-muted-foreground">
                        {" "}
                        ({f.free})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center w-full rounded-xl bg-muted px-4 py-3 text-muted-foreground font-display font-semibold text-sm">
              Plano Atual
            </div>
          </CardContent>
        </Card>

        {/* Premium plan */}
        <Card className="border-amber-300 ring-2 ring-amber-200 relative overflow-hidden">
          {/* Popular badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl">
            POPULAR
          </div>

          <CardContent className="pt-6 pb-6 space-y-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-amber-600 font-bold flex items-center justify-center gap-1">
                <Crown size={12} />
                Premium
              </p>
              <div className="mt-2">
                <p className="text-4xl font-display font-bold text-foreground">
                  R$ 19
                  <span className="text-xl">,90</span>
                </p>
                <p className="text-sm text-muted-foreground">por mês</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-amber-500 shrink-0" />
                  <span className="font-medium">
                    {f.label}
                    {typeof f.premium === "string" && (
                      <span className="text-amber-600">
                        {" "}
                        ({f.premium})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_URL}
              onClick={handleSubscribeClick}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-3
                         text-white font-display font-bold text-sm hover:opacity-90 transition-all cursor-pointer shadow-md shadow-amber-200"
            >
              <Sparkles size={16} />
              {isGuest ? "Criar conta e Assinar" : "Assinar Premium"}
            </a>
            <p className="text-[10px] text-center text-muted-foreground">
              Cancele quando quiser. Sem compromisso.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <h3 className="font-display font-bold text-lg mb-4 text-center">
          Comparação de Planos
        </h3>
        <Card>
          <CardContent className="pt-4 pb-4 px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Recurso
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground w-24">
                      Grátis
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-amber-600 w-24">
                      <span className="flex items-center justify-center gap-1">
                        <Crown size={12} />
                        Premium
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <tr
                        key={f.label}
                        className={
                          i < FEATURES.length - 1
                            ? "border-b border-border/30"
                            : ""
                        }
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Icon
                              size={14}
                              className="text-muted-foreground shrink-0"
                            />
                            <span>{f.label}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <FeatureCheck value={f.free} />
                        </td>
                        <td className="py-3 px-4 text-center bg-amber-50/50">
                          <FeatureCheck value={f.premium} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust signals */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground max-w-lg mx-auto"
      >
        <div className="flex items-center gap-1.5">
          <Shield size={14} className="text-emerald-500" />
          Pagamento seguro
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-primary-500" />
          Ativação imediata
        </div>
        <div className="flex items-center gap-1.5">
          <Gift size={14} className="text-amber-500" />
          7 dias grátis
        </div>
      </motion.div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
                <Crown size={28} className="text-amber-500" />
              </div>
              <h3 className="font-display font-bold text-lg">
                Assinar Zapfy Premium
              </h3>
              <p className="text-sm text-muted-foreground">
                R$ 19,90/mês com 7 dias grátis para testar.
                Cancele quando quiser.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-700 space-y-1">
              <p className="font-semibold">O que você ganha:</p>
              <ul className="space-y-0.5">
                <li>• Todas as faixas etárias desbloqueadas</li>
                <li>• Missões avançadas e conteúdo semanal</li>
                <li>• Painel dos pais completo</li>
                <li>• Badges exclusivos</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isGuest) {
                  router.push("/signup?redirect=/premium");
                  return;
                }
                window.location.href = STRIPE_URL;
              }}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-3
                         text-white font-display font-bold text-sm hover:opacity-90 transition-all cursor-pointer"
            >
              <Sparkles size={16} />
              Começar 7 dias grátis
            </button>

            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Agora não
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
