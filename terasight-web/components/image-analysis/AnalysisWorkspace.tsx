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
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useImageAnalysis } from "@/hooks/useImageAnalysis";
import { formatConfidence } from "@/lib/utils";
import { cn } from "@/lib/utils";

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

export function AnalysisWorkspace() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    selectedFile,
    previewUrl,
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
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
      {/* Left — Upload & controls */}
      <GlassPanel className="flex flex-col overflow-hidden">
        <div className="border-b border-white/10 px-4 py-4">
          <p className="text-sm font-semibold">Upload</p>
          <p className="text-xs text-foreground-muted">Source imagery</p>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
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
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition",
              isDragging
                ? "border-emerald-400/60 bg-emerald-500/10"
                : "border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.03]",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(",")}
              className="hidden"
              onChange={(e) => validateAndSelect(e.target.files?.[0])}
            />
            <Upload className="mb-2 h-5 w-5 text-emerald-300" />
            <p className="text-sm font-medium">Drop image</p>
            <p className="mt-1 text-xs text-foreground-muted">or click to browse</p>
          </div>

          {selectedFile ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="truncate text-sm font-medium">{selectedFile.name}</p>
              <p className="mt-1 text-xs text-foreground-muted">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
              Camera
            </Button>
            <Button variant="ghost" size="sm" disabled>
              Batch
            </Button>
          </div>

          <Button
            className="mt-auto w-full"
            disabled={!selectedFile || isAnalyzing}
            onClick={() => selectedFile && handleAnalyze(selectedFile)}
          >
            {isAnalyzing ? "Analyzing..." : "Run Analysis"}
          </Button>

          {errorMessage ? (
            <p className="text-xs text-rose-400">{errorMessage}</p>
          ) : null}
        </div>
      </GlassPanel>

      {/* Center — Preview & scan */}
      <GlassPanel
        className="relative min-h-[520px] overflow-hidden"
        glow={isAnalyzing ? "emerald" : analysisResult ? "blue" : "none"}
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-background/40 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ScanSearch className="h-4 w-4 text-accent" />
            <p className="text-sm font-medium">Analysis Canvas</p>
          </div>
          {analysisResult ? (
            <Badge variant={priorityVariant(analysisResult.summary.cleanup_priority)}>
              {analysisResult.summary.cleanup_priority}
            </Badge>
          ) : null}
        </div>

        <div className="flex h-full min-h-[520px] items-center justify-center p-6 pt-16">
          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Analysis preview"
                  className="w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
                />
                {isAnalyzing ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="scan-line absolute inset-x-0 h-32" />
                    <div className="absolute inset-0 bg-emerald-500/5" />
                  </div>
                ) : null}
                {!isAnalyzing && analysisResult ? (
                  <button
                    type="button"
                    className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm"
                    aria-label="Zoom"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/10">
                  <ScanSearch className="h-7 w-7 text-emerald-300" />
                </div>
                <p className="text-lg font-medium">AI Analysis Workspace</p>
                <p className="mt-2 max-w-sm text-sm text-foreground-muted">
                  Upload environmental imagery to begin PrithviQ AI detection and intelligence
                  generation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassPanel>

      {/* Right — Progress / Results / Insights */}
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <AiAnalysisProgress progress={progress} stage={stage} compact />
            </motion.div>
          ) : analysisResult ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <GlassPanel className="p-4">
                <p className="text-xs uppercase tracking-wider text-foreground-muted">
                  Summary
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    { label: "Waste", value: `${analysisResult.summary.estimated_waste_kg} kg` },
                    {
                      label: "ERI",
                      value: `${analysisResult.summary.environmental_risk_index}`,
                    },
                    {
                      label: "Carbon",
                      value: `${analysisResult.summary.carbon_recovery_score}%`,
                    },
                    { label: "Confidence", value: formatConfidence(overallConfidence) },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg bg-white/[0.03] p-3">
                      <p className="text-xs text-foreground-muted">{m.label}</p>
                      <p className="mt-1 text-lg font-semibold">{m.value}</p>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel className="p-4">
                <p className="mb-3 text-sm font-medium">Detections</p>
                <div className="space-y-2">
                  {analysisResult.detections.map((d) => (
                    <div key={d.class} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>{d.class}</span>
                        <span className="text-accent">{formatConfidence(d.confidence)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${d.confidence * 100}%` }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <ReportPreview result={analysisResult} compact />

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AiInsightsWidget limit={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
