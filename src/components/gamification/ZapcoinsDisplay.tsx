"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZapcoinsDisplayProps {
  amount: number;
}

export function ZapcoinsDisplay({ amount }: ZapcoinsDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const [floatingReward, setFloatingReward] = useState<number | null>(null);

  useEffect(() => {
    if (amount > displayAmount) {
      const diff = amount - displayAmount;
      setFloatingReward(diff);
      // Animate counter
      const steps = 20;
      const increment = diff / steps;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          setDisplayAmount(amount);
          clearInterval(interval);
        } else {
          setDisplayAmount((prev) => Math.floor(prev + increment));
        }
      }, 30);
      // Clear floating after animation
      const timeout = setTimeout(() => setFloatingReward(null), 1500);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setDisplayAmount(amount);
    }
  }, [amount]);

  return (
    <div className="relative flex items-center gap-1">
      <span className="text-lg">🪙</span>
      <motion.span
        className="font-display font-bold text-sm text-amber-600"
        key={displayAmount}
      >
        {displayAmount.toLocaleString("pt-BR")}
      </motion.span>

      <AnimatePresence>
        {floatingReward && (
          <motion.span
            className="absolute -top-1 left-1/2 text-xs font-bold text-amber-500 pointer-events-none"
            initial={{ opacity: 1, y: 0, x: "-50%" }}
            animate={{ opacity: 0, y: -24, x: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            +{floatingReward}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
