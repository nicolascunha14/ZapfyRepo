"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { computeBadges } from "@/lib/badges";
import type { BadgeResult } from "@/lib/badges";

const STORAGE_KEY = "zapfy_seen_badges";

function getSeenBadges(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function markBadgeSeen(id: string) {
  const seen = getSeenBadges();
  seen.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
}

export function BadgeNotification({
  childId,
  initialPoints,
  initialCompleted,
  totalMissions,
  initialStreak,
}: {
  childId: string;
  initialPoints: number;
  initialCompleted: number;
  totalMissions: number;
  initialStreak: number;
}) {
  const [points, setPoints] = useState(initialPoints);
  const [completed, setCompleted] = useState(initialCompleted);
  const [newBadge, setNewBadge] = useState<BadgeResult | null>(null);

  // Listen for real-time updates
  useEffect(() => {
    const supabase = createClient();

    const ch1 = supabase
      .channel(`badge-notif-child-${childId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "children", filter: `id=eq.${childId}` },
        (payload) => {
          if (typeof payload.new.total_points === "number") {
            setPoints(payload.new.total_points);
          }
        }
      )
      .subscribe();

    const ch2 = supabase
      .channel(`badge-notif-missions-${childId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mission_attempts", filter: `child_id=eq.${childId}` },
        () => {
          setCompleted((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch1);
      supabase.removeChannel(ch2);
    };
  }, [childId]);

  // Check for new badges whenever points or completed changes
  useEffect(() => {
    const badges = computeBadges({
      points,
      completed,
      totalMissions,
      streak: initialStreak,
    });

    const seen = getSeenBadges();
    const newlyUnlocked = badges.find((b) => b.unlocked && !seen.has(b.id));

    if (newlyUnlocked) {
      setNewBadge(newlyUnlocked);
      markBadgeSeen(newlyUnlocked.id);
    }
  }, [points, completed, totalMissions, initialStreak]);

  // Mark initial badges as seen on first load
  useEffect(() => {
    const badges = computeBadges({
      points: initialPoints,
      completed: initialCompleted,
      totalMissions,
      streak: initialStreak,
    });
    const seen = getSeenBadges();
    let changed = false;
    for (const b of badges) {
      if (b.unlocked && !seen.has(b.id)) {
        // On first load, only show notification if it's truly new (not initial state)
        // Mark all initially unlocked as seen
        seen.add(b.id);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    setNewBadge(null);
  }

  return (
    <AnimatePresence>
      {newBadge && (
        <motion.div
          className="fixed bottom-22 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-white border border-amber-200 rounded-2xl shadow-xl p-4 relative overflow-hidden">
            {/* Shimmer bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/50 to-transparent animate-pulse" />

            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
            >
              <X size={16} />
            </button>

            <div className="relative flex items-center gap-4">
              {/* Badge icon */}
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${newBadge.bg} shrink-0`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <newBadge.icon size={26} className={newBadge.color} />
              </motion.div>

              <div>
                <motion.p
                  className="text-[10px] uppercase tracking-wider text-amber-600 font-bold"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Nova Conquista!
                </motion.p>
                <motion.p
                  className="font-display font-bold text-lg text-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {newBadge.name}
                </motion.p>
                <motion.p
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {newBadge.description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
