/** Indian environmental intelligence demo data — structured for future API integration. */

export interface SiteTrendPoint {
  month: string;
  risk: number;
  wasteKg: number;
}

export interface BeforeAfterSnapshot {
  label: string;
  period: string;
  wasteKg: number;
  coveragePct: number;
  tone: "before" | "after";
}

export interface SiteMission {
  name: string;
  status: "Active" | "Scheduled" | "Complete" | "Paused";
  progress: number;
  team: string;
  dueDate: string;
  wasteRemovedKg: number;
}

export interface MapSite {
  id: string;
  label: string;
  city: string;
  region: string;
  organization: string;
  risk: number;
  wasteKg: number;
  plasticKg: number;
  carbonRecoveryPct: number;
  cleanupCostInr: number;
  lastScanAt: string;
  status: "Critical" | "High" | "Medium" | "Low";
  lat: number;
  lng: number;
  layers: string[];
  description: string;
  wasteTrend: SiteTrendPoint[];
  aiRecommendations: string[];
  beforeAfter: BeforeAfterSnapshot[];
  mission: SiteMission;
}

export const INDIA_MAP_CENTER = { lat: 22.5937, lng: 78.9629 };
export const INDIA_DEFAULT_ZOOM = 4.8;

export const indianMapSites: MapSite[] = [
  {
    id: "surat-tapi",
    label: "Surat Tapi River Corridor",
    city: "Surat",
    region: "Gujarat",
    organization: "Surat Municipal Corporation",
    risk: 76,
    wasteKg: 24.8,
    plasticKg: 14.2,
    carbonRecoveryPct: 31,
    cleanupCostInr: 2850000,
    lastScanAt: "20 Jun 2026, 09:14 IST",
    status: "High",
    lat: 21.1702,
    lng: 72.8311,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Industrial effluent and plastic accumulation along the Tapi River near Pandesara and Sachin GIDC. CPCB 2025 data ranks Surat among Gujarat's highest plastic-load river segments.",
    wasteTrend: [
      { month: "Jan", risk: 68, wasteKg: 18.2 },
      { month: "Feb", risk: 71, wasteKg: 19.6 },
      { month: "Mar", risk: 73, wasteKg: 21.1 },
      { month: "Apr", risk: 74, wasteKg: 22.4 },
      { month: "May", risk: 75, wasteKg: 23.6 },
      { month: "Jun", risk: 76, wasteKg: 24.8 },
    ],
    aiRecommendations: [
      "Deploy mechanical booms at Pandesara outfall within 48 hours.",
      "Schedule follow-up drone survey after SMC monsoon preparedness drill.",
      "Route extracted plastic to SMC recycling centre at Udhna.",
    ],
    beforeAfter: [
      { label: "Pre-cleanup baseline", period: "Mar 2026", wasteKg: 31.4, coveragePct: 78, tone: "before" },
      { label: "Post Phase-1 sweep", period: "Jun 2026", wasteKg: 24.8, coveragePct: 52, tone: "after" },
    ],
    mission: {
      name: "Tapi River Emergency Response",
      status: "Active",
      progress: 72,
      team: "SMC Field Unit Alpha",
      dueDate: "28 Jun 2026",
      wasteRemovedKg: 1840,
    },
  },
  {
    id: "ahmedabad-urban",
    label: "Ahmedabad Urban Waste Grid",
    city: "Ahmedabad",
    region: "Gujarat",
    organization: "Ahmedabad Municipal Corporation",
    risk: 61,
    wasteKg: 16.3,
    plasticKg: 9.1,
    carbonRecoveryPct: 38,
    cleanupCostInr: 1720000,
    lastScanAt: "20 Jun 2026, 08:42 IST",
    status: "Medium",
    lat: 23.0225,
    lng: 72.5714,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Mixed municipal solid waste across Sabarmati east bank wards and SG Highway drainage channels. AMC Swachh Ahmedabad drive reports 62% door-to-door segregation compliance.",
    wasteTrend: [
      { month: "Jan", risk: 55, wasteKg: 13.8 },
      { month: "Feb", risk: 57, wasteKg: 14.2 },
      { month: "Mar", risk: 58, wasteKg: 14.9 },
      { month: "Apr", risk: 59, wasteKg: 15.4 },
      { month: "May", risk: 60, wasteKg: 15.9 },
      { month: "Jun", risk: 61, wasteKg: 16.3 },
    ],
    aiRecommendations: [
      "Increase collection frequency in Navrangpura and Ellis Bridge wards.",
      "Install AI-enabled CCTV at SG Highway storm drains.",
      "Coordinate with Sabarmati River mission for downstream interception.",
    ],
    beforeAfter: [
      { label: "Baseline survey", period: "Feb 2026", wasteKg: 19.2, coveragePct: 64, tone: "before" },
      { label: "After AMC sweep", period: "Jun 2026", wasteKg: 16.3, coveragePct: 41, tone: "after" },
    ],
    mission: {
      name: "Ahmedabad Urban Cleanup Cycle",
      status: "Active",
      progress: 54,
      team: "AMC Sanitation Division",
      dueDate: "15 Jul 2026",
      wasteRemovedKg: 960,
    },
  },
  {
    id: "rajkot-aji",
    label: "Rajkot Aji River Monitoring",
    city: "Rajkot",
    region: "Gujarat",
    organization: "Rajkot Municipal Corporation",
    risk: 64,
    wasteKg: 18.7,
    plasticKg: 10.8,
    carbonRecoveryPct: 29,
    cleanupCostInr: 1980000,
    lastScanAt: "19 Jun 2026, 16:30 IST",
    status: "High",
    lat: 22.3039,
    lng: 70.8022,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Textile dye effluent and plastic waste along the Aji River near Raiya and Morbi Road industrial clusters. Gujarat PCB monitoring flagged elevated BOD levels in Q1 2026.",
    wasteTrend: [
      { month: "Jan", risk: 58, wasteKg: 15.2 },
      { month: "Feb", risk: 60, wasteKg: 16.1 },
      { month: "Mar", risk: 61, wasteKg: 16.8 },
      { month: "Apr", risk: 62, wasteKg: 17.4 },
      { month: "May", risk: 63, wasteKg: 18.1 },
      { month: "Jun", risk: 64, wasteKg: 18.7 },
    ],
    aiRecommendations: [
      "Inspect Morbi Road textile units for illegal discharge points.",
      "Deploy floating trash barriers at Aji Dam downstream channel.",
      "Engage local NGOs for community riverbank clean-up drives.",
    ],
    beforeAfter: [
      { label: "Jan 2026 baseline", period: "Jan 2026", wasteKg: 22.6, coveragePct: 71, tone: "before" },
      { label: "Jun 2026 reassessment", period: "Jun 2026", wasteKg: 18.7, coveragePct: 48, tone: "after" },
    ],
    mission: {
      name: "Aji River Textile Waste Interception",
      status: "Active",
      progress: 38,
      team: "RMC Environmental Cell",
      dueDate: "10 Jul 2026",
      wasteRemovedKg: 420,
    },
  },
  {
    id: "mumbai-mithi",
    label: "Mumbai Mithi River Basin",
    city: "Mumbai",
    region: "Maharashtra",
    organization: "Brihanmumbai Municipal Corporation",
    risk: 71,
    wasteKg: 21.5,
    plasticKg: 12.4,
    carbonRecoveryPct: 34,
    cleanupCostInr: 3400000,
    lastScanAt: "20 Jun 2026, 07:55 IST",
    status: "High",
    lat: 19.076,
    lng: 72.8777,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Chronic plastic and construction debris accumulation in the Mithi River affecting Bandra-Kurla Complex and Santacruz flood zones. BMC flood preparedness report 2026 cites Mithi as critical risk corridor.",
    wasteTrend: [
      { month: "Jan", risk: 65, wasteKg: 17.8 },
      { month: "Feb", risk: 67, wasteKg: 18.4 },
      { month: "Mar", risk: 68, wasteKg: 19.2 },
      { month: "Apr", risk: 69, wasteKg: 20.1 },
      { month: "May", risk: 70, wasteKg: 20.8 },
      { month: "Jun", risk: 71, wasteKg: 21.5 },
    ],
    aiRecommendations: [
      "Accelerate desilting at Bandra-Kurla Complex outfall before monsoon peak.",
      "Deploy real-time water level sensors at Mahim Creek junction.",
      "Coordinate with Maharashtra Pollution Control Board for industrial audit.",
    ],
    beforeAfter: [
      { label: "Pre-monsoon 2025", period: "May 2025", wasteKg: 28.3, coveragePct: 82, tone: "before" },
      { label: "Current assessment", period: "Jun 2026", wasteKg: 21.5, coveragePct: 58, tone: "after" },
    ],
    mission: {
      name: "Mithi River Restoration Phase II",
      status: "Active",
      progress: 56,
      team: "BMC Coastal Response Unit",
      dueDate: "30 Jun 2026",
      wasteRemovedKg: 1120,
    },
  },
  {
    id: "delhi-ncr",
    label: "Delhi NCR Yamuna Belt",
    city: "Delhi",
    region: "NCR",
    organization: "Delhi Jal Board",
    risk: 79,
    wasteKg: 28.4,
    plasticKg: 16.8,
    carbonRecoveryPct: 22,
    cleanupCostInr: 4500000,
    lastScanAt: "20 Jun 2026, 10:02 IST",
    status: "Critical",
    lat: 28.6139,
    lng: 77.209,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Severe foam and plastic pollution across the Yamuna stretch from Wazirabad to Okhla. CPCB 2025 report shows Delhi segment failing BOD and coliform standards year-round.",
    wasteTrend: [
      { month: "Jan", risk: 72, wasteKg: 23.1 },
      { month: "Feb", risk: 74, wasteKg: 24.2 },
      { month: "Mar", risk: 75, wasteKg: 25.4 },
      { month: "Apr", risk: 76, wasteKg: 26.2 },
      { month: "May", risk: 78, wasteKg: 27.5 },
      { month: "Jun", risk: 79, wasteKg: 28.4 },
    ],
    aiRecommendations: [
      "Deploy interceptor booms at Wazirabad and ISBT bridge immediately.",
      "Coordinate with DJB for certs for Okhla STP overflow: 1.5 mg/L (0.5 mg/L for new plants).",
      "Schedule weekly drone monitoring during monsoon overflow season.",
    ],
    beforeAfter: [
      { label: "Jan 2026 survey", period: "Jan 2026", wasteKg: 34.2, coveragePct: 88, tone: "before" },
      { label: "Jun 2026 reassessment", period: "Jun 2026", wasteKg: 28.4, coveragePct: 71, tone: "after" },
    ],
    mission: {
      name: "Delhi Yamuna Belt Interception",
      status: "Scheduled",
      progress: 18,
      team: "DJB River Restoration Corps",
      dueDate: "05 Jul 2026",
      wasteRemovedKg: 240,
    },
  },
  {
    id: "yamuna-river",
    label: "Yamuna River Plastic Hotspot",
    city: "Yamuna River",
    region: "Delhi / UP",
    organization: "Namami Gange Mission",
    risk: 84,
    wasteKg: 34.6,
    plasticKg: 22.1,
    carbonRecoveryPct: 19,
    cleanupCostInr: 5200000,
    lastScanAt: "20 Jun 2026, 10:28 IST",
    status: "Critical",
    lat: 28.5274,
    lng: 77.2656,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Highest-density plastic accumulation zone at Okhla Barrage and Kalindi Kunj stretch. NMCG reports 85% of visible waste classified as single-use plastic and thermocol.",
    wasteTrend: [
      { month: "Jan", risk: 76, wasteKg: 27.4 },
      { month: "Feb", risk: 78, wasteKg: 28.8 },
      { month: "Mar", risk: 80, wasteKg: 30.2 },
      { month: "Apr", risk: 81, wasteKg: 31.6 },
      { month: "May", risk: 83, wasteKg: 33.1 },
      { month: "Jun", risk: 84, wasteKg: 34.6 },
    ],
    aiRecommendations: [
      "Critical: Deploy 3 interceptor units at Okhla Barrage within 24 hours.",
      "Activate Namami Gange rapid response team for Kalindi Kunj zone.",
      "Issue public advisory for downstream irrigation districts in UP.",
    ],
    beforeAfter: [
      { label: "Mar 2026 baseline", period: "Mar 2026", wasteKg: 41.8, coveragePct: 94, tone: "before" },
      { label: "Jun 2026 partial cleanup", period: "Jun 2026", wasteKg: 34.6, coveragePct: 76, tone: "after" },
    ],
    mission: {
      name: "Yamuna Plastic Removal Drive",
      status: "Active",
      progress: 42,
      team: "Namami Gange Corps",
      dueDate: "20 Jun 2026",
      wasteRemovedKg: 840,
    },
  },
  {
    id: "sabarmati-river",
    label: "Sabarmati River Cleanup",
    city: "Sabarmati River",
    region: "Gujarat",
    organization: "Ahmedabad Municipal Corporation",
    risk: 58,
    wasteKg: 15.8,
    plasticKg: 8.6,
    carbonRecoveryPct: 42,
    cleanupCostInr: 1650000,
    lastScanAt: "20 Jun 2026, 06:18 IST",
    status: "Medium",
    lat: 23.0962,
    lng: 72.5797,
    layers: ["risk", "plastic", "cleanup", "carbon"],
    description:
      "Riverfront redevelopment zone showing improved conditions but persistent plastic at Vasna Barrage and Dharoi downstream. Sabarmati Riverfront Project Phase 3 monitoring active.",
    wasteTrend: [
      { month: "Jan", risk: 64, wasteKg: 19.4 },
      { month: "Feb", risk: 62, wasteKg: 18.2 },
      { month: "Mar", risk: 61, wasteKg: 17.5 },
      { month: "Apr", risk: 60, wasteKg: 16.8 },
      { month: "May", risk: 59, wasteKg: 16.2 },
      { month: "Jun", risk: 58, wasteKg: 15.8 },
    ],
    aiRecommendations: [
      "Maintain weekly cleanup at Vasna Barrage — trend improving 9% MoM.",
      "Expand riverfront sensor network to Dharoi reservoir approach.",
      "Publish citizen impact report for Sabarmati Riverfront Phase 3.",
    ],
    beforeAfter: [
      { label: "Pre-project baseline", period: "2024", wasteKg: 26.8, coveragePct: 86, tone: "before" },
      { label: "Current status", period: "Jun 2026", wasteKg: 15.8, coveragePct: 38, tone: "after" },
    ],
    mission: {
      name: "Sabarmati Plastic Interception",
      status: "Active",
      progress: 68,
      team: "AMC Cleanup Brigade",
      dueDate: "24 Jun 2026",
      wasteRemovedKg: 1260,
    },
  },
];

