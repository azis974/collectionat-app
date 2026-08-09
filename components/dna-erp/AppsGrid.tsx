"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Package,
  Landmark,
  Calculator,
  ClipboardCheck,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

const APPS = [
  { icon: LayoutDashboard, name: "Dashboard", tag: "Your day, simplified" },
  { icon: ShoppingCart, name: "Sales & CRM", tag: "Close deals faster" },
  { icon: Truck, name: "Purchase & Procurement", tag: "Smarter purchasing" },
  { icon: Package, name: "Inventory & Warehouse", tag: "Stock under control" },
  { icon: Landmark, name: "Banking & GL", tag: "Financial clarity" },
  { icon: Calculator, name: "Budget & Cost Centers", tag: "Spend with precision" },
  { icon: ClipboardCheck, name: "Projects & Tasks", tag: "Deliver on time" },
  { icon: BarChart3, name: "Reports & Analysis", tag: "Insights that matter" },
  { icon: Settings, name: "System Setup", tag: "Your system, your rules" },
];

export default function AppsGrid() {
  const [active, setActive] = useState(0);

  return (
    <section id="apps" className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Apps</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">What is DNA ERP</h2>
          <p className="mt-4 text-neutral-400">
            An AI-powered cloud ERP platform that connects finance, sales, CRM, inventory, procurement, HR, projects,
            reporting, and automation in one unified system — for companies of every size.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ul className="space-y-1">
            {APPS.map(({ icon: Icon, name, tag }, i) => (
              <li key={name}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    active === i ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active === i ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-neutral-500"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-medium ${active === i ? "text-white" : "text-neutral-300"}`}>{name}</span>
                    <span className="block text-xs text-neutral-500">{tag}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111114] to-black p-8">
            {(() => {
              const App = APPS[active].icon;
              return (
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300">
                  <App size={28} />
                </span>
              );
            })()}
            <h3 className="mt-6 text-2xl font-semibold text-white">{APPS[active].name}</h3>
            <p className="mt-2 text-neutral-400">{APPS[active].tag} — fully integrated with every other module, so data never lives in a silo.</p>
            <a href="#pricing" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300">
              View app <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">
          9 integrated modules · 1 unified platform · zero data silos.
        </p>
      </div>
    </section>
  );
}
