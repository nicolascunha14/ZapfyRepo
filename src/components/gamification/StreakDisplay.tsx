"use client";

import { motion } from "framer-motion";

interface StreakDisplayProps {
  streak: number;
  isNewRecord?: boolean;
  usedFreeze?: boolean;
}

export function StreakDisplay({ streak, isNewRecord, usedFreeze }: StreakDisplayProps) {
  const getMilestoneColor = () => {
    if (streak >= 100) return "text-purple-500";
    if (streak >= 30) return "text-orange-500";
    if (streak >= 7) return "text-yellow-500";
    return "text-muted-foreground";
  };

  const getMilestoneGlow = () => {
    if (streak >= 100) return "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]";
    if (streak >= 30) return "drop-shadow-[0_0_6px_rgba(249,115,22,0.4)]";
    if (streak >= 7) return "drop-shadow-[0_0_4px_rgba(234,179,8,0.3)]";
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className={`flex items-center gap-1 ${getMilestoneColor()} ${getMilestoneGlow()}`}
        animate={streak >= 100 ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          className="text-2xl"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          🔥
        </motion.span>
        <span className="font-display font-bold text-lg">{streak}</span>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        {streak === 1 ? "1 dia seguido!" : `${streak} dias seguidos!`}
      </p>

      {isNewRecord && (
        <motion.p
          className="text-xs font-bold text-amber-500"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🏆 Novo recorde!
        </motion.p>
      )}

      {usedFreeze && (
        <motion.p
          className="text-xs text-sky-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🧊 Freeze usado!
        </motion.p>
      )}
    </div>
  );
}
