"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Pencil,
  Check,
  X,
  Coins,
  Star,
  Target,
  Calendar,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";

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
  completedMissions,
  totalMissions,
}: {
  childId: string;
  initialName: string;
  ageGroup: string;
  totalPoints: number;
  completedMissions: CompletedMissionWithDetails[];
  totalMissions: number;
}) {
  const [name, setName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const level = getLevel(totalPoints);
  const completedCount = completedMissions.length;
  const avgPoints =
    completedCount > 0
      ? Math.round(
          completedMissions.reduce((sum, m) => sum + m.points_earned, 0) /
            completedCount
        )
      : 0;

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
      {/* Profile header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="bg-gradient-to-br from-primary-500 to-zapfy-mint w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                <User size={28} className="text-white" />
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

                {/* Age group + level */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    {ageGroup} anos
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zapfy-coin/20 text-amber-700">
                    {level.name}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Points badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-primary-500 to-zapfy-mint border-0 text-white">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 font-medium">Total de pontos</p>
                <p className="text-4xl font-display font-bold tabular-nums mt-1">
                  {totalPoints}
                </p>
                <p className="text-sm text-white/70 mt-0.5">Zap Coins</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <Coins size={36} className="text-white" />
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
        className="grid grid-cols-3 gap-3"
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
            <Star size={20} className="mx-auto text-zapfy-coin mb-1" />
            <p className="text-xl font-display font-bold tabular-nums">
              {totalPoints}
            </p>
            <p className="text-[10px] text-muted-foreground">Pontos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Coins size={20} className="mx-auto text-primary-500 mb-1" />
            <p className="text-xl font-display font-bold tabular-nums">
              {avgPoints}
            </p>
            <p className="text-[10px] text-muted-foreground">Media/missao</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mission history */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                  transition={{ delay: 0.25 + i * 0.04 }}
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
        transition={{ delay: 0.3 }}
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
