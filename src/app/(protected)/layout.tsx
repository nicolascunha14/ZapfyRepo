import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileHeader } from "@/components/layout/mobile-header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isGuest = user.is_anonymous === true || user.user_metadata?.is_guest === true;

  if (!isGuest && user.user_metadata?.onboarding_completed !== true) {
    redirect("/onboarding");
  }

  const [{ data: child }, { data: profile }] = await Promise.all([
    supabase
      .from("children")
      .select("id, total_points, xp, level, zapcoins, streak_current, streak_max, hearts, hearts_last_updated, age_group, name")
      .eq("parent_id", user.id)
      .limit(1)
      .single(),
    supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single(),
  ]);

  const isAdmin = profile?.role === "admin";
  const points = child?.total_points ?? 0;
  const childId = child?.id ?? "";
  const zapcoins = child?.zapcoins ?? 0;
  const streakCurrent = child?.streak_current ?? 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar isAdmin={isAdmin} points={points} zapcoins={zapcoins} streak={streakCurrent} />
      <MobileHeader childId={childId} initialPoints={points} zapcoins={zapcoins} streak={streakCurrent} />
      <main className="lg:ml-60 pb-20 lg:pb-0 px-4 py-6 lg:px-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
