"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";

import { PrithviQAssistant } from "@/components/assistant/PrithviQAssistant";
import { PageTransition } from "@/components/effects/PageTransition";
import { CommandPalette } from "@/components/command/CommandPalette";

import { AppSidebar } from "./AppSidebar";
import { AppTopNav } from "./AppTopNav";

const AmbientGlow = dynamic(
  () => import("@/components/effects/AmbientGlow").then((m) => m.AmbientGlow),
  { ssr: false },
);

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen gap-3 bg-background p-3">
      <AmbientGlow />
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border-1)] bg-[color:var(--color-background-elevated)]/90 shadow-xl shadow-black/10">
        <AppTopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <PrithviQAssistant />
      <CommandPalette />
    </div>
  );
}
