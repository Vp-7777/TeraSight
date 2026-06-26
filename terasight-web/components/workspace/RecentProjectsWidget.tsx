"use client";

import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

import { useMemo } from "react";
import { useSession } from "@/lib/session/session-context";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { recentProjects } from "@/lib/data/intelligence-mock";

interface RecentProjectsWidgetProps {
  limit?: number;
}

export function RecentProjectsWidget({ limit = 3 }: RecentProjectsWidgetProps) {
  const { activeWorkspace } = useSession();

  const items = useMemo(() => {
    const matching = recentProjects.filter(p => 
      p.organization.toLowerCase().includes(activeWorkspace.short.toLowerCase()) ||
      p.organization.toLowerCase().includes(activeWorkspace.name.toLowerCase()) ||
      (activeWorkspace.id === "iitb" && (p.organization.includes("Bombay") || p.organization.includes("IIT"))) ||
      (activeWorkspace.id === "smc" && p.organization.includes("Surat")) ||
      (activeWorkspace.id === "namami" && p.organization.includes("Gange"))
    );
    return matching.length > 0 ? matching.slice(0, limit) : recentProjects.slice(0, limit);
  }, [activeWorkspace, limit]);

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[color:var(--color-border-1)] px-5 py-4">
        <FolderKanban className="h-4 w-4 text-sky-300" />
        <p className="font-medium">Recent Projects</p>
      </div>
      <div className="space-y-3 p-4">
        {items.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, borderColor: "rgba(52, 211, 153, 0.22)", boxShadow: "0 4px 20px rgba(16, 185, 129, 0.04)" }}
            transition={{ 
              delay: index * 0.06,
              duration: 0.2,
              ease: "easeOut"
            }}
            className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-foreground-muted">{project.organization}</p>
              </div>
              <Badge variant={project.status === "Active" ? "success" : "ai"}>
                {project.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-foreground-muted">
              <span>{project.sites} sites</span>
              <span>{project.updatedAt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
