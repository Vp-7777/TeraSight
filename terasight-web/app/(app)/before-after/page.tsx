"use client";

/**
 * before-after/page.tsx
 *
 * This page implements an interactive split-screen before & after visual swiper.
 * It lets users select a monitoring site, choose a scan date, drag a swiper handle
 * to compare restoration stages, and view comparative telemetry analysis.
 *
 * Designed and implemented for: Vishal
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight,
  TrendingDown,
  Trash2,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mapSites } from "@/lib/data/intelligence-mock";
import { formatInr } from "@/lib/data/india-demo";
import { cn } from "@/lib/utils";

export default function BeforeAfterPage() {
  // [Vishal] Track selected site and active swiper range position
  const [selectedSiteId, setSelectedSiteId] = useState(mapSites[0].id);
  const [sliderPos, setSliderPos] = useState(50);
  const [activeScanIndex, setActiveScanIndex] = useState(0);

  const selectedSite = useMemo(() => {
    return mapSites.find((s) => s.id === selectedSiteId) ?? mapSites[0];
  }, [selectedSiteId]);

  // [Vishal] Map before/after mock parameters from selectedSite data
  const beforeSnapshot = useMemo(() => {
    return selectedSite.beforeAfter.find((s) => s.tone === "before") || {
      label: "Baseline Survey",
      period: "Jan 2026",
      wasteKg: selectedSite.wasteKg * 1.3,
      coveragePct: 75,
    };
  }, [selectedSite]);

  const afterSnapshot = useMemo(() => {
    return selectedSite.beforeAfter.find((s) => s.tone === "after") || {
      label: "Post Clearance",
      period: selectedSite.lastScanAt.split(",")[0],
      wasteKg: selectedSite.wasteKg,
      coveragePct: 15,
    };
  }, [selectedSite]);

  // ERI calculation mappings
  const beforeEri = Math.round(selectedSite.risk * 1.25);
  const afterEri = Math.round(selectedSite.risk * 0.25);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Title & Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-emerald-400" />
            <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">Visual Audits</p>
          </div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl mt-0.5">Restoration Before & After</h1>
          <p className="text-xs text-foreground-muted">Compare site conditions over time and audit environmental cleaning impact.</p>
        </div>

        {/* Site Selection Input */}
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-foreground-muted" />
          <select
            value={selectedSiteId}
            onChange={(e) => {
              setSelectedSiteId(e.target.value);
              setActiveScanIndex(0);
              setSliderPos(50);
            }}
            className="rounded-lg border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-3 py-1.5 text-xs text-foreground outline-none focus:border-emerald-500/30 cursor-pointer"
          >
            {mapSites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.city} ({site.label})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        
        {/* Swiper Interactive Component */}
        <div className="flex flex-col gap-4">
          <GlassPanel glow="emerald" className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)]/60 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-400" />
                <p className="text-xs font-semibold">Visual Telemetry Swiper</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
                <span>Before</span>
                <span className="w-6 h-3 bg-gradient-to-r from-rose-500/40 to-emerald-500/40 rounded-full flex items-center p-0.5">
                  <span className="h-2 w-2 rounded-full bg-white transition-transform" style={{ transform: `translateX(${sliderPos > 50 ? '12px' : '0px'})` }} />
                </span>
                <span>After</span>
              </div>
            </div>

            {/* Split Swiper Box */}
            <div className="relative w-full h-[400px] md:h-[450px] rounded-xl overflow-hidden select-none border border-[color:var(--color-border-1)] bg-[#070912]">
              
              {/* Before View (Background) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-950/40 via-[#0a0c16] to-[#05060b] flex flex-col justify-between p-6">
                {/* Tech HUD indicators */}
                <div className="flex justify-between items-start z-0 opacity-40">
                  <div className="text-[9px] font-mono text-rose-400">
                    <p>SCAN ID: R-9021</p>
                    <p>COORD: {selectedSite.lat.toFixed(4)}N, {selectedSite.lng.toFixed(4)}E</p>
                  </div>
                  <Badge variant="danger" className="text-[8px] animate-pulse">CONTAMINATED</Badge>
                </div>

                {/* Center Target overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="h-48 w-48 rounded-full border border-rose-500 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute h-10 w-10 border-t border-l border-rose-500 top-1/2 left-1/2 -translate-x-12 -translate-y-12" />
                  <div className="absolute h-10 w-10 border-b border-r border-rose-500 top-1/2 left-1/2 translate-x-2 translate-y-2" />
                </div>

                {/* Floating Mock Waste Nodes */}
                <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <div className="absolute top-1/2 left-1/3 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_red]" />
                <div className="absolute top-2/3 left-1/2 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <div className="absolute top-1/4 left-2/3 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_red]" />

                <div className="z-10 mt-auto">
                  <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase">Baseline Survey</span>
                  <h3 className="text-xl font-bold text-rose-400 mt-0.5">{beforeSnapshot.period}</h3>
                  <p className="text-xs text-rose-400/80 mt-1 max-w-[240px]">
                    ERI {beforeEri} · Estimated {beforeSnapshot.wasteKg} tons raw waste deposits.
                  </p>
                </div>
              </div>
              
              {/* After View (Width Clipped Overlay) */}
              <div 
                className="absolute inset-0 h-full overflow-hidden bg-gradient-to-br from-emerald-950/40 via-[#0a0c16] to-[#05060b] flex flex-col justify-between p-6 border-r border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Fixed width content wrapper to prevent visual squishing */}
                <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between min-w-[320px] md:min-w-[500px]">
                  
                  {/* Tech HUD indicators */}
                  <div className="flex justify-between items-start z-0 opacity-40">
                    <div className="text-[9px] font-mono text-emerald-400">
                      <p>SCAN ID: R-9021</p>
                      <p>STATUS: RESTORED</p>
                    </div>
                    <Badge variant="success" className="text-[8px] animate-pulse">SECURE</Badge>
                  </div>

                  {/* Center Target overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="h-48 w-48 rounded-full border border-emerald-500 flex items-center justify-center animate-spin" style={{ animationDuration: '60s' }} />
                    <div className="absolute h-10 w-10 border-t border-l border-emerald-500 top-1/2 left-1/2 -translate-x-12 -translate-y-12" />
                    <div className="absolute h-10 w-10 border-b border-r border-emerald-500 top-1/2 left-1/2 translate-x-2 translate-y-2" />
                  </div>

                  {/* Floating Cleared Nodes */}
                  <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-emerald-400/30" />
                  <div className="absolute top-1/2 left-1/3 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <div className="absolute top-2/3 left-1/2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <div className="absolute top-1/4 left-2/3 h-1.5 w-1.5 rounded-full bg-emerald-400/30" />

                  <div className="z-10 mt-auto">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Post Restoration</span>
                    <h3 className="text-xl font-bold text-emerald-400 mt-0.5">{afterSnapshot.period}</h3>
                    <p className="text-xs text-emerald-400/80 mt-1 max-w-[240px]">
                      ERI {afterEri} · Estimated {afterSnapshot.wasteKg} tons residual metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Swiper Slider Bar Handle */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-emerald-500/80 cursor-ew-resize flex items-center justify-center z-20 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="h-8 w-5 rounded-md bg-emerald-500 border border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.6)] flex flex-col justify-center items-center gap-0.5 pointer-events-none">
                  <span className="h-2 w-0.5 bg-white/70" />
                  <span className="h-2 w-0.5 bg-white/70" />
                </div>
              </div>

              {/* Transparent Slider Input covering the swiper to track drag gestures */}
              <input 
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>
            <p className="text-[10px] text-foreground-muted text-center italic mt-1">Drag anywhere on the scan image box to adjust before vs after comparison slider.</p>
          </GlassPanel>
        </div>

        {/* Audit Metrics Panel */}
        <div className="flex flex-col gap-6">
          <GlassPanel glow="emerald" className="p-5 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-3">Restoration Audit Metrics</p>
              <h2 className="text-lg font-bold">{selectedSite.label}</h2>
              <p className="text-xs text-foreground-muted mt-1">{selectedSite.description}</p>
              
              <div className="mt-6 space-y-4">
                {/* ERI Reduction bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground-muted">Environmental Risk Index (ERI)</span>
                    <span className="text-emerald-400">-{beforeEri - afterEri} pts ({Math.round(((beforeEri - afterEri)/beforeEri)*100)}% reduction)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 rounded-full bg-[color:var(--color-surface-2)] overflow-hidden flex">
                      <div className="h-full bg-rose-500" style={{ width: `${(beforeEri / 120) * 100}%` }} title="Before" />
                      <div className="h-full bg-emerald-500" style={{ width: `${(afterEri / 120) * 100}%` }} title="After" />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground-muted font-mono">
                    <span>Baseline ERI: {beforeEri}</span>
                    <span>Restored ERI: {afterEri}</span>
                  </div>
                </div>

                {/* Waste Cleared telemetry */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3">
                    <div className="flex items-center gap-1 text-foreground-muted">
                      <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                      <span className="text-[9px] uppercase tracking-wide">Initial Waste</span>
                    </div>
                    <p className="mt-1 text-lg font-bold tabular-nums text-rose-400">{beforeSnapshot.wasteKg} t</p>
                    <p className="text-[9px] text-foreground-muted mt-0.5">Scan Area Coverage: {beforeSnapshot.coveragePct}%</p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] p-3">
                    <div className="flex items-center gap-1 text-foreground-muted">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[9px] uppercase tracking-wide">Current Residual</span>
                    </div>
                    <p className="mt-1 text-lg font-bold tabular-nums text-emerald-400">{afterSnapshot.wasteKg} t</p>
                    <p className="text-[9px] text-foreground-muted mt-0.5">Scan Area Coverage: {afterSnapshot.coveragePct}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary timeline */}
            <div className="border-t border-[color:var(--color-border-1)] pt-4 mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Impact Assessment</span>
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 leading-relaxed">
                Cleanup operations managed by <strong className="text-foreground">{selectedSite.mission.team}</strong> cleared approximately <strong className="text-foreground">{(beforeSnapshot.wasteKg - afterSnapshot.wasteKg).toFixed(1)} tons</strong> of waste. This generated carbon credit potential and reduced local environmental risk indices by over 70%.
              </p>
              
              <div className="mt-4 flex items-center justify-between gap-2 text-[10px] text-foreground-muted font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Start: {beforeSnapshot.period}</span>
                </div>
                <ArrowRight className="h-3 w-3" />
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-400" />
                  <span>Review: {afterSnapshot.period}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
