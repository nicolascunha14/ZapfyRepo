"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { StepNumberInput } from "@/lib/mission-content";

export function StepNumberInputComponent({
  step,
  onNext,
}: {
  step: StepNumberInput;
  onNext: () => void;
}) {
  const [value, setValue] = useState("");
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null);
  const [attempts, setAttempts] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = parseFloat(value.replace(",", "."));
    if (isNaN(parsed)) return;

    if (Math.abs(parsed - step.correctAnswer) <= step.tolerance) {
      setShowResult("correct");
      setTimeout(() => onNext(), 1200);
    } else {
      setShowResult("wrong");
      setAttempts((a) => a + 1);
      setTimeout(() => {
        setShowResult(null);
        setValue("");
      }, 1000);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 px-4">
      {/* Question */}
      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step.question}
      </motion.h3>

      {/* Input area */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          x: showResult === "wrong" ? [0, -6, 6, -4, 4, 0] : 0,
        }}
        transition={{
          opacity: { delay: 0.2 },
          x: { duration: 0.4 },
        }}
      >
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-display font-bold text-lg">
            {step.unit}
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0,00"
            disabled={showResult === "correct"}
            className={`w-full pl-14 pr-4 py-4 text-center text-2xl font-display font-bold rounded-xl border-2 outline-none transition-all
              ${
                showResult === "correct"
                  ? "border-success bg-success/10 text-success"
                  : showResult === "wrong"
                    ? "border-error bg-error/10 text-error"
                    : "border-border bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }`}
            autoFocus
          />
          {showResult === "correct" && (
            <motion.span
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <CheckCircle2 size={24} className="text-success" />
            </motion.span>
          )}
        </div>

        {showResult !== "correct" && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-3.5 text-white font-display font-semibold text-base
                       shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                       transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verificar
          </button>
        )}
      </motion.form>

      {/* Hint after wrong attempts */}
      {showResult === "wrong" && (
        <motion.p
          className="text-error text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Não é isso... Tente novamente!
        </motion.p>
      )}

      {attempts >= 2 && showResult !== "correct" && (
        <motion.p
          className="text-muted-foreground text-xs text-center max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Dica: a resposta está perto de {step.unit}{" "}
          {step.correctAnswer < 10
            ? Math.floor(step.correctAnswer)
            : Math.round(step.correctAnswer / 10) * 10}
        </motion.p>
      )}

      {/* Explanation on correct */}
      {showResult === "correct" && (
        <motion.div
          className="bg-success/10 border border-success/20 rounded-xl p-4 text-center text-sm text-success max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step.explanation}
        </motion.div>
      )}
    </div>
  );
}