export const indianOrganizations = [
  {
    id: "smc",
    name: "Surat Municipal Corporation",
    type: "Municipal Corporation",
    sites: 14,
    analyses: 1240,
    riskScore: 62,
    activeMissions: 4,
    region: "Gujarat",
  },
  {
    id: "amc",
    name: "Ahmedabad Municipal Corporation",
    type: "Municipal Corporation",
    sites: 11,
    analyses: 986,
    riskScore: 55,
    activeMissions: 3,
    region: "Gujarat",
  },
  {
    id: "rmc",
    name: "Rajkot Municipal Corporation",
    type: "Municipal Corporation",
    sites: 8,
    analyses: 612,
    riskScore: 58,
    activeMissions: 2,
    region: "Gujarat",
  },
  {
    id: "namami",
    name: "Namami Gange Mission",
    type: "Government Programme",
    sites: 28,
    analyses: 3420,
    riskScore: 71,
    activeMissions: 9,
    region: "Pan-India",
  },
  {
    id: "bmc",
    name: "Brihanmumbai Municipal Corporation",
    type: "Municipal Corporation",
    sites: 19,
    analyses: 1580,
    riskScore: 64,
    activeMissions: 5,
    region: "Maharashtra",
  },
  {
    id: "djb",
    name: "Delhi Jal Board",
    type: "Water Utility",
    sites: 16,
    analyses: 2104,
    riskScore: 78,
    activeMissions: 6,
    region: "NCR",
  },
];

