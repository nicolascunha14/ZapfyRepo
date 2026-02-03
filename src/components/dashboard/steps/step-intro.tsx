"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  HandCoins,
  PiggyBank,
  BookOpen,
  Briefcase,
  ShoppingCart,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { StepIntro } from "@/lib/mission-content";

const THEME_ICONS: Record<string, typeof UtensilsCrossed> = {
  lanche: UtensilsCrossed,
  troco: HandCoins,
  economizar: PiggyBank,
  conceitos_basicos: BookOpen,
  ganhar: Briefcase,
  gastar: ShoppingCart,
  investir: TrendingUp,
};

const THEME_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  lanche: { bg: "bg-orange-100", text: "text-orange-500", glow: "shadow-orange-200/50" },
  troco: { bg: "bg-emerald-100", text: "text-emerald-500", glow: "shadow-emerald-200/50" },
  economizar: { bg: "bg-primary-100", text: "text-primary-500", glow: "shadow-primary-200/50" },
  conceitos_basicos: { bg: "bg-violet-100", text: "text-violet-500", glow: "shadow-violet-200/50" },
  ganhar: { bg: "bg-teal-100", text: "text-teal-500", glow: "shadow-teal-200/50" },
  gastar: { bg: "bg-rose-100", text: "text-rose-500", glow: "shadow-rose-200/50" },
  investir: { bg: "bg-indigo-100", text: "text-indigo-500", glow: "shadow-indigo-200/50" },
};

export function StepIntroComponent({
  step,
  theme,
  onNext,
}: {
  step: StepIntro;
  theme: string;
  onNext: () => void;
}) {
  const Icon = THEME_ICONS[theme] ?? Sparkles;
  const colors = THEME_COLORS[theme] ?? THEME_COLORS.lanche;

  return (
    <div className="flex flex-col items-center text-center space-y-6 px-4">
      {/* Animated icon */}
      <motion.div
        className={`relative w-28 h-28 rounded-3xl ${colors.bg} flex items-center justify-center shadow-lg ${colors.glow}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={48} className={colors.text} />

        {/* Floating sparkles */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={20} className="text-zapfy-coin" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-display font-bold text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {step.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {step.description}
      </motion.p>

      {/* Start button */}
      <motion.button
        onClick={onNext}
        className="w-full max-w-xs rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg
                   shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                   transition-all cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
      >
        Começar
      </motion.button>
    </div>
  );
}
