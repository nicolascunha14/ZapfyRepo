"use client";

export function PowerUpCard({
  name,
  description,
  icon,
  price,
  quantity,
  onBuy,
  canAfford,
  loading,
}: {
  name: string;
  description: string | null;
  icon: string | null;
  price: number;
  quantity: number;
  onBuy: () => void;
  canAfford: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-white">
      <div className="bg-muted/50 rounded-xl w-12 h-12 flex items-center justify-center text-2xl shrink-0">
        {icon || "🎁"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-display font-bold truncate">{name}</p>
          {quantity > 0 && (
            <span className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              x{quantity}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={onBuy}
        disabled={!canAfford || loading}
        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-display font-bold transition-colors cursor-pointer ${
          canAfford
            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
            : "bg-muted text-muted-foreground opacity-60"
        }`}
      >
        <span>🪙</span>
        {price}
      </button>
    </div>
  );
}
