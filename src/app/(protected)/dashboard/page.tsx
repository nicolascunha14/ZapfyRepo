import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Crown, Sparkles, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { DailyBonusCard } from "@/components/dashboard/daily-bonus-card";
import { BadgeNotification } from "@/components/dashboard/badge-notification";
import { GuestBanner } from "@/components/dashboard/guest-banner";
import { AgeGroupTabs } from "@/components/dashboard/age-group-tabs";
import { XPBar } from "@/components/gamification/XPBar";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import { ZapcoinsDisplay } from "@/components/gamification/ZapcoinsDisplay";
import { LeagueCard } from "@/components/gamification/LeagueCard";
import type { AgeGroup, ChapterWithProgress, Mission } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard - Zapfy",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = user?.user_metadata;
  const isGuest = user?.is_anonymous === true || meta?.is_guest === true;
  const displayName =
    meta?.display_name ||
    meta?.full_name ||
    meta?.name ||
    user?.email?.split("@")[0] ||
    "Explorador";

  // Fetch child record with gamification fields
  const { data: child } = await supabase
    .from("children")
    .select("id, name, age_group, total_points, xp, level, zapcoins, streak_current, streak_max, hearts, hearts_last_updated, league_xp_this_week, completed_age_groups")
    .eq("parent_id", user!.id)
    .limit(1)
    .single();

  // Fetch chapters with progress for child's age group
  let chapters: ChapterWithProgress[] = [];
  let totalMissionsCompleted = 0;
  let activeChapterIndex = 0;
  let activeMissions: Mission[] = [];
  let completedMissionIds: string[] = [];

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

      totalMissionsCompleted = chapters.reduce((sum, c) => sum + c.missions_completed, 0);
    }

    // If no progress records exist, initialize them
    if (chapters.length > 0 && !chapters.some((c) => c.status !== "locked")) {
      const { count } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("child_id", child.id);

      if (count === 0) {
        const progressInserts = chapters.map((ch) => ({
          child_id: child.id,
          chapter_id: ch.id,
          status: ch.chapter_number === 1 ? "unlocked" : "locked",
        }));

        await supabase.from("user_progress").insert(progressInserts);

        chapters = chapters.map((ch) => ({
          ...ch,
          status: ch.chapter_number === 1 ? "unlocked" as const : "locked" as const,
        }));
      }
    }

    // Find active chapter (first unlocked/in_progress)
    const activeIdx = chapters.findIndex(
      (c) => c.status === "unlocked" || c.status === "in_progress"
    );
    activeChapterIndex = activeIdx >= 0 ? activeIdx : 0;

    // Fetch missions for the active chapter
    const activeChapter = chapters[activeChapterIndex];
    if (activeChapter) {
      const { data: missionsData } = await supabase
        .from("missions")
        .select("*")
        .eq("chapter_id", activeChapter.id)
        .order("order_position", { ascending: true });

      activeMissions = missionsData ?? [];

      // Fetch completed mission IDs
      const missionIds = activeMissions.map((m) => m.id);
      if (missionIds.length > 0) {
        const { data: attempts } = await supabase
          .from("mission_attempts")
          .select("mission_id")
          .eq("child_id", child.id)
          .eq("is_correct", true)
          .in("mission_id", missionIds);

        completedMissionIds = [...new Set((attempts ?? []).map((a) => a.mission_id))];
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

  // League data - calculate position from ranking
  let leaguePosition = 1;
  let leagueTotalPlayers = 1;
  if (child) {
    const { data: rankingData } = await supabase
      .from("children")
      .select("id")
      .eq("age_group", child.age_group)
      .neq("is_guest", true)
      .order("total_points", { ascending: false })
      .limit(50);

    if (rankingData) {
      leagueTotalPlayers = rankingData.length;
      const idx = rankingData.findIndex((r) => r.id === child.id);
      leaguePosition = idx >= 0 ? idx + 1 : rankingData.length;
    }
  }

  // Check if all chapters are completed and exam status
  const allChaptersCompleted = chapters.length > 0 && chapters.every((c) => c.status === "completed");
  let examPassed = false;
  if (child && allChaptersCompleted) {
    const { data: passedExam } = await supabase
      .from("exam_attempts")
      .select("id")
      .eq("child_id", child.id)
      .eq("age_group", child.age_group)
      .eq("passed", true)
      .limit(1)
      .single();

    examPassed = !!passedExam;
  }

  const completedAgeGroups: string[] = (child?.completed_age_groups as string[]) ?? [];

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

          {/* Gamified header */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-zapfy-mint w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-display font-bold text-foreground leading-tight">
                    {child.name || displayName}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {child.age_group} anos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {(child.streak_current ?? 0) > 0 && (
                  <div className="flex items-center gap-1 bg-orange-50 rounded-full px-2.5 py-1.5">
                    <span className="text-sm">🔥</span>
                    <span className="text-sm font-bold text-orange-600 tabular-nums">
                      {child.streak_current}
                    </span>
                  </div>
                )}
                <ZapcoinsDisplay amount={child.zapcoins ?? 0} />
              </div>
            </div>
            <XPBar xp={child.xp ?? 0} level={child.level ?? 1} />
          </div>

          {/* Two-column layout: mission path (left) + info panel (right) */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mission path - main content */}
            <div className="lg:w-[580px] lg:shrink-0">
              {chapters.length > 0 && (
                <AgeGroupTabs
                  currentAgeGroup={child.age_group as AgeGroup}
                  completedAgeGroups={completedAgeGroups}
                  childId={child.id}
                  initialChapters={chapters}
                  initialActiveChapterIndex={activeChapterIndex}
                  initialMissions={activeMissions}
                  initialCompletedMissionIds={completedMissionIds}
                  allChaptersCompleted={allChaptersCompleted}
                  examPassed={examPassed}
                />
              )}
            </div>

            {/* Right info panel - fills remaining space */}
            <div className="flex-1 min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
              {/* Guest banner */}
              {isGuest && <GuestBanner />}

              {/* Streak card */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <StreakDisplay
                    streak={child.streak_current ?? 0}
                    isNewRecord={(child.streak_current ?? 0) > 0 && (child.streak_current ?? 0) >= (child.streak_max ?? 0)}
                  />
                </CardContent>
              </Card>

              {/* Daily bonus */}
              <DailyBonusCard
                childId={child.id}
                initialStreak={currentStreak}
                initialClaimedToday={claimedToday}
              />

              {/* Missions count */}
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

              {/* League card */}
              <LeagueCard
                leagueName="Bronze"
                leagueIcon="🥉"
                position={leaguePosition}
                totalPlayers={leagueTotalPlayers}
                weeklyXP={child.league_xp_this_week ?? 0}
                promotionThreshold={3}
                relegationThreshold={5}
              />

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
