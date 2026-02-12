"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function GuestCleanup() {
  useEffect(() => {
    const supabase = createClient();

    async function getUserId() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || (!user.is_anonymous && !user.user_metadata?.is_guest)) {
        return null;
      }
      return user.id;
    }

    let userId: string | null = null;
    getUserId().then((id) => {
      userId = id;
    });

    function cleanup() {
      if (!userId) return;

      // Use sendBeacon for reliable delivery on page unload
      const url = "/api/guest/cleanup";
      const body = JSON.stringify({ userId });

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      } else {
        // Fallback: fire-and-forget fetch
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
      }
    }

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  return null;
}
