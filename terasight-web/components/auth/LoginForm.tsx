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
import { useSession } from "@/lib/session/session-context";

export function LoginForm() {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const formattedName = name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    login({
      email,
      name: formattedName || "Vishal Sharma",
      organization: "Surat Municipal Corporation",
      role: "Environmental Analyst",
      avatarInitials: formattedName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "VS",
    });

    window.setTimeout(() => router.push("/dashboard"), 900);
  };

  return (
    <AuthSplitLayout
      title="Environmental intelligence for India"
      subtitle="Monitor rivers, coastlines, and industrial zones with AI-powered precision trusted by municipalities, NGOs, and government agencies."
    >
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeInUp} className="mb-8 lg:hidden">
          <Link href="/" className="text-sm font-semibold text-foreground">
            TeraSight
          </Link>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GlassPanel className="p-8" glow="blue">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-foreground-muted">
              Sign in to your environmental intelligence workspace
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="you@suratmunicipal.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-foreground-muted">
                  <input type="checkbox" className="rounded border-[color:var(--color-border-2)] bg-[color:var(--color-surface-1)]" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--color-surface-2)]" />
              <span className="text-xs text-foreground-muted">or</span>
              <div className="h-px flex-1 bg-[color:var(--color-surface-2)]" />
            </div>

            <SocialAuthButtons />

            <Button variant="ghost" className="mt-4 w-full" type="button">
              Organization SSO Login
            </Button>

            <p className="mt-6 text-center text-sm text-foreground-muted">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-accent hover:underline">
                Create account
              </Link>
            </p>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AuthSplitLayout>
  );
}
