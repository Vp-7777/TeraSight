"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

const notifications = [
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
    time: "1 hr ago",
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

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--color-border-1)] text-foreground-muted transition hover:bg-[color:var(--color-surface-1)]"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
      </button>

      {open ? (
        <GlassPanel className="absolute right-0 top-12 z-50 w-80 overflow-hidden shadow-2xl">
          <div className="border-b border-[color:var(--color-border-1)] px-4 py-3">
            <p className="text-sm font-medium">Notifications</p>
          </div>
          <div className="max-h-80 space-y-1 overflow-y-auto p-2">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3 transition hover:bg-[color:var(--color-surface-1)]"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <Badge variant={item.variant} className="text-[10px]">
                    New
                  </Badge>
                </div>
                <p className="text-xs leading-5 text-foreground-muted">{item.body}</p>
                <p className="mt-2 text-[11px] text-foreground-muted">{item.time}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
