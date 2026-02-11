"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HEARTS_CONFIG, calculateCurrentHearts } from "@/lib/gamification";

interface HeartsDisplayProps {
  hearts: number;
  maxHearts: number;
  ageGroup: string;
  heartsLastUpdated: Date;
}

export function HeartsDisplay({
  hearts: initialHearts,
  maxHearts,
  ageGroup,
  heartsLastUpdated,
}: HeartsDisplayProps) {
  const [hearts, setHearts] = useState(() =>
    calculateCurrentHearts(initialHearts, heartsLastUpdated, ageGroup)
  );
  const [shaking, setShaking] = useState(false);
  const [prevHearts, setPrevHearts] = useState(hearts);

  const config = HEARTS_CONFIG[ageGroup] ?? HEARTS_CONFIG["10-12"];

  // Regeneration timer
  useEffect(() => {
    const interval = setInterval(() => {
      const current = calculateCurrentHearts(
        initialHearts,
        heartsLastUpdated,
        ageGroup
      );
      setHearts(current);
    }, 60_000);

    return () => clearInterval(interval);
  }, [initialHearts, heartsLastUpdated, ageGroup]);

  // Detect heart loss for shake animation
  useEffect(() => {
    if (hearts < prevHearts) {
      setShaking(true);
      const timeout = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(timeout);
    }
    setPrevHearts(hearts);
  }, [hearts, prevHearts]);

  // Time until next heart
  const getNextHeartMinutes = () => {
    if (hearts >= maxHearts) return 0;
    const minutesPassed =
      (Date.now() - heartsLastUpdated.getTime()) / 60_000;
    const remainder = minutesPassed % config.regen_minutes;
    return Math.ceil(config.regen_minutes - remainder);
  };

  const isZero = hearts === 0;

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className="flex items-center gap-0.5"
        animate={shaking ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length: maxHearts }).map((_, i) => (
          <AnimatePresence key={i} mode="wait">
            {i < hearts ? (
              <motion.span
                key={`full-${i}`}
                className="text-lg"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, rotate: -30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ❤️
              </motion.span>
            ) : (
              <motion.span
                key={`empty-${i}`}
                className="text-lg opacity-30"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                🖤
              </motion.span>
            )}
          </AnimatePresence>
        ))}
      </motion.div>

      {isZero && (
        <motion.p
          className="text-xs text-muted-foreground text-center"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {config.block_on_zero ? (
            <span>⏱ Próximo coração em {getNextHeartMinutes()}min</span>
          ) : (
            <span>💪 Continue! Seus corações voltam logo!</span>
          )}
        </motion.p>
      )}
    </div>
  );
}
