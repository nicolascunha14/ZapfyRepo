"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins,
  BookOpen,
  Trophy,
  TrendingUp,
  Sparkles,
  Wallet,
  DollarSign,
  Lightbulb,
  Brain,
  PenTool,
  Star,
  Zap,
  Award,
  Crown,
  Users,
  Medal,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { OnboardingSlide } from "@/components/onboarding/onboarding-slides";
import { SlideChildForm } from "@/components/onboarding/child-form";

const SLIDES = [
  {
    gradient: "from-primary-500 to-zapfy-mint",
    icon: Coins,
    satellites: [
      { icon: Sparkles, position: "-top-6 -right-6", size: 22, delay: 0 },
      { icon: DollarSign, position: "-bottom-4 -left-8", size: 20, delay: 0.4 },
      { icon: Wallet, position: "top-2 -left-12", size: 18, delay: 0.8 },
    ],
    title: "Bem-vindo ao Zapfy!",
    description:
      "A aventura financeira do seu filho começa aqui. Missões divertidas para aprender sobre dinheiro!",
  },
  {
    gradient: "from-amber-400 to-orange-500",
    icon: BookOpen,
    satellites: [
      { icon: Lightbulb, position: "-top-6 -right-8", size: 22, delay: 0 },
      { icon: Brain, position: "-bottom-6 -left-6", size: 20, delay: 0.5 },
      { icon: PenTool, position: "top-4 -left-12", size: 18, delay: 0.9 },
    ],
    title: "Aprenda sobre dinheiro",
    description:
      "Missões interativas ensinam educação financeira de forma lúdica e prática.",
  },
  {
    gradient: "from-zapfy-mint to-emerald-500",
    icon: Trophy,
    satellites: [
      { icon: Star, position: "-top-6 -right-6", size: 22, delay: 0 },
      { icon: Zap, position: "-bottom-4 -left-8", size: 20, delay: 0.4 },
      { icon: Award, position: "top-2 -left-12", size: 18, delay: 0.7 },
    ],
    title: "Ganhe pontos",
    description:
      "Cada missão completada rende Zap Coins. Acumule pontos e suba de nível!",
  },
  {
    gradient: "from-indigo-500 to-violet-500",
    icon: TrendingUp,
    satellites: [
      { icon: Crown, position: "-top-6 -right-6", size: 22, delay: 0 },
      { icon: Users, position: "-bottom-4 -left-8", size: 20, delay: 0.5 },
      { icon: Medal, position: "top-2 -left-12", size: 18, delay: 0.8 },
    ],
    title: "Suba no ranking",
    description:
      "Compare seu progresso com outras crianças e conquiste o topo do ranking!",
  },
];

const TOTAL_STEPS = SLIDES.length + 1; // 4 slides + 1 form

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isInfoSlide = step < SLIDES.length;
  const isFormSlide = step === SLIDES.length;

  const goTo = useCallback(
    (target: number) => {
      if (target < 0 || target >= TOTAL_STEPS) return;
      setDirection(target > step ? 1 : -1);
      setStep(target);
    },
    [step]
  );

  function handleNext() {
    goTo(step + 1);
  }

  function handleBack() {
    goTo(step - 1);
  }

  function handleSkip() {
    goTo(SLIDES.length); // jump to form
  }

  function handleSwipe(
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) {
    // Don't allow swipe on form slide
    if (isFormSlide) return;

    const swipeThreshold = 50;
    const velocityThreshold = 300;

    if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      handleNext();
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      handleBack();
    }
  }

  async function handleComplete(childName: string, ageGroup: string) {
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Sessão expirada. Faça login novamente.");
        setIsSubmitting(false);
        return;
      }

      // Ensure public.users row exists (safety net for FK constraint)
      const { error: upsertError } = await supabase.from("users").upsert(
        {
          id: user.id,
          email: user.email!,
          display_name:
            user.user_metadata?.display_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            null,
        },
        { onConflict: "id" }
      );

      if (upsertError) {
        setError(`Erro ao criar perfil: ${upsertError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Check if child already exists (retry protection)
      const { data: existing } = await supabase
        .from("children")
        .select("id")
        .eq("parent_id", user.id)
        .limit(1);

      if (!existing || existing.length === 0) {
        const { error: insertError } = await supabase
          .from("children")
          .insert({
            parent_id: user.id,
            user_id: user.id,
            name: childName,
            age_group: ageGroup,
          })
          .select();

        if (insertError) {
          const msg =
            insertError.code === "42501"
              ? "Permissão negada. Tente fazer login novamente."
              : insertError.code === "23505"
                ? "Registro já existe."
                : `Erro ao salvar: ${insertError.message}`;
          setError(msg);
          setIsSubmitting(false);
          return;
        }
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: { onboarding_completed: true },
      });

      if (updateError) {
        setError(`Erro ao finalizar: ${updateError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Redirect to dashboard after onboarding
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro inesperado.";
      setError(`Algo deu errado: ${message}`);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-dvh w-full overflow-hidden relative bg-white">
      {/* Skip button — only on info slides */}
      {isInfoSlide && (
        <motion.button
          onClick={handleSkip}
          className="absolute top-12 right-5 z-20 text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pular
        </motion.button>
      )}

      {/* Back button — on form slide */}
      {isFormSlide && (
        <motion.button
          onClick={handleBack}
          className="absolute top-12 left-5 z-20 text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Voltar
        </motion.button>
      )}

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="h-full w-full absolute inset-0"
          drag={isInfoSlide ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleSwipe}
        >
          {isInfoSlide ? (
            <OnboardingSlide {...SLIDES[step]} />
          ) : (
            <SlideChildForm
              onComplete={handleComplete}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom overlay: progress dots + button (info slides only) */}
      {isInfoSlide && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white px-6 pb-8 pt-2">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === step
                    ? "w-8 bg-primary-500"
                    : i < step
                      ? "w-2 bg-primary-400"
                      : "w-2 bg-primary-200"
                )}
                layout
              />
            ))}
          </div>

          {/* Continue button */}
          <motion.button
            onClick={handleNext}
            className="w-full max-w-md mx-auto block rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg
                       shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                       transition-all cursor-pointer"
            whileTap={{ scale: 0.97 }}
          >
            Continuar
          </motion.button>
        </div>
      )}
    </div>
  );
}
