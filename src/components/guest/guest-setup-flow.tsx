"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Rocket, ClipboardCheck, ChevronRight, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Map skill levels to DB age_group values
const LEVEL_TO_AGE: Record<string, string> = {
  iniciante: "7-9",
  medio: "10-12",
  avancado: "13-15",
};

const LEVELS = [
  {
    value: "iniciante",
    label: "Iniciante",
    emoji: "🌱",
    description: "Estou começando a aprender sobre dinheiro",
    color: "border-emerald-300 bg-emerald-50 hover:border-emerald-500",
    selected: "border-emerald-500 bg-emerald-100 ring-2 ring-emerald-300",
  },
  {
    value: "medio",
    label: "Intermediário",
    emoji: "📈",
    description: "Já sei o básico sobre economia e mesada",
    color: "border-blue-300 bg-blue-50 hover:border-blue-500",
    selected: "border-blue-500 bg-blue-100 ring-2 ring-blue-300",
  },
  {
    value: "avancado",
    label: "Avançado",
    emoji: "🚀",
    description: "Entendo sobre investimentos e planejamento",
    color: "border-violet-300 bg-violet-50 hover:border-violet-500",
    selected: "border-violet-500 bg-violet-100 ring-2 ring-violet-300",
  },
];

// Placement test questions (easy → hard)
const TEST_QUESTIONS = [
  {
    question: "Dinheiro serve para...",
    options: [
      { id: "a", text: "Trocar por coisas que precisamos" },
      { id: "b", text: "Decorar a casa" },
      { id: "c", text: "Brincar" },
    ],
    correct: "a",
    level: 1,
  },
  {
    question: "O que é troco?",
    options: [
      { id: "a", text: "Um tipo de comida" },
      { id: "b", text: "O dinheiro que sobra quando pagamos a mais" },
      { id: "c", text: "Um jogo de cartas" },
    ],
    correct: "b",
    level: 1,
  },
  {
    question: "O que é uma mesada?",
    options: [
      { id: "a", text: "Um valor recebido regularmente para aprender a administrar" },
      { id: "b", text: "Uma mesa pequena" },
      { id: "c", text: "Um tipo de conta bancária" },
    ],
    correct: "a",
    level: 2,
  },
  {
    question: "Qual a diferença entre 'querer' e 'precisar'?",
    options: [
      { id: "a", text: "Não tem diferença" },
      { id: "b", text: "'Precisar' é essencial, 'querer' é um desejo" },
      { id: "c", text: "'Querer' é mais importante" },
    ],
    correct: "b",
    level: 2,
  },
  {
    question: "O que são juros compostos?",
    options: [
      { id: "a", text: "Juros que incidem sobre o valor inicial + juros acumulados" },
      { id: "b", text: "Juros que diminuem com o tempo" },
      { id: "c", text: "Uma taxa fixa mensal" },
    ],
    correct: "a",
    level: 3,
  },
];

type Step = "choose" | "select-level" | "test" | "test-result";

