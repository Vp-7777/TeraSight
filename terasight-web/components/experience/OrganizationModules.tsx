"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { organizations } from "@/lib/data/intelligence-mock";

export function PerformanceLeaderboard() {
  const ranked = [...organizations].sort((a, b) => a.riskScore - b.riskScore);

  return (
    <GlassPanel glow="emerald" className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-400" />
        <p className="text-sm font-medium">Performance Leaderboard</p>
      </div>
      <div className="space-y-2">
        {ranked.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border-1)] px-3 py-2"
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
              i === 0 ? "bg-amber-500/20 text-amber-400" : "bg-[color:var(--color-surface-2)] text-foreground-muted"
            }`}>
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{org.name}</p>
              <p className="text-xs text-foreground-muted">{org.sites} sites · {org.analyses} analyses</p>
            </div>
            <span className="text-sm font-semibold text-emerald-400">{100 - org.riskScore}</span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function NationalNetworkGraph() {
  const nodes = organizations.slice(0, 5);

  return (
    <GlassPanel className="p-5">
      <p className="mb-3 text-sm font-medium">National Network</p>
      <svg viewBox="0 0 300 200" className="h-48 w-full">
        <circle cx="150" cy="100" r="6" fill="#34d399" />
        {nodes.map((org, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 150 + Math.cos(angle) * 90;
          const y = 100 + Math.sin(angle) * 70;
          return (
            <g key={org.id}>
              <line
                x1="150" y1="100" x2={x} y2={y}
                stroke="rgba(52,211,153,0.25)"
                strokeWidth="1"
              />
              <motion.circle
                cx={x} cy={y} r="5"
                fill="#38bdf8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
              />
              <text x={x} y={y + 16} textAnchor="middle" className="fill-foreground-muted text-[8px]">
                {org.name.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </GlassPanel>
  );
}

export function BenchmarkPanel() {
  const avgRisk = Math.round(
    organizations.reduce((s, o) => s + o.riskScore, 0) / organizations.length,
  );

  return (
    <GlassPanel border="gradient" className="p-5">
      <p className="mb-3 text-sm font-medium">Network Benchmarks</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
          <p className="text-xs text-foreground-muted">Avg Risk Score</p>
          <p className="text-2xl font-semibold text-amber-400">{avgRisk}</p>
        </div>
        <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
          <p className="text-xs text-foreground-muted">Active Missions</p>
          <p className="text-2xl font-semibold text-emerald-400">
            {organizations.reduce((s, o) => s + o.activeMissions, 0)}
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
