"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Pencil,
  Check,
  X,
  Target,
  Calendar,
  LogOut,
  ChevronRight,
  Gift,
  Copy,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { computeBadges, BADGES } from "@/lib/badges";
import { Lock, Award } from "lucide-react";
import { FriendsManager } from "@/components/dashboard/friends-manager";
import { XPBar } from "@/components/gamification/XPBar";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import { LeagueCard } from "@/components/gamification/LeagueCard";

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

const THEME_LABELS: Record<string, { label: string; color: string }> = {
  lanche: { label: "Lanche", color: "text-orange-500" },
  troco: { label: "Troco", color: "text-emerald-600" },
  economizar: { label: "Economizar", color: "text-primary-500" },
  conceitos_basicos: { label: "Conceitos", color: "text-violet-500" },
  ganhar: { label: "Ganhar", color: "text-teal-500" },
  gastar: { label: "Gastar", color: "text-rose-500" },
  investir: { label: "Investir", color: "text-indigo-500" },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ProfileView({
  childId,
  initialName,
  ageGroup,
  totalPoints,
  xp,
  level,
  zapcoins,
  streakCurrent,
  streakMax,
  completedMissions,
  totalMissions,
  referralCode,
  referralCount,
  currentStreak,
  friends,
  pendingRequests,
  isGuest,
  isPremium,
}: {
  childId: string;
  initialName: string;
  ageGroup: string;
  totalPoints: number;
  xp: number;
  level: number;
  zapcoins: number;
  streakCurrent: number;
  streakMax: number;
  completedMissions: CompletedMissionWithDetails[];
  totalMissions: number;
  referralCode: string;
  referralCount: number;
  currentStreak: number;
  friends: { id: string; name: string; age_group: string; total_points: number }[];
  pendingRequests: { id: string; requester: { id: string; name: string; age_group: string; total_points: number } }[];
  isGuest?: boolean;
  isPremium?: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const completedCount = completedMissions.length;

  async function handleSaveName() {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setError("O nome nao pode ficar vazio.");
      return;
    }
    if (trimmed.length < 2) {
      setError("O nome precisa ter pelo menos 2 letras.");
      return;
    }
    if (trimmed === name) {
      setEditingName(false);
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("children")
      .update({ name: trimmed })
      .eq("id", childId);

    setSaving(false);

    if (updateError) {
      setError("Erro ao salvar. Tente novamente.");
      return;
    }

    setName(trimmed);
    setEditingName(false);
  }

  function handleCancelEdit() {
    setNameInput(name);
    setEditingName(false);
    setError("");
  }

  return (
    <div className="space-y-6">
      {/* Profile header card with avatar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-4">
              {/* Avatar with customize button */}
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                  isPremium
                    ? "bg-gradient-to-br from-amber-400 to-yellow-500 ring-2 ring-amber-300 shadow-lg shadow-amber-200/50"
                    : "bg-gradient-to-br from-primary-500 to-zapfy-mint"
                }`}>
                  <User size={28} className="text-white" />
                </div>
                {isPremium && (
                  <div className="absolute -top-1.5 -left-1.5 bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center shadow-sm border-2 border-white">
                    <span className="text-[10px]">👑</span>
                  </div>
                )}
                <button
                  className="absolute -bottom-1 -right-1 bg-white border border-border rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-muted transition-colors cursor-pointer"
                  title="Personalizar avatar"
                >
                  <Pencil size={10} className="text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                {/* Name (editable) */}
                {editingName ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="font-display font-bold text-lg h-9"
                        maxLength={30}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName();
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={saving}
                        className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors cursor-pointer"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {error && (
                      <p className="text-xs text-error">{error}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-xl truncate">
                      {name}
                    </h2>
                    {isPremium && (
                      <span className="shrink-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        PREMIUM
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setNameInput(name);
                        setEditingName(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer shrink-0"
                    >
                      <Pencil size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                )}

                {/* Age group + zapcoins */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    {ageGroup} anos
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zapfy-coin/20 text-amber-700">
                    🪙 {zapcoins.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* XP Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card>
          <CardContent className="pt-4 pb-4">
            <XPBar xp={xp} level={level} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Streak current / max */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <StreakDisplay streak={streakCurrent} />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Recorde</p>
                <p className="font-display font-bold text-lg text-foreground">
                  🔥 {streakMax} dias
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 gap-3"
      >
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Target size={20} className="mx-auto text-zapfy-mint mb-1" />
            <p className="text-xl font-display font-bold">
              {completedCount}/{totalMissions}
            </p>
            <p className="text-[10px] text-muted-foreground">Missoes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <span className="text-xl block mb-1">🪙</span>
            <p className="text-xl font-display font-bold tabular-nums">
              {zapcoins.toLocaleString("pt-BR")}
            </p>
            <p className="text-[10px] text-muted-foreground">Zap Coins</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges / Conquistas */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.17 }}
      >
        {(() => {
          const badgeResults = computeBadges({
            points: totalPoints,
            completed: completedCount,
            totalMissions,
            streak: currentStreak,
          });
          const unlockedCount = badgeResults.filter((b) => b.unlocked).length;

          return (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-amber-500" />
                  <h3 className="font-display font-bold text-lg">Conquistas</h3>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {unlockedCount}/{BADGES.length}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {badgeResults.map((badge, i) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                    >
                      <Card
                        className={`transition-all ${
                          badge.unlocked
                            ? "ring-1 ring-amber-200 shadow-sm"
                            : "opacity-40 grayscale"
                        }`}
                      >
                        <CardContent className="pt-4 pb-3 text-center space-y-1.5">
                          <motion.div
                            className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br ${
                              badge.unlocked ? badge.bg : "from-gray-100 to-gray-50"
                            }`}
                            whileHover={badge.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                          >
                            {badge.unlocked ? (
                              <BadgeIcon size={22} className={badge.color} />
                            ) : (
                              <Lock size={16} className="text-muted-foreground" />
                            )}
                          </motion.div>
                          <p className="text-xs font-bold leading-tight">
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
            </>
          );
        })()}
      </motion.div>

      {/* League card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.19 }}
      >
        <LeagueCard
          leagueName="Bronze"
          leagueIcon="🥉"
          position={1}
          totalPlayers={1}
          weeklyXP={xp}
          promotionThreshold={3}
        />
      </motion.div>

      {/* Referral / Invite section (hidden for guests) */}
      {!isGuest && referralCode && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
            <CardContent className="pt-6 pb-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 rounded-xl p-2.5">
                  <Gift size={22} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">
                    Convidar Amigos
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    +50 pontos por cada amigo que se cadastrar
                  </p>
                </div>
              </div>

              {/* Copy link */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white border border-border rounded-xl px-3 py-2.5 text-xs text-muted-foreground truncate font-mono">
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/signup?ref=${referralCode}`
                    : `/signup?ref=${referralCode}`}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const link = `${window.location.origin}/signup?ref=${referralCode}`;
                    navigator.clipboard.writeText(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              {/* Referral count */}
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-primary-500" />
                <span className="font-medium">
                  {referralCount}{" "}
                  {referralCount === 1 ? "amigo convidado" : "amigos convidados"}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Friends manager (hidden for guests) */}
      {!isGuest && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardContent className="pt-6">
              <FriendsManager
                childId={childId}
                initialFriends={friends}
                initialPendingRequests={pendingRequests}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Mission history */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-display font-bold text-lg mb-3">
          Historico de Missoes
        </h3>
        {completedMissions.length > 0 ? (
          <div className="space-y-2">
            {completedMissions.map((cm, i) => {
              const theme = cm.missions?.theme ?? "lanche";
              const themeInfo = THEME_LABELS[theme] ?? THEME_LABELS.lanche;

              return (
                <motion.div
                  key={cm.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.04 }}
                >
                  <Card>
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {cm.missions?.title ?? "Missao"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`text-[10px] font-medium ${themeInfo.color}`}
                            >
                              {themeInfo.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Calendar size={10} />
                              {formatDate(cm.completed_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-zapfy-coin/15 rounded-full px-2.5 py-1 shrink-0">
                          <span className="text-xs">🪙</span>
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
                Nenhuma missao completada ainda. Complete missoes para ganhar
                pontos!
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-error hover:bg-error/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="font-medium text-sm">Sair da conta</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
