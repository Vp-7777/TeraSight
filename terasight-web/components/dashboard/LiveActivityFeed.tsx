"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Radio } from "lucide-react";
import { useEffect, useState } from "react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { activityFeed } from "@/lib/data/intelligence-mock";

const liveActors = [
  "PrithviQ AI",
  "SMC Field Unit",
  "Namami Gange Corps",
  "IIT Bombay Analytics",
  "Tata Sustainability Team",
];

const liveTargets = [
  "Surat River Monitoring",
  "Yamuna Plastic Detection",
  "Sabarmati River Cleanup",
  "Mithi River Restoration",
  "Vapi Industrial Zone",
];

const liveActions = [
  "completed analysis",
  "flagged high-risk detection",
  "updated mission progress",
  "generated environmental report",
];

export function LiveActivityFeed() {
  const [items, setItems] = useState(activityFeed);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;

    const interval = window.setInterval(() => {
      const newItem = {
        id: `live-${Date.now()}`,
        actor: liveActors[Math.floor(Math.random() * liveActors.length)],
        action: liveActions[Math.floor(Math.random() * liveActions.length)],
        target: liveTargets[Math.floor(Math.random() * liveTargets.length)],
        time: "Just now",
      };
      setItems((prev) => [newItem, ...prev.slice(0, 5)]);
    }, 20000);

    return () => window.clearInterval(interval);
  }, [live]);

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <p className="font-medium">Live Activity</p>
        </div>
        <button
          type="button"
          onClick={() => setLive((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-foreground-muted transition hover:text-foreground"
        >
          <span className="relative flex h-2 w-2">
            {live ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            ) : null}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${live ? "bg-emerald-400" : "bg-foreground-muted/40"}`}
            />
          </span>
          {live ? "Live" : "Paused"}
        </button>
      </div>

      <div className="max-h-64 space-y-0 overflow-y-auto p-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 rounded-xl px-3 py-3 transition hover:bg-[color:var(--color-surface-1)]"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                <Radio className="h-4 w-4" />
              </div>
              <div className="min-w-0 text-sm">
                <p>
                  <span className="font-medium">{item.actor}</span>{" "}
                  <span className="text-foreground-muted">{item.action}</span>{" "}
                  <span className="text-accent">{item.target}</span>
                </p>
                <p className="mt-0.5 text-xs text-foreground-muted">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
