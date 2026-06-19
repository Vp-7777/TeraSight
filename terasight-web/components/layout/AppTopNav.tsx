"use client";

import { Bot, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useAssistant } from "@/components/assistant/AssistantContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatIndianDate } from "@/lib/format/india";

import { NotificationPanel } from "./NotificationPanel";
import { ProfileMenu } from "./ProfileMenu";

export function AppTopNav() {
  const { theme, setTheme } = useTheme();
  const { openAssistant } = useAssistant();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-5 backdrop-blur-xl lg:px-6">
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input
          type="search"
          placeholder="Search…  (Ctrl K)"
          className="h-10 w-full rounded-[var(--radius-sm)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)] pl-10 pr-4 text-sm outline-none transition placeholder:text-foreground-muted/60 focus:border-emerald-500/30 focus:ring-2 focus:ring-emerald-500/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-xs text-foreground-muted lg:inline">
          {formatIndianDate(new Date())}
        </span>
        <Badge variant="ai" className="hidden sm:inline-flex">
          <span className="relative mr-1.5 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          PrithviQ Live
        </Badge>
        <Button
          variant="secondary"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={openAssistant}
        >
          <Bot className="h-4 w-4" />
          AI Assistant
        </Button>
        <NotificationPanel />
        {mounted ? (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-foreground-muted transition hover:bg-white/5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        ) : null}
        <ProfileMenu />
      </div>
    </header>
  );
}
