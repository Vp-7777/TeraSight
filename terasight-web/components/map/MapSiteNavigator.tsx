"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";
import { formatInr, riskColor, type MapSite } from "@/lib/data/india-demo";
import { cn } from "@/lib/utils";

interface MapSiteNavigatorProps {
  sites: MapSite[];
  selectedId: string;
  onSelect: (site: MapSite) => void;
  className?: string;
}

export function MapSiteNavigator({
  sites,
  selectedId,
  onSelect,
  className,
}: MapSiteNavigatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
      className={cn("pointer-events-auto", className)}
    >
      <GlassPanel glow="emerald" border="gradient" className="px-3 py-2.5">
        <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
          Monitoring Sites
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sites.map((site) => {
            const active = site.id === selectedId;
            const color = riskColor(site.status);
            return (
              <button
                key={site.id}
                type="button"
                onClick={() => onSelect(site)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                  active
                    ? "border-emerald-500/40 bg-emerald-500/12 text-foreground"
                    : "border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] text-foreground-muted hover:border-[color:var(--color-border-2)] hover:text-foreground",
                )}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: color, boxShadow: active ? `0 0 6px ${color}` : undefined }}
                />
                {site.city}
              </button>
            );
          })}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

interface MapSiteMetricsCardProps {
  site: MapSite;
  className?: string;
}

export function MapSiteMetricsCard({ site, className }: MapSiteMetricsCardProps) {
  return (
    <motion.div
      key={site.id}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn("pointer-events-auto", className)}
    >
      <GlassPanel glow="blue" border="gradient" className="px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-sky-400">Selected Site Telemetry</p>
        <p className="mt-0.5 text-sm font-semibold">{site.city}</p>
        <p className="text-[11px] text-foreground-muted">{site.label}</p>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <p className="text-foreground-muted">Environmental Risk Index</p>
            <p className="font-semibold tabular-nums text-rose-400">{site.risk}/100</p>
          </div>
          <div>
            <p className="text-foreground-muted">Waste Detected</p>
            <p className="font-semibold tabular-nums">{site.wasteKg} kg</p>
          </div>
          <div>
            <p className="text-foreground-muted">Carbon Recovery</p>
            <p className="font-semibold tabular-nums text-emerald-400">{site.carbonRecoveryPct}%</p>
          </div>
          <div>
            <p className="text-foreground-muted">Cleanup Cost</p>
            <p className="font-semibold tabular-nums">{formatInr(site.cleanupCostInr)}</p>
          </div>
        </div>
        <p className="mt-2 border-t border-[color:var(--color-border-1)] pt-2 text-[10px] text-foreground-muted">
          Last scan: {site.lastScanAt}
        </p>
      </GlassPanel>
    </motion.div>
  );
}
