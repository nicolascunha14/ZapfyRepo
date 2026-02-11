"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { LEVELS } from "@/lib/gamification";
import { Button } from "@/components/ui/button";

interface LevelUpOverlayProps {
  newLevel: number;
  onClose: () => void;
}

export function LevelUpOverlay({ newLevel, onClose }: LevelUpOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const levelData = LEVELS.find((l) => l.level === newLevel) ?? LEVELS[0];

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Golden gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-500/90 via-yellow-400/80 to-amber-600/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={300}
          colors={["#fbbf24", "#f59e0b", "#d97706", "#ffffff", "#fef3c7"]}
        />

        {/* Animated stars */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              delay: 0.3 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            ⭐
          </motion.span>
        ))}

        <motion.div
          className="relative bg-white rounded-3xl p-10 mx-4 max-w-sm w-full text-center shadow-2xl space-y-5"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <motion.div
            className="text-7xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: 2 }}
          >
            {levelData.icon}
          </motion.div>

          <div>
            <motion.p
              className="text-amber-600 font-display font-bold text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Level Up!
            </motion.p>
            <motion.h2
              className="font-display font-bold text-3xl text-foreground mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Nível {newLevel}
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {levelData.name}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              onClick={onClose}
              size="lg"
              className="w-full rounded-xl font-display text-lg bg-amber-500 hover:bg-amber-600 text-white"
            >
              Incrível!
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
