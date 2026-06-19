import Link from "next/link";
import { MailCheck } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <GlassPanel className="max-w-md p-10 text-center" glow="emerald">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-[color:var(--color-nav-active-text)]">
          <MailCheck className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          We&apos;ve sent a verification link to your inbox. Confirm your email to activate your
          TeraSight workspace.
        </p>
        <Link href="/dashboard" className="mt-8 inline-block">
          <Button className="w-full">Continue to Platform</Button>
        </Link>
      </GlassPanel>
    </div>
  );
}
