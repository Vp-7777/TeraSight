"use client";

import { motion } from "framer-motion";
import { Plane, Radio, Target, Wallet } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { indianMissions } from "@/lib/data/india-demo";
import { formatInr } from "@/lib/data/india-demo";

const LIFECYCLE = [
  { phase: "Planning", status: "complete" },
  { phase: "Deployment", status: "active" },
  { phase: "Interception", status: "active" },
  { phase: "Verification", status: "pending" },
  { phase: "Report", status: "pending" },
];

export function MissionLifecycleTimeline() {
  return (
    <GlassPanel glow="emerald" className="p-5">
      <p className="mb-4 text-sm font-medium">Mission Lifecycle</p>
      <div className="flex items-center justify-between">
        {LIFECYCLE.map((step, i) => (
          <div key={step.phase} className="flex flex-1 flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-semibold ${
                step.status === "complete"
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-400"
                  : step.status === "active"
                    ? "border-sky-400 bg-sky-500/20 text-sky-400 animate-pulse"
                    : "border-[color:var(--color-border-1)] text-foreground-muted"
              }`}
            >
              {i + 1}
            </motion.div>
            <p className="mt-1.5 text-[10px] text-foreground-muted">{step.phase}</p>
            {i < LIFECYCLE.length - 1 ? (
              <div className="absolute hidden" />
            ) : null}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function DroneDeploymentTracker() {
  const drones = [
    { id: "DRN-01", site: "Yamuna", battery: 78, status: "Scanning" },
    { id: "DRN-02", site: "Surat", battery: 62, status: "Returning" },
    { id: "DRN-03", site: "Mumbai", battery: 91, status: "Standby" },
  ];

  return (
    <GlassPanel className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <Plane className="h-4 w-4 text-sky-400" />
        <p className="text-sm font-medium">Drone Deployment</p>
      </div>
      <div className="space-y-2">
        {drones.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border-1)] px-3 py-2"
          >
            <Radio className="h-3.5 w-3.5 text-emerald-400" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{d.id} · {d.site}</p>
              <p className="text-[10px] text-foreground-muted">{d.status}</p>
            </div>
            <span className="text-xs tabular-nums text-foreground-muted">{d.battery}%</span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function BudgetImpactTracker() {
  const totalBudget = indianMissions.reduce((s, m) => s + m.budgetInr, 0);
  const totalWaste = indianMissions.reduce((s, m) => s + m.wasteRemovedKg, 0);
  const totalCarbon = indianMissions.reduce((s, m) => s + m.carbonImpact, 0);

  return (
    <GlassPanel border="gradient" className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <Wallet className="h-4 w-4 text-amber-400" />
        <p className="text-sm font-medium">Budget & Impact</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Budget", value: formatInr(totalBudget), icon: Wallet },
          { label: "Waste Removed", value: `${(totalWaste / 1000).toFixed(1)}t`, icon: Target },
          { label: "Carbon Impact", value: `+${totalCarbon}%`, icon: Target },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-[color:var(--color-surface-1)] p-3 text-center">
            <item.icon className="mx-auto mb-1 h-4 w-4 text-foreground-muted" />
            <p className="text-lg font-semibold">{item.value}</p>
            <p className="text-[10px] text-foreground-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
