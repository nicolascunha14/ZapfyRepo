"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, GraduationCap, BookOpen, RefreshCw } from "lucide-react";
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
import type { FinalExam, AgeGroup } from "@/lib/types";
import { XP_REWARDS, ZAPCOIN_REWARDS } from "@/lib/gamification";
import { AGE_GROUP_LABELS, NEXT_AGE_GROUP } from "@/lib/types";
import { CelebrationOverlay } from "@/components/gamification/CelebrationOverlay";

// Mission type components
import { QuizMission } from "@/components/dashboard/mission-types/quiz-mission";
import { TrueFalseMission } from "@/components/dashboard/mission-types/true-false-mission";
import { NumericInputMission } from "@/components/dashboard/mission-types/numeric-input-mission";
import { TextInputMission } from "@/components/dashboard/mission-types/text-input-mission";
import { MatchingMission } from "@/components/dashboard/mission-types/matching-mission";

const PASS_PERCENT = 0.7; // 70% to pass

type ExamState = "playing" | "reviewing" | "passed" | "failed";

type QuestionResult = {
  questionIndex: number;
  isCorrect: boolean;
  userAnswer: Record<string, unknown>;
};

export function FinalExamPlayer({
  questions,
  childId,
  ageGroup,
}: {
  questions: FinalExam[];
  childId: string;
  ageGroup: AgeGroup;
}) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [state, setState] = useState<ExamState>("playing");
  const [submitting, setSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const answeredRef = useRef(false);

  const question = questions[currentQuestion];
  const totalCorrect = results.filter((r) => r.isCorrect).length;
  const nextAgeGroup = NEXT_AGE_GROUP[ageGroup];

  const handleAnswer = useCallback(
    async (userAnswer: Record<string, unknown>, isCorrect: boolean) => {
      if (answeredRef.current) return;
      answeredRef.current = true;

      const newResult: QuestionResult = {
        questionIndex: currentQuestion,
        isCorrect,
        userAnswer,
      };

      const updatedResults = [...results, newResult];
      setResults(updatedResults);

      // Wait a moment for feedback animation, then advance
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          // Next question
          setCurrentQuestion((prev) => prev + 1);
          answeredRef.current = false;
        } else {
          // Exam finished — calculate result
          finishExam(updatedResults);
        }
      }, 1500);
    },
    [currentQuestion, results, questions.length]
  );

  const finishExam = async (finalResults: QuestionResult[]) => {
    setSubmitting(true);
    const correctCount = finalResults.filter((r) => r.isCorrect).length;
    const passThreshold = Math.ceil(questions.length * PASS_PERCENT);
    const passed = correctCount >= passThreshold;
    const totalPoints = correctCount * (questions[0]?.points_reward ?? 50);

    const supabase = createClient();

    // Save exam attempt
    await supabase.from("exam_attempts").insert({
      child_id: childId,
      age_group: ageGroup,
      questions_correct: correctCount,
      total_points: totalPoints,
      passed,
    });

    if (passed) {
      // Add bonus points (increment, not overwrite)
      const { data: childData } = await supabase
        .from("children")
        .select("total_points, xp, zapcoins")
        .eq("id", childId)
        .single();

      if (childData) {
        await supabase
          .from("children")
          .update({
            total_points: (childData.total_points ?? 0) + totalPoints,
            xp: (childData.xp ?? 0) + XP_REWARDS.exam_pass,
            zapcoins: (childData.zapcoins ?? 0) + ZAPCOIN_REWARDS.exam_pass,
          })
          .eq("id", childId);
      }

      if (nextAgeGroup) {
        // Promote to next age group
        await supabase.rpc("promote_child_age_group", {
          p_child_id: childId,
        });
      }

      setShowCelebration(true);
      setState("passed");
    } else {
      setState("failed");
    }

    setSubmitting(false);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    router.push("/dashboard");
    router.refresh();
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setResults([]);
    setState("playing");
    answeredRef.current = false;
  };

  const handleBack = () => {
    router.push("/dashboard");
    router.refresh();
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
                <AlertDialogTitle>Sair da prova?</AlertDialogTitle>
                <AlertDialogDescription>
                  Seu progresso na prova será perdido. Tem certeza?
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
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="h-2.5"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-primary-50 rounded-full px-3 py-1.5">
            <GraduationCap size={16} className="text-primary-500" />
            <span className="text-sm font-bold text-primary-600 tabular-nums">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {state === "playing" && question && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl mx-auto px-4 py-8"
            >
              <ExamQuestionRenderer
                question={question}
                onAnswer={handleAnswer}
                disabled={answeredRef.current}
              />
            </motion.div>
          )}

          {submitting && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <motion.div
                className="text-5xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                📝
              </motion.div>
              <p className="font-display font-bold text-lg text-foreground">
                Corrigindo prova...
              </p>
            </motion.div>
          )}

          {state === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-6 space-y-6 max-w-sm"
            >
              <motion.div
                className="text-6xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.div>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Quase lá!
              </h2>
              <p className="text-muted-foreground">
                Você acertou{" "}
                <span className="font-bold text-foreground">
                  {totalCorrect} de {questions.length}
                </span>{" "}
                questões. Precisa de pelo menos{" "}
                <span className="font-bold text-primary-500">
                  {Math.ceil(questions.length * PASS_PERCENT)}
                </span>{" "}
                para passar.
              </p>
              <p className="text-sm text-muted-foreground">
                Revise os capítulos e tente novamente!
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleRetry}
                  className="w-full rounded-xl font-display gap-2"
                  size="lg"
                >
                  <RefreshCw size={18} />
                  Tentar novamente
                </Button>
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="w-full rounded-xl font-display gap-2"
                  size="lg"
                >
                  <BookOpen size={18} />
                  Voltar e estudar mais
                </Button>
              </div>
            </motion.div>
          )}

          {state === "passed" && !showCelebration && (
            <motion.div
              key="passed-summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-6 space-y-6 max-w-sm"
            >
              <div className="text-6xl">🎓</div>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Prova concluída!
              </h2>
              <p className="text-muted-foreground">
                {totalCorrect}/{questions.length} corretas
              </p>
              <Button
                onClick={handleBack}
                className="w-full rounded-xl font-display"
                size="lg"
              >
                Ir para o Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay
            type="exam"
            title={
              nextAgeGroup
                ? `Promovido ao ${AGE_GROUP_LABELS[nextAgeGroup]}!`
                : "Você completou tudo!"
            }
            subtitle={
              nextAgeGroup
                ? `Parabéns! Você foi promovido da faixa ${AGE_GROUP_LABELS[ageGroup]} para ${AGE_GROUP_LABELS[nextAgeGroup]}. Uma nova aventura começa!`
                : `Incrível! Você concluiu todas as faixas do Zapfy. Você é um verdadeiro mestre financeiro!`
            }
            xpEarned={totalCorrect * 50}
            zapcoinsEarned={totalCorrect * 10}
            onClose={handleCelebrationClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExamQuestionRenderer({
  question,
  onAnswer,
  disabled,
}: {
  question: FinalExam;
  onAnswer: (answer: Record<string, unknown>, isCorrect: boolean) => void;
  disabled: boolean;
}) {
  const content = question.content as Record<string, unknown>;
  const correctAnswer = question.correct_answer as Record<string, unknown>;

  switch (question.mission_type) {
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
    default:
      return <p>Tipo de questão desconhecido</p>;
  }
}
