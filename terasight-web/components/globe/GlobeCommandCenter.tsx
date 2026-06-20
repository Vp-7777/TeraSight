"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Globe2, Map, Radio, Satellite, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import type { GlobeMarker } from "@/components/three/CommandGlobe";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { indianMapSites } from "@/lib/data/india-demo";
import { globeMetrics } from "@/lib/data/intelligence-mock";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const CommandGlobe = dynamic(() => import("@/components/three/CommandGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-12 w-12 rounded-full skeleton-shimmer" />
        <p className="text-sm text-foreground-muted">Initializing planetary intelligence...</p>
      </div>
    </div>
  ),
});

const cardPositions = [
  "left-6 top-24 md:left-10",
  "right-6 top-32 md:right-12",
  "left-8 bottom-32 md:left-16",
  "right-10 bottom-24 md:right-20",
];

export function GlobeCommandCenter() {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const markers: GlobeMarker[] = useMemo(
    () =>
      indianMapSites.map((site) => ({
        id: site.id,
        lat: site.lat,
        lng: site.lng,
        label: site.label,
        risk: site.risk,
      })),
    [],
  );

  return (
    <div
      className="relative h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden rounded-2xl border border-[color:var(--color-border-1)] bg-[#020408]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(56,189,248,0.06),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, transparent 20%, #020408 70%)",
            transform: paused ? "scale(1.02)" : "scale(1)",
            transition: "transform 1.2s ease",
          }}
        />
      </div>

      <AmbientGlow variant="mixed" />
      <FloatingParticles count={40} />

      <div className="absolute inset-0">
        <CommandGlobe
          className="h-full w-full"
          interactive
          paused={paused}
          markers={markers}
          onMarkerClick={(id) => router.push(`/map?site=${id}`)}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <div className="scan-line absolute inset-x-0 h-32" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_#020408_78%)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0 z-10"
      >
        <motion.div variants={fadeInUp} className="pointer-events-auto absolute left-6 top-6 z-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-[color:var(--color-nav-active-text)]">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Planetary Intelligence</p>
              <h1 className="text-xl font-semibold text-white">Environmental Intelligence Globe</h1>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="pointer-events-auto absolute right-6 top-6 z-20 flex gap-2">
          <Badge variant="ai">
            <Radio className="mr-1 h-3 w-3" />
            {paused ? "Paused" : "Live Scan"}
          </Badge>
          <Link href="/map">
            <Button variant="secondary" size="sm">
              <Map className="mr-1 h-3.5 w-3.5" />
              Map Explorer
            </Button>
          </Link>
        </motion.div>

        {globeMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            variants={fadeInUp}
            className={`pointer-events-auto absolute z-20 ${cardPositions[index]}`}
            onHoverStart={() => setHoveredMetric(metric.id)}
            onHoverEnd={() => setHoveredMetric(null)}
          >
            <motion.div
              animate={{
                y: hoveredMetric === metric.id ? -6 : 0,
                scale: hoveredMetric === metric.id ? 1.03 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <GlassPanel
                glow={hoveredMetric === metric.id ? "emerald" : "none"}
                border="gradient"
                className="w-52 border-[color:var(--color-border-1)] bg-[color:var(--color-surface-2)]/70 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground-muted">{metric.label}</p>
                  <Satellite className="h-3.5 w-3.5 text-sky-400/60" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p
                  className={`mt-1 flex items-center gap-1 text-xs ${
                    metric.positive ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" />
                  {metric.change}
                </p>
                {hoveredMetric === metric.id ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 border-t border-[color:var(--color-border-1)] pt-2 text-[10px] text-foreground-muted"
                  >
                    Satellite pass · Updated 4 min ago
                  </motion.div>
                ) : null}
              </GlassPanel>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#020408] via-[#020408]/80 to-transparent p-6 pt-16">
        <p className="text-center text-sm text-foreground-muted">
          PrithviQ AI planetary intelligence · 7 priority sites · Satellite orbits active · Click markers
          for Map Explorer
        </p>
      </div>
    </div>
  );
}
