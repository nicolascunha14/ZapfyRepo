"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

type MatchPair = { id: string; left: string; right: string };
type MatchingContent = {
  question: string;
  pairs: MatchPair[];
};

export function MatchingMission({
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
  const mc = content as unknown as MatchingContent;
  const correct = correctAnswer as Record<string, string>;

  // Shuffle right side on first render
  const [shuffledRight] = useState(() =>
    [...mc.pairs].sort(() => Math.random() - 0.5)
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // leftId -> rightId
  const [matchedRight, setMatchedRight] = useState<Set<string>>(new Set());

  function handleLeftTap(pairId: string) {
    if (disabled || matches[pairId]) return;
    setSelectedLeft(selectedLeft === pairId ? null : pairId);
  }

  function handleRightTap(pairId: string) {
    if (disabled || !selectedLeft || matchedRight.has(pairId)) return;

    setMatches((prev) => ({ ...prev, [selectedLeft]: pairId }));
    setMatchedRight((prev) => new Set(prev).add(pairId));
    setSelectedLeft(null);
  }

  function handleSubmit() {
    if (disabled) return;
    if (Object.keys(matches).length !== mc.pairs.length) return;

    // Check all matches
    const isCorrect = Object.entries(matches).every(
      ([leftId, rightId]) => correct[leftId] === rightId
    );

    onAnswer({ matches }, isCorrect);
  }

  const allMatched = Object.keys(matches).length === mc.pairs.length;

  return (
    <div className="flex flex-col space-y-6">
      <motion.div className="flex items-center justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link2 size={20} className="text-teal-500" />
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground text-center">
          {mc.question}
        </h3>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground">
        Selecione um item da esquerda e depois o correspondente da direita
      </p>

      <div className="flex gap-4 max-w-lg mx-auto w-full">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-2">
          {mc.pairs.map((pair) => {
            const isMatched = !!matches[pair.id];
            const isSelected = selectedLeft === pair.id;

            return (
              <motion.button
                key={pair.id}
                onClick={() => handleLeftTap(pair.id)}
                disabled={disabled || isMatched}
                className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all cursor-pointer
                  ${isMatched
                    ? "border-success/30 bg-success/10 text-success"
                    : isSelected
                      ? "border-primary-400 bg-primary-100 text-primary-700"
                      : "border-border bg-white hover:border-primary-300"
                  }
                  disabled:cursor-default`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={!isMatched ? { scale: 0.97 } : {}}
              >
                {pair.left}
              </motion.button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col gap-2">
          {shuffledRight.map((pair) => {
            const isMatched = matchedRight.has(pair.id);
            const canSelect = selectedLeft !== null && !isMatched;

            return (
              <motion.button
                key={pair.id}
                onClick={() => handleRightTap(pair.id)}
                disabled={disabled || isMatched || !selectedLeft}
                className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all cursor-pointer
                  ${isMatched
                    ? "border-success/30 bg-success/10 text-success"
                    : canSelect
                      ? "border-dashed border-primary-300 bg-primary-50 hover:bg-primary-100"
                      : "border-border bg-white"
                  }
                  disabled:cursor-default disabled:opacity-50`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={canSelect ? { scale: 0.97 } : {}}
              >
                {pair.right}
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={disabled || !allMatched}
        className="w-full max-w-xs mx-auto rounded-full bg-primary-500 px-6 py-3.5 text-white font-display font-semibold hover:bg-primary-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        whileTap={{ scale: 0.97 }}
      >
        Confirmar
      </motion.button>
    </div>
  );
}
