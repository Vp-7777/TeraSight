import { ImageAnalysisSection } from "@/components/image-analysis/ImageAnalysisSection";
import { ModuleShell } from "@/components/workspace/ModuleShell";

export default function AnalyzePage() {
  return (
    <ModuleShell
      eyebrow="PrithviQ AI"
      title="Analyze Image"
      description="Upload environmental imagery in the AI workspace. Run detection, risk scoring, and intelligence generation in a single flow."
      badge="Live"
    >
      <ImageAnalysisSection variant="app" />
    </ModuleShell>
  );
}
