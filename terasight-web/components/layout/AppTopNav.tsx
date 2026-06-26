"use client";

import { Bot, Moon, Search, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { useAssistant } from "@/components/assistant/AssistantContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatIndianDate } from "@/lib/format/india";
import { useThemeToggle } from "@/lib/theme/use-theme-toggle";

import { NotificationPanel } from "./NotificationPanel";
import { ProfileMenu } from "./ProfileMenu";

interface AppTopNavProps {
  onMenuClick?: () => void;
}

export function AppTopNav({ onMenuClick }: AppTopNavProps) {
  const { mounted, isDark, toggleTheme } = useThemeToggle();
  const { openAssistant } = useAssistant();
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    setDateLabel(formatIndianDate(new Date()));
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-5 backdrop-blur-xl lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted hover:bg-[color:var(--color-surface-2)] transition mr-3"
        aria-label="Open sidebar menu"
      >
        <Menu className="h-4 w-4" />
      </button>
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
          className="flex h-10 w-full items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)] pl-10 pr-4 text-sm text-foreground-muted/60 outline-none transition hover:border-emerald-500/30 text-left cursor-pointer"
        >
          Search… (Ctrl K)
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-xs text-foreground-muted lg:inline">{dateLabel}</span>
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
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-2)]"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        ) : null}
        <ProfileMenu />
      </div>
    </header>
  );
}
