import type { ReactNode } from "react";

import { FloatingParticles } from "@/components/effects/FloatingParticles";

interface AuthSplitLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthSplitLayout({ title, subtitle, children }: AuthSplitLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden border-r border-white/8 bg-[#04060c] lg:flex lg:flex-col lg:justify-between">
        <FloatingParticles count={24} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgb(16_185_129_/_0.18),_transparent_55%)]" />
        <div className="relative z-10 p-12">
          <p className="text-sm font-semibold tracking-wide text-emerald-300">TeraSight</p>
          <h2 className="mt-8 max-w-md text-4xl font-semibold leading-tight">{title}</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-foreground-muted">{subtitle}</p>
        </div>
        <div className="relative z-10 p-12 text-sm text-foreground-muted">
          Powered by PrithviQ AI · Environmental intelligence for India
        </div>
      </div>
      <div className="relative flex w-full flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgb(56_189_248_/_0.08),_transparent_60%)]" />
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
