"use client";

import { motion } from "framer-motion";

interface LeagueCardProps {
  leagueName: string;
  leagueIcon: string;
  position: number;
  totalPlayers: number;
  weeklyXP: number;
  promotionThreshold?: number;
  relegationThreshold?: number;
}

const LEAGUE_COLORS: Record<string, string> = {
  bronze: "from-amber-700 to-amber-900",
  prata: "from-gray-300 to-gray-500",
  ouro: "from-yellow-400 to-amber-500",
  diamante: "from-cyan-300 to-blue-500",
  lenda: "from-purple-400 to-purple-700",
};

export function LeagueCard({
  leagueName,
  leagueIcon,
  position,
  totalPlayers,
  weeklyXP,
  promotionThreshold,
  relegationThreshold,
}: LeagueCardProps) {
  const leagueKey = leagueName.toLowerCase();
  const gradient = LEAGUE_COLORS[leagueKey] ?? LEAGUE_COLORS.bronze;

  const isPromotionZone = promotionThreshold && position <= promotionThreshold;
  const isRelegationZone =
    relegationThreshold && position > totalPlayers - relegationThreshold;

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header with league gradient */}
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white text-center`}>
        <motion.span
          className="text-4xl block"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {leagueIcon}
        </motion.span>
        <p className="font-display font-bold text-lg mt-1">
          Liga {leagueName}
        </p>
      </div>

      {/* Stats */}
      <div className="bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Posição</span>
          <span className="font-display font-bold text-lg">
            #{position}{" "}
            <span className="text-xs text-muted-foreground font-normal">
              de {totalPlayers}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">XP Semanal</span>
          <span className="font-display font-bold text-primary-500">
            {weeklyXP.toLocaleString("pt-BR")} XP
          </span>
        </div>

        {/* Position zone indicator */}
        {isPromotionZone && (
          <motion.div
            className="bg-emerald-50 text-emerald-700 text-xs font-medium text-center py-1.5 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⬆️ Zona de promoção!
          </motion.div>
        )}

        {isRelegationZone && (
          <motion.div
            className="bg-red-50 text-red-600 text-xs font-medium text-center py-1.5 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⬇️ Zona de rebaixamento
          </motion.div>
        )}

        {/* Progress bar showing position */}
        <div className="space-y-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isPromotionZone
                  ? "bg-emerald-500"
                  : isRelegationZone
                  ? "bg-red-500"
                  : "bg-primary-500"
              }`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.max(5, 100 - (position / totalPlayers) * 100)}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Temporada semanal — reseta toda segunda-feira
          </p>
        </div>
      </div>
    </motion.div>
  );
}
