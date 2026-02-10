"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ChapterWithProgress } from "@/lib/types";

const CHAPTER_COLORS = [
  { bg: "from-emerald-400 to-emerald-500", ring: "ring-emerald-300", text: "text-emerald-50" },
  { bg: "from-blue-400 to-blue-500", ring: "ring-blue-300", text: "text-blue-50" },
  { bg: "from-amber-400 to-amber-500", ring: "ring-amber-300", text: "text-amber-50" },
  { bg: "from-rose-400 to-rose-500", ring: "ring-rose-300", text: "text-rose-50" },
  { bg: "from-violet-400 to-violet-500", ring: "ring-violet-300", text: "text-violet-50" },
  { bg: "from-cyan-400 to-cyan-500", ring: "ring-cyan-300", text: "text-cyan-50" },
  { bg: "from-orange-400 to-orange-500", ring: "ring-orange-300", text: "text-orange-50" },
  { bg: "from-pink-400 to-pink-500", ring: "ring-pink-300", text: "text-pink-50" },
  { bg: "from-teal-400 to-teal-500", ring: "ring-teal-300", text: "text-teal-50" },
];

export function ChapterList({
  chapters: initialChapters,
  childId,
}: {
  chapters: ChapterWithProgress[];
  childId: string;
}) {
  const [chapters, setChapters] = useState(initialChapters);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`progress-${childId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_progress",
          filter: `child_id=eq.${childId}`,
        },
        () => {
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [childId]);

  // Find first active chapter (the "Next" one)
  const nextChapterIndex = chapters.findIndex(
    (c) => c.status === "unlocked" || c.status === "in_progress"
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg">Seus Capítulos</h2>
        <span className="text-xs text-muted-foreground font-medium">
          {chapters.filter((c) => c.status === "completed").length}/{chapters.length} completos
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={index}
            color={CHAPTER_COLORS[index % CHAPTER_COLORS.length]}
            isNext={index === nextChapterIndex}
          />
        ))}
      </div>
    </div>
  );
}

function ChapterCard({
  chapter,
  index,
  color,
  isNext,
}: {
  chapter: ChapterWithProgress;
  index: number;
  color: (typeof CHAPTER_COLORS)[number];
  isNext: boolean;
}) {
  const isLocked = chapter.status === "locked";
  const isCompleted = chapter.status === "completed";
  const progress = chapter.missions_completed;

  if (isLocked) {
    return (
      <motion.div
        className="relative rounded-2xl bg-gray-100 p-4 opacity-50"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: index * 0.04 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
            <Lock size={20} className="text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-sm text-gray-400 truncate">
              {chapter.title}
            </p>
            <p className="text-xs text-gray-300 truncate">
              {chapter.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link
        href={`/dashboard/chapter/${chapter.id}`}
        className={`relative block rounded-2xl bg-gradient-to-r ${color.bg} p-4 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all overflow-hidden`}
      >
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
            {isCompleted ? (
              <CheckCircle2 size={26} className="text-white" />
            ) : (
              <span>{chapter.icon || "📖"}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-white text-sm truncate">
              {chapter.title}
            </p>

            {/* Progress bar */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(progress / 10) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-white/80 tabular-nums">
                {progress}/10
              </span>
            </div>

            {/* Status badge */}
            <div className="mt-1.5">
              {isCompleted ? (
                <span className="text-[10px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                  Completo
                </span>
              ) : isNext ? (
                <span className="text-[10px] font-bold text-white bg-white/30 px-2 py-0.5 rounded-full">
                  Continuar
                </span>
              ) : (
                <span className="text-[10px] font-bold text-white/70 bg-white/15 px-2 py-0.5 rounded-full">
                  Ver
                </span>
              )}
            </div>
          </div>

          {/* Play button */}
          {!isCompleted && (
            <div className="shrink-0 w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
              <Play size={18} className="text-white ml-0.5" fill="white" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
