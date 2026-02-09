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
    .select("id, age_group")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  // Fetch all children sorted by points, grouped by age
  const [{ data: ranking79 }, { data: ranking1012 }, { data: ranking1315 }] =
    await Promise.all([
      supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .eq("age_group", "7-9")
        .order("total_points", { ascending: false })
        .limit(50),
      supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .eq("age_group", "10-12")
        .order("total_points", { ascending: false })
        .limit(50),
      supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .eq("age_group", "13-15")
        .order("total_points", { ascending: false })
        .limit(50),
    ]);

  // Fetch friends ranking
  let friendsRanking: { id: string; name: string; age_group: string; total_points: number }[] = [];

  if (child) {
    // Get accepted friendships (both directions)
    const { data: friendships } = await supabase
      .from("friendships")
      .select("requester_id, addressee_id")
      .eq("status", "accepted")
      .or(`requester_id.eq.${child.id},addressee_id.eq.${child.id}`);

    if (friendships && friendships.length > 0) {
      // Collect friend IDs
      const friendIds = friendships.map((f) =>
        f.requester_id === child.id ? f.addressee_id : f.requester_id
      );

      // Include current child + all friends
      const allIds = [child.id, ...friendIds];

      const { data: friendsData } = await supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .in("id", allIds)
        .order("total_points", { ascending: false });

      friendsRanking = friendsData ?? [];
    } else {
      // No friends, just show current child
      const { data: selfData } = await supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .eq("id", child.id)
        .single();

      if (selfData) {
        friendsRanking = [selfData];
      }
    }
  }

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
        rankingByAge={{
          "7-9": ranking79 ?? [],
          "10-12": ranking1012 ?? [],
          "13-15": ranking1315 ?? [],
        }}
        friendsRanking={friendsRanking}
        currentChildId={child?.id ?? null}
        currentAgeGroup={child?.age_group ?? "7-9"}
      />
    </div>
  );
}
