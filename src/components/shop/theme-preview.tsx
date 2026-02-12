"use client";

import { Check } from "lucide-react";
import type { ThemeColors } from "@/lib/types";

export function ThemePreview({
  name,
  icon,
  colors,
  isOwned,
  isActive,
  price,
  onSelect,
  onBuy,
  canAfford,
}: {
  name: string;
  icon: string;
  colors: ThemeColors;
  isOwned: boolean;
  isActive: boolean;
  price: number;
  onSelect: () => void;
  onBuy: () => void;
  canAfford: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border-2 p-4 transition-all ${
        isActive
          ? "border-primary-500 ring-2 ring-primary-200 shadow-md"
          : isOwned
          ? "border-border/50 hover:border-border"
          : "border-border/30 hover:border-border/50"
      }`}
    >
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          <Check size={14} />
        </div>
      )}

      {/* Color preview */}
      <div className="flex gap-1.5 mb-3">
        <div
          className="flex-1 h-8 rounded-lg"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="flex-1 h-8 rounded-lg"
          style={{ backgroundColor: colors.secondary }}
        />
        <div
          className="flex-1 h-8 rounded-lg"
          style={{ backgroundColor: colors.accent }}
        />
      </div>

      {/* Info */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-display font-bold truncate">{name}</span>
      </div>

      {/* Action */}
      {isOwned ? (
        <button
          onClick={onSelect}
          disabled={isActive}
          className={`w-full py-2 rounded-xl text-xs font-display font-bold transition-colors cursor-pointer ${
            isActive
              ? "bg-primary-50 text-primary-500"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          {isActive ? "Em uso" : "Usar tema"}
        </button>
      ) : (
        <button
          onClick={onBuy}
          disabled={!canAfford}
          className={`w-full py-2 rounded-xl text-xs font-display font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            canAfford
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-muted text-muted-foreground opacity-60"
          }`}
        >
          <span>🪙</span>
          {price}
        </button>
      )}
    </div>
  );
}
