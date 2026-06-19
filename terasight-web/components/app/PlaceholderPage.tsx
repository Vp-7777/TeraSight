import { GlassPanel } from "@/components/ui/glass-panel";
import { PageHeader } from "@/components/layout/PageHeader";

interface PlaceholderPageProps {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: string;
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  badge,
}: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title} description={description} badge={badge} />
      <GlassPanel className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20" />
        <p className="text-lg font-medium text-foreground">Coming in a future milestone</p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-foreground-muted">
          This module is part of the TeraSight platform roadmap. The navigation shell and page
          structure are ready for backend integration.
        </p>
      </GlassPanel>
    </div>
  );
}
