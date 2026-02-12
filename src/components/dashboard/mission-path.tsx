"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, Star, Crown, ChevronLeft, ChevronRight, Loader2, GraduationCap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ChapterWithProgress, Mission, AgeGroup } from "@/lib/types";

const CHAPTER_COLORS = [
  { bg: "bg-emerald-500", light: "bg-emerald-100", ring: "ring-emerald-300", text: "text-emerald-700", gradient: "from-emerald-400 to-emerald-600" },
  { bg: "bg-blue-500", light: "bg-blue-100", ring: "ring-blue-300", text: "text-blue-700", gradient: "from-blue-400 to-blue-600" },
  { bg: "bg-amber-500", light: "bg-amber-100", ring: "ring-amber-300", text: "text-amber-700", gradient: "from-amber-400 to-amber-600" },
  { bg: "bg-rose-500", light: "bg-rose-100", ring: "ring-rose-300", text: "text-rose-700", gradient: "from-rose-400 to-rose-600" },
  { bg: "bg-violet-500", light: "bg-violet-100", ring: "ring-violet-300", text: "text-violet-700", gradient: "from-violet-400 to-violet-600" },
  { bg: "bg-cyan-500", light: "bg-cyan-100", ring: "ring-cyan-300", text: "text-cyan-700", gradient: "from-cyan-400 to-cyan-600" },
  { bg: "bg-orange-500", light: "bg-orange-100", ring: "ring-orange-300", text: "text-orange-700", gradient: "from-orange-400 to-orange-600" },
  { bg: "bg-pink-500", light: "bg-pink-100", ring: "ring-pink-300", text: "text-pink-700", gradient: "from-pink-400 to-pink-600" },
  { bg: "bg-teal-500", light: "bg-teal-100", ring: "ring-teal-300", text: "text-teal-700", gradient: "from-teal-400 to-teal-600" },
];

type Props = {
  chapters: ChapterWithProgress[];
  activeChapterIndex: number;
  missions: Mission[];
  completedMissionIds: string[];
  childId: string;
  allChaptersCompleted?: boolean;
  examPassed?: boolean;
  ageGroup?: AgeGroup;
};

