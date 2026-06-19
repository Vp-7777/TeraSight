"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme !== "light";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return { mounted, isDark, toggleTheme, resolvedTheme };
}
