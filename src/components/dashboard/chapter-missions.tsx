"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle2, Play, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Chapter, Mission } from "@/lib/types";

const missionTypeLabels: Record<string, string> = {
  quiz: "Quiz",
  true_false: "V ou F",
  numeric_input: "Cálculo",
  text_input: "Texto",
  matching: "Conectar",
};

const missionTypeColors: Record<string, string> = {
  quiz: "bg-primary-100 text-primary-700",
  true_false: "bg-emerald-100 text-emerald-700",
  numeric_input: "bg-violet-100 text-violet-700",
  text_input: "bg-rose-100 text-rose-700",
  matching: "bg-teal-100 text-teal-700",
};

export function ChapterMissions({
  chapter,
  missions,
  completedMissionIds,
  childId,
  missionsCompleted,
}: {
  chapter: Chapter;
  missions: Mission[];
  completedMissionIds: string[];
  childId: string;
  missionsCompleted: number;
}) {
  const router = useRouter();
  const [completedIds] = useState<Set<string>>(new Set(completedMissionIds));
  const progress = (missionsCompleted / 10) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} className="text-muted-foreground" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{chapter.icon}</span>
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Cap. {chapter.chapter_number}: {chapter.title}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {chapter.description}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-border/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progresso</span>
          <span className="text-sm font-bold text-primary-500">
            {missionsCompleted}/10 missões
          </span>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      {/* Mission list */}
      <div className="flex flex-col items-center gap-1">
        {missions.map((mission, index) => {
          const isCompleted = completedIds.has(mission.id);
          // Mission unlocked if first, or previous is completed
          const isLocked =
            index > 0 && !completedIds.has(missions[index - 1].id);

          return (
            <MissionNode
              key={mission.id}
              mission={mission}
              index={index}
              isCompleted={isCompleted}
              isLocked={isLocked}
              isLast={index === missions.length - 1}
              chapterId={chapter.id}
            />
          );
        })}
      </div>
    </div>
  );
}

function MissionNode({
  mission,
  index,
  isCompleted,
  isLocked,
  isLast,
  chapterId,
}: {
  mission: Mission;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  isLast: boolean;
  chapterId: string;
}) {
  const typeLabel = missionTypeLabels[mission.mission_type] || mission.mission_type;
  const typeColor = missionTypeColors[mission.mission_type] || "bg-muted text-muted-foreground";

  const content = (
    <motion.div
      className={`relative flex items-center gap-4 w-full max-w-md rounded-2xl border-2 p-4 transition-all
        ${isLocked
          ? "border-dashed border-muted-foreground/20 bg-muted/30 opacity-50"
          : isCompleted
            ? "border-success/30 bg-success/5"
            : "border-primary-200 bg-white hover:bg-primary-50 hover:border-primary-300 hover:shadow-md"
        }`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      {/* Number circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-lg
          ${isLocked
            ? "bg-muted text-muted-foreground"
            : isCompleted
              ? "bg-success text-white"
              : "bg-primary-500 text-white"
          }`}
      >
        {isLocked ? (
          <Lock size={18} />
        ) : isCompleted ? (
          <CheckCircle2 size={22} />
        ) : (
          mission.mission_number
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
          {mission.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor}`}>
            {typeLabel}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Star size={10} className="text-amber-400" fill="currentColor" />
            {mission.points_reward} pts
          </span>
        </div>
      </div>

      {/* Action */}
      {!isLocked && !isCompleted && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
          <Play size={14} className="text-white ml-0.5" fill="white" />
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center">
      {index > 0 && (
        <div className={`w-0.5 h-4 ${isLocked ? "bg-muted-foreground/20" : "bg-primary-300"}`} />
      )}
      {isLocked || isCompleted ? (
        content
      ) : (
        <Link href={`/dashboard/mission/${mission.id}?chapter=${chapterId}`}>
          {content}
        </Link>
      )}
      {!isLast && (
        <div className={`w-0.5 h-4 ${isLocked ? "bg-muted-foreground/20" : "bg-primary-300"}`} />
      )}
    </div>
  );
}
