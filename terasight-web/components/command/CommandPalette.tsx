/**
 * CommandPalette.tsx
 *
 * Global application command menu overlay.
 * It registers keydown window listeners for keyboard shortcut toggles (Ctrl + K)
 * and dispatches routes dynamically across monitoring subpanels.
 *
 * Purpose & Logic Author: Vishal
 */

"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import {
  Building2,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Map,
  ScanSearch,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useSession } from "@/lib/session/session-context";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
  onSelect?: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useSession();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // [Vishal] Keydown listener hook intercepting Ctrl+K / Escape shortcuts to toggle the menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.key) return;
      const isK = e.key.toLowerCase() === "k";
      const modifier = e.ctrlKey || e.metaKey;
      if (modifier && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };

    const handleToggle = () => {
      setOpen((v) => !v);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("toggle-command-palette", handleToggle);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("toggle-command-palette", handleToggle);
    };
  }, []);

  const items = useMemo<PaletteItem[]>(
    () => [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { id: "globe", label: "Global Globe", href: "/globe", icon: Globe2 },
      { id: "analyze", label: "Analyze Image", href: "/analyze", icon: ScanSearch },
      { id: "map", label: "Map Explorer", href: "/map", icon: Map },
      { id: "intelligence", label: "AI Intelligence Center", href: "/intelligence", icon: Sparkles },
      { id: "missions", label: "Cleanup Missions", href: "/missions", icon: Target },
      { id: "reports", label: "Reports", href: "/reports", icon: FileText },
      { id: "orgs", label: "Organizations", href: "/organizations", icon: Building2 },
      { id: "settings", label: "Settings", href: "/settings", icon: Settings },
      { id: "logout", label: "Logout", icon: LogOut, onSelect: logout },
    ],
    [logout],
  );

  const run = (item: PaletteItem) => {
    setOpen(false);
    setQuery("");
    if (item.onSelect) {
      item.onSelect();
      return;
    }
    if (item.href) router.push(item.href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
      aria-hidden="true"
    >
      <div
        className="mx-auto mt-24 w-[min(92vw,680px)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="glass-panel surface-border-gradient rounded-[var(--radius-xl)] p-2 shadow-[var(--shadow-3)]">
          <Command
            label="Command Palette"
            className="rounded-[var(--radius-lg)]"
            value={query}
            onValueChange={setQuery}
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--color-border-1)] px-3 py-3">
              <div className="text-xs text-foreground-muted">
                {pathname}
              </div>
              <div className="ml-auto text-[11px] text-foreground-muted">
                Ctrl K · Esc
              </div>
            </div>

            <CommandInput
              autoFocus
              placeholder="Type a command or search…"
              className="h-12 w-full bg-transparent px-4 text-sm outline-none placeholder:text-foreground-muted/60"
            />

            <CommandList className="max-h-[420px] overflow-y-auto px-2 pb-2">
              <CommandEmpty className="px-3 py-10 text-center text-sm text-foreground-muted">
                No results.
              </CommandEmpty>

              <CommandGroup heading="Navigate" className="px-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      value={`${item.label} ${item.keywords ?? ""}`}
                      onSelect={() => run(item)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-foreground-muted outline-none transition",
                        "aria-selected:bg-[color:var(--color-surface-2)] aria-selected:text-foreground",
                      )}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.href ? (
                        <span className="text-[11px] text-foreground-muted">
                          {item.href}
                        </span>
                      ) : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
}

