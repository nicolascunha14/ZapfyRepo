"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";

type RankedChild = {
  id: string;
  name: string;
  age_group: string;
  total_points: number;
};

const AGE_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  "7-9": { label: "7-9", bg: "bg-emerald-100", text: "text-emerald-700" },
  "10-12": { label: "10-12", bg: "bg-primary-100", text: "text-primary-700" },
  "13-15": { label: "13-15", bg: "bg-violet-100", text: "text-violet-700" },
};

function MedalIcon({ position }: { position: number }) {
  if (position === 1) {
    return (
      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
        <Crown size={18} className="text-amber-500" />
      </div>
    );
  }
  if (position === 2) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <Medal size={18} className="text-gray-400" />
      </div>
    );
  }
  if (position === 3) {
    return (
      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
        <Medal size={18} className="text-orange-400" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">
        {position}
      </span>
    </div>
  );
}

function RankRow({
  child,
  position,
  isCurrentUser,
  index,
}: {
  child: RankedChild;
  position: number;
  isCurrentUser: boolean;
  index: number;
}) {
  const badge = AGE_BADGE[child.age_group] ?? AGE_BADGE["7-9"];
  const level = getLevel(child.total_points);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
          isCurrentUser
            ? "bg-primary-500/10 border-2 border-primary-500/30"
            : "bg-white border border-border/50"
        }`}
      >
        <MedalIcon position={position} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className={`font-display font-bold text-sm truncate ${
                isCurrentUser ? "text-primary-600" : "text-foreground"
              }`}
            >
              {child.name}
              {isCurrentUser && (
                <span className="text-xs font-medium text-primary-500 ml-1.5">
                  (Você)
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}
            >
              {badge.label} anos
            </span>
            <span className="text-xs text-muted-foreground">
              {level.name}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="font-display font-bold text-sm tabular-nums">
            {child.total_points}
          </p>
          <p className="text-[10px] text-muted-foreground">pontos</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Leaderboard({
  initialRanking,
  currentChildId,
}: {
  initialRanking: RankedChild[];
  currentChildId: string | null;
}) {
  const [ranking, setRanking] = useState(initialRanking);

  // Find current user's position
  const currentUserIndex = ranking.findIndex((c) => c.id === currentChildId);
  const currentUserPosition = currentUserIndex >= 0 ? currentUserIndex + 1 : null;
  const currentUser = currentUserIndex >= 0 ? ranking[currentUserIndex] : null;
  const isInTop10 = currentUserPosition !== null && currentUserPosition <= 10;

  const top10 = ranking.slice(0, 10);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("leaderboard-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "children",
        },
        (payload) => {
          const updated = payload.new as RankedChild;
          setRanking((prev) => {
            const next = prev.map((c) =>
              c.id === updated.id
                ? { ...c, total_points: updated.total_points ?? c.total_points }
                : c
            );
            return next.sort((a, b) => b.total_points - a.total_points);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Top 3 podium */}
      {top10.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[1, 0, 2].map((podiumIndex) => {
            const child = top10[podiumIndex];
            if (!child) return null;
            const position = podiumIndex + 1;
            const isMe = child.id === currentChildId;
            const isFirst = position === 1;

            return (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: podiumIndex * 0.15 }}
                className={`flex flex-col items-center ${
                  isFirst ? "order-2 -mt-2" : position === 2 ? "order-1 mt-4" : "order-3 mt-4"
                }`}
              >
                <Card
                  className={`w-full p-3 text-center ${
                    isMe
                      ? "bg-primary-500/10 border-primary-500/30"
                      : "bg-white"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isFirst
                          ? "bg-amber-100"
                          : position === 2
                          ? "bg-gray-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {isFirst ? (
                        <Crown size={24} className="text-amber-500" />
                      ) : (
                        <Medal
                          size={22}
                          className={
                            position === 2
                              ? "text-gray-400"
                              : "text-orange-400"
                          }
                        />
                      )}
                    </div>
                  </div>
                  <p className="font-display font-bold text-xs truncate">
                    {child.name}
                  </p>
                  <p className="font-display font-bold text-sm text-primary-600 tabular-nums mt-0.5">
                    {child.total_points} pts
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full ranking list */}
      <AnimatePresence>
        <div className="space-y-2">
          {top10.map((child, i) => (
            <RankRow
              key={child.id}
              child={child}
              position={i + 1}
              isCurrentUser={child.id === currentChildId}
              index={i}
            />
          ))}
        </div>
      </AnimatePresence>

      {/* Current user not in top 10 */}
      {!isInTop10 && currentUser && currentUserPosition && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className="border-t border-dashed border-border pt-4">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Sua posicao no ranking
            </p>
            <RankRow
              child={currentUser}
              position={currentUserPosition}
              isCurrentUser={true}
              index={0}
            />
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {ranking.length === 0 && (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            Nenhum jogador no ranking ainda. Complete missoes para aparecer
            aqui!
          </p>
        </div>
      )}
    </div>
  );
}
