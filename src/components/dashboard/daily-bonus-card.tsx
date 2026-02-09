"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Gift, Coins, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

function getStreakBonus(streak: number): number {
  if (streak >= 5) return 25;
  if (streak >= 4) return 20;
  if (streak >= 3) return 15;
  if (streak >= 2) return 10;
  return 5;
}

function getNextBonus(streak: number): number | null {
  if (streak >= 5) return null; // max
  return getStreakBonus(streak + 1);
}

export function DailyBonusCard({
  childId,
  initialStreak,
  initialClaimedToday,
}: {
  childId: string;
  initialStreak: number;
  initialClaimedToday: boolean;
}) {
  const [streak, setStreak] = useState(initialStreak);
  const [claimedToday, setClaimedToday] = useState(initialClaimedToday);
  const [showReward, setShowReward] = useState(false);
  const [bonusAwarded, setBonusAwarded] = useState(0);
  const hasRun = useRef(false);

  // Auto-claim on first render if not claimed today
  useEffect(() => {
    if (claimedToday || hasRun.current) return;
    hasRun.current = true;

    async function claimDailyBonus() {
      const supabase = createClient();

      // Get yesterday's login to determine streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const { data: yesterdayLogin } = await supabase
        .from("daily_logins")
        .select("streak_count")
        .eq("child_id", childId)
        .eq("login_date", yesterdayStr)
        .single();

      const newStreak = yesterdayLogin ? yesterdayLogin.streak_count + 1 : 1;
      const bonus = getStreakBonus(newStreak);

      // Insert today's login (UNIQUE constraint prevents duplicates)
      const todayStr = new Date().toISOString().split("T")[0];
      const { error: insertError } = await supabase
        .from("daily_logins")
        .insert({
          child_id: childId,
          login_date: todayStr,
          streak_count: newStreak,
          bonus_points: bonus,
        });

      if (insertError) {
        // Already claimed (duplicate) — just mark as claimed
        if (insertError.code === "23505") {
          setClaimedToday(true);
          return;
        }
        console.error("[daily-bonus] Insert error:", insertError);
        return;
      }

      // Award bonus points to child
      const { data: child } = await supabase
        .from("children")
        .select("total_points")
        .eq("id", childId)
        .single();

      if (child) {
        await supabase
          .from("children")
          .update({ total_points: (child.total_points ?? 0) + bonus })
          .eq("id", childId);
      }

      setStreak(newStreak);
      setBonusAwarded(bonus);
      setClaimedToday(true);
      setShowReward(true);

      // Hide reward animation after 3s
      setTimeout(() => setShowReward(false), 3000);
    }

    claimDailyBonus();
  }, [childId, claimedToday]);

  const currentBonus = getStreakBonus(streak);
  const nextBonus = getNextBonus(streak);

  // Streak flame colors based on streak level
  const flameColor =
    streak >= 5
      ? "text-red-500"
      : streak >= 3
        ? "text-orange-500"
        : "text-amber-500";

  const flameBg =
    streak >= 5
      ? "bg-red-100"
      : streak >= 3
        ? "bg-orange-100"
        : "bg-amber-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden relative">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-4">
            {/* Flame icon with streak count */}
            <div className="relative">
              <motion.div
                className={`${flameBg} rounded-2xl p-3`}
                animate={
                  showReward
                    ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                <Flame size={28} className={flameColor} />
              </motion.div>
              {streak > 0 && claimedToday && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                >
                  {streak}
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {claimedToday ? (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-amber-900">
                      {streak} {streak === 1 ? "dia" : "dias"} seguidos!
                    </h3>
                  </div>
                  <p className="text-xs text-amber-700/70 mt-0.5">
                    <Clock size={10} className="inline mr-1" />
                    Volte amanhã para manter seu streak!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-display font-bold text-base text-amber-900">
                    Bônus Diário
                  </h3>
                  <p className="text-xs text-amber-700/70 mt-0.5">
                    Carregando seu bônus...
                  </p>
                </>
              )}

              {/* Streak progress dots */}
              {claimedToday && (
                <div className="flex items-center gap-1.5 mt-2">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <motion.div
                      key={day}
                      className={`w-6 h-1.5 rounded-full ${
                        streak >= day
                          ? "bg-gradient-to-r from-amber-400 to-orange-500"
                          : "bg-amber-200"
                      }`}
                      initial={streak >= day ? { scaleX: 0 } : {}}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.1 * day, duration: 0.3 }}
                    />
                  ))}
                  <span className="text-[9px] text-amber-600 font-medium ml-1">
                    {nextBonus ? `+${nextBonus} pts amanhã` : "Bônus máximo!"}
                  </span>
                </div>
              )}
            </div>

            {/* Points badge */}
            {claimedToday && (
              <motion.div
                className="flex items-center gap-1 bg-amber-500 text-white rounded-full px-3 py-1.5 shrink-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
              >
                <Coins size={14} />
                <span className="text-sm font-bold tabular-nums">
                  +{bonusAwarded || currentBonus}
                </span>
              </motion.div>
            )}
          </div>

          {/* Reward animation overlay */}
          <AnimatePresence>
            {showReward && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-amber-500/10 backdrop-blur-[1px] rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={{ scale: 0.5, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: -20, opacity: 0 }}
                >
                  <Gift size={32} className="text-amber-600" />
                  <p className="font-display font-bold text-lg text-amber-800">
                    +{bonusAwarded} pontos!
                  </p>
                  <p className="text-xs text-amber-600">
                    {streak} {streak === 1 ? "dia" : "dias"} de streak
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
