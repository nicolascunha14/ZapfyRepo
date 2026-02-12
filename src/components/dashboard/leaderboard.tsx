"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, Users, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";

type RankedChild = {
  id: string;
  name: string;
  age_group: string;
  total_points: number;
};

const AGE_TABS = [
  { key: "7-9", label: "Iniciante", color: "bg-emerald-500", ring: "ring-emerald-200" },
  { key: "10-12", label: "Intermediário", color: "bg-primary-500", ring: "ring-primary-200" },
  { key: "13-15", label: "Avançado", color: "bg-violet-500", ring: "ring-violet-200" },
] as const;

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
                  (Voce)
                </span>
              )}
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {level.name}
          </span>
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

function Podium({
  top3,
  currentChildId,
}: {
  top3: RankedChild[];
  currentChildId: string | null;
}) {
  if (top3.length < 3) return null;

  return (
    <div className="grid grid-cols-3 gap-2 mb-2">
      {[1, 0, 2].map((podiumIndex) => {
        const child = top3[podiumIndex];
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
  );
}

export function Leaderboard({
  rankingByAge,
  friendsRanking,
  currentChildId,
  currentAgeGroup,
}: {
  rankingByAge: Record<string, RankedChild[]>;
  friendsRanking: RankedChild[];
  currentChildId: string | null;
  currentAgeGroup: string;
}) {
  const [mode, setMode] = useState<"global" | "friends">("global");
  const [activeTab, setActiveTab] = useState(currentAgeGroup);
  const [rankings, setRankings] = useState(rankingByAge);
  const [friends, setFriends] = useState(friendsRanking);

  // Global mode data
  const globalRanking = rankings[activeTab] ?? [];
  const globalTop10 = globalRanking.slice(0, 10);
  const globalUserIndex = globalRanking.findIndex((c) => c.id === currentChildId);
  const globalUserPosition = globalUserIndex >= 0 ? globalUserIndex + 1 : null;
  const globalCurrentUser = globalUserIndex >= 0 ? globalRanking[globalUserIndex] : null;
  const globalIsInTop10 = globalUserPosition !== null && globalUserPosition <= 10;

  // Friends mode data
  const friendsTop10 = friends.slice(0, 10);
  const friendsUserIndex = friends.findIndex((c) => c.id === currentChildId);
  const friendsUserPosition = friendsUserIndex >= 0 ? friendsUserIndex + 1 : null;
  const friendsCurrentUser = friendsUserIndex >= 0 ? friends[friendsUserIndex] : null;
  const friendsIsInTop10 = friendsUserPosition !== null && friendsUserPosition <= 10;

  // Real-time updates
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
          setRankings((prev) => {
            const ageGroup = updated.age_group;
            if (!prev[ageGroup]) return prev;
            const next = prev[ageGroup].map((c) =>
              c.id === updated.id
                ? { ...c, total_points: updated.total_points ?? c.total_points }
                : c
            );
            return {
              ...prev,
              [ageGroup]: next.sort((a, b) => b.total_points - a.total_points),
            };
          });
          // Also update friends ranking
          setFriends((prev) => {
            const idx = prev.findIndex((c) => c.id === updated.id);
            if (idx === -1) return prev;
            const next = [...prev];
            next[idx] = { ...next[idx], total_points: updated.total_points ?? next[idx].total_points };
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
      {/* Global / Friends toggle */}
      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
        <button
          type="button"
          onClick={() => setMode("global")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-bold transition-all cursor-pointer ${
            mode === "global"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe size={16} />
          Geral
        </button>
        <button
          type="button"
          onClick={() => setMode("friends")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-bold transition-all cursor-pointer ${
            mode === "friends"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users size={16} />
          Amigos
          {friends.length > 0 && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              mode === "friends" ? "bg-primary-100 text-primary-600" : "bg-muted text-muted-foreground"
            }`}>
              {friends.length}
            </span>
          )}
        </button>
      </div>

      {mode === "global" ? (
        <>
          {/* Age group tabs */}
          <div className="flex gap-2">
            {AGE_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = (rankings[tab.key] ?? []).length;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2 px-3 rounded-xl text-center font-display font-bold transition-all cursor-pointer ${
                    isActive
                      ? `${tab.color} text-white shadow-md ring-2 ${tab.ring}`
                      : "bg-white border border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Top 3 podium */}
          <Podium top3={globalTop10} currentChildId={currentChildId} />

          {/* Full ranking list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {globalTop10.map((child, i) => (
                <RankRow
                  key={child.id}
                  child={child}
                  position={i + 1}
                  isCurrentUser={child.id === currentChildId}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Current user not in top 10 */}
          {!globalIsInTop10 && globalCurrentUser && globalUserPosition && activeTab === currentAgeGroup && (
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
                  child={globalCurrentUser}
                  position={globalUserPosition}
                  isCurrentUser={true}
                  index={0}
                />
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {globalRanking.length === 0 && (
            <div className="text-center py-12">
              <Trophy size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">
                Nenhum jogador nesta faixa etaria ainda. Complete missoes para aparecer aqui!
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Friends ranking */}
          {friends.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-2">
                Voce ainda nao tem amigos adicionados.
              </p>
              <p className="text-sm text-muted-foreground">
                Adicione amigos no seu perfil para ver o ranking entre amigos!
              </p>
            </div>
          ) : (
            <>
              {/* Top 3 podium */}
              <Podium top3={friendsTop10} currentChildId={currentChildId} />

              {/* Full friends ranking list */}
              <AnimatePresence mode="wait">
                <motion.div
                  key="friends"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {friendsTop10.map((child, i) => (
                    <RankRow
                      key={child.id}
                      child={child}
                      position={i + 1}
                      isCurrentUser={child.id === currentChildId}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Current user not in top 10 friends */}
              {!friendsIsInTop10 && friendsCurrentUser && friendsUserPosition && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className="border-t border-dashed border-border pt-4">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      Sua posicao entre amigos
                    </p>
                    <RankRow
                      child={friendsCurrentUser}
                      position={friendsUserPosition}
                      isCurrentUser={true}
                      index={0}
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
