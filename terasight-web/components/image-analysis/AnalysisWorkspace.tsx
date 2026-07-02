/**
 * AnalysisWorkspace.tsx
 *
 * Primary user console interface for executing waste image analysis.
 * This panel orchestrates dragging files, camera uploads, triggering the AI model pipeline,
 * and displaying telemetry results along with interactive ESG cleanup simulations.
 *
 * Purpose & Logic Author: Vishal
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Download,
  Save,
  ScanSearch,
  Upload,
  ZoomIn,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import {
  JarvisAnalysisPipeline,
  STREAMING_INSIGHTS,
} from "@/components/experience/JarvisAnalysisPipeline";
import { AiInsightsWidget } from "@/components/workspace/AiInsightsWidget";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useImageAnalysis } from "@/hooks/useImageAnalysis";
import { useSession } from "@/lib/session/session-context";
import { formatConfidence } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { computeWasteMetrics } from "@/lib/utils/waste";

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
  // [Vishal] Refs and states for file selection and drag-drop interactions
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
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

  const { saveAnalysis } = useSession();
  const [zoomOpen, setZoomOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [streamingInsight, setStreamingInsight] = useState("");
  const [insightIndex, setInsightIndex] = useState(0);
  const [cleanupSimPercent, setCleanupSimPercent] = useState(0);

  // Reset simulator whenever a new analysis is loaded or starts
  useEffect(() => {
    setCleanupSimPercent(0);
  }, [analysisResult]);

  // [Vishal] Memoized hook translating the AI detections list into density-weighted waste metrics
  const wasteMetrics = useMemo(() => {
    if (!analysisResult) return null;
    return computeWasteMetrics(analysisResult.detections, analysisResult.summary.estimated_waste_kg);
  }, [analysisResult]);

  // [Vishal] Simulator calculations: computes remaining waste and environmental risk index (ERI) dynamically
  const simulatedRemainingWaste = useMemo(() => {
    if (!analysisResult || !wasteMetrics) return 0;
    const cleanFraction = (cleanupSimPercent / 100) * (wasteMetrics.recyclabilityRatio / 100);
    return Math.max(0, parseFloat((analysisResult.summary.estimated_waste_kg * (1 - cleanFraction)).toFixed(1)));
  }, [analysisResult, wasteMetrics, cleanupSimPercent]);

  const simulatedEri = useMemo(() => {
    if (!analysisResult || !wasteMetrics) return 0;
    const cleanFraction = (cleanupSimPercent / 100) * (wasteMetrics.recyclabilityRatio / 100);
    return Math.max(5, Math.round(analysisResult.summary.environmental_risk_index * (1 - cleanFraction * 0.8)));
  }, [analysisResult, wasteMetrics, cleanupSimPercent]);

  const simulatedValueInr = useMemo(() => {
    if (!wasteMetrics) return 0;
    return Math.round(Math.max(0, wasteMetrics.estimatedValueInr) * (cleanupSimPercent / 100));
  }, [wasteMetrics, cleanupSimPercent]);

  const simulatedCarbonSaved = useMemo(() => {
    if (!wasteMetrics) return 0;
    return parseFloat((wasteMetrics.carbonSavedKg * (cleanupSimPercent / 100)).toFixed(1));
  }, [wasteMetrics, cleanupSimPercent]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    if (!isAnalyzing) {
      setStreamingInsight("");
      setInsightIndex(0);
      return;
    }
    const interval = window.setInterval(() => {
      setInsightIndex((i) => {
        const next = (i + 1) % STREAMING_INSIGHTS.length;
        setStreamingInsight(STREAMING_INSIGHTS[next]);
        return next;
      });
    }, 1400);
    setStreamingInsight(STREAMING_INSIGHTS[0]);
    return () => window.clearInterval(interval);
  }, [isAnalyzing]);

  const handleSaveReport = () => {
    if (!analysisResult) return;
    const title = selectedFile ? selectedFile.name : "Field Image Analysis";
    const site = "Field Analysis Workspace";
    const risk = analysisResult.summary.environmental_risk_index;
    const tags = analysisResult.detections.map((d) => d.class);

    saveAnalysis(title, site, risk, tags);
    triggerToast("Analysis report saved successfully to Archive.");
  };

  const handleExport = () => {
    triggerToast("Downloading analysis JSON payload...");
  };

  const jarvisStage =
    stage === "uploading"
      ? "ingest"
      : stage === "scanning"
        ? "detect"
        : stage === "classifying"
          ? "classify"
          : "score";

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
      {/* Left — Upload & controls */}
      <GlassPanel className="flex flex-col overflow-hidden">
        <div className="border-b border-[color:var(--color-border-1)] px-4 py-4">
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
                : "border-[color:var(--color-border-1)] hover:border-emerald-500/30 hover:bg-[color:var(--color-surface-1)]",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(",")}
              className="hidden"
              onChange={(e) => validateAndSelect(e.target.files?.[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => validateAndSelect(e.target.files?.[0])}
            />
            <Upload className="mb-2 h-5 w-5 text-[color:var(--color-nav-active-text)]" />
            <p className="text-sm font-medium text-foreground">Drop image</p>
            <p className="mt-1 text-xs text-foreground-muted">or click to browse</p>
          </div>

          {selectedFile ? (
            <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3">
              <p className="truncate text-sm font-medium text-foreground">{selectedFile.name}</p>
              <p className="mt-1 text-xs text-foreground-muted">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => cameraInputRef.current?.click()}
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
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-[color:var(--color-border-1)] bg-background/40 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ScanSearch className="h-4 w-4 text-accent" />
            <p className="text-sm font-medium text-foreground">Analysis Canvas</p>
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
                className="relative w-full max-w-2xl group cursor-zoom-in"
                onClick={() => !isAnalyzing && setZoomOpen(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Analysis preview"
                  className="w-full rounded-2xl border border-[color:var(--color-border-1)] object-contain shadow-2xl transition group-hover:opacity-95"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomOpen(true);
                    }}
                    className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition"
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
                  <ScanSearch className="h-7 w-7 text-[color:var(--color-nav-active-text)]" />
                </div>
                <p className="text-lg font-medium text-foreground">AI Analysis Workspace</p>
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
              <JarvisAnalysisPipeline
                active={isAnalyzing}
                currentStage={jarvisStage}
                progress={progress}
                streamingInsight={streamingInsight}
              />
            </motion.div>
          ) : analysisResult ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <GlassPanel className="p-4" glow={cleanupSimPercent > 0 ? "emerald" : "none"}>
                <p className="text-xs uppercase tracking-wider text-foreground-muted">
                  Summary {cleanupSimPercent > 0 && <span className="text-emerald-400 font-medium ml-1.5">(Simulated)</span>}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Waste",
                      value: cleanupSimPercent > 0
                        ? `${simulatedRemainingWaste} kg`
                        : `${analysisResult.summary.estimated_waste_kg} kg`,
                      isSimulated: cleanupSimPercent > 0,
                    },
                    {
                      label: "ERI",
                      value: cleanupSimPercent > 0
                        ? `${simulatedEri}`
                        : `${analysisResult.summary.environmental_risk_index}`,
                      isSimulated: cleanupSimPercent > 0,
                    },
                    {
                      label: "Carbon",
                      value: cleanupSimPercent > 0
                        ? `${Math.min(99, Math.round(analysisResult.summary.carbon_recovery_score + (99 - analysisResult.summary.carbon_recovery_score) * (cleanupSimPercent / 100)))}%`
                        : `${analysisResult.summary.carbon_recovery_score}%`,
                      isSimulated: cleanupSimPercent > 0,
                    },
                    { label: "Confidence", value: formatConfidence(overallConfidence) },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className={cn(
                        "rounded-lg bg-[color:var(--color-surface-1)] p-3 transition-all duration-300",
                        m.isSimulated && "border border-emerald-500/30 bg-emerald-500/5 shadow-md shadow-emerald-500/5"
                      )}
                    >
                      <p className="text-xs text-foreground-muted">{m.label}</p>
                      <p
                        className={cn(
                          "mt-1 text-lg font-semibold text-foreground",
                          m.isSimulated && "text-emerald-400"
                        )}
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              {/* Recyclability & Material ROI Card */}
              {wasteMetrics && (
                <GlassPanel className="p-4 space-y-4" glow="blue">
                  <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] pb-2">
                    <p className="text-xs uppercase tracking-wider text-accent font-semibold">
                      Recyclability & ROI Analysis
                    </p>
                    <Badge variant="success">
                      {wasteMetrics.recyclabilityRatio}% Recyclable
                    </Badge>
                  </div>
                  
                  {/* Dual-segment progress track */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-foreground-muted">
                      <span>Recyclable ({wasteMetrics.recyclableWeightKg} kg)</span>
                      <span>Non-Recyclable ({wasteMetrics.nonRecyclableWeightKg} kg)</span>
                    </div>
                    <div className="h-3 flex overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                        style={{ width: `${wasteMetrics.recyclabilityRatio}%` }}
                        title={`Recyclable: ${wasteMetrics.recyclabilityRatio}%`}
                      />
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-300"
                        style={{ width: `${100 - wasteMetrics.recyclabilityRatio}%` }}
                        title={`Non-Recyclable: ${100 - wasteMetrics.recyclabilityRatio}%`}
                      />
                    </div>
                  </div>

                  {/* Financial & ESG ROI Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-lg bg-[color:var(--color-surface-1)] p-2.5">
                      <p className="text-[10px] text-foreground-muted uppercase">Est. Material Value</p>
                      <p className={cn(
                        "mt-1 text-base font-semibold",
                        wasteMetrics.estimatedValueInr >= 0 ? "text-emerald-400" : "text-rose-400"
                      )}>
                        {wasteMetrics.estimatedValueInr >= 0 ? "₹" : "-₹"}{Math.abs(wasteMetrics.estimatedValueInr)}
                      </p>
                      <p className="text-[9px] text-foreground-muted">Net recovery value</p>
                    </div>
                    <div className="rounded-lg bg-[color:var(--color-surface-1)] p-2.5">
                      <p className="text-[10px] text-foreground-muted uppercase">CO2 Offset Potential</p>
                      <p className="mt-1 text-base font-semibold text-teal-400">
                        {wasteMetrics.carbonSavedKg} kg
                      </p>
                      <p className="text-[9px] text-foreground-muted">Avoided emissions</p>
                    </div>
                  </div>
                </GlassPanel>
              )}

              <GlassPanel className="p-4">
                <p className="mb-3 text-sm font-medium text-foreground">Detections</p>
                <div className="space-y-2">
                  {analysisResult.detections.map((d) => {
                    const norm = d.class.toLowerCase();
                    const isRecyclable = norm === "plastic" || norm === "metal" || norm === "glass";
                    return (
                      <div key={d.class} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-muted flex items-center gap-1.5">
                            {d.class}
                            <Badge className="text-[9px] px-1 py-0" variant={isRecyclable ? "success" : "danger"}>
                              {isRecyclable ? "Recyclable" : "Non-Recyclable"}
                            </Badge>
                          </span>
                          <span className="text-accent">{formatConfidence(d.confidence)}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              isRecyclable 
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                : "bg-gradient-to-r from-rose-500 to-orange-400"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${d.confidence * 100}%` }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>

              {/* Cleanup Sandbox Simulator */}
              {wasteMetrics && (
                <GlassPanel className="p-4 space-y-3" glow="emerald">
                  <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] pb-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                        Cleanup Sandbox Simulator
                      </p>
                    </div>
                    <Badge variant="ai" className="text-[10px] py-0.5">Interactive</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-muted">Simulate Cleanup Extraction</span>
                      <span className="font-bold text-accent">{cleanupSimPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={cleanupSimPercent}
                      onChange={(e) => setCleanupSimPercent(Number(e.target.value))}
                      className="w-full h-1 bg-[color:var(--color-surface-2)] rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>

                  {cleanupSimPercent > 0 && (
                    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 space-y-2 text-xs">
                      <p className="font-medium text-emerald-400">Simulated Impact Results:</p>
                      <div className="grid grid-cols-2 gap-2 text-foreground-muted">
                        <div>
                          <span>Remaining Waste: </span>
                          <span className="font-semibold text-foreground">{simulatedRemainingWaste} kg</span>
                        </div>
                        <div>
                          <span>Target ERI Score: </span>
                          <span className="font-semibold text-foreground">{simulatedEri}/100</span>
                        </div>
                        <div>
                          <span>Value Extracted: </span>
                          <span className="font-semibold text-emerald-400">₹{simulatedValueInr}</span>
                        </div>
                        <div>
                          <span>Emissions Saved: </span>
                          <span className="font-semibold text-teal-400">{simulatedCarbonSaved} kg</span>
                        </div>
                      </div>
                    </div>
                  )}
                </GlassPanel>
              )}

              {toastMsg ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {toastMsg}
                </motion.div>
              ) : null}

              <ReportPreview result={analysisResult} compact />

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleSaveReport}>
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

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {zoomOpen && previewUrl ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => setZoomOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Zoomed analysis preview"
                className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-white/10 object-contain shadow-2xl"
              />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
