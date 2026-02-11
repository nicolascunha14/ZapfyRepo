"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

type QuizContent = {
  question: string;
  options: { id: string; text: string }[];
};

export function QuizMission({
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
  const quiz = content as unknown as QuizContent;
  const correct = (correctAnswer as { correct: string }).correct;
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<Set<string>>(new Set());

  function handleSelect(optionId: string) {
    if (disabled || selected !== null || disabledOptions.has(optionId)) return;

    setSelected(optionId);
    const isCorrect = optionId === correct;

    if (isCorrect) {
      setFeedback("correct");
      onAnswer({ selected: optionId }, true);
    } else {
      setFeedback("wrong");
      setTimeout(() => {
        setDisabledOptions((prev) => new Set(prev).add(optionId));
        setSelected(null);
        setFeedback(null);
      }, 800);
      onAnswer({ selected: optionId }, false);
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {quiz.question}
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full">
        {quiz.options.map((option, i) => {
          const isSelected = selected === option.id;
          const isDisabled = disabledOptions.has(option.id);
          const showCorrect = isSelected && feedback === "correct";
          const showWrong = isSelected && feedback === "wrong";

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isDisabled || selected !== null || disabled}
              className={`relative p-4 rounded-xl border-2 text-left font-medium transition-all cursor-pointer
                disabled:cursor-not-allowed disabled:opacity-40
                ${showCorrect
                  ? "border-success bg-success/10 text-success"
                  : showWrong
                    ? "border-error bg-error/10 text-error"
                    : isDisabled
                      ? "border-border bg-muted/50 text-muted-foreground"
                      : "border-border bg-white hover:border-primary-300 hover:bg-primary-50"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                x: showWrong ? [0, -6, 6, -4, 4, 0] : 0,
              }}
              transition={{
                opacity: { delay: 0.1 + i * 0.08 },
                x: { duration: 0.4 },
              }}
              whileTap={!isDisabled && selected === null ? { scale: 0.97 } : {}}
            >
              <span className="text-sm md:text-base">{option.text}</span>
              {showCorrect && (
                <motion.span className="absolute top-3 right-3" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 size={20} className="text-success" />
                </motion.span>
              )}
              {showWrong && (
                <motion.span className="absolute top-3 right-3" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <XCircle size={20} className="text-error" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
