import type { Metadata } from "next";
import Link from "next/link";
import { Crown, Clock, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Premium - Zapfy",
};

export default function PremiumPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 rounded-xl p-2.5">
            <Crown size={24} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Zapfy Premium
            </h1>
            <p className="text-sm text-muted-foreground">
              Plano temporariamente suspenso
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

      <div className="max-w-lg mx-auto pt-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
            <Clock size={40} className="text-amber-400" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">
            Assinatura Premium em pausa
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            Estamos preparando novidades incriveis para o plano Premium!
            Em breve voce podera assinar e desbloquear todo o potencial
            da educacao financeira do seu filho.
          </p>
        </div>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="py-5 px-5 space-y-3">
            <p className="font-display font-bold text-sm text-amber-800">
              O que vem por ai:
            </p>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <Crown size={14} className="text-amber-500 shrink-0 mt-0.5" />
                Todas as faixas etarias desbloqueadas
              </li>
              <li className="flex items-start gap-2">
                <Crown size={14} className="text-amber-500 shrink-0 mt-0.5" />
                +20% XP e Zapcoins bonus em todas as missoes
              </li>
              <li className="flex items-start gap-2">
                <Crown size={14} className="text-amber-500 shrink-0 mt-0.5" />
                Temas exclusivos e power-ups especiais
              </li>
              <li className="flex items-start gap-2">
                <Crown size={14} className="text-amber-500 shrink-0 mt-0.5" />
                Painel dos pais completo com graficos
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 bg-primary-50 rounded-xl px-4 py-3 text-sm text-primary-700">
          <Bell size={16} />
          <span className="font-medium">
            Avisaremos quando o Premium estiver disponivel!
          </span>
        </div>
      </div>
    </div>
  );
}
