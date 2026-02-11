"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Settings,
  ShoppingBag,
  Crown,
  Shield,
  LogOut,
  Coins,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/dashboard", label: "Aprender", icon: BookOpen },
  { href: "/parent", label: "Painel", icon: BarChart3 },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: User },
  { href: "/settings", label: "Configurações", icon: Settings },
  { href: "/store", label: "Loja", icon: ShoppingBag },
];

export function Sidebar({
  isAdmin,
  points,
  zapcoins,
  streak,
}: {
  isAdmin: boolean;
  points: number;
  zapcoins: number;
  streak: number;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 bg-white border-r border-border/50 z-40">
      {/* Logo + Points */}
      <div className="px-5 pt-5 pb-3 space-y-3">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zapfy-coin/20 rounded-full px-3 py-1.5">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-bold text-amber-700 tabular-nums">
              {zapcoins.toLocaleString("pt-BR")}
            </span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1 bg-orange-50 rounded-full px-2.5 py-1.5">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-bold text-orange-600 tabular-nums">
                {streak}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-border/50 mx-4" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-50 text-primary-500 border-l-4 border-primary-500 pl-2"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1">
        <div className="h-px bg-border/50 mx-1 mb-2" />

        <Link
          href="/premium"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/premium")
              ? "bg-amber-50 text-amber-600"
              : "text-amber-500 hover:bg-amber-50 hover:text-amber-600"
          }`}
        >
          <Crown size={20} />
          Premium
        </Link>

        {isAdmin && (
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/admin")
                ? "bg-violet-50 text-violet-600"
                : "text-violet-500 hover:bg-violet-50 hover:text-violet-600"
            }`}
          >
            <Shield size={20} />
            Admin
          </Link>
        )}

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors w-full cursor-pointer"
          >
            <LogOut size={20} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