export const indianMissions = [
  {
    id: "m-surat",
    name: "Tapi River Emergency Response",
    site: "Surat Tapi River Corridor",
    city: "Surat",
    status: "Active" as const,
    priority: "Critical" as const,
    progress: 72,
    team: "SMC Field Unit Alpha",
    wasteRemovedKg: 1840,
    carbonImpact: 22,
    dueDate: "18 June 2026",
    budgetInr: 2800000,
  },
  {
    id: "m-sabarmati",
    name: "Sabarmati Plastic Interception",
    site: "Sabarmati River Cleanup",
    city: "Ahmedabad",
    status: "Active" as const,
    priority: "High" as const,
    progress: 68,
    team: "AMC Cleanup Brigade",
    wasteRemovedKg: 1260,
    carbonImpact: 15,
    dueDate: "24 June 2026",
    budgetInr: 1650000,
  },
  {
    id: "m-yamuna",
    name: "Yamuna Plastic Removal Drive",
    site: "Yamuna River Plastic Hotspot",
    city: "New Delhi",
    status: "Active" as const,
    priority: "Critical" as const,
    progress: 42,
    team: "Namami Gange Corps",
    wasteRemovedKg: 840,
    carbonImpact: 18,
    dueDate: "20 June 2026",
    budgetInr: 4200000,
  },
  {
    id: "m-mithi",
    name: "Mithi River Restoration Phase II",
    site: "Mumbai Mithi River Basin",
    city: "Mumbai",
    status: "Active" as const,
    priority: "High" as const,
    progress: 56,
    team: "BMC Coastal Response Unit",
    wasteRemovedKg: 1120,
    carbonImpact: 19,
    dueDate: "30 June 2026",
    budgetInr: 3100000,
  },
];

