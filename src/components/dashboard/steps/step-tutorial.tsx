"use client";

import { motion } from "framer-motion";
import type { StepTutorial, TutorialItem } from "@/lib/mission-content";

const NOTE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "2": { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700" },
  "5": { bg: "bg-violet-50", border: "border-violet-300", text: "text-violet-700" },
  "10": { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" },
  "20": { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700" },
  "50": { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-700" },
  "100": { bg: "bg-cyan-50", border: "border-cyan-300", text: "text-cyan-700" },
  "200": { bg: "bg-gray-50", border: "border-gray-300", text: "text-gray-700" },
};

function CoinVisual({ item, index }: { item: TutorialItem; index: number }) {
  const size = item.value === "1,00" ? "w-16 h-16" : item.value === "0,50" ? "w-14 h-14" : item.value === "0,25" ? "w-13 h-13" : "w-12 h-12";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className={`${size} rounded-full flex items-center justify-center font-bold text-xs
          ${item.value === "1,00"
            ? "bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-amber-500 text-amber-800 shadow-md ring-2 ring-gray-300"
            : "bg-gradient-to-br from-amber-100 to-amber-300 border-2 border-amber-400 text-amber-700 shadow-sm"
          }`}
      >
        <span className="text-[10px] font-bold leading-tight text-center">
          R$<br />{item.value}
        </span>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
    </motion.div>
  );
}

function NoteVisual({ item, index }: { item: TutorialItem; index: number }) {
  const colors = NOTE_COLORS[item.value] ?? NOTE_COLORS["2"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className={`w-20 h-12 rounded-lg ${colors.bg} ${colors.border} border-2 flex items-center justify-center shadow-sm`}
      >
        <span className={`text-sm font-bold ${colors.text}`}>R$ {item.value}</span>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
    </motion.div>
  );
}

export function StepTutorialComponent({
  step,
  onNext,
}: {
  step: StepTutorial;
  onNext: () => void;
}) {
  const coins = step.items?.filter((i) => i.variant === "coin") ?? [];
  const notes = step.items?.filter((i) => i.variant === "note") ?? [];

  return (
    <div className="flex flex-col items-center text-center space-y-6 px-4">
      {/* Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-display font-bold text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {step.description}
      </motion.p>

      {/* Coins grid */}
      {coins.length > 0 && (
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {coins.map((item, i) => (
            <CoinVisual key={item.label} item={item} index={i} />
          ))}
        </motion.div>
      )}

      {/* Notes grid */}
      {notes.length > 0 && (
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {notes.map((item, i) => (
            <NoteVisual key={item.label} item={item} index={i} />
          ))}
        </motion.div>
      )}

      {/* Highlight single item */}
      {step.highlight && (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {step.highlight.variant === "coin" ? (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-3 border-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-amber-800">
                R$ {step.highlight.value}
              </span>
            </div>
          ) : (
            <div className="w-32 h-20 rounded-xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-emerald-700">
                R$ {step.highlight.value}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {step.highlight.label}
          </span>
        </motion.div>
      )}

      {/* Next button */}
      <motion.button
        onClick={onNext}
        className="w-full max-w-xs rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg
                   shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                   transition-all cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
      >
        Continuar
      </motion.button>
    </div>
  );
}
