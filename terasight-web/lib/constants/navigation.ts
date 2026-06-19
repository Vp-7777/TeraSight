import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  FileText,
  Globe2,
  LayoutDashboard,
  Map,
  ScanSearch,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Global Globe", href: "/globe", icon: Globe2 },
  { label: "Analyze Image", href: "/analyze", icon: ScanSearch, badge: "Live" },
  { label: "Map Explorer", href: "/map", icon: Map },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "AI Intelligence Center", href: "/intelligence", icon: Sparkles },
  { label: "Cleanup Missions", href: "/missions", icon: Target },
  { label: "Organizations", href: "/organizations", icon: Building2 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const marketingNav = [
  { label: "Platform", href: "#platform" },
  { label: "Analysis", href: "#analysis" },
  { label: "Impact", href: "#impact" },
  { label: "Use Cases", href: "#use-cases" },
];
