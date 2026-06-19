import { ModuleShell } from "@/components/workspace/ModuleShell";
import { MapExplorer } from "@/components/workspace/MapExplorer";

export default function MapPage() {
  return (
    <ModuleShell
      eyebrow="Geospatial Intelligence"
      title="Map Explorer"
      description="Explore monitored environmental sites across India with layered waste, risk, and detection intelligence."
    >
      <MapExplorer />
    </ModuleShell>
  );
}
