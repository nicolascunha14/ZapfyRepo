"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Loader2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const childFormSchema = z.object({
  name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
  ageGroup: z.enum(["7-9", "10-12", "13-15"], {
    message: "Selecione a faixa etária.",
  }),
});

type ChildFormValues = z.infer<typeof childFormSchema>;

const ageGroupOptions = [
  {
    value: "7-9" as const,
    label: "7 a 9 anos",
    emoji: "🌱",
    description: "Conceitos básicos",
  },
  {
    value: "10-12" as const,
    label: "10 a 12 anos",
    emoji: "🌿",
    description: "Intermediário",
  },
  {
    value: "13-15" as const,
    label: "13 a 15 anos",
    emoji: "🌳",
    description: "Avançado",
  },
];

interface SlideChildFormProps {
  onComplete: (name: string, ageGroup: string) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

export function SlideChildForm({
  onComplete,
  isSubmitting,
  error,
}: SlideChildFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema),
  });

  const selectedAge = watch("ageGroup");

  async function onSubmit(values: ChildFormValues) {
    await onComplete(values.name, values.ageGroup);
  }

  return (
    <div className="h-dvh w-full flex flex-col bg-white">
      {/* Top gradient accent bar */}
      <div className="bg-gradient-to-r from-primary-500 to-zapfy-mint pt-12 pb-8 px-6 flex flex-col items-center">
        <motion.div
          className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <User size={40} className="text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-white mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Sobre a criança
        </motion.h2>
        <motion.p
          className="text-white/80 text-sm mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Personalize a experiência
        </motion.p>
      </div>

      {/* Form area */}
      <div className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
        {error && (
          <motion.div
            className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name input */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="childName"
              className="text-sm font-semibold text-foreground"
            >
              Nome da criança
            </label>
            <input
              id="childName"
              placeholder="Ex: Maria, João..."
              className="w-full h-13 rounded-2xl border-2 border-border bg-white px-4 text-base font-medium
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Age group cards */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-sm font-semibold text-foreground">
              Faixa etária
            </label>
            <div className="grid gap-3">
              {ageGroupOptions.map((option, i) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setValue("ageGroup", option.value, {
                      shouldValidate: true,
                    })
                  }
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left cursor-pointer",
                    selectedAge === option.value
                      ? "border-primary-500 bg-primary-50/50 shadow-[0_0_0_3px_rgba(30,136,229,0.1)]"
                      : "border-border hover:border-primary-300 bg-white"
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <div>
                    <p className="font-display font-bold text-base">
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  {selectedAge === option.value && (
                    <motion.div
                      className="ml-auto w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            {errors.ageGroup && (
              <p className="text-destructive text-sm">
                {errors.ageGroup.message}
              </p>
            )}
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg
                         shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                         flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Preparando sua primeira missão...
                </>
              ) : (
                <>
                  <Rocket size={22} />
                  Começar aventura!
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
