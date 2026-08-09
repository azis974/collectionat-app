"use client";

import React, { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig, useScroll } from "framer-motion";
import {
  Sparkles,
  FileX2,
  Database,
  Zap,
  Network,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Menu,
  X,
  LayoutDashboard,
  FileInput,
  Workflow,
  BarChart3,
  UploadCloud,
  ToggleRight,
  ToggleLeft,
  Play,
  Loader2,
  Quote,
  Home,
  FileText,
  Mail,
  Users,
  AlertTriangle,
  Scale,
  Gavel,
  Calendar,
  FolderOpen,
  Landmark,
  Lock,
  Building2,
  TrendingUp,
  Briefcase,
  Crown,
  type LucideIcon,
} from "lucide-react";
import Velaris from "@/components/ui/velaris";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";
import { LensCard } from "@/components/ui/lens-card";
import FUIBentoGridDark from "@/components/ui/bento";
import AskCollectionatChat from "@/components/ui/ruixen-moon-chat";
import FloatingOrbs from "@/components/ui/floating-orbs";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Subtle top-of-page radial glow + grid texture, à la Vercel/Linear. Pure CSS, no canvas. */
function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] overflow-hidden">
      <div
        className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.22) 35%, rgba(139,92,246,0.12) 55%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 bg-grid opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </div>
  );
}

/** Fixed gradient bar across the top of the viewport that fills as the page scrolls — ties the whole page together as one continuous piece. */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"
    />
  );
}

/** Small uppercase pill label used above every section heading — kept in one place so the whole page reads as one system instead of a patchwork of one-off styles. */
function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest",
        tone === "dark" ? "border-white/10 bg-white/5 text-blue-300" : "border-blue-100 bg-blue-50 text-blue-600",
      )}
    >
      {children}
    </span>
  );
}

/** Decorative ring/medallion — a conic-gradient masked into a donut shape (mosaic-bento motif, shared look with components/ui/bento.tsx). */
function DonutRing({ gradient, className = "" }: { gradient: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full opacity-60", className)}
      style={{
        background: gradient,
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
      }}
    />
  );
}

/** Soft gradient blend between a dark section and a white one, instead of a hard color cut. */
function SectionSeam({ direction }: { direction: "to-white" | "to-black" }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-16 sm:h-20", direction === "to-white" ? "bg-gradient-to-b from-black to-white" : "bg-gradient-to-b from-white to-black")}
    />
  );
}

/** Card wrapper with a spotlight glow that follows the cursor (Aceternity-style), tuned subtle. */
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
      className={`group relative rounded-2xl border bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(96,165,250,0.14), transparent 65%)",
        }}
      />
      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}

/** Clean two-tone gradient accent for headline text — subtle, not animated. */
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/** Primary CTA with a glow shadow and a diagonal shine sweep on hover. */
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
      className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_rgba(59,130,246,0.6)] ${className}`}
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
      if (!res.ok) throw new Error(data.error || "No se pudo enviar la solicitud.");
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "No se pudo enviar la solicitud.");
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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0c] p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={40} className="text-emerald-400" />
            <p id="demo-modal-title" className="text-base font-semibold text-white">
              ¡Listo! Recibimos tu solicitud.
            </p>
            <p className="text-sm text-neutral-400">Un especialista te va a contactar en menos de 24 horas hábiles.</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h3 id="demo-modal-title" className="text-lg font-semibold text-white">
              Solicitar una demo
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              Contanos un poco de tu empresa y coordinamos una demo personalizada.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="demo-name" className="mb-1.5 block text-xs font-medium text-neutral-300">
                  Nombre
                </label>
                <input
                  id="demo-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white placeholder:text-neutral-600 focus:border-blue-400"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="demo-email" className="mb-1.5 block text-xs font-medium text-neutral-300">
                  Correo de trabajo
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white placeholder:text-neutral-600 focus:border-blue-400"
                  placeholder="tu@empresa.com"
                />
              </div>
              <div>
                <label htmlFor="demo-company" className="mb-1.5 block text-xs font-medium text-neutral-300">
                  Empresa
                </label>
                <input
                  id="demo-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white placeholder:text-neutral-600 focus:border-blue-400"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              {status === "error" && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  "Solicitar demo"
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
    color: "blue" as const,
    title: "Adiós a Excel",
    description: "Reemplaza hojas de cálculo dispersas y propensas a errores por un sistema que tu equipo realmente puede confiar.",
    span: "lg:col-span-3",
  },
  {
    icon: Database,
    color: "indigo" as const,
    title: "Gestión Centralizada Total",
    description: "Toda la información crítica de tu empresa —ventas, finanzas, operaciones— vive en una sola plataforma unificada.",
    span: "lg:col-span-3",
  },
  {
    icon: Zap,
    color: "amber" as const,
    title: "Alto Rendimiento",
    description: "Datos en tiempo real, sin cuellos de botella ni archivos duplicados: una plataforma que se mueve a la velocidad de tu negocio.",
    span: "lg:col-span-2",
  },
  {
    icon: Network,
    color: "violet" as const,
    title: "Integración con Microsoft",
    description: "Conecta de forma nativa con Outlook, Teams, SharePoint y OneDrive — tu equipo sigue trabajando donde ya trabaja.",
    span: "lg:col-span-2",
  },
  {
    icon: Lock,
    color: "teal" as const,
    title: "Permisos por Rol",
    description: "Cada persona ve y edita solo su área — administración, propiedades, ventas. El dueño o administrador general mantiene visibilidad y control total sobre todo el sistema.",
    span: "lg:col-span-2",
  },
];

