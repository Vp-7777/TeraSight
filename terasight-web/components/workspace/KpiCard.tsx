"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  IndianRupee,
  Leaf,
  MapPin,
  Recycle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { KpiMetric } from "@/lib/data/workspace-mock";
import { fadeInUp } from "@/lib/motion";

const iconMap = {
  risk: AlertTriangle,
  camera: Camera,
  sites: MapPin,
  waste: Recycle,
  carbon: Leaf,
  cost: IndianRupee,
};

interface KpiCardProps {
  metric: KpiMetric;
  index?: number;
}

export function KpiCard({ metric, index = 0 }: KpiCardProps) {
  const Icon = iconMap[metric.icon];
  const prefix = metric.prefix ?? "";
  const suffix = metric.suffix ?? "";
  const decimals = metric.decimals ?? 0;

  const spark = Array.from({ length: 12 }, (_, i) => {
    const base = metric.trendUp ? 0.55 : 0.48;
    const wave = Math.sin(i / 2.4) * 0.12;
    const jitter = ((i * 17) % 7) / 120;
    const v = base + wave + jitter;
    return Math.max(0.08, Math.min(0.92, v));
  });

  return (
    <motion.div variants={fadeInUp} transition={{ delay: index * 0.05 }}>
      <GlassPanel border="gradient" className="hover-glow p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-foreground-muted">{metric.label}</p>
            <div className="mt-2 flex items-baseline gap-1">
              {prefix ? (
                <span className="text-lg font-semibold text-foreground/90">{prefix}</span>
              ) : null}
              <AnimatedCounter
                value={metric.value}
                decimals={decimals}
                suffix={suffix}
                className="text-3xl font-semibold tracking-tight"
              />
            </div>
            <p
              className={`mt-2 flex items-center gap-1 text-xs ${
                metric.trendUp ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {metric.trendUp ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {metric.trend}
            </p>

            <svg
              viewBox="0 0 120 28"
              className="mt-3 h-7 w-36 opacity-90"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`kpi-${metric.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(52,211,153,0.85)" />
                  <stop offset="70%" stopColor="rgba(56,189,248,0.55)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
              </defs>
              {spark.map((v, i) => {
                const x = (i / (spark.length - 1)) * 120;
                const y = 26 - v * 22;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === spark.length - 1 ? 2.2 : 1.6}
                    fill={`url(#kpi-${metric.id})`}
                    opacity={i === spark.length - 1 ? 1 : 0.72}
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-emerald-500/20 bg-emerald-500/10 text-[color:var(--color-nav-active-text)]">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
