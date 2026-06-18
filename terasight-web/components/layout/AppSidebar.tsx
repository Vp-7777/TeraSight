"use client";

import {
  Bot,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useAssistant } from "@/components/assistant/AssistantContext";
import { Badge } from "@/components/ui/badge";
import { mainNavItems } from "@/lib/constants/navigation";
import { useSession } from "@/lib/session/session-context";
import { cn } from "@/lib/utils";

const workspaces = [
  { id: "smc", name: "Surat Municipal Corp", short: "SMC" },
  { id: "namami", name: "Namami Gange Mission", short: "NGM" },
  { id: "iitb", name: "IIT Bombay Analytics", short: "IITB" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const { openAssistant } = useAssistant();
  const { user, logout } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  useEffect(() => setMounted(true), []);

  return (
    <aside
      className={cn(
        "glass-panel surface-border-gradient relative z-20 flex h-[calc(100vh-1.5rem)] shrink-0 flex-col rounded-[var(--radius-xl)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] shadow-[var(--shadow-2)] backdrop-blur-2xl transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[248px]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] p-3">
        {!collapsed ? (
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3 px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-emerald-500 to-teal-400 text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
              T
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">TeraSight</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                Intelligence
              </p>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard" className="mx-auto">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-sm font-bold text-white">
              T
            </div>
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-white/5"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Workspace selector */}
      {!collapsed ? (
        <div className="border-b border-[color:var(--color-border-1)] p-3">
          <button
            type="button"
            onClick={() => setWorkspaceOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)] px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
                Workspace
              </p>
              <p className="truncate text-sm font-medium">{activeWorkspace.name}</p>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-foreground-muted transition",
                workspaceOpen && "rotate-180",
              )}
            />
          </button>
          {workspaceOpen ? (
            <div className="mt-1 space-y-0.5 rounded-[var(--radius-md)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-1 shadow-[var(--shadow-1)]">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => {
                    setActiveWorkspace(ws);
                    setWorkspaceOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition",
                    activeWorkspace.id === ws.id
                      ? "bg-emerald-500/12 text-emerald-300"
                      : "text-foreground-muted hover:bg-white/5",
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] bg-white/5 text-[10px] font-semibold">
                    {ws.short}
                  </span>
                  <span className="truncate">{ws.name}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* AI shortcut */}
      <div className="p-3 pb-0">
        <button
          type="button"
          onClick={openAssistant}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-sky-500/5 text-sm font-medium text-emerald-300 transition hover:border-emerald-500/35 hover:from-emerald-500/15",
            collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
          )}
        >
          <Bot className="h-4 w-4 shrink-0" />
          {!collapsed ? <span>Ask PrithviQ AI</span> : null}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {mainNavItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-emerald-500/12 text-emerald-300"
                    : "text-foreground-muted hover:bg-white/5 hover:text-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                {active ? (
                  <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" />
                ) : null}
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed ? (
                  <span className="flex flex-1 items-center justify-between gap-2">
                    <span>{item.label}</span>
                    {item.badge ? (
                      <Badge variant="ai" className="px-2 py-0 text-[10px]">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-1 border-t border-white/8 p-3">
        {!collapsed ? (
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-xs font-semibold text-white">
              {user?.avatarInitials ?? "VS"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name ?? "Vishal Sharma"}</p>
              <p className="truncate text-[11px] text-foreground-muted">
                {user?.organization ?? "Surat Municipal Corporation"}
              </p>
            </div>
          </div>
        ) : null}

        <div className={cn("flex gap-1", collapsed ? "flex-col" : "flex-row")}>
          <Link
            href="/settings"
            className={cn(
              "flex items-center justify-center rounded-xl border border-white/10 text-foreground-muted transition hover:bg-white/5",
              collapsed ? "h-10 w-full" : "h-9 flex-1",
            )}
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
          {mounted ? (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "flex items-center justify-center rounded-xl border border-white/10 text-foreground-muted transition hover:bg-white/5",
                collapsed ? "h-10 w-full" : "h-9 flex-1",
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : null}
          <button
            type="button"
            onClick={logout}
            className={cn(
              "flex items-center justify-center rounded-xl border border-white/10 text-rose-400/80 transition hover:bg-rose-500/10 hover:text-rose-400",
              collapsed ? "h-10 w-full" : "h-9 flex-1",
            )}
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
