"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

const PROMPTS = [
  {
    question: "What were our top 5 customers last quarter?",
    answer: "Your top customer this quarter generated 38% of total revenue, followed by three accounts each contributing over 10%.",
  },
  {
    question: "Show me aged receivables over 60 days",
    answer: "You have a set of invoices aging past 60 days, concentrated in two accounts — I can draft reminder emails for both.",
  },
  {
    question: "Any items below reorder point?",
    answer: "A handful of SKUs are below their reorder point across two warehouses — want me to raise draft purchase orders?",
  },
];

export default function AiShowcase() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const ask = (index: number) => {
    setSelected(index);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  };

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Enterprise ERP done right</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            All core technologies, one platform.
          </h2>
          <p className="mt-4 max-w-md text-neutral-400">
            Ask questions in plain English and get answers pulled straight from your live data — no reports to build,
            no filters to configure.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-500">
            {["Large Language Models", "Vector Search", "Real-time Data", "No-Code Automation"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1">{tag}</span>
            ))}
          </div>
          <a href="#pricing" className="mt-8 inline-block text-sm font-medium text-blue-400 hover:text-blue-300">
            View pricing →
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111114] p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles size={16} className="text-blue-400" /> Ask DNA Intelligence
          </div>

          <div className="mb-4 space-y-2">
            {PROMPTS.map((p, i) => (
              <button
                key={p.question}
                onClick={() => ask(i)}
                className={`block w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  selected === i ? "border-blue-500/40 bg-blue-500/10 text-blue-200" : "border-white/10 text-neutral-400 hover:border-white/20"
                }`}
              >
                {p.question}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-black/40 p-4">
            {loading ? (
              <p className="flex items-center gap-2 text-xs text-neutral-500">
                <Loader2 size={13} className="animate-spin" /> Thinking…
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-neutral-300">{PROMPTS[selected].answer}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
