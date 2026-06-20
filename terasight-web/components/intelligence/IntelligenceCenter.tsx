"use client";

import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import {
  AnomalyDetection,
  PredictionEngine,
  RiskMatrix,
  StrategicRecommendations,
} from "@/components/experience/IntelligenceModules";
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { activityFeed, confidenceAnalytics } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function IntelligenceCenter() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-300" />
            <Badge variant="ai">PrithviQ AI Online</Badge>
          </div>
          <h1 className="text-3xl font-semibold">AI Intelligence Center</h1>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            Real-time environmental intelligence, model activity, and strategic AI recommendations.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="space-y-6 xl:col-span-4">
          <RiskMatrix />
          <PredictionEngine />
          <AnomalyDetection />
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-5 space-y-6">
          <AiInsightsWidget limit={6} />
          <StrategicRecommendations />
          <GlassPanel className="p-5">
            <p className="mb-3 text-sm font-medium">AI Confidence Analytics</p>
            <div className="space-y-2">
              {confidenceAnalytics.map((item, i) => (
                <div key={item.range}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{item.range}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-3">
          <GlassPanel className="overflow-hidden">
            <div className="border-b border-[color:var(--color-border-1)] px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[color:var(--color-nav-active-text)]" />
                <p className="font-medium">Live Activity</p>
              </div>
            </div>
            <div className="divide-y divide-[color:var(--color-border-1)]">
              {activityFeed.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-5 py-4"
                >
                  <p className="text-sm">
                    <span className="font-medium text-[color:var(--color-nav-active-text)]">{item.actor}</span>{" "}
                    <span className="text-foreground-muted">{item.action}</span>{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">{item.time}</p>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
