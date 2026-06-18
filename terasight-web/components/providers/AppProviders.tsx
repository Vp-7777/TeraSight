"use client";

import type { ReactNode } from "react";

import { AssistantProvider } from "@/components/assistant/AssistantContext";
import { CommandPalette } from "@/components/command/CommandPalette";
import { SessionProvider } from "@/lib/session/session-context";

import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AssistantProvider>
          {children}
          <CommandPalette />
        </AssistantProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
