import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Find guest child
  const { data: child } = await supabase
    .from("children")
    .select("id")
    .eq("parent_id", userId)
    .eq("is_guest", true)
    .limit(1)
    .single();

  if (!child) {
    return NextResponse.json({ success: true, message: "no guest child" });
  }

  // Delete all related data
  await Promise.all([
    supabase.from("mission_attempts").delete().eq("child_id", child.id),
    supabase.from("exam_attempts").delete().eq("child_id", child.id),
    supabase.from("user_progress").delete().eq("child_id", child.id),
    supabase.from("daily_logins").delete().eq("child_id", child.id),
  ]);

  // Delete child and user records
  await supabase.from("children").delete().eq("id", child.id);
  await supabase.from("users").delete().eq("id", userId);

  // Delete the anonymous auth user
  await supabase.auth.admin.deleteUser(userId);

  return NextResponse.json({ success: true });
}
