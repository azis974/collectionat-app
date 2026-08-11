"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  Layers,
  Network,
  Building2,
  Lock,
  Calculator,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

/** Real questions the grounded system prompt (app/api/chat/route.ts, "en" locale) can actually answer well. */
const QUICK_ACTIONS = [
  { icon: Layers, label: "What does each plan include?" },
  { icon: Network, label: "How does it integrate with Microsoft?" },
  { icon: Building2, label: "Does it work for real estate agencies?" },
  { icon: Lock, label: "How do role-based permissions work?" },
  { icon: Calculator, label: "How much does Plan B cost?" },
  { icon: AlertTriangle, label: "My industry isn't listed — do you build custom plans?" },
];

/** Idle-animated SVG mascot — bobs gently, blinks, and "reacts" (faster antenna pulse + arm wiggle) while a reply is loading. */
function ChatRobot({ thinking }: { thinking: boolean }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto h-32 w-32 shrink-0 sm:h-40 sm:w-40 lg:mx-0"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: thinking ? [0.35, 0.65, 0.35] : [0.15, 0.3, 0.15] }}
        transition={{ duration: thinking ? 0.9 : 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-2 rounded-full bg-cyan-400 blur-2xl"
      />
      <svg viewBox="0 0 160 160" className="relative h-full w-full" aria-hidden="true">
        <line x1="80" y1="34" x2="80" y2="16" stroke="#0e7490" strokeWidth="4" strokeLinecap="round" />
        <motion.circle
          cx="80"
          cy="11"
          r="6.5"
          fill={thinking ? "#f59e0b" : "#22d3ee"}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: thinking ? 0.5 : 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <rect x="30" y="34" width="100" height="68" rx="24" fill="#0e7490" />
        <rect x="43" y="46" width="74" height="44" rx="16" fill="#ffffff" />

        {/* blush cheeks — happy little robot */}
        <circle cx="55" cy="79" r="4.5" fill="#fb7185" opacity="0.45" />
        <circle cx="105" cy="79" r="4.5" fill="#fb7185" opacity="0.45" />

        <motion.circle
          cx="66"
          cy="66"
          r="7.5"
          fill="#083344"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.88, 0.93, 0.98, 1] }}
          style={{ transformOrigin: "66px 66px" }}
        />
        <circle cx="68.5" cy="63.5" r="2" fill="#ffffff" />
        <motion.circle
          cx="94"
          cy="66"
          r="7.5"
          fill="#083344"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.88, 0.93, 0.98, 1] }}
          style={{ transformOrigin: "94px 66px" }}
        />
        <circle cx="96.5" cy="63.5" r="2" fill="#ffffff" />

        {/* big happy smile */}
        <path d="M 64 79 Q 80 92 96 79" stroke="#0e7490" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        <rect x="44" y="102" width="72" height="44" rx="18" fill="#0891b2" />
        <rect x="60" y="113" width="40" height="20" rx="8" fill="#ffffff" opacity="0.15" />

        <motion.rect
          x="18"
          y="110"
          width="14"
          height="26"
          rx="7"
          fill="#0e7490"
          style={{ transformOrigin: "25px 110px" }}
          animate={{ rotate: thinking ? [0, -14, 0] : 0 }}
          transition={{ duration: 0.7, repeat: thinking ? Infinity : 0, ease: "easeInOut" }}
        />
        <motion.rect
          x="128"
          y="110"
          width="14"
          height="26"
          rx="7"
          fill="#0e7490"
          style={{ transformOrigin: "135px 110px" }}
          animate={{ rotate: thinking ? [0, 14, 0] : 0 }}
          transition={{ duration: 0.7, repeat: thinking ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

export default function RuixenMoonChatEN() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setThinking(true);
    setReply(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, locale: "en" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't reach the assistant.");
      setReply(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reach the assistant.");
    } finally {
      setThinking(false);
    }
  };

  const handleQuickAction = (label: string) => {
    setMessage(label);
    adjustHeight();
    send(label);
  };

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-20 shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 45% 45% at 25% 15%, rgba(8,145,178,0.10), transparent 70%)",
            "radial-gradient(ellipse 45% 45% at 75% 25%, rgba(159,18,57,0.08), transparent 70%)",
            "radial-gradient(ellipse 50% 50% at 50% 85%, rgba(245,158,11,0.10), transparent 70%)",
          ].join(", "),
        }}
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-700">
          <Sparkles size={13} /> Powered by Real AI
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Ask Collectionat</h2>
        <p className="mt-2 max-w-md text-slate-600">
          A real AI assistant that knows Collectionat&apos;s plans, integrations, and industries — ask it anything.
        </p>
      </div>

      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
        <ChatRobot thinking={thinking} />

        <div className="w-full max-w-2xl">
          <div className="relative rounded-xl border border-slate-200 bg-slate-50">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(message);
                }
              }}
              placeholder="What's the difference between Plan A and Plan B?"
              className={cn(
                "w-full resize-none border-none px-4 py-3",
                "bg-transparent text-sm text-slate-900",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "min-h-[48px] placeholder:text-slate-400"
              )}
              style={{ overflow: "hidden" }}
            />

            <div className="flex items-center justify-end p-3">
              <Button
                type="button"
                onClick={() => send(message)}
                disabled={!message.trim() || thinking}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 transition-colors",
                  message.trim() && !thinking
                    ? "bg-cyan-600 text-white hover:bg-cyan-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                )}
              >
                <ArrowUpIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>

          {(thinking || reply || error) && (
            <div
              className={cn(
                "mt-4 rounded-xl border p-4 text-left text-sm",
                error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-slate-50 text-slate-700",
              )}
            >
              {thinking ? "Thinking…" : error || reply}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                type="button"
                variant="outline"
                onClick={() => handleQuickAction(label)}
                className="flex items-center gap-2 rounded-full border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
