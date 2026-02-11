"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLevelFromXP, getXPProgressPercent, LEVELS } from "@/lib/gamification";

interface XPBarProps {
  xp: number;
  level: number;
  onLevelUp?: (newLevel: number) => void;
}

export function XPBar({ xp, level, onLevelUp }: XPBarProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const currentLevel = getLevelFromXP(xp);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);
  const percent = getXPProgressPercent(xp);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedPercent(percent), 100);
    return () => clearTimeout(timeout);
  }, [percent]);

  useEffect(() => {
    if (currentLevel.level > level && onLevelUp) {
      onLevelUp(currentLevel.level);
    }
  }, [currentLevel.level, level, onLevelUp]);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-display font-bold text-foreground flex items-center gap-1">
          {currentLevel.icon} {currentLevel.name} — Nível {currentLevel.level}
        </span>
        {nextLevel && (
          <span className="text-muted-foreground">
            {xp.toLocaleString("pt-BR")} / {nextLevel.xp_required.toLocaleString("pt-BR")} XP
          </span>
        )}
      </div>

      <div className="h-3 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint"
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {animatedPercent >= 100 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>

      {nextLevel && (
        <p className="text-[10px] text-muted-foreground text-right">
          → Nível {nextLevel.level} ({nextLevel.icon} {nextLevel.name})
        </p>
      )}
    </div>
  );
}
