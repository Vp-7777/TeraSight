"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { MAP_LAYERS, type MapLayerId } from "@/lib/data/map-intelligence";
import { cn } from "@/lib/utils";

interface MapLayerControlsProps {
  activeLayer: MapLayerId;
  onLayerChange: (layer: MapLayerId) => void;
  className?: string;
}

export function MapLayerControls({
  activeLayer,
  onLayerChange,
  className,
}: MapLayerControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className={cn("pointer-events-auto", className)}
    >
      <GlassPanel glow="emerald" border="gradient" className="p-3">
        <div className="mb-2 flex items-center gap-2 px-1">
          <Layers className="h-3.5 w-3.5 text-emerald-400" />
          <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-muted">
            Intelligence Layers
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {MAP_LAYERS.map((layer) => {
            const active = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => onLayerChange(layer.id)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                  active
                    ? "bg-emerald-500/12 text-foreground shadow-[inset_0_0_0_1px_rgba(52,211,153,0.25)]"
                    : "text-foreground-muted hover:bg-[color:var(--color-surface-2)] hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200",
                    active && "scale-125",
                  )}
                  style={{ backgroundColor: layer.color, boxShadow: active ? `0 0 10px ${layer.color}` : undefined }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{layer.label}</span>
                  <span className="block text-[10px] opacity-70">{layer.description}</span>
                </span>
                {active ? (
                  <motion.span
                    layoutId="layer-active-indicator"
                    className="absolute right-2 h-1.5 w-1.5 rounded-full bg-emerald-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
