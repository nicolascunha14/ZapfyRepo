"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BarChart3, Trophy, User, ShoppingBag } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Aprender", icon: BookOpen },
  { href: "/parent", label: "Painel", icon: BarChart3 },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: User },
  { href: "/store", label: "Loja", icon: ShoppingBag },
];

export function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 backdrop-blur-md border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg min-w-[3.5rem] transition-colors ${
                active
                  ? "text-primary-500"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] leading-tight ${active ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
