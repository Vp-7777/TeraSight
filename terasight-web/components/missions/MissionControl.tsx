"use client";

import { motion } from "framer-motion";
import { Leaf, Plus, Target, Trash2, Users } from "lucide-react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import {
  BudgetImpactTracker,
  DroneDeploymentTracker,
  MissionLifecycleTimeline,
} from "@/components/experience/MissionModules";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { missions, type Mission } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

function priorityVariant(p: Mission["priority"]) {
  switch (p) {
    case "Critical":
      return "danger" as const;
    case "High":
      return "warning" as const;
    case "Medium":
      return "ai" as const;
    default:
      return "success" as const;
  }
}

function statusVariant(s: Mission["status"]) {
  switch (s) {
    case "Active":
      return "success" as const;
    case "Scheduled":
      return "ai" as const;
    case "Complete":
      return "default" as const;
    default:
      return "warning" as const;
  }
}

export function MissionControl() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Operations</p>
          <h1 className="mt-2 text-3xl font-semibold">Mission Control</h1>
          <p className="mt-2 text-foreground-muted">
            Coordinate cleanup operations with AI-guided prioritization and impact tracking.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Mission
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <MissionLifecycleTimeline />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeInUp}>
          <DroneDeploymentTracker />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <BudgetImpactTracker />
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Missions", value: "3", icon: Target },
          { label: "Waste Removed", value: "2.3t", icon: Trash2 },
          { label: "Carbon Impact", value: "+41%", icon: Leaf },
        ].map((stat, index) => (
          <motion.div key={stat.label} variants={fadeInUp} transition={{ delay: index * 0.05 }}>
            <GlassPanel className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-[color:var(--color-nav-active-text)]">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-foreground-muted">{stat.label}</p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <GlassPanel className="overflow-hidden transition hover:border-emerald-500/20">
              <div className="border-b border-[color:var(--color-border-1)] px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{mission.name}</p>
                    <p className="text-sm text-foreground-muted">{mission.site}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={priorityVariant(mission.priority)}>
                      {mission.priority}
                    </Badge>
                    <Badge variant={statusVariant(mission.status)}>{mission.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-foreground-muted">Progress</span>
                    <span className="font-medium">{mission.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        mission.progress === 100
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-emerald-500 to-sky-400",
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${mission.progress}%` }}
                      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <p className="text-lg font-semibold">{mission.wasteRemovedKg}</p>
                    <p className="text-[10px] text-foreground-muted">kg removed</p>
                  </div>
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <p className="text-lg font-semibold">{mission.carbonImpact}%</p>
                    <p className="text-[10px] text-foreground-muted">carbon impact</p>
                  </div>
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <Users className="mx-auto h-4 w-4 text-foreground-muted" />
                    <p className="mt-1 text-[10px] text-foreground-muted">{mission.team}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-muted">Due {mission.dueDate}</p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
