"use client";

import { useState, type ReactNode } from "react";
import {
  Menu,
  Building2,
  KeyRound,
  Bot,
  AlertTriangle,
  Home,
  Plus,
  Target,
  FileText,
  Mail,
  Users,
  Calendar,
  Gavel,
  FolderOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  Phone,
  Clock,
  CheckCircle2,
  Scale,
  DollarSign,
  Briefcase,
  Upload,
  Eye,
  Download,
  Pencil,
  Heart,
  RefreshCw,
  FolderInput,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleItem = { id: string; label: string; icon: LucideIcon };
type ModuleGroup = { label: string; items: ModuleItem[] };

const INMOBILIARIA_GROUPS: ModuleGroup[] = [
  {
    label: "Home & Control",
    items: [
      { id: "alertas", label: "General Alerts", icon: AlertTriangle },
      { id: "resumen", label: "Summary", icon: Home },
    ],
  },
  {
    label: "Team & Access",
    items: [
      { id: "rrhh", label: "Human Resources", icon: Users },
      { id: "login", label: "Login & Password", icon: KeyRound },
    ],
  },
  {
    label: "Sales Management",
    items: [
      { id: "metas", label: "Goals", icon: Target },
      { id: "email", label: "Corporate Email", icon: Mail },
      { id: "propiedades", label: "Properties", icon: Building2 },
      { id: "chat", label: "AI Chat", icon: Bot },
    ],
  },
  {
    label: "Contracts & Administration",
    items: [
      { id: "contratos", label: "Contracts & Filings", icon: FileText },
      { id: "nueva-propiedad", label: "New Property", icon: Plus },
      { id: "actividades", label: "Activities", icon: Calendar },
      { id: "administracion", label: "Administration", icon: DollarSign },
    ],
  },
];

const LEGAL_GROUPS: ModuleGroup[] = [
  {
    label: "Firm Management",
    items: [
      { id: "alertas", label: "General Alerts", icon: AlertTriangle },
      { id: "causas", label: "Cases", icon: Gavel },
      { id: "clientes", label: "Clients", icon: Users },
      { id: "agenda", label: "Calendar", icon: Calendar },
      { id: "documentos", label: "Documents", icon: FolderOpen },
    ],
  },
];

type Vertical = "inmobiliaria" | "legal";

const VERTICALS: Record<
  Vertical,
  {
    label: string;
    subtitle: string;
    icon: LucideIcon;
    activeClass: string;
    switchActiveClass: string;
    contentBg: string;
    accentText: string;
    iconBadgeClass: string;
    groups: ModuleGroup[];
    defaultModule: string;
    footerTitle: string;
    footerText: string;
  }
> = {
  inmobiliaria: {
    label: "Real Estate",
    subtitle: "Full Management",
    icon: Building2,
    activeClass: "bg-cyan-300 text-slate-900",
    switchActiveClass: "bg-white text-[#083344]",
    contentBg: "bg-cyan-50/40",
    accentText: "text-[#083344]",
    iconBadgeClass: "bg-cyan-800/60 text-cyan-100",
    groups: INMOBILIARIA_GROUPS,
    defaultModule: "alertas",
    footerTitle: "Priority Access",
    footerText: "Login first, AI Chat below, and the rest of the categories ordered by operation.",
  },
  legal: {
    label: "Legal Management",
    subtitle: "Law Firm",
    icon: Scale,
    activeClass: "bg-amber-300 text-slate-900",
    switchActiveClass: "bg-amber-400 text-[#0f172a]",
    contentBg: "bg-amber-50/50",
    accentText: "text-amber-700",
    iconBadgeClass: "bg-amber-900/40 text-amber-200",
    groups: LEGAL_GROUPS,
    defaultModule: "alertas",
    footerTitle: "Law Firm",
    footerText: "Test data — permanent storage is enabled by the administrator.",
  },
};

/** English translation of the AppSimulator click-through demo — same
 *  structure/logic as the Spanish version, only the copy differs. */
export default function AppSimulator() {
  const [vertical, setVertical] = useState<Vertical>("inmobiliaria");
  const [activeModule, setActiveModule] = useState(VERTICALS.inmobiliaria.defaultModule);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const config = VERTICALS[vertical];

  const selectVertical = (v: Vertical) => {
    setVertical(v);
    setActiveModule(VERTICALS[v].defaultModule);
  };

  const selectModule = (id: string) => {
    setActiveModule(id);
    setSidebarOpen(false);
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white text-sm">
      {sidebarOpen && (
        <div
          role="presentation"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        style={{ left: sidebarOpen ? 0 : -288, transition: "left 300ms ease-in-out" }}
        className="absolute inset-y-0 z-30 flex h-full w-72 shrink-0 flex-col overflow-y-auto bg-[#083344] p-4 text-white md:static md:!left-auto"
      >
        <div className="mb-4 flex gap-1.5 rounded-full bg-white/5 p-1">
          {(Object.keys(VERTICALS) as Vertical[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => selectVertical(v)}
              aria-pressed={vertical === v}
              className={cn(
                "flex-1 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                vertical === v ? VERTICALS[v].switchActiveClass : "text-white/50 hover:text-white",
              )}
            >
              {VERTICALS[v].label}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-white", config.accentText)}>
            <config.icon size={20} />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">{config.label}</p>
            <p className="text-[11px] text-white/50">{config.subtitle}</p>
          </div>
        </div>

        <p className="mb-3 flex items-center gap-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          <Menu size={12} /> Menu
        </p>

        <nav className="flex-1 space-y-4">
          {config.groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-2 text-[11px] font-semibold text-white/50">{group.label}</p>
              <div className="space-y-1.5">
                {group.items.map((m) => {
                  const active = m.id === activeModule;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectModule(m.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-full px-2.5 py-2 text-left text-[13px] font-medium transition-colors",
                        active ? config.activeClass : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          active ? "bg-slate-900 text-white" : config.iconBadgeClass,
                        )}
                      >
                        <m.icon size={15} />
                      </span>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 rounded-2xl bg-white/5 p-4">
          <p className="text-xs font-semibold text-white">{config.footerTitle}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-white/50">{config.footerText}</p>
        </div>
      </aside>

      <main className={cn("h-full min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8", config.contentBg)}>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-600 shadow-sm md:hidden"
        >
          <Menu size={14} /> Menu
        </button>

        {vertical === "inmobiliaria" ? (
          <InmobiliariaContent moduleId={activeModule} />
        ) : (
          <LegalContent moduleId={activeModule} />
        )}
      </main>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-slate-100 bg-white p-6 shadow-sm", className)}>{children}</div>;
}

const BADGE_TONES = {
  red: "bg-rose-100 text-rose-800",
  blue: "bg-cyan-100 text-cyan-700",
  amber: "bg-amber-100 text-amber-800",
  emerald: "bg-emerald-100 text-emerald-700",
  gray: "bg-slate-100 text-slate-600",
  solid: "bg-[#083344] text-white",
  solidRed: "bg-rose-700 text-white",
};

function Badge({ tone, children }: { tone: keyof typeof BADGE_TONES; children: ReactNode }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold", BADGE_TONES[tone])}>{children}</span>;
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-1.5 block text-xs font-semibold text-neutral-500">{children}</label>;
}

function TextField({ placeholder }: { placeholder?: string }) {
  return (
    <input
      readOnly
      placeholder={placeholder}
      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400"
    />
  );
}

function SelectField({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-700">
      {children}
      <ChevronDown size={16} className="shrink-0 text-neutral-400" />
    </div>
  );
}

function PageHeader({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#083344] text-white">
        <Icon size={18} />
      </span>
      <div>
        <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
        <p className="text-sm text-neutral-500">{subtitle}</p>
      </div>
    </div>
  );
}

type HomeAlert = { title: string; detail: string; source: string; priority: "High" | "Medium" };

const INMOBILIARIA_ALERTS: HomeAlert[] = [
  {
    title: "Duplicate email: Mariana and Lucía",
    detail: "Email: mariana.gomez@example.com. Priority: Ana Torres.",
    source: "CRM / Original Agent",
    priority: "High",
  },
  {
    title: "Duplicate phone: Diego and Juan",
    detail: "Phone: +54 11 5555-1002. Priority: Bruno Herrera.",
    source: "CRM / Original Agent",
    priority: "High",
  },
  {
    title: "Duplicate email: Diego and Juan",
    detail: "Email: diego.fernandez@example.com. Priority: Bruno Herrera.",
    source: "CRM / Original Agent",
    priority: "High",
  },
  {
    title: "Contract to review · Amenábar 2100 3C",
    detail: "Contract expiration approaching; validate renewal, notary, and government documentation.",
    source: "Contracts / Notary",
    priority: "High",
  },
  {
    title: "Contract to review · Av. Rivadavia 5400 Local 3",
    detail: "Contract expiration approaching; validate renewal, notary, and government documentation.",
    source: "Contracts / Notary",
    priority: "High",
  },
  {
    title: "Pending rent · Santa Fe apartment reservation",
    detail: "Pending for $5,000. Blocked for administration/collections.",
    source: "Administration",
    priority: "Medium",
  },
];

const LEGAL_ALERTS: HomeAlert[] = [
  {
    title: "Deadline · File Appeal Brief",
    detail: "Appeal with deadline approaching; coordinate with expert witness.",
    source: "Cases / Court of Appeals",
    priority: "High",
  },
  {
    title: "Upcoming Hearing · Labor Conciliation",
    detail: "SECLO hearing scheduled; confirm client attendance.",
    source: "Calendar / Hearings",
    priority: "Medium",
  },
  {
    title: "Pending Documentation · Answer to Complaint",
    detail: "Documentary evidence still needs to be attached before filing.",
    source: "Documents / Notary",
    priority: "High",
  },
  {
    title: "Duplicate Client · Martínez Gómez",
    detail: "Same national ID loaded in two different case files.",
    source: "Clients / Data Entry",
    priority: "High",
  },
  {
    title: "Pending Fees · Textiles del Plata S.A.",
    detail: "Invoice pending collection for over 30 days.",
    source: "Administration",
    priority: "Medium",
  },
  {
    title: "Corporate Deadline · Power of Attorney Renewal",
    detail: "The attorney-in-fact's power expires this month; process renewal.",
    source: "Documents / Notary",
    priority: "High",
  },
];

/**
 * Shared "home" screen for both verticals — matches the real app's landing
 * page (alerts table + KPI dashboard + HR preview stacked in one screen).
 * Branches on `vertical` for copy/icons/colors instead of duplicating the
 * whole layout twice, since the client asked for "identical structure,
 * different theme" between Inmobiliaria and Gestión Legal.
 */
function AlertasHomeScreen({ vertical }: { vertical: Vertical }) {
  const isLegal = vertical === "legal";
  const alerts = isLegal ? LEGAL_ALERTS : INMOBILIARIA_ALERTS;
  const BadgeIcon = isLegal ? Scale : Home;
  const headerBg = isLegal ? "bg-slate-900" : "bg-[#083344]";
  const avatarBg = isLegal ? "bg-slate-800" : "bg-cyan-700";
  const chipBg = isLegal ? "bg-amber-100 text-amber-800" : "bg-cyan-100 text-cyan-700";
  const resolveClass = isLegal
    ? "border-slate-300 text-slate-700 hover:bg-slate-50"
    : "border-cyan-200 text-cyan-700 hover:bg-cyan-50";
  const headingClass = cn("font-bold text-neutral-900", isLegal && "font-serif");

  const stats = isLegal
    ? [
        { label: "Case Files", value: "12" },
        { label: "Lawyers", value: "4" },
        { label: "Fees", value: "$1,240,000" },
        { label: "Alerts", value: String(LEGAL_ALERTS.length) },
      ]
    : [
        { label: "Properties", value: "5" },
        { label: "Employees", value: "4" },
        { label: "Pipeline", value: "$3,465,000" },
        { label: "Alerts", value: String(INMOBILIARIA_ALERTS.length) },
      ];

  const employee = isLegal
    ? {
        name: "Bruno Aguirre",
        role: "Associate Lawyer",
        email: "bruno.aguirre@example.com",
        initials: "BA",
        docLabel: "Digital Bar License",
        fileName: "bar-license-bruno-aguirre.pdf",
        chips: ["Cases: 5", "License: Active"],
      }
    : {
        name: "Mariana López",
        role: "Sales Agent",
        email: "mariana.lopez@example.com",
        initials: "ML",
        docLabel: "Digital ID",
        fileName: "id-mariana-lopez.pdf",
        chips: ["Clients: 1", "ID: Pending"],
      };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", headerBg)}>
          <AlertTriangle size={18} />
        </span>
        <div>
          <h1 className={cn("text-xl", headingClass)}>General Alerts</h1>
          <p className="text-sm text-neutral-500">Deadlines, rents, and duplicates separated by department.</p>
        </div>
      </div>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="w-44">
            <FieldLabel>Alert Type</FieldLabel>
            <SelectField>All</SelectField>
          </div>
          <div className="w-44">
            <FieldLabel>Priority</FieldLabel>
            <SelectField>All</SelectField>
          </div>
          <span className={cn("ml-auto self-end rounded-full px-3 py-1.5 text-xs font-semibold", chipBg)}>
            {alerts.length} active
          </span>
        </div>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a.title}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-neutral-50 p-4"
            >
              <div className="min-w-[200px] flex-1">
                <p className="text-sm font-semibold text-neutral-800">{a.title}</p>
                <p className="text-xs text-neutral-500">{a.detail}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-neutral-400 sm:block">{a.source}</span>
              <Badge tone={a.priority === "High" ? "red" : "amber"}>{a.priority}</Badge>
              <button
                type="button"
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  resolveClass,
                )}
              >
                <CheckCircle2 size={13} /> Resolve
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <div className={cn("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white", headerBg)}>
          <BadgeIcon size={14} /> {isLegal ? "Legal Management" : "Real Estate Management"}
        </div>
        <h2 className={cn("text-xl", headingClass)}>
          {isLegal ? "Case File Panel & Control" : "Client Dashboard & Control"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {isLegal
            ? "Quick view of case files, team, alerts, and fees in progress."
            : "Quick view of properties, team, alerts, and operating pipeline."}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-neutral-50 p-3 text-center">
              <p className="text-lg font-bold text-neutral-900">{s.value}</p>
              <p className="text-xs text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-4 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", headerBg)}>
          <Users size={18} />
        </span>
        <div>
          <h2 className={cn("text-lg", headingClass)}>Human Resources</h2>
          <p className="text-sm text-neutral-500">
            Separate folders per employee with personal documentation, position, PDFs, and signature type.
          </p>
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white",
              avatarBg,
            )}
          >
            {employee.initials}
          </span>
          <div className="min-w-[180px] flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-neutral-900">{employee.name}</p>
              <Badge tone="emerald">Active</Badge>
            </div>
            <p className="mt-0.5 text-xs text-neutral-500">
              Position: {employee.role} · Email: {employee.email}
            </p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
              <FileText size={13} /> {employee.docLabel}
            </p>
            <p className="mb-2 text-[11px] text-neutral-400">{employee.fileName}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Upload size={12} /> Upload PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Eye size={12} /> View PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Download size={12} /> Download
              </button>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-2 text-center">
            <span className="rounded-lg bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600">{employee.chips[0]}</span>
            <Badge tone="amber">{employee.chips[1]}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InmobiliariaContent({ moduleId }: { moduleId: string }) {
  if (moduleId === "alertas") {
    return <AlertasHomeScreen vertical="inmobiliaria" />;
  }

  if (moduleId === "resumen") {
    return (
      <div>
        <PageHeader
          icon={Home}
          title="Summary"
          subtitle="Operational control with assigned clients, general alerts, and priority for the first agent who handled the contact."
        />
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Properties", value: "24" },
            { label: "Employees", value: "6" },
            { label: "Pipeline", value: "$4.2M" },
            { label: "Alerts", value: "5" },
          ].map((s) => (
            <Card key={s.label} className="text-center">
              <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
              <Users size={16} /> Human Resources
            </p>
            <div className="space-y-2">
              {["Camila Rossi — Sales Agent", "Iván Suárez — Rental Agent"].map((n) => (
                <div key={n} className="rounded-xl bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-600">
                  {n}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
              <Bot size={16} /> AI Chat
            </p>
            <div className="rounded-xl bg-neutral-50 p-3.5 text-sm text-neutral-600">
              &ldquo;First check the pending duplicate alerts and keep the client with the original agent.&rdquo;
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (moduleId === "propiedades") {
    const rows: {
      name: string;
      type: string;
      size: string;
      responsable: string;
      day: string;
      valor: string;
      status: "Available" | "Rented" | "Reserved";
      price: string;
    }[] = [
      {
        name: "Amenábar 2100 3C",
        type: "Apartment",
        size: "52 m²",
        responsable: "Valeria Núñez",
        day: "8/6/2026",
        valor: "$718,000",
        status: "Reserved",
        price: "$720,000",
      },
      {
        name: "Av. Rivadavia 5400 Local 3",
        type: "Commercial Unit",
        size: "110 m²",
        responsable: "Carla Medina",
        day: "8/8/2026",
        valor: "$1,300,000",
        status: "Available",
        price: "$1,300,000",
      },
      {
        name: "Av. Santa Fe 3250 6B",
        type: "Apartment",
        size: "80 m²",
        responsable: "Ana Torres",
        day: "8/2/2026",
        valor: "$184,500",
        status: "Available",
        price: "$185,000",
      },
      {
        name: "Barrio Cerrado Los Sauces Lote 12",
        type: "Land",
        size: "600 m²",
        responsable: "Martín Silva",
        day: "8/11/2026",
        valor: "$312,000",
        status: "Available",
        price: "$310,000",
      },
      {
        name: "Junín 1450 PB A",
        type: "Apartment",
        size: "113 m²",
        responsable: "Bruno Herrera",
        day: "8/4/2026",
        valor: "$950,000",
        status: "Rented",
        price: "$950,000",
      },
    ];
    const borderClass = {
      Available: "border-l-[#083344]",
      Rented: "border-l-rose-700",
      Reserved: "border-l-sky-300",
    } as const;
    const badgeTone = { Available: "solid", Rented: "solidRed", Reserved: "blue" } as const;

    return (
      <div>
        <PageHeader icon={Building2} title="Property List" subtitle="Address, status, and price, color-coded by status." />
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.name}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-xl border-l-4 bg-white p-4 shadow-sm",
                borderClass[r.status],
              )}
            >
              <div className="min-w-[220px] flex-1">
                <p className="font-semibold text-neutral-900">{r.name}</p>
                <p className="text-xs text-neutral-500">
                  {r.type} · {r.size} · Agent: {r.responsable}
                </p>
                <p className="text-xs text-neutral-500">
                  Date: {r.day} · Value: {r.valor}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge tone={badgeTone[r.status]}>{r.status}</Badge>
                <span className="text-sm font-semibold text-neutral-800">{r.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "nueva-propiedad") {
    return (
      <div>
        <PageHeader icon={Plus} title="New Property" subtitle="Add a new property to the portfolio in seconds." />
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Type</FieldLabel>
              <SelectField>Apartment</SelectField>
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <SelectField>Available</SelectField>
            </div>
            <div>
              <FieldLabel>Price</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Size</FieldLabel>
              <TextField placeholder="m²" />
            </div>
            <div>
              <FieldLabel>Agent</FieldLabel>
              <SelectField>Select agent</SelectField>
            </div>
            <div>
              <FieldLabel>Owner</FieldLabel>
              <SelectField>Select owner</SelectField>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Create Property
          </button>
        </Card>
      </div>
    );
  }

  if (moduleId === "email") {
    const inbox: { subject: string; from: string; category: string; tag: string; tone: keyof typeof BADGE_TONES; note: string }[] = [
      {
        subject: "Contract Renewal Pending",
        from: "administracion@empresa.com",
        category: "Contracts",
        tag: "Received",
        tone: "solidRed",
        note: "Review expiration, guarantees, and documentation before sending to the notary.",
      },
      {
        subject: "Rent Due Notice",
        from: "rentas@empresa.com",
        category: "Administration",
        tag: "Received",
        tone: "gray",
        note: "Client with upcoming monthly payment; follow-up required from administration.",
      },
      {
        subject: "Inquiry Sent to Owner",
        from: "ventas@empresa.com",
        category: "Sales",
        tag: "Sent",
        tone: "blue",
        note: "Availability and updated value confirmed for the selected property.",
      },
    ];
    return (
      <div>
        <PageHeader
          icon={Mail}
          title="Corporate Email"
          subtitle="Visual hub to send, receive, and classify emails by department within the app."
        />
        <Card>
          <div className="space-y-3">
            <div>
              <FieldLabel>To</FieldLabel>
              <TextField placeholder="client@company.com" />
            </div>
            <div>
              <FieldLabel>Subject</FieldLabel>
              <TextField placeholder="Contract or property follow-up" />
            </div>
            <div>
              <FieldLabel>Message</FieldLabel>
              <TextField placeholder="Write corporate email" />
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white"
            >
              <Send size={15} /> Send Email
            </button>
          </div>

          <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6">
            {inbox.map((m) => (
              <div key={m.subject} className="rounded-xl bg-neutral-50 p-3.5">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-neutral-800">{m.subject}</p>
                  <Badge tone={m.tone}>{m.tag}</Badge>
                </div>
                <p className="text-xs text-neutral-500">
                  {m.from} · {m.category}
                </p>
                <p className="mt-1.5 text-xs text-neutral-600">{m.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "rrhh") {
    const documents: { name: string; icon: LucideIcon; firma: string; status: "Active" | "Renew" | "Pending" }[] = [
      { name: "Employment Contract", icon: Pencil, firma: "Electronic Signature", status: "Active" },
      { name: "Medical Card", icon: Heart, firma: "In-Person Signature", status: "Renew" },
      { name: "Renewal", icon: RefreshCw, firma: "Signature Pending", status: "Pending" },
      { name: "Work File", icon: FolderInput, firma: "Electronic Signature", status: "Active" },
      { name: "Contracts & Annexes", icon: FileText, firma: "In-Person Signature", status: "Active" },
    ];
    const statusTone = { Active: "solid", Renew: "solidRed", Pending: "blue" } as const;

    return (
      <div>
        <PageHeader
          icon={Briefcase}
          title="Human Resources"
          subtitle="Separate folders per employee with personal documentation, position, PDFs, and signature type."
        />
        <Card>
          <div className="flex flex-wrap items-center gap-4 border-b border-neutral-100 pb-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cyan-700 text-lg font-bold text-white">
              ML
            </span>
            <div className="min-w-[160px] flex-1">
              <p className="font-semibold text-neutral-900">Mariana López</p>
              <p className="mt-0.5 text-xs text-neutral-500">Position: Sales Agent</p>
              <p className="text-xs text-neutral-500">Email: mariana.lopez@example.com</p>
              <span className="mt-2 inline-block">
                <Badge tone="solid">Active</Badge>
              </span>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                <FileText size={13} /> Digital ID
              </p>
              <p className="mb-2 text-[11px] text-neutral-400">id-mariana-lopez.pdf</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Upload size={12} /> Upload PDF
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Eye size={12} /> View PDF
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-2 text-center">
              <span className="rounded-lg bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600">Clients: 1</span>
              <Badge tone="blue">ID: Pending</Badge>
            </div>
          </div>

          <div className="mt-2 divide-y divide-neutral-100">
            {documents.map((d) => (
              <div key={d.name} className="flex flex-wrap items-center justify-between gap-2 px-1 py-3">
                <span className="flex min-w-[160px] flex-1 items-center gap-2 text-sm font-medium text-neutral-800">
                  <d.icon size={15} className="shrink-0 text-neutral-400" /> {d.name}
                </span>
                <span className="text-xs text-neutral-500">{d.firma}</span>
                <Badge tone={statusTone[d.status]}>{d.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "chat") {
    return (
      <div>
        <PageHeader icon={Bot} title="AI Chat" subtitle="Visual assistant for operational queries." />
        <Card className="max-w-xl">
          <div className="mb-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            First check the pending duplicate alerts and keep the client with the original agent.
          </div>
          <div className="flex gap-2">
            <TextField placeholder="Ask about goals, duplicates, or clients" />
            <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#083344] text-white">
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "contratos") {
    const expedientes: {
      title: string;
      tags: { label: string; tone: keyof typeof BADGE_TONES }[];
      property: string;
      client: string;
      responsable: string;
      vence: string;
      valor: string;
      etapa: string;
      entidad: string;
      docs: string;
      accent: string;
    }[] = [
      {
        title: "Municipal Filing – Rivadavia Unit",
        tags: [
          { label: "Government", tone: "gray" },
          { label: "In Progress", tone: "blue" },
        ],
        property: "Av. Rivadavia 5400 Local 3",
        client: "Juan Pablo Rossi",
        responsable: "Carla Medina",
        vence: "9/30/2026",
        valor: "$1,300,000",
        etapa: "City Hall",
        entidad: "City Hall",
        docs: "Business permit, approved blueprints, and debt clearance certificate.",
        accent: "border-l-neutral-200",
      },
      {
        title: "Sale Agreement – Amenábar 2100",
        tags: [
          { label: "Sale Contract", tone: "gray" },
          { label: "Important", tone: "solidRed" },
          { label: "Under Review", tone: "blue" },
        ],
        property: "Amenábar 2100 3C",
        client: "Diego Fernández",
        responsable: "Valeria Núñez",
        vence: "10/12/2026",
        valor: "$720,000",
        etapa: "At Notary Office",
        entidad: "Notary Office",
        docs: "Property title, title search report, liens report, and tax ID certificate.",
        accent: "border-l-rose-700",
      },
      {
        title: "Sale Deed – Santa Fe 3250",
        tags: [
          { label: "Notary", tone: "gray" },
          { label: "In Progress", tone: "blue" },
          { label: "Draft", tone: "gray" },
        ],
        property: "Av. Santa Fe 3250 6B",
        client: "Sofía Álvarez",
        responsable: "Ana Torres",
        vence: "11/10/2026",
        valor: "$185,000",
        etapa: "Sent to Notary",
        entidad: "Notary",
        docs: "Buyer information, cadastral certificate, and proof of funds.",
        accent: "border-l-[#083344]",
      },
      {
        title: "Renewal – Los Sauces Lot",
        tags: [
          { label: "Renewal", tone: "gray" },
          { label: "On Hold", tone: "amber" },
          { label: "Draft", tone: "gray" },
        ],
        property: "Barrio Cerrado Los Sauces Lote 12",
        client: "Lucía Martínez",
        responsable: "Martín Silva",
        vence: "8/31/2027",
        valor: "$310,000",
        etapa: "Internal Preparation",
        entidad: "HOA Management",
        docs: "",
        accent: "border-l-neutral-200",
      },
    ];

    return (
      <div>
        <PageHeader
          icon={FileText}
          title="Contracts & Filings"
          subtitle="Creation and stage tracking: notary, deed office, public registry, land registry, city hall, bank, and guarantees."
        />
        <Card className="mb-4 bg-neutral-50">
          <p className="text-sm font-semibold text-neutral-900">Access Restricted</p>
          <p className="mt-1 text-xs text-neutral-600">
            Only Contracts/Notary or Administration can modify case files; Sales can only view — red means important,
            yellow means in progress/on hold, and green means positive.
          </p>
        </Card>
        <Card className="mb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel>Case File Name</FieldLabel>
              <TextField placeholder="Junín Rental Contract" />
            </div>
            <div>
              <FieldLabel>Property</FieldLabel>
              <SelectField>Select property</SelectField>
            </div>
            <div>
              <FieldLabel>Client</FieldLabel>
              <SelectField>Select client</SelectField>
            </div>
            <div>
              <FieldLabel>Agent</FieldLabel>
              <SelectField>Select agent</SelectField>
            </div>
            <div>
              <FieldLabel>Status Flag</FieldLabel>
              <SelectField>In Progress</SelectField>
            </div>
            <div>
              <FieldLabel>Filing Type</FieldLabel>
              <SelectField>Rental Contract</SelectField>
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <SelectField>Draft</SelectField>
            </div>
            <div>
              <FieldLabel>Process Stage</FieldLabel>
              <SelectField>Internal Preparation</SelectField>
            </div>
            <div>
              <FieldLabel>Entity</FieldLabel>
              <SelectField>Notary</SelectField>
            </div>
            <div>
              <FieldLabel>Start Date</FieldLabel>
              <TextField placeholder="2026-08-07" />
            </div>
            <div>
              <FieldLabel>Due Date</FieldLabel>
              <TextField placeholder="2027-08-07" />
            </div>
            <div>
              <FieldLabel>Contract Value</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Required Documentation</FieldLabel>
              <TextField placeholder="ID, guarantees, title, reports" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Notes</FieldLabel>
              <TextField placeholder="Internal notes" />
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Create Case File
          </button>
        </Card>

        <p className="mb-3 text-sm font-semibold text-neutral-900">Case Files in Progress</p>
        <div className="space-y-3">
          {expedientes.map((e) => (
            <div key={e.title} className={cn("rounded-xl border-l-4 bg-white p-4 shadow-sm", e.accent)}>
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-900">{e.title}</p>
                  <p className="text-xs text-neutral-500">{e.property}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <Badge key={t.label} tone={t.tone}>
                      {t.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Client: {e.client} · Agent: {e.responsable}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  Due: <span className="font-semibold text-neutral-800">{e.vence}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  Value: <span className="font-semibold text-neutral-800">{e.valor}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  Stage: <span className="font-semibold text-neutral-800">{e.etapa}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  Entity: <span className="font-semibold text-neutral-800">{e.entidad}</span>
                </div>
              </div>
              {e.docs && <p className="mt-2 text-[11px] text-neutral-500">Docs: {e.docs}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "actividades") {
    const activities = [
      { title: "Santa Fe Apartment Viewing", type: "Viewing", date: "8/10/2026" },
      { title: "Follow-up Call on Offer", type: "Call", date: "8/12/2026" },
      { title: "Junín Reservation Signing", type: "Signing", date: "8/15/2026" },
      { title: "Los Sauces Lot Appraisal", type: "Appraisal", date: "8/14/2026" },
    ];
    return (
      <div>
        <PageHeader icon={Calendar} title="Activities" subtitle="Upcoming tasks and visits scheduled by the sales team." />
        <div className="grid gap-3 sm:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-800">{a.title}</p>
                <p className="text-xs text-neutral-500">
                  {a.type} · {a.date}
                </p>
              </div>
              <Clock size={16} className="text-neutral-300" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "metas") {
    const goals = [
      { label: "Sales", current: 2120000, target: 6400000 },
      { label: "Rentals", current: 1510000, target: 3800000 },
    ];
    const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

    return (
      <div>
        <PageHeader icon={Target} title="Monthly Goals Panel" subtitle="Sales and rental goals tracked separately." />
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          {goals.map((g) => (
            <Card key={g.label}>
              <p className="font-semibold text-neutral-900">{g.label}</p>
              <p className="mt-1 text-sm text-neutral-500">
                {fmt(g.current)} of {fmt(g.target)}
              </p>
              <div className="mt-3 h-2 w-full rounded-full bg-neutral-100">
                <div className="h-2 rounded-full bg-[#083344]" style={{ width: `${Math.round((g.current / g.target) * 100)}%` }} />
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Month</FieldLabel>
              <TextField placeholder="2026-08" />
            </div>
            <div>
              <FieldLabel>Sales Goal</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Rental Goal</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Sales Progress</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Rental Progress</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Employee</FieldLabel>
              <SelectField>General</SelectField>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Submit Monthly Goal
          </button>
        </Card>
      </div>
    );
  }

  if (moduleId === "administracion") {
    const rows = [
      { name: "Invoice #1042 — Insumos SA Supplier", stage: "Payment Pending", value: "$4,200" },
      { name: "Office Rent — August", stage: "Paid", value: "$18,500" },
      { name: "Payroll Settlement", stage: "Under Review", value: "$62,300" },
    ];
    return (
      <div>
        <PageHeader icon={DollarSign} title="Administration" subtitle="Accounts payable, payroll, and monthly operating expenses." />
        <Card>
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.name} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-neutral-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-neutral-800">{r.name}</p>
                  <p className="text-xs text-neutral-500">{r.stage}</p>
                </div>
                <span className="text-sm font-semibold text-neutral-800">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const activeRole = {
    label: "Administration",
    description: "Full system control, collections, users, and permissions.",
    perms: ["Manage users and passwords", "View collections and critical alerts", "Modify case files and contracts"],
  };
  const accounts = [
    { name: "Ana Torres", role: "Sales Agent", login: "ana.torres@example.com", contact: "Mariana Gómez · Owner" },
    { name: "Bruno Herrera", role: "Rental Agent", login: "bruno.herrera@example.com", contact: "Diego Fernández · Seller" },
  ];

  return (
    <div>
      <PageHeader
        icon={KeyRound}
        title="Login & Password by Role"
        subtitle="Internal access separated by employee and role; each user logs in with permissions based on their department."
      />
      <Card className="mb-4">
        <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-start">
          <div>
            <FieldLabel>Access Role</FieldLabel>
            <SelectField>{activeRole.label}</SelectField>
          </div>
          <div className="rounded-xl bg-neutral-50 p-4">
            <p className="font-semibold text-neutral-900">{activeRole.label}</p>
            <p className="mt-0.5 text-sm text-neutral-600">{activeRole.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeRole.perms.map((p) => (
                <span key={p} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {accounts.map((a) => (
          <Card key={a.name}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-semibold text-neutral-900">{a.name}</p>
              <Badge tone="blue">{a.role}</Badge>
            </div>
            <p className="text-xs text-neutral-500">Login: {a.login}</p>
            <p className="text-xs text-neutral-500">Password: protected by administration</p>
            <p className="mt-1 text-xs text-neutral-500">Assigned role: {a.role} · 1 client</p>
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-neutral-50 p-2.5 text-[11px] text-neutral-600">
              <ShieldCheck size={13} className="shrink-0 text-cyan-700" /> Permissions applied by department and
              original client priority.
            </p>
            <p className="mt-2 text-xs text-neutral-500">{a.contact}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LegalPageHeader({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="flex items-center gap-2.5 font-serif text-3xl font-bold text-neutral-900">
        <Icon size={26} className="text-amber-600" /> {title}
      </h1>
      <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

const LEGAL_CASES = [
  {
    caption: "Martínez Gómez, Laura v. Aseguradora del Sur S.A. — Damages Claim",
    docs: [
      {
        name: "Damages Claim Complaint",
        tag: "Complaint",
        date: "Mar 12, 2024",
        note: "Initial filing seeking compensation for a traffic accident.",
      },
      {
        name: "Answer to Complaint",
        tag: "Answer",
        date: "May 18, 2024",
        note: "Denial of the facts and statute-of-limitations defense.",
      },
    ],
  },
  {
    caption: "Fernández Ríos, Pablo v. Textiles del Plata S.A. — Wrongful Termination",
    docs: [
      {
        name: "Labor Complaint for Wrongful Termination",
        tag: "Complaint",
        date: "Jan 10, 2025",
        note: "Claim for termination without cause and wage differences.",
      },
    ],
  },
];

const LEGAL_CLIENTS = [
  {
    type: "Individual",
    cuit: "20-34567890-5",
    name: "Laura Martínez Gómez",
    phone: "+54 11 4567-8901",
    email: "lmartinez@email.com",
    cases: 1,
  },
  {
    type: "Individual",
    cuit: "27-28765432-3",
    name: "Pablo Fernández Ríos",
    phone: "+54 221 456-7890",
    email: "pfernandez@email.com",
    cases: 1,
  },
  {
    type: "Business",
    cuit: "30-71234567-8",
    name: "Textiles del Plata S.A.",
    phone: "+54 11 4321-0987",
    email: "legales@textilesdelplata.com",
    cases: 2,
  },
];

const LEGAL_DEADLINES: { title: string; tags: string[]; status: string; date: string; case: string; note: string }[] = [
  {
    title: "File Appeal Brief",
    tags: ["High", "Procedural Deadline"],
    status: "Overdue",
    date: "May 28, 2026",
    case: "Ministerio Público Fiscal v. Constructora del Sur S.A.",
    note: "Final deadline. Coordinate with expert witness for technical grounds.",
  },
  {
    title: "Submit Witness List",
    tags: ["High", "Procedural Deadline"],
    status: "Overdue",
    date: "May 30, 2026",
    case: "Martínez Gómez, Laura v. Aseguradora del Sur S.A.",
    note: "Deadline to offer witness testimony. Coordinate with client.",
  },
  {
    title: "Labor Conciliation Hearing",
    tags: ["Medium", "Hearing"],
    status: "Pending",
    date: "Aug 16, 2026",
    case: "Fernández Ríos, Pablo v. Textiles del Plata S.A.",
    note: "SECLO. Evaluate settlement proposal with client.",
  },
];

function LegalContent({ moduleId }: { moduleId: string }) {
  if (moduleId === "alertas") {
    return <AlertasHomeScreen vertical="legal" />;
  }

  if (moduleId === "causas") {
    return (
      <div>
        <LegalPageHeader icon={Gavel} title="Cases" subtitle="Procedural tracking for each active case file." />
        <div className="space-y-4">
          {LEGAL_CASES.map((c) => (
            <Card key={c.caption}>
              <div className="mb-3 flex items-center gap-2">
                <FolderOpen size={16} className="text-amber-600" />
                <p className="font-semibold text-neutral-900">{c.caption}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {c.docs.map((doc) => (
                  <div key={doc.name} className="rounded-xl bg-neutral-50 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-800">{doc.name}</span>
                      <Badge tone="amber">{doc.tag}</Badge>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {doc.date} · {doc.note}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "clientes") {
    const personas = LEGAL_CLIENTS.filter((c) => c.type === "Individual").length;
    const juridicas = LEGAL_CLIENTS.filter((c) => c.type === "Business").length;
    return (
      <div>
        <LegalPageHeader icon={Users} title="Clients" subtitle="Firm's client portfolio." />
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Card className="flex items-center gap-3">
            <Users size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{personas}</p>
              <p className="text-xs text-neutral-500">Individuals</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Briefcase size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{juridicas}</p>
              <p className="text-xs text-neutral-500">Businesses</p>
            </div>
          </Card>
        </div>
        <div className="space-y-3">
          {LEGAL_CLIENTS.map((c) => (
            <Card key={c.cuit}>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Badge tone="gray">{c.type}</Badge>
                <span className="text-xs text-neutral-400">Tax ID: {c.cuit}</span>
              </div>
              <p className="font-semibold text-neutral-900">{c.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {c.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={12} /> {c.email}
                </span>
                <span>
                  {c.cases} active case{c.cases > 1 ? "s" : ""}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "agenda") {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
      <div>
        <LegalPageHeader icon={Calendar} title="Calendar" subtitle="Deadline and hearing tracking." />
        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-neutral-900">August 2026</p>
              <div className="flex gap-1">
                <button type="button" className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={`${d}-${i}`} className="py-1 font-semibold text-neutral-400">
                  {d}
                </span>
              ))}
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <span key={`pad-${i}`} />
                ))}
              {days.map((d) => (
                <span key={d} className={cn("rounded-lg py-1.5 text-neutral-600", d === 9 && "bg-cyan-600 font-bold text-white")}>
                  {d}
                </span>
              ))}
            </div>
          </Card>
          <Card>
            <p className="mb-3 font-semibold text-neutral-900">Upcoming Deadlines</p>
            <div className="space-y-3">
              {LEGAL_DEADLINES.map((d) => (
                <div key={d.title} className="rounded-xl bg-neutral-50 p-3.5">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    {d.tags.map((t) => (
                      <Badge key={t} tone={t === "High" ? "red" : "amber"}>
                        {t}
                      </Badge>
                    ))}
                    <span
                      className={cn(
                        "ml-auto text-[11px] font-semibold",
                        d.status === "Overdue" ? "text-red-600" : "text-neutral-500",
                      )}
                    >
                      {d.status} · {d.date}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-800">{d.title}</p>
                  <p className="text-xs text-neutral-500">{d.case}</p>
                  <p className="mt-1 text-xs text-neutral-600">{d.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LegalPageHeader icon={FolderOpen} title="Documents" subtitle="Library of filings and legal documentation." />
      <Card className="mb-4 border border-amber-200 !bg-amber-50 !p-4">
        <p className="text-xs text-amber-900">This application uses test tables. Data entered will not be saved.</p>
      </Card>
      <div className="space-y-4">
        {LEGAL_CASES.map((c) => (
          <Card key={c.caption}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 font-semibold text-neutral-900">
                <FolderOpen size={16} className="text-amber-600" /> {c.caption}
              </p>
              <Badge tone="gray">{c.docs.length} documents</Badge>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {c.docs.map((doc) => (
                <div key={doc.name} className="rounded-xl bg-neutral-50 p-3.5">
                  <div className="mb-1 flex items-center gap-2">
                    <FileText size={14} className="text-neutral-400" />
                    <span className="text-xs font-semibold text-neutral-800">{doc.name}</span>
                  </div>
                  <Badge tone="amber">{doc.tag}</Badge>
                  <p className="mt-1.5 text-[11px] text-neutral-500">{doc.date}</p>
                  <p className="text-[11px] text-neutral-500">{doc.note}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
