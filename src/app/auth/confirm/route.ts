import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  console.log("[auth/confirm] START", { token_hash: token_hash ? "present" : "missing", type });

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    console.log("[auth/confirm] verifyOtp result:", { error: error?.message ?? "success" });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("[auth/confirm] User:", {
        id: user?.id,
        onboarding_completed: user?.user_metadata?.onboarding_completed,
      });

      if (user) {
        const meta = user.user_metadata;

        // Ensure public.users row exists
        await supabase.from("users").upsert(
          {
            id: user.id,
            email: user.email!,
            display_name: meta?.display_name || meta?.full_name || meta?.name || null,
          },
          { onConflict: "id" }
        );

        // For new signups, ensure onboarding_completed is explicitly false
        if (type === "signup" && meta?.onboarding_completed !== true) {
          console.log("[auth/confirm] Setting onboarding_completed = false for signup");
          await supabase.auth.updateUser({
            data: { onboarding_completed: false },
          });
        }
      }

      if (type === "recovery") {
        console.log("[auth/confirm] Recovery → /update-password");
        return NextResponse.redirect(new URL("/update-password", request.url));
      }

      // ALL non-recovery confirmations go to /onboarding
      // The onboarding layout will auto-redirect to dashboard if child exists
      console.log("[auth/confirm] Redirecting to /onboarding");
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  console.log("[auth/confirm] FAILED — redirecting to login");
  return NextResponse.redirect(
    new URL("/login?error=verification_failed", request.url)
  );
}
