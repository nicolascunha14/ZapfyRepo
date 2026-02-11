import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Shield } from "lucide-react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import type { Mission } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin - Zapfy",
};

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all users with their children data
  const { data: users } = await supabase
    .from("users")
    .select("id, email, display_name, created_at")
    .order("created_at", { ascending: false });

  // Fetch all children
  const { data: children } = await supabase
    .from("children")
    .select("id, parent_id, name, age_group, total_points");

  // Fetch all completed mission attempts per child
  const { data: completions } = await supabase
    .from("mission_attempts")
    .select("child_id, id")
    .eq("is_correct", true);

  // Fetch all missions (new chapter-based system)
  const { data: missions } = await supabase
    .from("missions")
    .select("*, chapters(age_group, title)")
    .order("order_position", { ascending: true });

  // Build user rows
  const childByParent = new Map(
    (children ?? []).map((c) => [c.parent_id, c])
  );
  const completionsByChild = new Map<string, number>();
  for (const cm of completions ?? []) {
    completionsByChild.set(
      cm.child_id,
      (completionsByChild.get(cm.child_id) ?? 0) + 1
    );
  }

  const userRows = (users ?? []).map((u) => {
    const child = childByParent.get(u.id);
    return {
      id: u.id,
      email: u.email,
      display_name: u.display_name,
      created_at: u.created_at,
      child_name: child?.name ?? null,
      child_age_group: child?.age_group ?? null,
      missions_completed: child
        ? completionsByChild.get(child.id) ?? 0
        : 0,
      total_points: child?.total_points ?? 0,
    };
  });

  // Metrics
  const totalUsers = userRows.length;
  const usersWithChild = userRows.filter((u) => u.child_name !== null);
  const usersWithCompletion = userRows.filter(
    (u) => u.missions_completed > 0
  );
  const totalCompleted = userRows.reduce(
    (sum, u) => sum + u.missions_completed,
    0
  );
  const activationRate =
    usersWithChild.length > 0
      ? Math.round((usersWithCompletion.length / usersWithChild.length) * 100)
      : 0;
  const avgPoints =
    usersWithChild.length > 0
      ? Math.round(
          usersWithChild.reduce((sum, u) => sum + u.total_points, 0) /
            usersWithChild.length
        )
      : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-violet-100 rounded-xl p-2.5">
            <Shield size={24} className="text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Painel Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie usuarios e missoes
            </p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          Voltar
        </Link>
      </div>

      <AdminDashboard
        metrics={{
          totalUsers,
          totalCompleted,
          activationRate,
          avgPoints,
        }}
        users={userRows}
      />

      <div className="border-t border-border pt-6">
        <h2 className="font-display font-bold text-lg mb-2">
          Missões ({missions?.length ?? 0})
        </h2>
        <p className="text-sm text-muted-foreground">
          O gerenciamento de missões agora usa o sistema de capítulos. Use o SQL Editor do Supabase para gerenciar.
        </p>
      </div>
    </div>
  );
}
