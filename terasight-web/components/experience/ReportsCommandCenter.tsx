"use client";

import { motion } from "framer-motion";
import { FileDown, FileText, Share2, Sparkles } from "lucide-react";
import { useState } from "react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { ReportPreview } from "@/components/workspace/ReportPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { indianReportMock } from "@/lib/data/india-demo";
import { savedAnalyses } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const TEMPLATES = [
  { id: "municipal", label: "Municipal Compliance", org: "SMC / AMC" },
  { id: "namami", label: "Namami Gange Brief", org: "Government" },
  { id: "ngo", label: "NGO Impact Report", org: "Ocean Cleanup" },
  { id: "investor", label: "Investor Intelligence", org: "Stakeholders" },
];

export function ReportsCommandCenter() {
  const [selectedTemplate, setSelectedTemplate] = useState("municipal");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    window.setTimeout(() => setGenerating(false), 2200);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp} className="flex flex-wrap items-end justify-between gap-4">
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
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" onClick={handleGenerate} disabled={generating}>
            <Sparkles className="h-4 w-4" />
            {generating ? "Generating..." : "AI Generate"}
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-12">
        <motion.div variants={fadeInUp} className="space-y-4 xl:col-span-3">
          <GlassPanel className="p-4">
            <p className="mb-3 text-sm font-medium">Stakeholder Templates</p>
            <div className="space-y-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    selectedTemplate === t.id
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-transparent hover:bg-[color:var(--color-surface-1)]"
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
              {savedAnalyses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border border-[color:var(--color-border-1)] px-3 py-2 text-xs"
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

        <motion.div variants={fadeInUp} className="xl:col-span-9">
          <GlassPanel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-3">
              <div>
                <p className="text-sm font-medium">PDF Preview</p>
                <p className="text-xs text-foreground-muted">
                  {indianReportMock.analysisId} · {indianReportMock.generatedAt}
                </p>
              </div>
              <Badge variant="success">Ready</Badge>
            </div>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-4">
              {generating ? (
                <div className="flex h-96 flex-col items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full skeleton-shimmer" />
                  <p className="text-sm text-foreground-muted">PrithviQ AI composing report...</p>
                </div>
              ) : (
                <ReportPreview />
              )}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
