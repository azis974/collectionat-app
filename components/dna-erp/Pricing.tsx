"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const FEATURES = [
  "All modules included — ERP, CRM, Inventory",
  "Unlimited companies — multi-company support",
  "100GB storage included free",
  "HR & payroll employee management",
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const standardPrice = annual ? 20 : 25;
  const proPrice = annual ? 245 : 30;

  return (
    <section id="pricing" className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Start now</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing</h2>

        <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !annual ? "bg-white text-black" : "text-neutral-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              annual ? "bg-white text-black" : "text-neutral-400"
            }`}
          >
            Annual <span className="text-emerald-500">· save 18%</span>
          </button>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">Standard</p>
            <p className="mt-4 text-4xl font-bold text-white">
              ${standardPrice}
              <span className="text-base font-normal text-neutral-500">/user/{annual ? "mo, billed yearly" : "mo"}</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-blue-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 block rounded-xl bg-white/10 py-3 text-center text-sm font-semibold text-white hover:bg-white/15">
              Get started
            </a>
          </div>

          <div className="relative rounded-2xl border-2 border-blue-500/40 bg-gradient-to-b from-blue-500/[0.08] to-transparent p-8 text-left shadow-[0_0_50px_-15px_rgba(59,130,246,0.4)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Popular
            </span>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Pro</p>
            <p className="mt-4 text-4xl font-bold text-white">
              ${annual ? proPrice : proPrice}
              <span className="text-base font-normal text-neutral-500">/user/{annual ? "yr" : "mo"}</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              {[...FEATURES, "Priority support — dedicated team"].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-blue-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 block rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-center text-sm font-semibold text-white hover:opacity-90">
              Get started
            </a>
            <p className="mt-3 text-center text-xs text-neutral-500">14-day free trial</p>
          </div>
        </div>
      </div>
    </section>
  );
}
