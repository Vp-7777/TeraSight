"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Download,
  Save,
  ScanSearch,
  Upload,
  ZoomIn,
} from "lucide-react";
import { useRef, useState } from "react";

import { AiAnalysisProgress } from "@/components/workspace/AiAnalysisProgress";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useImageAnalysis } from "@/hooks/useImageAnalysis";
import { cn, formatConfidence } from "@/lib/utils";

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

export function PremiumAnalysisWorkflow() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    selectedFile,
    previewUrl,
    resultPreviewUrl,
    analysisResult,
    isAnalyzing,
    progress,
    stage,
    errorMessage,
    overallConfidence,
    validateAndSelect,
    handleAnalyze,
    acceptedTypes,
  } = useImageAnalysis();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        className={cn(
          "grid gap-6",
          analysisResult || isAnalyzing ? "lg:grid-cols-[1fr_1.1fr]" : "grid-cols-1",
        )}
      >
        <GlassPanel className="overflow-hidden" glow={isAnalyzing ? "emerald" : "none"}>
          <div className="border-b border-[color:var(--color-border-1)] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-[color:var(--color-nav-active-text)]">
                <ScanSearch className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Image Upload</p>
                <p className="text-sm text-foreground-muted">
                  Drag, drop, or capture environmental imagery
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                validateAndSelect(e.dataTransfer.files[0]);
              }}
              className={cn(
                "relative flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition",
                isDragging
                  ? "border-emerald-400/60 bg-emerald-500/10"
                  : "border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] hover:border-emerald-500/30",
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(",")}
                className="hidden"
                onChange={(e) => validateAndSelect(e.target.files?.[0])}
              />
              <button
                type="button"
                className="absolute inset-0 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload image"
              />

              {previewUrl ? (
                <div className="relative w-full max-w-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="max-h-56 w-full rounded-xl object-contain"
                  />
                  {isAnalyzing ? (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                      <div className="scan-line absolute inset-x-0 h-24" />
                    </div>
                  ) : null}
                  <p className="mt-3 text-center text-sm text-foreground-muted">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/25">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-medium">Drop your image here</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    JPEG, PNG, or WebP up to 10 MB
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
                Camera
              </Button>
              <Button variant="ghost" size="sm" disabled>
                Batch Upload
                <Badge className="ml-1">Soon</Badge>
              </Button>
            </div>

            {errorMessage ? (
              <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {errorMessage}
              </div>
            ) : null}

            <Button
              className="w-full"
              size="lg"
              disabled={!selectedFile || isAnalyzing}
              onClick={() => selectedFile && handleAnalyze(selectedFile)}
            >
              {isAnalyzing ? "Analyzing with PrithviQ AI..." : "Analyze Image"}
            </Button>
          </div>
        </GlassPanel>

        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <AiAnalysisProgress progress={progress} stage={stage} />
            </motion.div>
          ) : analysisResult && resultPreviewUrl ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <GlassPanel className="overflow-hidden" glow="emerald">
                <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-6 py-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-accent">
                      Analysis Complete
                    </p>
                    <p className="mt-1 font-semibold">Environmental Intelligence Report</p>
                  </div>
                  <Badge variant={priorityVariant(analysisResult.summary.cleanup_priority)}>
                    {analysisResult.summary.cleanup_priority}
                  </Badge>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-[140px_1fr]">
                  <div className="relative overflow-hidden rounded-xl border border-[color:var(--color-border-1)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resultPreviewUrl}
                      alt="Analyzed"
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm"
                      aria-label="Zoom preview"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Estimated Waste",
                        value: `${analysisResult.summary.estimated_waste_kg} kg`,
                      },
                      {
                        label: "Risk Index",
                        value: `${analysisResult.summary.environmental_risk_index}/100`,
                      },
                      {
                        label: "Carbon Recovery",
                        value: `${analysisResult.summary.carbon_recovery_score}/100`,
                      },
                      { label: "Confidence", value: formatConfidence(overallConfidence) },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4"
                      >
                        <p className="text-xs text-foreground-muted">{metric.label}</p>
                        <p className="mt-1 text-xl font-semibold">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>

              <ReportPreview result={analysisResult} compact />

              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4" />
                  Save Analysis
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden lg:block"
            >
              <GlassPanel className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                  <ScanSearch className="h-7 w-7" />
                </div>
                <p className="text-lg font-medium">AI results will appear here</p>
                <p className="mt-2 max-w-sm text-sm text-foreground-muted">
                  Upload an environmental image to receive detections, risk scoring, and cleanup
                  recommendations powered by PrithviQ AI.
                </p>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
