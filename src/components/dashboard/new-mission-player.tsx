"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Trophy, Coins, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Mission } from "@/lib/types";

// Mission type components
import { QuizMission } from "@/components/dashboard/mission-types/quiz-mission";
import { TrueFalseMission } from "@/components/dashboard/mission-types/true-false-mission";
import { NumericInputMission } from "@/components/dashboard/mission-types/numeric-input-mission";
import { TextInputMission } from "@/components/dashboard/mission-types/text-input-mission";
import { DragDropMission } from "@/components/dashboard/mission-types/drag-drop-mission";
import { MatchingMission } from "@/components/dashboard/mission-types/matching-mission";

type MissionState = "playing" | "correct" | "wrong" | "celebration";

export function NewMissionPlayer({
  mission,
  childId,
  chapterId,
  nextMissionId,
  currentMissionNumber,
  totalMissions,
  completedMissions,
}: {
  mission: Mission;
  childId: string;
  chapterId: string;
  nextMissionId: string | null;
  currentMissionNumber: number;
  totalMissions: number;
  completedMissions: number;
}) {
  const router = useRouter();
  const [state, setState] = useState<MissionState>("playing");
  const [saving, setSaving] = useState(false);

  const handleAnswer = useCallback(
    async (userAnswer: Record<string, unknown>, isCorrect: boolean) => {
      const supabase = createClient();

      // Save attempt
      await supabase.from("mission_attempts").insert({
        child_id: childId,
        mission_id: mission.id,
        user_answer: userAnswer,
        is_correct: isCorrect,
        points_earned: isCorrect ? mission.points_reward : 0,
      });

      if (isCorrect) {
        setState("correct");

        // After showing explanation, move to celebration
        setTimeout(async () => {
          setSaving(true);
          setState("celebration");

          // Update child points
          const { data: child } = await supabase
            .from("children")
            .select("total_points")
            .eq("id", childId)
            .single();

          if (child) {
            await supabase
              .from("children")
              .update({ total_points: (child.total_points ?? 0) + mission.points_reward })
              .eq("id", childId);
          }

          // Update user_progress
          const { data: progress } = await supabase
            .from("user_progress")
            .select("missions_completed, total_score, status")
            .eq("child_id", childId)
            .eq("chapter_id", chapterId)
            .single();

          if (progress) {
            const newCompleted = (progress.missions_completed ?? 0) + 1;
            const newScore = (progress.total_score ?? 0) + mission.points_reward;
            await supabase
              .from("user_progress")
              .update({
                missions_completed: newCompleted,
                total_score: newScore,
                status: newCompleted >= 10 ? "completed" : "in_progress",
                started_at: progress.status === "unlocked" ? new Date().toISOString() : undefined,
              })
              .eq("child_id", childId)
              .eq("chapter_id", chapterId);
          }

          setSaving(false);
        }, 1500);
      } else {
        setState("wrong");
        // Let user retry after seeing wrong feedback
        setTimeout(() => setState("playing"), 1200);
      }
    },
    [childId, chapterId, mission]
  );

  const handleBack = () => {
    router.push(`/dashboard/chapter/${chapterId}`);
    router.refresh();
  };

  const handleContinue = () => {
    if (nextMissionId) {
      router.push(`/dashboard/mission/${nextMissionId}?chapter=${chapterId}`);
      router.refresh();
    } else {
      // Last mission of chapter - go back to chapter list
      router.push(`/dashboard/chapter/${chapterId}`);
      router.refresh();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top bar */}
      {state !== "celebration" && (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer">
                <X size={20} className="text-muted-foreground" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da missão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Seu progresso nesta missão será perdido. Tem certeza?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continuar</AlertDialogCancel>
                <AlertDialogAction onClick={handleBack} variant="destructive">
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex-1">
            <Progress value={((completedMissions + (state === "correct" ? 1 : 0)) / totalMissions) * 100} className="h-2.5" />
          </div>

          <span className="text-xs text-muted-foreground font-medium tabular-nums min-w-[3rem] text-right">
            {currentMissionNumber}/{totalMissions}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {state === "celebration" ? (
            <CelebrationView
              key="celebration"
              mission={mission}
              saving={saving}
              onContinue={handleContinue}
              isLastMission={!nextMissionId}
            />
          ) : (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-auto px-4 py-8"
            >
              {/* Feedback overlay */}
              {state === "correct" && (
                <motion.div
                  className="bg-success/10 border border-success/20 rounded-xl p-4 text-center text-sm text-success mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 size={20} className="inline mr-2" />
                  {mission.explanation || "Correto!"}
                </motion.div>
              )}
              {state === "wrong" && (
                <motion.div
                  className="bg-error/10 border border-error/20 rounded-xl p-4 text-center text-sm text-error mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                >
                  <XCircle size={20} className="inline mr-2" />
                  Ops! Tente novamente.
                </motion.div>
              )}

              {/* Mission type renderer */}
              <MissionRenderer
                mission={mission}
                onAnswer={handleAnswer}
                disabled={state !== "playing"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MissionRenderer({
  mission,
  onAnswer,
  disabled,
}: {
  mission: Mission;
  onAnswer: (answer: Record<string, unknown>, isCorrect: boolean) => void;
  disabled: boolean;
}) {
  const content = mission.content as Record<string, unknown>;
  const correctAnswer = mission.correct_answer as Record<string, unknown>;

  switch (mission.mission_type) {
    case "quiz":
      return <QuizMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "true_false":
      return <TrueFalseMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "numeric_input":
      return <NumericInputMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "text_input":
      return <TextInputMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "drag_drop":
      return <DragDropMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "matching":
      return <MatchingMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    default:
      return <p>Tipo de missão desconhecido</p>;
  }
}

function CelebrationView({
  mission,
  saving,
  onContinue,
  isLastMission,
}: {
  mission: Mission;
  saving: boolean;
  onContinue: () => void;
  isLastMission: boolean;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center space-y-6 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: ["#1E88E5", "#6EE7B7", "#FCD34D", "#F59E0B", "#22C55E", "#EF4444", "#8B5CF6"][i % 7],
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
      >
        <div className="w-28 h-28 rounded-full bg-zapfy-coin/20 flex items-center justify-center shadow-lg shadow-zapfy-coin/20">
          <Trophy size={52} className="text-zapfy-coin" />
        </div>
        <motion.div
          className="absolute -top-1 -right-1 bg-success rounded-full p-1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5L6.5 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Missão Completada!</h2>
        <p className="text-muted-foreground mt-1">{mission.title}</p>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 bg-zapfy-coin/20 rounded-full px-6 py-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
      >
        <Coins size={24} className="text-zapfy-coin" />
        <span className="text-2xl font-display font-bold text-amber-700">+{mission.points_reward}</span>
        <span className="text-sm font-medium text-amber-600">Zap Coins</span>
      </motion.div>

      <motion.button
        onClick={onContinue}
        className="w-full max-w-xs rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.97 }}
        disabled={saving}
      >
        {saving ? "Salvando..." : isLastMission ? "Finalizar Capítulo" : "Próxima Missão"}
        {!saving && !isLastMission && <ArrowRight size={20} />}
      </motion.button>
    </motion.div>
  );
}
