"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Mission } from "@/lib/types";

type MissionForm = {
  title: string;
  description: string;
  tips: string;
  age_group: string;
  theme: string;
  points_reward: number;
  display_order: number;
  content_key: string;
};

const EMPTY_FORM: MissionForm = {
  title: "",
  description: "",
  tips: "",
  age_group: "7-9",
  theme: "economizar",
  points_reward: 50,
  display_order: 1,
  content_key: "",
};

const AGE_OPTIONS = ["7-9", "10-12", "13-15"];
const THEME_OPTIONS = [
  { value: "conceitos_basicos", label: "Conceitos Basicos" },
  { value: "lanche", label: "Lanche" },
  { value: "troco", label: "Troco" },
  { value: "economizar", label: "Economizar" },
  { value: "ganhar", label: "Ganhar" },
  { value: "gastar", label: "Gastar" },
  { value: "investir", label: "Investir" },
];

const THEME_COLORS: Record<string, string> = {
  lanche: "text-orange-500",
  troco: "text-emerald-600",
  economizar: "text-primary-500",
  conceitos_basicos: "text-violet-500",
  ganhar: "text-teal-500",
  gastar: "text-rose-500",
  investir: "text-indigo-500",
};

function MissionFormFields({
  form,
  setForm,
  onSave,
  onCancel,
  saving,
  error,
  submitLabel,
}: {
  form: MissionForm;
  setForm: (f: MissionForm) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string;
  submitLabel: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground">
          Titulo
        </label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Nome da missao"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground">
          Descricao
        </label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descreva a missao..."
          className="min-h-20"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground">
          Dicas
        </label>
        <Textarea
          value={form.tips}
          onChange={(e) => setForm({ ...form, tips: e.target.value })}
          placeholder="Dicas para a crianca..."
          className="min-h-16"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground">
          Content Key (conteudo interativo)
        </label>
        <Input
          value={form.content_key}
          onChange={(e) => setForm({ ...form, content_key: e.target.value })}
          placeholder="ex: conceitos_basicos-7-9"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Faixa etaria
          </label>
          <select
            value={form.age_group}
            onChange={(e) => setForm({ ...form, age_group: e.target.value })}
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {AGE_OPTIONS.map((ag) => (
              <option key={ag} value={ag}>
                {ag} anos
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Tema
          </label>
          <select
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {THEME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Pontos
          </label>
          <Input
            type="number"
            value={form.points_reward}
            onChange={(e) =>
              setForm({ ...form, points_reward: Number(e.target.value) || 0 })
            }
            min={1}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Ordem
          </label>
          <Input
            type="number"
            value={form.display_order}
            onChange={(e) =>
              setForm({ ...form, display_order: Number(e.target.value) || 0 })
            }
            min={0}
          />
        </div>
      </div>

      {error && <p className="text-xs text-error">{error}</p>}

      <div className="flex items-center gap-2 pt-1">
        <Button onClick={onSave} disabled={saving} size="sm">
          <Save size={14} />
          {saving ? "Salvando..." : submitLabel}
        </Button>
        <Button onClick={onCancel} variant="ghost" size="sm">
          <X size={14} />
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export function MissionManager({
  initialMissions,
}: {
  initialMissions: Mission[];
}) {
  const [missions, setMissions] = useState(initialMissions);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<MissionForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MissionForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function validate(form: MissionForm): string | null {
    if (!form.title.trim()) return "Titulo obrigatorio.";
    if (!form.description.trim()) return "Descricao obrigatoria.";
    if (!form.tips.trim()) return "Dicas obrigatorias.";
    if (form.points_reward < 1) return "Pontos devem ser maior que 0.";
    return null;
  }

  async function handleCreate() {
    const err = validate(createForm);
    if (err) {
      setError(err);
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("missions")
      .insert({
        title: createForm.title.trim(),
        description: createForm.description.trim(),
        tips: createForm.tips.trim(),
        age_group: createForm.age_group,
        theme: createForm.theme,
        points_reward: createForm.points_reward,
        display_order: createForm.display_order,
        content_key: createForm.content_key.trim(),
      })
      .select()
      .single();

    setSaving(false);

    if (insertError) {
      setError(`Erro: ${insertError.message}`);
      return;
    }

    setMissions((prev) =>
      [...prev, data as Mission].sort(
        (a, b) => a.display_order - b.display_order
      )
    );
    setCreateForm(EMPTY_FORM);
    setShowCreate(false);
  }

  async function handleEdit(id: string) {
    const err = validate(editForm);
    if (err) {
      setError(err);
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { data, error: updateError } = await supabase
      .from("missions")
      .update({
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        tips: editForm.tips.trim(),
        age_group: editForm.age_group,
        theme: editForm.theme,
        points_reward: editForm.points_reward,
        display_order: editForm.display_order,
        content_key: editForm.content_key.trim(),
      })
      .eq("id", id)
      .select()
      .single();

    setSaving(false);

    if (updateError) {
      setError(`Erro: ${updateError.message}`);
      return;
    }

    setMissions((prev) =>
      prev
        .map((m) => (m.id === id ? (data as Mission) : m))
        .sort((a, b) => a.display_order - b.display_order)
    );
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta missao?")) return;

    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("missions")
      .delete()
      .eq("id", id);

    if (deleteError) {
      alert(`Erro ao excluir: ${deleteError.message}`);
      return;
    }

    setMissions((prev) => prev.filter((m) => m.id !== id));
  }

  function startEdit(mission: Mission) {
    setEditingId(mission.id);
    setEditForm({
      title: mission.title,
      description: mission.description,
      tips: mission.tips,
      age_group: mission.age_group,
      theme: mission.theme,
      points_reward: mission.points_reward,
      display_order: mission.display_order,
      content_key: mission.content_key,
    });
    setError("");
  }

  // Group missions by age_group
  const grouped: Record<string, Mission[]> = {};
  for (const m of missions) {
    if (!grouped[m.age_group]) grouped[m.age_group] = [];
    grouped[m.age_group].push(m);
  }

  return (
    <div className="space-y-6">
      {/* Create button */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg">
          Missoes ({missions.length})
        </h2>
        <Button
          onClick={() => {
            setShowCreate(!showCreate);
            setError("");
          }}
          size="sm"
          variant={showCreate ? "ghost" : "default"}
        >
          {showCreate ? (
            <>
              <X size={14} /> Fechar
            </>
          ) : (
            <>
              <Plus size={14} /> Nova Missao
            </>
          )}
        </Button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-primary-500/30 bg-primary-50/30">
              <CardContent className="pt-5 pb-5">
                <p className="font-display font-bold text-sm mb-3">
                  Criar nova missao
                </p>
                <MissionFormFields
                  form={createForm}
                  setForm={setCreateForm}
                  onSave={handleCreate}
                  onCancel={() => setShowCreate(false)}
                  saving={saving}
                  error={error}
                  submitLabel="Criar"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Missions by age group */}
      {Object.entries(grouped).map(([ageGroup, groupMissions]) => (
        <div key={ageGroup}>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
            Faixa {ageGroup} anos
          </p>
          <div className="space-y-2">
            {groupMissions.map((mission) => (
              <div
                key={mission.id}
                className="border border-border/50 rounded-xl overflow-hidden bg-white"
              >
                {editingId === mission.id ? (
                  <div className="p-4">
                    <MissionFormFields
                      form={editForm}
                      setForm={setEditForm}
                      onSave={() => handleEdit(mission.id)}
                      onCancel={() => {
                        setEditingId(null);
                        setError("");
                      }}
                      saving={saving}
                      error={error}
                      submitLabel="Salvar"
                    />
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === mission.id ? null : mission.id
                        )
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">
                            {mission.title}
                          </p>
                          <span
                            className={`text-[10px] font-medium ${
                              THEME_COLORS[mission.theme] ?? "text-gray-500"
                            }`}
                          >
                            {mission.theme}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {mission.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold tabular-nums text-amber-700 bg-zapfy-coin/15 px-2 py-0.5 rounded-full shrink-0">
                        {mission.points_reward} pts
                      </span>
                      {expandedId === mission.id ? (
                        <ChevronUp
                          size={14}
                          className="text-muted-foreground shrink-0"
                        />
                      ) : (
                        <ChevronDown
                          size={14}
                          className="text-muted-foreground shrink-0"
                        />
                      )}
                    </button>

                    {expandedId === mission.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="border-t border-border/50 px-4 py-3 bg-muted/20"
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          Dicas:
                        </p>
                        <p className="text-xs mb-3">{mission.tips}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => startEdit(mission)}
                          >
                            <Pencil size={12} /> Editar
                          </Button>
                          <Button
                            size="xs"
                            variant="destructive"
                            onClick={() => handleDelete(mission.id)}
                          >
                            <Trash2 size={12} /> Excluir
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {missions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Nenhuma missao cadastrada.
          </p>
        </div>
      )}
    </div>
  );
}
