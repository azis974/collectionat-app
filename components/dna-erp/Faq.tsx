"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How is this different from traditional ERP systems?",
    a: "It's built to be faster and easier to adapt than legacy ERP — no-code customization, automated workflows, and AI-assisted insights across finance, sales, inventory, HR and operations, instead of long consulting cycles.",
  },
  {
    q: "How long does implementation take?",
    a: "It depends on company size, modules and data migration complexity. Many businesses go live within 2–4 weeks; larger multi-company rollouts may be phased.",
  },
  {
    q: "Do you offer support after go-live?",
    a: "Yes — ongoing support, training and documentation are included, with guidance tailored to your departments and roles as the business grows.",
  },
  {
    q: "Can I try it before committing?",
    a: "Yes, a 14-day trial is available directly from the pricing section, no credit card required.",
  },
  {
    q: "Is this only for small businesses?",
    a: "No — it scales from startups and SMEs to large, multi-company enterprise groups with complex approval and reporting needs.",
  },
  {
    q: "Does it support companies worldwide?",
    a: "Yes — multi-company, multi-currency, multi-language, configurable tax rules and role-based access support global operations.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Answered questions.</h2>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <Plus size={16} className={`shrink-0 text-neutral-500 transition-transform ${open ? "rotate-45" : ""}`} />
                </button>
                {open && <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-400">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
