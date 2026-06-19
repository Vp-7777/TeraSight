"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";

import { PrithviQAssistant } from "@/components/assistant/PrithviQAssistant";
import { PageTransition } from "@/components/effects/PageTransition";

import { AppSidebar } from "./AppSidebar";
import { AppTopNav } from "./AppTopNav";

const AmbientGlow = dynamic(
  () => import("@/components/effects/AmbientGlow").then((m) => m.AmbientGlow),
  { ssr: false },
);

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative flex min-h-screen gap-3 bg-background p-3">
      <AmbientGlow />
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0f18]/90 shadow-xl shadow-black/10">
        <AppTopNav />
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <PrithviQAssistant />
    </div>
  );
}
