import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=missing_code&message=${encodeURIComponent(
        "Código de autenticação não encontrado. Tente fazer login novamente."
      )}`
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=exchange_failed&message=${encodeURIComponent(
        "Não foi possível completar o login. Tente novamente."
      )}`
    );
  }

  let redirectTo = next ?? "/onboarding";

  if (data.user) {
    const meta = data.user.user_metadata;

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

    // If no explicit next param, determine redirect based on onboarding status
    if (!next) {
      if (meta?.onboarding_completed) {
        redirectTo = "/dashboard";
      } else {
        // Double-check: user may have a child record even if metadata flag is missing
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
          redirectTo = "/dashboard";
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
