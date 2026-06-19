"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";

interface ChartDatum {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  subtitle?: string;
  data: ChartDatum[];
}

export function AnimatedDonutChart({ title, subtitle, data }: ChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let offset = 0;

  return (
    <GlassPanel className="p-6">
      <p className="font-medium">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p> : null}
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <svg viewBox="0 0 120 120" className="h-36 w-36">
          {data.map((item) => {
            const fraction = item.value / total;
            const dash = `${fraction * 283} 283`;
            const currentOffset = offset;
            offset += fraction * 283;
            return (
              <motion.circle
                key={item.label}
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke={item.color ?? "#10b981"}
                strokeWidth="14"
                strokeDasharray={dash}
                strokeDashoffset={-currentOffset}
                transform="rotate(-90 60 60)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            );
          })}
        </svg>
        <div className="space-y-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color ?? "#10b981" }}
              />
              <span>{item.label}</span>
              <span className="text-foreground-muted">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

export function AnimatedTrendChart({ title, subtitle, data }: ChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <GlassPanel className="p-6">
      <p className="font-medium">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p> : null}
      <div className="mt-6 flex h-48 items-end gap-3">
        {data.map((item, index) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400"
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / max) * 100}%` }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            />
            <span className="text-[11px] text-foreground-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function AnimatedBarChart({ title, subtitle, data }: ChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <GlassPanel className="p-6">
      <p className="font-medium">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p> : null}
      <div className="mt-6 space-y-4">
        {data.map((item, index) => (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="text-foreground-muted">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color ?? "#10b981" }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
