import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/ranking") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/update-password") ||
    pathname.startsWith("/onboarding");
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/update-password")
      ? "/forgot-password"
      : "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const onboardingDone =
      user.user_metadata?.onboarding_completed === true;
    const url = request.nextUrl.clone();
    url.pathname = onboardingDone ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(url);
  }

  // Onboarding gating
  if (user) {
    const onboardingCompleted =
      user.user_metadata?.onboarding_completed === true;

    // User hasn't completed onboarding → redirect to /onboarding
    if (
      !onboardingCompleted &&
      !isOnboardingRoute &&
      (pathname.startsWith("/dashboard") || pathname.startsWith("/ranking") || pathname.startsWith("/profile"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    // User already completed onboarding → redirect away from /onboarding
    if (onboardingCompleted && isOnboardingRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
