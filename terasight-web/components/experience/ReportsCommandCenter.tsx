"use client";

import { motion } from "framer-motion";
import { FileDown, FileText, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSession } from "@/lib/session/session-context";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const TEMPLATES = [
  { id: "municipal", label: "Municipal Compliance", org: "SMC / AMC" },
  { id: "namami", label: "Namami Gange Brief", org: "Government" },
  { id: "ngo", label: "NGO Impact Report", org: "Ocean Cleanup" },
  { id: "investor", label: "Investor Intelligence", org: "Stakeholders" },
];

const TEMPLATE_DATA: Record<string, any> = {
  municipal: {
    title: "Municipal Compliance Assessment",
    organization: "Surat Municipal Corporation",
    site: "Surat Tapi River Corridor",
    city: "Surat, Gujarat",
    analysisId: "TS-IN-SURAT-2026-0042",
    generatedAt: "26 Jun 2026, 2:32 pm IST",
    executiveSummary: "PrithviQ AI analysis indicates elevated plastic and industrial waste concentration along the Tapi River corridor. Immediate mechanical extraction and community recycling collection are recommended.",
    summary: {
      estimatedWasteKg: 24.8,
      environmentalRiskIndex: 76,
      carbonRecoveryScore: 31,
      cleanupPriority: "High",
      estimatedCostInr: 2850000,
    },
    detections: [
      { class: "Plastic", count: 18, confidence: 0.92 },
      { class: "Metal", count: 6, confidence: 0.88 },
      { class: "Organic", count: 4, confidence: 0.84 },
      { class: "Hazardous Waste", count: 2, confidence: 0.79 },
    ],
    recommendation: "Deploy mechanical interception booms near Pandesara outfall. Route extracted plastics to SMC recycling centre at Udhna.",
  },
  namami: {
    title: "Namami Gange Action Brief",
    organization: "Namami Gange Mission",
    site: "Yamuna River Plastic Hotspot",
    city: "Delhi / Noida Corridor",
    analysisId: "TS-IN-YAMUNA-2026-0089",
    generatedAt: "26 Jun 2026, 3:15 pm IST",
    executiveSummary: "Highest-density plastic accumulation zone detected near Okhla Barrage. Action required under Clean Ganga Protocol Section 4. Intervention recommended within 24 hours.",
    summary: {
      estimatedWasteKg: 34.6,
      environmentalRiskIndex: 84,
      carbonRecoveryScore: 19,
      cleanupPriority: "Critical",
      estimatedCostInr: 5200000,
    },
    detections: [
      { class: "Plastic", count: 22, confidence: 0.94 },
      { class: "Hazardous Waste", count: 4, confidence: 0.81 },
      { class: "Organic", count: 3, confidence: 0.76 },
    ],
    recommendation: "Critical: Deploy Namami Gange rapid response interception units at Okhla Barrage and Kalindi Kunj zone immediately.",
  },
  ngo: {
    title: "NGO Impact & Action Report",
    organization: "The Ocean Cleanup India",
    site: "Mumbai Mithi River Basin",
    city: "Mumbai, Maharashtra",
    analysisId: "TS-IN-MITHI-2026-0112",
    generatedAt: "26 Jun 2026, 1:04 pm IST",
    executiveSummary: "Mithi River Basin shows chronic plastic packaging accumulation. Post Phase-1 cleanup evaluation verifies a 68% ERI reduction over 6 months.",
    summary: {
      estimatedWasteKg: 21.5,
      environmentalRiskIndex: 71,
      carbonRecoveryScore: 34,
      cleanupPriority: "High",
      estimatedCostInr: 3400000,
    },
    detections: [
      { class: "Plastic", count: 12, confidence: 0.90 },
      { class: "Organic", count: 8, confidence: 0.78 },
      { class: "Metal", count: 2, confidence: 0.74 },
    ],
    recommendation: "Accelerate desilting and trash boom deployments at BKC outfalls. Partner with BMC coastal sweep units.",
  },
  investor: {
    title: "ESG Stakeholder & Carbon Report",
    organization: "IIT Bombay Analytics",
    site: "Sabarmati Riverfront Corridor",
    city: "Ahmedabad, Gujarat",
    analysisId: "TS-IN-SABAR-2026-0201",
    generatedAt: "26 Jun 2026, 4:50 pm IST",
    executiveSummary: "Sabarmati Phase 3 monitoring shows positive ESG alignment. Carbon recovery index at 42% shows strong materials restoration potential.",
    summary: {
      estimatedWasteKg: 15.8,
      environmentalRiskIndex: 58,
      carbonRecoveryScore: 42,
      cleanupPriority: "Medium",
      estimatedCostInr: 1650000,
    },
    detections: [
      { class: "Plastic", count: 8, confidence: 0.89 },
      { class: "Organic", count: 5, confidence: 0.82 },
      { class: "Metal", count: 2, confidence: 0.71 },
    ],
    recommendation: "Increase recycling sorting stations along the lower riverfront. Coordinate with AMC sanitation division.",
  },
};

