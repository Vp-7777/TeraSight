"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Globe2,
  Map,
  Plane,
  ScanSearch,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

import { GlassPanel } from "@/components/ui/glass-panel";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const actions = [
  {
    label: "New Analysis",
    description: "Upload & analyze imagery",
    href: "/analyze",
    icon: ScanSearch,
    accent: "from-emerald-500/20 to-teal-500/10 text-emerald-300",
  },
  {
    label: "Global Globe",
    description: "3D planetary view",
    href: "/globe",
    icon: Globe2,
    accent: "from-violet-500/20 to-indigo-500/10 text-violet-300",
  },
  {
    label: "Map Explorer",
    description: "View monitoring sites",
    href: "/map",
    icon: Map,
    accent: "from-sky-500/20 to-blue-500/10 text-sky-300",
  },
  {
    label: "Generate Report",
    description: "Export intelligence PDF",
    href: "/reports",
    icon: FileText,
    accent: "from-violet-500/20 to-purple-500/10 text-violet-300",
  },
  {
    label: "Cleanup Mission",
    description: "Plan field operations",
    href: "/missions",
    icon: Target,
    accent: "from-amber-500/20 to-orange-500/10 text-amber-300",
  },
  {
    label: "AI Intelligence",
    description: "Deep analytics center",
    href: "/intelligence",
    icon: Sparkles,
    accent: "from-cyan-500/20 to-sky-500/10 text-cyan-300",
  },
  {
    label: "Drone Survey",
    description: "Schedule aerial capture",
    href: "/drone",
    icon: Plane,
    accent: "from-indigo-500/20 to-blue-500/10 text-indigo-300",
  },
];

export function QuickActionsPanel() {
  return (
    <GlassPanel className="p-5">
      <p className="text-sm font-semibold text-foreground">Quick Actions</p>
      <p className="mt-1 text-xs text-foreground-muted">Launch common workflows</p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        {actions.map((action) => (
          <motion.div key={action.href} variants={fadeInUp}>
            <Link href={action.href}>
              <div className="group flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3.5 transition hover:border-emerald-500/20 hover:bg-white/[0.05]">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.accent}`}
                >
                  <action.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-emerald-200">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground-muted">{action.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </GlassPanel>
  );
}
