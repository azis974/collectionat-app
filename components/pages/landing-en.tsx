"use client";

import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll } from "framer-motion";
import {
  Sparkles,
  FileX2,
  Database,
  Zap,
  Network,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  LayoutDashboard,
  Workflow,
  Play,
  Loader2,
  Quote,
  Home,
  FileText,
  Mail,
  Phone,
  Users,
  AlertTriangle,
  Scale,
  Gavel,
  Calendar,
  FolderOpen,
  Landmark,
  Lock,
  Building2,
  Layers,
  CreditCard,
  Wand,
  Store,
  Receipt,
  Package,
  Building,
  Stamp,
  Calculator,
  Truck,
} from "lucide-react";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";
import AskCollectionatChat from "@/components/ui/ruixen-moon-chat-en";
import AppSimulator from "@/components/ui/app-simulator-en";
import FloatingOrbs from "@/components/ui/floating-orbs";
import WhatsAppFloatButton from "@/components/ui/whatsapp-float-button";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Subtle top-of-page radial glow + grid texture — light version: soft cyan/gold wash on white instead of a cosmic blue glow on black. */
function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] overflow-hidden">
      <div
        className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-70 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(8,145,178,0.16) 0%, rgba(245,158,11,0.10) 40%, rgba(159,18,57,0.06) 60%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 bg-grid opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </div>
  );
}

/** Fixed gradient bar across the top of the viewport that fills as the page scrolls — cycles through all three brand accents. */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-600 via-amber-400 to-rose-800"
    />
  );
}

/** Small uppercase pill label used above every section heading. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700">
      {children}
    </span>
  );
}

/** Decorative ring/medallion — a conic-gradient masked into a donut shape (mosaic-bento motif, shared look with components/ui/bento.tsx). */
function DonutRing({ gradient, className = "" }: { gradient: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full opacity-50", className)}
      style={{
        background: gradient,
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
      }}
    />
  );
}