export function ReportsCommandCenter() {
  const { savedAnalysesList } = useSession();
  const [selectedTemplate, setSelectedTemplate] = useState("municipal");
  const [generating, setGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    window.setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerate = () => {
    setGenerating(true);
    window.setTimeout(() => {
      setGenerating(false);
      showNotification("PrithviQ AI report refreshed successfully.");
    }, 1800);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleShare = () => {
    const reportData = TEMPLATE_DATA[selectedTemplate];
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/reports/${reportData.analysisId}`
      );
      showNotification("Report share link copied to clipboard!");
    } else {
      showNotification(`Report ID: ${reportData.analysisId}`);
    }
  };

  const activeReport = TEMPLATE_DATA[selectedTemplate];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="ai" className="mb-2">
              <Sparkles className="mr-1 h-3 w-3" />
              Intelligence Reports
            </Badge>
            <h1 className="text-3xl font-semibold">Reports & Export Center</h1>
            <p className="mt-2 max-w-2xl text-foreground-muted">
              Generate stakeholder-ready environmental intelligence assessments with PrithviQ AI.
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button variant="secondary" size="sm" onClick={handleExportPdf}>
              <FileDown className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" onClick={handleGenerate} disabled={generating}>
              <Sparkles className="h-4 w-4" />
              {generating ? "Generating..." : "AI Generate"}
            </Button>
          </div>
        </div>

        {notification ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400 print:hidden"
          >
            <CheckCircle2 className="h-4 w-4" />
            {notification}
          </motion.div>
        ) : null}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="space-y-4 xl:col-span-3 print:hidden">
          <GlassPanel className="p-4">
            <p className="mb-3 text-sm font-medium">Stakeholder Templates</p>
            <div className="space-y-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(t.id);
                    showNotification(`Switched to template: ${t.label}`);
                  }}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    selectedTemplate === t.id
                      ? "border-emerald-500/30 bg-emerald-500/10 text-foreground"
                      : "border-transparent text-foreground-muted hover:bg-[color:var(--color-surface-1)]"
                  }`}
                >
                  <p className="font-medium">{t.label}</p>
                  <p className="text-xs text-foreground-muted">{t.org}</p>
                </button>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4">
            <p className="mb-3 text-sm font-medium">Report Archive</p>
            <div className="space-y-2">
              {savedAnalysesList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border border-[color:var(--color-border-1)] px-3 py-2 text-xs text-foreground-muted"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.title}</p>
                    <p className="text-foreground-muted">{item.savedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={fadeInUp} className="xl:col-span-9 print:col-span-12">
          <GlassPanel className="overflow-hidden print:border-none print:shadow-none">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-3 print:hidden">
              <div>
                <p className="text-sm font-medium">PDF Preview</p>
                <p className="text-xs text-foreground-muted">
                  {activeReport.analysisId} · {activeReport.generatedAt}
                </p>
              </div>
              <Badge variant="success">Ready</Badge>
            </div>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-4 print:max-h-none print:overflow-visible print:p-0">
              {generating ? (
                <div className="flex h-96 flex-col items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full skeleton-shimmer" />
                  <p className="text-sm text-foreground-muted">PrithviQ AI composing report...</p>
                </div>
              ) : (
                <ReportPreview
                  customData={activeReport}
                  onExport={handleExportPdf}
                  onShare={handleShare}
                />
              )}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
