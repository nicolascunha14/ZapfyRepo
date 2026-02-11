// @ts-nocheck
// Legacy component - no longer used by the new chapter-based system
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Coins,
  CheckCircle2,
  UtensilsCrossed,
  PiggyBank,
  HandCoins,
  Lightbulb,
  Play,
  BookOpen,
  Briefcase,
  ShoppingCart,
  TrendingUp,
  Lock,
} from "lucide-react";
import type { Mission } from "@/lib/types";
import { motion } from "framer-motion";

const THEME_CONFIG = {
  lanche: {
    icon: UtensilsCrossed,
    label: "Lanche",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  troco: {
    icon: HandCoins,
    label: "Troco",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  economizar: {
    icon: PiggyBank,
    label: "Economizar",
    color: "text-primary-500",
    bg: "bg-primary-50",
  },
  conceitos_basicos: {
    icon: BookOpen,
    label: "Conceitos",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  ganhar: {
    icon: Briefcase,
    label: "Ganhar",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  gastar: {
    icon: ShoppingCart,
    label: "Gastar",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  investir: {
    icon: TrendingUp,
    label: "Investir",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
} as const;

export function MissionCard({
  mission,
  isCompleted: initialCompleted,
  isLocked = false,
}: {
  mission: Mission;
  childId: string;
  isCompleted: boolean;
  isLocked?: boolean;
  onComplete?: (missionId: string, points: number) => void;
}) {
  const [isCompleted] = useState(initialCompleted);
  const [showTips, setShowTips] = useState(false);

  const theme = THEME_CONFIG[mission.theme];
  const ThemeIcon = theme.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`relative overflow-hidden transition-all ${
          isCompleted
            ? "opacity-75"
            : isLocked
              ? "opacity-50 grayscale"
              : ""
        }`}
      >
        {/* Point badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              isCompleted
                ? "bg-success/10 text-success"
                : isLocked
                  ? "bg-muted text-muted-foreground"
                  : "bg-zapfy-coin/20 text-amber-700"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={12} />
                Concluída
              </>
            ) : isLocked ? (
              <>
                <Lock size={12} />
                Bloqueada
              </>
            ) : (
              <>
                <Coins size={12} />
                {mission.points_reward} pts
              </>
            )}
          </div>
        </div>

        <CardContent className="pt-6 pb-4 space-y-3">
          {/* Theme + title */}
          <div className="flex items-start gap-3 pr-20">
            <div className={`${isLocked ? "bg-muted" : theme.bg} rounded-xl p-2.5 shrink-0`}>
              {isLocked ? (
                <Lock size={20} className="text-muted-foreground" />
              ) : (
                <ThemeIcon size={20} className={theme.color} />
              )}
            </div>
            <div>
              <p className="font-display font-bold text-base leading-tight">
                {mission.title}
              </p>
              <span
                className={`text-xs ${isLocked ? "text-muted-foreground" : theme.color} font-medium`}
              >
                {theme.label}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {mission.description}
          </p>

          {/* Tips (collapsible) - hidden when locked */}
          {!isLocked && (
            <>
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-1.5 text-xs text-primary-500 hover:text-primary-600 font-medium cursor-pointer transition-colors"
              >
                <Lightbulb size={14} />
                {showTips ? "Esconder dica" : "Ver dica"}
              </button>

              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-primary-50 rounded-lg p-3 text-xs text-primary-700 leading-relaxed"
                >
                  {mission.tips}
                </motion.div>
              )}
            </>
          )}

          {/* Action */}
          {isCompleted ? (
            <div className="flex items-center gap-2 mt-1 text-sm text-success font-medium">
              <CheckCircle2 size={16} />
              Missão completada!
            </div>
          ) : isLocked ? (
            <div className="flex items-center justify-center gap-2 w-full mt-1 rounded-lg bg-muted px-4 py-2.5 text-muted-foreground font-display font-semibold text-sm">
              <Lock size={16} />
              Complete a missão anterior
            </div>
          ) : (
            <Link
              href={`/dashboard/mission/${mission.id}`}
              className="flex items-center justify-center gap-2 w-full mt-1 rounded-lg bg-gradient-to-r from-primary-500 to-zapfy-mint px-4 py-2.5
                         text-white font-display font-semibold text-sm hover:opacity-90 transition-all"
            >
              <Play size={16} fill="white" />
              Iniciar Missão
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
