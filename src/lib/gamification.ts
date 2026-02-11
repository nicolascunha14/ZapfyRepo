// =============================================
// CONSTANTES
// =============================================

export const LEVELS = [
  { level: 1, name: 'Iniciante',    xp_required: 0,     icon: '🌱' },
  { level: 2, name: 'Aprendiz',     xp_required: 500,   icon: '📚' },
  { level: 3, name: 'Curioso',      xp_required: 1200,  icon: '💡' },
  { level: 4, name: 'Dedicado',     xp_required: 2500,  icon: '🔥' },
  { level: 5, name: 'Especialista', xp_required: 4500,  icon: '⭐' },
  { level: 6, name: 'Mestre',       xp_required: 7500,  icon: '💎' },
  { level: 7, name: 'Lendário',     xp_required: 12000, icon: '🏆' },
];

export const HEARTS_CONFIG: Record<string, { max: number; regen_minutes: number; block_on_zero: boolean }> = {
  '7-9':   { max: 10, regen_minutes: 2,  block_on_zero: false },
  '10-12': { max: 5,  regen_minutes: 30, block_on_zero: true  },
  '13-15': { max: 5,  regen_minutes: 60, block_on_zero: true  },
};

export const XP_REWARDS = {
  mission_1st_attempt: 100,
  mission_2nd_attempt: 70,
  mission_3rd_attempt: 50,
  chapter_complete:    500,
  streak_daily:        50,
  exam_pass:           2000,
};

export const ZAPCOIN_REWARDS = {
  mission_correct:  5,
  chapter_complete: 50,
  streak_7_days:    100,
  badge_earned:     30,
  exam_pass:        500,
};

// =============================================
// FUNÇÕES UTILITÁRIAS
// =============================================

export function getLevelFromXP(xp: number) {
  return [...LEVELS].reverse().find(l => xp >= l.xp_required) ?? LEVELS[0];
}

export function getXPProgressPercent(xp: number): number {
  const current = getLevelFromXP(xp);
  const next = LEVELS.find(l => l.level === current.level + 1);
  if (!next) return 100;
  const progress = xp - current.xp_required;
  const needed = next.xp_required - current.xp_required;
  return Math.floor((progress / needed) * 100);
}

export function calculateCurrentHearts(
  hearts: number,
  heartsLastUpdated: Date,
  ageGroup: string
): number {
  const config = HEARTS_CONFIG[ageGroup] ?? HEARTS_CONFIG['10-12'];
  const minutesPassed = (Date.now() - heartsLastUpdated.getTime()) / 60000;
  const heartsRegenerated = Math.floor(minutesPassed / config.regen_minutes);
  return Math.min(hearts + heartsRegenerated, config.max);
}

// =============================================
// STREAK
// =============================================

export async function updateStreak(childId: string, supabase: any) {
  const { data: child } = await supabase
    .from('children')
    .select('streak_current, streak_max, last_played_at, streak_freeze_available')
    .eq('id', childId)
    .single();

  const now = new Date();
  const today = new Date(now.toDateString());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastPlayed = child.last_played_at ? new Date(child.last_played_at) : null;
  let newStreak = child.streak_current;
  let usedFreeze = false;

  if (!lastPlayed) {
    newStreak = 1;
  } else {
    const lastPlayedDate = new Date(lastPlayed.toDateString());
    if (lastPlayedDate.getTime() === today.getTime()) {
      // Já jogou hoje — não muda streak, não ganha XP de streak
      return { streakUpdated: false, newStreak, usedFreeze: false };
    } else if (lastPlayedDate.getTime() === yesterday.getTime()) {
      newStreak = child.streak_current + 1;
    } else if (child.streak_freeze_available > 0) {
      // Perdeu um dia mas tem freeze
      newStreak = child.streak_current;
      usedFreeze = true;
      await supabase
        .from('children')
        .update({ streak_freeze_available: child.streak_freeze_available - 1 })
        .eq('id', childId);
    } else {
      // Streak perdido
      newStreak = 1;
    }
  }

  const newStreakMax = Math.max(newStreak, child.streak_max ?? 0);
  await supabase
    .from('children')
    .update({
      streak_current: newStreak,
      streak_max: newStreakMax,
      last_played_at: now.toISOString(),
    })
    .eq('id', childId);

  return {
    streakUpdated: true,
    newStreak,
    isNewRecord: newStreak > child.streak_max,
    usedFreeze,
  };
}

// =============================================
// BADGES
// =============================================

