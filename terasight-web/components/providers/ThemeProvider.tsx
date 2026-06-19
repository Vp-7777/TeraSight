"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";

function ThemeTransitionManager() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add("theme-transition");
    const timer = window.setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      400,
    );
    return () => window.clearTimeout(timer);
  }, [theme]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="terasight-theme"
      disableTransitionOnChange={false}
    >
      <ThemeTransitionManager />
      {children}
    </NextThemesProvider>
  );
}
