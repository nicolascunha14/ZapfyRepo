"use client";

import { Logo } from "@/components/ui/logo";
import { PointsHeader } from "@/components/dashboard/points-header";

export function MobileHeader({
  childId,
  initialPoints,
}: {
  childId: string;
  initialPoints: number;
}) {
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/50 px-4 py-2.5">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <PointsHeader childId={childId} initialPoints={initialPoints} />
      </div>
    </header>
  );
}
