"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Leaf,
  Radio,
  Sparkles,
  Target,
  TrendingUp,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { formatInr, type MapSite } from "@/lib/data/india-demo";
import { cn } from "@/lib/utils";

interface MapIntelligenceDrawerProps {
  site: MapSite | null;
  open: boolean;
  onClose: () => void;
}

function MiniTrendChart({ data }: { data: MapSite["wasteTrend"] }) {
  const maxRisk = Math.max(...data.map((d) => d.risk), 1);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.risk / maxRisk) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 40" className="h-16 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${points} 100,40`} fill="url(#trend-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function statusVariant(status: MapSite["status"]) {
  switch (status) {
    case "Critical":
      return "danger" as const;
    case "High":
      return "warning" as const;
    case "Medium":
      return "success" as const;
    default:
      return "ai" as const;
  }
}

function missionStatusVariant(status: MapSite["mission"]["status"]) {
  switch (status) {
    case "Active":
      return "ai" as const;
    case "Complete":
      return "success" as const;
    case "Scheduled":
      return "warning" as const;
    default:
      return "default" as const;
  }
}

export function MapIntelligenceDrawer({ site, open, onClose }: MapIntelligenceDrawerProps) {
  return (
    <AnimatePresence>
      {open && site ? (
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="pointer-events-auto absolute bottom-4 right-4 top-4 z-30 flex w-[min(100%,400px)] flex-col md:right-6 md:top-6 md:bottom-6"
        >
          <GlassPanel glow="emerald" border="gradient" className="flex h-full flex-col overflow-hidden">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[color:var(--color-border-1)] px-5 py-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-emerald-400">Site Intelligence</p>
                <h2 className="mt-1 truncate text-lg font-semibold">{site.label}</h2>
                <p className="text-xs text-foreground-muted">
                  {site.city} · {site.region}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-foreground-muted transition hover:bg-[color:var(--color-surface-2)] hover:text-foreground"
                aria-label="Close intelligence drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant={statusVariant(site.status)}>{site.status} Risk</Badge>
                <Badge variant="ai">ERI {site.risk}</Badge>
                <Badge variant="default">{site.organization}</Badge>
              </div>

              <p className="text-sm leading-relaxed text-foreground-muted">{site.description}</p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: AlertTriangle, label: "Risk Index", value: site.risk, suffix: "/100" },
                  { icon: Trash2, label: "Waste Detected", value: site.wasteKg, suffix: " kg" },
                  { icon: Leaf, label: "Carbon Recovery", value: site.carbonRecoveryPct, suffix: "%" },
                  { icon: Target, label: "Cleanup Cost", value: formatInr(site.cleanupCostInr), suffix: "" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3"
                  >
                    <div className="flex items-center gap-1.5 text-foreground-muted">
                      <metric.icon className="h-3 w-3" />
                      <span className="text-[10px] uppercase tracking-wide">{metric.label}</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                      {metric.value}
                      {metric.suffix}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-foreground-muted">
                <Clock className="h-3.5 w-3.5" />
                Last scan: {site.lastScanAt}
              </div>

              <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium">Risk Trend</p>
                  </div>
                  <span className="text-xs text-rose-400">+{site.wasteTrend.at(-1)!.risk - site.wasteTrend[0].risk} pts YTD</span>
                </div>
                <MiniTrendChart data={site.wasteTrend} />
                <div className="mt-1 flex justify-between text-[10px] text-foreground-muted">
                  <span>{site.wasteTrend[0].month}</span>
                  <span>{site.wasteTrend.at(-1)!.month}</span>
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-400" />
                  <p className="text-sm font-medium">PrithviQ AI Recommendations</p>
                </div>
                <ul className="space-y-2">
                  {site.aiRecommendations.map((rec, i) => (
                    <motion.li
                      key={rec}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 24 }}
                      className="flex gap-2 text-xs leading-relaxed text-foreground-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                      {rec}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4">
                <p className="mb-3 text-sm font-medium">Before / After Imagery</p>
                <div className="grid grid-cols-2 gap-2">
                  {site.beforeAfter.map((snapshot) => (
                    <div key={snapshot.label} className="overflow-hidden rounded-lg">
                      <div
                        className={cn(
                          "relative flex h-20 flex-col justify-end p-2",
                          snapshot.tone === "before"
                            ? "bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950"
                            : "bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950",
                        )}
                      >
                        <div className="absolute inset-0 opacity-30">
                          <div className="grid-bg h-full w-full" />
                        </div>
                        <Badge
                          variant={snapshot.tone === "before" ? "danger" : "success"}
                          className="relative w-fit px-1.5 py-0 text-[9px]"
                        >
                          {snapshot.tone === "before" ? "Before" : "After"}
                        </Badge>
                        <p className="relative mt-1 text-[10px] font-medium">{snapshot.period}</p>
                        <p className="relative text-[10px] text-foreground-muted">
                          {snapshot.wasteKg} kg · {snapshot.coveragePct}% coverage
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium">Cleanup Mission</p>
                  </div>
                  <Badge variant={missionStatusVariant(site.mission.status)}>
                    {site.mission.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{site.mission.name}</p>
                <p className="mt-0.5 text-xs text-foreground-muted">{site.mission.team}</p>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-foreground-muted">Progress</span>
                    <span className="font-medium tabular-nums">{site.mission.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${site.mission.progress}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-foreground-muted">Waste Removed</p>
                    <p className="font-medium tabular-nums">{site.mission.wasteRemovedKg.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Due Date</p>
                    <p className="font-medium">{site.mission.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export function MapLiveEventStream({
  events,
  onEventSelect,
  className,
}: {
  events: Array<{
    id: string;
    type: string;
    siteId: string;
    siteLabel: string;
    message: string;
    timestamp: string;
    severity: "critical" | "warning" | "success" | "info";
  }>;
  onEventSelect?: (siteId: string) => void;
  className?: string;
}) {
  const iconFor = (type: string, severity: string) => {
    if (type === "mission" || severity === "success") return CheckCircle2;
    if (severity === "critical") return AlertTriangle;
    return Radio;
  };

  const colorFor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-rose-400";
      case "warning":
        return "text-amber-400";
      case "success":
        return "text-emerald-400";
      default:
        return "text-sky-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.15 }}
      className={cn("pointer-events-auto", className)}
    >
      <GlassPanel glow="blue" border="gradient" className="w-[min(100vw-2rem,340px)] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[color:var(--color-border-1)] px-4 py-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="text-xs font-medium uppercase tracking-wider">Live Event Stream</p>
        </div>
        <div className="max-h-52 space-y-1 overflow-y-auto p-2">
          <AnimatePresence initial={false}>
            {events.slice(0, 6).map((event, index) => {
              const Icon = iconFor(event.type, event.severity);
              return (
                <motion.button
                  key={event.id}
                  type="button"
                  onClick={() => onEventSelect?.(event.siteId)}
                  initial={{ opacity: 0, x: -12, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28, delay: index * 0.02 }}
                  className="w-full rounded-lg border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-3 py-2.5 text-left transition hover:border-emerald-500/25 hover:bg-[color:var(--color-surface-2)]"
                >
                  <div className="flex gap-2">
                    <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", colorFor(event.severity))} />
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium">{event.siteLabel}</p>
                      <p className="text-[11px] leading-relaxed text-foreground-muted">{event.message}</p>
                      <p className="mt-0.5 text-[10px] text-foreground-muted/70">{event.timestamp}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