/** Card wrapper with a spotlight glow that follows the cursor, tuned for a light background. */
function SpotlightCard({
  children,
  className = "",
  contentClassName = "h-full",
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      className={`group relative rounded-2xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(8,145,178,0.08), transparent 65%)",
        }}
      />
      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}

/** Clean two-tone gradient accent for headline text — cyan to wine. */
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-cyan-600 to-rose-800 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/** Primary CTA — solid cyan/petrol with a shine sweep on hover. */
function GlowButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_rgba(8,145,178,0.55)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/**
 * Real demo-request form — submits to app/api/demo-request/route.ts, an actual
 * Next.js Route Handler (not a fake timeout). That endpoint validates and logs
 * the lead server-side; wiring it to an email/CRM service is a one-line change
 * documented in the route file, since we don't have real credentials for one.
 */
function DemoRequestModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Mounted only while the modal is open (see the call site), so a fresh
  // mount already means fresh state — no reset-on-close effect needed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send the request.");
      (window as any).fbq?.("track", "Lead");
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send the request.");
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={16} />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={40} className="text-emerald-500" />
            <p id="demo-modal-title" className="text-base font-semibold text-slate-900">
              All set! We received your request.
            </p>
            <p className="text-sm text-slate-500">A specialist will contact you within 24 business hours.</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 id="demo-modal-title" className="text-lg font-semibold text-slate-900">
              Request a Demo
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Tell us a bit about your company and we&apos;ll set up a personalized demo.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="demo-name" className="mb-1.5 block text-xs font-medium text-slate-600">
                  Name
                </label>
                <input
                  id="demo-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="demo-email" className="mb-1.5 block text-xs font-medium text-slate-600">
                  Work email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="demo-company" className="mb-1.5 block text-xs font-medium text-slate-600">
                  Company
                </label>
                <input
                  id="demo-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500"
                  placeholder="Your company name"
                />
              </div>

              {status === "error" && <p className="text-sm text-rose-700">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  "Request Demo"
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

const FEATURES = [
  {
    icon: FileX2,
    color: "cyan" as const,
    title: "Goodbye to Excel",
    description: "Replace scattered, error-prone spreadsheets with a system your team can actually trust.",
    span: "lg:col-span-2",
  },
  {
    icon: Database,
    color: "cyanDark" as const,
    title: "Total Centralized Management",
    description: "All your company's critical information — sales, finance, operations — lives in one unified platform.",
    span: "lg:col-span-2",
  },
  {
    icon: Zap,
    color: "gold" as const,
    title: "High Performance",
    description: "Real-time data, no bottlenecks or duplicate files: a platform that moves at the speed of your business.",
    span: "lg:col-span-2",
  },
  {
    icon: Sparkles,
    color: "solidWine" as const,
    title: "AI-Powered",
    description: "An AI assistant that knows your company's real data and answers your questions instantly — no manual reports, no waiting.",
    span: "lg:col-span-2",
  },
  {
    icon: Lock,
    color: "wine" as const,
    title: "Role-Based Permissions",
    description: "Each person sees and edits only their area — administration, properties, sales. The owner or general administrator keeps full visibility and control over the entire system.",
    span: "lg:col-span-2",
  },
  {
    icon: Network,
    color: "solid" as const,
    title: "Microsoft Integration",
    description: "Connects natively with Outlook, Teams, SharePoint, and OneDrive — your team keeps working where they already work.",
    span: "lg:col-span-2",
  },
];

const TRUST_COMPANIES = ["ALTRQYH", "MEGATRONICS"];

const TESTIMONIALS = [
  {
    quote:
      "Before Collectionat, every area at ALTRQYH managed its information in separate spreadsheets that never reconciled with each other. Today sales, finance, and operations work from a single database connected to Outlook and Teams — we stopped losing hours cross-checking numbers and started making decisions in real time.",
    company: "ALTRQYH",
    role: "General Management",
  },
  {
    quote:
      "At MEGATRONICS we migrated all our stock control, orders, and technical tracking to Collectionat in under two weeks. Automatic alerts and Microsoft 365 integration let us stay ahead of deadlines and cut down on errors that used to cost us time and money.",
    company: "MEGATRONICS",
    role: "Operations Management",
  },
];

const PRICING_PLANS: {
  id: string;
  name: string;
  tag?: string;
  tabs?: string;
  users?: string;
  price: string;
  priceUnit?: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}[] = [
  {
    id: "a",
    name: "Plan A",
    tag: "All-in-one solution",
    tabs: "20",
    users: "2",
    price: "$2,500",
    priceUnit: "USD",
    description: "An all-in-one digital solution for your business — with a free email domain the first year and AI included.",
    features: [
      "Free corporate email domain for the first year 🎁",
      "AI module for frequently asked questions",
      "Up to 20 configurable tabs",
      "2 Microsoft users + 2 corporate emails (Web/App)",
      "100 GB of storage",
      "30 days of implementation + 24/7 technical support",
    ],
    cta: "Request Plan A",
    highlight: true,
  },
  {
    id: "c",
    name: "Plan C",
    tag: "Custom",
    price: "Custom quote",
    description: "Designed around your company's specific needs: custom capacity and users.",
    features: [
      "Capacity and users defined with your team",
      "Custom modules and integrations",
      "Dedicated implementation support",
    ],
    cta: "Request a Quote",
    highlight: false,
  },
];

const INDUSTRIES = [
  {
    label: "Real Estate",
    icon: Home,
    description:
      "Properties, contracts, and your sales team in one place — with corporate email and built-in deadline alerts.",
    modules: [
      { icon: Home, name: "Properties" },
      { icon: FileText, name: "Contracts & Filings" },
      { icon: Mail, name: "Corporate Email" },
      { icon: Users, name: "Human Resources" },
      { icon: Sparkles, name: "AI Chat" },
      { icon: AlertTriangle, name: "General Alerts" },
    ],
  },
  {
    label: "Law Firms",
    icon: Scale,
    description:
      "Cases, clients, and court deadlines, with direct access to official portals so you never have to leave the platform.",
    modules: [
      { icon: Gavel, name: "Cases" },
      { icon: Users, name: "Clients" },
      { icon: Calendar, name: "Calendar" },
      { icon: FolderOpen, name: "Documents" },
      { icon: Landmark, name: "Official Portals" },
    ],
  },
  {
    label: "Condo & Property Management",
    icon: Building,
    description:
      "Dues, complaints, and building maintenance, with clear and direct communication to unit owners.",
    modules: [
      { icon: Receipt, name: "Dues" },
      { icon: AlertTriangle, name: "Complaints" },
      { icon: Calendar, name: "Maintenance" },
      { icon: Users, name: "Owners" },
      { icon: Mail, name: "Announcements" },
    ],
  },
  {
    label: "Notary Offices",
    icon: Stamp,
    description:
      "Deeds, notarial procedures, and clients, with deadline tracking and centralized documentation.",
    modules: [
      { icon: FileText, name: "Deeds" },
      { icon: FolderOpen, name: "Documentation" },
      { icon: Calendar, name: "Deadlines" },
      { icon: Users, name: "Clients" },
    ],
  },
  {
    label: "Accounting Firms",
    icon: Calculator,
    description:
      "Clients, tax deadlines, and accounting documentation, all centralized with automatic alerts.",
    modules: [
      { icon: Users, name: "Clients" },
      { icon: Calendar, name: "Tax deadlines" },
      { icon: FolderOpen, name: "Documentation" },
      { icon: AlertTriangle, name: "Alerts" },
    ],
  },
  {
    label: "Distributors & Wholesalers",
    icon: Truck,
    description:
      "Stock, orders, and wholesale clients, with delivery tracking and integrated billing.",
    modules: [
      { icon: Package, name: "Stock" },
      { icon: Receipt, name: "Orders & billing" },
      { icon: Users, name: "Wholesale clients" },
      { icon: Truck, name: "Deliveries" },
    ],
  },
  {
    label: "Shops & Small Businesses",
    icon: Store,
    description:
      "Stationery stores, kiosks, workshops, and any small business ready to leave the notebook and loose spreadsheets behind — inventory, sales, and customers in one place.",
    modules: [
      { icon: Package, name: "Inventory" },
      { icon: Receipt, name: "Sales & billing" },
      { icon: Users, name: "Customers" },
      { icon: Sparkles, name: "AI Chat" },
    ],
  },
  {
    label: "Your Industry Too",
    icon: Building2,
    description:
      "Real estate, law firms, and shops are just some examples: every Collectionat implementation is built to order, with the modules and permissions your company actually needs — no matter the size.",
    modules: [
      { icon: LayoutDashboard, name: "Custom Dashboard" },
      { icon: Workflow, name: "Workflow Automation" },
      { icon: Lock, name: "Role-Based Permissions" },
      { icon: Network, name: "Microsoft Integration" },
    ],
  },
];

function VideoDemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setStarted(true);
  };

  return (
    <section className="relative z-0 overflow-hidden border-t border-slate-200 bg-white px-6 py-24">
      <FloatingOrbs className="-z-10" colors={["#0e7490", "#f59e0b", "#9f1239"]} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <Eyebrow>Demo</Eyebrow>
        <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
          See Collectionat in Action
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          A 1-minute walkthrough of Collectionat in action.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        className="relative z-10 mx-auto mt-14 max-w-4xl"
      >
        <div className="group relative aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 shadow-sm">
          <video
            ref={videoRef}
            controls={started}
            playsInline
            onPlay={() => setStarted(true)}
            className="h-full w-full object-cover"
          >
            <source src="/videos/collectionat-demo.mp4" type="video/mp4" />
            Your browser does not support the video element.
          </video>

          {!started && (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition-transform group-hover:scale-110">
                <Play size={24} fill="white" />
              </span>
              <span className="text-sm font-medium text-slate-700">Play demo (1:00)</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

const FEATURE_ICON_STYLES = {
  cyan: "bg-cyan-50 text-cyan-600",
  cyanDark: "bg-cyan-100 text-cyan-800",
  gold: "bg-amber-50 text-amber-600",
  wine: "bg-rose-50 text-rose-800",
};

const FEATURE_RINGS: Record<string, string> = {
  cyan: "conic-gradient(from 160deg, #67e8f9, #0e7490, #67e8f9)",
  cyanDark: "conic-gradient(from 40deg, #0891b2, #164e63, #0891b2)",
  wine: "conic-gradient(from 300deg, #fb7185, #881337, #fb7185)",
};

export default function CollectionatLandingEN() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <div className="relative z-0 min-h-screen bg-white font-sans text-slate-600">
        <AmbientGlow />

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Collectionat" className="h-10 w-10" />
              <span className="text-xl font-semibold tracking-tight text-slate-900">Collectionat</span>
            </div>

            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
              <a href="#simulador" className="transition-colors hover:text-slate-900">The App</a>
              <a href="#features" className="transition-colors hover:text-slate-900">Features</a>
              <a href="#industrias" className="transition-colors hover:text-slate-900">Industries</a>
              <a href="#pricing" className="transition-colors hover:text-slate-900">Plans</a>
            </nav>

            <div className="hidden items-center gap-4 md:flex">
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold">
                <span className="rounded-full bg-cyan-600 px-3 py-1.5 text-white">EN</span>
                <a href="/ar" className="rounded-full px-3 py-1.5 text-slate-500 transition-colors hover:text-slate-900">AR</a>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900">Contact Us</p>
                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <a href="tel:+50765973835" className="flex items-center gap-1 transition-colors hover:text-cyan-700">
                    <Phone className="h-3 w-3" /> +507 6597-3835
                  </a>
                  <span className="text-slate-300">·</span>
                  <a href="tel:+97451888981" className="flex items-center gap-1 transition-colors hover:text-cyan-700">
                    <Phone className="h-3 w-3" /> +974 5188-8981
                  </a>
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-slate-600 hover:text-slate-900 md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="overflow-hidden border-b border-slate-200 bg-white md:hidden"
              >
                <div className="flex flex-col gap-4 px-6 py-4">
                  <a href="#simulador" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900">The App</a>
                  <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900">Features</a>
                  <a href="#industrias" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900">Industries</a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900">Plans</a>
                  <div className="flex items-center justify-center gap-1 self-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold">
                    <span className="rounded-full bg-cyan-600 px-3 py-1.5 text-white">EN</span>
                    <a href="/ar" onClick={() => setMobileMenuOpen(false)} className="rounded-full px-3 py-1.5 text-slate-500 transition-colors hover:text-slate-900">AR</a>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-sm font-semibold text-slate-900">Contact Us</p>
                    <div className="mt-1.5 flex flex-col gap-1">
                      <a
                        href="tel:+50765973835"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 text-sm text-cyan-700"
                      >
                        <Phone className="h-3.5 w-3.5" /> +507 6597-3835
                      </a>
                      <a
                        href="tel:+97451888981"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 text-sm text-cyan-700"
                      >
                        <Phone className="h-3.5 w-3.5" /> +974 5188-8981
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Hero Section */}
        <section className="relative z-0 overflow-hidden px-6 pb-32 pt-20">
          <div className="absolute inset-0 -z-20 bg-gradient-to-b from-cyan-50/70 via-white to-white" />
          <FloatingOrbs className="-z-10" colors={["#22d3ee", "#f59e0b", "#fb7185"]} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="relative z-10 mx-auto max-w-5xl text-center"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-600 shadow-sm">
              <Sparkles size={14} className="text-cyan-600" /> All-in-one management, integrated with Microsoft
            </div>

            <h1 className="mb-8 text-4xl font-black leading-[1.05] tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl">
              Your competitors already <GradientText>ditched Excel</GradientText>. What are you waiting for?
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              The smart platform that centralizes your entire operation — no hassle, no weird formulas, and 100%
              connected.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowButton
                href="#"
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setDemoModalOpen(true);
                }}
              >
                Request Demo <ArrowRight size={18} />
              </GlowButton>
              <motion.a
                href="#simulador"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:text-slate-900 sm:w-auto"
              >
                See the App Live
              </motion.a>
            </div>
          </motion.div>

          {/* Decorative 3D-style visual (components/ui/orbiting-circles-02.tsx) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="relative z-10 mt-8"
          >
            <OrbitingCirclesGlobe />
          </motion.div>
        </section>

        {/* The real app, embedded directly — full width, tablet mockup, no separate page to jump to. Shown right after the Hero: seeing the real product is more convincing than reading feature bullets first. */}
        <section id="simulador" className="relative z-0 border-t border-slate-200 bg-slate-50 px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto max-w-2xl text-center"
          >
            <Eyebrow>Real Product</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
              See how <GradientText>your company</GradientText> takes control from a single screen.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              It puts you and your business center stage, instantly.
            </p>
          </motion.div>

          {/* Tablet device mockup: petrol-cyan bezel + polished inner ring around the interactive app screen */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="mx-auto mt-14 max-w-[1200px]"
          >
            <div className="rounded-[36px] border-[12px] border-cyan-950 bg-cyan-950 shadow-2xl shadow-cyan-900/20">
              <div className="rounded-[24px] bg-gradient-to-br from-cyan-800 via-cyan-900 to-cyan-950 p-1">
                <div className="h-[480px] overflow-hidden rounded-[20px] bg-white sm:h-[560px] lg:h-[720px]">
                  <AppSimulator />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="relative z-0 overflow-hidden border-t border-slate-200 bg-white px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#f59e0b", "#0e7490", "#fb7185"]} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <Eyebrow>Features</Eyebrow>
              <h2 className="mb-4 mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
                Your Whole Business, Out of the Spreadsheets
              </h2>
              <p className="text-lg text-slate-600">
                A centralized, fast platform, natively connected to Microsoft.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
              {FEATURES.map(({ icon: Icon, color, title, description, span }, index) => {
                const isSolid = color === "solid" || color === "solidWine";
                const solidGradient = color === "solidWine" ? "from-rose-700 to-rose-950" : "from-cyan-600 to-cyan-800";
                const solidRing = color === "solidWine"
                  ? "conic-gradient(from 200deg, #ffffff, #fda4af, #ffffff)"
                  : "conic-gradient(from 200deg, #ffffff, #a5f3fc, #ffffff)";
                const solidText = color === "solidWine" ? "text-rose-50/90" : "text-cyan-50/90";
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
                    className={span}
                  >
                    {isSolid ? (
                      <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${solidGradient} p-8 shadow-sm`}>
                        <DonutRing
                          gradient={solidRing}
                          className="-right-10 -top-10 h-40 w-40 opacity-40"
                        />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white">
                          <Icon size={24} />
                        </div>
                        <h3 className="relative mb-3 mt-6 text-xl font-black tracking-tight text-white">{title}</h3>
                        <p className={`relative leading-relaxed ${solidText}`}>{description}</p>
                      </div>
                    ) : (
                      <SpotlightCard className="relative h-full overflow-hidden border-slate-200 p-8 hover:border-cyan-300">
                        {FEATURE_RINGS[color] && (
                          <DonutRing gradient={FEATURE_RINGS[color]} className="-right-8 -top-8 h-36 w-36" />
                        )}
                        <div
                          className={`relative mb-6 flex h-12 w-12 items-center justify-center rounded-full ${FEATURE_ICON_STYLES[color as keyof typeof FEATURE_ICON_STYLES]}`}
                        >
                          <Icon size={24} />
                        </div>
                        <h3 className="relative mb-3 text-xl font-black tracking-tight text-slate-900">{title}</h3>
                        <p className="relative leading-relaxed text-slate-600">{description}</p>
                      </SpotlightCard>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries: verticals Collectionat serves, with industry-specific modules */}
        <section id="industrias" className="relative z-0 overflow-hidden border-t border-slate-200 bg-slate-50 px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#0e7490", "#fb7185", "#f59e0b"]} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative z-10 mx-auto mb-16 max-w-2xl text-center"
          >
            <Eyebrow>Industries</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
              A Collectionat for Every Industry
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every team works differently — that&apos;s why the modules adapt to your industry, not the other way
              around. These are just a few real implementation examples; we already work with companies across
              several industries.
            </p>
          </motion.div>

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              {INDUSTRIES.map(({ label, icon: Icon }, index) => {
                const active = activeIndustry === index;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveIndustry(index)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                        : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-300 hover:text-slate-900",
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 text-white">
                    {(() => {
                      const ActiveIcon = INDUSTRIES[activeIndustry].icon;
                      return <ActiveIcon size={26} />;
                    })()}
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                    {INDUSTRIES[activeIndustry].label}
                  </h3>
                  <p className="mt-3 text-slate-600">{INDUSTRIES[activeIndustry].description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {INDUSTRIES[activeIndustry].modules.map((m) => (
                    <div
                      key={m.name}
                      className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                        <m.icon size={18} />
                      </span>
                      <span className="text-xs font-medium text-slate-700">{m.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Interactive demo video */}
        <VideoDemoSection />

        {/* AI chat over centralized data (components/ui/ruixen-moon-chat-en.tsx) */}
        <section className="border-t border-slate-200 bg-white px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <AskCollectionatChat />
          </div>
        </section>

        {/* Trust section */}
        <section className="border-t border-slate-200 bg-white px-6 py-24 text-slate-900">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto max-w-2xl text-center"
          >
            <Eyebrow>Trust</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
              Companies That Already Centralized Their Operations
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Sales, finance, and operations teams that left scattered spreadsheets behind.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_COMPANIES.map((name) => (
              <span key={name} className="text-lg font-semibold tracking-tight text-slate-600">
                {name}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, index) => {
              const tone = ["bg-cyan-600", "bg-rose-800"][index % 2];
              return (
                <motion.div
                  key={t.company}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left"
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", tone)}>
                    <Quote size={16} />
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">{t.company}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative z-0 overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-amber-50/40 to-amber-50/70 px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#0e7490", "#f59e0b", "#9f1239"]} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <Eyebrow>Plans</Eyebrow>
              <h2 className="mb-4 mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
                Plans and Pricing Built to Grow With You
              </h2>
              <p className="text-lg text-slate-600">
                Microsoft infrastructure, everything connected — choose the plan that fits your team&apos;s size.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
                  className={plan.highlight ? "lg:-mt-4 lg:mb-4" : ""}
                >
                  {plan.highlight ? (
                    <div className="relative rounded-2xl shadow-[0_0_60px_-15px_rgba(8,145,178,0.55)] ring-1 ring-cyan-900/10">
                      <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                        Recommended Plan
                      </span>

                      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-800 p-8">
                      <DonutRing
                        gradient="conic-gradient(from 200deg, #ffffff, #a5f3fc, #ffffff)"
                        className="-right-12 -top-12 h-48 w-48 opacity-30"
                      />

                      <div className="relative">
                        <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-100">{plan.name}</div>

                        <div className="mb-5 flex gap-3">
                          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center backdrop-blur-sm">
                            <p className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tighter text-white">
                              <Layers size={16} className="text-cyan-200" /> {plan.tabs}
                            </p>
                            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-cyan-100">Tabs</p>
                          </div>
                          <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center backdrop-blur-sm">
                            <p className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tighter text-white">
                              <Users size={16} className="text-cyan-200" /> {plan.users}
                            </p>
                            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-cyan-100">Users</p>
                          </div>
                        </div>

                        <div className="mb-4 text-4xl font-black tracking-tighter text-white">
                          {plan.price} <span className="text-base font-normal text-cyan-100">{plan.priceUnit}</span>
                        </div>
                        <p className="mb-8 text-sm text-cyan-50/90">{plan.description}</p>

                        <ul className="mb-8 space-y-3.5 text-sm text-white">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setDemoModalOpen(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white py-3 font-semibold text-cyan-700"
                      >
                        {plan.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </motion.button>
                      </div>
                    </div>
                  ) : (
                    <SpotlightCard
                      className="h-full border-slate-200 p-8 hover:border-cyan-300"
                      contentClassName="flex h-full flex-col justify-between"
                    >
                      <div>
                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                          {plan.id === "c" && <Wand size={15} className="text-amber-500" />}
                          {plan.name}
                          {plan.tag && (
                            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                              {plan.tag}
                            </span>
                          )}
                        </div>

                        {plan.tabs && plan.users ? (
                          <div className="mb-5 flex gap-3">
                            <div className="rounded-xl bg-cyan-50 px-4 py-2.5 text-center">
                              <p className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tighter text-slate-900">
                                <Layers size={16} className="text-cyan-600" /> {plan.tabs}
                              </p>
                              <p className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">Tabs</p>
                            </div>
                            <div className="rounded-xl bg-cyan-50 px-4 py-2.5 text-center">
                              <p className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tighter text-slate-900">
                                <Users size={16} className="text-cyan-600" /> {plan.users}
                              </p>
                              <p className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">Users</p>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                            Capacity and users defined based on your operation.
                          </div>
                        )}

                        <div
                          className={cn(
                            "mb-4 font-black tracking-tighter text-slate-900",
                            plan.priceUnit ? "text-4xl" : "text-2xl",
                          )}
                        >
                          {plan.price} {plan.priceUnit && <span className="text-base font-normal text-slate-500">{plan.priceUnit}</span>}
                        </div>
                        <p className="mb-8 text-sm text-slate-600">{plan.description}</p>

                        <ul className="mb-8 space-y-3.5 text-sm text-slate-700">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-600" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setDemoModalOpen(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-800"
                      >
                        {plan.cta}
                      </motion.button>
                    </SpotlightCard>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
              className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-6 py-4 text-center shadow-sm backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <CreditCard size={17} />
              </span>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Flexible Payment Options</span> — plans tailored to
                each client&apos;s needs to make the investment easier.
              </p>
            </motion.div>

            <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-slate-400">
              The corporate email domain is free for the first 12 months (standard annual renewal from year 2
              onward). Microsoft licenses ($275 USD per user, per year) renew annually.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 40% 80% at 10% 0%, rgba(8,145,178,0.08), transparent 70%)",
                "radial-gradient(ellipse 40% 80% at 90% 100%, rgba(159,18,57,0.06), transparent 70%)",
                "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(245,158,11,0.08), transparent 70%)",
              ].join(", "),
            }}
          />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">Collectionat</span> &copy; 2026. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a
                href="mailto:info@collectionat.com"
                className="flex items-center gap-1.5 text-slate-600 transition hover:text-cyan-700"
              >
                <Mail className="h-4 w-4" />
                info@collectionat.com
              </a>
              <a
                href="tel:+50765973835"
                className="flex items-center gap-1.5 text-slate-600 transition hover:text-cyan-700"
              >
                <Phone className="h-4 w-4" />
                +507 6597-3835
              </a>
              <a
                href="tel:+97451888981"
                className="flex items-center gap-1.5 text-slate-600 transition hover:text-cyan-700"
              >
                <Phone className="h-4 w-4" />
                +974 5188-8981
              </a>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {demoModalOpen && <DemoRequestModal onClose={() => setDemoModalOpen(false)} />}
      </AnimatePresence>

      <WhatsAppFloatButton label="Message us on WhatsApp" />
    </MotionConfig>
  );
}
