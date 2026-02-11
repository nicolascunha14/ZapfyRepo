"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

interface CelebrationOverlayProps {
  type: "chapter" | "exam";
  title: string;
  subtitle?: string;
  xpEarned: number;
  zapcoinsEarned: number;
  onClose: () => void;
}

export function CelebrationOverlay({
  type,
  title,
  subtitle,
  xpEarned,
  zapcoinsEarned,
  onClose,
}: CelebrationOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const timeout = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {showConfetti && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={type === "exam" ? 400 : 250}
            colors={["#6366f1", "#22d3ee", "#f59e0b", "#ef4444", "#10b981"]}
          />
        )}

        <motion.div
          className="bg-card rounded-3xl p-10 mx-4 max-w-md w-full text-center shadow-2xl space-y-5"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <motion.span
            className="text-7xl block"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            {type === "exam" ? "🎓" : "🎉"}
          </motion.span>

          <h2 className="font-display font-bold text-3xl text-foreground">
            {title}
          </h2>

          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}

          <div className="flex items-center justify-center gap-6 text-lg font-bold">
            <motion.span
              className="text-primary-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              +{xpEarned} XP
            </motion.span>
            <motion.span
              className="text-amber-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              +{zapcoinsEarned} 🪙
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              onClick={onClose}
              size="lg"
              className="w-full rounded-xl font-display text-lg"
            >
              Continuar
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
