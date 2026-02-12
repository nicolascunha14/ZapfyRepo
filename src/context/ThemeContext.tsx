"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { THEME_META, type ThemeColors } from "@/lib/types";

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

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", colors.primary);
  root.style.setProperty("--theme-secondary", colors.secondary);
  root.style.setProperty("--theme-accent", colors.accent);
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
    applyThemeColors(colors);
  }, [colors]);

  const setTheme = useCallback((slug: string) => {
    setActiveTheme(slug);
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTheme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
