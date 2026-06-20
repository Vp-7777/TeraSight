"use client";

import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "Yamuna River ERI 84 — Critical plastic hotspot detected",
  "Surat Tapi corridor — 24.8 kg waste classified",
  "Sabarmati cleanup mission 68% complete",
  "Mumbai Mithi basin — flood risk elevated",
  "Rajkot Aji River — textile effluent alert",
  "Delhi NCR foam layer expanding near Wazirabad",
  "PrithviQ AI processed 47 images across Gujarat today",
  "Namami Gange Corps deployed 3 interceptor units",
];

export function LiveEnvironmentalTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)]/60 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[color:var(--color-background-elevated)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[color:var(--color-background-elevated)] to-transparent" />
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="relative flex shrink-0 items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Live
          </span>
        </span>
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="text-xs text-foreground-muted">
              <span className="mr-3 text-emerald-500/50">◆</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
