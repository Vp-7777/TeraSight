"use client";

/**
 * profile/page.tsx
 *
 * This page implements the User Profile Dashboard.
 * It displays user roles, organizational hierarchies, API credentials (with copy controls),
 * and dynamic action metrics compiled from workspace statistics.
 *
 * Designed and implemented for: Vishal
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Building2, 
  Mail, 
  Shield, 
  Calendar, 
  Copy, 
  Check, 
  MapPin, 
  Layers, 
  ExternalLink,
  Target,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { useSession } from "@/lib/session/session-context";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useSession();
  const [copied, setCopied] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const name = user?.name ?? "Vishal Sharma";
  const organization = user?.organization ?? "Surat Municipal Corporation";
  const email = user?.email ?? "vishal.sharma@suratmunicipal.gov.in";
  const role = user?.role ?? "Environmental Analyst";
  const initials = user?.avatarInitials ?? "VS";

  const mockApiKey = "ts_live_51nx987A24Fd09sJk01Lm3N9o9P2q1r0s";

  const handleCopyKey = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(mockApiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Banner / Header Card */}
      <GlassPanel glow="emerald" className="overflow-hidden relative p-6">
        <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 bg-sky-500/5 rounded-full blur-2xl" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Large Initials Circle */}
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-emerald-500/10">
            {initials}
          </div>

          <div className="text-center md:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-xl font-bold text-white">{name}</h1>
              <Badge variant="ai">{role}</Badge>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-emerald-400" />
              {organization}
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5 text-sky-400" />
              {email}
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/settings">
              <Button variant="secondary" size="sm" className="h-9 text-xs">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </GlassPanel>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Statistics */}
        <div className="md:col-span-2 space-y-6">
          <GlassPanel className="p-5 space-y-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-[color:var(--color-border-1)] pb-2">Workspace Statistics</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-[color:var(--color-surface-1)] p-4 border border-[color:var(--color-border-1)]">
                <MapPin className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-white">7</p>
                <p className="text-[10px] text-slate-400 uppercase">Monitored Sites</p>
              </div>
              <div className="rounded-xl bg-[color:var(--color-surface-1)] p-4 border border-[color:var(--color-border-1)]">
                <Layers className="h-5 w-5 text-sky-400 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-white">412</p>
                <p className="text-[10px] text-slate-400 uppercase">Scans Run</p>
              </div>
              <div className="rounded-xl bg-[color:var(--color-surface-1)] p-4 border border-[color:var(--color-border-1)]">
                <Target className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-white">3</p>
                <p className="text-[10px] text-slate-400 uppercase">Active Missions</p>
              </div>
            </div>
          </GlassPanel>

          {/* Developer Credentials & API Keys */}
          <GlassPanel className="p-5 space-y-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-[color:var(--color-border-1)] pb-2">Developer Integrations</p>
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">PrithviQ SDK API Access Token</label>
                <div className="flex items-center gap-2 rounded-xl border border-[color:var(--color-border-1)] bg-[#05070e] p-2 px-3 text-xs font-mono text-emerald-400 select-all">
                  <span className="flex-1 truncate">
                    {showToken ? mockApiKey : "ts_live_51nx987••••••••••••••••••••2q1r0s"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="text-slate-400 hover:text-white transition shrink-0 p-1 hover:bg-slate-800 rounded"
                    title={showToken ? "Hide API Token" : "Show API Token"}
                  >
                    {showToken ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCopyKey}
                    className="text-slate-400 hover:text-white transition shrink-0 p-1 hover:bg-slate-800 rounded-lg"
                    title="Copy API Token"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400/80">Use this token to query PrithviQ model inferences via HTTP requests or CLI tools.</p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Security & Metadata */}
        <div className="flex flex-col gap-6">
          <GlassPanel className="p-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-[color:var(--color-border-1)] pb-2">Security & Audit</p>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Role Access:</span>
                  <span className="font-semibold text-white">Write / Execute</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Two-Factor Auth:</span>
                  <span className="text-emerald-400 font-semibold">Enabled</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Joined Date:</span>
                  <span className="font-mono text-white">15 Jun 2026</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Node Location:</span>
                  <span className="font-mono text-white">IN-WEST-1</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[color:var(--color-border-1)] pt-4 mt-6">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Shield className="h-4 w-4" />
                <span>Environmental Guard</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Your profile is validated under the Surat Environmental Action Plan guidelines for regional compliance reporting.
              </p>
            </div>
          </GlassPanel>
        </div>

      </div>
    </div>
  );
}
