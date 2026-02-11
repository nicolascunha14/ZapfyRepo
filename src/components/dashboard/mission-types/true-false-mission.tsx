"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";

type TrueFalseContent = {
  question: string;
};

export function TrueFalseMission({
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
  const tf = content as unknown as TrueFalseContent;
  const correct = (correctAnswer as { correct: boolean }).correct;
  const [selected, setSelected] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  function handleSelect(value: boolean) {
    if (disabled || selected !== null) return;
    setSelected(value);
    const isCorrect = value === correct;

    if (isCorrect) {
      setFeedback("correct");
      onAnswer({ selected: value }, true);
    } else {
      setFeedback("wrong");
      onAnswer({ selected: value }, false);
    }
  }

  return (
    <div className="flex flex-col space-y-8 items-center">
      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {tf.question}
      </motion.h3>

      <div className="flex gap-4">
        {[
          { value: true, label: "Verdadeiro", icon: ThumbsUp, color: "emerald" },
          { value: false, label: "Falso", icon: ThumbsDown, color: "rose" },
        ].map(({ value, label, icon: Icon, color }) => {
          const isSelected = selected === value;
          const isCorrectChoice = isSelected && feedback === "correct";
          const isWrongChoice = isSelected && feedback === "wrong";

          return (
            <motion.button
              key={String(value)}
              onClick={() => handleSelect(value)}
              disabled={disabled || selected !== null}
              className={`flex flex-col items-center gap-2 p-6 rounded-2xl border-2 min-w-[140px] transition-all cursor-pointer
                disabled:cursor-not-allowed
                ${isCorrectChoice
                  ? "border-success bg-success/10"
                  : isWrongChoice
                    ? "border-error bg-error/10"
                    : selected !== null
                      ? "border-border opacity-40"
                      : value
                        ? "border-emerald-200 bg-emerald-50 hover:border-emerald-400"
                        : "border-rose-200 bg-rose-50 hover:border-rose-400"
                }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isWrongChoice ? [0, -6, 6, -4, 4, 0] : 0,
              }}
              whileTap={selected === null ? { scale: 0.95 } : {}}
            >
              <Icon
                size={32}
                className={
                  isCorrectChoice
                    ? "text-success"
                    : isWrongChoice
                      ? "text-error"
                      : value
                        ? "text-emerald-500"
                        : "text-rose-500"
                }
              />
              <span className={`font-display font-bold text-sm ${
                isCorrectChoice ? "text-success" : isWrongChoice ? "text-error" : value ? "text-emerald-700" : "text-rose-700"
              }`}>
                {label}
              </span>
              {isCorrectChoice && <CheckCircle2 size={20} className="text-success" />}
              {isWrongChoice && <XCircle size={20} className="text-error" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
