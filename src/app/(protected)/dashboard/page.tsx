import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import { PointsDisplay } from "@/components/dashboard/points-display";
import { MissionsList } from "@/components/dashboard/missions-list";

export const metadata: Metadata = {
  title: "Dashboard - Zapfy",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = user?.user_metadata;
  const displayName =
    meta?.display_name ||
    meta?.full_name ||
    meta?.name ||
    user?.email?.split("@")[0] ||
    "Explorador";

  // Fetch child record
  const { data: child } = await supabase
    .from("children")
    .select("id, name, age_group, total_points")
    .eq("parent_id", user!.id)
    .limit(1)
    .single();

  // Fetch missions for child's age group
  const { data: missions } = child
    ? await supabase
        .from("missions")
        .select("*")
        .eq("age_group", child.age_group)
        .order("display_order", { ascending: true })
    : { data: null };

  // Fetch completed missions for this child
  const { data: completedMissions } = child
    ? await supabase
        .from("completed_missions")
        .select("mission_id")
        .eq("child_id", child.id)
    : { data: null };

  const completedIds = (completedMissions ?? []).map((cm) => cm.mission_id);
  const totalMissions = missions?.length ?? 0;
  const completedCount = completedIds.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Olá, {displayName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao seu painel Zapfy. Sua aventura financeira começa aqui!
        </p>
      </div>

      {child ? (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <PointsDisplay
                childId={child.id}
                initialPoints={child.total_points ?? 0}
              />
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-zapfy-mint/20 rounded-xl p-2.5">
                    <Target size={24} className="text-zapfy-mint" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">
                      {completedCount} / {totalMissions}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Missões Completas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Missions list */}
          {missions && missions.length > 0 && (
            <MissionsList
              missions={missions}
              childId={child.id}
              initialCompletedIds={completedIds}
            />
          )}
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground">
              Complete o onboarding para ver suas missões.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
