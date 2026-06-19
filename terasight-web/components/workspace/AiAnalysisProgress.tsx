"use client";

import { motion } from "framer-motion";
import { Brain, Layers, ScanSearch, Sparkles, Upload } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { AnalysisStage } from "@/hooks/useImageAnalysis";
import { cn } from "@/lib/utils";

const stages: {
  key: AnalysisStage;
  label: string;
  icon: typeof Upload;
}[] = [
  { key: "uploading", label: "Uploading imagery", icon: Upload },
  { key: "scanning", label: "Scanning environment", icon: ScanSearch },
  { key: "classifying", label: "Classifying waste", icon: Layers },
  { key: "generating", label: "Generating intelligence", icon: Brain },
];

interface AiAnalysisProgressProps {
  progress: number;
  stage: AnalysisStage;
  compact?: boolean;
}

export function AiAnalysisProgress({ progress, stage, compact = false }: AiAnalysisProgressProps) {
  const activeIndex = stages.findIndex((item) => item.key === stage);

  return (
    <GlassPanel className={cn("overflow-hidden", compact ? "p-5" : "p-6")} glow="blue">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300"
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-foreground">PrithviQ AI Analysis</p>
          <p className="text-xs text-foreground-muted">Processing environmental intelligence</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex justify-between text-xs text-foreground-muted">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[color:var(--color-border-3)] to-transparent"
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {stages.map((item, index) => {
          const Icon = item.icon;
          const isActive = stage === item.key;
          const isComplete = activeIndex > index || stage === "complete";

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition",
                isActive
                  ? "border-sky-500/30 bg-sky-500/10"
                  : isComplete
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)]",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  isActive
                    ? "bg-sky-500/20 text-sky-300"
                    : isComplete
                      ? "bg-emerald-500/20 text-[color:var(--color-nav-active-text)]"
                      : "bg-[color:var(--color-surface-1)] text-foreground-muted",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                {isActive ? (
                  <motion.div
                    className="mt-1 h-1 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full w-1/2 rounded-full bg-sky-400"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
