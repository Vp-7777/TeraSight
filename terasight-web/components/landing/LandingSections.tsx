"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  Camera,
  Globe2,
  Leaf,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

import { ImageAnalysisSection } from "@/components/image-analysis/ImageAnalysisSection";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const capabilities = [
  {
    icon: Camera,
    title: "AI Waste Detection",
    description: "Upload field imagery and receive instant PrithviQ AI classification with confidence scoring.",
  },
  {
    icon: BarChart3,
    title: "Environmental Risk Index",
    description: "Composite intelligence scoring for pollution density, hazard presence, and site sensitivity.",
  },
  {
    icon: Leaf,
    title: "Carbon Recovery",
    description: "Estimate recoverable materials and environmental impact potential from detected waste streams.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Actionable cleanup guidance tailored to waste composition and urgency levels.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Municipalities",
    description: "Monitor rivers, drains, and public spaces with scalable AI surveillance.",
  },
  {
    icon: Users,
    title: "NGOs & Communities",
    description: "Empower cleanup campaigns with evidence-based environmental intelligence.",
  },
  {
    icon: Globe2,
    title: "Government Agencies",
    description: "Enterprise-grade reporting for policy decisions and compliance tracking.",
  },
  {
    icon: Shield,
    title: "Corporations & ESG",
    description: "Measure restoration impact and sustainability outcomes with precision.",
  },
];

const testimonials = [
  {
    quote:
      "TeraSight transformed how we prioritize cleanup operations across 40+ river monitoring sites.",
    author: "Dr. Ananya Mehta",
    role: "Environmental Director, CleanRiver NGO",
  },
  {
    quote:
      "The intelligence layer goes far beyond detection — it helps us justify budgets and measure restoration.",
    author: "James Okonkwo",
    role: "Smart City Lead, Metro Council",
  },
];

export function PlatformSection() {
  return (
    <section id="platform" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform"
          title="AI environmental intelligence, end to end"
          description="From image capture to cleanup recommendations — TeraSight orchestrates the full intelligence pipeline."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {capabilities.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <GlassPanel className="group h-full p-6 transition hover:border-emerald-500/20 hover:bg-[color:var(--color-surface-2)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-[color:var(--color-nav-active-text)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground-muted">{item.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function AnalysisDemoSection() {
  return (
    <section id="analysis" className="border-y border-[color:var(--color-border-1)] bg-background-elevated/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live Demo"
          title="Analyze environmental imagery in seconds"
          description="Upload a field photo and experience the PrithviQ AI analysis pipeline — the same workflow powering the full platform."
        />
        <div className="mt-14">
          <ImageAnalysisSection variant="landing" />
        </div>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for organizations that protect our planet"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassPanel className="flex gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground-muted">{item.description}</p>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactSection() {
  return (
    <section id="impact" className="border-y border-[color:var(--color-border-1)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Impact"
          title="Measurable environmental outcomes"
          description="Intelligence that translates directly into cleaner ecosystems and informed action."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Waste Detected", value: 18420, suffix: " kg" },
            { label: "Sites Restored", value: 312, suffix: "" },
            { label: "Carbon Recovery", value: 28, suffix: "%", decimals: 0 },
            { label: "Risk Reduction", value: 67, suffix: "%", decimals: 0 },
          ].map((metric) => (
            <GlassPanel key={metric.label} className="p-6 text-center" glow="emerald">
              <p className="text-4xl font-semibold text-foreground">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                />
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{metric.label}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Restoration"
          title="Before & after intelligence"
          description="Track cleanup impact with visual comparisons and quantitative improvement metrics."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {["Before Cleanup", "After Restoration"].map((label, index) => (
            <GlassPanel key={label} className="overflow-hidden">
              <div
                className={`flex h-56 items-end p-6 ${
                  index === 0
                    ? "bg-gradient-to-br from-slate-800 to-slate-900"
                    : "bg-gradient-to-br from-emerald-900/60 to-teal-900/40"
                }`}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {index === 0 ? "ERI 78 — High Risk" : "ERI 24 — Low Risk"}
                  </p>
                </div>
              </div>
              <div className="p-5 text-sm text-foreground-muted">
                {index === 0
                  ? "Dense plastic and metal waste detected along riverbank segment B-12."
                  : "68% waste reduction verified. Carbon recovery potential increased by 41%."}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReportPreviewSection() {
  return (
    <section className="border-y border-[color:var(--color-border-1)] bg-background-elevated/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reports"
          title="Investor-grade environmental assessments"
          description="Generate professional intelligence reports with detections, risk scoring, and AI recommendations."
        />
        <GlassPanel className="mt-14 overflow-hidden" glow="blue">
          <div className="border-b border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-6 py-4">
            <p className="text-sm font-medium">Environmental Intelligence Report — Site R-042</p>
          </div>
          <div className="grid gap-6 p-6 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted">Summary</p>
              <p className="text-sm leading-6 text-foreground-muted">
                18.7 kg estimated waste. Plastic dominant. Immediate cleanup recommended with
                community recycling collection.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted">Risk Index</p>
              <div className="h-3 overflow-hidden rounded-full bg-[color:var(--color-surface-2)]">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
              </div>
              <p className="text-2xl font-semibold">72 / 100</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted">Categories</p>
              <div className="flex flex-wrap gap-2">
                {["Plastic", "Metal", "Organic"].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-3 py-1 text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="Trusted by environmental leaders" />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <GlassPanel key={item.author} className="p-8">
              <p className="text-lg leading-8 text-foreground">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-foreground-muted">{item.role}</p>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <GlassPanel className="relative overflow-hidden px-8 py-14 text-center sm:px-12" glow="emerald">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_65%)]" />
          <div className="relative">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Ready to transform environmental monitoring?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground-muted">
              Join forward-thinking organizations using TeraSight and PrithviQ AI to protect
              ecosystems with intelligence-grade precision.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Create Free Account</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
