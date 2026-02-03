"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "square" | "triangle";
}

interface ParticlesBackgroundProps {
  particleCount?: number;
  className?: string;
}

export function ParticlesBackground({
  particleCount = 30,
  className = "",
}: ParticlesBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const shapes: Particle["shape"][] = ["circle", "square", "triangle"];
    const generated = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setParticles(generated);
  }, [particleCount]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute opacity-20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.shape === "circle" && (
            <div
              className="rounded-full bg-primary-400"
              style={{ width: p.size, height: p.size }}
            />
          )}
          {p.shape === "square" && (
            <div
              className="rounded-sm bg-zapfy-mint rotate-45"
              style={{ width: p.size, height: p.size }}
            />
          )}
          {p.shape === "triangle" && (
            <div
              className="border-l-transparent border-r-transparent border-b-zapfy-coin"
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: p.size / 2,
                borderRightWidth: p.size / 2,
                borderBottomWidth: p.size,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
