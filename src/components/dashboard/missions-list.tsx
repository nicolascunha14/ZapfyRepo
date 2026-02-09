"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { MissionCard } from "@/components/dashboard/mission-card";
import type { Mission } from "@/lib/types";

export function MissionsList({
  missions,
  childId,
  initialCompletedIds,
}: {
  missions: Mission[];
  childId: string;
  initialCompletedIds: string[];
}) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(initialCompletedIds)
  );

  const handleComplete = useCallback((missionId: string) => {
    setCompletedIds((prev) => new Set(prev).add(missionId));
  }, []);

  // Subscribe to real-time completed_missions inserts
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`completed-missions-${childId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "completed_missions",
          filter: `child_id=eq.${childId}`,
        },
        (payload) => {
          const missionId = payload.new.mission_id;
          if (typeof missionId === "string") {
            setCompletedIds((prev) => new Set(prev).add(missionId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [childId]);

  const completedCount = missions.filter((m) => completedIds.has(m.id)).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl">Suas Missões</h2>
        <span className="text-sm text-muted-foreground">
          {completedCount} / {missions.length} completadas
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission, index) => {
          const isCompleted = completedIds.has(mission.id);
          // First mission is always unlocked; others require the previous one to be completed
          const isLocked =
            index > 0 && !completedIds.has(missions[index - 1].id);

          return (
            <MissionCard
              key={mission.id}
              mission={mission}
              childId={childId}
              isCompleted={isCompleted}
              isLocked={isLocked}
              onComplete={handleComplete}
            />
          );
        })}
      </div>
    </div>
  );
}
