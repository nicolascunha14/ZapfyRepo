"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export function PointsHeader({
  childId,
  initialPoints,
}: {
  childId: string;
  initialPoints: number;
}) {
  const [points, setPoints] = useState(initialPoints);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`child-points-${childId}`)
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
            setFlash(true);
            setTimeout(() => setFlash(false), 600);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [childId]);

  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-zapfy-coin/20 rounded-full p-1.5">
        <Coins size={16} className="text-zapfy-coin" />
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={points}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`text-sm font-display font-bold tabular-nums ${
            flash ? "text-zapfy-coin" : "text-foreground"
          } transition-colors`}
        >
          {points}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
