import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/ui/logo";
import { LogOut, Trophy, User, Shield } from "lucide-react";
import { PointsHeader } from "@/components/dashboard/points-header";

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

  // Safety net: if onboarding not completed, redirect to onboarding
  if (user.user_metadata?.onboarding_completed !== true) {
    console.log("[protected/layout] User has not completed onboarding, redirecting. user_metadata:", user.user_metadata);
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

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white/90 backdrop-blur-md border-b border-border/50 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            {child && (
              <PointsHeader
                childId={child.id}
                initialPoints={child.total_points ?? 0}
              />
            )}
            <Link
              href="/ranking"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-500 transition-colors"
            >
              <Trophy size={16} />
              <span className="hidden sm:inline">Ranking</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary-500 transition-colors"
            >
              <User size={16} />
              <span className="hidden sm:inline">Perfil</span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm text-violet-500 hover:text-violet-600 transition-colors"
              >
                <Shield size={16} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
