"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SatelliteConfig = {
  icon: LucideIcon;
  position: string; // Tailwind absolute positioning classes
  size: number;
  delay: number;
};

type OnboardingSlideProps = {
  gradient: string;
  icon: LucideIcon;
  satellites: SatelliteConfig[];
  title: string;
  description: string;
};

export function OnboardingSlide({
  gradient,
  icon: MainIcon,
  satellites,
  title,
  description,
}: OnboardingSlideProps) {
  return (
    <div className="h-dvh w-full flex flex-col">
      {/* Top gradient area with illustration — capped so text always has room */}
      <div
        className={`relative bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        style={{ height: "50dvh" }}
      >
        {/* Decorative circles in background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full bg-white/5" />
        </div>

        {/* Main illustration */}
        <div className="relative">
          {/* Main icon container */}
          <motion.div
            className="w-28 h-28 rounded-[1.75rem] bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MainIcon size={60} className="text-white" strokeWidth={1.5} />
          </motion.div>

          {/* Satellite icons */}
          {satellites.map((sat, i) => {
            const SatIcon = sat.icon;
            return (
              <motion.div
                key={i}
                className={`absolute ${sat.position} bg-white/25 backdrop-blur-sm rounded-xl p-2 shadow-md`}
                animate={{
                  y: [0, -8, 0],
                  scale: [0.95, 1.08, 0.95],
                  rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  delay: sat.delay,
                  ease: "easeInOut",
                }}
              >
                <SatIcon size={sat.size} className="text-white" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom white area with text — pb-36 leaves room for the fixed bottom overlay */}
      <div className="flex-1 bg-white px-6 pt-6 pb-36 flex flex-col items-center justify-start text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-base md:text-lg max-w-sm mx-auto leading-relaxed mt-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
