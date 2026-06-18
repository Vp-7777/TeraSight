"use client";

import { motion } from "framer-motion";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { KpiCard } from "@/components/workspace/KpiCard";
import {
  AnimatedBarChart,
  AnimatedDonutChart,
  AnimatedTrendChart,
} from "@/components/ui/animated-chart";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  carbonRecoveryByRegion,
  confidenceAnalytics,
  detectionTrends,
  wasteDistribution,
} from "@/lib/data/intelligence-mock";
import { dashboardKpis } from "@/lib/data/workspace-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function AnalyticsDashboard() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp}>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold">Environmental Analytics</h1>
        <p className="mt-2 max-w-2xl text-foreground-muted">
          Deep intelligence across waste distribution, detection trends, carbon recovery, and
          regional environmental performance.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardKpis.slice(0, 3).map((metric, index) => (
          <KpiCard key={metric.id} metric={metric} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedDonutChart
          title="Waste Distribution"
          subtitle="By category across all monitored sites"
          data={wasteDistribution}
        />
        <AnimatedTrendChart
          title="Detection Trends"
          subtitle="Images analyzed per month"
          data={detectionTrends.map((d) => ({ label: d.month, value: d.value }))}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedBarChart
          title="Carbon Recovery by Region"
          subtitle="Estimated recovery potential (%)"
          data={carbonRecoveryByRegion.map((r) => ({
            label: r.region,
            value: r.value,
            color: "#10b981",
          }))}
        />
        <AnimatedBarChart
          title="Confidence Analytics"
          subtitle="Distribution of AI detection confidence"
          data={confidenceAnalytics.map((c) => ({
            label: c.range,
            value: c.value,
            color: "#38bdf8",
          }))}
        />
      </div>

      <motion.div variants={fadeInUp}>
        <GlassPanel className="p-6">
          <p className="font-medium">Regional Summary</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Aggregated environmental intelligence across operational regions
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {carbonRecoveryByRegion.map((region) => (
              <div
                key={region.region}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-4 transition hover:border-emerald-500/20"
              >
                <p className="text-sm font-medium">{region.region}</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-300">{region.value}%</p>
                <p className="mt-1 text-xs text-foreground-muted">carbon recovery</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
