"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Coins,
  TrendingUp,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type UserRow = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  child_name: string | null;
  child_age_group: string | null;
  missions_completed: number;
  total_points: number;
};

type Metrics = {
  totalUsers: number;
  totalCompleted: number;
  activationRate: number;
  avgPoints: number;
};

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-3">
            <div className={`${color} rounded-xl p-2.5`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold tabular-nums">
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
              {sub && (
                <p className="text-[10px] text-muted-foreground/70">{sub}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function UserDetailRow({ user }: { user: UserRow }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer text-left"
      >
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary-600">
            {(user.child_name || user.email)[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {user.child_name || "Sem crianca"}
          </p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {user.child_age_group && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 hidden sm:inline">
              {user.child_age_group}
            </span>
          )}
          <span className="text-xs font-bold tabular-nums text-amber-700 bg-zapfy-coin/15 px-2 py-0.5 rounded-full">
            {user.total_points} pts
          </span>
          {open ? (
            <ChevronUp size={14} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={14} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-border/50 px-4 py-3 bg-muted/20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cadastro</p>
              <p className="font-medium">{formatDate(user.created_at)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Missoes</p>
              <p className="font-medium">{user.missions_completed} completas</p>
            </div>
            <div>
              <p className="text-muted-foreground">Faixa etaria</p>
              <p className="font-medium">
                {user.child_age_group
                  ? `${user.child_age_group} anos`
                  : "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function AdminDashboard({
  metrics,
  users,
}: {
  metrics: Metrics;
  users: UserRow[];
}) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? users.filter(
        (u) =>
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          (u.child_name &&
            u.child_name.toLowerCase().includes(search.toLowerCase()))
      )
    : users;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Users}
          label="Total de usuarios"
          value={String(metrics.totalUsers)}
          color="bg-primary-500"
          delay={0}
        />
        <MetricCard
          icon={Target}
          label="Missoes completadas"
          value={String(metrics.totalCompleted)}
          color="bg-zapfy-mint"
          delay={0.05}
        />
        <MetricCard
          icon={TrendingUp}
          label="Taxa de ativacao"
          value={`${metrics.activationRate}%`}
          sub="completaram 1a missao"
          color="bg-violet-500"
          delay={0.1}
        />
        <MetricCard
          icon={Coins}
          label="Media de pontos"
          value={String(metrics.avgPoints)}
          sub="por usuario"
          color="bg-amber-500"
          delay={0.15}
        />
      </div>

      {/* Users section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">
            Usuarios ({filtered.length})
          </h2>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar por email ou nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* User list */}
        <div className="space-y-2">
          {filtered.map((user) => (
            <UserDetailRow key={user.id} user={user} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Nenhum usuario encontrado.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