export function MissionPath({
  chapters,
  activeChapterIndex,
  missions: initialMissions,
  completedMissionIds: initialCompletedIds,
  childId,
  allChaptersCompleted,
  examPassed,
  ageGroup,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(activeChapterIndex);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompletedIds);
  const [loading, setLoading] = useState(false);

  const chapter = chapters[currentIndex];
  const color = CHAPTER_COLORS[currentIndex % CHAPTER_COLORS.length];
  const completedSet = new Set(completedIds);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < chapters.length - 1;
  const isLocked = chapter.status === "locked";

  const fetchMissions = useCallback(async (chapterIndex: number) => {
    const ch = chapters[chapterIndex];
    if (ch.status === "locked") {
      setMissions([]);
      setCompletedIds([]);
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data: missionsData } = await supabase
      .from("missions")
      .select("*")
      .eq("chapter_id", ch.id)
      .order("order_position", { ascending: true });

    const missionsList = (missionsData ?? []) as Mission[];
    setMissions(missionsList);

    // Fetch completed missions
    const missionIds = missionsList.map((m) => m.id);
    if (missionIds.length > 0) {
      const { data: attempts } = await supabase
        .from("mission_attempts")
        .select("mission_id")
        .eq("child_id", childId)
        .eq("is_correct", true)
        .in("mission_id", missionIds);

      setCompletedIds([...new Set((attempts ?? []).map((a) => a.mission_id))]);
    } else {
      setCompletedIds([]);
    }

    setLoading(false);
  }, [chapters, childId]);

  function handleChangeChapter(newIndex: number) {
    setCurrentIndex(newIndex);
    if (newIndex !== activeChapterIndex) {
      fetchMissions(newIndex);
    } else {
      // Restore initial data
      setMissions(initialMissions);
      setCompletedIds(initialCompletedIds);
    }
  }

  return (
    <div className="space-y-6">
      {/* Chapter banner */}
      <div className={`relative rounded-2xl bg-gradient-to-r ${color.gradient} p-4 lg:p-5 text-white overflow-hidden`}>
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -right-4 -bottom-10 w-24 h-24 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => canGoPrev && handleChangeChapter(currentIndex - 1)}
            disabled={!canGoPrev}
            className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
              Capítulo {chapter.chapter_number} de {chapters.length}
            </p>
            <p className="font-display font-bold text-lg lg:text-xl truncate">
              {chapter.icon} {chapter.title}
            </p>
            {chapter.description && (
              <p className="text-xs text-white/70 truncate mt-0.5">
                {chapter.description}
              </p>
            )}
          </div>

          <button
            onClick={() => canGoNext && handleChangeChapter(currentIndex + 1)}
            disabled={!canGoNext}
            className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors cursor-pointer disabled:cursor-default"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative mt-3 flex items-center gap-2">
          <div className="flex-1 h-2.5 bg-white/25 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(chapter.missions_completed / 10) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-white/90 tabular-nums">
            {chapter.missions_completed}/10
          </span>
        </div>
      </div>

      {/* Mission nodes */}
      {isLocked ? (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
            <Lock size={28} className="text-muted-foreground" />
          </div>
          <p className="font-display font-bold text-muted-foreground">
            Capítulo Bloqueado
          </p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Complete o capítulo anterior para desbloquear
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="text-muted-foreground animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.id}
            className="flex flex-col items-center pb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {missions.map((mission, index) => {
              const isCompleted = completedSet.has(mission.id);
              const isMissionLocked = index > 0 && !completedSet.has(missions[index - 1].id);
              const isActive = !isCompleted && !isMissionLocked;

              // Zigzag pattern
              const positions = [0, 45, 0, -45];
              const offsetX = positions[index % 4];

              return (
                <div key={mission.id} className="flex flex-col items-center">
                  {index > 0 && (
                    <div
                      className={`w-0.5 h-6 ${
                        isMissionLocked ? "bg-muted-foreground/15" : `${color.bg}`
                      }`}
                      style={{ marginLeft: offsetX }}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ marginLeft: offsetX }}
                  >
                    {isActive ? (
                      <Link href={`/dashboard/mission/${mission.id}?chapter=${chapter.id}`}>
                        <MissionNode
                          mission={mission}
                          state="active"
                          color={color}
                        />
                      </Link>
                    ) : (
                      <MissionNode
                        mission={mission}
                        state={isCompleted ? "completed" : "locked"}
                        color={color}
                      />
                    )}
                  </motion.div>
                </div>
              );
            })}

            {chapter.status === "completed" && (
              <div className="flex flex-col items-center mt-4">
                <div className="w-0.5 h-6 bg-amber-300" />
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg ring-4 ring-amber-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                >
                  <Crown size={28} className="text-white" />
                </motion.div>
                <p className="text-xs font-bold text-amber-600 mt-2">
                  Capítulo Completo!
                </p>
              </div>
            )}

            {/* Final Exam node - show after last chapter when all completed */}
            {allChaptersCompleted && currentIndex === chapters.length - 1 && chapter.status === "completed" && (
              <div className="flex flex-col items-center mt-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-amber-300 to-violet-400" />
                {examPassed ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-emerald-200">
                      <CheckCircle2 size={28} className="text-white" />
                    </div>
                    <p className="text-xs font-bold text-emerald-600 mt-2">
                      Prova Aprovada!
                    </p>
                  </>
                ) : ageGroup === "13-15" ? (
                  <>
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shadow-lg ring-4 ring-violet-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.7 }}
                    >
                      <GraduationCap size={28} className="text-white" />
                    </motion.div>
                    <p className="text-xs font-bold text-violet-600 mt-2">
                      Mestre Financeiro!
                    </p>
                  </>
                ) : (
                  <Link href="/dashboard/final-exam">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="relative w-18 h-18 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center ring-4 ring-violet-300 shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <GraduationCap size={30} className="text-white" />
                        <div className="absolute inset-0 rounded-full bg-violet-500 opacity-30 animate-ping" />
                      </motion.div>
                      <motion.p
                        className="mt-2 text-xs font-bold text-violet-700 bg-white rounded-full px-3 py-1 shadow-sm border border-violet-200"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        PROVA FINAL
                      </motion.p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function MissionNode({
  mission,
  state,
  color,
}: {
  mission: Mission;
  state: "active" | "completed" | "locked";
  color: (typeof CHAPTER_COLORS)[number];
}) {
  if (state === "locked") {
    return (
      <div className="w-14 h-14 rounded-full bg-muted border-4 border-muted-foreground/10 flex items-center justify-center">
        <Lock size={18} className="text-muted-foreground/40" />
      </div>
    );
  }

  if (state === "completed") {
    return (
      <div className={`w-14 h-14 rounded-full ${color.bg} flex items-center justify-center ring-4 ${color.ring}/30 shadow-md`}>
        <CheckCircle2 size={24} className="text-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${color.gradient} flex items-center justify-center ring-4 ${color.ring} shadow-lg cursor-pointer`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star size={26} className="text-white" fill="white" />
        <div className={`absolute inset-0 rounded-full ${color.bg} opacity-30 animate-ping`} />
      </motion.div>
      <motion.p
        className={`mt-1.5 text-xs font-bold ${color.text} bg-white rounded-full px-3 py-1 shadow-sm border`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        COMEÇAR
      </motion.p>
    </div>
  );
}
