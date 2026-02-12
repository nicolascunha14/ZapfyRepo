"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Pencil, Check, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { XPBar } from "@/components/gamification/XPBar";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import type { AgeGroup } from "@/lib/types";
import { AGE_GROUP_LABELS } from "@/lib/types";

const AGE_GROUPS: { value: AgeGroup; emoji: string; color: string; selectedColor: string }[] = [
  { value: "7-9", emoji: "🌱", color: "border-emerald-200 hover:border-emerald-400", selectedColor: "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200" },
  { value: "10-12", emoji: "🌿", color: "border-blue-200 hover:border-blue-400", selectedColor: "border-blue-500 bg-blue-50 ring-2 ring-blue-200" },
  { value: "13-15", emoji: "🌳", color: "border-violet-200 hover:border-violet-400", selectedColor: "border-violet-500 bg-violet-50 ring-2 ring-violet-200" },
];

export function ProfileTab({
  childId,
  initialName,
  ageGroup,
  xp,
  level,
  zapcoins,
  streakCurrent,
  streakMax,
  totalPoints,
}: {
  childId: string;
  initialName: string;
  ageGroup: AgeGroup;
  xp: number;
  level: number;
  zapcoins: number;
  streakCurrent: number;
  streakMax: number;
  totalPoints: number;
}) {
  const [name, setName] = useState(initialName);
  const [nameInput, setNameInput] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentAgeGroup, setCurrentAgeGroup] = useState<AgeGroup>(ageGroup);
  const [changingAge, setChangingAge] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

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
    showSuccess("Nome atualizado!");
  }

  async function handleChangeAgeGroup(newAge: AgeGroup) {
    if (newAge === currentAgeGroup) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja mudar para a faixa ${AGE_GROUP_LABELS[newAge]} (${newAge} anos)?\n\nIsso pode afetar o conteudo disponivel e o progresso atual.`
    );
    if (!confirmed) return;

    setChangingAge(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("children")
      .update({ age_group: newAge })
      .eq("id", childId);

    setChangingAge(false);

    if (error) {
      setError("Erro ao alterar faixa etaria.");
      return;
    }

    setCurrentAgeGroup(newAge);
    showSuccess(`Faixa alterada para ${AGE_GROUP_LABELS[newAge]}!`);
  }

  return (
    <div className="space-y-5">
      {/* Success toast */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl font-medium"
        >
          {successMsg}
        </motion.div>
      )}

      {/* Avatar */}
      <Card>
        <CardContent className="pt-6 pb-6 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500 to-zapfy-mint w-20 h-20 rounded-2xl flex items-center justify-center">
              <User size={36} className="text-white" />
            </div>
            <button
              className="absolute -bottom-1 -right-1 bg-white border border-border rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:bg-muted transition-colors cursor-pointer"
              title="Personalizar avatar"
            >
              <Pencil size={12} className="text-muted-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Personalizar avatar (em breve)</p>
        </CardContent>
      </Card>

      {/* Name */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
            Nome
          </label>
          {editingName ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="font-display font-bold text-base rounded-xl"
                  maxLength={30}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") {
                      setEditingName(false);
                      setNameInput(name);
                      setError("");
                    }
                  }}
                />
                <Button
                  onClick={handleSaveName}
                  disabled={saving}
                  size="icon"
                  className="rounded-xl shrink-0"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                </Button>
                <Button
                  onClick={() => {
                    setEditingName(false);
                    setNameInput(name);
                    setError("");
                  }}
                  variant="outline"
                  size="icon"
                  className="rounded-xl shrink-0"
                >
                  <X size={16} />
                </Button>
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg">{name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
                onClick={() => {
                  setNameInput(name);
                  setEditingName(true);
                }}
              >
                <Pencil size={14} />
                Editar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Age Group */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Faixa Etaria
          </label>
          <div className="flex gap-2">
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.value}
                onClick={() => handleChangeAgeGroup(ag.value)}
                disabled={changingAge}
                className={`flex-1 py-3 rounded-xl border-2 font-display font-bold text-sm transition-all cursor-pointer disabled:opacity-50 ${
                  ag.value === currentAgeGroup ? ag.selectedColor : ag.color
                }`}
              >
                <span className="block text-lg mb-0.5">{ag.emoji}</span>
                {ag.value} anos
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Mudar a faixa pode afetar o conteudo disponivel
          </p>
        </CardContent>
      </Card>

      {/* XP Bar */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Progresso
          </label>
          <XPBar xp={xp} level={level} />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <span className="text-2xl block mb-1">🔥</span>
            <p className="text-xl font-display font-bold">{streakCurrent}</p>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <span className="text-2xl block mb-1">🪙</span>
            <p className="text-xl font-display font-bold tabular-nums">{zapcoins}</p>
            <p className="text-[10px] text-muted-foreground">Zap Coins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <span className="text-2xl block mb-1">⭐</span>
            <p className="text-xl font-display font-bold tabular-nums">{totalPoints}</p>
            <p className="text-[10px] text-muted-foreground">Pontos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
