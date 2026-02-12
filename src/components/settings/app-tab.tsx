"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Volume2, Sparkles, Bell, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

type Theme = "light" | "dark" | "auto";

const THEMES: { value: Theme; label: string; icon: React.ElementType }[] = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "auto", label: "Auto", icon: Monitor },
];

export function AppTab() {
  const [theme, setTheme] = useState<Theme>("light");
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem("zapfy_prefs") || "{}");
      setTheme(prefs.theme || "light");
      setSoundEffects(prefs.soundEffects ?? true);
      setAnimations(prefs.animations ?? true);
      setPushNotifications(prefs.pushNotifications ?? true);
    } catch {}
  }, []);

  function savePref(key: string, value: unknown) {
    try {
      const prefs = JSON.parse(localStorage.getItem("zapfy_prefs") || "{}");
      prefs[key] = value;
      localStorage.setItem("zapfy_prefs", JSON.stringify(prefs));
    } catch {}
  }

  function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);
    savePref("theme", newTheme);
    // Apply theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Auto: follow system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }

  function handleToggle(key: string, value: boolean, setter: (v: boolean) => void) {
    setter(value);
    savePref(key, value);

    if (key === "animations") {
      document.documentElement.classList.toggle("reduce-motion", !value);
    }
  }

  return (
    <div className="space-y-5">
      {/* Theme */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Tema
          </label>
          <div className="flex gap-2">
            {THEMES.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => handleThemeChange(t.value)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 font-display font-bold text-sm transition-all cursor-pointer ${
                    isActive
                      ? "border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200"
                      : "border-border/50 hover:border-border text-muted-foreground"
                  }`}
                >
                  <Icon size={22} className={isActive ? "text-primary-500" : ""} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 rounded-lg p-2">
                <Bell size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-display font-bold">Notificacoes push</p>
                <p className="text-[11px] text-muted-foreground">
                  Lembretes para jogar todo dia
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={(v) => handleToggle("pushNotifications", v, setPushNotifications)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sound Effects */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-lg p-2">
                <Volume2 size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-display font-bold">Efeitos sonoros</p>
                <p className="text-[11px] text-muted-foreground">
                  Sons ao acertar e errar missoes
                </p>
              </div>
            </div>
            <Switch
              checked={soundEffects}
              onCheckedChange={(v) => handleToggle("soundEffects", v, setSoundEffects)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Animations */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-violet-50 rounded-lg p-2">
                <Sparkles size={18} className="text-violet-500" />
              </div>
              <div>
                <p className="text-sm font-display font-bold">Animacoes</p>
                <p className="text-[11px] text-muted-foreground">
                  Desative para melhor performance
                </p>
              </div>
            </div>
            <Switch
              checked={animations}
              onCheckedChange={(v) => handleToggle("animations", v, setAnimations)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language (disabled) */}
      <Card className="opacity-60">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-lg p-2">
                <Globe size={18} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-display font-bold">Idioma</p>
                <p className="text-[11px] text-muted-foreground">
                  Portugues (Brasil)
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-muted rounded-full px-2.5 py-1 font-bold text-muted-foreground uppercase">
              Em breve
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
