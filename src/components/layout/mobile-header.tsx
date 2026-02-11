"use client";

import { Logo } from "@/components/ui/logo";

export function MobileHeader({
  childId,
  initialPoints,
  zapcoins,
  streak,
}: {
  childId: string;
  initialPoints: number;
  zapcoins: number;
  streak: number;
}) {
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/50 px-4 py-2.5">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <div className="flex items-center gap-1 bg-orange-50 rounded-full px-2 py-1">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-bold text-orange-600 tabular-nums">{streak}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-zapfy-coin/20 rounded-full px-2 py-1">
            <span className="text-xs">🪙</span>
            <span className="text-xs font-bold text-amber-700 tabular-nums">{zapcoins.toLocaleString("pt-BR")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