const DATA_PREVIEW = [
  { label: "Hojas migradas", value: "1,204", unit: "", note: "▲ 86 esta semana" },
  { label: "Integraciones", value: "4", unit: "/4", note: "Outlook, Teams, SharePoint, OneDrive" },
  { label: "Ahorro semanal", value: "6.4", unit: "h/persona", note: "▲ 12% vs. mes anterior" },
  { label: "Precisión de datos", value: "99.2", unit: "%", note: "0 conflictos sin resolver" },
  { label: "Usuarios activos", value: "128", unit: "", note: "22 equipos conectados" },
  { label: "Errores evitados", value: "312", unit: "/mes", note: "vs. hojas de cálculo manuales" },
];

const TRUST_COMPANIES = [
  "Horizon Retail Group",
  "Meridian Foods",
  "Northbridge Trading Co.",
  "Atlas Contracting",
  "Summit Sports Association",
  "Ridgeline Construction",
];

const TESTIMONIALS = [
  {
    quote:
      "Teníamos ventas, finanzas y soporte en tres hojas de cálculo distintas que nunca coincidían. Con Collectionat todo el equipo mira los mismos números.",
    role: "Directora de Operaciones",
    company: "Empresa de retail, 80 empleados",
  },
  {
    quote:
      "La integración con Outlook y Teams fue lo que nos convenció — no tuvimos que cambiar la forma en que ya trabajábamos, solo dejamos de duplicar datos.",
    role: "Gerente de Finanzas",
    company: "Empresa de manufactura, 150 empleados",
  },
  {
    quote:
      "Migramos más de 40 hojas de cálculo en la primera semana. Lo que antes tomaba días de cuadrar ahora se actualiza solo.",
    role: "Jefe de Ventas",
    company: "Empresa de logística, 45 empleados",
  },
];

const INDUSTRIES = [
  {
    label: "Inmobiliarias",
    icon: Home,
    description:
      "Propiedades, contratos y al equipo comercial en un solo lugar — con email corporativo y alertas de vencimientos integrados.",
    modules: [
      { icon: Home, name: "Propiedades" },
      { icon: FileText, name: "Contratos y trámites" },
      { icon: Mail, name: "Email corporativo" },
      { icon: Users, name: "Recursos humanos" },
      { icon: Sparkles, name: "Chat AI" },
      { icon: AlertTriangle, name: "Alertas generales" },
    ],
  },
  {
    label: "Estudios jurídicos",
    icon: Scale,
    description:
      "Causas, clientes y vencimientos judiciales, con acceso directo a portales oficiales para no salir de la plataforma.",
    modules: [
      { icon: Gavel, name: "Causas" },
      { icon: Users, name: "Clientes" },
      { icon: Calendar, name: "Agenda" },
      { icon: FolderOpen, name: "Documentos" },
      { icon: Landmark, name: "Portales oficiales" },
    ],
  },
  {
    label: "Tu rubro también",
    icon: Building2,
    description:
      "Inmobiliarias y estudios jurídicos son solo dos ejemplos: cada implementación de Collectionat se arma a medida, con los módulos y permisos que tu empresa realmente necesita.",
    modules: [
      { icon: LayoutDashboard, name: "Dashboard a medida" },
      { icon: Workflow, name: "Automatización de flujos" },
      { icon: Lock, name: "Permisos por rol" },
      { icon: Network, name: "Integración Microsoft" },
    ],
  },
];

const HOW_IT_WORKS = [
  {
    icon: LayoutDashboard,
    title: "Exploración del Dashboard",
    description: "Visualiza KPIs clave en tiempo real —ventas, cuentas por cobrar, tareas pendientes— para tomar decisiones sin esperar reportes.",
  },
  {
    icon: FileInput,
    title: "Gestión de Operaciones",
    description: "Selecciona el módulo que necesitas y carga tus datos sin fricción mediante formularios optimizados.",
  },
  {
    icon: Workflow,
    title: "Automatización de Flujos",
    description: "Activa procesos automatizados con un solo clic: reasignación de tareas, notificaciones y aprobaciones.",
  },
  {
    icon: BarChart3,
    title: "Reportes Dinámicos",
    description: "Genera reportes de rendimiento al instante, en gráficos interactivos, sin depender de Excel.",
  },
];

