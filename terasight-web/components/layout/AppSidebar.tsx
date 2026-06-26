"use client";

import { motion } from "framer-motion";
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
import { useThemeToggle } from "@/lib/theme/use-theme-toggle";
import { useState } from "react";

import { useAssistant } from "@/components/assistant/AssistantContext";
import { Badge } from "@/components/ui/badge";
import { mainNavItems } from "@/lib/constants/navigation";
import { useSession, WORKSPACES } from "@/lib/session/session-context";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { openAssistant } = useAssistant();
  const { user, logout, activeWorkspace, setActiveWorkspace } = useSession();
  const { mounted, isDark, toggleTheme } = useThemeToggle();
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  return (
    <aside
      className={cn(
        "glass-panel surface-border-gradient flex h-[calc(100vh-1.5rem)] shrink-0 flex-col rounded-[var(--radius-xl)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)]/80 shadow-[var(--shadow-2)] backdrop-blur-2xl transition-all duration-300",
        collapsed ? "md:w-[76px]" : "md:w-[248px]",
        "fixed inset-y-3 left-3 z-50 md:relative md:inset-0 md:z-20",
        mobileOpen ? "translate-x-0 w-[248px]" : "-translate-x-[280px] md:translate-x-0",
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
          className="hidden md:flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-2)]"
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
            className="flex w-full items-center justify-between rounded-[var(--radius-md)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)] px-3 py-2.5 text-left transition hover:bg-[color:var(--color-surface-3)]"
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
              {WORKSPACES.map((ws) => (
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
                      ? "bg-[color:var(--color-nav-active-bg)] text-[color:var(--color-nav-active-text)]"
                      : "text-foreground-muted hover:bg-[color:var(--color-surface-2)]",
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] bg-[color:var(--color-surface-2)] text-[10px] font-semibold">
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
            "flex w-full items-center gap-3 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-sky-500/5 text-sm font-medium text-[color:var(--color-nav-active-text)] transition hover:border-emerald-500/35 hover:from-emerald-500/15",
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
            <Link key={item.href} href={item.href} onClick={onMobileClose}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-[color:var(--color-nav-active-bg)] text-[color:var(--color-nav-active-text)] shadow-[inset_0_0_0_1px_rgba(52,211,153,0.15)]"
                    : "text-foreground-muted hover:bg-[color:var(--color-surface-2)] hover:text-foreground",
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
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-1 border-t border-[color:var(--color-border-1)] p-3">
        {!collapsed ? (
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-[color:var(--color-surface-1)] px-3 py-2.5">
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
              "flex items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-2)]",
              collapsed ? "h-10 w-full" : "h-9 flex-1",
            )}
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "flex items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-2)]",
                collapsed ? "h-10 w-full" : "h-9 flex-1",
              )}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : null}
          <button
            type="button"
            onClick={logout}
            className={cn(
              "flex items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-rose-500/80 transition hover:bg-rose-500/10 hover:text-rose-500",
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
