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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleItem = { id: string; label: string; icon: LucideIcon };
type ModuleGroup = { label: string; items: ModuleItem[] };

const INMOBILIARIA_GROUPS: ModuleGroup[] = [
  {
    label: "Inicio y control",
    items: [
      { id: "alertas", label: "Alertas generales", icon: AlertTriangle },
      { id: "resumen", label: "Resumen", icon: Home },
    ],
  },
  {
    label: "Equipo y acceso",
    items: [
      { id: "rrhh", label: "Recursos humanos", icon: Users },
      { id: "login", label: "Login y password", icon: KeyRound },
    ],
  },
  {
    label: "Gestión comercial",
    items: [
      { id: "metas", label: "Metas", icon: Target },
      { id: "email", label: "Email corporativo", icon: Mail },
      { id: "propiedades", label: "Propiedades", icon: Building2 },
      { id: "chat", label: "Chat AI", icon: Bot },
    ],
  },
  {
    label: "Contratos y administración",
    items: [
      { id: "contratos", label: "Contratos y trámites", icon: FileText },
      { id: "nueva-propiedad", label: "Nueva propiedad", icon: Plus },
      { id: "actividades", label: "Actividades", icon: Calendar },
      { id: "administracion", label: "Administración", icon: DollarSign },
    ],
  },
];

