import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Settings, Bell, Info, LogOut, Shield } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary-50 rounded-xl p-2.5">
          <Settings size={24} className="text-primary-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Configurações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas preferências
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Notificações</p>
              <p className="text-xs text-muted-foreground">
                Receba lembretes de missões
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
            Em breve
          </span>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-border/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info size={20} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Sobre o Zapfy</p>
              <p className="text-xs text-muted-foreground">
                Versão 1.0.0
              </p>
            </div>
          </div>
        </div>

        {/* Admin */}
        {isAdmin && (
          <Link
            href="/admin"
            className="bg-white rounded-xl border border-border/50 p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
          >
            <Shield size={20} className="text-violet-500" />
            <div>
              <p className="text-sm font-medium text-violet-500">
                Painel Admin
              </p>
              <p className="text-xs text-muted-foreground">
                Gerenciar plataforma
              </p>
            </div>
          </Link>
        )}

        {/* Account info */}
        <div className="bg-white rounded-xl border border-border/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Conta</p>
          <p className="text-sm font-medium">{user.email}</p>
        </div>

        {/* Sign out */}
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="w-full bg-white rounded-xl border border-error/20 p-4 flex items-center gap-3 hover:bg-error/5 transition-colors cursor-pointer"
          >
            <LogOut size={20} className="text-error" />
            <p className="text-sm font-medium text-error">Sair da conta</p>
          </button>
        </form>
      </div>
    </div>
  );
}
