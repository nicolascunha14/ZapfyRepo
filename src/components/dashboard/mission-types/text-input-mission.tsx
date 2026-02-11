"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

type TextInputContent = {
  question: string;
  placeholder?: string;
};

export function TextInputMission({
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
  const tc = content as unknown as TextInputContent;
  const correctAnswers = (correctAnswer as { correct: string[] | string; case_sensitive?: boolean });
  const acceptedAnswers = Array.isArray(correctAnswers.correct)
    ? correctAnswers.correct
    : [correctAnswers.correct];
  const caseSensitive = correctAnswers.case_sensitive ?? false;
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (disabled || !value.trim()) return;

    const userVal = caseSensitive ? value.trim() : value.trim().toLowerCase();
    const isCorrect = acceptedAnswers.some((a) => {
      const accepted = caseSensitive ? a : a.toLowerCase();
      return userVal === accepted;
    });

    onAnswer({ value: value.trim() }, isCorrect);
  }

  return (
    <div className="flex flex-col space-y-6 items-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <PenLine size={28} className="text-rose-500" />
      </motion.div>

      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {tc.question}
      </motion.h3>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={tc.placeholder || "Digite aqui..."}
          className="w-full text-center text-lg font-medium p-4 rounded-xl border-2 border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          disabled={disabled}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
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
