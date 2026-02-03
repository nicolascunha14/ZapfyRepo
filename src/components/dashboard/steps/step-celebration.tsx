"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function StepCelebrationComponent({
  missionId,
  missionTitle,
  childId,
  pointsReward,
}: {
  missionId: string;
  missionTitle: string;
  childId: string;
  pointsReward: number;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function saveCompletion() {
      const supabase = createClient();

      // Insert completed mission
      const { error: insertError } = await supabase
        .from("completed_missions")
        .insert({
          child_id: childId,
          mission_id: missionId,
          points_earned: pointsReward,
        });

      if (insertError && insertError.code !== "23505") {
        toast.error(`Erro ao salvar: ${insertError.message}`);
        return;
      }

      // Update total points
      const { data: child } = await supabase
        .from("children")
        .select("total_points")
        .eq("id", childId)
        .single();

      if (child) {
        await supabase
          .from("children")
          .update({
            total_points: (child.total_points ?? 0) + pointsReward,
          })
          .eq("id", childId);
      }

      setSaved(true);
    }

    saveCompletion();
  }, [childId, missionId, pointsReward]);

  return (
    <div className="relative flex flex-col items-center text-center space-y-6 px-4 overflow-hidden">
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: [
                "#1E88E5",
                "#6EE7B7",
                "#FCD34D",
                "#F59E0B",
                "#22C55E",
                "#EF4444",
                "#8B5CF6",
              ][i % 7],
            }}
          />
        ))}
      </div>

      {/* Trophy icon */}
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
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Missão Completada!
        </h2>
        <p className="text-muted-foreground mt-1">{missionTitle}</p>
      </motion.div>

      {/* Points badge */}
      <motion.div
        className="flex items-center gap-2 bg-zapfy-coin/20 rounded-full px-6 py-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
      >
        <Coins size={24} className="text-zapfy-coin" />
        <span className="text-2xl font-display font-bold text-amber-700">
          +{pointsReward}
        </span>
        <span className="text-sm font-medium text-amber-600">Zap Coins</span>
      </motion.div>

      {/* Back button */}
      <motion.button
        onClick={() => {
          router.push("/dashboard");
          router.refresh();
        }}
        className="w-full max-w-xs rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-6 py-4 text-white font-display font-semibold text-lg
                   shadow-[var(--shadow-floating)] hover:shadow-[var(--shadow-card)] hover:scale-[1.02]
                   transition-all cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.97 }}
        disabled={!saved}
      >
        {saved ? "Voltar ao Dashboard" : "Salvando..."}
      </motion.button>
    </div>
  );
}
