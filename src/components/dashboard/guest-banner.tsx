"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GuestBanner() {
  return (
    <Link href="/signup" className="block">
      <Card className="border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 hover:shadow-md transition-all">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 rounded-xl p-2 shrink-0">
              <UserPlus size={18} className="text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-primary-900">
                Crie sua conta grátis
              </p>
              <p className="text-[11px] text-primary-700/70 mt-0.5">
                Salve seu progresso e ganhe mais recursos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
