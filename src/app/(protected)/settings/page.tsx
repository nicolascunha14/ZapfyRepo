import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsView } from "@/components/settings/settings-view";
import type { AgeGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "Configuracoes - Zapfy",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const isGuest = user.is_anonymous === true || user.user_metadata?.is_guest === true;

  const [{ data: child }, { data: profile }] = await Promise.all([
    supabase
      .from("children")
      .select("id, name, age_group, total_points, xp, level, zapcoins, streak_current, streak_max")
      .eq("parent_id", user.id)
      .limit(1)
      .single(),
    supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single(),
  ]);

  if (!child && !isGuest) redirect("/onboarding");

  return (
    <SettingsView
      childId={child?.id ?? ""}
      childName={child?.name ?? "Explorador"}
      ageGroup={(child?.age_group as AgeGroup) ?? "7-9"}
      xp={child?.xp ?? 0}
      level={child?.level ?? 1}
      zapcoins={child?.zapcoins ?? 0}
      streakCurrent={child?.streak_current ?? 0}
      streakMax={child?.streak_max ?? 0}
      totalPoints={child?.total_points ?? 0}
      userEmail={user.email ?? ""}
      isGuest={isGuest}
      isAdmin={profile?.role === "admin"}
    />
  );
}
