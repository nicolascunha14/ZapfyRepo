import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMissionContent } from "@/lib/mission-content";
import { MissionPlayer } from "@/components/dashboard/mission-player";
import type { Mission } from "@/lib/types";

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch child
  const { data: child } = await supabase
    .from("children")
    .select("id, age_group")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) {
    redirect("/onboarding");
  }

  // Fetch mission
  const { data: mission } = await supabase
    .from("missions")
    .select("*")
    .eq("id", id)
    .single();

  if (!mission) {
    redirect("/dashboard");
  }

  // Check if already completed
  const { data: completed } = await supabase
    .from("completed_missions")
    .select("id")
    .eq("child_id", child.id)
    .eq("mission_id", id)
    .limit(1);

  if (completed && completed.length > 0) {
    redirect("/dashboard");
  }

  // Check sequential order: ensure previous mission is completed
  const { data: allMissions } = await supabase
    .from("missions")
    .select("id")
    .eq("age_group", child.age_group)
    .order("display_order", { ascending: true });

  if (allMissions && allMissions.length > 1) {
    const currentIndex = allMissions.findIndex((m) => m.id === id);

    if (currentIndex > 0) {
      const previousMissionId = allMissions[currentIndex - 1].id;
      const { data: prevCompleted } = await supabase
        .from("completed_missions")
        .select("id")
        .eq("child_id", child.id)
        .eq("mission_id", previousMissionId)
        .limit(1);

      if (!prevCompleted || prevCompleted.length === 0) {
        // Previous mission not completed — redirect back
        redirect("/dashboard");
      }
    }
  }

  // Get interactive content
  const content = getMissionContent(mission.content_key);

  if (!content) {
    redirect("/dashboard");
  }

  return (
    <MissionPlayer
      mission={mission as Mission}
      childId={child.id}
      steps={content.steps}
    />
  );
}
