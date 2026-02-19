import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles, BookOpen, Trophy, Users } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Obrigado! - Zapfy",
  description: "Obrigado pelo seu interesse na Zapfy! Em breve entraremos em contato.",
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Navbar minimal */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <Link
          href="/"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          Voltar ao início
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 pt-12 pb-24">
        {/* Success icon */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-200">
            <CheckCircle size={56} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-zapfy-coin flex items-center justify-center shadow-md animate-bounce">
            <Sparkles size={20} className="text-amber-700" />
          </div>
        </div>

        {/* Thank you message */}
        <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-3">
          Obrigado pelo interesse!
        </h1>
        <p className="text-muted-foreground text-center max-w-md leading-relaxed mb-10">
          Recebemos suas informações com sucesso. Em breve nossa equipe
          entrará em contato com você para os próximos passos.
        </p>

        {/* What happens next */}
        <div className="w-full max-w-lg space-y-4 mb-10">
          <h2 className="font-display font-bold text-lg text-center text-foreground">
            O que acontece agora?
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-white rounded-2xl border border-border/50 p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-primary-600 text-sm">1</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground">
                  Análise do seu perfil
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Nossa equipe vai analisar suas informações para personalizar a melhor experiência.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl border border-border/50 p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-emerald-600 text-sm">2</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground">
                  Contato da equipe
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Entraremos em contato por e-mail em até 24 horas com todas as informações.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl border border-border/50 p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-amber-600 text-sm">3</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground">
                  Acesso à plataforma
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Você receberá acesso para começar a aventura da educação financeira!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features reminder */}
        <div className="w-full max-w-lg bg-gradient-to-r from-primary-50 to-emerald-50 rounded-2xl border border-primary-100 p-6 mb-10">
          <h3 className="font-display font-bold text-sm text-foreground mb-4 text-center">
            O que a Zapfy oferece
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <BookOpen size={20} className="text-primary-500" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">
                Missões educativas gamificadas
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Trophy size={20} className="text-amber-500" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">
                Rankings e conquistas
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Users size={20} className="text-emerald-500" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">
                Painel para pais e escolas
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="btn-hero flex items-center gap-2 text-sm"
          >
            Criar conta gratuita
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Voltar para o site
          </Link>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Zapfy. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
