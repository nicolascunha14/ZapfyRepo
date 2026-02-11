import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BarChart3 } from "lucide-react";
import { ParentDashboard } from "@/components/dashboard/parent-dashboard";

export const metadata: Metadata = {
  title: "Painel dos Pais - Zapfy",
};

export default async function ParentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch child record
  const { data: child } = await supabase
    .from("children")
    .select("id, name, age_group, total_points")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) {
    redirect("/onboarding");
  }

  // Fetch total missions for this age group (via chapters)
  const { data: ageChapters } = await supabase
    .from("chapters")
    .select("id")
    .eq("age_group", child.age_group);

  const chapterIds = (ageChapters ?? []).map((c) => c.id);
  let totalMissions = 0;
  if (chapterIds.length > 0) {
    const { count } = await supabase
      .from("missions")
      .select("*", { count: "exact", head: true })
      .in("chapter_id", chapterIds);
    totalMissions = count ?? 0;
  }

  // Fetch completed missions (correct attempts) with details
  const { data: completedAttempts } = await supabase
    .from("mission_attempts")
    .select("id, mission_id, points_earned, completed_at, missions(title, mission_type)")
    .eq("child_id", child.id)
    .eq("is_correct", true)
    .order("completed_at", { ascending: true });

  const completedMissions = (completedAttempts ?? []).map((a) => ({
    id: a.id,
    mission_id: a.mission_id,
    points_earned: a.points_earned,
    completed_at: a.completed_at,
    missions: a.missions ? { title: (a.missions as any).title, theme: (a.missions as any).mission_type } : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-xl p-2.5">
            <BarChart3 size={24} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Painel dos Pais
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe o progresso do seu filho em tempo real
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

      <ParentDashboard
        childId={child.id}
        childName={child.name}
        ageGroup={child.age_group}
        initialPoints={child.total_points ?? 0}
        completedMissions={(completedMissions as any) ?? []}
        totalMissions={totalMissions ?? 0}
      />
    </div>
  );
}
