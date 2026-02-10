import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Crown, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PointsDisplay } from "@/components/dashboard/points-display";
import { ChapterList } from "@/components/dashboard/chapter-list";
import { DailyBonusCard } from "@/components/dashboard/daily-bonus-card";
import { BadgeNotification } from "@/components/dashboard/badge-notification";
import type { ChapterWithProgress } from "@/lib/types";

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

  // Fetch chapters with progress for child's age group
  let chapters: ChapterWithProgress[] = [];
  let completedChapters = 0;
  let totalMissionsCompleted = 0;

  if (child) {
    const { data: chaptersData } = await supabase
      .from("chapters")
      .select("*")
      .eq("age_group", child.age_group)
      .order("order_position", { ascending: true });

    if (chaptersData) {
      // Fetch progress for all chapters
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("chapter_id, status, missions_completed, total_score")
        .eq("child_id", child.id);

      const progressMap = new Map(
        (progressData ?? []).map((p) => [p.chapter_id, p])
      );

      chapters = chaptersData.map((ch) => {
        const prog = progressMap.get(ch.id);
        return {
          ...ch,
          status: (prog?.status as ChapterWithProgress["status"]) ?? "locked",
          missions_completed: prog?.missions_completed ?? 0,
          total_score: prog?.total_score ?? 0,
        };
      });

      completedChapters = chapters.filter((c) => c.status === "completed").length;
      totalMissionsCompleted = chapters.reduce((sum, c) => sum + c.missions_completed, 0);
    }

    // If no progress records exist, initialize them
    if (chapters.length > 0 && !chapters.some((c) => c.status !== "locked")) {
      // Check if there are any progress records at all
      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("child_id", child.id);

      if (count === 0) {
        // Initialize progress: chapter 1 = unlocked, rest = locked
        const progressInserts = chapters.map((ch) => ({
          child_id: child.id,
          chapter_id: ch.id,
          status: ch.chapter_number === 1 ? "unlocked" : "locked",
        }));

        await supabase.from("user_progress").insert(progressInserts);

        // Update local state
        chapters = chapters.map((ch) => ({
          ...ch,
          status: ch.chapter_number === 1 ? "unlocked" as const : "locked" as const,
        }));
      }
    }
  }

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
  const totalMissions = chapters.length * 10;

  return (
    <div>
      {child ? (
        <>
          {/* Badge notification */}
          <BadgeNotification
            childId={child.id}
            initialPoints={child.total_points ?? 0}
            initialCompleted={totalMissionsCompleted}
            totalMissions={totalMissions}
            initialStreak={currentStreak}
          />

          {/* Two-column layout: chapters (left) + info panel (right) */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chapters - main content, shown FIRST on mobile */}
            <div className="lg:w-[480px] lg:shrink-0">
              {chapters.length > 0 && (
                <ChapterList
                  chapters={chapters}
                  childId={child.id}
                />
              )}
            </div>

            {/* Right info panel - fills remaining space, sticky on desktop */}
            <div className="flex-1 min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
              {/* Greeting */}
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Olá, {displayName}!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sua aventura financeira começa aqui!
                </p>
              </div>

              {/* Daily bonus */}
              <DailyBonusCard
                childId={child.id}
                initialStreak={currentStreak}
                initialClaimedToday={claimedToday}
              />

              {/* Stats */}
              <div className="space-y-3">
                <PointsDisplay
                  childId={child.id}
                  initialPoints={child.total_points ?? 0}
                />
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-zapfy-mint/20 rounded-xl p-2">
                        <Target size={20} className="text-zapfy-mint" />
                      </div>
                      <div>
                        <p className="text-lg font-display font-bold">
                          {totalMissionsCompleted} / {totalMissions}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Missões Completas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Premium upsell */}
              <Link href="/premium" className="block">
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-md transition-all">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 rounded-xl p-2 shrink-0">
                        <Crown size={18} className="text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-amber-900">
                          Zapfy Premium
                        </p>
                        <p className="text-[11px] text-amber-700/70 flex items-center gap-1 mt-0.5">
                          <Sparkles size={10} />
                          Badges exclusivos e mais
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-amber-400 shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
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
