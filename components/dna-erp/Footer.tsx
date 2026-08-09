"use client";

import { useState, type FormEvent } from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const COLUMNS = [
  { title: "Pages", links: ["Apps", "Why DNA", "Overview"] },
  { title: "Apps", links: ["Sales & CRM", "Purchase & Procurement", "Inventory & Warehouse", "Banking & GL"] },
  { title: "Start now", links: ["Pricing", "Price configurator", "Trial"] },
  { title: "Community", links: ["Blogs", "Contact us"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-black text-white">
              DNA
            </span>
            <p className="mt-4 max-w-xs text-sm text-neutral-500">
              AI-powered cloud ERP for businesses of every size, worldwide.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-500 hover:text-neutral-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-white">Newsletter</h3>
            {status === "success" ? (
              <p className="mt-4 text-sm text-emerald-400">You&apos;re subscribed — thanks!</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email*"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-blue-400"
                />
                <button type="submit" className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-black hover:bg-neutral-200">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DNA ERP. Structural demo — not affiliated with any third-party product.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
