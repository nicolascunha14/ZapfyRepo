import type { Metadata } from "next";
import Link from "next/link";
import { Crown } from "lucide-react";
import { PremiumPricing } from "@/components/dashboard/premium-pricing";

export const metadata: Metadata = {
  title: "Premium - Zapfy",
};

export default function PremiumPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 rounded-xl p-2.5">
            <Crown size={24} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Zapfy Premium
            </h1>
            <p className="text-sm text-muted-foreground">
              Desbloqueie todo o potencial da educação financeira
            </p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          Voltar
        </Link>
      </div>

      <PremiumPricing />
    </div>
  );
}
