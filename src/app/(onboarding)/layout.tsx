import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingLayout({
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

  if (user.user_metadata?.onboarding_completed === true) {
    redirect("/dashboard");
  }

  // Auto-recovery: if user already has a child but flag is missing, fix it
  const { data: existingChild } = await supabase
    .from("children")
    .select("id")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (existingChild) {
    // Child exists but onboarding_completed is false — fix the flag
    await supabase.auth.updateUser({
      data: { onboarding_completed: true },
    });
    redirect("/dashboard");
  }

  return (
    <div className="min-h-dvh overflow-hidden">
      {children}
    </div>
  );
}