const LEGAL_GROUPS: ModuleGroup[] = [
  {
    label: "Gestión del estudio",
    items: [
      { id: "alertas", label: "Alertas generales", icon: AlertTriangle },
      { id: "causas", label: "Causas", icon: Gavel },
      { id: "clientes", label: "Clientes", icon: Users },
      { id: "agenda", label: "Agenda", icon: Calendar },
      { id: "documentos", label: "Documentos", icon: FolderOpen },
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
    groups: ModuleGroup[];
    defaultModule: string;
    footerTitle: string;
    footerText: string;
  }
> = {
  inmobiliaria: {
    label: "Inmobiliaria",
    subtitle: "Gestión integral",
    icon: Building2,
    activeClass: "bg-white text-[#083344]",
    switchActiveClass: "bg-white text-[#083344]",
    contentBg: "bg-cyan-50/40",
    accentText: "text-[#083344]",
    groups: INMOBILIARIA_GROUPS,
    defaultModule: "alertas",
    footerTitle: "Acceso prioritario",
    footerText: "Login primero, Chat AI debajo y el resto de categorías ordenadas por operación.",
  },
  legal: {
    label: "Gestión Legal",
    subtitle: "Estudio Jurídico",
    icon: Scale,
    activeClass: "bg-amber-400 text-[#0f172a]",
    switchActiveClass: "bg-amber-400 text-[#0f172a]",
    contentBg: "bg-amber-50/50",
    accentText: "text-amber-700",
    groups: LEGAL_GROUPS,
    defaultModule: "alertas",
    footerTitle: "Estudio Jurídico",
    footerText: "Datos de prueba — el almacenamiento definitivo se habilita con el administrador.",
  },
};

/** Click-through recreation of the two real Power Apps implementations
 *  (Inmobiliaria / Gestión Legal) shared by the client, embedded directly as
 *  a section of the landing page — no browser-chrome frame, no separate
 *  route to jump to. No backend: every field is read-only/static, this is a
 *  UI walkthrough of the real app, not a functional one. */
export default function AppSimulator() {
  const [vertical, setVertical] = useState<Vertical>("inmobiliaria");
  const [activeModule, setActiveModule] = useState(VERTICALS.inmobiliaria.defaultModule);

  const config = VERTICALS[vertical];

  const selectVertical = (v: Vertical) => {
    setVertical(v);
    setActiveModule(VERTICALS[v].defaultModule);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-sm">
      <aside className="flex h-full w-72 shrink-0 flex-col overflow-y-auto bg-[#083344] p-4 text-white">
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
          <Menu size={12} /> Menú
        </p>

        <nav className="flex-1 space-y-4">
          {config.groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((m) => {
                  const active = m.id === activeModule;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveModule(m.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-full px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors",
                        active ? config.activeClass : "text-white/60 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <m.icon size={16} />
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

      <main className={cn("h-full flex-1 overflow-y-auto p-8", config.contentBg)}>
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

type HomeAlert = { title: string; detail: string; source: string; priority: "Alta" | "Media" };

const INMOBILIARIA_ALERTS: HomeAlert[] = [
  {
    title: "Email duplicado Mariana y Lucía",
    detail: "Email: mariana.gomez@example.com. Prioridad: Ana Torres.",
    source: "CRM / Corredor original",
    priority: "Alta",
  },
  {
    title: "Teléfono duplicado Diego y Juan",
    detail: "Teléfono: +54 11 5555-1002. Prioridad: Bruno Herrera.",
    source: "CRM / Corredor original",
    priority: "Alta",
  },
  {
    title: "Email duplicado Diego y Juan",
    detail: "Email: diego.fernandez@example.com. Prioridad: Bruno Herrera.",
    source: "CRM / Corredor original",
    priority: "Alta",
  },
  {
    title: "Contrato por revisar · Amenábar 2100 3C",
    detail: "Vencimiento contractual próximo; validar renovación, escribanía y documentación gubernamental.",
    source: "Contratos / Notaría",
    priority: "Alta",
  },
  {
    title: "Contrato por revisar · Av. Rivadavia 5400 Local 3",
    detail: "Vencimiento contractual próximo; validar renovación, escribanía y documentación gubernamental.",
    source: "Contratos / Notaría",
    priority: "Alta",
  },
  {
    title: "Renta pendiente · Reserva departamento Santa Fe",
    detail: "Pendiente por $5.000. Bloqueado para administración/cobranzas.",
    source: "Administración",
    priority: "Media",
  },
];

const LEGAL_ALERTS: HomeAlert[] = [
  {
    title: "Vencimiento de plazo · Expresar agravios",
    detail: "Apelación con plazo próximo a vencer; coordinar con perito.",
    source: "Causas / Cámara",
    priority: "Alta",
  },
  {
    title: "Audiencia próxima · Conciliación laboral",
    detail: "Audiencia SECLO programada; confirmar asistencia del cliente.",
    source: "Agenda / Audiencias",
    priority: "Media",
  },
  {
    title: "Documentación pendiente · Contestación de demanda",
    detail: "Falta adjuntar prueba documental antes de la presentación.",
    source: "Documentos / Notaría",
    priority: "Alta",
  },
  {
    title: "Cliente duplicado · Martínez Gómez",
    detail: "Mismo DNI cargado en dos expedientes distintos.",
    source: "Clientes / Carga",
    priority: "Alta",
  },
  {
    title: "Honorarios pendientes · Textiles del Plata S.A.",
    detail: "Factura pendiente de cobro hace más de 30 días.",
    source: "Administración",
    priority: "Media",
  },
  {
    title: "Vencimiento societario · Renovación de poder",
    detail: "El poder del apoderado vence este mes; gestionar renovación.",
    source: "Documentos / Notaría",
    priority: "Alta",
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
        { label: "Expedientes", value: "12" },
        { label: "Abogados", value: "4" },
        { label: "Honorarios", value: "$1.240.000" },
        { label: "Alertas", value: String(LEGAL_ALERTS.length) },
      ]
    : [
        { label: "Propiedades", value: "5" },
        { label: "Empleados", value: "4" },
        { label: "Pipeline", value: "$3.465.000" },
        { label: "Alertas", value: String(INMOBILIARIA_ALERTS.length) },
      ];

  const employee = isLegal
    ? {
        name: "Bruno Aguirre",
        role: "Abogado asociado",
        email: "bruno.aguirre@example.com",
        initials: "BA",
        docLabel: "Matrícula digital",
        fileName: "matricula-bruno-aguirre.pdf",
        chips: ["Causas: 5", "Matrícula: Vigente"],
      }
    : {
        name: "Mariana López",
        role: "Agente de ventas",
        email: "mariana.lopez@example.com",
        initials: "ML",
        docLabel: "DNI digital",
        fileName: "dni-mariana-lopez.pdf",
        chips: ["Clientes: 1", "DNI: Pendiente"],
      };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", headerBg)}>
          <AlertTriangle size={18} />
        </span>
        <div>
          <h1 className={cn("text-xl", headingClass)}>Alertas generales</h1>
          <p className="text-sm text-neutral-500">Vencimientos, rentas y duplicados separados por sector.</p>
        </div>
      </div>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="w-44">
            <FieldLabel>Tipo de alerta</FieldLabel>
            <SelectField>Todas</SelectField>
          </div>
          <div className="w-44">
            <FieldLabel>Prioridad</FieldLabel>
            <SelectField>Todas</SelectField>
          </div>
          <span className={cn("ml-auto self-end rounded-full px-3 py-1.5 text-xs font-semibold", chipBg)}>
            {alerts.length} activas
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
              <Badge tone={a.priority === "Alta" ? "red" : "amber"}>{a.priority}</Badge>
              <button
                type="button"
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  resolveClass,
                )}
              >
                <CheckCircle2 size={13} /> Resolver
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <div className={cn("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white", headerBg)}>
          <BadgeIcon size={14} /> {isLegal ? "Gestión Legal" : "Gestión inmobiliaria"}
        </div>
        <h2 className={cn("text-xl", headingClass)}>
          {isLegal ? "Panel y control de expedientes" : "Dashboard y control de clientes"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {isLegal
            ? "Vista rápida de expedientes, equipo, alertas y honorarios en curso."
            : "Vista rápida de propiedades, equipo, alertas y pipeline operativo."}
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
          <h2 className={cn("text-lg", headingClass)}>Recursos humanos</h2>
          <p className="text-sm text-neutral-500">
            Carpetas separadas por empleado con documentación personal, cargo, PDFs y tipo de firma.
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
              <Badge tone="emerald">Activo</Badge>
            </div>
            <p className="mt-0.5 text-xs text-neutral-500">
              Cargo: {employee.role} · Email: {employee.email}
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
                <Upload size={12} /> Cargar PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Eye size={12} /> Ver PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Download size={12} /> Descargar
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
          title="Resumen"
          subtitle="Control operativo con clientes asignados, alertas generales y prioridad para el primer corredor que atendió el contacto."
        />
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Propiedades", value: "24" },
            { label: "Empleados", value: "6" },
            { label: "Pipeline", value: "$4.2M" },
            { label: "Alertas", value: "5" },
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
              <Users size={16} /> Recursos humanos
            </p>
            <div className="space-y-2">
              {["Camila Rossi — Agente de ventas", "Iván Suárez — Agente de alquileres"].map((n) => (
                <div key={n} className="rounded-xl bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-600">
                  {n}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
              <Bot size={16} /> Chat AI
            </p>
            <div className="rounded-xl bg-neutral-50 p-3.5 text-sm text-neutral-600">
              &ldquo;Revisá primero las alertas de duplicados pendientes y mantené al cliente con el corredor original.&rdquo;
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (moduleId === "propiedades") {
    const rows = [
      { name: "Depto 4B — Palermo", status: "Alquilado", price: "$185.000/mes" },
      { name: "Local comercial — Belgrano", status: "Disponible", price: "$310.000/mes" },
      { name: "Casa — Nordelta", status: "En negociación", price: "$92.000.000" },
      { name: "Oficina — Microcentro", status: "Disponible", price: "$420.000/mes" },
    ];
    return (
      <div>
        <PageHeader icon={Building2} title="Propiedades" subtitle="Cartera completa con estado, precio y responsable asignado." />
        <Card>
          <div className="mb-4 flex flex-wrap gap-3">
            <SelectField>Todos los tipos</SelectField>
            <SelectField>Todos los estados</SelectField>
          </div>
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.name} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-neutral-50 px-4 py-3">
                <span className="text-sm font-medium text-neutral-800">{r.name}</span>
                <div className="flex items-center gap-3">
                  <Badge tone={r.status === "Disponible" ? "emerald" : r.status === "Alquilado" ? "blue" : "amber"}>
                    {r.status}
                  </Badge>
                  <span className="text-sm font-semibold text-neutral-700">{r.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "nueva-propiedad") {
    return (
      <div>
        <PageHeader icon={Plus} title="Nueva propiedad" subtitle="Carga una propiedad nueva a la cartera en segundos." />
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Tipo</FieldLabel>
              <SelectField>Departamento</SelectField>
            </div>
            <div>
              <FieldLabel>Estado</FieldLabel>
              <SelectField>Disponible</SelectField>
            </div>
            <div>
              <FieldLabel>Precio</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>Superficie</FieldLabel>
              <TextField placeholder="m²" />
            </div>
            <div>
              <FieldLabel>Responsable</FieldLabel>
              <SelectField>Seleccionar responsable</SelectField>
            </div>
            <div>
              <FieldLabel>Propietario</FieldLabel>
              <SelectField>Seleccionar propietario</SelectField>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Crear propiedad
          </button>
        </Card>
      </div>
    );
  }

  if (moduleId === "email") {
    const inbox: { subject: string; from: string; tag: string; tone: keyof typeof BADGE_TONES; note: string }[] = [
      {
        subject: "Renovación de contrato pendiente",
        from: "administracion@empresa.com",
        tag: "Recibidos",
        tone: "red",
        note: "Revisar vencimiento, garantías y documentación antes de enviar a notaría.",
      },
      {
        subject: "Aviso de renta por vencer",
        from: "rentas@empresa.com",
        tag: "Recibidos",
        tone: "gray",
        note: "Cliente con pago mensual próximo; corresponde seguimiento de administración.",
      },
      {
        subject: "Consulta enviada al propietario",
        from: "ventas@empresa.com",
        tag: "Enviados",
        tone: "blue",
        note: "Se confirmó disponibilidad y valor actualizado para la propiedad seleccionada.",
      },
    ];
    return (
      <div>
        <PageHeader
          icon={Mail}
          title="Email corporativo"
          subtitle="Centro visual para enviar, recibir y clasificar correos por sector dentro de la app."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="mb-4 font-semibold text-neutral-900">Nuevo mensaje</p>
            <div className="space-y-3">
              <div>
                <FieldLabel>Para</FieldLabel>
                <TextField placeholder="cliente@empresa.com" />
              </div>
              <div>
                <FieldLabel>Asunto</FieldLabel>
                <TextField placeholder="Seguimiento de contrato o propiedad" />
              </div>
              <div>
                <FieldLabel>Mensaje</FieldLabel>
                <TextField placeholder="Escribir email corporativo" />
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white"
              >
                <Send size={15} /> Enviar email
              </button>
            </div>
          </Card>
          <Card>
            <p className="mb-4 font-semibold text-neutral-900">Bandeja</p>
            <div className="space-y-3">
              {inbox.map((m) => (
                <div key={m.subject} className="rounded-xl bg-neutral-50 p-3.5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-neutral-800">{m.subject}</p>
                    <Badge tone={m.tone}>{m.tag}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500">{m.from}</p>
                  <p className="mt-1.5 text-xs text-neutral-600">{m.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (moduleId === "rrhh") {
    const employees: { name: string; role: string; email: string; docs: { name: string; tone: keyof typeof BADGE_TONES; tag: string }[] }[] = [
      {
        name: "Camila Rossi",
        role: "Agente de ventas",
        email: "camila.rossi@example.com",
        docs: [
          { name: "Contrato laboral", tone: "blue", tag: "Vigente" },
          { name: "Tarjeta médica", tone: "amber", tag: "Renovar" },
          { name: "Legajo digital", tone: "blue", tag: "Vigente" },
        ],
      },
      {
        name: "Iván Suárez",
        role: "Agente de alquileres",
        email: "ivan.suarez@example.com",
        docs: [
          { name: "Contrato laboral", tone: "blue", tag: "Vigente" },
          { name: "Renovación", tone: "gray", tag: "Pendiente" },
        ],
      },
    ];
    return (
      <div>
        <PageHeader
          icon={Users}
          title="Recursos humanos"
          subtitle="Carpetas separadas por empleado con documentación personal, cargo, PDFs y tipo de firma."
        />
        <div className="space-y-4">
          {employees.map((e) => (
            <Card key={e.name}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-900">Carpeta de {e.name}</p>
                  <p className="text-xs text-neutral-500">
                    {e.role} · {e.email}
                  </p>
                </div>
                <Badge tone="blue">Activo</Badge>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {e.docs.map((d) => (
                  <div key={d.name} className="rounded-xl bg-neutral-50 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs font-semibold text-neutral-800">{d.name}</p>
                      <Badge tone={d.tone}>{d.tag}</Badge>
                    </div>
                    <p className="text-[11px] text-neutral-500">PDF cargado · Firma electrónica</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "chat") {
    return (
      <div>
        <PageHeader icon={Bot} title="Chat AI" subtitle="Asistente visual para consultas operativas." />
        <Card className="max-w-xl">
          <div className="mb-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            Revisá primero las alertas de duplicados pendientes y mantené al cliente con el corredor original.
          </div>
          <div className="flex gap-2">
            <TextField placeholder="Preguntar por metas, duplicados o clientes" />
            <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#083344] text-white">
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "contratos") {
    return (
      <div>
        <PageHeader
          icon={FileText}
          title="Contratos y trámites"
          subtitle="Alta y seguimiento por etapa: notaría, escribanía, registro público, catastro, municipalidad, banco y garantías."
        />
        <Card className="mb-4 border border-amber-200 bg-amber-50">
          <p className="text-sm font-semibold text-amber-900">Acceso restringido por rol</p>
          <p className="mt-1 text-xs text-amber-800">
            Solo contratos/notaría o administración modifican expedientes; ventas consulta en modo lectura.
          </p>
        </Card>
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Nombre del expediente</FieldLabel>
              <TextField placeholder="Contrato alquiler Junín" />
            </div>
            <div>
              <FieldLabel>Propiedad</FieldLabel>
              <SelectField>Seleccionar propiedad</SelectField>
            </div>
            <div>
              <FieldLabel>Responsable</FieldLabel>
              <SelectField>Seleccionar responsable</SelectField>
            </div>
            <div>
              <FieldLabel>Etapa</FieldLabel>
              <SelectField>Notaría</SelectField>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "actividades") {
    const activities = [
      { title: "Visita departamento Santa Fe", type: "Visita", date: "10/8/2026" },
      { title: "Llamada seguimiento oferta", type: "Llamada", date: "12/8/2026" },
      { title: "Firma reserva Junín", type: "Firma", date: "15/8/2026" },
      { title: "Tasación lote Los Sauces", type: "Tasación", date: "14/8/2026" },
    ];
    return (
      <div>
        <PageHeader icon={Calendar} title="Actividades" subtitle="Próximas tareas y visitas agendadas por el equipo comercial." />
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
      { label: "Cierre de ventas mensual", value: 68 },
      { label: "Nuevas propiedades cargadas", value: 82 },
      { label: "Alertas resueltas", value: 45 },
    ];
    return (
      <div>
        <PageHeader icon={Target} title="Metas" subtitle="Objetivos del equipo comercial, actualizados en tiempo real." />
        <Card>
          <div className="space-y-5">
            {goals.map((g) => (
              <div key={g.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-700">{g.label}</span>
                  <span className="font-semibold text-neutral-900">{g.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100">
                  <div className="h-2 rounded-full bg-cyan-600" style={{ width: `${g.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (moduleId === "administracion") {
    const rows = [
      { name: "Factura #1042 — Proveedor Insumos SA", stage: "Pendiente de pago", value: "$4,200" },
      { name: "Alquiler de oficina — Agosto", stage: "Pagada", value: "$18,500" },
      { name: "Liquidación de sueldos", stage: "En revisión", value: "$62,300" },
    ];
    return (
      <div>
        <PageHeader icon={DollarSign} title="Administración" subtitle="Cuentas por pagar, sueldos y gastos operativos del mes." />
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

  const vault = [
    { site: "Portal AFIP", user: "estudio.inmobiliaria" },
    { site: "Banco — Homebanking empresas", user: "tesoreria.inmob" },
    { site: "Registro de la Propiedad", user: "gestion.legal01" },
  ];
  return (
    <div>
      <PageHeader
        icon={KeyRound}
        title="Login y password"
        subtitle="Accesos guardados a portales externos, visibles solo para roles autorizados."
      />
      <Card>
        <div className="space-y-2">
          {vault.map((v) => (
            <div key={v.site} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-neutral-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-800">{v.site}</p>
                <p className="text-xs text-neutral-500">{v.user}</p>
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-400">••••••••</span>
            </div>
          ))}
        </div>
      </Card>
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
    caption: "Martínez Gómez, Laura c/ Aseguradora del Sur S.A. s/ Daños y Perjuicios",
    docs: [
      {
        name: "Demanda por Daños y Perjuicios",
        tag: "Demanda",
        date: "12 mar 2024",
        note: "Escrito inicial solicitando indemnización por accidente de tránsito.",
      },
      {
        name: "Contestación de Demanda",
        tag: "Contestación",
        date: "18 may 2024",
        note: "Negativa de los hechos y planteo de defensa por prescripción.",
      },
    ],
  },
  {
    caption: "Fernández Ríos, Pablo c/ Textiles del Plata S.A. s/ Despido",
    docs: [
      {
        name: "Demanda Laboral por Despido",
        tag: "Demanda",
        date: "10 ene 2025",
        note: "Reclamo por despido sin causa y diferencias salariales.",
      },
    ],
  },
];

const LEGAL_CLIENTS = [
  {
    type: "Física",
    cuit: "20-34567890-5",
    name: "Laura Martínez Gómez",
    phone: "+54 11 4567-8901",
    email: "lmartinez@email.com",
    cases: 1,
  },
  {
    type: "Física",
    cuit: "27-28765432-3",
    name: "Pablo Fernández Ríos",
    phone: "+54 221 456-7890",
    email: "pfernandez@email.com",
    cases: 1,
  },
  {
    type: "Jurídica",
    cuit: "30-71234567-8",
    name: "Textiles del Plata S.A.",
    phone: "+54 11 4321-0987",
    email: "legales@textilesdelplata.com",
    cases: 2,
  },
];

const LEGAL_DEADLINES: { title: string; tags: string[]; status: string; date: string; case: string; note: string }[] = [
  {
    title: "Expresar agravios en apelación",
    tags: ["Alta", "Plazo procesal"],
    status: "Vencido",
    date: "28 may 2026",
    case: "Ministerio Público Fiscal c/ Constructora del Sur S.A.",
    note: "Plazo fatal. Coordinar con perito para fundamentos técnicos.",
  },
  {
    title: "Presentar lista de testigos",
    tags: ["Alta", "Plazo procesal"],
    status: "Vencido",
    date: "30 may 2026",
    case: "Martínez Gómez, Laura c/ Aseguradora del Sur S.A.",
    note: "Plazo para ofrecer prueba testimonial. Coordinar con cliente.",
  },
  {
    title: "Audiencia de conciliación laboral",
    tags: ["Media", "Audiencia"],
    status: "Pendiente",
    date: "16 ago 2026",
    case: "Fernández Ríos, Pablo c/ Textiles del Plata S.A.",
    note: "SECLO. Evaluar propuesta de acuerdo con el cliente.",
  },
];

function LegalContent({ moduleId }: { moduleId: string }) {
  if (moduleId === "alertas") {
    return <AlertasHomeScreen vertical="legal" />;
  }

  if (moduleId === "causas") {
    return (
      <div>
        <LegalPageHeader icon={Gavel} title="Causas" subtitle="Seguimiento procesal de cada expediente en curso." />
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
    const personas = LEGAL_CLIENTS.filter((c) => c.type === "Física").length;
    const juridicas = LEGAL_CLIENTS.filter((c) => c.type === "Jurídica").length;
    return (
      <div>
        <LegalPageHeader icon={Users} title="Clientes" subtitle="Cartera de clientes del estudio." />
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Card className="flex items-center gap-3">
            <Users size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{personas}</p>
              <p className="text-xs text-neutral-500">Personas Físicas</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Briefcase size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{juridicas}</p>
              <p className="text-xs text-neutral-500">Personas Jurídicas</p>
            </div>
          </Card>
        </div>
        <div className="space-y-3">
          {LEGAL_CLIENTS.map((c) => (
            <Card key={c.cuit}>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Badge tone="gray">{c.type}</Badge>
                <span className="text-xs text-neutral-400">CUIT: {c.cuit}</span>
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
                  {c.cases} causa{c.cases > 1 ? "s" : ""} activa{c.cases > 1 ? "s" : ""}
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
        <LegalPageHeader icon={Calendar} title="Agenda" subtitle="Control de vencimientos y audiencias." />
        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-neutral-900">Agosto 2026</p>
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
              {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
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
            <p className="mb-3 font-semibold text-neutral-900">Próximos vencimientos</p>
            <div className="space-y-3">
              {LEGAL_DEADLINES.map((d) => (
                <div key={d.title} className="rounded-xl bg-neutral-50 p-3.5">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    {d.tags.map((t) => (
                      <Badge key={t} tone={t === "Alta" ? "red" : "amber"}>
                        {t}
                      </Badge>
                    ))}
                    <span
                      className={cn(
                        "ml-auto text-[11px] font-semibold",
                        d.status === "Vencido" ? "text-red-600" : "text-neutral-500",
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
      <LegalPageHeader icon={FolderOpen} title="Documentos" subtitle="Biblioteca de escritos y documentación legal." />
      <Card className="mb-4 border border-amber-200 !bg-amber-50 !p-4">
        <p className="text-xs text-amber-900">Esta aplicación utiliza tablas de prueba. Los datos ingresados no se guardarán.</p>
      </Card>
      <div className="space-y-4">
        {LEGAL_CASES.map((c) => (
          <Card key={c.caption}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 font-semibold text-neutral-900">
                <FolderOpen size={16} className="text-amber-600" /> {c.caption}
              </p>
              <Badge tone="gray">{c.docs.length} documentos</Badge>
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
