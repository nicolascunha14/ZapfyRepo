"use client";

import { Settings, User, Lock, Wrench, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/profile-tab";
import { AccountTab } from "@/components/settings/account-tab";
import { AppTab } from "@/components/settings/app-tab";
import { InfoTab } from "@/components/settings/info-tab";
import type { AgeGroup } from "@/lib/types";
import Link from "next/link";

export function SettingsView({
  childId,
  childName,
  ageGroup,
  xp,
  level,
  zapcoins,
  streakCurrent,
  streakMax,
  totalPoints,
  userEmail,
  isGuest,
  isAdmin,
}: {
  childId: string;
  childName: string;
  ageGroup: AgeGroup;
  xp: number;
  level: number;
  zapcoins: number;
  streakCurrent: number;
  streakMax: number;
  totalPoints: number;
  userEmail: string;
  isGuest: boolean;
  isAdmin: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-50 rounded-xl p-2.5">
            <Settings size={24} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Configuracoes</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas preferencias
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

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <User size={14} />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Lock size={14} />
            <span className="hidden sm:inline">Conta</span>
          </TabsTrigger>
          <TabsTrigger
            value="app"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Wrench size={14} />
            <span className="hidden sm:inline">App</span>
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-display font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Info size={14} />
            <span className="hidden sm:inline">Info</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5">
          <ProfileTab
            childId={childId}
            initialName={childName}
            ageGroup={ageGroup}
            xp={xp}
            level={level}
            zapcoins={zapcoins}
            streakCurrent={streakCurrent}
            streakMax={streakMax}
            totalPoints={totalPoints}
          />
        </TabsContent>

        <TabsContent value="account" className="mt-5">
          <AccountTab userEmail={userEmail} isGuest={isGuest} />
        </TabsContent>

        <TabsContent value="app" className="mt-5">
          <AppTab />
        </TabsContent>

        <TabsContent value="info" className="mt-5">
          <InfoTab isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
