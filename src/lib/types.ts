export type AgeGroup = "7-9" | "10-12" | "13-15";

export type MissionType = "quiz" | "numeric_input" | "text_input" | "true_false" | "matching";

export type ChapterStatus = "locked" | "unlocked" | "in_progress" | "completed";

export type Chapter = {
  id: string;
  age_group: AgeGroup;
  chapter_number: number;
  title: string;
  description: string | null;
  icon: string | null;
  order_position: number;
};

export type ChapterWithProgress = Chapter & {
  status: ChapterStatus;
  missions_completed: number;
  total_score: number;
  total_missions?: number;
};

export type Mission = {
  id: string;
  chapter_id: string;
  mission_number: number;
  title: string;
  mission_type: MissionType;
  content: Record<string, unknown>;
  correct_answer: Record<string, unknown>;
  explanation: string | null;
  points_reward: number;
  order_position: number;
};

export type MissionWithAttempt = Mission & {
  is_completed: boolean;
  best_score: number;
};

export type Child = {
  id: string;
  parent_id: string;
  name: string;
  age_group: AgeGroup;
  total_points: number;
};

export type FinalExam = {
  id: string;
  age_group: AgeGroup;
  question_number: number;
  title: string;
  mission_type: MissionType;
  content: Record<string, unknown>;
  correct_answer: Record<string, unknown>;
  explanation: string | null;
  points_reward: number;
  chapters_covered: number[] | null;
};

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  "7-9": "Iniciante",
  "10-12": "Intermediário",
  "13-15": "Avançado",
};

export const AGE_GROUP_ORDER: AgeGroup[] = ["7-9", "10-12", "13-15"];

export const NEXT_AGE_GROUP: Partial<Record<AgeGroup, AgeGroup>> = {
  "7-9": "10-12",
  "10-12": "13-15",
};

export type MissionAttempt = {
  id: string;
  child_id: string;
  mission_id: string;
  user_answer: Record<string, unknown>;
  is_correct: boolean;
  points_earned: number;
  attempt_number: number;
  completed_at: string;
};

// Legacy type - keep for backward compatibility
export type CompletedMission = {
  id: string;
  child_id: string;
  mission_id: string;
  points_earned: number;
  completed_at: string;
};

// =============================================
// SHOP & REWARDS TYPES
// =============================================

export type ShopCategory = "theme" | "powerup" | "premium";

export type ShopItem = {
  id: string;
  slug: string;
  category: ShopCategory;
  name: string;
  description: string | null;
  price_zapcoins: number;
  icon: string | null;
  preview_colors: { primary: string; secondary: string; accent: string } | null;
  metadata: Record<string, unknown>;
  is_active: boolean;
  sort_order: number;
};

export type PowerUpInventory = {
  id: string;
  child_id: string;
  item_id: string;
  quantity: number;
};

export type PremiumSubscription = {
  id: string;
  child_id: string;
  started_at: string;
  expires_at: string;
  is_active: boolean;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export const THEME_META: Record<string, { name: string; icon: string; colors: ThemeColors }> = {
  default: { name: "Zapfy Clássico", icon: "⚡", colors: { primary: "#1E88E5", secondary: "#F59E0B", accent: "#6EE7B7" } },
  ocean: { name: "Oceano Profundo", icon: "🌊", colors: { primary: "#0984E3", secondary: "#00CEC9", accent: "#74B9FF" } },
  forest: { name: "Floresta Encantada", icon: "🌿", colors: { primary: "#00B894", secondary: "#55EFC4", accent: "#BADC58" } },
  sunset: { name: "Pôr do Sol", icon: "🌅", colors: { primary: "#E17055", secondary: "#FDCB6E", accent: "#FAB1A0" } },
  space: { name: "Espaço Sideral", icon: "🚀", colors: { primary: "#6C5CE7", secondary: "#A29BFE", accent: "#FD79A8" } },
  candy: { name: "Doce Diversão", icon: "🍭", colors: { primary: "#E84393", secondary: "#FD79A8", accent: "#FDCB6E" } },
  ninja: { name: "Ninja Financeiro", icon: "🥷", colors: { primary: "#2D3436", secondary: "#636E72", accent: "#00CEC9" } },
  golden: { name: "Ouro Puro", icon: "👑", colors: { primary: "#D4A017", secondary: "#F9CA24", accent: "#FFF3BF" } },
};

export const POWERUP_SLUGS = {
  STREAK_FREEZE: "streak_freeze",
  DOUBLE_XP: "double_xp",
  EXTRA_HEART: "extra_heart",
  HINT_TOKEN: "hint_token",
  SKIP_MISSION: "skip_mission",
} as const;

export const REFERRAL_BONUS_POINTS = 50;

export const LEVELS = [
  { level: 1, name: "Iniciante", minPoints: 0 },
  { level: 2, name: "Explorador", minPoints: 100 },
  { level: 3, name: "Aventureiro", minPoints: 250 },
  { level: 4, name: "Mestre", minPoints: 500 },
] as const;

export function getLevel(points: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      const current = LEVELS[i];
      const next = LEVELS[i + 1];
      return {
        level: current.level,
        name: current.name,
        currentPoints: points,
        minPoints: current.minPoints,
        nextLevelPoints: next?.minPoints ?? null,
        progress: next
          ? ((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100
          : 100,
      };
    }
  }
  return { level: 1, name: "Iniciante", currentPoints: 0, minPoints: 0, nextLevelPoints: 100, progress: 0 };
}
