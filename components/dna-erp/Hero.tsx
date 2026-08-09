"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import DashboardMockup from "@/components/dna-erp/DashboardMockup";

const ROTATING_TAGS = ["Next-Generation ERP", "Business Intelligence", "Digital Transformation", "Operational Excellence"];

const QUICK_LINKS = [
  { label: "Pricing", sub: "Plans for every size", href: "#pricing" },
  { label: "Trial", sub: "See it in action", href: "#pricing" },
  { label: "Contact us", sub: "Schedule a call", href: "#contact" },
];

export default function Hero() {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTagIndex((i) => (i + 1) % ROTATING_TAGS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]"
      />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex h-7 items-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 text-xs font-medium uppercase tracking-widest text-blue-300">
          <span key={tagIndex} className="animate-fade-up">
            {ROTATING_TAGS[tagIndex]}
          </span>
        </div>

        <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
          Unforgettable. Intelligent.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">DNA ERP</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          AI-powered ERP for businesses of all sizes, worldwide.
        </p>

        <a
          href="#pricing"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          Start now <ArrowRight size={16} />
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/10 pt-6">
          {QUICK_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group text-left">
              <span className="block text-[11px] uppercase tracking-wider text-neutral-600">{link.label}</span>
              <span className="block text-sm text-neutral-300 group-hover:text-white">{link.sub}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl">
        <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 blur-3xl" />
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0e] p-2 shadow-2xl shadow-black/40">
          <div className="h-[480px] overflow-hidden rounded-2xl sm:h-[560px]">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
