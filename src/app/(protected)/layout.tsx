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

  if (user.user_metadata?.onboarding_completed !== true) {
    redirect("/onboarding");
  }

  const [{ data: child }, { data: profile }] = await Promise.all([
    supabase
      .from("children")
      .select("id, total_points")
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

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar isAdmin={isAdmin} points={points} />
      <MobileHeader childId={childId} initialPoints={points} />
      <main className="lg:ml-60 pb-20 lg:pb-0 px-4 py-6 max-w-5xl">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
