"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { useMemo } from "react";
import { useSession } from "@/lib/session/session-context";

import { GlassPanel } from "@/components/ui/glass-panel";
import { aiInsights, type AiInsight } from "@/lib/data/workspace-mock";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  AiInsight["type"],
  { icon: typeof Sparkles; accent: string }
> = {
  alert: { icon: AlertCircle, accent: "text-rose-300 bg-rose-500/15" },
  recommendation: { icon: Lightbulb, accent: "text-amber-300 bg-amber-500/15" },
  trend: { icon: TrendingUp, accent: "text-[color:var(--color-nav-active-text)] bg-emerald-500/15" },
};

interface AiInsightsWidgetProps {
  limit?: number;
}

export function AiInsightsWidget({ limit = 3 }: AiInsightsWidgetProps) {
  const { activeWorkspace } = useSession();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    const matching = aiInsights.filter(insight => {
      const titleLower = insight.title.toLowerCase();
      const bodyLower = insight.body.toLowerCase();
      const wsShortLower = activeWorkspace.short.toLowerCase();
      const wsNameLower = activeWorkspace.name.toLowerCase();
      
      return titleLower.includes(wsShortLower) || 
             bodyLower.includes(wsShortLower) ||
             titleLower.includes(wsNameLower) ||
             bodyLower.includes(wsNameLower) ||
             (activeWorkspace.id === "namami" && (bodyLower.includes("yamuna") || bodyLower.includes("gange"))) ||
             (activeWorkspace.id === "smc" && (bodyLower.includes("surat") || bodyLower.includes("vapi") || bodyLower.includes("sabarmati"))) ||
             (activeWorkspace.id === "iitb" && (bodyLower.includes("iit") || bodyLower.includes("bombay") || bodyLower.includes("sabarmati")));
    });
    return matching.length > 0 ? matching.slice(0, limit) : aiInsights.slice(0, limit);
  }, [activeWorkspace, limit]);

  useEffect(() => {
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [items.length]);

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-300" />
          <div>
            <p className="font-medium text-foreground">AI Insights</p>
            <p className="text-xs text-foreground-muted">Rotating PrithviQ intelligence</p>
          </div>
        </div>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === activeIndex ? "w-4 bg-emerald-400" : "w-1.5 bg-[color:var(--color-surface-3)]",
              )}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        <AnimatePresence mode="wait">
          {items.map((insight, index) => {
            if (index !== activeIndex) return null;
            const config = typeConfig[insight.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4"
              >
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      config.accent,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <p className="mt-1 text-sm leading-6 text-foreground-muted">{insight.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items
          .filter((_, i) => i !== activeIndex)
          .map((insight, index) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4 opacity-60 transition hover:border-[color:var(--color-border-2)] hover:bg-[color:var(--color-surface-1)] hover:opacity-100"
              >
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      config.accent,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-foreground-muted">
                      {insight.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </GlassPanel>
  );
}
