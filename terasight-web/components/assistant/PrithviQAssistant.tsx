"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronRight,
  Map,
  Send,
  Sparkles,
  Target,
  FileText,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAssistant } from "@/components/assistant/AssistantContext";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  assistantMockReplies,
  assistantPrompts,
} from "@/lib/data/india-demo";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: Array<{ label: string; href: string }>;
}

const COMMANDS = [
  { pattern: /open map|map explorer|show map/i, href: "/map", label: "Open Map Explorer" },
  { pattern: /open globe|global globe|show globe/i, href: "/globe", label: "Open Global Globe" },
  { pattern: /open missions|mission control|show missions/i, href: "/missions", label: "Open Mission Control" },
  { pattern: /open reports|show reports|generate report/i, href: "/reports", label: "Open Reports" },
  { pattern: /open analyze|analyze image|run analysis/i, href: "/analyze", label: "Open Analyze" },
  { pattern: /open intelligence|ai center/i, href: "/intelligence", label: "Open AI Intelligence" },
  { pattern: /open dashboard|command center/i, href: "/dashboard", label: "Open Dashboard" },
  { pattern: /yamuna|highest risk/i, href: "/map?site=yamuna-river", label: "View Yamuna Hotspot" },
  { pattern: /surat/i, href: "/map?site=surat-tapi", label: "View Surat Site" },
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "PrithviQ Command Interface online. Navigate the platform, open reports, missions, and monitoring sites through natural commands.",
  },
];

export function PrithviQAssistant() {
  const router = useRouter();
  const { open, closeAssistant, toggleAssistant } = useAssistant();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const command = COMMANDS.find((c) => c.pattern.test(text.trim()));
    const reply =
      assistantMockReplies[text.trim()] ??
      (command
        ? `Routing to ${command.label.replace("Open ", "").replace("View ", "")}...`
        : "I've queued that analysis across your Indian monitoring network. Surat River and Yamuna corridors show the highest priority signals in the last 24 hours.");

    const actions = command ? [{ label: command.label, href: command.href }] : undefined;

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: reply, actions },
      ]);
      setTyping(false);
      if (command) {
        window.setTimeout(() => router.push(command.href), 600);
      }
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[min(100vw-2rem,420px)]"
          >
            <GlassPanel className="flex max-h-[min(70vh,600px)] flex-col overflow-hidden border-[color:var(--color-border-2)] shadow-2xl shadow-emerald-500/10">
              <div className="flex items-center justify-between border-b border-[color:var(--color-border-1)] bg-gradient-to-r from-emerald-500/10 to-sky-500/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-[color:var(--color-nav-active-text)]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">PrithviQ Command</p>
                    <p className="text-[11px] text-foreground-muted">Environmental OS · Type /open map</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAssistant}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:bg-[color:var(--color-surface-1)]"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex gap-1 border-b border-[color:var(--color-border-1)] px-3 py-2">
                {[
                  { icon: Map, label: "Map", href: "/map" },
                  { icon: Target, label: "Missions", href: "/missions" },
                  { icon: FileText, label: "Reports", href: "/reports" },
                ].map((cmd) => (
                  <button
                    key={cmd.href}
                    type="button"
                    onClick={() => router.push(cmd.href)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-foreground-muted transition hover:bg-[color:var(--color-surface-1)] hover:text-foreground"
                  >
                    <cmd.icon className="h-3 w-3" />
                    {cmd.label}
                  </button>
                ))}
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div
                      className={cn(
                        "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                        msg.role === "user"
                          ? "ml-auto bg-emerald-500/15 text-foreground"
                          : "bg-[color:var(--color-surface-1)] text-foreground-muted",
                      )}
                    >
                      {msg.text}
                    </div>
                    {msg.actions?.map((action) => (
                      <button
                        key={action.href}
                        type="button"
                        onClick={() => router.push(action.href)}
                        className="mt-1.5 flex items-center gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400 transition hover:bg-emerald-500/15"
                      >
                        {action.label}
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                ))}
                {messages.length === 1 && (
                  <div className="mt-2 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2 animate-in fade-in duration-300">
                    <p className="text-[10px] font-mono text-emerald-400 font-semibold tracking-widest uppercase">Suggested Commands</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "🗺️ Open Map", cmd: "open map" },
                        { label: "📊 Open Reports", cmd: "open reports" },
                        { label: "🎯 Open Missions", cmd: "open missions" },
                        { label: "🔬 Run Analysis", cmd: "open analyze" },
                      ].map((item) => (
                        <button
                          key={item.cmd}
                          type="button"
                          onClick={() => sendMessage(item.cmd)}
                          className="text-left px-2.5 py-1.5 rounded-xl bg-[color:var(--color-surface-1)] border border-[color:var(--color-border-1)] text-[11px] text-slate-400 hover:border-emerald-500/30 hover:text-white hover:bg-[color:var(--color-surface-2)] transition active:scale-[0.98]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {typing ? (
                  <div className="flex gap-1 rounded-2xl bg-[color:var(--color-surface-1)] px-4 py-3 w-fit">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:240ms]" />
                  </div>
                ) : null}
              </div>

              <div className="border-t border-[color:var(--color-border-1)] p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {assistantPrompts.slice(0, 2).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-2.5 py-1 text-[11px] text-foreground-muted transition hover:border-emerald-500/30 hover:text-[color:var(--color-nav-active-text)]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Command: open map, show missions..."
                    className="h-10 flex-1 rounded-xl border border-[color:var(--color-border-1)] bg-[color:var(--color-surface-1)] px-3 text-sm outline-none focus:border-emerald-500/40"
                  />
                  <Button type="submit" size="sm" className="h-10 w-10 p-0" disabled={typing}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </GlassPanel>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleAssistant}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/90 to-teal-600/90 px-5 text-sm font-medium text-white shadow-xl shadow-emerald-500/25"
        aria-label="Open PrithviQ AI assistant"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline">PrithviQ Command</span>
      </motion.button>
    </>
  );
}
