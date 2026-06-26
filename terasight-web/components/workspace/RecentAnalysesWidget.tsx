"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

import { useMemo } from "react";
import { useSession } from "@/lib/session/session-context";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { recentAnalyses, type RecentAnalysis } from "@/lib/data/workspace-mock";

function statusVariant(status: RecentAnalysis["status"]) {
  switch (status) {
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

interface RecentAnalysesWidgetProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RecentAnalysesWidget({ limit = 4, showViewAll = true }: RecentAnalysesWidgetProps) {
  const { activeWorkspace } = useSession();

  const items = useMemo(() => {
    const matching = recentAnalyses.filter(item => 
      item.site.toLowerCase().includes(activeWorkspace.short.toLowerCase()) ||
      item.site.toLowerCase().includes(activeWorkspace.name.toLowerCase()) ||
      (activeWorkspace.id === "iitb" && (item.site.includes("Vapi") || item.site.includes("Sabarmati"))) ||
      (activeWorkspace.id === "smc" && (item.site.includes("Surat") || item.site.includes("Sabarmati") || item.site.includes("Vapi"))) ||
      (activeWorkspace.id === "namami" && (item.site.includes("Yamuna") || item.site.includes("Sabarmati")))
    );
    return matching.length > 0 ? matching.slice(0, limit) : recentAnalyses.slice(0, limit);
  }, [activeWorkspace, limit]);

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-4">
        <div>
          <p className="font-medium text-foreground">Recent Analyses</p>
          <p className="text-xs text-foreground-muted">Latest PrithviQ AI results</p>
        </div>
        {showViewAll ? (
          <Link
            href="/reports"
            className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        ) : null}
      </div>
      <div className="divide-y divide-[color:var(--color-border-1)]">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.02)" }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.15,
              ease: "easeOut"
            }}
            className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors duration-150"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/10 text-xs font-semibold text-emerald-200">
              {item.risk}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.site}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-foreground-muted">
                <Clock className="h-3 w-3" />
                {item.time} · {item.wasteKg} kg
              </p>
            </div>
            <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
