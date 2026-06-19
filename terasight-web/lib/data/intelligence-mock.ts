import { indianMapSites, type MapSite } from "@/lib/data/india-demo";

export type { MapSite };

export interface Mission {
  id: string;
  name: string;
  site: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Active" | "Scheduled" | "Complete" | "Paused";
  progress: number;
  wasteRemovedKg: number;
  carbonImpact: number;
  team: string;
  dueDate: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  region: string;
  sites: number;
  analyses: number;
  activeMissions: number;
  riskScore: number;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface SavedAnalysis {
  id: string;
  title: string;
  site: string;
  risk: number;
  tags: string[];
  savedAt: string;
}

export interface RecentProject {
  id: string;
  name: string;
  organization: string;
  status: "Active" | "Planning";
  sites: number;
  updatedAt: string;
}

export const mapSites: MapSite[] = indianMapSites;

export const activityFeed: ActivityItem[] = [
  {
    id: "1",
    actor: "PrithviQ AI",
    action: "completed analysis",
    target: "Surat River Monitoring",
    time: "12 min ago",
  },
  {
    id: "2",
    actor: "SMC Field Unit",
    action: "flagged high-risk detection",
    target: "Yamuna Plastic Detection",
    time: "47 min ago",
  },
  {
    id: "3",
    actor: "Namami Gange Corps",
    action: "updated mission progress",
    target: "Sabarmati River Cleanup",
    time: "1 hr ago",
  },
  {
    id: "4",
    actor: "IIT Bombay Analytics",
    action: "generated environmental report",
    target: "Mithi River Restoration",
    time: "3 hrs ago",
  },
];

export const wasteDistribution = [
  { label: "Plastic", value: 42, color: "#38bdf8" },
  { label: "Organic", value: 28, color: "#10b981" },
  { label: "Industrial", value: 18, color: "#f59e0b" },
  { label: "Mixed", value: 12, color: "#a78bfa" },
];

export const detectionTrends = [
  { month: "Jan", value: 820 },
  { month: "Feb", value: 940 },
  { month: "Mar", value: 1010 },
  { month: "Apr", value: 1184 },
  { month: "May", value: 1260 },
  { month: "Jun", value: 1345 },
];

export const carbonRecoveryByRegion = [
  { region: "Gujarat", value: 41 },
  { region: "Maharashtra", value: 36 },
  { region: "NCR", value: 29 },
  { region: "Uttar Pradesh", value: 33 },
];

export const confidenceAnalytics = [
  { range: "90-100%", value: 34 },
  { range: "80-89%", value: 28 },
  { range: "70-79%", value: 22 },
  { range: "<70%", value: 16 },
];

export const globeMetrics = [
  { id: "sites", label: "Active Sites", value: "87", change: "+6 this week", positive: true },
  { id: "eri", label: "Avg Risk Index", value: "62", change: "-8% vs last month", positive: true },
  { id: "waste", label: "Waste Detected", value: "18.6t", change: "+5% monitored", positive: false },
  { id: "carbon", label: "Carbon Recovery", value: "34%", change: "+4% potential", positive: true },
];

export const aiTimeline = [
  {
    id: "1",
    type: "detection" as const,
    time: "2 min ago",
    title: "Plastic cluster detected",
    description: "Yamuna corridor analysis flagged critical plastic concentration.",
  },
  {
    id: "2",
    type: "alert" as const,
    time: "18 min ago",
    title: "ERI threshold exceeded",
    description: "Surat River Monitoring crossed high-risk environmental index.",
  },
  {
    id: "3",
    type: "mission" as const,
    time: "1 hr ago",
    title: "Mission progress updated",
    description: "Sabarmati cleanup mission advanced to 68% completion.",
  },
  {
    id: "4",
    type: "model" as const,
    time: "3 hrs ago",
    title: "PrithviQ v0.2 deployed",
    description: "Mock analyzer pipeline refreshed for waste classification.",
  },
];

export const aiModels = [
  {
    id: "waste-detector",
    name: "Waste Detector",
    version: "0.2.1",
    status: "active",
    accuracy: 91,
    latencyMs: 420,
  },
  {
    id: "risk-scorer",
    name: "Environmental Risk Scorer",
    version: "0.1.8",
    status: "active",
    accuracy: 88,
    latencyMs: 180,
  },
  {
    id: "carbon-estimator",
    name: "Carbon Recovery Estimator",
    version: "0.1.2",
    status: "standby",
    accuracy: 84,
    latencyMs: 260,
  },
];

export const savedAnalyses: SavedAnalysis[] = [
  {
    id: "saved-1",
    title: "Yamuna Plastic Hotspot",
    site: "Yamuna Plastic Detection",
    risk: 81,
    tags: ["Plastic", "Critical", "River"],
    savedAt: "2 days ago",
  },
  {
    id: "saved-2",
    title: "Surat River Baseline",
    site: "Surat River Monitoring",
    risk: 74,
    tags: ["River", "High Risk"],
    savedAt: "4 days ago",
  },
  {
    id: "saved-3",
    title: "Sabarmati Cleanup Review",
    site: "Sabarmati River Cleanup",
    risk: 58,
    tags: ["Cleanup", "Medium"],
    savedAt: "1 week ago",
  },
];

export const organizations: Organization[] = [
  {
    id: "smc",
    name: "Surat Municipal Corporation",
    type: "Municipal Government",
    region: "Gujarat",
    sites: 24,
    analyses: 412,
    activeMissions: 3,
    riskScore: 62,
  },
  {
    id: "namami",
    name: "Namami Gange Mission",
    type: "National Program",
    region: "Multi-state",
    sites: 31,
    analyses: 528,
    activeMissions: 5,
    riskScore: 71,
  },
  {
    id: "ocean-cleanup",
    name: "The Ocean Cleanup India",
    type: "NGO",
    region: "Maharashtra",
    sites: 12,
    analyses: 186,
    activeMissions: 2,
    riskScore: 48,
  },
];

export const missions: Mission[] = [
  {
    id: "mission-1",
    name: "Yamuna Plastic Interception",
    site: "Yamuna Plastic Detection",
    priority: "Critical",
    status: "Active",
    progress: 42,
    wasteRemovedKg: 840,
    carbonImpact: 18,
    team: "12 field ops",
    dueDate: "Jun 28, 2026",
  },
  {
    id: "mission-2",
    name: "Sabarmati River Cleanup",
    site: "Sabarmati River Cleanup",
    priority: "High",
    status: "Active",
    progress: 68,
    wasteRemovedKg: 1260,
    carbonImpact: 31,
    team: "18 field ops",
    dueDate: "Jul 12, 2026",
  },
  {
    id: "mission-3",
    name: "Surat Monitoring Cycle",
    site: "Surat River Monitoring",
    priority: "Medium",
    status: "Scheduled",
    progress: 12,
    wasteRemovedKg: 120,
    carbonImpact: 8,
    team: "6 analysts",
    dueDate: "Jul 30, 2026",
  },
  {
    id: "mission-4",
    name: "Marine Drive Coastal Sweep",
    site: "Marine Drive Coastal Waste Analysis",
    priority: "Low",
    status: "Complete",
    progress: 100,
    wasteRemovedKg: 520,
    carbonImpact: 22,
    team: "9 field ops",
    dueDate: "May 30, 2026",
  },
];

export const recentProjects: RecentProject[] = [
  {
    id: "proj-1",
    name: "Ganga Basin Monitoring",
    organization: "Namami Gange Mission",
    status: "Active",
    sites: 14,
    updatedAt: "2 hrs ago",
  },
  {
    id: "proj-2",
    name: "Surat River Intelligence",
    organization: "Surat Municipal Corporation",
    status: "Active",
    sites: 9,
    updatedAt: "Yesterday",
  },
  {
    id: "proj-3",
    name: "Coastal Waste Pilot",
    organization: "The Ocean Cleanup India",
    status: "Planning",
    sites: 4,
    updatedAt: "3 days ago",
  },
  {
    id: "proj-4",
    name: "Vapi Industrial Corridor",
    organization: "Gujarat PCB",
    status: "Active",
    sites: 6,
    updatedAt: "5 days ago",
  },
];
