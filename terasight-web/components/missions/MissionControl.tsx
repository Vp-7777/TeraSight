"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Plus, Target, Trash2, Users, X, Check } from "lucide-react";
import { useState } from "react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import {
  BudgetImpactTracker,
  DroneDeploymentTracker,
  MissionLifecycleTimeline,
} from "@/components/experience/MissionModules";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";
import { missions as initialMissions, type Mission } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

function priorityVariant(p: Mission["priority"]) {
  switch (p) {
    case "Critical":
      return "danger" as const;
    case "High":
      return "warning" as const;
    case "Medium":
      return "ai" as const;
    default:
      return "success" as const;
  }
}

function statusVariant(s: Mission["status"]) {
  switch (s) {
    case "Active":
      return "success" as const;
    case "Scheduled":
      return "ai" as const;
    case "Complete":
      return "default" as const;
    default:
      return "warning" as const;
  }
}

export function MissionControl() {
  const [missionList, setMissionList] = useState<Mission[]>(initialMissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSite, setNewSite] = useState("");
  const [newPriority, setNewPriority] = useState<Mission["priority"]>("Medium");
  const [newTeam, setNewTeam] = useState("6 analysts");
  const [newDueDate, setNewDueDate] = useState("15 Jul 2026");

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSite.trim()) return;

    const newMission: Mission = {
      id: `m-${Date.now()}`,
      name: newName,
      site: newSite,
      priority: newPriority,
      status: "Active",
      progress: 0,
      wasteRemovedKg: 0,
      carbonImpact: 0,
      team: newTeam,
      dueDate: newDueDate,
    };

    setMissionList((prev) => [newMission, ...prev]);
    setIsModalOpen(false);

    // Reset fields
    setNewName("");
    setNewSite("");
    setNewPriority("Medium");
    setNewTeam("6 analysts");
    setNewDueDate("15 Jul 2026");
  };

  const handleIncrementProgress = (id: string) => {
    setMissionList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextProgress = Math.min(100, m.progress + 10);
          const nextStatus = nextProgress === 100 ? "Complete" : m.status;
          return {
            ...m,
            progress: nextProgress,
            status: nextStatus,
            wasteRemovedKg: m.wasteRemovedKg + (nextProgress === 100 ? 250 : 40),
            carbonImpact: m.carbonImpact + (nextProgress === 100 ? 5 : 1),
          };
        }
        return m;
      })
    );
  };

  // Derive stats dynamically from state
  const activeMissionsCount = missionList.filter((m) => m.status === "Active").length;
  const totalWasteRemoved = (missionList.reduce((acc, m) => acc + m.wasteRemovedKg, 0) / 1000).toFixed(1);
  const avgCarbonImpact = missionList.length
    ? Math.round(missionList.reduce((acc, m) => acc + m.carbonImpact, 0) / missionList.length)
    : 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative space-y-6"
    >
      <AmbientGlow />

      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Operations</p>
          <h1 className="mt-2 text-3xl font-semibold">Mission Control</h1>
          <p className="mt-2 text-foreground-muted">
            Coordinate cleanup operations with AI-guided prioritization and impact tracking.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Mission
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <MissionLifecycleTimeline />
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeInUp}>
          <DroneDeploymentTracker />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <BudgetImpactTracker missions={missionList} />
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Missions", value: activeMissionsCount, icon: Target },
          { label: "Waste Removed", value: `${totalWasteRemoved}t`, icon: Trash2 },
          { label: "Carbon Impact", value: `+${avgCarbonImpact}%`, icon: Leaf },
        ].map((stat, index) => (
          <motion.div key={stat.label} variants={fadeInUp} transition={{ delay: index * 0.05 }}>
            <GlassPanel className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-[color:var(--color-nav-active-text)]">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-foreground-muted">{stat.label}</p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {missionList.map((mission, index) => (
          <motion.div
            key={mission.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <GlassPanel className="overflow-hidden transition hover:border-emerald-500/20">
              <div className="border-b border-[color:var(--color-border-1)] bg-gradient-to-r from-emerald-500/4 to-transparent px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{mission.name}</p>
                    <p className="text-sm text-foreground-muted">{mission.site}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityVariant(mission.priority)}>
                      {mission.priority}
                    </Badge>
                    <Badge variant={statusVariant(mission.status)}>{mission.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-foreground-muted">Progress</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{mission.progress}%</span>
                      {mission.progress < 100 ? (
                        <button
                          type="button"
                          onClick={() => handleIncrementProgress(mission.id)}
                          className="flex h-5 w-5 items-center justify-center rounded-md border border-[color:var(--color-border-2)] bg-[color:var(--color-surface-2)] text-[10px] text-accent hover:bg-emerald-500 hover:text-white transition"
                          title="Simulate 10% progress increment"
                        >
                          +
                        </button>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        mission.progress === 100
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-emerald-500 to-sky-400",
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${mission.progress}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <p className="text-lg font-semibold text-foreground">{mission.wasteRemovedKg}</p>
                    <p className="text-[10px] text-foreground-muted">kg removed</p>
                  </div>
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <p className="text-lg font-semibold text-foreground">{mission.carbonImpact}%</p>
                    <p className="text-[10px] text-foreground-muted">carbon impact</p>
                  </div>
                  <div className="rounded-lg bg-[color:var(--color-surface-1)] p-3">
                    <Users className="mx-auto h-4 w-4 text-foreground-muted" />
                    <p className="mt-1 text-[10px] text-foreground-muted">{mission.team}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-muted">Due {mission.dueDate}</p>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Create Mission Modal Dialog */}
      <AnimatePresence>
        {isModalOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-3"
            >
              <GlassPanel className="p-6 relative shadow-2xl" border="gradient" glow="emerald">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--color-border-1)] text-foreground-muted hover:bg-[color:var(--color-surface-2)]"
                >
                  <X className="h-4 w-4" />
                </button>

                <h2 className="text-xl font-semibold mb-1 text-foreground">Create Deployment Mission</h2>
                <p className="text-xs text-foreground-muted mb-5">
                  Establish a new clean-up mission with assigned crew and priority level.
                </p>

                <form onSubmit={handleCreateMission} className="space-y-4">
                  <Input
                    label="Mission Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Tapi Riverfront Cleanup Phase 3"
                    required
                  />

                  <Input
                    label="Location Site"
                    value={newSite}
                    onChange={(e) => setNewSite(e.target.value)}
                    placeholder="e.g. Surat Tapi River Corridor"
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Priority Level</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Mission["priority"])}
                      className="w-full h-11 rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-3 text-sm text-foreground outline-none focus:border-emerald-500/40"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Assigned Crew / Team"
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                      placeholder="e.g. 12 field ops"
                      required
                    />
                    <Input
                      label="Target Date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="e.g. 15 Jul 2026"
                      required
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4">
                    <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Establish Mission</Button>
                  </div>
                </form>
              </GlassPanel>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
