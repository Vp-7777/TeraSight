"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "@/lib/session/session-context";

import { AlertCommandCenter } from "@/components/experience/AlertCommandCenter";
import { EnvironmentalRadarChart } from "@/components/experience/EnvironmentalRadarChart";
import { LiveEnvironmentalTicker } from "@/components/experience/LiveEnvironmentalTicker";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { KpiCard } from "@/components/workspace/KpiCard";
import { QuickActionsPanel } from "@/components/workspace/QuickActionsPanel";
import { RecentAnalysesWidget } from "@/components/workspace/RecentAnalysesWidget";
import { RecentProjectsWidget } from "@/components/workspace/RecentProjectsWidget";

const MapExplorer = dynamic(
  () => import("@/components/workspace/MapExplorer").then((m) => m.MapExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[color:var(--color-surface-2)] animate-pulse rounded-lg">
        <p className="text-sm text-foreground-muted">Loading Hotspot Map Explorer...</p>
      </div>
    ),
  }
);
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { SavedAnalysesWidget } from "@/components/workspace/SavedAnalysesWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { dashboardKpis } from "@/lib/data/workspace-mock";
import { formatIndianDate } from "@/lib/format/india";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function DashboardContent() {
  const { activeWorkspace } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const currentKpis = useMemo(() => {
    switch (activeWorkspace.id) {
      case "namami":
        return [
          { id: "eri", label: "Environmental Risk Index", value: 71, trend: "-5%", trendUp: false, icon: "risk" as const },
          { id: "images", label: "Images Analyzed", value: 3420, trend: "+22%", trendUp: true, icon: "camera" as const },
          { id: "sites", label: "Active Monitoring Sites", value: 28, trend: "+9", trendUp: true, icon: "sites" as const },
          { id: "waste", label: "Estimated Waste Detected", value: 34.6, suffix: "t", decimals: 1, trend: "+8%", trendUp: true, icon: "waste" as const },
          { id: "carbon", label: "Carbon Recovery Potential", value: 19, suffix: "%", trend: "-2%", trendUp: false, icon: "carbon" as const },
          { id: "cost", label: "Est. Cleanup Cost", value: 52, prefix: "₹", suffix: " L", trend: "+12%", trendUp: true, icon: "cost" as const },
        ];
      case "iitb":
        return [
          { id: "eri", label: "Environmental Risk Index", value: 48, trend: "-12%", trendUp: false, icon: "risk" as const },
          { id: "images", label: "Images Analyzed", value: 850, trend: "+8%", trendUp: true, icon: "camera" as const },
          { id: "sites", label: "Active Monitoring Sites", value: 6, trend: "+1", trendUp: true, icon: "sites" as const },
          { id: "waste", label: "Estimated Waste Detected", value: 12.4, suffix: "t", decimals: 1, trend: "-4%", trendUp: false, icon: "waste" as const },
          { id: "carbon", label: "Carbon Recovery Potential", value: 45, suffix: "%", trend: "+10%", trendUp: true, icon: "carbon" as const },
          { id: "cost", label: "Est. Cleanup Cost", value: 9.8, prefix: "₹", suffix: " L", trend: "-15%", trendUp: false, icon: "cost" as const },
        ];
      default: // smc
        return dashboardKpis;
    }
  }, [activeWorkspace.id]);

  const [kpis, setKpis] = useState(currentKpis);

  useEffect(() => {
    setKpis(currentKpis);
  }, [currentKpis]);

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
    <div className="space-y-0">
      <LiveEnvironmentalTicker />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6 pt-6"
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
              <Badge variant="gold">{activeWorkspace.name}</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              India Environmental Command Center
            </h1>
            <p className="mt-2 max-w-2xl text-foreground-muted">
              Real-time intelligence across rivers, coastlines, and industrial corridors.
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
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="font-medium">India Hotspot Map</p>
                    <p className="text-xs text-foreground-muted">Live monitoring · 7 priority sites</p>
                  </div>
                </div>
                <Link href="/map" className="text-xs text-accent hover:underline">
                  Full explorer →
                </Link>
              </div>
              <div className="h-[320px]">
                <MapExplorer embedded />
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4 xl:col-span-4">
            <EnvironmentalRadarChart />
            <QuickActionsPanel />
            <AlertCommandCenter />
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
    </div>
  );
}
