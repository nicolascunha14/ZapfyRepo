import {
  Star,
  Zap,
  Flame,
  Crown,
  Medal,
  Award,
  GraduationCap,
  Gem,
  Sparkles,
  Target,
  BookOpen,
  Rocket,
} from "lucide-react";
import type { ElementType } from "react";

export type BadgeDef = {
  id: string;
  name: string;
  description: string;
  icon: ElementType;
  color: string;
  bg: string;
  check: (ctx: BadgeContext) => boolean;
};

export type BadgeContext = {
  points: number;
  completed: number;
  totalMissions: number;
  streak: number;
  founderMissionsCompleted?: number;
};

export type BadgeResult = BadgeDef & { unlocked: boolean };

export const BADGES: BadgeDef[] = [
  // Mission milestones
  {
    id: "first_mission",
    name: "Primeira Missão",
    description: "Completou a primeira missão",
    icon: Star,
    color: "text-amber-500",
    bg: "from-amber-100 to-amber-50",
    check: (ctx) => ctx.completed >= 1,
  },
  {
    id: "explorer",
    name: "Explorador",
    description: "Completou 5 missões",
    icon: Zap,
    color: "text-blue-500",
    bg: "from-blue-100 to-blue-50",
    check: (ctx) => ctx.completed >= 5,
  },
  {
    id: "dedicated",
    name: "Dedicado",
    description: "Completou 10 missões",
    icon: Flame,
    color: "text-orange-500",
    bg: "from-orange-100 to-orange-50",
    check: (ctx) => ctx.completed >= 10,
  },
  {
    id: "champion",
    name: "Campeão",
    description: "Completou 15 missões",
    icon: Rocket,
    color: "text-rose-500",
    bg: "from-rose-100 to-rose-50",
    check: (ctx) => ctx.completed >= 15,
  },
  {
    id: "master",
    name: "Mestre Total",
    description: "Completou todas as missões",
    icon: Crown,
    color: "text-amber-600",
    bg: "from-amber-200 to-yellow-100",
    check: (ctx) => ctx.totalMissions > 0 && ctx.completed >= ctx.totalMissions,
  },

  // Level milestones
  {
    id: "level2",
    name: "Nível 2",
    description: "Atingiu o nível Explorador",
    icon: Medal,
    color: "text-emerald-500",
    bg: "from-emerald-100 to-emerald-50",
    check: (ctx) => ctx.points >= 100,
  },
  {
    id: "level3",
    name: "Nível 3",
    description: "Atingiu o nível Aventureiro",
    icon: Award,
    color: "text-violet-500",
    bg: "from-violet-100 to-violet-50",
    check: (ctx) => ctx.points >= 250,
  },
  {
    id: "level4",
    name: "Nível 4",
    description: "Atingiu o nível Mestre",
    icon: GraduationCap,
    color: "text-indigo-600",
    bg: "from-indigo-100 to-indigo-50",
    check: (ctx) => ctx.points >= 500,
  },

  // Points milestones
  {
    id: "fortune",
    name: "Fortuna",
    description: "Acumulou 250+ pontos",
    icon: Gem,
    color: "text-cyan-500",
    bg: "from-cyan-100 to-cyan-50",
    check: (ctx) => ctx.points >= 250,
  },
  {
    id: "legendary",
    name: "Lendário",
    description: "Acumulou 500+ pontos",
    icon: Sparkles,
    color: "text-pink-500",
    bg: "from-pink-100 to-pink-50",
    check: (ctx) => ctx.points >= 500,
  },

  // Founder module
  {
    id: "founder_seal",
    name: "Fundador Zapfy",
    description: "Completou a Jornada Prática em Família",
    icon: Medal,
    color: "text-amber-600",
    bg: "from-amber-400 to-orange-500",
    check: (ctx) => (ctx.founderMissionsCompleted ?? 0) >= 10,
  },

  // Streak milestones
  {
    id: "streak3",
    name: "Consistente",
    description: "3 dias seguidos de streak",
    icon: Target,
    color: "text-teal-500",
    bg: "from-teal-100 to-teal-50",
    check: (ctx) => ctx.streak >= 3,
  },
  {
    id: "streak7",
    name: "Estudioso",
    description: "7 dias seguidos de streak",
    icon: BookOpen,
    color: "text-purple-500",
    bg: "from-purple-100 to-purple-50",
    check: (ctx) => ctx.streak >= 7,
  },
];

export function computeBadges(ctx: BadgeContext): BadgeResult[] {
  return BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.check(ctx),
  }));
}

export function countUnlocked(ctx: BadgeContext): number {
  return BADGES.filter((b) => b.check(ctx)).length;
}
