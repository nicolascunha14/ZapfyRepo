import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const VALID_AGE_GROUPS = ["7-9", "10-12", "13-15"];

export async function POST(request: Request) {
  const { userId, ageGroup } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const selectedAgeGroup = VALID_AGE_GROUPS.includes(ageGroup) ? ageGroup : "7-9";

  // Use service role to bypass RLS for guest setup
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Upsert public.users row
  await supabase.from("users").upsert(
    {
      id: userId,
      email: `guest-${userId.slice(0, 8)}@zapfy.app`,
      display_name: "Explorador",
    },
    { onConflict: "id" }
  );

  // Create or update child with selected age_group
  const { data: existingChild } = await supabase
    .from("children")
    .select("id")
    .eq("parent_id", userId)
    .limit(1);

  if (!existingChild || existingChild.length === 0) {
    const { error: insertError } = await supabase.from("children").insert({
      parent_id: userId,
      user_id: userId,
      name: "Explorador",
      age_group: selectedAgeGroup,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  } else {
    // Update age_group if child already exists
    await supabase
      .from("children")
      .update({ age_group: selectedAgeGroup })
      .eq("id", existingChild[0].id);

    // Clear old progress when age group changes
    await supabase
      .from("user_progress")
      .delete()
      .eq("child_id", existingChild[0].id);

    await supabase
      .from("mission_attempts")
      .delete()
      .eq("child_id", existingChild[0].id);
  }

  return NextResponse.json({ success: true });
}
