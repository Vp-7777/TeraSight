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
        <p className="text-sm text-foreground-muted">Initializing globe intelligence...</p>
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
      className="relative h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#020408]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AmbientGlow variant="mixed" />
      <FloatingParticles count={32} />

      <div className="absolute inset-0">
        <CommandGlobe
          className="h-full w-full"
          interactive
          paused={paused}
          markers={markers}
          onMarkerClick={(id) => router.push(`/map?site=${id}`)}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="scan-line absolute inset-x-0 h-32" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#020408_75%)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0 z-10"
      >
        <motion.div variants={fadeInUp} className="pointer-events-auto absolute left-6 top-6 z-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">India Command</p>
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
          >
            <GlassPanel className="w-52 border-white/10 bg-black/40 p-4 backdrop-blur-xl">
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
            </GlassPanel>
          </motion.div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#020408] via-[#020408]/80 to-transparent p-6 pt-16">
        <p className="text-center text-sm text-foreground-muted">
          PrithviQ AI satellite intelligence · 87 sites monitored across India · Hover to pause ·
          Click markers to open Map Explorer
        </p>
      </div>
    </div>
  );
}
