export type Mission = {
  id: string;
  title: string;
  description: string;
  tips: string;
  age_group: "7-9" | "10-12" | "13-15";
  theme: "lanche" | "troco" | "economizar" | "conceitos_basicos" | "ganhar" | "gastar" | "investir";
  points_reward: number;
  display_order: number;
  content_key: string;
};

export type Child = {
  id: string;
  parent_id: string;
  name: string;
  age_group: "7-9" | "10-12" | "13-15";
  total_points: number;
};

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
