"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

const notificationsList = [
  {
    id: "1",
    title: "High-risk detection at Yamuna",
    body: "Plastic concentration exceeds threshold. Review recommended.",
    time: "12 min ago",
    variant: "danger" as const,
  },
  {
    id: "2",
    title: "Surat analysis complete",
    body: "PrithviQ AI finished river monitoring analysis.",
    time: "1.5 hrs ago",
    variant: "ai" as const,
  },
  {
    id: "3",
    title: "Mission progress updated",
    body: "Sabarmati cleanup mission reached 68% completion.",
    time: "3 hrs ago",
    variant: "success" as const,
  },
];

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notificationsList);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-1)]"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {items.length > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
        )}
      </button>

      {open ? (
        <GlassPanel className="absolute right-0 top-12 z-50 w-80 overflow-hidden shadow-2xl border border-[color:var(--color-border-2)] bg-background-elevated/95 backdrop-blur-xl">
          <div className="border-b border-[color:var(--color-border-1)] px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Notifications</p>
            {items.length > 0 && (
              <button 
                onClick={() => {
                  setItems([]);
                  setOpen(false);
                }}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="max-h-80 space-y-1 overflow-y-auto p-2">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3 transition hover:bg-[color:var(--color-surface-2)]/40"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <Badge variant={item.variant} className="text-[9px] px-1 py-0.5">
                      New
                    </Badge>
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground-muted">{item.body}</p>
                  <p className="mt-1.5 text-[9px] text-foreground-muted font-mono">{item.time}</p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-foreground-muted">
                No new notifications.
              </div>
            )}
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