const AUTOMATION_RULES = [
  { name: "Reasignar tarea si vence sin respuesta", active: true },
  { name: "Notificar a Teams al superar el presupuesto", active: true },
  { name: "Aprobar automáticamente compras menores a $500", active: false },
];

const REPORT_BARS = [
  { label: "Ene", value: 45 },
  { label: "Feb", value: 62 },
  { label: "Mar", value: 58 },
  { label: "Abr", value: 80 },
  { label: "May", value: 96 },
];

const CRM_PREVIEW = [
  { name: "Orion Retail Group", stage: "Negociación", value: "$42,300" },
  { name: "Meridian Foods", stage: "Propuesta enviada", value: "$18,750" },
  { name: "Atlas Contracting", stage: "Cierre programado", value: "$96,400" },
];

const ADMIN_PREVIEW = [
  { name: "Factura #1042 — Proveedor Insumos SA", stage: "Pendiente de pago", value: "$4,200" },
  { name: "Alquiler de oficina — Agosto", stage: "Pagada", value: "$18,500" },
  { name: "Liquidación de sueldos", stage: "En revisión", value: "$62,300" },
];

const PROPERTIES_PREVIEW = [
  { name: "Depto 4B — Palermo", stage: "Alquilado", value: "$185.000/mes" },
  { name: "Local comercial — Belgrano", stage: "Disponible", value: "$310.000/mes" },
  { name: "Casa — Nordelta", stage: "En negociación", value: "$92.000.000" },
];

const PRODUCT_PAGES = [
  {
    tag: "Panel principal",
    title: "Todo tu negocio en una sola pantalla",
    description: "La página de inicio reúne los indicadores que más te importan, actualizados en tiempo real, sin pedirle un reporte a nadie.",
    points: ["KPIs en tiempo real", "Alertas cuando algo se sale de rango", "Accesos directos a cada módulo"],
    screen: "dashboard" as const,
  },
  {
    tag: "Ventas y CRM",
    title: "Tu pipeline de ventas, siempre al día",
    description: "Cada oportunidad, con su historial completo de correos y reuniones, sincronizada con Outlook y Teams — sin hojas de cálculo duplicadas.",
    points: ["Historial completo por cliente", "Sincronizado con Microsoft 365", "Etapas de negociación visibles para todo el equipo"],
    screen: "crm" as const,
  },
  {
    tag: "Reportes",
    title: "Reportes que se arman solos",
    description: "Elige el periodo y el indicador; el gráfico se genera al instante, listo para exportar o compartir.",
    points: ["Gráficos interactivos", "Exportación a PDF en un clic", "Cero fórmulas de Excel que mantener"],
    screen: "reports" as const,
  },
  {
    tag: "Automatización",
    title: "Flujos que corren en piloto automático",
    description: "Define la regla una vez y deja que Collectionat reasigne tareas, avise a tu equipo y apruebe lo rutinario por ti.",
    points: ["Reglas condicionales sin código", "Notificaciones directas a Teams", "Auditoría de cada acción automática"],
    screen: "automation" as const,
  },
];

const VIDEO_CHAPTERS = [
  { label: "Dashboard", time: 0 },
  { label: "Ventas y CRM", time: 32 },
  { label: "Automatización", time: 65 },
  { label: "Reportes", time: 100 },
];

/**
 * Interactive demo video: click-to-play plus clickable chapter markers that
 * seek to a timestamp (real <video> API calls, not decorative). No real
 * footage exists yet — drop one at /public/videos/collectionat-demo.mp4 and
 * this works as-is; until then it gracefully shows the poster/overlay only.
 */
function VideoDemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const playFrom = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    video.play().catch(() => {});
    setStarted(true);
  };

  return (
    <section className="relative z-0 overflow-hidden border-t border-white/5 px-6 py-24">
      <FloatingOrbs className="-z-10" colors={["#818cf8", "#2dd4bf", "#fbbf24"]} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <Eyebrow>Demo</Eyebrow>
        <h2 className="mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Ve Collectionat en acción
        </h2>
        <p className="mt-4 text-lg text-neutral-400">
          Un recorrido de dos minutos por el dashboard, ventas, automatización y reportes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        className="relative z-10 mx-auto mt-14 max-w-4xl"
      >
        <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-black to-violet-950/40">
          <video
            ref={videoRef}
            controls={started}
            playsInline
            onPlay={() => setStarted(true)}
            className="h-full w-full object-cover"
          >
            <source src="/videos/collectionat-demo.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>

          {!started && (
            <button
              type="button"
              onClick={() => playFrom(0)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                <Play size={24} fill="black" />
              </span>
              <span className="text-sm font-medium text-neutral-200">Reproducir demo (2:00)</span>
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {VIDEO_CHAPTERS.map((chapter) => (
            <button
              key={chapter.label}
              type="button"
              onClick={() => playFrom(chapter.time)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-blue-500/30 hover:text-white"
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/** Shared row layout for list-style module previews (CRM, Administración, Propiedades). */
function ListPreview({ rows }: { rows: { name: string; stage: string; value: string }[] }) {
  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3"
        >
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium text-white">{row.name}</span>
            <span className="block text-[10px] text-neutral-500">{row.stage}</span>
          </span>
          <span className="shrink-0 text-xs font-semibold text-blue-400">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Dark mini app-screen rendered inside the tablet frame of each product page. */
function TabletScreen({
  type,
}: {
  type: "dashboard" | "crm" | "reports" | "automation" | "administracion" | "propiedades";
}) {
  if (type === "dashboard") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {DATA_PREVIEW.slice(0, 4).map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[9px] uppercase tracking-wider text-neutral-500">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {item.value}
              <span className="ml-1 text-[10px] font-normal text-neutral-500">{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "crm") {
    return <ListPreview rows={CRM_PREVIEW} />;
  }

  if (type === "administracion") {
    return <ListPreview rows={ADMIN_PREVIEW} />;
  }

  if (type === "propiedades") {
    return <ListPreview rows={PROPERTIES_PREVIEW} />;
  }

  if (type === "reports") {
    return (
      <div className="flex h-40 items-end gap-3">
        {REPORT_BARS.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-28 w-full items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-violet-400"
                style={{ height: `${bar.value}%` }}
              />
            </div>
            <span className="text-[9px] text-neutral-500">{bar.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {AUTOMATION_RULES.map((rule) => (
        <div
          key={rule.name}
          className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3"
        >
          <p className="text-xs text-neutral-300">{rule.name}</p>
          {rule.active ? (
            <ToggleRight size={22} className="shrink-0 text-blue-400" />
          ) : (
            <ToggleLeft size={22} className="shrink-0 text-neutral-600" />
          )}
        </div>
      ))}
    </div>
  );
}

const SIM_MODULES = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, screen: "dashboard" as const },
  { id: "ventas", label: "Ventas y CRM", icon: TrendingUp, screen: "crm" as const },
  { id: "reportes", label: "Reportes", icon: BarChart3, screen: "reports" as const },
  { id: "automatizacion", label: "Automatización", icon: Workflow, screen: "automation" as const },
  { id: "propiedades", label: "Propiedades", icon: Home, screen: "propiedades" as const },
  { id: "administracion", label: "Administración", icon: Briefcase, screen: "administracion" as const },
] as const;

type SimModuleId = (typeof SIM_MODULES)[number]["id"];

const SIM_ROLES: { id: string; label: string; icon: LucideIcon; modules: SimModuleId[] }[] = [
  {
    id: "owner",
    label: "Dueño",
    icon: Crown,
    modules: ["dashboard", "ventas", "reportes", "automatizacion", "propiedades", "administracion"],
  },
  { id: "admin", label: "Administración", icon: Briefcase, modules: ["dashboard", "administracion"] },
  { id: "properties", label: "Propiedades", icon: Home, modules: ["dashboard", "propiedades"] },
];

/**
 * Interactive app-shell simulator: sidebar navigation + a role switcher that
 * filters which modules are visible, demonstrating the real "Permisos por
 * Rol" behavior (each role only sees its own area, the owner sees all)
 * instead of just describing it in copy.
 */
function AppSimulatorSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeModule, setActiveModule] = useState<SimModuleId>("dashboard");

  const role = SIM_ROLES[roleIndex];
  const visibleModules = SIM_MODULES.filter((m) => (role.modules as string[]).includes(m.id));
  const currentModule = visibleModules.find((m) => m.id === activeModule) ?? visibleModules[0];

  const selectRole = (index: number) => {
    setRoleIndex(index);
    if (!(SIM_ROLES[index].modules as string[]).includes(activeModule)) {
      setActiveModule(SIM_ROLES[index].modules[0]);
    }
  };

  return (
    <section id="simulador" className="relative z-0 overflow-hidden border-t border-white/5 px-6 py-24">
      <FloatingOrbs className="-z-10" colors={["#3b82f6", "#a855f7", "#22d3ee"]} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative z-10 mx-auto mb-14 max-w-2xl text-center"
      >
        <Eyebrow>Simulador</Eyebrow>
        <h2 className="mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Navega la aplicación vos mismo
        </h2>
        <p className="mt-4 text-lg text-neutral-400">
          Elegí un rol y recorré el sidebar — cada persona ve solo los módulos que le corresponden.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Estás viendo como:</span>
          {SIM_ROLES.map((r, index) => {
            const active = roleIndex === index;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRole(index)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-blue-500/40 bg-blue-500/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white",
                )}
              >
                <r.icon size={16} />
                {r.label}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-[0_0_60px_-20px_rgba(59,130,246,0.35)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-xs text-neutral-500">app.collectionat.com</span>
          </div>

          <div className="flex min-h-[420px] flex-col sm:flex-row">
            <div className="flex shrink-0 flex-row gap-1 overflow-x-auto border-b border-white/10 p-3 sm:w-56 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
              {visibleModules.map((m) => {
                const active = m.id === currentModule?.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveModule(m.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      active ? "bg-blue-500/15 text-white" : "text-neutral-400 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    <m.icon size={17} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModule?.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {currentModule?.label}
                  </p>
                  {currentModule && <TabletScreen type={currentModule.screen} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Vista simulada con datos de ejemplo — así se comporta el control de accesos en la aplicación real.
        </p>
      </motion.div>
    </section>
  );
}

const FEATURE_ICON_STYLES = {
  blue: "bg-blue-500/10 text-blue-400",
  indigo: "bg-indigo-500/10 text-indigo-400",
  amber: "bg-amber-500/10 text-amber-400",
  violet: "bg-white/10 text-white",
  teal: "bg-teal-500/10 text-teal-400",
};

const FEATURE_RINGS: Record<string, string> = {
  blue: "conic-gradient(from 160deg, #60a5fa, #6366f1, #60a5fa)",
  indigo: "conic-gradient(from 40deg, #818cf8, #ec4899, #818cf8)",
  teal: "conic-gradient(from 300deg, #2dd4bf, #3b82f6, #2dd4bf)",
};

export default function CollectionatLanding() {
  const [itemsCount, setItemsCount] = useState(150);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const estimatedHoursSaved = Math.round(itemsCount * 0.4);
  const estimatedOrganizationScore = Math.min(99, 70 + Math.floor(itemsCount / 50));

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <div className="relative z-0 min-h-screen bg-black font-sans text-neutral-300 selection:bg-blue-500/30 selection:text-white">
        <AmbientGlow />

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-blue-600 shadow-lg">
                <Image
                  src="/logo.jpg"
                  alt="Collectionat Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">Collectionat</span>
            </div>

            <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-400 md:flex">
              <a href="#features" className="transition-colors hover:text-white">Características</a>
              <a href="#industrias" className="transition-colors hover:text-white">Industrias</a>
              <a href="#como-funciona" className="transition-colors hover:text-white">Cómo funciona</a>
              <a href="#simulador" className="transition-colors hover:text-white">Simulador</a>
              <a href="#calculator" className="transition-colors hover:text-white">Calculadora</a>
              <a href="#pricing" className="transition-colors hover:text-white">Planes</a>
            </nav>

            <div className="hidden items-center gap-4 md:flex">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Comenzar Gratis
              </motion.a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="text-neutral-300 hover:text-white md:hidden"
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
                className="overflow-hidden border-b border-white/10 bg-black md:hidden"
              >
                <div className="flex flex-col gap-4 px-6 py-4">
                  <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Características</a>
                  <a href="#industrias" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Industrias</a>
                  <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Cómo funciona</a>
                  <a href="#simulador" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Simulador</a>
                  <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Calculadora</a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Planes</a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="rounded-xl bg-white py-2.5 text-center font-medium text-black">Comenzar Gratis</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Hero Section */}
        <section className="relative z-0 overflow-hidden px-6 pb-32 pt-20">
          {/* Animated WebGL gradient background (components/ui/velaris.tsx) */}
          <div className="absolute inset-0 -z-20">
            <Velaris
              height="100%"
              bg="#000000"
              colors={["#2563eb", "#a855f7", "#ec4899", "#f97316"]}
              speed={2.4}
              grain={0.2}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="relative z-10 mx-auto max-w-5xl text-center"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-300">
              <Sparkles size={14} className="text-blue-400" /> Gestión todo en uno, integrada con Microsoft
            </div>

            <h1 className="mb-8 text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl">
              Dile adiós a Excel. <br />
              <GradientText>Centraliza tu empresa.</GradientText>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
              CollectionatApp es la plataforma integral de gestión empresarial que elimina la dependencia de hojas de
              cálculo complejas y centraliza todo en una base de datos inteligente y ágil, integrada con la
              infraestructura de Microsoft. Gestión todo en uno, automatización de flujos operativos y una interfaz
              de alto rendimiento.
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
                Solicitar demo <ArrowRight size={18} />
              </GlowButton>
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-neutral-300 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white sm:w-auto"
              >
                Ver cuánto puedes ahorrar
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

        {/* Data preview: lens reveals your centralized business data up close */}
        <section className="relative overflow-hidden border-t border-white/5 px-6 py-24">
          <FloatingOrbs colors={["#3b82f6", "#a855f7", "#f472b6"]} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <Eyebrow>Vista previa</Eyebrow>
            <h2 className="mb-4 mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
              Tu empresa, bajo la lupa
            </h2>
            <p className="text-lg text-neutral-400">
              Mueve el cursor sobre el panel para inspeccionar tus datos centralizados de cerca.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <LensCard
              className="rounded-3xl border border-white/10 bg-[var(--motiq-surface)] p-6 sm:p-10"
              radius={130}
              magnification={1.3}
              chromatic={0.6}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DATA_PREVIEW.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[var(--motiq-border)] bg-[var(--motiq-surface-2)] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--motiq-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--motiq-fg)]">
                      {item.value}
                      <span className="ml-1 text-xs font-normal text-[var(--motiq-muted)]">{item.unit}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--motiq-accent-text)]">{item.note}</p>
                  </div>
                ))}
              </div>
            </LensCard>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="relative z-0 overflow-hidden border-t border-white/5 px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#f472b6", "#34d399", "#fb923c"]} />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <Eyebrow>Características</Eyebrow>
              <h2 className="mb-4 mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
                Todo tu negocio, fuera de las hojas de cálculo
              </h2>
              <p className="text-lg text-neutral-400">
                Una plataforma centralizada, veloz y conectada de forma nativa con Microsoft.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
              {FEATURES.map(({ icon: Icon, color, title, description, span }, index) => {
                const isSolid = color === "violet";
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
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-blue-700 p-8">
                        <DonutRing
                          gradient="conic-gradient(from 200deg, #ffffff, #93c5fd, #ffffff)"
                          className="-right-10 -top-10 h-40 w-40 opacity-40"
                        />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                          <Icon size={24} />
                        </div>
                        <h3 className="relative mb-3 mt-6 text-xl font-black tracking-tight text-white">{title}</h3>
                        <p className="relative leading-relaxed text-blue-50/80">{description}</p>
                      </div>
                    ) : (
                      <SpotlightCard className="relative h-full overflow-hidden border-white/10 p-8 hover:border-blue-500/30">
                        {FEATURE_RINGS[color] && (
                          <DonutRing gradient={FEATURE_RINGS[color]} className="-right-8 -top-8 h-36 w-36" />
                        )}
                        <div
                          className={`relative mb-6 flex h-12 w-12 items-center justify-center rounded-full ${FEATURE_ICON_STYLES[color]}`}
                        >
                          <Icon size={24} />
                        </div>
                        <h3 className="relative mb-3 text-xl font-black tracking-tight text-white">{title}</h3>
                        <p className="relative leading-relaxed text-neutral-400">{description}</p>
                      </SpotlightCard>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries: verticals Collectionat serves, with industry-specific modules */}
        <section id="industrias" className="relative z-0 overflow-hidden border-t border-white/5 px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#3b82f6", "#f472b6", "#34d399"]} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative z-10 mx-auto mb-16 max-w-2xl text-center"
          >
            <Eyebrow>Industrias</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
              Un Collectionat para cada rubro
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Cada equipo trabaja distinto — por eso los módulos se adaptan a tu industria, no al revés. Estos son
              solo algunos ejemplos reales de implementación; ya trabajamos con empresas de varios rubros.
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
                        ? "border-blue-500/40 bg-blue-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white",
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
                className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {(() => {
                      const ActiveIcon = INDUSTRIES[activeIndustry].icon;
                      return <ActiveIcon size={26} />;
                    })()}
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
                    {INDUSTRIES[activeIndustry].label}
                  </h3>
                  <p className="mt-3 text-neutral-400">{INDUSTRIES[activeIndustry].description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {INDUSTRIES[activeIndustry].modules.map((m) => (
                    <div
                      key={m.name}
                      className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        <m.icon size={18} />
                      </span>
                      <span className="text-xs font-medium text-neutral-300">{m.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* How it works: step-by-step interactive walkthrough */}
        <section id="como-funciona" className="border-t border-white/5 px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
              De la hoja de cálculo al panel de control, en cuatro pasos
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Así es como tu equipo interactúa con CollectionatApp todos los días.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <ol className="space-y-2">
              {HOW_IT_WORKS.map(({ icon: Icon, title, description }, index) => {
                const active = activeStep === index;
                return (
                  <li key={title}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors",
                        active ? "border-blue-500/30 bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                          active ? "bg-blue-500 text-white" : "bg-white/5 text-neutral-500",
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <Icon size={16} className={active ? "text-blue-400" : "text-neutral-500"} />
                          <span className={cn("text-base font-semibold", active ? "text-white" : "text-neutral-300")}>
                            {title}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-neutral-400">{description}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      Datos en vivo
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {DATA_PREVIEW.slice(0, 4).map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-[10px] uppercase tracking-wider text-neutral-500">{item.label}</p>
                          <p className="mt-1 text-xl font-semibold text-white">
                            {item.value}
                            <span className="ml-1 text-xs font-normal text-neutral-500">{item.unit}</span>
                          </p>
                          <p className="mt-0.5 text-[11px] text-blue-400">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="operations"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <div className="mb-4 flex gap-2">
                      {["Ventas", "Finanzas", "Inventario"].map((mod, i) => (
                        <span
                          key={mod}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-xs font-medium",
                            i === 0 ? "bg-blue-500 text-white" : "bg-white/5 text-neutral-400",
                          )}
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs text-neutral-500">Nombre del cliente</label>
                        <div className="h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-neutral-400">
                          Orion Retail Group
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-neutral-500">Monto estimado</label>
                        <div className="h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-neutral-400">
                          $42,300.00
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-6 text-center">
                      <UploadCloud size={20} className="text-neutral-500" />
                      <p className="text-xs text-neutral-500">Arrastra tu archivo aquí o busca en tu equipo</p>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="automation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="space-y-3"
                  >
                    {AUTOMATION_RULES.map((rule) => (
                      <div
                        key={rule.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-sm text-neutral-300">{rule.name}</p>
                        {rule.active ? (
                          <ToggleRight size={28} className="shrink-0 text-blue-400" />
                        ) : (
                          <ToggleLeft size={28} className="shrink-0 text-neutral-600" />
                        )}
                      </div>
                    ))}
                    <p className="pt-1 text-center text-xs text-neutral-500">
                      2 de 3 automatizaciones activas — un clic para activar la tercera
                    </p>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="reports"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Ingresos mensuales</p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
                        Exportar PDF
                      </span>
                    </div>
                    <div className="flex h-40 items-end gap-4">
                      {REPORT_BARS.map((bar) => (
                        <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                          <div className="flex h-32 w-full items-end">
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-violet-400"
                              style={{ height: `${bar.value}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-neutral-500">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Interactive app-shell simulator with role-based sidebar */}
        <AppSimulatorSection />

        {/* Interactive demo video with clickable chapters */}
        <VideoDemoSection />

        <SectionSeam direction="to-white" />

        {/* Product pages showcase — white section, tablet mockups reveal on scroll */}
        <section className="bg-white px-6 py-24 text-neutral-900">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto max-w-2xl text-center"
          >
            <Eyebrow tone="light">Producto</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
              Explora cada página de Collectionat
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Desliza hacia abajo para ver cómo luce cada módulo por dentro.
            </p>
          </motion.div>

          <div className="mx-auto mt-20 max-w-6xl space-y-24">
            {PRODUCT_PAGES.map((page, index) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Eyebrow tone="light">{page.tag}</Eyebrow>
                  <h3 className="mt-4 text-2xl font-black tracking-tighter sm:text-3xl">{page.title}</h3>
                  <p className="mt-4 text-neutral-600">{page.description}</p>
                  <ul className="mt-6 space-y-3">
                    {page.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-neutral-700">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="mx-auto w-full max-w-md rounded-[2rem] border border-neutral-200 bg-neutral-100 p-3 shadow-2xl shadow-neutral-300/60">
                    <div className="mb-2 flex justify-center">
                      <span className="h-1 w-10 rounded-full bg-neutral-300" />
                    </div>
                    <div className="min-h-[260px] overflow-hidden rounded-2xl bg-[#0a0a0c] p-5">
                      <TabletScreen type={page.screen} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionSeam direction="to-black" />

        {/* Sales bento grid (components/ui/bento.tsx) */}
        <section className="relative overflow-hidden">
          <FloatingOrbs colors={["#f97316", "#22d3ee", "#a855f7"]} />
          <FUIBentoGridDark />
        </section>

        {/* AI chat over centralized data (components/ui/ruixen-moon-chat.tsx) */}
        <section className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <AskCollectionatChat />
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <section id="calculator" className="relative z-0 overflow-hidden border-t border-white/5 px-6 py-24">
          <FloatingOrbs className="-z-10" colors={["#22d3ee", "#a855f7", "#fb7185"]} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Calculator size={20} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">Simulador de Productividad</span>
            </div>

            <h2 className="mb-4 text-2xl font-black tracking-tighter text-white sm:text-4xl">
              Calcula cuánto tiempo le devuelves a tu equipo
            </h2>
            <p className="mb-8 text-neutral-400">Desliza para indicar cuántas hojas de cálculo activas maneja hoy tu equipo.</p>

            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex justify-between text-sm font-medium">
                    <span className="text-neutral-300">Hojas de cálculo activas:</span>
                    <span className="text-lg font-bold text-blue-400">{itemsCount} hojas</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={itemsCount}
                    onChange={(e) => setItemsCount(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-blue-500"
                  />
                </div>
              </div>

              <SpotlightCard className="relative overflow-hidden border-white/10 p-8 text-center hover:border-blue-500/30">
                <DonutRing
                  gradient="conic-gradient(from 160deg, #60a5fa, #a855f7, #60a5fa)"
                  className="-right-10 -top-10 h-36 w-36"
                />
                <div className="relative space-y-6">
                  <div>
                    <div className="mb-1 text-sm text-neutral-400">Tiempo estimado ahorrado al mes</div>
                    <div className="text-4xl font-black tracking-tighter sm:text-5xl">
                      <GradientText>{estimatedHoursSaved} horas</GradientText>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="mb-1 text-sm text-neutral-400">Índice de Centralización Estimado</div>
                    <div className="text-2xl font-black tracking-tighter text-blue-400">{estimatedOrganizationScore}% de tus datos unificados</div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </section>

        <SectionSeam direction="to-white" />

        {/* Trust section — deliberately light/white, breaks the all-dark rhythm */}
        <section className="bg-white px-6 py-24 text-neutral-900">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto max-w-2xl text-center"
          >
            <Eyebrow tone="light">Confianza</Eyebrow>
            <h2 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
              Empresas que ya centralizaron su operación
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Equipos de ventas, finanzas y operaciones que dejaron atrás las hojas de cálculo dispersas.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_COMPANIES.map((name) => (
              <span key={name} className="text-lg font-semibold tracking-tight text-neutral-500">
                {name}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, index) => {
              const tone = ["bg-blue-600", "bg-indigo-600", "bg-violet-600"][index % 3];
              return (
                <motion.div
                  key={t.role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.1 }}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left"
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", tone)}>
                    <Quote size={16} />
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-neutral-900">{t.role}</p>
                  <p className="text-xs text-neutral-500">{t.company}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <SectionSeam direction="to-black" />

        {/* Pricing Section */}
        <section id="pricing" className="relative z-0 overflow-hidden px-6 py-24">
          <div className="absolute inset-0 -z-10">
            <Velaris height="100%" bg="#000000" colors={["#10b981", "#f59e0b", "#f43f5e", "#000000"]} speed={1.6} grain={0.15} />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <Eyebrow>Planes</Eyebrow>
              <h2 className="mb-4 mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl">
                Planes diseñados para tu crecimiento
              </h2>
              <p className="text-lg text-neutral-400">
                Comienza gratis y escala a medida que centralizas más de tu empresa.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <SpotlightCard
                  className="h-full border-white/10 p-8 hover:border-blue-500/30"
                  contentClassName="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-400">Starter</div>
                    <div className="mb-4 text-4xl font-black tracking-tighter text-white">
                      $0 <span className="text-base font-normal text-neutral-400">/ mes</span>
                    </div>
                    <p className="mb-8 text-sm text-neutral-400">
                      Ideal para equipos que están comenzando a dejar atrás las hojas de cálculo.
                    </p>

                    <ul className="mb-8 space-y-4 text-sm text-neutral-300">
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-500" /> Hasta 200 registros centralizados</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-500" /> Integración básica con Microsoft 365</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-500" /> Acceso web y móvil</li>
                    </ul>
                  </div>
                  <button className="w-full rounded-xl bg-white/10 py-3 font-medium text-white transition-colors hover:bg-white/15">
                    Elegir Gratis
                  </button>
                </SpotlightCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
              >
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-[0_0_50px_-15px_rgba(59,130,246,0.5)]">
                  <DonutRing
                    gradient="conic-gradient(from 200deg, #ffffff, #c7d2fe, #ffffff)"
                    className="-right-12 -top-12 h-48 w-48 opacity-30"
                  />
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Más Popular
                  </span>
                  <div className="relative">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">Business</div>
                    <div className="mb-4 text-4xl font-black tracking-tighter text-white">
                      $12 <span className="text-base font-normal text-blue-100">/ mes</span>
                    </div>
                    <p className="mb-8 text-sm text-blue-50/80">
                      Para empresas que necesitan rendimiento, integración total y control sin límites.
                    </p>

                    <ul className="mb-8 space-y-4 text-sm text-white">
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white" /> Registros ilimitados</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white" /> Integración completa con Outlook, Teams y SharePoint</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white" /> Soporte prioritario 24/7</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="relative w-full rounded-xl bg-white py-3 font-semibold text-blue-700 transition-transform hover:scale-[1.02]"
                  >
                    Obtener Business
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t border-white/10 px-6 py-12 text-center text-sm text-neutral-500">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 40% 80% at 10% 0%, rgba(59,130,246,0.22), transparent 70%)",
                "radial-gradient(ellipse 40% 80% at 90% 100%, rgba(236,72,153,0.2), transparent 70%)",
                "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(16,185,129,0.14), transparent 70%)",
              ].join(", "),
            }}
          />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Collectionat</span> &copy; 2026. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {demoModalOpen && <DemoRequestModal onClose={() => setDemoModalOpen(false)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}