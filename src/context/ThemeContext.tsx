"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { THEME_META, type ThemeColors } from "@/lib/types";
import { THEME_PALETTES, type ThemePalette } from "@/lib/theme-palettes";

interface ThemeContextValue {
  activeTheme: string;
  colors: ThemeColors;
  setTheme: (slug: string) => void;
}

const defaultColors = THEME_META.default.colors;

const ThemeContext = createContext<ThemeContextValue>({
  activeTheme: "default",
  colors: defaultColors,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyThemePalette(palette: ThemePalette) {
  const root = document.documentElement;

  // Primary scale (50-900) — used by Tailwind: bg-primary-500, text-primary-600, etc.
  for (const [shade, hex] of Object.entries(palette.primary)) {
    root.style.setProperty(`--color-primary-${shade}`, hex);
  }

  // Secondary scale (50-900)
  for (const [shade, hex] of Object.entries(palette.secondary)) {
    root.style.setProperty(`--color-secondary-${shade}`, hex);
  }

  // Accent colors
  root.style.setProperty("--color-zapfy-mint", palette.mint);
  root.style.setProperty("--color-zapfy-coin", palette.coin);

  // Semantic colors used by shadcn (--primary, --ring, etc.)
  root.style.setProperty("--primary", palette.primary["500"]);
  root.style.setProperty("--primary-foreground", "#ffffff");
  root.style.setProperty("--ring", palette.primary["500"]);
  root.style.setProperty("--sidebar-primary", palette.primary["500"]);
  root.style.setProperty("--chart-1", palette.primary["500"]);

  // Gradients
  root.style.setProperty("--gradient-hero", palette.gradientHero);
  root.style.setProperty("--gradient-accent", `linear-gradient(90deg, ${palette.coin}, ${palette.mint})`);

  // Shadows with theme-tinted color
  const sc = palette.shadowColor;
  root.style.setProperty("--shadow-soft", `0 4px 20px -4px rgba(${sc}, 0.15)`);
  root.style.setProperty("--shadow-card", `0 10px 30px -10px rgba(${sc}, 0.2)`);
  root.style.setProperty("--shadow-floating", `0 20px 40px -12px rgba(${sc}, 0.25)`);
}

export function ThemeProvider({
  initialTheme = "default",
  children,
}: {
  initialTheme?: string;
  children: React.ReactNode;
}) {
  const [activeTheme, setActiveTheme] = useState(initialTheme);
  const colors = THEME_META[activeTheme]?.colors ?? defaultColors;

  useEffect(() => {
    const palette = THEME_PALETTES[activeTheme] ?? THEME_PALETTES.default;
    applyThemePalette(palette);
  }, [activeTheme]);

  const setTheme = useCallback((slug: string) => {
    setActiveTheme(slug);
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTheme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
