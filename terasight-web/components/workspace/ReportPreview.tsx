"use client";

import { motion } from "framer-motion";
import { Download, FileText, Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { formatLakh } from "@/lib/format/india";
import type { AnalysisResult } from "@/lib/types/analysis";
import { reportPreviewMock } from "@/lib/data/workspace-mock";
import { formatConfidence } from "@/lib/utils";

interface ReportPreviewProps {
  result?: AnalysisResult | null;
  compact?: boolean;
}

function priorityVariant(priority: string) {
  switch (priority.toLowerCase()) {
    case "critical":
      return "danger" as const;
    case "high":
      return "warning" as const;
    case "medium":
      return "ai" as const;
    default:
      return "success" as const;
  }
}

export function ReportPreview({ result, compact = false }: ReportPreviewProps) {
  const data = result
    ? {
        title: "Environmental Intelligence Assessment",
        organization: "Uploaded Analysis",
        site: "Field Image Analysis",
        city: "India",
        analysisId: result.analysis_id,
        generatedAt: new Date().toLocaleString("en-IN"),
        executiveSummary: result.recommendation,
        summary: {
          estimatedWasteKg: result.summary.estimated_waste_kg,
          environmentalRiskIndex: result.summary.environmental_risk_index,
          carbonRecoveryScore: result.summary.carbon_recovery_score,
          cleanupPriority: result.summary.cleanup_priority,
          estimatedCostInr: undefined as number | undefined,
        },
        detections: result.detections,
        recommendation: result.recommendation,
      }
    : reportPreviewMock;

  return (
    <GlassPanel className="overflow-hidden" glow={result ? "emerald" : "none"}>
      {/* Organization branding header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-emerald-500/8 via-transparent to-sky-500/8">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-bold text-emerald-300">
              {data.organization.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
                {data.organization}
              </p>
              <p className="text-sm font-semibold">{data.site}</p>
            </div>
          </div>
          <Badge variant={priorityVariant(data.summary.cleanupPriority)}>
            {data.summary.cleanupPriority}
          </Badge>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-300">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-accent">Report Preview</p>
              <p className="mt-0.5 font-semibold text-foreground">{data.title}</p>
              <p className="text-xs text-foreground-muted">
                {data.city} · {data.generatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={compact ? "space-y-4 p-5" : "space-y-5 p-6"}>
        {/* Analysis image placeholder */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/5">
          <div className="aspect-[16/7] skeleton-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-foreground-muted backdrop-blur-sm">
              Satellite / field imagery · PrithviQ AI overlay
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Waste Summary", value: `${data.summary.estimatedWasteKg} kg` },
            {
              label: "Environmental Risk Index",
              value: `${data.summary.environmentalRiskIndex}/100`,
            },
            {
              label: "Carbon Recovery",
              value: `${data.summary.carbonRecoveryScore}/100`,
            },
            {
              label: "Est. Cleanup Cost",
              value:
                "estimatedCostInr" in data.summary && data.summary.estimatedCostInr
                  ? formatLakh(data.summary.estimatedCostInr)
                  : "—",
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
            >
              <p className="text-xs text-foreground-muted">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-sky-500/15 bg-sky-500/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-sky-300">
            AI Executive Summary
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">
            {"executiveSummary" in data && data.executiveSummary
              ? data.executiveSummary
              : data.recommendation}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-muted">
            Waste Classifications
          </p>
          <div className="space-y-2">
            {data.detections.map((detection, index) => (
              <div
                key={`${detection.class}-${index}`}
                className="flex items-center justify-between rounded-lg border border-white/8 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">{detection.class}</p>
                  <p className="text-xs text-foreground-muted">{detection.count} detected</p>
                </div>
                <span className="text-sm text-accent">
                  {formatConfidence(detection.confidence)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
            Cleanup Recommendation
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">{data.recommendation}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
            Share Report
          </Button>
        </div>

        <div className="border-t border-white/8 pt-3">
          <p className="font-mono text-[11px] text-foreground-muted">{data.analysisId}</p>
          <p className="mt-1 text-[10px] text-foreground-muted/70">
            Generated by PrithviQ AI · TeraSight Environmental Intelligence Platform
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
