"use client";

import { AnalysisWorkspace } from "./AnalysisWorkspace";
import { PremiumAnalysisWorkflow } from "./PremiumAnalysisWorkflow";

interface ImageAnalysisSectionProps {
  variant?: "landing" | "app";
}

export function ImageAnalysisSection({ variant = "landing" }: ImageAnalysisSectionProps) {
  if (variant === "app") {
    return <AnalysisWorkspace />;
  }
  return <PremiumAnalysisWorkflow />;
}
