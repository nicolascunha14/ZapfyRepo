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
