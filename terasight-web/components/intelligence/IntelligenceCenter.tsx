"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Brain,
  Cpu,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  activityFeed,
  aiModels,
  aiTimeline,
} from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const timelineIcons = {
  detection: Brain,
  alert: AlertTriangle,
  mission: Activity,
  model: Cpu,
};

export function IntelligenceCenter() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-300" />
            <Badge variant="ai">PrithviQ AI Online</Badge>
          </div>
          <h1 className="text-3xl font-semibold">AI Intelligence Center</h1>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            Real-time environmental intelligence, model activity, and strategic AI recommendations.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="space-y-6 xl:col-span-4">
          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--color-border-1)] px-5 py-4">
              <p className="font-medium">AI Event Timeline</p>
            </div>
            <div className="relative space-y-0 p-5">
              <div className="absolute bottom-4 left-[27px] top-4 w-px bg-[color:var(--color-surface-2)]" />
              {aiTimeline.map((event, index) => {
                const Icon = timelineIcons[event.type];
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground-muted">{event.time}</p>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="mt-0.5 text-sm text-foreground-muted">{event.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassPanel>

          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--color-border-1)] px-5 py-4">
              <p className="font-medium">Active AI Models</p>
            </div>
            <div className="space-y-3 p-4">
              {aiModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-foreground-muted">v{model.version}</p>
                    </div>
                    <Badge
                      variant={model.status === "active" ? "success" : "default"}
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex gap-4 text-xs text-foreground-muted">
                    <span>{model.accuracy}% accuracy</span>
                    <span>{model.latencyMs}ms latency</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-5">
          <AiInsightsWidget limit={6} />
          <GlassPanel className="mt-6 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-300" />
              <p className="font-medium">Environmental Alerts</p>
            </div>
            <div className="space-y-3">
              {[
                {
                  level: "Critical",
                  text: "Plastic concentration exceeds threshold at River B-12",
                  variant: "danger" as const,
                },
                {
                  level: "Warning",
                  text: "ERI rising at Wetland Reserve W-07 over 7-day window",
                  variant: "warning" as const,
                },
                {
                  level: "Info",
                  text: "Carbon recovery opportunity identified at Drain D-03",
                  variant: "ai" as const,
                },
              ].map((alert) => (
                <div
                  key={alert.text}
                  className={cn(
                    "rounded-xl border px-4 py-3",
                    alert.variant === "danger" && "border-rose-500/20 bg-rose-500/5",
                    alert.variant === "warning" && "border-amber-500/20 bg-amber-500/5",
                    alert.variant === "ai" && "border-sky-500/20 bg-sky-500/5",
                  )}
                >
                  <Badge variant={alert.variant} className="mb-2">
                    {alert.level}
                  </Badge>
                  <p className="text-sm text-foreground-muted">{alert.text}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-3">
          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--color-border-1)] px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[color:var(--color-nav-active-text)]" />
                <p className="font-medium">Live Activity</p>
              </div>
            </div>
            <div className="divide-y divide-[color:var(--color-border-1)]">
              {activityFeed.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-5 py-4"
                >
                  <p className="text-sm">
                    <span className="font-medium text-[color:var(--color-nav-active-text)]">{item.actor}</span>{" "}
                    <span className="text-foreground-muted">{item.action}</span>{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">{item.time}</p>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
