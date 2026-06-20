"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Brain, CheckCircle2, Loader2, ScanSearch, Sparkles } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: "ingest", label: "Ingesting imagery", icon: ScanSearch },
  { id: "detect", label: "Running PrithviQ detection", icon: Brain },
  { id: "classify", label: "Classifying waste types", icon: Sparkles },
  { id: "score", label: "Computing risk & carbon scores", icon: CheckCircle2 },
];

interface JarvisAnalysisPipelineProps {
  active: boolean;
  currentStage: string;
  progress: number;
  streamingInsight?: string;
}

export function JarvisAnalysisPipeline({
  active,
  currentStage,
  progress,
  streamingInsight,
}: JarvisAnalysisPipelineProps) {
  const stageIndex = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <GlassPanel glow="emerald" border="gradient" className="overflow-hidden">
      <div className="border-b border-[color:var(--color-border-1)] bg-gradient-to-r from-emerald-500/10 to-sky-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            {active ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            ) : null}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-sm font-medium">PrithviQ Analysis Pipeline</p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.id === currentStage;
          const isComplete = stageIndex > index;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition",
                isActive
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : isComplete
                    ? "border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] opacity-70"
                    : "border-transparent opacity-40",
              )}
            >
              {isActive && active ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-emerald-400" />
              ) : isComplete ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <Icon className="h-4 w-4 shrink-0 text-foreground-muted" />
              )}
              <span className="text-sm">{stage.label}</span>
            </motion.div>
          );
        })}

        <div className="mt-2">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-foreground-muted">Confidence</span>
            <span className="font-medium tabular-nums text-emerald-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-sky-400"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {streamingInsight ? (
            <motion.div
              key={streamingInsight}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-sky-500/20 bg-sky-500/5 px-3 py-2.5 text-xs leading-relaxed text-foreground-muted"
            >
              <span className="text-sky-400">PrithviQ → </span>
              {streamingInsight}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}

export const STREAMING_INSIGHTS = [
  "Scanning image tiles for waste signatures...",
  "Plastic cluster detected in upper-left quadrant.",
  "Industrial debris confidence: 88%.",
  "Computing Environmental Risk Index...",
  "Carbon recovery potential estimated at 31%.",
  "Generating executive summary...",
];
