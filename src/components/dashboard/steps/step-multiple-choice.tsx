"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { StepMultipleChoice } from "@/lib/mission-content";

export function StepMultipleChoiceComponent({
  step,
  onNext,
}: {
  step: StepMultipleChoice;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null);

  function handleSelect(index: number) {
    if (selected !== null || disabled.has(index)) return;

    setSelected(index);

    if (index === step.correctIndex) {
      setShowResult("correct");
      setTimeout(() => onNext(), 1200);
    } else {
      setShowResult("wrong");
      setTimeout(() => {
        setDisabled((prev) => new Set(prev).add(index));
        setSelected(null);
        setShowResult(null);
      }, 800);
    }
  }

  return (
    <div className="flex flex-col space-y-6 px-4">
      {/* Question */}
      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step.question}
      </motion.h3>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full">
        {step.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === step.correctIndex;
          const isDisabled = disabled.has(i);
          const showCorrectFeedback = isSelected && showResult === "correct";
          const showWrongFeedback = isSelected && showResult === "wrong";

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isDisabled || selected !== null}
              className={`relative p-4 rounded-xl border-2 text-left font-medium transition-all cursor-pointer
                disabled:cursor-not-allowed disabled:opacity-40
                ${
                  showCorrectFeedback
                    ? "border-success bg-success/10 text-success"
                    : showWrongFeedback
                      ? "border-error bg-error/10 text-error"
                      : isDisabled
                        ? "border-border bg-muted/50 text-muted-foreground"
                        : "border-border bg-white hover:border-primary-300 hover:bg-primary-50"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                x: showWrongFeedback ? [0, -6, 6, -4, 4, 0] : 0,
              }}
              transition={{
                opacity: { delay: 0.1 + i * 0.08 },
                y: { delay: 0.1 + i * 0.08 },
                x: { duration: 0.4 },
              }}
              whileTap={!isDisabled && selected === null ? { scale: 0.97 } : {}}
            >
              <span className="text-sm md:text-base">{option}</span>

              {showCorrectFeedback && (
                <motion.span
                  className="absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <CheckCircle2 size={20} className="text-success" />
                </motion.span>
              )}
              {showWrongFeedback && (
                <motion.span
                  className="absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <XCircle size={20} className="text-error" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation on correct */}
      {showResult === "correct" && (
        <motion.div
          className="bg-success/10 border border-success/20 rounded-xl p-4 text-center text-sm text-success max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step.explanation}
        </motion.div>
      )}
    </div>
  );
}
