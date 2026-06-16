"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { analyzeImage } from "@/lib/api/analyze";
import type { AnalysisResult } from "@/lib/types/analysis";

export type AnalysisStage =
  | "uploading"
  | "scanning"
  | "classifying"
  | "generating"
  | "complete";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function useImageAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultPreviewUrl, setResultPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<AnalysisStage>("uploading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const previewUrlRef = useRef<string | null>(null);
  const resultPreviewUrlRef = useRef<string | null>(null);

  const acceptedTypes = useMemo(
    () => ["image/jpeg", "image/png", "image/webp"],
    [],
  );

  const overallConfidence = useMemo(() => {
    const detections = analysisResult?.detections ?? [];
    if (detections.length === 0) return 0;
    const total = detections.reduce((acc, d) => acc + d.confidence, 0);
    return total / detections.length;
  }, [analysisResult]);

  const setNewPreviewUrl = useCallback((file: File) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
  }, []);

  const validateAndSelect = useCallback(
    (file?: File) => {
      setErrorMessage(null);
      setAnalysisResult(null);
      setResultPreviewUrl(null);

      if (!file) {
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      if (!acceptedTypes.includes(file.type)) {
        setErrorMessage("Unsupported file type. Please upload a JPEG, PNG, or WebP image.");
        return;
      }

      if (file.size > MAX_FILE_BYTES) {
        setErrorMessage("File too large. Please upload an image up to 10 MB.");
        return;
      }

      setSelectedFile(file);
      setNewPreviewUrl(file);
    },
    [acceptedTypes, setNewPreviewUrl],
  );

  const handleAnalyze = useCallback(async (file: File) => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setProgress(0);
    setStage("uploading");
    setAnalysisResult(null);
    setResultPreviewUrl(null);

    // Lightweight staged progress so the UI feels responsive.
    const milestones: Array<{ stage: AnalysisStage; target: number; ms: number }> = [
      { stage: "uploading", target: 18, ms: 450 },
      { stage: "scanning", target: 45, ms: 650 },
      { stage: "classifying", target: 72, ms: 750 },
      { stage: "generating", target: 92, ms: 650 },
    ];

    let cancelled = false;
    const bumpTo = async (next: (typeof milestones)[number]) => {
      setStage(next.stage);
      const start = performance.now();
      const from = progress;

      return new Promise<void>((resolve) => {
        const tick = () => {
          if (cancelled) return resolve();
          const t = Math.min(1, (performance.now() - start) / next.ms);
          const value = Math.round(from + (next.target - from) * t);
          setProgress(value);
          if (t >= 1) return resolve();
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    try {
      for (const m of milestones) {
        // eslint-disable-next-line no-await-in-loop
        await bumpTo(m);
      }

      const result = await analyzeImage(file);
      if (cancelled) return;

      setAnalysisResult(result);

      // For now we show the uploaded image as the result preview.
      // (Later this can be replaced with an annotated result image from the API.)
      if (resultPreviewUrlRef.current) URL.revokeObjectURL(resultPreviewUrlRef.current);
      const resUrl = URL.createObjectURL(file);
      resultPreviewUrlRef.current = resUrl;
      setResultPreviewUrl(resUrl);

      setProgress(100);
      setStage("complete");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed. Please try again.";
      setErrorMessage(message);
      setProgress(0);
      setStage("uploading");
    } finally {
      setIsAnalyzing(false);
    }

    return () => {
      cancelled = true;
    };
  }, [progress]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      if (resultPreviewUrlRef.current) URL.revokeObjectURL(resultPreviewUrlRef.current);
    };
  }, []);

  return {
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
  };
}
