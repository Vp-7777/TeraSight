"use client";

/**
 * cost/page.tsx
 *
 * This page implements the Cleanup Cost Estimation and resource allocator.
 * It provides detailed operational cost indicators (labor, transport, hazard surcharges),
 * dynamic resource allocation sliders (workers, drones, trucks) scaling time/budget,
 * and a futuristic operations team dispatch command board.
 *
 * Designed and implemented for: Vishal
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CircleDollarSign, 
  Settings, 
  Users, 
  Truck, 
  Navigation, 
  X,
  Zap,
  TrendingDown,
  DollarSign,
  Briefcase,
  FileSpreadsheet,
  FileCheck
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mapSites } from "@/lib/data/intelligence-mock";
import { formatInr } from "@/lib/data/india-demo";
import { cn } from "@/lib/utils";

export default function CostPage() {
  // [Vishal] Track selected site and resource allocation sliders
  const [selectedSiteId, setSelectedSiteId] = useState(mapSites[0].id);
  const [workers, setWorkers] = useState(15); // range: 5 to 50
  const [drones, setDrones] = useState(3);     // range: 1 to 10
  const [trucks, setTrucks] = useState(2);     // range: 1 to 5
  
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchStage, setDispatchStage] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);

  const selectedSite = useMemo(() => {
    return mapSites.find((s) => s.id === selectedSiteId) ?? mapSites[0];
  }, [selectedSiteId]);

  // [Vishal] Dynamic budget and timeline calculations scaling based on resource sliders
  const calculations = useMemo(() => {
    // Base cost mapping from site database baseline
    const baseCost = selectedSite.cleanupCostInr;
    
    // Resource costs
    const workerDayRate = 800; // INR per worker per day
    const droneDayRate = 4500;  // INR per drone per day
    const truckDayRate = 12000; // INR per truck per day (including fuel)
    
    // AI Efficiency factor scaling: more drones & workers reduce cleanup time
    // Baseline is 15 workers, 3 drones, 2 trucks = 1.0 scaling factor
    const workerFactor = 15 / workers;
    const droneFactor = 3 / drones;
    const truckFactor = 2 / trucks;
    
    // Dynamic cleanup time (days)
    const baseDays = 14; // baseline days for typical site
    const estimatedDays = Math.max(2, Math.round(baseDays * (workerFactor * 0.4 + droneFactor * 0.4 + truckFactor * 0.2)));
    
    // Dynamic cost summation
    const laborCost = workers * workerDayRate * estimatedDays;
    const equipmentCost = (drones * droneDayRate + trucks * truckDayRate) * estimatedDays;
    const administrativeCost = Math.round(baseCost * 0.08); // 8% fixed admin overhead
    const hazardSurcharge = selectedSite.status === "Critical" ? 350000 : selectedSite.status === "High" ? 150000 : 50000;
    
    const totalCost = baseCost + laborCost + equipmentCost + administrativeCost + hazardSurcharge;

    return {
      estimatedDays,
      laborCost,
      equipmentCost,
      administrativeCost,
      hazardSurcharge,
      totalCost,
    };
  }, [selectedSite, workers, drones, trucks]);

  const handleStartDispatch = () => {
    setIsDispatching(true);
    setDispatchStage(0);

    const interval = setInterval(() => {
      setDispatchStage(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDispatching(false);
            setShowReceipt(true);
          }, 800);
          return 4;
        }
        return prev + 1;
      });
    }, 800);
  };

  const getDispatchMessage = (stage: number) => {
    switch (stage) {
      case 0: return "Syncing GPS waypoints with target site...";
      case 1: return "Plotting optimized fuel-routing coordinates...";
      case 2: return "Locking drone flight grid boundaries...";
      case 3: return "Securing field operations budget allocations...";
      default: return "Deployment parameters verified!";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Title & Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-emerald-400" />
            <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">Operations Control</p>
          </div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl mt-0.5">Cleanup Cost Planner</h1>
          <p className="text-xs text-foreground-muted">Model resource constraints, estimate budgets, and dispatch recovery personnel.</p>
        </div>

        {/* Site Selection Input */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-muted">Site Target:</span>
          <select
            value={selectedSiteId}
            onChange={(e) => {
              setSelectedSiteId(e.target.value);
              setWorkers(15);
              setDrones(3);
              setTrucks(2);
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

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        
        {/* Sliders Input Control Board */}
        <div className="flex flex-col gap-6">
          <GlassPanel glow="emerald" className="p-5 space-y-6">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] pb-3">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                <p className="text-xs font-semibold">AI Resource Allocation Panel</p>
              </div>
              <Badge variant="ai" className="text-[9px]">Calculates optimal fleet allocation</Badge>
            </div>

            {/* Workers count slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <Users className="h-4 w-4 text-sky-400" />
                  Field Personnel Count
                </span>
                <span className="font-semibold">{workers} workers</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={workers} 
                  onChange={(e) => setWorkers(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 bg-[color:var(--color-surface-2)] h-2 rounded-lg cursor-pointer outline-none"
                />
              </div>
              <p className="text-[10px] text-foreground-muted/70">Estimated rate: ₹800 / day per labor node</p>
            </div>

            {/* Drones count slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <Navigation className="h-4 w-4 text-emerald-400" />
                  Autonomous Survey Drones
                </span>
                <span className="font-semibold">{drones} drones</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={drones} 
                  onChange={(e) => setDrones(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 bg-[color:var(--color-surface-2)] h-2 rounded-lg cursor-pointer outline-none"
                />
              </div>
              <p className="text-[10px] text-foreground-muted/70">Estimated rate: ₹4,500 / day per drone lease</p>
            </div>

            {/* Trucks count slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-foreground-muted">
                  <Truck className="h-4 w-4 text-purple-400" />
                  Debris Recovery Vehicles
                </span>
                <span className="font-semibold">{trucks} trucks</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={trucks} 
                  onChange={(e) => setTrucks(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 bg-[color:var(--color-surface-2)] h-2 rounded-lg cursor-pointer outline-none"
                />
              </div>
              <p className="text-[10px] text-foreground-muted/70">Estimated rate: ₹12,000 / day per vehicle (including fuel)</p>
            </div>
          </GlassPanel>

          {/* Detailed Budget Itemization Ledger */}
          <GlassPanel glow="blue" className="p-5">
            <p className="text-[10px] uppercase tracking-wider text-sky-400 font-semibold mb-4">Estimated Budget Itemization</p>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-foreground-muted">
                <span>Baseline Site Clearing Cost</span>
                <span className="font-mono">{formatInr(selectedSite.cleanupCostInr)}</span>
              </div>
              <div className="flex justify-between items-center text-foreground-muted">
                <span>Direct Field Personnel Labor</span>
                <span className="font-mono">{formatInr(calculations.laborCost)}</span>
              </div>
              <div className="flex justify-between items-center text-foreground-muted">
                <span>Equipment Rental (Drones & Transport Fleet)</span>
                <span className="font-mono">{formatInr(calculations.equipmentCost)}</span>
              </div>
              <div className="flex justify-between items-center text-foreground-muted">
                <span>Hazardous Material Treatment Surcharge</span>
                <span className="font-mono">{formatInr(calculations.hazardSurcharge)}</span>
              </div>
              <div className="flex justify-between items-center text-foreground-muted border-b border-[color:var(--color-border-1)]/60 pb-3">
                <span>Administrative Oversight & Compliance (8%)</span>
                <span className="font-mono">{formatInr(calculations.administrativeCost)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-sm text-foreground pt-1.5">
                <span>TOTAL PROJECT ESTIMATION</span>
                <span className="font-mono text-emerald-400">{formatInr(calculations.totalCost)}</span>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Dynamic Timeline results and Dispatch trigger */}
        <div className="flex flex-col gap-6">
          <GlassPanel glow="emerald" className="p-5 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-3">Timeline Projections</p>
                <h2 className="text-lg font-bold">Projected Schedule Impact</h2>
                <p className="text-xs text-foreground-muted mt-1">AI models calculate completion rates based on resource density coefficients.</p>
              </div>

              {/* Big Days Indicator */}
              <div className="flex items-center gap-4 bg-[color:var(--color-surface-1)] border border-[color:var(--color-border-1)] rounded-2xl p-5">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/12 flex items-center justify-center text-emerald-300">
                  <Zap className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold tracking-tight tabular-nums text-emerald-400">{calculations.estimatedDays} Days</p>
                  <p className="text-[10px] text-foreground-muted">Estimated operational cleanup window</p>
                </div>
              </div>

              {/* Slider comparative insights */}
              <div className="text-xs text-foreground-muted leading-relaxed space-y-2">
                <p>
                  Deploying <strong className="text-foreground">{workers} personnel</strong> and <strong className="text-foreground">{drones} drones</strong> creates an optimal cleaning density of <strong className="text-foreground">{(workers / calculations.estimatedDays).toFixed(1)} operations/day</strong>.
                </p>
                <p>
                  By optimizing paths for <strong className="text-foreground">{trucks} transport trucks</strong>, fuel consumption emissions are reduced by 14% relative to standard routing models.
                </p>
              </div>
            </div>

            {/* Action dispatch button */}
            <div className="border-t border-[color:var(--color-border-1)] pt-5 mt-6">
              <Button 
                onClick={handleStartDispatch}
                disabled={isDispatching}
                className="w-full py-5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.35)] transition duration-200"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Dispatch Recovery Team
              </Button>
              <p className="text-[9px] text-foreground-muted text-center italic mt-2">Triggering dispatch registers operations orders and uploads route vectors to vehicles.</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Cryptographic Dispatching Overlay Modal */}
      <AnimatePresence>
        {isDispatching && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <GlassPanel glow="emerald" className="p-6 text-center space-y-6">
                <div className="flex items-center justify-center">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-20" />
                    <div className="relative rounded-full bg-emerald-500/15 p-4 border border-emerald-500/30">
                      <Navigation className="h-8 w-8 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold">Filing Dispatch Operations</h3>
                  <p className="text-xs text-foreground-muted">Sending routing variables to SMC Environmental Command units.</p>
                </div>

                {/* Animated status text */}
                <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[#070912] p-4 text-left">
                  <div className="font-mono text-[10px] text-emerald-400 space-y-1">
                    <p className="text-foreground-muted">&gt; Accessing satellite routing vectors...</p>
                    {dispatchStage >= 1 && <p>&gt; Connection secure. Exposing vehicle API...</p>}
                    {dispatchStage >= 2 && <p>&gt; Validating crew manifests... verified.</p>}
                    {dispatchStage >= 3 && <p className="text-sky-400">&gt; Committing dispatch tokens...</p>}
                    <div className="text-[11px] text-foreground font-semibold mt-3 animate-pulse">
                      {getDispatchMessage(dispatchStage)}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dispatch Receipt Modal */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-md"
            >
              <GlassPanel glow="emerald" className="p-1 overflow-hidden">
                <div className="border border-emerald-500/20 rounded-[var(--radius-lg)] p-6 bg-gradient-to-br from-[#070912]/95 to-[#05060b]/98 space-y-5">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start border-b border-emerald-500/20 pb-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-emerald-400" />
                      <div>
                        <h2 className="text-xs font-bold font-mono text-foreground tracking-wide">DISPATCH INVOICE RECEIPT</h2>
                        <p className="text-[9px] text-foreground-muted font-mono">OPERATIONS COMMAND ORDER VERIFIED</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowReceipt(false)}
                      className="text-foreground-muted hover:text-foreground transition p-1 rounded-lg hover:bg-[color:var(--color-surface-2)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Receipt Statement */}
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-foreground-muted uppercase text-[9px]">Project Name</p>
                      <p className="font-semibold text-foreground">{selectedSite.mission.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-foreground-muted uppercase text-[9px]">Assigned Team</p>
                        <p className="font-semibold text-foreground">{selectedSite.mission.team}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-foreground-muted uppercase text-[9px]">Target Site</p>
                        <p className="font-semibold text-foreground">{selectedSite.city}, India</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-y border-emerald-500/15 py-3 text-center">
                      <div className="space-y-0.5">
                        <p className="text-foreground-muted text-[8px] uppercase">Workers</p>
                        <p className="font-bold text-foreground text-sm">{workers}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-foreground-muted text-[8px] uppercase">Drones</p>
                        <p className="font-bold text-foreground text-sm">{drones}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-foreground-muted text-[8px] uppercase">Trucks</p>
                        <p className="font-bold text-foreground text-sm">{trucks}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-foreground-muted">
                        <span>Project Duration</span>
                        <span className="font-semibold text-foreground">{calculations.estimatedDays} Days</span>
                      </div>
                      <div className="flex justify-between items-center text-foreground-muted">
                        <span>Estimated Cost</span>
                        <span className="font-bold text-emerald-400">{formatInr(calculations.totalCost)}</span>
                      </div>
                    </div>

                    {/* Operational Hash */}
                    <div className="bg-[#05060b] rounded-lg p-3 text-[9px] font-mono text-emerald-400 border border-emerald-500/10 select-all break-all">
                      <p className="text-foreground-muted"><span className="font-semibold">DISPATCH REFERENCE IDENTIFIER:</span></p>
                      <p>DSP-{(Math.random()*1000000).toFixed(0)}-{selectedSite.id.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-[color:var(--color-border-1)]/60">
                    <Button variant="secondary" size="sm" onClick={() => window.print()} className="h-8 text-[11px]">
                      Download PDF
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => setShowReceipt(false)} className="h-8 text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white">
                      Close
                    </Button>
                  </div>

                </div>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
