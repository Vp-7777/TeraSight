"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { indianMapSites } from "@/lib/data/india-demo";

const CommandGlobe = dynamic(() => import("@/components/three/CommandGlobe"), {
  ssr: false,
  loading: () => <div className="h-full w-full skeleton-shimmer rounded-2xl" />,
});

const FEED = [
  "Yamuna ERI 84 — Critical alert",
  "PrithviQ processed 47 images today",
  "Sabarmati mission 68% complete",
  "7 sites monitored across India",
];

export function AuthIntelligencePanel() {
  const markers = indianMapSites.map((s) => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    label: s.city,
    risk: s.risk,
  }));

  return (
    <div className="relative flex h-full flex-col">
      <div className="relative mx-8 mt-8 h-56 overflow-hidden rounded-2xl border border-[color:var(--color-border-1)]">
        <CommandGlobe className="h-full w-full" markers={markers} paused={false} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#06080f_80%)]" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 px-8">
        {[
          { label: "Active Sites", value: "7" },
          { label: "Avg ERI", value: "70" },
          { label: "Waste Tracked", value: "180kg" },
          { label: "Missions", value: "5" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)]/60 px-3 py-2.5 backdrop-blur-sm"
          >
            <p className="text-[10px] uppercase tracking-wider text-foreground-muted">{m.label}</p>
            <p className="text-lg font-semibold text-emerald-400">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex-1 overflow-hidden px-8">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
          Intelligence Feed
        </p>
        <div className="space-y-2">
          {FEED.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 text-xs text-foreground-muted"
            >
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
