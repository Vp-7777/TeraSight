"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { savedAnalyses } from "@/lib/data/intelligence-mock";

export function SavedAnalysesWidget({ limit = 3 }: { limit?: number }) {
  const items = savedAnalyses.slice(0, limit);

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] px-5 py-4">
        <div className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-sky-300" />
          <p className="font-medium">Saved Analyses</p>
        </div>
        <Link href="/reports" className="text-xs text-accent hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-3 p-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-4 transition hover:border-emerald-500/20"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-foreground-muted">{item.site}</p>
              </div>
              <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-xs font-medium text-[color:var(--color-nav-active-text)]">
                ERI {item.risk}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="default" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-foreground-muted">Saved {item.savedAt}</p>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
