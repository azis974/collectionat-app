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
  Menu,
  X,
  ChevronDown,
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

const NAV_LINKS = [
  { label: "Why DNA", href: "#why" },
  { label: "Pricing", href: "#pricing" },
  { label: "Trial", href: "#pricing" },
];

export default function Nav() {
  const [appsOpen, setAppsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-black">
            DNA
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-400">ERP</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setAppsOpen(true)}
            onMouseLeave={() => setAppsOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-neutral-300 hover:text-white"
              aria-expanded={appsOpen}
            >
              Apps <ChevronDown size={14} className={`transition-transform ${appsOpen ? "rotate-180" : ""}`} />
            </button>

            {appsOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2">
                <div className="grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-[#111114] p-3 shadow-2xl">
                  {APPS.map(({ icon: Icon, name, tag }) => (
                    <a
                      key={name}
                      href="#apps"
                      className="flex flex-col gap-2 rounded-xl p-3 hover:bg-white/5"
                    >
                      <Icon size={18} className="text-blue-400" />
                      <span className="text-xs font-medium text-white">{name}</span>
                      <span className="text-[11px] text-neutral-500">{tag}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-white">
            Free consultation
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            Start now
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-white md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Apps</p>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {APPS.map(({ icon: Icon, name }) => (
              <a key={name} href="#apps" className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-neutral-300 hover:bg-white/5">
                <Icon size={14} className="text-blue-400" /> {name}
              </a>
            ))}
          </div>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="block py-2 text-sm text-neutral-300 hover:text-white">
              {link.label}
            </a>
          ))}
          <a href="#pricing" className="mt-3 block rounded-full bg-white py-2.5 text-center text-sm font-semibold text-black">
            Start now
          </a>
        </div>
      )}
    </header>
  );
}
