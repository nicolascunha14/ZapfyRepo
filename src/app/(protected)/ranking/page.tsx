import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Trophy } from "lucide-react";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ranking - Zapfy",
};

export default async function RankingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch current user's child
  const { data: child } = await supabase
    .from("children")
    .select("id")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  // Fetch all children sorted by points (top performers)
  const { data: ranking } = await supabase
    .from("children")
    .select("id, name, age_group, total_points")
    .order("total_points", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 rounded-xl p-2.5">
            <Trophy size={24} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Ranking
            </h1>
            <p className="text-sm text-muted-foreground">
              Os melhores exploradores financeiros!
            </p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          Voltar
        </Link>
      </div>

      <Leaderboard
        initialRanking={ranking ?? []}
        currentChildId={child?.id ?? null}
      />
    </div>
  );
}
