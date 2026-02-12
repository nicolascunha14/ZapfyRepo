import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShopScreen } from "@/components/shop/shop-screen";

export const metadata: Metadata = {
  title: "Loja - Zapfy",
};

export default async function StorePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: child } = await supabase
    .from("children")
    .select("id, zapcoins, active_theme")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) redirect("/onboarding");

  // Fetch all active shop items
  const { data: items } = await supabase
    .from("shop_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  // Fetch child's purchases
  const { data: purchases } = await supabase
    .from("child_shop_purchases")
    .select("item_id")
    .eq("child_id", child.id);

  // Fetch powerup inventory
  const { data: inventory } = await supabase
    .from("powerup_inventory")
    .select("*")
    .eq("child_id", child.id);

  // Fetch premium subscription
  const { data: premium } = await supabase
    .from("premium_subscriptions")
    .select("expires_at, is_active")
    .eq("child_id", child.id)
    .single();

  const isPremium =
    !!premium?.is_active && new Date(premium.expires_at) > new Date();

  return (
    <ShopScreen
      childId={child.id}
      initialZapcoins={child.zapcoins ?? 0}
      items={items ?? []}
      purchasedItemIds={(purchases ?? []).map((p) => p.item_id)}
      powerUpInventory={inventory ?? []}
      activeThemeSlug={child.active_theme ?? "default"}
      isPremium={isPremium}
      premiumExpiresAt={isPremium ? premium!.expires_at : null}
    />
  );
}
