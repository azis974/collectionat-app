"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 43000, suffix: "+", label: "Businesses powered", format: (n: number) => `${Math.round(n / 1000)}k` },
  { value: 91600000, suffix: "+", label: "Transactions processed monthly", format: (n: number) => `${(n / 1_000_000).toFixed(0)}M` },
  { value: 50, suffix: "+", label: "Industries served", format: (n: number) => `${Math.round(n)}` },
];

const HIGHLIGHTS = [
  { pct: 94, label: "improved team collaboration by connecting departments in one system." },
  { pct: 89, label: "gained real-time visibility across every department." },
  { pct: 97, label: "reduced manual data entry with automation." },
];

const TESTIMONIALS = [
  {
    quote: "Running five divisions used to mean five different systems. Now our teams collaborate in real time and nothing falls through the cracks.",
    name: "Operations Manager",
    role: "Trading & Contracting company",
  },
  {
    quote: "With stores, warehouses and an online shop to manage, everything finally lives under one roof. Inventory syncs in real time.",
    name: "Managing Director",
    role: "Retail & Optical company",
  },
  {
    quote: "With 1,000 employees across regions, HR was a nightmare. Payroll, attendance and leave are now unified — our team runs 10x more efficiently.",
    name: "HR Director",
    role: "Utilities company",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function CountUp({ target, format, inView }: { target: number; format: (n: number) => string; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <>{format(value)}</>;
}

export default function Results() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Real results</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by businesses that grow smarter
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <p className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-4xl font-black text-transparent">
                {h.pct}%
              </p>
              <p className="mt-2 text-sm text-neutral-400">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm leading-relaxed text-neutral-300">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-white">{t.name}</p>
              <p className="text-xs text-neutral-500">{t.role}</p>
            </div>
          ))}
        </div>

        <div ref={ref} className="mt-14 grid gap-6 border-t border-white/10 pt-10 text-center sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white sm:text-4xl">
                <CountUp target={s.value} format={s.format} inView={inView} />
                {s.suffix}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
