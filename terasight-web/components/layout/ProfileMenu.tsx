"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronDown,
  HelpCircle,
  Keyboard,
  LogOut,
  Palette,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useSession } from "@/lib/session/session-context";
import { useThemeToggle } from "@/lib/theme/use-theme-toggle";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "View Profile", href: "/settings", icon: User },
  { label: "Organization", href: "/organizations", icon: Building2 },
  { label: "Workspace Switcher", href: "/dashboard", icon: Users },
  { label: "Account Settings", href: "/settings", icon: Settings },
  { label: "Keyboard Shortcuts", href: "/settings", icon: Keyboard },
  { label: "Help & Support", href: "/settings", icon: HelpCircle },
];

export function ProfileMenu({ compact = false }: { compact?: boolean }) {
  const { user, logout } = useSession();
  const { mounted, isDark, toggleTheme } = useThemeToggle();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.avatarInitials ?? "VS";
  const name = user?.name ?? "Vishal Sharma";
  const org = user?.organization ?? "Surat Municipal Corporation";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-3 rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] transition hover:bg-[color:var(--color-surface-2)]",
          compact ? "h-10 w-10 justify-center p-0" : "px-3 py-2",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-xs font-semibold text-white">
          {initials}
        </div>
        {!compact ? (
          <>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight">{name}</p>
              <p className="text-xs text-foreground-muted">{org}</p>
            </div>
            <ChevronDown
              className={cn(
                "hidden h-4 w-4 text-foreground-muted transition sm:block",
                open && "rotate-180",
              )}
            />
          </>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full right-0 z-50 mb-2 w-64 overflow-hidden rounded-2xl border border-[color:var(--color-border-1)] bg-background-elevated/95 shadow-2xl backdrop-blur-xl"
            role="menu"
          >
            <div className="border-b border-[color:var(--color-border-1)] px-4 py-3">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-foreground-muted">{user?.email ?? "vishal.sharma@suratmunicipal.gov.in"}</p>
              <p className="mt-1 text-[11px] text-accent">{user?.role ?? "Environmental Analyst"}</p>
            </div>

            <div className="p-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground-muted transition hover:bg-[color:var(--color-surface-2)] hover:text-foreground"
                  role="menuitem"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              ))}

              {mounted ? (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground-muted transition hover:bg-[color:var(--color-surface-2)] hover:text-foreground"
                  role="menuitem"
                >
                  <Palette className="h-4 w-4 shrink-0" />
                  Appearance · {isDark ? "Dark" : "Light"}
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-500 transition hover:bg-rose-500/10"
                role="menuitem"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
