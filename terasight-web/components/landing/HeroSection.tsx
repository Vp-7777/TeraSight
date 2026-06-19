"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-3xl bg-[color:var(--color-surface-1)] lg:h-[520px]" />
  ),
});

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="ai" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Powered by PrithviQ AI
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Environmental intelligence</span>
            <br />
            for a cleaner planet
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-8 text-foreground-muted"
          >
            Turning Environmental Imagery into Actionable Intelligence. Trusted by NGOs,
            municipalities, researchers, and governments to detect, quantify, and restore
            ecosystems at scale.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup">
              <Button size="lg">
                Start Free Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#analysis">
              <Button variant="outline" size="lg">
                Try Live Demo
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-8 text-sm text-foreground-muted"
          >
            <div>
              <p className="text-2xl font-semibold text-foreground">2.4M+</p>
              <p>Images analyzed</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">180+</p>
              <p>Monitoring sites</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">42</p>
              <p>Countries served</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-sky-500/20 blur-2xl" />
          <div className="glass-panel relative overflow-hidden rounded-3xl border border-[color:var(--color-border-1)]">
            <GlobeScene className="h-[420px] w-full lg:h-[520px]" />
            <div className="absolute inset-x-0 bottom-0 border-t border-[color:var(--color-border-1)] bg-background/60 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Live Intelligence</p>
              <p className="mt-1 text-sm text-foreground-muted">
                Real-time environmental monitoring across rivers, coastlines, and urban sites
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
