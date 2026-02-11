"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MissionResultScreenProps {
  isCorrect: boolean;
  xpEarned: number;
  zapcoinsEarned: number;
  explanation?: string;
  onContinue: () => void;
  onRetry?: () => void;
  streakCount?: number;
}

export function MissionResultScreen({
  isCorrect,
  xpEarned,
  zapcoinsEarned,
  explanation,
  onContinue,
  onRetry,
  streakCount,
}: MissionResultScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl space-y-4"
        initial={isCorrect ? { scale: 0.5, opacity: 0 } : { x: 0 }}
        animate={
          isCorrect
            ? { scale: 1, opacity: 1 }
            : { x: [-12, 12, -12, 12, 0], opacity: 1 }
        }
        transition={
          isCorrect
            ? { type: "spring", stiffness: 300, damping: 20 }
            : { duration: 0.4 }
        }
      >
        <motion.span
          className="text-6xl block"
          animate={isCorrect ? { scale: [1, 1.3, 1] } : { rotate: [0, -15, 15, 0] }}
          transition={{ duration: 0.6 }}
        >
          {isCorrect ? "✅" : "❌"}
        </motion.span>

        <h2 className="font-display font-bold text-2xl">
          {isCorrect ? "Muito bem!" : "Quase lá!"}
        </h2>

        {isCorrect && (
          <div className="flex items-center justify-center gap-4 text-sm">
            <motion.span
              className="text-primary-500 font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              +{xpEarned} XP
            </motion.span>
            {zapcoinsEarned > 0 && (
              <motion.span
                className="text-amber-500 font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                +{zapcoinsEarned} 🪙
              </motion.span>
            )}
          </div>
        )}

        {streakCount && streakCount > 1 && isCorrect && (
          <motion.p
            className="text-sm text-orange-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            🔥 {streakCount} dias seguidos!
          </motion.p>
        )}

        {explanation && (
          <motion.div
            className="bg-muted/50 rounded-xl p-3 text-sm text-muted-foreground text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            💡 {explanation}
          </motion.div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={onContinue} className="w-full rounded-xl font-display">
            {isCorrect ? "Continuar" : "Próxima missão"}
          </Button>
          {!isCorrect && onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="w-full rounded-xl font-display"
            >
              Tentar novamente
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
