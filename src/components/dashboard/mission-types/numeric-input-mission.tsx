"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

type NumericContent = {
  question: string;
  placeholder?: string;
  unit?: string;
};

export function NumericInputMission({
  content,
  correctAnswer,
  onAnswer,
  disabled,
}: {
  content: Record<string, unknown>;
  correctAnswer: Record<string, unknown>;
  onAnswer: (answer: Record<string, unknown>, isCorrect: boolean) => void;
  disabled: boolean;
}) {
  const nc = content as unknown as NumericContent;
  const correct = (correctAnswer as { correct: number; tolerance?: number }).correct;
  const tolerance = (correctAnswer as { tolerance?: number }).tolerance ?? 0;
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (disabled || !value.trim()) return;
    const num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) return;

    const isCorrect = Math.abs(num - correct) <= tolerance;
    onAnswer({ value: num }, isCorrect);
  }

  return (
    <div className="flex flex-col space-y-6 items-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <Calculator size={28} className="text-violet-500" />
      </motion.div>

      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {nc.question}
      </motion.h3>

      <motion.div
        className="flex items-center gap-2 w-full max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={nc.placeholder || "Digite o valor"}
          className="flex-1 text-center text-2xl font-display font-bold p-4 rounded-xl border-2 border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          disabled={disabled}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        {nc.unit && (
          <span className="text-sm font-medium text-muted-foreground">{nc.unit}</span>
        )}
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="w-full max-w-xs rounded-full bg-primary-500 px-6 py-3.5 text-white font-display font-semibold hover:bg-primary-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
      >
        Confirmar
      </motion.button>
    </div>
  );
}
