"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Trophy,
  Target,
  Calendar,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";
import { computeBadges, BADGES } from "@/lib/badges";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

type CompletedMissionWithDetails = {
  id: string;
  mission_id: string;
  points_earned: number;
  completed_at: string;
  missions: {
    title: string;
    theme: string;
  } | null;
};

const THEME_CONFIG: Record<string, { label: string; color: string; hex: string }> = {
  lanche: { label: "Lanche", color: "text-orange-500", hex: "#f97316" },
  troco: { label: "Troco", color: "text-emerald-600", hex: "#059669" },
  economizar: { label: "Economizar", color: "text-blue-500", hex: "#3b82f6" },
  conceitos_basicos: { label: "Conceitos", color: "text-violet-500", hex: "#8b5cf6" },
  ganhar: { label: "Ganhar", color: "text-teal-500", hex: "#14b8a6" },
  gastar: { label: "Gastar", color: "text-rose-500", hex: "#f43f5e" },
  investir: { label: "Investir", color: "text-indigo-500", hex: "#6366f1" },
};


function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function formatDateFull(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function daysSince(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function ParentDashboard({
  childId,
  childName,
  ageGroup,
  initialPoints,
  completedMissions: initialCompleted,
  totalMissions,
}: {
  childId: string;
  childName: string;
  ageGroup: string;
  initialPoints: number;
  completedMissions: CompletedMissionWithDetails[];
  totalMissions: number;
}) {
  const [points, setPoints] = useState(initialPoints);
  const [completedMissions, setCompletedMissions] = useState(initialCompleted);

  // Real-time subscriptions
  useEffect(() => {
    const supabase = createClient();

    const childChannel = supabase
      .channel(`parent-dash-child-${childId}`)
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

    const missionChannel = supabase
      .channel(`parent-dash-missions-${childId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mission_attempts",
          filter: `child_id=eq.${childId}`,
        },
        async (payload) => {
          const newMission = payload.new;
          // Fetch mission details
          const { data: missionDetail } = await supabase
            .from("missions")
            .select("title, theme")
            .eq("id", newMission.mission_id)
            .single();

          const newEntry: CompletedMissionWithDetails = {
            id: newMission.id,
            mission_id: newMission.mission_id,
            points_earned: newMission.points_earned,
            completed_at: newMission.completed_at,
            missions: missionDetail,
          };

          setCompletedMissions((prev) => [...prev, newEntry]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(childChannel);
      supabase.removeChannel(missionChannel);
    };
  }, [childId]);

  const levelInfo = getLevel(points);
  const completedCount = completedMissions.length;

  // Points evolution chart data
  const pointsChartData = useMemo(() => {
    let cumulative = 0;
    return completedMissions.map((cm) => {
      cumulative += cm.points_earned;
      return {
        date: formatDateShort(cm.completed_at),
        pontos: cumulative,
        missao: cm.missions?.title ?? "Missão",
        earned: cm.points_earned,
      };
    });
  }, [completedMissions]);

  // Theme breakdown chart data
  const themeChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cm of completedMissions) {
      const theme = cm.missions?.theme ?? "lanche";
      counts[theme] = (counts[theme] || 0) + 1;
    }
    return Object.entries(counts).map(([theme, count]) => ({
      name: THEME_CONFIG[theme]?.label ?? theme,
      count,
      fill: THEME_CONFIG[theme]?.hex ?? "#94a3b8",
    }));
  }, [completedMissions]);

  // Days since first mission
  const daysSinceFirst =
    completedMissions.length > 0
      ? daysSince(completedMissions[0].completed_at)
      : 0;

  // Recent missions (last 5, reversed for most recent first)
  const recentMissions = [...completedMissions].reverse().slice(0, 5);

  // Badges
  const badgeResults = computeBadges({
    points,
    completed: completedCount,
    totalMissions,
    streak: 0,
  });
  const unlockedCount = badgeResults.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Child header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-zapfy-mint w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-white">
                  {childName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">
                  Progresso de {childName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    {ageGroup} anos
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zapfy-coin/20 text-amber-700">
                    {levelInfo.name}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    {unlockedCount}/{BADGES.length} badges
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Coins size={22} className="mx-auto text-zapfy-coin mb-1.5" />
            <p className="text-2xl font-display font-bold tabular-nums">
              {points}
            </p>
            <p className="text-[10px] text-muted-foreground">Zap Coins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Trophy size={22} className="mx-auto text-primary-500 mb-1.5" />
            <p className="text-2xl font-display font-bold">
              Nível {levelInfo.level}
            </p>
            <p className="text-[10px] text-muted-foreground">{levelInfo.name}</p>
            {levelInfo.nextLevelPoints !== null && (
              <Progress value={levelInfo.progress} className="h-1.5 mt-2" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Target size={22} className="mx-auto text-zapfy-mint mb-1.5" />
            <p className="text-2xl font-display font-bold">
              {completedCount}/{totalMissions}
            </p>
            <p className="text-[10px] text-muted-foreground">Missões</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Calendar size={22} className="mx-auto text-violet-500 mb-1.5" />
            <p className="text-2xl font-display font-bold tabular-nums">
              {daysSinceFirst}
            </p>
            <p className="text-[10px] text-muted-foreground">Dias de jornada</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Points evolution chart */}
      {pointsChartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6 pb-4">
              <h3 className="font-display font-bold text-base mb-4">
                Evolução de Pontos
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pointsChartData}>
                    <defs>
                      <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        fontSize: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                      formatter={(value) => [`${value} pts`, "Total"]}
                      labelFormatter={(label) => label}
                    />
                    <Area
                      type="monotone"
                      dataKey="pontos"
                      stroke="#1E88E5"
                      strokeWidth={2.5}
                      fill="url(#pointsGradient)"
                      dot={{ r: 4, fill: "#1E88E5", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, fill: "#1E88E5", strokeWidth: 2, stroke: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Theme breakdown chart */}
      {themeChartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardContent className="pt-6 pb-4">
              <h3 className="font-display font-bold text-base mb-4">
                Missões por Tema
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={themeChartData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#6b7280" }}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        fontSize: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                      formatter={(value) => [`${value}`, "Completadas"]}
                    />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                      {themeChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Badges / Conquistas */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-display font-bold text-lg mb-3">
          Conquistas ({unlockedCount}/{BADGES.length})
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {badgeResults.map((badge, i) => {
            const BadgeIcon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22 + i * 0.03 }}
              >
                <Card
                  className={`${
                    badge.unlocked ? "" : "opacity-40 grayscale"
                  }`}
                >
                  <CardContent className="pt-4 pb-3 text-center space-y-1.5">
                    <div
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                        badge.unlocked
                          ? `bg-gradient-to-br ${badge.bg}`
                          : "bg-muted"
                      }`}
                    >
                      {badge.unlocked ? (
                        <BadgeIcon size={20} className={badge.color} />
                      ) : (
                        <Lock size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-[11px] font-semibold leading-tight">
                      {badge.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground leading-tight">
                      {badge.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent mission history */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="font-display font-bold text-lg mb-3">
          Missões Recentes
        </h3>
        {recentMissions.length > 0 ? (
          <div className="space-y-2">
            {recentMissions.map((cm, i) => {
              const theme = cm.missions?.theme ?? "lanche";
              const themeInfo = THEME_CONFIG[theme];

              return (
                <motion.div
                  key={cm.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + i * 0.04 }}
                >
                  <Card>
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {cm.missions?.title ?? "Missão"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`text-[10px] font-medium ${themeInfo?.color ?? "text-gray-500"}`}
                            >
                              {themeInfo?.label ?? theme}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Calendar size={10} />
                              {formatDateFull(cm.completed_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-zapfy-coin/15 rounded-full px-2.5 py-1 shrink-0">
                          <Coins size={12} className="text-amber-600" />
                          <span className="text-xs font-bold text-amber-700 tabular-nums">
                            +{cm.points_earned}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <Target
                size={32}
                className="mx-auto text-muted-foreground/30 mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Nenhuma missão completada ainda.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
