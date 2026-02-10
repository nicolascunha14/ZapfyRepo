import { ShoppingBag, Palette, Sparkles, Zap } from "lucide-react";

export default function StorePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary-50 rounded-xl p-2.5">
          <ShoppingBag size={24} className="text-primary-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Loja</h1>
          <p className="text-sm text-muted-foreground">
            Use seus Zap Coins para desbloquear itens
          </p>
        </div>
      </div>

      {/* Coming soon */}
      <div className="bg-white rounded-2xl border border-border/50 p-8 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto">
          <Sparkles size={36} className="text-primary-500" />
        </div>
        <h2 className="text-xl font-display font-bold">Em breve!</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          A loja do Zapfy está sendo preparada. Em breve você poderá usar seus
          Zap Coins para desbloquear itens especiais!
        </p>

        {/* Preview items */}
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto pt-4">
          <div className="bg-muted/50 rounded-xl p-4 space-y-2 opacity-60">
            <Palette size={24} className="text-violet-500 mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">Temas</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 space-y-2 opacity-60">
            <Sparkles size={24} className="text-amber-500 mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">Avatares</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 space-y-2 opacity-60">
            <Zap size={24} className="text-emerald-500 mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">Power-ups</p>
          </div>
        </div>
      </div>
    </div>
  );
}
