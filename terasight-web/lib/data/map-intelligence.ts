import type { MapSite } from "@/lib/data/india-demo";

export type MapLayerId = "risk" | "plastic" | "cleanup" | "carbon";

export interface MapLayerConfig {
  id: MapLayerId;
  label: string;
  description: string;
  color: string;
}

export interface LiveMapEvent {
  id: string;
  type: "hotspot" | "mission" | "risk" | "scan";
  siteId: string;
  siteLabel: string;
  message: string;
  timestamp: string;
  severity: "critical" | "warning" | "success" | "info";
}

export const MAP_LAYERS: MapLayerConfig[] = [
  {
    id: "risk",
    label: "Risk Layer",
    description: "Environmental Risk Index heatmap",
    color: "#f43f5e",
  },
  {
    id: "plastic",
    label: "Plastic Layer",
    description: "Plastic waste concentration",
    color: "#38bdf8",
  },
  {
    id: "cleanup",
    label: "Cleanup Layer",
    description: "Active cleanup mission zones",
    color: "#10b981",
  },
  {
    id: "carbon",
    label: "Carbon Layer",
    description: "Carbon recovery potential",
    color: "#a78bfa",
  },
];

export const DEFAULT_ACTIVE_LAYERS: MapLayerId[] = ["risk", "plastic"];

export const INITIAL_LIVE_EVENTS: LiveMapEvent[] = [
  {
    id: "evt-1",
    type: "hotspot",
    siteId: "yamuna-river",
    siteLabel: "Yamuna River",
    message: "New waste hotspot detected near Okhla Barrage — 4.2 kg plastic cluster",
    timestamp: "Just now",
    severity: "critical",
  },
  {
    id: "evt-2",
    type: "mission",
    siteId: "sabarmati-river",
    siteLabel: "Sabarmati River",
    message: "Mission completed: Phase 2 embankment sweep — 680 kg removed",
    timestamp: "6 min ago",
    severity: "success",
  },
  {
    id: "evt-3",
    type: "risk",
    siteId: "delhi-ncr",
    siteLabel: "Delhi",
    message: "Risk score increased from 76 to 79 — foam layer expansion detected",
    timestamp: "14 min ago",
    severity: "warning",
  },
  {
    id: "evt-4",
    type: "scan",
    siteId: "surat-tapi",
    siteLabel: "Surat",
    message: "Drone scan completed — 24.8 kg waste classified across 3 zones",
    timestamp: "22 min ago",
    severity: "info",
  },
  {
    id: "evt-5",
    type: "hotspot",
    siteId: "mumbai-mithi",
    siteLabel: "Mumbai",
    message: "New waste hotspot detected at Bandra-Kurla Complex outfall",
    timestamp: "31 min ago",
    severity: "warning",
  },
  {
    id: "evt-6",
    type: "mission",
    siteId: "rajkot-aji",
    siteLabel: "Rajkot",
    message: "Mission completed: Textile waste interception — 420 kg recovered",
    timestamp: "48 min ago",
    severity: "success",
  },
];

const EVENT_TEMPLATES: Omit<LiveMapEvent, "id" | "timestamp">[] = [
  {
    type: "hotspot",
    siteId: "yamuna-river",
    siteLabel: "Yamuna River",
    message: "New waste hotspot detected — microplastic density spike",
    severity: "critical",
  },
  {
    type: "risk",
    siteId: "surat-tapi",
    siteLabel: "Surat",
    message: "Risk score increased — industrial runoff detected upstream",
    severity: "warning",
  },
  {
    type: "mission",
    siteId: "mumbai-mithi",
    siteLabel: "Mumbai",
    message: "Mission completed — embankment cleanup phase finished",
    severity: "success",
  },
  {
    type: "scan",
    siteId: "ahmedabad-urban",
    siteLabel: "Ahmedabad",
    message: "Satellite pass completed — 12 new detection polygons mapped",
    severity: "info",
  },
  {
    type: "hotspot",
    siteId: "delhi-ncr",
    siteLabel: "Delhi",
    message: "New waste hotspot detected near Wazirabad stretch",
    severity: "warning",
  },
];

let eventCounter = 100;

export function generateLiveEvent(): LiveMapEvent {
  const template = EVENT_TEMPLATES[eventCounter % EVENT_TEMPLATES.length];
  eventCounter += 1;
  return {
    ...template,
    id: `evt-${eventCounter}`,
    timestamp: "Just now",
  };
}

export function layerWeight(site: MapSite, layer: MapLayerId): number {
  switch (layer) {
    case "risk":
      return site.risk / 100;
    case "plastic":
      return Math.min(site.plasticKg / 35, 1);
    case "cleanup":
      return site.mission.progress / 100;
    case "carbon":
      return site.carbonRecoveryPct / 100;
    default:
      return 0.5;
  }
}

export function combinedLayerWeight(site: MapSite, activeLayers: MapLayerId[]): number {
  if (activeLayers.length === 0) return 0;
  const total = activeLayers.reduce((sum, layer) => sum + layerWeight(site, layer), 0);
  return total / activeLayers.length;
}

export function primaryHeatmapLayer(activeLayers: MapLayerId[]): MapLayerId {
  if (activeLayers.includes("risk")) return "risk";
  return activeLayers[0] ?? "risk";
}

export function sitesToGeoJSON(sites: MapSite[], activeLayers: MapLayerId[]) {
  const heatLayer = primaryHeatmapLayer(activeLayers);
  return {
    type: "FeatureCollection" as const,
    features: sites.map((site) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [site.lng, site.lat],
      },
      properties: {
        id: site.id,
        weight: activeLayers.length > 1
          ? combinedLayerWeight(site, activeLayers)
          : layerWeight(site, heatLayer),
        risk: site.risk,
        plastic: site.plasticKg,
        carbon: site.carbonRecoveryPct,
        cleanup: site.mission.progress,
      },
    })),
  };
}

export function toggleLayer(activeLayers: MapLayerId[], layer: MapLayerId): MapLayerId[] {
  if (activeLayers.includes(layer)) {
    const next = activeLayers.filter((l) => l !== layer);
    return next.length === 0 ? [layer] : next;
  }
  return [...activeLayers, layer];
}
