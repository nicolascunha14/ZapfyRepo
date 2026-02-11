import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChapterMissions } from "@/components/dashboard/chapter-missions";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: child } = await supabase
    .from("children")
    .select("id, age_group")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) redirect("/dashboard");

  // Fetch chapter
  const { data: chapter } = await supabase
    .from("chapters")
    .select("*")
    .eq("id", id)
    .single();

  if (!chapter) redirect("/dashboard");

  // Check user has access (progress exists and not locked)
  const { data: progress } = await supabase
    .from("user_progress")
    .select("status, missions_completed, total_score")
    .eq("child_id", child.id)
    .eq("chapter_id", id)
    .single();

  if (!progress || progress.status === "locked") {
    redirect("/dashboard");
  }

  // Fetch missions for this chapter
  const { data: missions } = await supabase
    .from("missions")
    .select("*")
    .eq("chapter_id", id)
    .order("order_position", { ascending: true });

  // Fetch completed mission attempts for this child in this chapter
  const missionIds = (missions ?? []).map((m) => m.id);
  let completedMissionIds: string[] = [];

  if (missionIds.length > 0) {
    const { data: attempts } = await supabase
      .from("mission_attempts")
      .select("mission_id")
      .eq("child_id", child.id)
      .eq("is_correct", true)
      .in("mission_id", missionIds);

    completedMissionIds = [...new Set((attempts ?? []).map((a) => a.mission_id))];
  }

  return (
    <ChapterMissions
      chapter={chapter}
      missions={missions ?? []}
      completedMissionIds={completedMissionIds}
      childId={child.id}
      missionsCompleted={progress.missions_completed}
    />
  );
}
