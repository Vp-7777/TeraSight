"use client";

import { motion } from "framer-motion";

export default function AuthLoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="h-14 w-14 rounded-full border-2 border-white/10 border-t-emerald-400"
      />
      <div className="text-center">
        <p className="text-lg font-medium">Preparing your workspace</p>
        <p className="mt-2 text-sm text-foreground-muted">
          Initializing PrithviQ AI intelligence layer...
        </p>
      </div>
    </div>
  );
}
