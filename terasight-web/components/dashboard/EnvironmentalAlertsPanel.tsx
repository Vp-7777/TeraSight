"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { indianMapSites } from "@/lib/data/india-demo";

const criticalSites = indianMapSites
  .filter((s) => s.status === "Critical" || s.status === "High")
  .slice(0, 4);

export function EnvironmentalAlertsPanel() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[color:var(--color-border-1)] px-5 py-4">
        <ShieldAlert className="h-4 w-4 text-rose-400" />
        <p className="font-medium">Environmental Alerts</p>
        <Badge variant="danger" className="ml-auto px-2 py-0 text-[10px]">
          {criticalSites.length} active
        </Badge>
      </div>

      <div className="space-y-2 p-4">
        {criticalSites.map((site, index) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="flex items-start gap-3 rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3 transition hover:border-rose-500/20"
          >
            <div className="relative mt-0.5">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{site.label}</p>
              <p className="text-xs text-foreground-muted">
                {site.city} · {site.organization}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant={site.status === "Critical" ? "danger" : "warning"}>
                  {site.status}
                </Badge>
                <Badge variant="ai">ERI {site.risk}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
