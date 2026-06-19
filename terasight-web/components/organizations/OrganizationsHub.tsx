"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, ScanSearch, Target } from "lucide-react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { RecentProjectsWidget } from "@/components/workspace/RecentProjectsWidget";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { organizations } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function OrganizationsHub() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div variants={fadeInUp}>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Enterprise</p>
        <h1 className="mt-2 text-3xl font-semibold">Organizations</h1>
        <p className="mt-2 max-w-2xl text-foreground-muted">
          Manage multi-tenant workspaces, monitoring programs, and environmental operations
          across partner organizations.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {organizations.map((org, index) => (
          <motion.div
            key={org.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <GlassPanel className="group overflow-hidden transition hover:border-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/5">
              <div className="border-b border-[color:var(--color-border-1)] bg-gradient-to-r from-emerald-500/5 to-transparent px-5 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/10">
                      <Building2 className="h-5 w-5 text-[color:var(--color-nav-active-text)]" />
                    </div>
                    <div>
                      <p className="font-semibold">{org.name}</p>
                      <p className="text-xs text-foreground-muted">{org.type}</p>
                    </div>
                  </div>
                  <Badge variant="gold">{org.region}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
                  <MapPin className="mb-1 h-4 w-4 text-foreground-muted" />
                  <p className="text-xl font-semibold">{org.sites}</p>
                  <p className="text-xs text-foreground-muted">monitoring sites</p>
                </div>
                <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
                  <ScanSearch className="mb-1 h-4 w-4 text-foreground-muted" />
                  <p className="text-xl font-semibold">{org.analyses}</p>
                  <p className="text-xs text-foreground-muted">analyses run</p>
                </div>
                <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
                  <Target className="mb-1 h-4 w-4 text-foreground-muted" />
                  <p className="text-xl font-semibold">{org.activeMissions}</p>
                  <p className="text-xs text-foreground-muted">active missions</p>
                </div>
                <div className="rounded-xl bg-[color:var(--color-surface-1)] p-3">
                  <p className="text-xs text-foreground-muted">Risk Score</p>
                  <p className="mt-1 text-xl font-semibold text-amber-300">{org.riskScore}</p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp}>
        <RecentProjectsWidget limit={4} />
      </motion.div>
    </motion.div>
  );
}
