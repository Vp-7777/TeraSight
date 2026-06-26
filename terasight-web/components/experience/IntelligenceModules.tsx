"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { indianMapSites } from "@/lib/data/india-demo";

const MATRIX = indianMapSites.map((site) => ({
  id: site.id,
  label: site.city,
  risk: site.risk,
  waste: site.wasteKg,
  carbon: site.carbonRecoveryPct,
}));

export function RiskMatrix() {
  const maxRisk = Math.max(...MATRIX.map((s) => s.risk));

  return (
    <GlassPanel glow="emerald" className="p-5">
      <p className="mb-1 text-sm font-medium">Environmental Risk Matrix</p>
      <p className="mb-4 text-xs text-foreground-muted">Impact vs likelihood across priority sites</p>
      <div className="grid grid-cols-4 gap-1">
        {MATRIX.map((site) => {
          const intensity = site.risk / maxRisk;
          return (
            <motion.div
              key={site.id}
              whileHover={{ scale: 1.05 }}
              className="flex aspect-square flex-col items-center justify-center rounded-lg border border-[color:var(--color-border-1)] p-1 text-center"
              style={{
                background: `rgba(244, 63, 94, ${0.08 + intensity * 0.35})`,
              }}
            >
              <span className="text-[9px] font-medium leading-tight">{site.label}</span>
              <span className="mt-0.5 text-xs font-semibold text-rose-300">{site.risk}</span>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export function PredictionEngine() {
  const predictions = [
    { site: "Yamuna River", forecast: "ERI 88 by Jul", trend: "up" },
    { site: "Surat", forecast: "Plastic +12%", trend: "up" },
    { site: "Sabarmati", forecast: "Recovery 45%", trend: "down" },
  ];

  return (
    <GlassPanel className="p-5">
      <p className="mb-3 text-sm font-medium">Prediction Engine</p>
      <div className="space-y-2">
        {predictions.map((p, i) => (
          <motion.div
            key={p.site}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between rounded-lg border border-[color:var(--color-border-1)] px-3 py-2"
          >
            <span className="text-sm">{p.site}</span>
            <span className={`text-xs font-medium ${p.trend === "up" ? "text-rose-400" : "text-emerald-400"}`}>
              {p.forecast}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function AnomalyDetection() {
  const anomalies = [
    { label: "Foam expansion", site: "Delhi", severity: 0.9 },
    { label: "Microplastic spike", site: "Yamuna", severity: 0.85 },
    { label: "Effluent discharge", site: "Rajkot", severity: 0.72 },
  ];

  return (
    <GlassPanel glow="blue" className="p-5">
      <p className="mb-3 text-sm font-medium">Anomaly Detection</p>
      <div className="space-y-3">
        {anomalies.map((a, i) => (
          <div key={a.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span>{a.label} · {a.site}</span>
              <span className="text-amber-400">{Math.round(a.severity * 100)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${a.severity * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function StrategicRecommendations() {
  const recs = [
    "Deploy Yamuna interception booms within 24h — highest ROI cleanup path.",
    "Accelerate Sabarmati Phase 3 — trend improving 9% MoM.",
    "Schedule Rajkot industrial audit — BOD anomaly detected.",
  ];

  return (
    <GlassPanel border="gradient" className="p-5">
      <p className="mb-3 text-sm font-medium">Strategic Recommendation Engine</p>
      <ul className="space-y-2">
        {recs.map((rec, i) => (
          <motion.li
            key={rec}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-2 text-xs leading-relaxed text-foreground-muted"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
            {rec}
          </motion.li>
        ))}
      </ul>
    </GlassPanel>
  );
}
