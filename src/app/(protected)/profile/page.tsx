import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import { ProfileView } from "@/components/dashboard/profile-view";

export const metadata: Metadata = {
  title: "Perfil - Zapfy",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch child record
  const { data: child } = await supabase
    .from("children")
    .select("id, name, age_group, total_points")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) {
    redirect("/onboarding");
  }

  // Fetch referral data
  const { data: userData } = await supabase
    .from("users")
    .select("referral_code")
    .eq("id", user.id)
    .single();

  const { count: referralCount } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("referrer_id", user.id);

  // Fetch current streak (latest daily login)
  const { data: latestLogin } = await supabase
    .from("daily_logins")
    .select("streak_count")
    .eq("child_id", child.id)
    .order("login_date", { ascending: false })
    .limit(1)
    .single();

  // Fetch friendships
  const { data: acceptedFriendships } = await supabase
    .from("friendships")
    .select("requester_id, addressee_id")
    .eq("status", "accepted")
    .or(`requester_id.eq.${child.id},addressee_id.eq.${child.id}`);

  const friendIds = (acceptedFriendships ?? []).map((f) =>
    f.requester_id === child.id ? f.addressee_id : f.requester_id
  );

  let friends: { id: string; name: string; age_group: string; total_points: number }[] = [];
  if (friendIds.length > 0) {
    const { data: friendsData } = await supabase
      .from("children")
      .select("id, name, age_group, total_points")
      .in("id", friendIds)
      .order("total_points", { ascending: false });
    friends = friendsData ?? [];
  }

  // Fetch pending friend requests (sent TO this child)
  const { data: pendingRows } = await supabase
    .from("friendships")
    .select("id, requester_id")
    .eq("addressee_id", child.id)
    .eq("status", "pending");

  let pendingRequests: { id: string; requester: { id: string; name: string; age_group: string; total_points: number } }[] = [];
  if (pendingRows && pendingRows.length > 0) {
    const requesterIds = pendingRows.map((r) => r.requester_id);
    const { data: requesters } = await supabase
      .from("children")
      .select("id, name, age_group, total_points")
      .in("id", requesterIds);

    if (requesters) {
      pendingRequests = pendingRows.map((row) => ({
        id: row.id,
        requester: requesters.find((r) => r.id === row.requester_id)!,
      })).filter((r) => r.requester);
    }
  }

  // Count total missions for this age group
  const { count: totalMissions } = await supabase
    .from("missions")
    .select("*", { count: "exact", head: true })
    .eq("age_group", child.age_group);

  // Fetch completed missions with mission details
  const { data: completedMissions } = await supabase
    .from("completed_missions")
    .select("id, mission_id, points_earned, completed_at, missions(title, theme)")
    .eq("child_id", child.id)
    .order("completed_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-xl p-2.5">
            <User size={24} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Perfil
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seu perfil e veja seu historico
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

      <ProfileView
        childId={child.id}
        initialName={child.name}
        ageGroup={child.age_group}
        totalPoints={child.total_points ?? 0}
        completedMissions={(completedMissions as any) ?? []}
        totalMissions={totalMissions ?? 0}
        referralCode={userData?.referral_code ?? ""}
        referralCount={referralCount ?? 0}
        currentStreak={latestLogin?.streak_count ?? 0}
        friends={friends}
        pendingRequests={pendingRequests}
      />
    </div>
  );
}
