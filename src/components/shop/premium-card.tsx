"use client";

import { Crown, Check, Sparkles } from "lucide-react";

const PREMIUM_BENEFITS = [
  "Borda dourada no perfil",
  "Badge exclusivo Premium",
  "Acesso temporário a todos os temas",
  "XP bônus em missões (+20%)",
];

export function PremiumCard({
  name,
  description,
  icon,
  price,
  durationDays,
  onBuy,
  canAfford,
  loading,
  isPremium,
  expiresAt,
}: {
  name: string;
  description: string | null;
  icon: string | null;
  price: number;
  durationDays: number;
  onBuy: () => void;
  canAfford: boolean;
  loading: boolean;
  isPremium: boolean;
  expiresAt: string | null;
}) {
  const daysRemaining = expiresAt
    ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-amber-100 rounded-xl p-2.5">
          <Crown size={22} className="text-amber-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-amber-900">{name}</h3>
            <span className="text-lg">{icon}</span>
          </div>
          {description && (
            <p className="text-xs text-amber-700/70">{description}</p>
          )}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-4">
        {PREMIUM_BENEFITS.map((benefit) => (
          <div key={benefit} className="flex items-center gap-2">
            <div className="bg-amber-200 rounded-full p-0.5">
              <Check size={10} className="text-amber-700" />
            </div>
            <span className="text-xs text-amber-800">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Status / Action */}
      {isPremium && daysRemaining > 0 ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-xs font-bold text-amber-700">
              Premium ativo — {daysRemaining} {daysRemaining === 1 ? "dia" : "dias"} restante{daysRemaining !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={onBuy}
            disabled={!canAfford || loading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-display font-bold transition-colors cursor-pointer ${
              canAfford
                ? "bg-amber-200 text-amber-800 hover:bg-amber-300"
                : "bg-amber-100 text-amber-500 opacity-60"
            }`}
          >
            Estender
          </button>
        </div>
      ) : (
        <button
          onClick={onBuy}
          disabled={!canAfford || loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-sm transition-colors cursor-pointer ${
            canAfford
              ? "bg-amber-400 text-white hover:bg-amber-500 shadow-sm"
              : "bg-amber-200 text-amber-500 opacity-60"
          }`}
        >
          <span>🪙</span>
          {price} Zapcoins — {durationDays} dias
        </button>
      )}
    </div>
  );
}
