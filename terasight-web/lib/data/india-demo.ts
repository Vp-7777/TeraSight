/** Indian environmental intelligence demo data — structured for future API integration. */

export interface MapSite {
  id: string;
  label: string;
  city: string;
  region: string;
  organization: string;
  risk: number;
  wasteKg: number;
  status: "Critical" | "High" | "Medium" | "Low";
  lat: number;
  lng: number;
  layers: string[];
}

export const INDIA_MAP_CENTER = { lat: 22.5937, lng: 78.9629 };
export const INDIA_DEFAULT_ZOOM = 5;

export const indianMapSites: MapSite[] = [
  {
    id: "surat-river",
    label: "Surat River Monitoring",
    city: "Surat",
    region: "Gujarat",
    organization: "Surat Municipal Corporation",
    risk: 74,
    wasteKg: 22.4,
    status: "High",
    lat: 21.1702,
    lng: 72.8311,
    layers: ["waste", "risk", "heatmap"],
  },
  {
    id: "sabarmati",
    label: "Sabarmati River Cleanup",
    city: "Ahmedabad",
    region: "Gujarat",
    organization: "Ahmedabad Municipal Corporation",
    risk: 58,
    wasteKg: 15.8,
    status: "Medium",
    lat: 23.0225,
    lng: 72.5714,
    layers: ["waste", "detections"],
  },
  {
    id: "yamuna",
    label: "Yamuna Plastic Detection",
    city: "New Delhi",
    region: "NCR",
    organization: "Namami Gange Mission",
    risk: 81,
    wasteKg: 31.2,
    status: "Critical",
    lat: 28.6139,
    lng: 77.209,
    layers: ["waste", "risk", "priority"],
  },
  {
    id: "ganga-varanasi",
    label: "Ganga Basin Monitoring",
    city: "Varanasi",
    region: "Uttar Pradesh",
    organization: "Namami Gange Mission",
    risk: 69,
    wasteKg: 19.6,
    status: "High",
    lat: 25.3176,
    lng: 82.9739,
    layers: ["waste", "satellite", "heatmap"],
  },
  {
    id: "marine-drive",
    label: "Marine Drive Coastal Waste Analysis",
    city: "Mumbai",
    region: "Maharashtra",
    organization: "The Ocean Cleanup India",
    risk: 52,
    wasteKg: 12.1,
    status: "Medium",
    lat: 18.9432,
    lng: 72.8236,
    layers: ["waste", "satellite"],
  },
  {
    id: "mithi",
    label: "Mithi River Restoration",
    city: "Mumbai",
    region: "Maharashtra",
    organization: "Tata Sustainability Initiative",
    risk: 63,
    wasteKg: 17.3,
    status: "High",
    lat: 19.076,
    lng: 72.8777,
    layers: ["waste", "carbon", "priority"],
  },
  {
    id: "vapi",
    label: "Vapi Industrial Zone Monitoring",
    city: "Vapi",
    region: "Gujarat",
    organization: "IISc Environmental Research Lab",
    risk: 77,
    wasteKg: 26.5,
    status: "High",
    lat: 20.3893,
    lng: 72.9106,
    layers: ["waste", "risk", "detections", "heatmap"],
  },
  {
    id: "iitb-mumbai",
    label: "Powai Lake Surveillance",
    city: "Mumbai",
    region: "Maharashtra",
    organization: "IIT Bombay Environmental Analytics Cell",
    risk: 41,
    wasteKg: 8.4,
    status: "Medium",
    lat: 19.1334,
    lng: 72.9133,
    layers: ["detections", "carbon"],
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
    id: "ocean-cleanup",
    name: "The Ocean Cleanup India",
    type: "NGO (Placeholder)",
    sites: 6,
    analyses: 412,
    riskScore: 48,
    activeMissions: 2,
    region: "Western Coast",
  },
  {
    id: "tata",
    name: "Tata Sustainability Initiative",
    type: "Corporate ESG (Placeholder)",
    sites: 9,
    analyses: 678,
    riskScore: 44,
    activeMissions: 2,
    region: "Maharashtra",
  },
  {
    id: "iisc",
    name: "IISc Environmental Research Lab",
    type: "Research Institution",
    sites: 7,
    analyses: 890,
    riskScore: 52,
    activeMissions: 3,
    region: "Karnataka",
  },
  {
    id: "iitb",
    name: "IIT Bombay Environmental Analytics Cell",
    type: "Research Institution",
    sites: 5,
    analyses: 534,
    riskScore: 39,
    activeMissions: 1,
    region: "Maharashtra",
  },
];

export const indianMissions = [
  {
    id: "m-surat",
    name: "Tapi River Emergency Response",
    site: "Surat River Monitoring",
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
    progress: 48,
    team: "AMC Cleanup Brigade",
    wasteRemovedKg: 920,
    carbonImpact: 15,
    dueDate: "24 June 2026",
    budgetInr: 1650000,
  },
  {
    id: "m-yamuna",
    name: "Yamuna Plastic Removal Drive",
    site: "Yamuna Plastic Detection",
    city: "New Delhi",
    status: "Scheduled" as const,
    priority: "Critical" as const,
    progress: 12,
    team: "Namami Gange Corps",
    wasteRemovedKg: 0,
    carbonImpact: 0,
    dueDate: "20 June 2026",
    budgetInr: 4200000,
  },
  {
    id: "m-mithi",
    name: "Mithi River Restoration Phase II",
    site: "Mithi River Restoration",
    city: "Mumbai",
    status: "Active" as const,
    priority: "High" as const,
    progress: 56,
    team: "Tata Sustainability Field Team",
    wasteRemovedKg: 1120,
    carbonImpact: 19,
    dueDate: "30 June 2026",
    budgetInr: 3100000,
  },
];

export const indianReportMock = {
  title: "Environmental Intelligence Assessment",
  organization: "Surat Municipal Corporation",
  site: "Surat River Monitoring",
  city: "Surat, Gujarat",
  analysisId: "TS-IN-SURAT-2026-0042",
  generatedAt: "12 June 2026, 2:32 pm IST",
  executiveSummary:
    "PrithviQ AI analysis indicates elevated plastic and industrial waste concentration along the Tapi River corridor near Surat. Immediate mechanical extraction and community recycling collection are recommended within the next 72 hours to prevent downstream dispersion into marine ecosystems.",
  summary: {
    estimatedWasteKg: 22.4,
    environmentalRiskIndex: 74,
    carbonRecoveryScore: 28,
    cleanupPriority: "High",
    estimatedCostInr: 2800000,
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
    "Today PrithviQ AI processed 47 images across Gujarat. Surat River Monitoring flagged critical plastic density (ERI 74). Vapi Industrial Zone shows elevated hazardous waste indicators. Sabarmati cleanup progress is on track at 48% mission completion.",
  "Recommend cleanup priorities for the Yamuna corridor.":
    "Priority 1: Yamuna Plastic Detection (ERI 81, Critical). Deploy interception booms near Okhla Barrage. Priority 2: Coordinate with Namami Gange Mission field units. Estimated cleanup budget: ₹42 Lakh.",
  "Show highest-risk monitoring site in India.":
    "Highest current risk: Yamuna Plastic Detection, New Delhi — ERI 81 (Critical). 31.2 kg estimated waste with dominant plastic classification at 92% confidence. Active alert issued 47 minutes ago.",
  "Generate environmental report for Surat River.":
    "Environmental Intelligence Assessment for Surat River Monitoring is ready. ERI: 74, estimated waste: 22.4 kg, cleanup priority: High. Open Reports to preview the full PDF-ready assessment.",
};
