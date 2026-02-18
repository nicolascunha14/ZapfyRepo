import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewMissionPlayer } from "@/components/dashboard/new-mission-player";

export default async function MissionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ chapter?: string }>;
}) {
  const { id } = await params;
  const { chapter: chapterIdParam } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: child } = await supabase
    .from("children")
    .select("id, age_group, hearts, hearts_last_updated, zapcoins, xp, level")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) redirect("/dashboard");

  // Fetch mission
  const { data: mission } = await supabase
    .from("missions")
    .select("*")
    .eq("id", id)
    .single();

  if (!mission) redirect("/dashboard");

  const chapterId = chapterIdParam || mission.chapter_id;

  // Skip unsupported mission types (e.g. drag_drop) — find next valid mission
  const SUPPORTED_TYPES = ["quiz", "true_false", "numeric_input", "text_input", "matching"];

  if (!SUPPORTED_TYPES.includes(mission.mission_type)) {
    const { data: allMissions } = await supabase
      .from("missions")
      .select("id, mission_type")
      .eq("chapter_id", chapterId)
      .order("order_position", { ascending: true });

    if (allMissions) {
      const currentIdx = allMissions.findIndex((m) => m.id === id);
      const nextValid = allMissions.slice(currentIdx + 1).find((m) => SUPPORTED_TYPES.includes(m.mission_type));
      if (nextValid) {
        redirect(`/dashboard/mission/${nextValid.id}?chapter=${chapterId}`);
      }
    }
    redirect(`/dashboard/chapter/${chapterId}`);
  }

  // Check if already completed
  const { data: existingAttempt } = await supabase
    .from("mission_attempts")
    .select("id")
    .eq("child_id", child.id)
    .eq("mission_id", id)
    .eq("is_correct", true)
    .limit(1);

  if (existingAttempt && existingAttempt.length > 0) {
    redirect(`/dashboard/chapter/${chapterId}`);
  }

  // Check sequential order within chapter (exclude unsupported types)
  const { data: chapterMissions } = await supabase
    .from("missions")
    .select("id, mission_type")
    .eq("chapter_id", chapterId)
    .order("order_position", { ascending: true });

  if (chapterMissions && chapterMissions.length > 1) {
    const currentIndex = chapterMissions.findIndex((m) => m.id === id);

    if (currentIndex > 0) {
      const previousMissionId = chapterMissions[currentIndex - 1].id;
      const { data: prevCompleted } = await supabase
        .from("mission_attempts")
        .select("id")
        .eq("child_id", child.id)
        .eq("mission_id", previousMissionId)
        .eq("is_correct", true)
        .limit(1);

      if (!prevCompleted || prevCompleted.length === 0) {
        redirect(`/dashboard/chapter/${chapterId}`);
      }
    }
  }

  // Check chapter access
  const { data: progress } = await supabase
    .from("user_progress")
    .select("status, missions_completed")
    .eq("child_id", child.id)
    .eq("chapter_id", chapterId)
    .single();

  if (!progress || progress.status === "locked") {
    redirect("/dashboard");
  }

  // Find next valid mission id (skip unsupported types like drag_drop)
  let nextMissionId: string | null = null;
  if (chapterMissions) {
    const currentIndex = chapterMissions.findIndex((m) => m.id === id);
    if (currentIndex >= 0) {
      const nextValid = chapterMissions.slice(currentIndex + 1).find((m) => SUPPORTED_TYPES.includes(m.mission_type));
      nextMissionId = nextValid?.id ?? null;
    }
  }

  // Current mission number for progress display
  const currentMissionNumber = chapterMissions
    ? chapterMissions.findIndex((m) => m.id === id) + 1
    : 1;
  const totalMissions = chapterMissions?.length ?? 10;

  return (
    <NewMissionPlayer
      mission={mission}
      childId={child.id}
      chapterId={chapterId}
      nextMissionId={nextMissionId}
      currentMissionNumber={currentMissionNumber}
      totalMissions={totalMissions}
      completedMissions={progress.missions_completed ?? 0}
      ageGroup={child.age_group}
      initialHearts={child.hearts ?? 5}
      heartsLastUpdated={child.hearts_last_updated ?? new Date().toISOString()}
      initialZapcoins={child.zapcoins ?? 0}
      initialXP={child.xp ?? 0}
      initialLevel={child.level ?? 1}
    />
  );
}
