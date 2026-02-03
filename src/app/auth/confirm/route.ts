import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/onboarding";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      // Ensure public.users row exists for this auth user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata;
        await supabase.from("users").upsert(
          {
            id: user.id,
            email: user.email!,
            display_name: meta?.display_name || meta?.full_name || meta?.name || null,
          },
          { onConflict: "id" }
        );
      }

      if (type === "recovery") {
        return NextResponse.redirect(new URL("/update-password", request.url));
      }
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=verification_failed", request.url)
  );
}
