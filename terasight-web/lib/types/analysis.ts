export interface Detection {
  class: string;
  count: number;
  confidence: number;
}

export interface AnalysisSummary {
  estimated_waste_kg: number;
  environmental_risk_index: number;
  carbon_recovery_score: number;
  cleanup_priority: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis_id: string;
  summary: AnalysisSummary;
  detections: Detection[];
  recommendation: string;
}
