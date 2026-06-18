import { ReportPreview } from "@/components/workspace/ReportPreview";
import { ModuleShell } from "@/components/workspace/ModuleShell";
import { RecentAnalysesWidget } from "@/components/workspace/RecentAnalysesWidget";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function ReportsPage() {
  return (
    <ModuleShell
      eyebrow="Intelligence"
      title="Reports"
      description="Generate, preview, and export environmental intelligence assessments for stakeholders and compliance."
    >
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ReportPreview />
        </div>
        <div className="xl:col-span-4 space-y-6">
          <RecentAnalysesWidget limit={3} showViewAll={false} />
          <GlassPanel className="p-5">
            <p className="text-sm font-medium">Report Library</p>
            <p className="mt-2 text-sm text-foreground-muted">
              Full report generation, export templates, and historical archives will connect to
              the backend in a future milestone.
            </p>
          </GlassPanel>
        </div>
      </div>
    </ModuleShell>
  );
}
