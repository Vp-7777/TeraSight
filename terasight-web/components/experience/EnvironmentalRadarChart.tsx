"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";

const AXES = [
  { label: "Plastic", value: 0.82 },
  { label: "Industrial", value: 0.64 },
  { label: "Organic", value: 0.48 },
  { label: "Flood Risk", value: 0.71 },
  { label: "Carbon", value: 0.38 },
  { label: "Recovery", value: 0.55 },
];

function polarPoint(index: number, total: number, radius: number, cx: number, cy: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

export function EnvironmentalRadarChart() {
  const cx = 100;
  const cy = 100;
  const maxR = 72;
  const n = AXES.length;

  const dataPoints = AXES.map((axis, i) => {
    const p = polarPoint(i, n, maxR * axis.value, cx, cy);
    return `${p.x},${p.y}`;
  }).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <GlassPanel glow="emerald" className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Environmental Radar</p>
          <p className="text-xs text-foreground-muted">Pan-India threat signature</p>
        </div>
        <span className="text-xs text-amber-400">Elevated</span>
      </div>
      <svg viewBox="0 0 200 200" className="mx-auto h-48 w-full max-w-[220px]">
        {gridLevels.map((level) => {
          const pts = AXES.map((_, i) => {
            const p = polarPoint(i, n, maxR * level, cx, cy);
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={pts}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}
        {AXES.map((axis, i) => {
          const p = polarPoint(i, n, maxR, cx, cy);
          return (
            <g key={axis.label}>
              <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" />
              <text
                x={polarPoint(i, n, maxR + 14, cx, cy).x}
                y={polarPoint(i, n, maxR + 14, cx, cy).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground-muted text-[8px]"
              >
                {axis.label}
              </text>
            </g>
          );
        })}
        <motion.polygon
          points={dataPoints}
          fill="rgba(16,185,129,0.2)"
          stroke="#34d399"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
    </GlassPanel>
  );
}
