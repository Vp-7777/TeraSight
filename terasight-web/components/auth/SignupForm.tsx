"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { AuthSplitLayout } from "./AuthSplitLayout";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "@/components/ui/glass-panel";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => router.push("/verify-email"), 900);
  };

  return (
    <AuthSplitLayout
      title="Join the future of environmental restoration"
      subtitle="Create your account and start transforming imagery into actionable intelligence within minutes."
    >
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeInUp}>
          <GlassPanel className="p-8" glow="emerald">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="mt-2 text-sm text-foreground-muted">
              Start analyzing environmental imagery with PrithviQ AI
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input label="Full name" placeholder="Alex Morgan" required />
              <Input label="Organization" placeholder="Surat Municipal Corporation" required />
              <Input label="Work email" type="email" placeholder="alex@ecovision.org" required />
              <Input label="Password" type="password" placeholder="Create a strong password" required />
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-foreground-muted">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <SocialAuthButtons />

            <p className="mt-6 text-center text-sm text-foreground-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AuthSplitLayout>
  );
}
