"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, PenLine, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type FamilyMissionContent = {
  story: string;
  real_world_action: string;
  related_chapter: string;
  parent_guidance: string;
  registration_prompt: string;
  registration_type: "text" | "selection";
  registration_options?: string[];
};

type Step = 1 | 2 | 3 | 4;

export function FamilyMission({
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
  const c = content as unknown as FamilyMissionContent;
  const [step, setStep] = useState<Step>(1);
  const [textResponse, setTextResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const canAdvanceStep3 =
    c.registration_type === "text"
      ? textResponse.trim().length >= 5
      : selectedOption !== null;

  const childResponse =
    c.registration_type === "text"
      ? { text: textResponse }
      : { selected: selectedOption };

  function handleConfirm() {
    if (disabled) return;
    onAnswer({ child_response: childResponse, parent_confirmed: true }, true);
  }

  return (
    <div className="flex flex-col space-y-6 max-w-lg mx-auto w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {([1, 2, 3, 4] as Step[]).map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${
              s === step
                ? "w-8 bg-primary-500"
                : s < step
                ? "w-4 bg-primary-300"
                : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Mission story */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-primary-600 font-display font-bold text-sm uppercase tracking-wide">
              <BookOpen size={16} />
              <span>Missão</span>
            </div>

            <p className="text-foreground text-lg leading-relaxed">{c.story}</p>

            <div className="rounded-xl bg-primary-50 border border-primary-200 p-4">
              <p className="text-sm font-medium text-primary-700 mb-1">🎯 O que você vai fazer:</p>
              <p className="text-primary-900 font-display font-bold">{c.real_world_action}</p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Relacionado a: <span className="font-medium">{c.related_chapter}</span>
            </p>

            <Button
              onClick={() => setStep(2)}
              className="w-full rounded-xl font-display"
              disabled={disabled}
            >
              Entendi! <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Parent guidance */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-700 font-display font-bold text-sm uppercase tracking-wide">
              <Users size={16} />
              <span>Momento em Família</span>
            </div>

            <div className="rounded-xl bg-amber-50 border-2 border-amber-300 p-5 space-y-3">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                📋 Para os pais / responsáveis
              </p>
              <p className="text-amber-900 leading-relaxed">{c.parent_guidance}</p>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Realize a atividade com a criança antes de continuar.
            </p>

            <Button
              onClick={() => setStep(3)}
              className="w-full rounded-xl font-display bg-amber-500 hover:bg-amber-600 text-white border-0"
              disabled={disabled}
            >
              Pronto, fizemos! <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Step 3: Child registration */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-violet-600 font-display font-bold text-sm uppercase tracking-wide">
              <PenLine size={16} />
              <span>Seu Registro</span>
            </div>

            <p className="text-foreground text-lg font-display font-bold">{c.registration_prompt}</p>

            {c.registration_type === "text" ? (
              <Textarea
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                placeholder="Escreva aqui o que você aprendeu..."
                className="rounded-xl min-h-[100px] resize-none text-base"
                disabled={disabled}
              />
            ) : (
              <div className="space-y-2">
                {c.registration_options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(opt)}
                    disabled={disabled}
                    className={`w-full p-3 rounded-xl border-2 text-left font-medium transition-all cursor-pointer ${
                      selectedOption === opt
                        ? "border-violet-500 bg-violet-50 text-violet-700"
                        : "border-border bg-white hover:border-violet-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <Button
              onClick={() => setStep(4)}
              disabled={disabled || !canAdvanceStep3}
              className="w-full rounded-xl font-display"
            >
              Registrar <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Step 4: Parental confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 text-center"
          >
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: 2 }}
            >
              🎉
            </motion.div>

            <h3 className="font-display font-bold text-2xl text-foreground">
              Missão em família concluída!
            </h3>

            <p className="text-muted-foreground">
              Agora peça ao responsável para confirmar que a atividade foi realizada.
            </p>

            <div className="rounded-xl bg-green-50 border-2 border-green-300 p-4">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">
                ✅ Para os pais
              </p>
              <p className="text-sm text-green-800">
                Confirme que a atividade foi realizada juntos pressionando o botão abaixo.
              </p>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={disabled}
              className="w-full rounded-xl font-display text-base py-6 bg-green-500 hover:bg-green-600 text-white border-0"
            >
              <CheckCircle2 size={20} className="mr-2" />
              Realizado em família! ✅
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
