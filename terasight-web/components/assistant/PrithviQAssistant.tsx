"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
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
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Namaste. I'm PrithviQ AI — your environmental intelligence copilot. Ask me about detections, cleanup priorities, or site risk across India.",
  },
];

export function PrithviQAssistant() {
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

    const reply =
      assistantMockReplies[text.trim()] ??
      "I've queued that analysis across your Indian monitoring network. Surat River and Yamuna corridors show the highest priority signals in the last 24 hours.";

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: reply },
      ]);
      setTyping(false);
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
            className="fixed bottom-24 right-6 z-50 w-[min(100vw-2rem,400px)]"
          >
            <GlassPanel className="flex max-h-[min(70vh,560px)] flex-col overflow-hidden border-white/15 shadow-2xl shadow-emerald-500/10">
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Ask PrithviQ AI</p>
                    <p className="text-[11px] text-foreground-muted">Environmental intelligence</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAssistant}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:bg-white/5"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                      msg.role === "user"
                        ? "ml-auto bg-emerald-500/15 text-foreground"
                        : "bg-white/[0.04] text-foreground-muted",
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
                {typing ? (
                  <div className="flex gap-1 rounded-2xl bg-white/[0.04] px-4 py-3 w-fit">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:240ms]" />
                  </div>
                ) : null}
              </div>

              <div className="border-t border-white/10 p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {assistantPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-foreground-muted transition hover:border-emerald-500/30 hover:text-emerald-300"
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
                    placeholder="Ask about sites, risk, or reports..."
                    className="h-10 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm outline-none focus:border-emerald-500/40"
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
        className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/90 to-teal-600/90 px-5 text-sm font-medium text-white shadow-xl shadow-emerald-500/25"
        aria-label="Open PrithviQ AI assistant"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline">Ask PrithviQ AI</span>
      </motion.button>
    </>
  );
}
