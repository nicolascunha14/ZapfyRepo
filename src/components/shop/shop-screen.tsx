"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Zap, Crown, ShoppingBag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemePreview } from "@/components/shop/theme-preview";
import { PowerUpCard } from "@/components/shop/powerup-card";
import { PremiumCard } from "@/components/shop/premium-card";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@/lib/supabase/client";
import {
  purchaseShopItem,
  purchasePowerUp,
  purchasePremiumWithCoins,
  setActiveTheme,
} from "@/lib/gamification";
import { THEME_META } from "@/lib/types";
import type { ShopItem, PowerUpInventory } from "@/lib/types";

interface ShopScreenProps {
  childId: string;
  initialZapcoins: number;
  items: ShopItem[];
  purchasedItemIds: string[];
  powerUpInventory: PowerUpInventory[];
  activeThemeSlug: string;
  isPremium: boolean;
  premiumExpiresAt: string | null;
}

export function ShopScreen({
  childId,
  initialZapcoins,
  items,
  purchasedItemIds: initialPurchasedIds,
  powerUpInventory: initialInventory,
  activeThemeSlug,
  isPremium: initialIsPremium,
  premiumExpiresAt: initialExpiresAt,
}: ShopScreenProps) {
  const [zapcoins, setZapcoins] = useState(initialZapcoins);
  const [purchasedIds, setPurchasedIds] = useState<string[]>(initialPurchasedIds);
  const [inventory, setInventory] = useState<PowerUpInventory[]>(initialInventory);
  const [isPremium, setIsPremium] = useState(initialIsPremium);
  const [premiumExpiresAt, setPremiumExpiresAt] = useState(initialExpiresAt);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const { activeTheme, setTheme } = useTheme();

  const themes = items.filter((i) => i.category === "theme");
  const powerups = items.filter((i) => i.category === "powerup");
  const premiumItems = items.filter((i) => i.category === "premium");

  function showMessage(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  const handleBuyTheme = useCallback(async (item: ShopItem) => {
    setLoading(item.id);
    const supabase = createClient();
    const result = await purchaseShopItem(childId, item.id, item.price_zapcoins, supabase);
    setLoading(null);

    if (result.success) {
      setZapcoins(result.newBalance!);
      setPurchasedIds((prev) => [...prev, item.id]);
      showMessage(`Tema "${item.name}" comprado!`, "success");
    } else {
      showMessage(result.error!, "error");
    }
  }, [childId]);

  const handleSelectTheme = useCallback(async (item: ShopItem) => {
    const supabase = createClient();
    await setActiveTheme(childId, item.slug, supabase);
    setTheme(item.slug);
    showMessage(`Tema "${item.name}" ativado!`, "success");
  }, [childId, setTheme]);

  const handleBuyPowerUp = useCallback(async (item: ShopItem) => {
    setLoading(item.id);
    const supabase = createClient();
    const result = await purchasePowerUp(childId, item.id, item.price_zapcoins, supabase);
    setLoading(null);

    if (result.success) {
      setZapcoins(result.newBalance!);
      setInventory((prev) => {
        const existing = prev.find((p) => p.item_id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.item_id === item.id ? { ...p, quantity: result.quantity } : p
          );
        }
        return [...prev, { id: "", child_id: childId, item_id: item.id, quantity: result.quantity }];
      });
      showMessage(`"${item.name}" comprado!`, "success");
    } else {
      showMessage(result.error!, "error");
    }
  }, [childId]);

  const handleBuyPremium = useCallback(async (item: ShopItem) => {
    setLoading(item.id);
    const supabase = createClient();
    const durationDays = (item.metadata as any)?.duration_days ?? 7;
    const result = await purchasePremiumWithCoins(childId, item.id, item.price_zapcoins, durationDays, supabase);
    setLoading(null);

    if (result.success) {
      setZapcoins(result.newBalance!);
      setIsPremium(true);
      setPremiumExpiresAt(result.expiresAt!);
      showMessage("Premium ativado!", "success");
    } else {
      showMessage(result.error!, "error");
    }
  }, [childId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-50 rounded-xl p-2.5">
            <ShoppingBag size={24} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Loja</h1>
            <p className="text-sm text-muted-foreground">
              Gaste seus Zapcoins em temas e power-ups
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-zapfy-coin/20 rounded-full px-4 py-2">
          <span className="text-base">🪙</span>
          <span className="text-base font-bold text-amber-700 tabular-nums">
            {zapcoins.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Message toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm px-4 py-3 rounded-xl font-medium ${
              message.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="themes"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Palette size={14} />
            Temas
          </TabsTrigger>
          <TabsTrigger
            value="powerups"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Zap size={14} />
            Power-ups
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Crown size={14} />
            Premium
          </TabsTrigger>
        </TabsList>

        {/* Themes Tab */}
        <TabsContent value="themes" className="mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {themes.map((item) => {
              const meta = THEME_META[item.slug];
              const colors = item.preview_colors ?? meta?.colors ?? { primary: "#6C5CE7", secondary: "#00D2D3", accent: "#FECA57" };
              const isOwned = item.price_zapcoins === 0 || purchasedIds.includes(item.id) || (isPremium && premiumExpiresAt && new Date(premiumExpiresAt) > new Date());
              const isThemeActive = activeTheme === item.slug;

              return (
                <ThemePreview
                  key={item.id}
                  name={item.name}
                  icon={item.icon || meta?.icon || "🎨"}
                  colors={colors}
                  isOwned={!!isOwned}
                  isActive={isThemeActive}
                  price={item.price_zapcoins}
                  onSelect={() => handleSelectTheme(item)}
                  onBuy={() => handleBuyTheme(item)}
                  canAfford={zapcoins >= item.price_zapcoins}
                />
              );
            })}
          </div>
        </TabsContent>

        {/* Power-ups Tab */}
        <TabsContent value="powerups" className="mt-5">
          <div className="space-y-3">
            {powerups.map((item) => {
              const inv = inventory.find((p) => p.item_id === item.id);
              return (
                <PowerUpCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                  price={item.price_zapcoins}
                  quantity={inv?.quantity ?? 0}
                  onBuy={() => handleBuyPowerUp(item)}
                  canAfford={zapcoins >= item.price_zapcoins}
                  loading={loading === item.id}
                />
              );
            })}
          </div>
        </TabsContent>

        {/* Premium Tab — suspended */}
        <TabsContent value="premium" className="mt-5">
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
              <Crown size={28} className="text-amber-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">
              Premium em breve!
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Estamos preparando novidades incriveis para o plano Premium.
              Fique ligado!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
