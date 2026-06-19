"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <AuthSplitLayout
      title="Reset your access"
      subtitle="Recover your TeraSight workspace credentials and get back to environmental intelligence operations."
    >
      <GlassPanel className="p-8" glow="blue">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Enter your work email and we&apos;ll send reset instructions.
        </p>

        {sent ? (
          <p className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            If an account exists for {email}, reset instructions have been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@organization.gov.in"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Button type="submit" className="w-full" size="lg">
              Send reset link
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-foreground-muted">
          <Link href="/login" className="text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </GlassPanel>
    </AuthSplitLayout>
  );
}
