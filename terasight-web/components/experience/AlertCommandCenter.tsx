"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ChevronRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { indianMapSites } from "@/lib/data/india-demo";

const criticalSites = indianMapSites
  .filter((s) => s.status === "Critical" || s.status === "High")
  .sort((a, b) => b.risk - a.risk);

export function AlertCommandCenter() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPulseIndex((i) => (i + 1) % criticalSites.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <GlassPanel glow="blue" border="gradient" className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[color:var(--color-border-1)] px-5 py-4">
        <ShieldAlert className="h-4 w-4 text-rose-400" />
        <p className="font-medium">Alert Command Center</p>
        <Badge variant="danger" className="ml-auto animate-pulse px-2 py-0 text-[10px]">
          {criticalSites.length} active
        </Badge>
      </div>
      <div className="space-y-1 p-3">
        <AnimatePresence mode="popLayout">
          {criticalSites.map((site, index) => (
            <motion.div
              key={site.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: pulseIndex === index ? 1.01 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <Link
                href={`/map?site=${site.id}`}
                className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-rose-500/20 hover:bg-rose-500/5"
              >
                <div className="relative">
                  <AlertTriangle
                    className={`h-4 w-4 ${site.status === "Critical" ? "text-rose-400" : "text-amber-400"}`}
                  />
                  {pulseIndex === index ? (
                    <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-ping rounded-full bg-rose-400" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{site.city}</p>
                  <p className="text-xs text-foreground-muted">
                    ERI {site.risk} · {site.wasteKg} kg
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-foreground-muted opacity-0 transition group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
