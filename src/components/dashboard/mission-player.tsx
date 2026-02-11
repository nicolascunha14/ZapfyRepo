// @ts-nocheck
// Legacy component - replaced by new-mission-player.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import { StepIntroComponent } from "@/components/dashboard/steps/step-intro";
import { StepMultipleChoiceComponent } from "@/components/dashboard/steps/step-multiple-choice";
import { StepNumberInputComponent } from "@/components/dashboard/steps/step-number-input";
import { StepCelebrationComponent } from "@/components/dashboard/steps/step-celebration";
import { StepTutorialComponent } from "@/components/dashboard/steps/step-tutorial";
import type { MissionStep } from "@/lib/mission-content";
import type { Mission } from "@/lib/types";

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

export function MissionPlayer({
  mission,
  childId,
  steps,
}: {
  mission: Mission;
  childId: string;
  steps: MissionStep[];
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;
  const isCelebration = step.type === "celebration";

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top bar */}
      {!isCelebration && (
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
                  Seu progresso nesta missão será perdido. Tem certeza que deseja
                  sair?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continuar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => router.push("/dashboard")}
                  variant="destructive"
                >
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex-1">
            <Progress value={progressPercent} className="h-2.5" />
          </div>

          <span className="text-xs text-muted-foreground font-medium tabular-nums min-w-[3rem] text-right">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-2xl mx-auto py-8"
          >
            {step.type === "intro" && (
              <StepIntroComponent
                step={step}
                theme={mission.theme}
                onNext={handleNext}
              />
            )}
            {step.type === "multiple_choice" && (
              <StepMultipleChoiceComponent step={step} onNext={handleNext} />
            )}
            {step.type === "number_input" && (
              <StepNumberInputComponent step={step} onNext={handleNext} />
            )}
            {step.type === "tutorial" && (
              <StepTutorialComponent step={step} onNext={handleNext} />
            )}
            {step.type === "celebration" && (
              <StepCelebrationComponent
                missionId={mission.id}
                missionTitle={mission.title}
                childId={childId}
                pointsReward={mission.points_reward}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