export async function checkAndAwardBadges(childId: string, supabase: any) {
  const { data: child } = await supabase
    .from('children')
    .select('xp, zapcoins, streak_current, created_at')
    .eq('id', childId)
    .single();

  const { data: attempts } = await supabase
    .from('mission_attempts')
    .select('id', { count: 'exact' })
    .eq('child_id', childId)
    .eq('is_correct', true);

  const { data: progress } = await supabase
    .from('user_progress')
    .select('status')
    .eq('child_id', childId)
    .eq('status', 'completed');

  const { data: existingBadges } = await supabase
    .from('child_badges')
    .select('badges(slug)')
    .eq('child_id', childId);

  const earnedSlugs = existingBadges?.map((cb: any) => cb.badges.slug) ?? [];
  const totalMissions = attempts?.length ?? 0;
  const completedChapters = progress?.length ?? 0;
  const daysSinceJoined = (Date.now() - new Date(child.created_at).getTime()) / (1000 * 60 * 60 * 24);

  const checks = [
    { slug: 'first_mission',  condition: totalMissions >= 1 },
    { slug: 'missions_10',    condition: totalMissions >= 10 },
    { slug: 'missions_50',    condition: totalMissions >= 50 },
    { slug: 'missions_100',   condition: totalMissions >= 100 },
    { slug: 'first_chapter',  condition: completedChapters >= 1 },
    { slug: 'all_chapters',   condition: completedChapters >= 9 },
    { slug: 'streak_7',       condition: child.streak_current >= 7 },
    { slug: 'streak_30',      condition: child.streak_current >= 30 },
    { slug: 'streak_100',     condition: child.streak_current >= 100 },
    { slug: 'one_month',      condition: daysSinceJoined >= 30 },
  ];

  const newBadges: string[] = [];

  for (const check of checks) {
    if (!check.condition || earnedSlugs.includes(check.slug)) continue;

    const { data: badge } = await supabase
      .from('badges')
      .select('id, xp_reward, zapcoin_reward')
      .eq('slug', check.slug)
      .single();

    if (!badge) continue;

    await supabase
      .from('child_badges')
      .insert({ child_id: childId, badge_id: badge.id });

    await supabase
      .from('children')
      .update({
        xp: child.xp + badge.xp_reward,
        zapcoins: child.zapcoins + badge.zapcoin_reward,
      })
      .eq('id', childId);

    newBadges.push(check.slug);
  }

  return newBadges;
}

// =============================================
// COMPLETAR MISSÃO (função principal)
// =============================================

interface CompleteMissionParams {
  childId: string;
  missionId: string;
  userAnswer: any;
  isCorrect: boolean;
  attemptNumber: number;
  timeSpentSeconds: number;
  ageGroup: string;
  supabase: any;
}

export async function completeMission({
  childId,
  missionId,
  userAnswer,
  isCorrect,
  attemptNumber,
  timeSpentSeconds,
  ageGroup,
  supabase,
}: CompleteMissionParams) {

  // 1. XP e Zapcoins ganhos
  const xpMap: Record<number, number> = { 1: 100, 2: 70 };
  const xpEarned = isCorrect ? (xpMap[attemptNumber] ?? 50) : 0;
  const zapcoinsEarned = isCorrect ? 5 : 0;

  // 2. Buscar estado atual
  const { data: child } = await supabase
    .from('children')
    .select('xp, level, zapcoins, hearts, hearts_last_updated, league_xp_this_week')
    .eq('id', childId)
    .single();

  // 3. Calcular corações com regeneração
  const currentHearts = calculateCurrentHearts(
    child.hearts,
    new Date(child.hearts_last_updated),
    ageGroup
  );
  const newHearts = isCorrect ? currentHearts : Math.max(0, currentHearts - 1);
  const config = HEARTS_CONFIG[ageGroup] ?? HEARTS_CONFIG['10-12'];
  const isBlocked = newHearts === 0 && config.block_on_zero;

  // 4. Novo XP e nível
  const newXP = child.xp + xpEarned;
  const newLevel = getLevelFromXP(newXP).level;
  const leveledUp = newLevel > child.level;

  // 5. Salvar tentativa
  await supabase.from('mission_attempts').insert({
    child_id: childId,
    mission_id: missionId,
    user_answer: userAnswer,
    is_correct: isCorrect,
    points_earned: xpEarned,
    attempt_number: attemptNumber,
    time_spent_seconds: timeSpentSeconds,
  });

  // 6. Atualizar filho
  await supabase.from('children').update({
    xp: newXP,
    level: newLevel,
    zapcoins: child.zapcoins + zapcoinsEarned,
    hearts: newHearts,
    hearts_last_updated: new Date().toISOString(),
    league_xp_this_week: (child.league_xp_this_week ?? 0) + xpEarned,
  }).eq('id', childId);

  // 7. Streak (só se acertou)
  let streakResult = null;
  if (isCorrect) {
    streakResult = await updateStreak(childId, supabase);
  }

  // 8. Verificar badges
  const newBadges = await checkAndAwardBadges(childId, supabase);

  // Badge de velocidade
  if (isCorrect && timeSpentSeconds < 10) {
    newBadges.push('speed_demon');
  }

  return {
    isCorrect,
    xpEarned,
    zapcoinsEarned,
    newXP,
    newLevel,
    leveledUp,
    newHearts,
    maxHearts: config.max,
    isBlocked,
    streakResult,
    newBadges,
  };
}
