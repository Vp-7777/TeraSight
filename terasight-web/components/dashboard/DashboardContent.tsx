"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { EnvironmentalAlertsPanel } from "@/components/dashboard/EnvironmentalAlertsPanel";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { KpiCard } from "@/components/workspace/KpiCard";
import { QuickActionsPanel } from "@/components/workspace/QuickActionsPanel";
import { RecentAnalysesWidget } from "@/components/workspace/RecentAnalysesWidget";
import { RecentProjectsWidget } from "@/components/workspace/RecentProjectsWidget";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { SavedAnalysesWidget } from "@/components/workspace/SavedAnalysesWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { dashboardKpis } from "@/lib/data/workspace-mock";
import { formatIndianDate } from "@/lib/format/india";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function DashboardContent() {
  const [kpis, setKpis] = useState(dashboardKpis);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRefreshing(true);
      setKpis((prev) =>
        prev.map((kpi) => {
          if (kpi.id === "images") {
            return { ...kpi, value: kpi.value + Math.floor(Math.random() * 3) };
          }
          if (kpi.id === "eri") {
            const delta = Math.random() > 0.5 ? 1 : -1;
            return { ...kpi, value: Math.max(40, Math.min(85, kpi.value + delta)) };
          }
          return kpi;
        }),
      );
      window.setTimeout(() => setRefreshing(false), 600);
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="ai">
              <Sparkles className="mr-1 h-3 w-3" />
              <span className="relative mr-1.5 flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              PrithviQ AI Active
            </Badge>
            <Badge variant="gold">Surat Municipal Corporation</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            India Environmental Command Center
          </h1>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            Real-time intelligence across rivers, coastlines, and industrial corridors. Monitoring
            Surat, Ahmedabad, Delhi NCR, Mumbai, and the Ganga basin.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/globe">
            <Button variant="outline" size="sm">
              <Globe2 className="h-4 w-4" />
              Global Globe
            </Button>
          </Link>
          <Link href="/map">
            <Button variant="secondary" size="sm">
              Open Map Explorer
            </Button>
          </Link>
          <p className="text-sm text-foreground-muted">{formatIndianDate(new Date())}</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${refreshing ? "opacity-90" : ""}`}
      >
        {kpis.map((metric, index) => (
          <KpiCard key={metric.id} metric={metric} index={index} />
        ))}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="xl:col-span-8">
          <GlassPanel className="overflow-hidden p-1">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-4">
              <div>
                <p className="font-medium">India Monitoring Overview</p>
                <p className="text-xs text-foreground-muted">
                  Interactive OpenStreetMap · 87 active sites
                </p>
              </div>
              <Link href="/map" className="text-xs text-accent hover:underline">
                Full explorer →
              </Link>
            </div>
            <div className="flex h-[320px] flex-col items-center justify-center gap-4 rounded-b-2xl bg-gradient-to-br from-emerald-500/10 via-background to-sky-500/10 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-[color:var(--color-nav-active-text)]">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <p className="font-medium">87 active monitoring sites across India</p>
                <p className="mt-1 text-sm text-foreground-muted">
                  Open the full map explorer for interactive layers, heatmaps, and site details.
                </p>
              </div>
              <Link href="/map">
                <Button variant="secondary" size="sm">
                  Open Map Explorer
                </Button>
              </Link>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-4 space-y-4">
          <QuickActionsPanel />
          <EnvironmentalAlertsPanel />
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <RecentAnalysesWidget />
        </motion.div>
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <RecentProjectsWidget />
        </motion.div>
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <SavedAnalysesWidget />
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <LiveActivityFeed />
        </motion.div>
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <AiInsightsWidget />
        </motion.div>
        <motion.div variants={fadeInUp} className="xl:col-span-4">
          <ReportPreview compact />
        </motion.div>
      </div>
    </motion.div>
  );
}
