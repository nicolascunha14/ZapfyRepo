"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Category = "hair" | "clothes" | "accessory" | "frame";

interface AvatarItem {
  id: string;
  category: Category;
  name: string;
  icon: string;
  price: number;
  owned: boolean;
  equipped: boolean;
}

interface AvatarEditorProps {
  items: AvatarItem[];
  zapcoins: number;
  onPurchase: (itemId: string) => void;
  onEquip: (itemId: string) => void;
}

const TABS: { key: Category; label: string; icon: string }[] = [
  { key: "hair", label: "Cabelo", icon: "💇" },
  { key: "clothes", label: "Roupa", icon: "👕" },
  { key: "accessory", label: "Acessório", icon: "🎒" },
  { key: "frame", label: "Moldura", icon: "🖼️" },
];

export function AvatarEditor({
  items,
  zapcoins,
  onPurchase,
  onEquip,
}: AvatarEditorProps) {
  const [activeTab, setActiveTab] = useState<Category>("hair");

  const filteredItems = items.filter((item) => item.category === activeTab);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-colors cursor-pointer ${
              item.equipped
                ? "border-primary-500 bg-primary-50"
                : item.owned
                ? "border-border bg-card hover:border-primary-300"
                : "border-dashed border-muted-foreground/30 bg-muted/30"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (item.owned) {
                onEquip(item.id);
              }
            }}
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="text-xs font-medium text-center leading-tight">
              {item.name}
            </span>

            {item.equipped && (
              <span className="absolute -top-1.5 -right-1.5 text-xs bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                ✓
              </span>
            )}

            {!item.owned && (
              <Button
                size="sm"
                variant={zapcoins >= item.price ? "default" : "outline"}
                className="w-full mt-1 h-7 text-xs rounded-lg"
                disabled={zapcoins < item.price}
                onClick={(e) => {
                  e.stopPropagation();
                  onPurchase(item.id);
                }}
              >
                🪙 {item.price}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Nenhum item disponível nesta categoria.
        </div>
      )}
    </div>
  );
}
