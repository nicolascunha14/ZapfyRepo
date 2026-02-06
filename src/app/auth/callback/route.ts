import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

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

    // ALWAYS check onboarding status — never skip based on `next` param
    if (meta?.onboarding_completed === true) {
      redirectTo = next ?? "/dashboard";
      console.log("[auth/callback] Onboarding already done → redirecting to:", redirectTo);
    } else {
      // Check if child record exists (recovery for users with child but missing flag)
      const { data: child } = await supabase
        .from("children")
        .select("id")
        .eq("parent_id", data.user.id)
        .limit(1)
        .single();

      if (child) {
        // Fix metadata flag for future logins
        await supabase.auth.updateUser({
          data: { onboarding_completed: true },
        });
        redirectTo = next ?? "/dashboard";
        console.log("[auth/callback] Child found, flag fixed → redirecting to:", redirectTo);
      } else {
        // New user — force onboarding regardless of `next` param
        if (meta?.onboarding_completed === undefined || meta?.onboarding_completed === null) {
          await supabase.auth.updateUser({
            data: { onboarding_completed: false },
          });
        }
        redirectTo = "/onboarding";
        console.log("[auth/callback] No child, no onboarding → forcing /onboarding");
      }
    }
  }

  console.log("[auth/callback] FINAL redirect:", redirectTo);
  return NextResponse.redirect(`${origin}${redirectTo}`);
}
