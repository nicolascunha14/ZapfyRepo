import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const referralCode = searchParams.get("ref");

  console.log("[auth/callback] START", { code: code ? "present" : "missing", next });

  if (!code) {
    console.log("[auth/callback] No code — redirecting to login");
    return NextResponse.redirect(
      `${origin}/login?error=missing_code&message=${encodeURIComponent(
        "Código de autenticação não encontrado. Tente fazer login novamente."
      )}`
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.log("[auth/callback] exchangeCodeForSession FAILED:", error.message);
    return NextResponse.redirect(
      `${origin}/login?error=exchange_failed&message=${encodeURIComponent(
        "Não foi possível completar o login. Tente novamente."
      )}`
    );
  }

  console.log("[auth/callback] Session established for user:", data.user?.id);

  let redirectTo = "/onboarding"; // Default for new users

  if (data.user) {
    const meta = data.user.user_metadata;
    console.log("[auth/callback] user_metadata:", {
      onboarding_completed: meta?.onboarding_completed,
      display_name: meta?.display_name,
    });

    // Capture Google display name if not already set
    if (!meta?.display_name && (meta?.full_name || meta?.name)) {
      await supabase.auth.updateUser({
        data: { display_name: meta.full_name || meta.name },
      });
    }

    // Ensure public.users row exists for this auth user
    await supabase.from("users").upsert(
      {
        id: data.user.id,
        email: data.user.email!,
        display_name: meta?.display_name || meta?.full_name || meta?.name || null,
      },
      { onConflict: "id" }
    );

    // Process referral if present (from OAuth or metadata)
    const refCode = referralCode || meta?.referral_code;
    if (refCode) {
      // Check if this user was already referred
      const { data: existingReferral } = await supabase
        .from("referrals")
        .select("id")
        .eq("referred_id", data.user.id)
        .limit(1);

      if (!existingReferral || existingReferral.length === 0) {
        const { data: referrer } = await supabase
          .from("users")
          .select("id")
          .eq("referral_code", refCode)
          .single();

        if (referrer && referrer.id !== data.user.id) {
          await supabase.from("referrals").insert({
            referrer_id: referrer.id,
            referred_id: data.user.id,
          });

          // Award points to referrer's child
          const { data: referrerChild } = await supabase
            .from("children")
            .select("id, total_points")
            .eq("parent_id", referrer.id)
            .limit(1)
            .single();

          if (referrerChild) {
            await supabase
              .from("children")
              .update({ total_points: (referrerChild.total_points ?? 0) + 50 })
              .eq("id", referrerChild.id);

            await supabase
              .from("referrals")
              .update({ points_awarded: true })
              .eq("referred_id", data.user.id);
          }

          console.log("[auth/callback] Referral processed for code:", refCode);
        }
      }
    }

    // ALWAYS check for child record — this is the source of truth for onboarding status
    const { data: child } = await supabase
      .from("children")
      .select("id")
      .eq("parent_id", data.user.id)
      .limit(1)
      .single();

    if (child) {
      // Child exists — user has completed onboarding
      if (meta?.onboarding_completed !== true) {
        await supabase.auth.updateUser({
          data: { onboarding_completed: true },
        });
      }
      redirectTo = next ?? "/dashboard";
      console.log("[auth/callback] Child found → redirecting to:", redirectTo);
    } else {
      // No child record — user must complete onboarding regardless of metadata flag
      await supabase.auth.updateUser({
        data: { onboarding_completed: false },
      });
      redirectTo = "/onboarding";
      console.log("[auth/callback] No child record → forcing /onboarding");
    }
  }

  console.log("[auth/callback] FINAL redirect:", redirectTo);
  return NextResponse.redirect(`${origin}${redirectTo}`);
}
