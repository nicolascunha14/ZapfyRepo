export type AgeGroup = "7-9" | "10-12" | "13-15";

export type MissionType = "quiz" | "drag_drop" | "numeric_input" | "text_input" | "true_false" | "matching";

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
