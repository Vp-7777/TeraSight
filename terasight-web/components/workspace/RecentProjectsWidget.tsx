"use client";

import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { recentProjects } from "@/lib/data/intelligence-mock";

interface RecentProjectsWidgetProps {
  limit?: number;
}

export function RecentProjectsWidget({ limit = 3 }: RecentProjectsWidgetProps) {
  const items = recentProjects.slice(0, limit);

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
            transition={{ delay: index * 0.06 }}
            className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4"
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