export const indianReportMock = {
  title: "Environmental Intelligence Assessment",
  organization: "Surat Municipal Corporation",
  site: "Surat Tapi River Corridor",
  city: "Surat, Gujarat",
  analysisId: "TS-IN-SURAT-2026-0042",
  generatedAt: "12 June 2026, 2:32 pm IST",
  executiveSummary:
    "PrithviQ AI analysis indicates elevated plastic and industrial waste concentration along the Tapi River corridor near Surat. Immediate mechanical extraction and community recycling collection are recommended within the next 72 hours to prevent downstream dispersion into marine ecosystems.",
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
  recommendation:
    "Deploy certified cleanup crews to high-density plastic zones along the Tapi River embankment. Coordinate with SMC recycling collection centres and schedule follow-up drone survey within 7 days.",
};

export const assistantPrompts = [
  "Summarize today's detections across Gujarat.",
  "Recommend cleanup priorities for the Yamuna corridor.",
  "Show highest-risk monitoring site in India.",
  "Generate environmental report for Surat River.",
];

export const assistantMockReplies: Record<string, string> = {
  "Summarize today's detections across Gujarat.":
    "Today PrithviQ AI processed 47 images across Gujarat. Surat Tapi River Corridor flagged critical plastic density (ERI 76). Rajkot Aji River shows elevated textile waste indicators. Sabarmati cleanup progress is on track at 68% mission completion.",
  "Recommend cleanup priorities for the Yamuna corridor.":
    "Priority 1: Yamuna River Plastic Hotspot (ERI 84, Critical). Deploy interception booms near Okhla Barrage. Priority 2: Delhi NCR Yamuna Belt (ERI 79). Coordinate with Namami Gange Mission field units. Combined estimated cleanup budget: ₹97 Lakh.",
  "Show highest-risk monitoring site in India.":
    "Highest current risk: Yamuna River Plastic Hotspot — ERI 84 (Critical). 34.6 kg estimated waste with dominant plastic classification at 94% confidence. Active alert issued 8 minutes ago.",
  "Generate environmental report for Surat River.":
    "Environmental Intelligence Assessment for Surat Tapi River Corridor is ready. ERI: 76, estimated waste: 24.8 kg, cleanup priority: High. Open Reports to preview the full PDF-ready assessment.",
};

export function formatInr(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function riskColor(status: MapSite["status"]): string {
  switch (status) {
    case "Critical":
      return "#f43f5e";
    case "High":
      return "#f59e0b";
    case "Medium":
      return "#10b981";
    default:
      return "#38bdf8";
  }
}
