"use client";

/**
 * carbon/page.tsx
 *
 * This page implements the Carbon Sequestration Recovery Registry.
 * It provides cumulative ESG impact counters (CO2 equivalents saved, trees planted),
 * verified carbon credit registries, and a cryptographic credit tokenization certificate minting portal.
 *
 * Designed and implemented for: Vishal
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Download, 
  ShieldCheck, 
  Coins, 
  X,
  FileText,
  FileDown,
  Building,
  Calendar
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mapSites } from "@/lib/data/intelligence-mock";
import { cn } from "@/lib/utils";

interface RegistryRecord {
  id: string;
  siteLabel: string;
  city: string;
  wasteRemovedKg: number;
  carbonSavedKg: number;
  date: string;
  tokenized: boolean;
  txHash?: string;
}

export default function CarbonPage() {
  // [Vishal] Track lists of carbon offset records and modal states
  const [records, setRecords] = useState<RegistryRecord[]>(() => 
    mapSites.map((site, i) => ({
      id: site.id,
      siteLabel: site.label,
      city: site.city,
      wasteRemovedKg: site.mission.wasteRemovedKg,
      carbonSavedKg: Math.round(site.mission.wasteRemovedKg * (site.carbonRecoveryPct / 100) * 2.2),
      date: site.lastScanAt.split(",")[0],
      tokenized: i < 2, // pre-tokenize first 2 for demonstration
      txHash: i < 2 ? `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}` : undefined,
    }))
  );

  const [activeRecord, setActiveRecord] = useState<RegistryRecord | null>(null);
  const [tokenizingId, setTokenizingId] = useState<string | null>(null);
  const [tokenizationStage, setTokenizationStage] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Aggregates
  const totalCarbonSaved = useMemo(() => 
    records.reduce((acc, curr) => acc + curr.carbonSavedKg, 0),
    [records]
  );

  const totalTokenized = useMemo(() => 
    records.filter(r => r.tokenized).reduce((acc, curr) => acc + curr.carbonSavedKg, 0),
    [records]
  );

  const handleStartTokenization = (record: RegistryRecord) => {
    setActiveRecord(record);
    setTokenizingId(record.id);
    setTokenizationStage(0);
    
    // Animate stage messages simulating cryptographic ledger writes
    const interval = setInterval(() => {
      setTokenizationStage(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          // Update record state as tokenized
          setRecords(prevRecs => prevRecs.map(r => {
            if (r.id === record.id) {
              return {
                ...r,
                tokenized: true,
                txHash: `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`
              };
            }
            return r;
          }));
          setTimeout(() => {
            setTokenizingId(null);
            setShowCertificate(true);
          }, 800);
          return 4;
        }
        return prev + 1;
      });
    }, 700);
  };

  const getStageMessage = (stage: number) => {
    switch (stage) {
      case 0: return "Verifying carbon recovery mass balances...";
      case 1: return "Signing verified ESG validation tokens...";
      case 2: return "Executing cryptographic carbon registry block write...";
      case 3: return "Minting compliance proof keys...";
      default: return "Verification complete!";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Title & Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-emerald-400" />
          <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">ESG & Compliance</p>
        </div>
        <h1 className="text-xl font-bold tracking-tight md:text-2xl mt-0.5">Carbon Recovery Registry</h1>
        <p className="text-xs text-foreground-muted">Tokenize carbon credits, track ecological offsets, and audit verified ESG benchmarks.</p>
      </div>

      {/* Grid of ESG equivalencies stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel glow="emerald" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Leaf className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">Total CO2 Recovered</span>
            </div>
            <p className="text-3xl font-extrabold mt-2 tracking-tight tabular-nums text-emerald-400">
              {totalCarbonSaved.toLocaleString()} kg
            </p>
          </div>
          <p className="text-[10px] text-foreground-muted mt-3">Verified carbon offsets calculated across all monitored municipal sites.</p>
        </GlassPanel>

        <GlassPanel glow="blue" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Coins className="h-4.5 w-4.5 text-sky-400" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">Tokenized Credits</span>
            </div>
            <p className="text-3xl font-extrabold mt-2 tracking-tight tabular-nums text-sky-400">
              {totalTokenized.toLocaleString()} kg
            </p>
          </div>
          <p className="text-[10px] text-foreground-muted mt-3">Offsets minted into verified, non-fungible ESG compliance certificates.</p>
        </GlassPanel>

        <GlassPanel glow="emerald" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Sparkles className="h-4.5 w-4.5 text-purple-400" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">ESG Sequestration Equivalence</span>
            </div>
            <p className="text-3xl font-extrabold mt-2 tracking-tight tabular-nums text-purple-400">
              {Math.round(totalCarbonSaved / 22)} trees/yr
            </p>
          </div>
          <p className="text-[10px] text-foreground-muted mt-3">Equivalent yearly carbon capture of mature tropical hardwood trees.</p>
        </GlassPanel>
      </div>

      {/* Main Registry Table */}
      <GlassPanel glow="emerald" className="p-6">
        <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">Verified Carbon Offset Ledgers</p>
          </div>
          <Badge variant="ai" className="text-[9px]">Audited via PrithviQ AI</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[color:var(--color-border-1)]/60 text-foreground-muted font-medium">
                <th className="py-3 px-4">Site Name</th>
                <th className="py-3 px-4">Clearance Date</th>
                <th className="py-3 px-4">Waste Cleared</th>
                <th className="py-3 px-4">CO2 Saved</th>
                <th className="py-3 px-4">Ledger Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border-1)]/40">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-[color:var(--color-surface-1)]/20 transition">
                  <td className="py-3.5 px-4 font-semibold">{record.siteLabel} ({record.city})</td>
                  <td className="py-3.5 px-4 text-foreground-muted font-mono">{record.date}</td>
                  <td className="py-3.5 px-4 tabular-nums">{record.wasteRemovedKg.toLocaleString()} kg</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400 tabular-nums">{record.carbonSavedKg.toLocaleString()} kg</td>
                  <td className="py-3.5 px-4">
                    {record.tokenized ? (
                      <Badge variant="success" className="text-[9px] flex items-center gap-1 w-fit font-mono">
                        <ShieldCheck className="h-3 w-3" />
                        MINTED
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="text-[9px] flex items-center gap-1 w-fit">
                        PENDING MINT
                      </Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {record.tokenized ? (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-7 text-[10px] px-2.5"
                        onClick={() => {
                          setActiveRecord(record);
                          setShowCertificate(true);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1 text-sky-400" />
                        View Cert
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="h-7 text-[10px] px-2.5 bg-emerald-500/12 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30"
                        disabled={tokenizingId !== null}
                        onClick={() => handleStartTokenization(record)}
                      >
                        <Coins className="h-3 w-3 mr-1 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                        Tokenize Offset
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* Cryptographic Processing Modal Backdrop */}
      <AnimatePresence>
        {tokenizingId !== null && activeRecord && (
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
                      <ShieldCheck className="h-8 w-8 text-emerald-400 animate-bounce" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold">Ledger Writing in Progress</h3>
                  <p className="text-xs text-foreground-muted">Tokenizing {activeRecord.carbonSavedKg.toLocaleString()} kg offset credit generated at {activeRecord.city}.</p>
                </div>

                {/* Animated status text */}
                <div className="rounded-xl border border-[color:var(--color-border-1)] bg-[#070912] p-4 text-left">
                  <div className="font-mono text-[10px] text-emerald-400 space-y-1">
                    <p className="text-foreground-muted">&gt; Connecting to node...</p>
                    {tokenizationStage >= 1 && <p>&gt; Connection secure. Fetching payload...</p>}
                    {tokenizationStage >= 2 && <p>&gt; Validating mass parameters... verified.</p>}
                    {tokenizationStage >= 3 && <p className="text-sky-400">&gt; Writing block code payload...</p>}
                    <div className="text-[11px] text-foreground font-semibold mt-3 animate-pulse">
                      {getStageMessage(tokenizationStage)}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Carbon Offset Certificate Modal */}
      <AnimatePresence>
        {showCertificate && activeRecord && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-xl"
            >
              <GlassPanel glow="blue" className="p-1 overflow-hidden relative">
                
                {/* Certificate Background Elements */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="grid-bg h-full w-full" />
                </div>

                {/* Border Layout */}
                <div className="border border-sky-500/25 rounded-[var(--radius-lg)] p-6 md:p-8 space-y-6 bg-gradient-to-br from-[#0c1020]/90 to-[#05060b]/95">
                  
                  {/* Certificate Top Header */}
                  <div className="flex justify-between items-start border-b border-sky-500/20 pb-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                      <div>
                        <h2 className="text-sm font-bold text-foreground tracking-wide font-mono">PRITHVIQ ESG REGISTRY</h2>
                        <p className="text-[9px] text-foreground-muted font-mono">VERIFIABLE OFFSET COMPLIANCE SECURE</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowCertificate(false)}
                      className="text-foreground-muted hover:text-foreground transition p-1 rounded-lg hover:bg-[color:var(--color-surface-2)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Certificate Core Statement */}
                  <div className="text-center py-4 space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase">Certificate of Verification</span>
                    <h1 className="text-xl font-bold md:text-2xl text-foreground">Verified Carbon Offsets</h1>
                    
                    <p className="text-xs text-foreground-muted max-w-md mx-auto leading-relaxed">
                      This document confirms that <strong className="text-foreground">{activeRecord.carbonSavedKg.toLocaleString()} kilograms</strong> of verified CO2 equivalents have been sequestered through targeted waste cleanup operations.
                    </p>
                  </div>

                  {/* Telemetry data box */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y border-sky-500/15 py-5 text-xs font-mono">
                    <div className="space-y-0.5">
                      <p className="text-foreground-muted text-[9px] uppercase">Registered Site</p>
                      <p className="font-semibold text-foreground">{activeRecord.siteLabel}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-foreground-muted text-[9px] uppercase">Region / Municipality</p>
                      <p className="font-semibold text-foreground">{activeRecord.city}, India</p>
                    </div>
                    <div className="space-y-0.5 col-span-2 md:col-span-1">
                      <p className="text-foreground-muted text-[9px] uppercase">Verification Date</p>
                      <p className="font-semibold text-foreground">{activeRecord.date}</p>
                    </div>
                  </div>

                  {/* Blockchain hashes */}
                  <div className="bg-[#05070f] rounded-lg p-3 text-[9px] font-mono text-sky-400 space-y-1 select-all break-all border border-sky-500/10">
                    <p className="text-foreground-muted"><span className="font-semibold">LEDGER TRANSACTION HASH:</span></p>
                    <p>{activeRecord.txHash}</p>
                    <p className="text-foreground-muted mt-2"><span className="font-semibold">MINT PROTOCOL:</span> NextGen-ERC1155 ESG Verified Cert</p>
                  </div>

                  {/* Action Print Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="secondary" size="sm" onClick={() => window.print()} className="h-8 text-[11px]">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Print PDF
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => setShowCertificate(false)} className="h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white">
                      Done
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
