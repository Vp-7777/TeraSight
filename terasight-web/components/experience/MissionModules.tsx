"use client";

import { motion } from "framer-motion";
import { Plane, Radio, Target, Wallet } from "lucide-react";
import { useMemo } from "react";

import { useSession } from "@/lib/session/session-context";
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
  const { activeWorkspace } = useSession();

  const drones = useMemo(() => {
    switch (activeWorkspace.id) {
      case "namami":
        return [
          { id: "DRN-01", site: "Yamuna Barrage", battery: 88, status: "Scanning plastic grid" },
          { id: "DRN-04", site: "Kalindi Kunj", battery: 52, status: "Returning to base" },
          { id: "DRN-05", site: "Okhla Outfall", battery: 94, status: "Standby" },
        ];
      case "iitb":
        return [
          { id: "DRN-03", site: "Mithi River Basin", battery: 91, status: "Standby" },
          { id: "DRN-06", site: "IITB Lake Outfall", battery: 73, status: "Awaiting flight path" },
        ];
      default: // smc
        return [
          { id: "DRN-02", site: "Surat Tapi River", battery: 62, status: "Returning" },
          { id: "DRN-07", site: "Pandesara Outfall", battery: 81, status: "Scanning industrial zone" },
          { id: "DRN-08", site: "Sachin GIDC", battery: 95, status: "Standby" },
        ];
    }
  }, [activeWorkspace.id]);

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

export function BudgetImpactTracker({ missions = [] }: { missions?: any[] }) {
  const totalBudget = missions.reduce((s, m) => s + (m.budgetInr ?? 1500000), 0);
  const totalWaste = missions.reduce((s, m) => s + m.wasteRemovedKg, 0);
  const totalCarbon = missions.length
    ? Math.round(missions.reduce((s, m) => s + m.carbonImpact, 0) / missions.length)
    : 0;

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
