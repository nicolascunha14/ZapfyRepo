"use client";

import { useRouter } from "next/navigation";
import { LogOut, FileText, HelpCircle, MessageCircle, ChevronRight, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function InfoTab({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const links = [
    { label: "Politica de Privacidade", icon: Shield, href: "/privacy" },
    { label: "Termos de Uso", icon: FileText, href: "/terms" },
    { label: "Central de Ajuda", icon: HelpCircle, href: "/help" },
  ];

  return (
    <div className="space-y-5">
      {/* App info */}
      <Card>
        <CardContent className="pt-8 pb-8 text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-zapfy-mint rounded-2xl flex items-center justify-center mb-3">
            <span className="text-3xl">⚡</span>
          </div>
          <h2 className="font-display font-bold text-xl">Zapfy</h2>
          <p className="text-sm text-muted-foreground">
            Educacao financeira gamificada para criancas
          </p>
          <p className="text-xs text-muted-foreground/70">Versao 1.0.0</p>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardContent className="p-0">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors ${
                  i < links.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/50" />
              </a>
            );
          })}
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-50 rounded-lg p-2">
              <MessageCircle size={18} className="text-primary-500" />
            </div>
            <div>
              <p className="text-sm font-display font-bold">Precisa de ajuda?</p>
              <p className="text-[11px] text-muted-foreground">
                Entre em contato com nosso suporte
              </p>
            </div>
          </div>
          <a
            href="mailto:suporte@zapfy.app"
            className="inline-flex items-center gap-2 text-sm text-primary-500 font-semibold hover:underline"
          >
            suporte@zapfy.app
          </a>
        </CardContent>
      </Card>

      {/* Admin link */}
      {isAdmin && (
        <Card className="border-violet-200">
          <CardContent className="pt-5 pb-5">
            <a
              href="/admin"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-violet-50 rounded-lg p-2">
                  <Shield size={18} className="text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-display font-bold text-violet-700">Painel Admin</p>
                  <p className="text-[11px] text-muted-foreground">Gerenciar plataforma</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-violet-400" />
            </a>
          </CardContent>
        </Card>
      )}

      {/* Credits */}
      <Card>
        <CardContent className="pt-5 pb-5 text-center text-sm text-muted-foreground">
          <p>Desenvolvido com 💙 pela equipe Zapfy</p>
          <p className="mt-1 text-xs">© 2026 Zapfy - Todos os direitos reservados</p>
        </CardContent>
      </Card>

      {/* Logout */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="font-display font-bold text-sm">Sair da conta</span>
            </div>
            <ChevronRight size={16} className="text-red-300" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sair da conta?</AlertDialogTitle>
            <AlertDialogDescription>
              Voce podera fazer login novamente a qualquer momento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} variant="destructive">
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
