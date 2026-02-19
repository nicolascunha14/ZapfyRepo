"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
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
import { completeMission, calculateCurrentHearts, HEARTS_CONFIG } from "@/lib/gamification";
import { HeartsDisplay } from "@/components/gamification/HeartsDisplay";
import { ZapcoinsDisplay } from "@/components/gamification/ZapcoinsDisplay";
import { MissionResultScreen } from "@/components/gamification/MissionResultScreen";
import { LevelUpOverlay } from "@/components/gamification/LevelUpOverlay";

// Mission type components
import { QuizMission } from "@/components/dashboard/mission-types/quiz-mission";
import { TrueFalseMission } from "@/components/dashboard/mission-types/true-false-mission";
import { NumericInputMission } from "@/components/dashboard/mission-types/numeric-input-mission";
import { TextInputMission } from "@/components/dashboard/mission-types/text-input-mission";
import { MatchingMission } from "@/components/dashboard/mission-types/matching-mission";
import { FamilyMission } from "@/components/dashboard/mission-types/family-mission";

type MissionState = "playing" | "result" | "levelup" | "blocked";

export function NewMissionPlayer({
  mission,
  childId,
  chapterId,
  nextMissionId,
  nextChapterId,
  currentMissionNumber,
  totalMissions,
  completedMissions,
  ageGroup,
  initialHearts,
  heartsLastUpdated,
  initialZapcoins,
  initialXP,
  initialLevel,
}: {
  mission: Mission;
  childId: string;
  chapterId: string;
  nextMissionId: string | null;
  nextChapterId?: string | null;
  currentMissionNumber: number;
  totalMissions: number;
  completedMissions: number;
  ageGroup: string;
  initialHearts: number;
  heartsLastUpdated: string;
  initialZapcoins: number;
  initialXP: number;
  initialLevel: number;
}) {
  const router = useRouter();
  const startTimeRef = useRef(Date.now());
  const attemptCountRef = useRef(1);

  const [state, setState] = useState<MissionState>(() => {
    // Check if blocked on mount
    const currentHearts = calculateCurrentHearts(
      initialHearts,
      new Date(heartsLastUpdated),
      ageGroup
    );
    const config = HEARTS_CONFIG[ageGroup] ?? HEARTS_CONFIG["10-12"];
    if (currentHearts === 0 && config.block_on_zero) return "blocked";
    return "playing";
  });

  const [hearts, setHearts] = useState(initialHearts);
  const [heartsUpdated, setHeartsUpdated] = useState(new Date(heartsLastUpdated));
  const [zapcoins, setZapcoins] = useState(initialZapcoins);
  const [resultData, setResultData] = useState<{
    isCorrect: boolean;
    xpEarned: number;
    zapcoinsEarned: number;
    streakCount?: number;
    newLevel?: number;
    leveledUp?: boolean;
  } | null>(null);

  const config = HEARTS_CONFIG[ageGroup] ?? HEARTS_CONFIG["10-12"];

  const handleAnswer = useCallback(
    async (userAnswer: Record<string, unknown>, isCorrect: boolean) => {
      const supabase = createClient();
      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

      const result = await completeMission({
        childId,
        missionId: mission.id,
        userAnswer,
        isCorrect,
        attemptNumber: attemptCountRef.current,
        timeSpentSeconds,
        ageGroup,
        missionType: mission.mission_type,
        supabase,
      });

      // For family missions, record parental confirmation
      if (mission.mission_type === "family_mission" && isCorrect) {
        await supabase.from("family_confirmations").upsert(
          {
            child_id: childId,
            mission_id: mission.id,
            child_response: userAnswer,
            parent_confirmed_at: new Date().toISOString(),
          },
          { onConflict: "child_id,mission_id" }
        );
      }

      // Update local state
      setHearts(result.newHearts);
      setHeartsUpdated(new Date());
      setZapcoins((prev) => prev + result.zapcoinsEarned);

      setResultData({
        isCorrect: result.isCorrect,
        xpEarned: result.xpEarned,
        zapcoinsEarned: result.zapcoinsEarned,
        streakCount: result.streakResult?.newStreak,
        newLevel: result.newLevel,
        leveledUp: result.leveledUp,
      });

      setState("result");

      if (!isCorrect) {
        attemptCountRef.current += 1;
      }
    },
    [childId, mission.id, ageGroup]
  );

  const handleResultContinue = () => {
    if (resultData?.leveledUp && resultData.newLevel) {
      setState("levelup");
      return;
    }
    navigateNext();
  };

  const handleRetry = () => {
    // Check if blocked after wrong answer
    const currentHearts = calculateCurrentHearts(hearts, heartsUpdated, ageGroup);
    if (currentHearts === 0 && config.block_on_zero) {
      setState("blocked");
      return;
    }
    startTimeRef.current = Date.now();
    setResultData(null);
    setState("playing");
  };

  const handleLevelUpClose = () => {
    navigateNext();
  };

  const navigateNext = () => {
    if (resultData?.isCorrect && nextMissionId) {
      router.push(`/dashboard/mission/${nextMissionId}?chapter=${chapterId}`);
      router.refresh();
    } else if (resultData?.isCorrect && nextChapterId) {
      // Last mission of chapter — go directly to next chapter
      router.push(`/dashboard/chapter/${nextChapterId}`);
      router.refresh();
    } else if (resultData?.isCorrect) {
      router.push(`/dashboard`);
      router.refresh();
    } else {
      // Wrong answer — check if blocked
      const currentHearts = calculateCurrentHearts(hearts, heartsUpdated, ageGroup);
      if (currentHearts === 0 && config.block_on_zero) {
        setState("blocked");
      } else {
        startTimeRef.current = Date.now();
        setResultData(null);
        setState("playing");
      }
    }
  };

  const handleBack = () => {
    router.push(`/dashboard/chapter/${chapterId}`);
    router.refresh();
  };

  // Calculate next heart regen time for blocked screen
  const getNextHeartMinutes = () => {
    const minutesPassed = (Date.now() - heartsUpdated.getTime()) / 60_000;
    const remainder = minutesPassed % config.regen_minutes;
    return Math.ceil(config.regen_minutes - remainder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top bar */}
      {state === "playing" && (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer">
                <ArrowLeft size={20} className="text-muted-foreground" />
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
            <Progress value={((completedMissions + (resultData?.isCorrect ? 1 : 0)) / totalMissions) * 100} className="h-2.5" />
          </div>

          <HeartsDisplay
            hearts={hearts}
            maxHearts={config.max}
            ageGroup={ageGroup}
            heartsLastUpdated={heartsUpdated}
          />

          <ZapcoinsDisplay amount={zapcoins} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {state === "playing" && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-auto px-4 py-8"
            >
              <MissionRenderer
                mission={mission}
                onAnswer={handleAnswer}
                disabled={false}
              />
            </motion.div>
          )}

          {state === "blocked" && (
            <motion.div
              key="blocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-6 space-y-6"
            >
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💔
              </motion.div>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Sem corações!
              </h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Aguarde a regeneração para continuar jogando.
              </p>
              <div className="flex items-center justify-center gap-2 text-lg font-display font-bold text-primary-500">
                <Clock size={20} />
                <span>{getNextHeartMinutes()} min</span>
              </div>
              <Button onClick={handleBack} variant="outline" className="rounded-xl font-display">
                Voltar aos capítulos
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {state === "result" && resultData && (
          <MissionResultScreen
            isCorrect={resultData.isCorrect}
            xpEarned={resultData.xpEarned}
            zapcoinsEarned={resultData.zapcoinsEarned}
            explanation={resultData.isCorrect ? (mission.explanation ?? undefined) : undefined}
            onContinue={handleResultContinue}
            onRetry={!resultData.isCorrect ? handleRetry : undefined}
            streakCount={resultData.streakCount}
          />
        )}
      </AnimatePresence>

      {/* Level up overlay */}
      <AnimatePresence>
        {state === "levelup" && resultData?.newLevel && (
          <LevelUpOverlay
            newLevel={resultData.newLevel}
            onClose={handleLevelUpClose}
          />
        )}
      </AnimatePresence>
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
    case "matching":
      return <MatchingMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    case "family_mission":
      return <FamilyMission content={content} correctAnswer={correctAnswer} onAnswer={onAnswer} disabled={disabled} />;
    default:
      return <p>Tipo de missão desconhecido</p>;
  }
}