export function GuestSetupFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("choose");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Test state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  function getResultLevel(correct: number): string {
    if (correct <= 2) return "iniciante";
    if (correct <= 4) return "medio";
    return "avancado";
  }

  function handleTestAnswer(optionId: string) {
    if (answered) return;
    const q = TEST_QUESTIONS[currentQuestion];
    const correct = optionId === q.correct;
    setAnswered(optionId);
    setIsCorrect(correct);

    const newCount = correct ? correctCount + 1 : correctCount;
    if (correct) setCorrectCount(newCount);

    setTimeout(() => {
      if (currentQuestion < TEST_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(null);
        setIsCorrect(false);
      } else {
        const result = getResultLevel(newCount);
        setTestResult(result);
        setStep("test-result");
      }
    }, 800);
  }

  async function handleFinish(level: string) {
    if (loading) return;
    setLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signup");
        return;
      }

      const ageGroup = LEVEL_TO_AGE[level] || "7-9";

      await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ageGroup }),
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-primary-500 to-zapfy-mint flex flex-col items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {step === "choose" && (
          <ChooseMethodScreen
            key="choose"
            onSelectLevel={() => setStep("select-level")}
            onTakeTest={() => setStep("test")}
          />
        )}

        {step === "select-level" && (
          <SelectLevelScreen
            key="select-level"
            selectedLevel={selectedLevel}
            onSelect={setSelectedLevel}
            onBack={() => setStep("choose")}
            onContinue={() => selectedLevel && handleFinish(selectedLevel)}
            loading={loading}
          />
        )}

        {step === "test" && (
          <TestScreen
            key="test"
            question={TEST_QUESTIONS[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={TEST_QUESTIONS.length}
            answered={answered}
            isCorrect={isCorrect}
            onAnswer={handleTestAnswer}
            onBack={() => {
              setStep("choose");
              setCurrentQuestion(0);
              setCorrectCount(0);
              setAnswered(null);
            }}
          />
        )}

        {step === "test-result" && testResult && (
          <TestResultScreen
            key="result"
            level={testResult}
            correctCount={correctCount}
            totalQuestions={TEST_QUESTIONS.length}
            onContinue={() => handleFinish(testResult)}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ChooseMethodScreen({
  onSelectLevel,
  onTakeTest,
}: {
  onSelectLevel: () => void;
  onTakeTest: () => void;
}) {
  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center space-y-2">
        <motion.div
          className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Sparkles size={32} className="text-primary-500" />
        </motion.div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Qual seu nível?
        </h1>
        <p className="text-sm text-muted-foreground">
          Vamos personalizar sua experiência
        </p>
      </div>

      <div className="space-y-3">
        <motion.button
          onClick={onSelectLevel}
          className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-primary-200 bg-primary-50 hover:border-primary-400 transition-all cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <Rocket size={24} className="text-primary-500" />
          </div>
          <div className="text-left flex-1">
            <p className="font-display font-bold text-foreground">
              Eu já sei meu nível
            </p>
            <p className="text-xs text-muted-foreground">
              Escolha entre Iniciante, Intermediário ou Avançado
            </p>
          </div>
          <ChevronRight size={20} className="text-muted-foreground shrink-0" />
        </motion.button>

        <motion.button
          onClick={onTakeTest}
          className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-amber-400 transition-all cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <ClipboardCheck size={24} className="text-amber-500" />
          </div>
          <div className="text-left flex-1">
            <p className="font-display font-bold text-foreground">
              Fazer teste de nivelamento
            </p>
            <p className="text-xs text-muted-foreground">
              5 perguntas rápidas para descobrir seu nível
            </p>
          </div>
          <ChevronRight size={20} className="text-muted-foreground shrink-0" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function SelectLevelScreen({
  selectedLevel,
  onSelect,
  onBack,
  onContinue,
  loading,
}: {
  selectedLevel: string | null;
  onSelect: (level: string) => void;
  onBack: () => void;
  onContinue: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} className="text-muted-foreground" />
        </button>
        <h1 className="text-xl font-display font-bold text-foreground">
          Escolha seu nível
        </h1>
      </div>

      <div className="space-y-3">
        {LEVELS.map((level, i) => (
          <motion.button
            key={level.value}
            onClick={() => onSelect(level.value)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedLevel === level.value ? level.selected : level.color
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-3xl">{level.emoji}</span>
            <div className="text-left">
              <p className="font-display font-bold text-foreground">
                {level.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {level.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        disabled={!selectedLevel || loading}
        className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileTap={{ scale: 0.97 }}
      >
        {loading ? "Preparando..." : (
          <>Começar Aventura <Rocket size={20} /></>
        )}
      </motion.button>
    </motion.div>
  );
}

function TestScreen({
  question,
  questionIndex,
  totalQuestions,
  answered,
  isCorrect,
  onAnswer,
  onBack,
}: {
  question: (typeof TEST_QUESTIONS)[number];
  questionIndex: number;
  totalQuestions: number;
  answered: string | null;
  isCorrect: boolean;
  onAnswer: (id: string) => void;
  onBack: () => void;
}) {
  const progress = ((questionIndex + (answered ? 1 : 0)) / totalQuestions) * 100;

  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} className="text-muted-foreground" />
        </button>
        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-zapfy-mint rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-muted-foreground tabular-nums">
          {questionIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          <h2 className="text-lg font-display font-bold text-foreground text-center">
            {question.question}
          </h2>

          <div className="space-y-2.5">
            {question.options.map((option) => {
              const isSelected = answered === option.id;
              const isCorrectOption = option.id === question.correct;
              const showCorrect = answered && isSelected && isCorrect;
              const showWrong = answered && isSelected && !isCorrect;
              const showRightAnswer = answered && !isCorrect && isCorrectOption;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => onAnswer(option.id)}
                  disabled={!!answered}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium text-sm transition-all cursor-pointer disabled:cursor-default
                    ${showCorrect ? "border-emerald-500 bg-emerald-50" :
                      showWrong ? "border-red-400 bg-red-50" :
                      showRightAnswer ? "border-emerald-400 bg-emerald-50" :
                      answered ? "border-border opacity-50" :
                      "border-border hover:border-primary-300 hover:bg-primary-50"
                    }`}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-1">{option.text}</span>
                    {showCorrect && <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />}
                    {showWrong && <XCircle size={20} className="text-red-500 shrink-0" />}
                    {showRightAnswer && <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function TestResultScreen({
  level,
  correctCount,
  totalQuestions,
  onContinue,
  loading,
}: {
  level: string;
  correctCount: number;
  totalQuestions: number;
  onContinue: () => void;
  loading: boolean;
}) {
  const levelInfo = LEVELS.find((l) => l.value === level) || LEVELS[0];

  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="text-6xl"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        {levelInfo.emoji}
      </motion.div>

      <div className="space-y-2">
        <motion.p
          className="text-sm font-bold text-primary-500 uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Resultado do teste
        </motion.p>
        <motion.h1
          className="text-3xl font-display font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {levelInfo.label}
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Você acertou {correctCount} de {totalQuestions} perguntas
        </motion.p>
      </div>

      <motion.p
        className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {levelInfo.description}
      </motion.p>

      <motion.button
        onClick={onContinue}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileTap={{ scale: 0.97 }}
      >
        {loading ? "Preparando..." : (
          <>Começar como {levelInfo.label} <Rocket size={20} /></>
        )}
      </motion.button>
    </motion.div>
  );
}
