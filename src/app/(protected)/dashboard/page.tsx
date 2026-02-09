import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Crown, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PointsDisplay } from "@/components/dashboard/points-display";
import { MissionsList } from "@/components/dashboard/missions-list";
import { DailyBonusCard } from "@/components/dashboard/daily-bonus-card";
import { BadgeNotification } from "@/components/dashboard/badge-notification";

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

  // Fetch daily login for today
  const todayStr = new Date().toISOString().split("T")[0];
  const { data: todayLogin } = child
    ? await supabase
        .from("daily_logins")
        .select("streak_count")
        .eq("child_id", child.id)
        .eq("login_date", todayStr)
        .single()
    : { data: null };

  const claimedToday = !!todayLogin;
  const currentStreak = todayLogin?.streak_count ?? 0;

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
          {/* Badge notification */}
          <BadgeNotification
            childId={child.id}
            initialPoints={child.total_points ?? 0}
            initialCompleted={completedCount}
            totalMissions={totalMissions}
            initialStreak={currentStreak}
          />

          {/* Daily bonus */}
          <DailyBonusCard
            childId={child.id}
            initialStreak={currentStreak}
            initialClaimedToday={claimedToday}
          />

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

          {/* Premium upsell */}
          <Link href="/premium" className="block">
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-md transition-all">
              <CardContent className="py-4 px-5">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 rounded-xl p-2 shrink-0">
                    <Crown size={20} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-amber-900">
                      Desbloqueie o Zapfy Premium
                    </p>
                    <p className="text-[11px] text-amber-700/70 flex items-center gap-1 mt-0.5">
                      <Sparkles size={10} />
                      Missões avançadas, badges exclusivos e muito mais
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-amber-400 shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
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
