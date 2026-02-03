"use client";

import { useEffect, useState } from "react";
import { Coins, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function PointsDisplay({
  childId,
  initialPoints,
}: {
  childId: string;
  initialPoints: number;
}) {
  const [points, setPoints] = useState(initialPoints);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`points-display-${childId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "children",
          filter: `id=eq.${childId}`,
        },
        (payload) => {
          const newPoints = payload.new.total_points;
          if (typeof newPoints === "number") {
            setPoints(newPoints);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [childId]);

  const levelInfo = getLevel(points);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Points card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-zapfy-coin/20 rounded-xl p-2.5">
              <Coins size={24} className="text-zapfy-coin" />
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={points}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-display font-bold tabular-nums"
                >
                  {points}
                </motion.p>
              </AnimatePresence>
              <p className="text-sm text-muted-foreground">Zap Coins</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level card */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 rounded-xl p-2.5">
              <Trophy size={24} className="text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                Nível {levelInfo.level}
              </p>
              <p className="text-sm text-muted-foreground">{levelInfo.name}</p>
            </div>
          </div>
          {levelInfo.nextLevelPoints !== null && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{points} pts</span>
                <span>{levelInfo.nextLevelPoints} pts</span>
              </div>
              <Progress value={levelInfo.progress} className="h-2" />
            </div>
          )}
          {levelInfo.nextLevelPoints === null && (
            <p className="text-xs text-zapfy-mint font-medium">
              Nível máximo alcançado!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
