import { indianReportMock } from "@/lib/data/india-demo";

export interface RecentAnalysis {
  id: string;
  site: string;
  risk: number;
  status: "Critical" | "High" | "Medium" | "Low";
  wasteKg: number;
  time: string;
  thumbnail?: string;
}

export interface AiInsight {
  id: string;
  title: string;
  body: string;
  type: "alert" | "recommendation" | "trend";
  priority: "high" | "medium" | "low";
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend: string;
  trendUp: boolean;
  icon: "risk" | "camera" | "sites" | "waste" | "carbon" | "cost";
}

export const dashboardKpis: KpiMetric[] = [
  {
    id: "eri",
    label: "Environmental Risk Index",
    value: 62,
    trend: "-8%",
    trendUp: false,
    icon: "risk",
  },
  {
    id: "images",
    label: "Images Analyzed",
    value: 1184,
    trend: "+14%",
    trendUp: true,
    icon: "camera",
  },
  {
    id: "sites",
    label: "Active Monitoring Sites",
    value: 87,
    trend: "+6",
    trendUp: true,
    icon: "sites",
  },
  {
    id: "waste",
    label: "Estimated Waste Detected",
    value: 18.6,
    suffix: "t",
    decimals: 1,
    trend: "+5%",
    trendUp: true,
    icon: "waste",
  },
  {
    id: "carbon",
    label: "Carbon Recovery Potential",
    value: 34,
    suffix: "%",
    trend: "+4%",
    trendUp: true,
    icon: "carbon",
  },
  {
    id: "cost",
    label: "Est. Cleanup Cost",
    value: 38,
    prefix: "₹",
    suffix: " L",
    trend: "-6%",
    trendUp: false,
    icon: "cost",
  },
];

export const recentAnalyses: RecentAnalysis[] = [
  {
    id: "demo-analysis-surat",
    site: "Surat River Monitoring",
    risk: 74,
    status: "High",
    wasteKg: 22.4,
    time: "12 min ago",
  },
  {
    id: "demo-analysis-yamuna",
    site: "Yamuna Plastic Detection",
    risk: 81,
    status: "Critical",
    wasteKg: 31.2,
    time: "47 min ago",
  },
  {
    id: "demo-analysis-sabarmati",
    site: "Sabarmati River Cleanup",
    risk: 58,
    status: "Medium",
    wasteKg: 15.8,
    time: "1 hr ago",
  },
  {
    id: "demo-analysis-vapi",
    site: "Vapi Industrial Zone Monitoring",
    risk: 77,
    status: "High",
    wasteKg: 26.5,
    time: "3 hrs ago",
  },
];

export const aiInsights: AiInsight[] = [
  {
    id: "1",
    title: "Critical plastic concentration — Yamuna",
    body: "Yamuna Plastic Detection shows dominant plastic waste (ERI 81). Namami Gange field deployment recommended within 72 hours.",
    type: "alert",
    priority: "high",
  },
  {
    id: "2",
    title: "Sabarmati interception opportunity",
    body: "Sabarmati River Cleanup corridor would benefit from booms and community collection within 48 hours.",
    type: "recommendation",
    priority: "medium",
  },
  {
    id: "3",
    title: "Gujarat monitoring trend positive",
    body: "Surat and Vapi sites show improved carbon recovery potential after SMC intervention cycles.",
    type: "trend",
    priority: "low",
  },
];

export const reportPreviewMock = {
  title: indianReportMock.title,
  organization: indianReportMock.organization,
  site: indianReportMock.site,
  city: indianReportMock.city,
  analysisId: indianReportMock.analysisId,
  generatedAt: indianReportMock.generatedAt,
  executiveSummary: indianReportMock.executiveSummary,
  summary: {
    estimatedWasteKg: indianReportMock.summary.estimatedWasteKg,
    environmentalRiskIndex: indianReportMock.summary.environmentalRiskIndex,
    carbonRecoveryScore: indianReportMock.summary.carbonRecoveryScore,
    cleanupPriority: indianReportMock.summary.cleanupPriority,
    estimatedCostInr: indianReportMock.summary.estimatedCostInr,
  },
  detections: indianReportMock.detections,
  recommendation: indianReportMock.recommendation,
};
