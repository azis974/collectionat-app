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
    label: "الرئيسية والتحكم",
    items: [
      { id: "alertas", label: "التنبيهات العامة", icon: AlertTriangle },
      { id: "resumen", label: "الملخص", icon: Home },
    ],
  },
  {
    label: "الفريق والوصول",
    items: [
      { id: "rrhh", label: "الموارد البشرية", icon: Users },
      { id: "login", label: "تسجيل الدخول وكلمة المرور", icon: KeyRound },
    ],
  },
  {
    label: "الإدارة التجارية",
    items: [
      { id: "metas", label: "الأهداف", icon: Target },
      { id: "email", label: "البريد الإلكتروني المؤسسي", icon: Mail },
      { id: "propiedades", label: "العقارات", icon: Building2 },
      { id: "chat", label: "محادثة الذكاء الاصطناعي", icon: Bot },
    ],
  },
  {
    label: "العقود والإدارة",
    items: [
      { id: "contratos", label: "العقود والإجراءات", icon: FileText },
      { id: "nueva-propiedad", label: "عقار جديد", icon: Plus },
      { id: "actividades", label: "الأنشطة", icon: Calendar },
      { id: "administracion", label: "الإدارة", icon: DollarSign },
    ],
  },
];

const LEGAL_GROUPS: ModuleGroup[] = [
  {
    label: "إدارة المكتب",
    items: [
      { id: "alertas", label: "التنبيهات العامة", icon: AlertTriangle },
      { id: "causas", label: "القضايا", icon: Gavel },
      { id: "clientes", label: "العملاء", icon: Users },
      { id: "agenda", label: "التقويم", icon: Calendar },
      { id: "documentos", label: "المستندات", icon: FolderOpen },
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
    label: "العقارات",
    subtitle: "إدارة شاملة",
    icon: Building2,
    activeClass: "bg-cyan-300 text-slate-900",
    switchActiveClass: "bg-white text-[#083344]",
    contentBg: "bg-cyan-50/40",
    accentText: "text-[#083344]",
    iconBadgeClass: "bg-cyan-800/60 text-cyan-100",
    groups: INMOBILIARIA_GROUPS,
    defaultModule: "alertas",
    footerTitle: "وصول ذو أولوية",
    footerText: "تسجيل الدخول أولاً، محادثة الذكاء الاصطناعي أدناه، وبقية الفئات مرتبة حسب العملية.",
  },
  legal: {
    label: "الإدارة القانونية",
    subtitle: "مكتب محاماة",
    icon: Scale,
    activeClass: "bg-amber-300 text-slate-900",
    switchActiveClass: "bg-amber-400 text-[#0f172a]",
    contentBg: "bg-amber-50/50",
    accentText: "text-amber-700",
    iconBadgeClass: "bg-amber-900/40 text-amber-200",
    groups: LEGAL_GROUPS,
    defaultModule: "alertas",
    footerTitle: "مكتب محاماة",
    footerText: "بيانات تجريبية — يتم تفعيل التخزين النهائي من قبل المسؤول.",
  },
};

/** Arabic/RTL translation of the AppSimulator click-through demo. The
 *  mobile drawer opens from the right (not left) to match RTL reading
 *  direction; the desktop side-by-side layout mirrors on its own since
 *  flexbox row direction is direction-aware and the parent page sets
 *  dir="rtl". */
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
    <div dir="rtl" className="relative flex h-full w-full overflow-hidden bg-white text-sm">
      {sidebarOpen && (
        <div
          role="presentation"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        style={{ right: sidebarOpen ? 0 : -288, transition: "right 300ms ease-in-out" }}
        className="absolute inset-y-0 z-30 flex h-full w-72 shrink-0 flex-col overflow-y-auto bg-[#083344] p-4 text-white md:static md:!right-auto"
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

        <p className="mb-3 flex items-center gap-1.5 px-2 text-[10px] font-semibold text-white/30">
          <Menu size={12} /> القائمة
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
                        "flex w-full items-center gap-3 rounded-full px-2.5 py-2 text-right text-[13px] font-medium transition-colors",
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
          <Menu size={14} /> القائمة
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

type HomeAlert = { title: string; detail: string; source: string; priority: "مرتفعة" | "متوسطة" };

const INMOBILIARIA_ALERTS: HomeAlert[] = [
  {
    title: "بريد إلكتروني مكرر: ماريانا ولوسيا",
    detail: "البريد الإلكتروني: mariana.gomez@example.com. الأولوية: آنا توريس.",
    source: "إدارة العملاء / الوكيل الأصلي",
    priority: "مرتفعة",
  },
  {
    title: "هاتف مكرر: دييغو وخوان",
    detail: "الهاتف: ‎+54 11 5555-1002‎. الأولوية: برونو هيريرا.",
    source: "إدارة العملاء / الوكيل الأصلي",
    priority: "مرتفعة",
  },
  {
    title: "بريد إلكتروني مكرر: دييغو وخوان",
    detail: "البريد الإلكتروني: diego.fernandez@example.com. الأولوية: برونو هيريرا.",
    source: "إدارة العملاء / الوكيل الأصلي",
    priority: "مرتفعة",
  },
  {
    title: "عقد قيد المراجعة · أمينابار 2100 3C",
    detail: "اقتراب انتهاء العقد؛ يلزم التحقق من التجديد والتوثيق والمستندات الحكومية.",
    source: "العقود / التوثيق",
    priority: "مرتفعة",
  },
  {
    title: "عقد قيد المراجعة · شارع ريفادافيا 5400 محل 3",
    detail: "اقتراب انتهاء العقد؛ يلزم التحقق من التجديد والتوثيق والمستندات الحكومية.",
    source: "العقود / التوثيق",
    priority: "مرتفعة",
  },
  {
    title: "إيجار معلّق · حجز شقة سانتا في",
    detail: "معلّق بمبلغ 5,000$. محظور لدى الإدارة/التحصيل.",
    source: "الإدارة",
    priority: "متوسطة",
  },
];

const LEGAL_ALERTS: HomeAlert[] = [
  {
    title: "موعد نهائي · تقديم مذكرة استئناف",
    detail: "استئناف يقترب موعده النهائي؛ يلزم التنسيق مع الخبير.",
    source: "القضايا / محكمة الاستئناف",
    priority: "مرتفعة",
  },
  {
    title: "جلسة قادمة · مصالحة عمالية",
    detail: "تم تحديد جلسة SECLO؛ يلزم تأكيد حضور العميل.",
    source: "التقويم / الجلسات",
    priority: "متوسطة",
  },
  {
    title: "مستندات معلّقة · الرد على الدعوى",
    detail: "لا تزال هناك أدلة مستندية يجب إرفاقها قبل التقديم.",
    source: "المستندات / التوثيق",
    priority: "مرتفعة",
  },
  {
    title: "عميل مكرر · مارتينيز غوميز",
    detail: "نفس الرقم الوطني مُدرَج في ملفّي قضية مختلفين.",
    source: "العملاء / الإدخال",
    priority: "مرتفعة",
  },
  {
    title: "أتعاب معلّقة · Textiles del Plata S.A.",
    detail: "فاتورة معلّقة التحصيل منذ أكثر من 30 يومًا.",
    source: "الإدارة",
    priority: "متوسطة",
  },
  {
    title: "موعد نهائي مؤسسي · تجديد التوكيل",
    detail: "ينتهي توكيل الوكيل هذا الشهر؛ يلزم معالجة التجديد.",
    source: "المستندات / التوثيق",
    priority: "مرتفعة",
  },
];

/**
 * Shared "home" screen for both verticals — matches the real app's landing
 * page (alerts table + KPI dashboard + HR preview stacked in one screen).
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
        { label: "الملفات القضائية", value: "12" },
        { label: "المحامون", value: "4" },
        { label: "الأتعاب", value: "$1,240,000" },
        { label: "التنبيهات", value: String(LEGAL_ALERTS.length) },
      ]
    : [
        { label: "العقارات", value: "5" },
        { label: "الموظفون", value: "4" },
        { label: "خط المبيعات", value: "$3,465,000" },
        { label: "التنبيهات", value: String(INMOBILIARIA_ALERTS.length) },
      ];

  const employee = isLegal
    ? {
        name: "Bruno Aguirre",
        role: "محامٍ مساعد",
        email: "bruno.aguirre@example.com",
        initials: "BA",
        docLabel: "رخصة المحاماة الرقمية",
        fileName: "bar-license-bruno-aguirre.pdf",
        chips: ["القضايا: 5", "الرخصة: سارية"],
      }
    : {
        name: "Mariana López",
        role: "وكيلة مبيعات",
        email: "mariana.lopez@example.com",
        initials: "ML",
        docLabel: "الهوية الرقمية",
        fileName: "id-mariana-lopez.pdf",
        chips: ["العملاء: 1", "الهوية: معلّقة"],
      };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-white", headerBg)}>
          <AlertTriangle size={18} />
        </span>
        <div>
          <h1 className={cn("text-xl", headingClass)}>التنبيهات العامة</h1>
          <p className="text-sm text-neutral-500">المواعيد النهائية والإيجارات والتكرارات مفصولة حسب القسم.</p>
        </div>
      </div>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="w-44">
            <FieldLabel>نوع التنبيه</FieldLabel>
            <SelectField>الكل</SelectField>
          </div>
          <div className="w-44">
            <FieldLabel>الأولوية</FieldLabel>
            <SelectField>الكل</SelectField>
          </div>
          <span className={cn("me-auto self-end rounded-full px-3 py-1.5 text-xs font-semibold", chipBg)}>
            {alerts.length} نشط
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
              <Badge tone={a.priority === "مرتفعة" ? "red" : "amber"}>{a.priority}</Badge>
              <button
                type="button"
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  resolveClass,
                )}
              >
                <CheckCircle2 size={13} /> حل
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <div className={cn("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white", headerBg)}>
          <BadgeIcon size={14} /> {isLegal ? "الإدارة القانونية" : "إدارة العقارات"}
        </div>
        <h2 className={cn("text-xl", headingClass)}>
          {isLegal ? "لوحة ومراقبة الملفات القضائية" : "لوحة ومراقبة العملاء"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {isLegal
            ? "نظرة سريعة على الملفات القضائية والفريق والتنبيهات والأتعاب الجارية."
            : "نظرة سريعة على العقارات والفريق والتنبيهات وخط المبيعات التشغيلي."}
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
          <h2 className={cn("text-lg", headingClass)}>الموارد البشرية</h2>
          <p className="text-sm text-neutral-500">
            مجلدات منفصلة لكل موظف تحتوي على المستندات الشخصية والمنصب وملفات PDF ونوع التوقيع.
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
              <Badge tone="emerald">نشط</Badge>
            </div>
            <p className="mt-0.5 text-xs text-neutral-500">
              المنصب: {employee.role} · البريد الإلكتروني: {employee.email}
            </p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
              <FileText size={13} /> {employee.docLabel}
            </p>
            <p className="mb-2 text-[11px] text-neutral-400" dir="ltr">{employee.fileName}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Upload size={12} /> رفع PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Eye size={12} /> عرض PDF
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Download size={12} /> تنزيل
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
          title="الملخص"
          subtitle="تحكّم تشغيلي بالعملاء المعيّنين والتنبيهات العامة وأولوية للوكيل الأول الذي تعامل مع جهة الاتصال."
        />
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "العقارات", value: "24" },
            { label: "الموظفون", value: "6" },
            { label: "خط المبيعات", value: "$4.2M" },
            { label: "التنبيهات", value: "5" },
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
              <Users size={16} /> الموارد البشرية
            </p>
            <div className="space-y-2">
              {["كاميلا روسي — وكيلة مبيعات", "إيفان سواريز — وكيل إيجارات"].map((n) => (
                <div key={n} className="rounded-xl bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-600">
                  {n}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
              <Bot size={16} /> محادثة الذكاء الاصطناعي
            </p>
            <div className="rounded-xl bg-neutral-50 p-3.5 text-sm text-neutral-600">
              &ldquo;راجع أولًا تنبيهات التكرار المعلّقة وأبقِ العميل مع الوكيل الأصلي.&rdquo;
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
      status: "متاح" | "مؤجر" | "محجوز";
      price: string;
    }[] = [
      {
        name: "Amenábar 2100 3C",
        type: "شقة",
        size: "52 م²",
        responsable: "Valeria Núñez",
        day: "8/6/2026",
        valor: "$718,000",
        status: "محجوز",
        price: "$720,000",
      },
      {
        name: "Av. Rivadavia 5400 Local 3",
        type: "محل تجاري",
        size: "110 م²",
        responsable: "Carla Medina",
        day: "8/8/2026",
        valor: "$1,300,000",
        status: "متاح",
        price: "$1,300,000",
      },
      {
        name: "Av. Santa Fe 3250 6B",
        type: "شقة",
        size: "80 م²",
        responsable: "Ana Torres",
        day: "8/2/2026",
        valor: "$184,500",
        status: "متاح",
        price: "$185,000",
      },
      {
        name: "Barrio Cerrado Los Sauces Lote 12",
        type: "أرض",
        size: "600 م²",
        responsable: "Martín Silva",
        day: "8/11/2026",
        valor: "$312,000",
        status: "متاح",
        price: "$310,000",
      },
      {
        name: "Junín 1450 PB A",
        type: "شقة",
        size: "113 م²",
        responsable: "Bruno Herrera",
        day: "8/4/2026",
        valor: "$950,000",
        status: "مؤجر",
        price: "$950,000",
      },
    ];
    const borderClass = {
      متاح: "border-s-4 border-e-0 border-[#083344]",
      مؤجر: "border-s-4 border-e-0 border-rose-700",
      محجوز: "border-s-4 border-e-0 border-sky-300",
    } as const;
    const badgeTone = { متاح: "solid", مؤجر: "solidRed", محجوز: "blue" } as const;

    return (
      <div>
        <PageHeader icon={Building2} title="قائمة العقارات" subtitle="العنوان والحالة والسعر، بألوان مرمّزة حسب الحالة." />
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.name}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm",
                borderClass[r.status],
              )}
            >
              <div className="min-w-[220px] flex-1">
                <p className="font-semibold text-neutral-900" dir="ltr">{r.name}</p>
                <p className="text-xs text-neutral-500">
                  {r.type} · {r.size} · الوكيل: {r.responsable}
                </p>
                <p className="text-xs text-neutral-500">
                  التاريخ: {r.day} · القيمة: {r.valor}
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
        <PageHeader icon={Plus} title="عقار جديد" subtitle="أضف عقارًا جديدًا إلى المحفظة خلال ثوانٍ." />
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>النوع</FieldLabel>
              <SelectField>شقة</SelectField>
            </div>
            <div>
              <FieldLabel>الحالة</FieldLabel>
              <SelectField>متاح</SelectField>
            </div>
            <div>
              <FieldLabel>السعر</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>المساحة</FieldLabel>
              <TextField placeholder="م²" />
            </div>
            <div>
              <FieldLabel>الوكيل</FieldLabel>
              <SelectField>اختر الوكيل</SelectField>
            </div>
            <div>
              <FieldLabel>المالك</FieldLabel>
              <SelectField>اختر المالك</SelectField>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            إنشاء عقار
          </button>
        </Card>
      </div>
    );
  }

  if (moduleId === "email") {
    const inbox: { subject: string; from: string; category: string; tag: string; tone: keyof typeof BADGE_TONES; note: string }[] = [
      {
        subject: "تجديد العقد معلّق",
        from: "administracion@empresa.com",
        category: "العقود",
        tag: "واردة",
        tone: "solidRed",
        note: "راجع تاريخ الانتهاء والضمانات والمستندات قبل الإرسال إلى الموثّق.",
      },
      {
        subject: "إشعار استحقاق الإيجار",
        from: "rentas@empresa.com",
        category: "الإدارة",
        tag: "واردة",
        tone: "gray",
        note: "عميل لديه دفعة شهرية قادمة؛ يتطلب متابعة من الإدارة.",
      },
      {
        subject: "استفسار مُرسَل إلى المالك",
        from: "ventas@empresa.com",
        category: "المبيعات",
        tag: "صادرة",
        tone: "blue",
        note: "تم تأكيد التوفر والقيمة المحدّثة للعقار المحدد.",
      },
    ];
    return (
      <div>
        <PageHeader
          icon={Mail}
          title="البريد الإلكتروني المؤسسي"
          subtitle="مركز مرئي لإرسال واستقبال وتصنيف الرسائل حسب القسم داخل التطبيق."
        />
        <Card>
          <div className="space-y-3">
            <div>
              <FieldLabel>إلى</FieldLabel>
              <TextField placeholder="client@company.com" />
            </div>
            <div>
              <FieldLabel>الموضوع</FieldLabel>
              <TextField placeholder="متابعة عقد أو عقار" />
            </div>
            <div>
              <FieldLabel>الرسالة</FieldLabel>
              <TextField placeholder="اكتب بريدًا مؤسسيًا" />
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white"
            >
              <Send size={15} /> إرسال البريد
            </button>
          </div>

          <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6">
            {inbox.map((m) => (
              <div key={m.subject} className="rounded-xl bg-neutral-50 p-3.5">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-neutral-800">{m.subject}</p>
                  <Badge tone={m.tone}>{m.tag}</Badge>
                </div>
                <p className="text-xs text-neutral-500" dir="ltr">
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
    const documents: { name: string; icon: LucideIcon; firma: string; status: "نشط" | "تجديد" | "معلّق" }[] = [
      { name: "عقد العمل", icon: Pencil, firma: "توقيع إلكتروني", status: "نشط" },
      { name: "البطاقة الطبية", icon: Heart, firma: "توقيع حضوري", status: "تجديد" },
      { name: "التجديد", icon: RefreshCw, firma: "التوقيع معلّق", status: "معلّق" },
      { name: "ملف العمل", icon: FolderInput, firma: "توقيع إلكتروني", status: "نشط" },
      { name: "العقود والملاحق", icon: FileText, firma: "توقيع حضوري", status: "نشط" },
    ];
    const statusTone = { نشط: "solid", تجديد: "solidRed", معلّق: "blue" } as const;

    return (
      <div>
        <PageHeader
          icon={Briefcase}
          title="الموارد البشرية"
          subtitle="مجلدات منفصلة لكل موظف تحتوي على المستندات الشخصية والمنصب وملفات PDF ونوع التوقيع."
        />
        <Card>
          <div className="flex flex-wrap items-center gap-4 border-b border-neutral-100 pb-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cyan-700 text-lg font-bold text-white">
              ML
            </span>
            <div className="min-w-[160px] flex-1">
              <p className="font-semibold text-neutral-900">Mariana López</p>
              <p className="mt-0.5 text-xs text-neutral-500">المنصب: وكيلة مبيعات</p>
              <p className="text-xs text-neutral-500" dir="ltr">mariana.lopez@example.com</p>
              <span className="mt-2 inline-block">
                <Badge tone="solid">نشط</Badge>
              </span>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                <FileText size={13} /> الهوية الرقمية
              </p>
              <p className="mb-2 text-[11px] text-neutral-400" dir="ltr">id-mariana-lopez.pdf</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Upload size={12} /> رفع PDF
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Eye size={12} /> عرض PDF
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  <Download size={12} /> تنزيل
                </button>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-2 text-center">
              <span className="rounded-lg bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600">العملاء: 1</span>
              <Badge tone="blue">الهوية: معلّقة</Badge>
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
        <PageHeader icon={Bot} title="محادثة الذكاء الاصطناعي" subtitle="مساعد مرئي للاستفسارات التشغيلية." />
        <Card className="max-w-xl">
          <div className="mb-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
            راجع أولًا تنبيهات التكرار المعلّقة وأبقِ العميل مع الوكيل الأصلي.
          </div>
          <div className="flex gap-2">
            <TextField placeholder="اسأل عن الأهداف أو التكرارات أو العملاء" />
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
        title: "معاملة بلدية – وحدة ريفادافيا",
        tags: [
          { label: "حكومي", tone: "gray" },
          { label: "قيد التنفيذ", tone: "blue" },
        ],
        property: "Av. Rivadavia 5400 Local 3",
        client: "Juan Pablo Rossi",
        responsable: "Carla Medina",
        vence: "9/30/2026",
        valor: "$1,300,000",
        etapa: "البلدية",
        entidad: "البلدية",
        docs: "رخصة تجارية ومخططات معتمدة وشهادة براءة ذمة.",
        accent: "border-s-4 border-e-0 border-neutral-200",
      },
      {
        title: "اتفاقية بيع – أمينابار 2100",
        tags: [
          { label: "عقد بيع", tone: "gray" },
          { label: "مهم", tone: "solidRed" },
          { label: "قيد المراجعة", tone: "blue" },
        ],
        property: "Amenábar 2100 3C",
        client: "Diego Fernández",
        responsable: "Valeria Núñez",
        vence: "10/12/2026",
        valor: "$720,000",
        etapa: "لدى مكتب التوثيق",
        entidad: "مكتب التوثيق",
        docs: "سند الملكية وتقرير البحث في السند وتقرير الرهون وشهادة الرقم الضريبي.",
        accent: "border-s-4 border-e-0 border-rose-700",
      },
      {
        title: "صك بيع – سانتا في 3250",
        tags: [
          { label: "التوثيق", tone: "gray" },
          { label: "قيد التنفيذ", tone: "blue" },
          { label: "مسودة", tone: "gray" },
        ],
        property: "Av. Santa Fe 3250 6B",
        client: "Sofía Álvarez",
        responsable: "Ana Torres",
        vence: "11/10/2026",
        valor: "$185,000",
        etapa: "أُرسل إلى التوثيق",
        entidad: "التوثيق",
        docs: "بيانات المشتري وشهادة مساحية وإثبات الأموال.",
        accent: "border-s-4 border-e-0 border-[#083344]",
      },
      {
        title: "تجديد – قطعة لوس ساوسيس",
        tags: [
          { label: "تجديد", tone: "gray" },
          { label: "معلّق", tone: "amber" },
          { label: "مسودة", tone: "gray" },
        ],
        property: "Barrio Cerrado Los Sauces Lote 12",
        client: "Lucía Martínez",
        responsable: "Martín Silva",
        vence: "8/31/2027",
        valor: "$310,000",
        etapa: "تحضير داخلي",
        entidad: "إدارة اتحاد الملاك",
        docs: "",
        accent: "border-s-4 border-e-0 border-neutral-200",
      },
    ];

    return (
      <div>
        <PageHeader
          icon={FileText}
          title="العقود والإجراءات"
          subtitle="الإنشاء وتتبع المراحل: التوثيق ومكتب الصكوك والسجل العام والسجل العقاري والبلدية والبنك والضمانات."
        />
        <Card className="mb-4 bg-neutral-50">
          <p className="text-sm font-semibold text-neutral-900">الوصول مقيّد</p>
          <p className="mt-1 text-xs text-neutral-600">
            فقط قسم العقود/التوثيق أو الإدارة يمكنهم تعديل الملفات؛ المبيعات للعرض فقط — الأحمر يعني مهم، الأصفر
            يعني قيد التنفيذ/معلّق، والأخضر يعني إيجابي.
          </p>
        </Card>
        <Card className="mb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel>اسم الملف</FieldLabel>
              <TextField placeholder="عقد إيجار خونين" />
            </div>
            <div>
              <FieldLabel>العقار</FieldLabel>
              <SelectField>اختر العقار</SelectField>
            </div>
            <div>
              <FieldLabel>العميل</FieldLabel>
              <SelectField>اختر العميل</SelectField>
            </div>
            <div>
              <FieldLabel>الوكيل</FieldLabel>
              <SelectField>اختر الوكيل</SelectField>
            </div>
            <div>
              <FieldLabel>إشارة الحالة</FieldLabel>
              <SelectField>قيد التنفيذ</SelectField>
            </div>
            <div>
              <FieldLabel>نوع الإجراء</FieldLabel>
              <SelectField>عقد إيجار</SelectField>
            </div>
            <div>
              <FieldLabel>الحالة</FieldLabel>
              <SelectField>مسودة</SelectField>
            </div>
            <div>
              <FieldLabel>مرحلة العملية</FieldLabel>
              <SelectField>تحضير داخلي</SelectField>
            </div>
            <div>
              <FieldLabel>الجهة</FieldLabel>
              <SelectField>التوثيق</SelectField>
            </div>
            <div>
              <FieldLabel>تاريخ البدء</FieldLabel>
              <TextField placeholder="2026-08-07" />
            </div>
            <div>
              <FieldLabel>تاريخ الاستحقاق</FieldLabel>
              <TextField placeholder="2027-08-07" />
            </div>
            <div>
              <FieldLabel>قيمة العقد</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>المستندات المطلوبة</FieldLabel>
              <TextField placeholder="الهوية، الضمانات، السند، التقارير" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>ملاحظات</FieldLabel>
              <TextField placeholder="ملاحظات داخلية" />
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            إنشاء ملف
          </button>
        </Card>

        <p className="mb-3 text-sm font-semibold text-neutral-900">الملفات الجارية</p>
        <div className="space-y-3">
          {expedientes.map((e) => (
            <div key={e.title} className={cn("rounded-xl bg-white p-4 shadow-sm", e.accent)}>
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-900">{e.title}</p>
                  <p className="text-xs text-neutral-500" dir="ltr">{e.property}</p>
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
                العميل: {e.client} · الوكيل: {e.responsable}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  الاستحقاق: <span className="font-semibold text-neutral-800">{e.vence}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  القيمة: <span className="font-semibold text-neutral-800">{e.valor}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  المرحلة: <span className="font-semibold text-neutral-800">{e.etapa}</span>
                </div>
                <div className="rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[11px] text-neutral-600">
                  الجهة: <span className="font-semibold text-neutral-800">{e.entidad}</span>
                </div>
              </div>
              {e.docs && <p className="mt-2 text-[11px] text-neutral-500">المستندات: {e.docs}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (moduleId === "actividades") {
    const activities = [
      { title: "معاينة شقة سانتا في", type: "معاينة", date: "8/10/2026" },
      { title: "مكالمة متابعة العرض", type: "مكالمة", date: "8/12/2026" },
      { title: "توقيع حجز خونين", type: "توقيع", date: "8/15/2026" },
      { title: "تقييم قطعة لوس ساوسيس", type: "تقييم", date: "8/14/2026" },
    ];
    return (
      <div>
        <PageHeader icon={Calendar} title="الأنشطة" subtitle="المهام والزيارات القادمة المجدولة من قبل فريق المبيعات." />
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
      { label: "المبيعات", current: 2120000, target: 6400000 },
      { label: "الإيجارات", current: 1510000, target: 3800000 },
    ];
    const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

    return (
      <div>
        <PageHeader icon={Target} title="لوحة الأهداف الشهرية" subtitle="أهداف المبيعات والإيجارات تُتابع بشكل منفصل." />
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          {goals.map((g) => (
            <Card key={g.label}>
              <p className="font-semibold text-neutral-900">{g.label}</p>
              <p className="mt-1 text-sm text-neutral-500" dir="ltr">
                {fmt(g.current)} / {fmt(g.target)}
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
              <FieldLabel>الشهر</FieldLabel>
              <TextField placeholder="2026-08" />
            </div>
            <div>
              <FieldLabel>هدف المبيعات</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>هدف الإيجارات</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>تقدم المبيعات</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>تقدم الإيجارات</FieldLabel>
              <TextField placeholder="$ 0" />
            </div>
            <div>
              <FieldLabel>الموظف</FieldLabel>
              <SelectField>عام</SelectField>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-[#083344] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            إرسال الهدف الشهري
          </button>
        </Card>
      </div>
    );
  }

  if (moduleId === "administracion") {
    const rows = [
      { name: "فاتورة #1042 — مورد Insumos SA", stage: "الدفع معلّق", value: "$4,200" },
      { name: "إيجار المكتب — أغسطس", stage: "مدفوع", value: "$18,500" },
      { name: "تسوية الرواتب", stage: "قيد المراجعة", value: "$62,300" },
    ];
    return (
      <div>
        <PageHeader icon={DollarSign} title="الإدارة" subtitle="الحسابات الدائنة والرواتب والمصاريف التشغيلية الشهرية." />
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
    label: "الإدارة",
    description: "تحكّم كامل بالنظام والتحصيلات والمستخدمين والصلاحيات.",
    perms: ["إدارة المستخدمين وكلمات المرور", "عرض التحصيلات والتنبيهات الحرجة", "تعديل الملفات والعقود"],
  };
  const accounts = [
    { name: "Ana Torres", role: "وكيلة مبيعات", login: "ana.torres@example.com", contact: "Mariana Gómez · المالكة" },
    { name: "Bruno Herrera", role: "وكيل إيجارات", login: "bruno.herrera@example.com", contact: "Diego Fernández · البائع" },
  ];

  return (
    <div>
      <PageHeader
        icon={KeyRound}
        title="تسجيل الدخول وكلمة المرور حسب الدور"
        subtitle="وصول داخلي مفصول حسب الموظف والدور؛ يسجّل كل مستخدم الدخول بصلاحيات حسب قسمه."
      />
      <Card className="mb-4">
        <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-start">
          <div>
            <FieldLabel>دور الوصول</FieldLabel>
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
            <p className="text-xs text-neutral-500" dir="ltr">Login: {a.login}</p>
            <p className="text-xs text-neutral-500">كلمة المرور: محمية من قبل الإدارة</p>
            <p className="mt-1 text-xs text-neutral-500">الدور المُعيَّن: {a.role} · عميل واحد</p>
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-neutral-50 p-2.5 text-[11px] text-neutral-600">
              <ShieldCheck size={13} className="shrink-0 text-cyan-700" /> الصلاحيات مطبّقة حسب القسم وأولوية العميل
              الأصلي.
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
    caption: "مارتينيز غوميز، لاورا ضد Aseguradora del Sur S.A. — دعوى تعويض أضرار",
    docs: [
      {
        name: "لائحة دعوى التعويض",
        tag: "دعوى",
        date: "12 مارس 2024",
        note: "لائحة أولية تطالب بتعويض عن حادث مروري.",
      },
      {
        name: "الرد على الدعوى",
        tag: "رد",
        date: "18 مايو 2024",
        note: "إنكار للوقائع ودفع بالتقادم.",
      },
    ],
  },
  {
    caption: "فرنانديز ريوس، بابلو ضد Textiles del Plata S.A. — فصل تعسفي",
    docs: [
      {
        name: "دعوى عمالية بسبب الفصل التعسفي",
        tag: "دعوى",
        date: "10 يناير 2025",
        note: "مطالبة بسبب الفصل دون مبرر وفروقات الأجور.",
      },
    ],
  },
];

const LEGAL_CLIENTS = [
  {
    type: "فرد",
    cuit: "20-34567890-5",
    name: "Laura Martínez Gómez",
    phone: "+54 11 4567-8901",
    email: "lmartinez@email.com",
    cases: 1,
  },
  {
    type: "فرد",
    cuit: "27-28765432-3",
    name: "Pablo Fernández Ríos",
    phone: "+54 221 456-7890",
    email: "pfernandez@email.com",
    cases: 1,
  },
  {
    type: "شركة",
    cuit: "30-71234567-8",
    name: "Textiles del Plata S.A.",
    phone: "+54 11 4321-0987",
    email: "legales@textilesdelplata.com",
    cases: 2,
  },
];

const LEGAL_DEADLINES: { title: string; tags: string[]; status: string; date: string; case: string; note: string }[] = [
  {
    title: "تقديم مذكرة استئناف",
    tags: ["مرتفعة", "موعد إجرائي"],
    status: "متأخر",
    date: "28 مايو 2026",
    case: "Ministerio Público Fiscal ضد Constructora del Sur S.A.",
    note: "موعد نهائي حاسم. يلزم التنسيق مع الخبير للأسس الفنية.",
  },
  {
    title: "تقديم قائمة الشهود",
    tags: ["مرتفعة", "موعد إجرائي"],
    status: "متأخر",
    date: "30 مايو 2026",
    case: "مارتينيز غوميز، لاورا ضد Aseguradora del Sur S.A.",
    note: "موعد تقديم شهادة الشهود. يلزم التنسيق مع العميل.",
  },
  {
    title: "جلسة مصالحة عمالية",
    tags: ["متوسطة", "جلسة"],
    status: "معلّقة",
    date: "16 أغسطس 2026",
    case: "فرنانديز ريوس، بابلو ضد Textiles del Plata S.A.",
    note: "SECLO. تقييم عرض التسوية مع العميل.",
  },
];

function LegalContent({ moduleId }: { moduleId: string }) {
  if (moduleId === "alertas") {
    return <AlertasHomeScreen vertical="legal" />;
  }

  if (moduleId === "causas") {
    return (
      <div>
        <LegalPageHeader icon={Gavel} title="القضايا" subtitle="متابعة إجرائية لكل ملف قضية نشط." />
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
    const personas = LEGAL_CLIENTS.filter((c) => c.type === "فرد").length;
    const juridicas = LEGAL_CLIENTS.filter((c) => c.type === "شركة").length;
    return (
      <div>
        <LegalPageHeader icon={Users} title="العملاء" subtitle="محفظة عملاء المكتب." />
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Card className="flex items-center gap-3">
            <Users size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{personas}</p>
              <p className="text-xs text-neutral-500">الأفراد</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Briefcase size={20} className="text-amber-600" />
            <div>
              <p className="text-xl font-bold text-neutral-900">{juridicas}</p>
              <p className="text-xs text-neutral-500">الشركات</p>
            </div>
          </Card>
        </div>
        <div className="space-y-3">
          {LEGAL_CLIENTS.map((c) => (
            <Card key={c.cuit}>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Badge tone="gray">{c.type}</Badge>
                <span className="text-xs text-neutral-400" dir="ltr">CUIT: {c.cuit}</span>
              </div>
              <p className="font-semibold text-neutral-900">{c.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-neutral-500" dir="ltr">
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {c.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={12} /> {c.email}
                </span>
                <span>{c.cases} قضية نشطة</span>
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
        <LegalPageHeader icon={Calendar} title="التقويم" subtitle="متابعة المواعيد النهائية والجلسات." />
        <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-neutral-900">أغسطس 2026</p>
              <div className="flex gap-1">
                <button type="button" className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100">
                  <ChevronRight size={16} />
                </button>
                <button type="button" className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100">
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
              {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((d, i) => (
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
            <p className="mb-3 font-semibold text-neutral-900">المواعيد النهائية القادمة</p>
            <div className="space-y-3">
              {LEGAL_DEADLINES.map((d) => (
                <div key={d.title} className="rounded-xl bg-neutral-50 p-3.5">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    {d.tags.map((t) => (
                      <Badge key={t} tone={t === "مرتفعة" ? "red" : "amber"}>
                        {t}
                      </Badge>
                    ))}
                    <span
                      className={cn(
                        "ms-auto text-[11px] font-semibold",
                        d.status === "متأخر" ? "text-red-600" : "text-neutral-500",
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
      <LegalPageHeader icon={FolderOpen} title="المستندات" subtitle="مكتبة المرافعات والمستندات القانونية." />
      <Card className="mb-4 border border-amber-200 !bg-amber-50 !p-4">
        <p className="text-xs text-amber-900">يستخدم هذا التطبيق جداول تجريبية. لن يتم حفظ البيانات المُدخلة.</p>
      </Card>
      <div className="space-y-4">
        {LEGAL_CASES.map((c) => (
          <Card key={c.caption}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 font-semibold text-neutral-900">
                <FolderOpen size={16} className="text-amber-600" /> {c.caption}
              </p>
              <Badge tone="gray">{c.docs.length} مستندات</Badge>
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
