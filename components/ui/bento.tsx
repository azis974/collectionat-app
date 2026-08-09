"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Eye, TrendingUp, Zap, Globe, Rocket, type LucideIcon } from "lucide-react";

type Tone = "solid" | "dark" | "stat";

const CARDS: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
  ring?: string;
  className: string;
}[] = [
  {
    eyebrow: "Insight",
    title: "Visibilidad total de tus clientes",
    description:
      "Collectionat conecta tu CRM, tus correos y tus hojas de cálculo dispersas en una sola vista de 360° por cliente.",
    icon: Eye,
    tone: "solid",
    className: "max-lg:rounded-t-3xl lg:col-span-3 lg:rounded-tl-3xl",
  },
  {
    eyebrow: "Análisis",
    title: "Detecta oportunidades antes que nadie",
    description:
      "Cruza historial de compras, contratos y comunicaciones para saber qué cuentas están listas para crecer.",
    icon: TrendingUp,
    tone: "dark",
    ring: "conic-gradient(from 180deg, #60a5fa, #a855f7, #f472b6, #60a5fa)",
    className: "lg:col-span-3 lg:rounded-tr-3xl",
  },
  {
    eyebrow: "Velocidad",
    title: "Hecho para equipos rápidos",
    description:
      "Atajos de teclado y automatizaciones para que tu equipo de ventas nunca pierda tiempo en tareas repetitivas.",
    icon: Zap,
    tone: "dark",
    className: "lg:col-span-2 lg:rounded-bl-3xl",
  },
  {
    eyebrow: "Alcance",
    title: "Zonas horarias soportadas",
    description: "Múltiples monedas, idiomas y husos horarios, todo centralizado en una sola plataforma.",
    icon: Globe,
    tone: "stat",
    className: "lg:col-span-2",
  },
  {
    eyebrow: "Escala",
    title: "Crece sin fricción",
    description: "De tu primer cliente a miles de cuentas activas — Collectionat se mueve a la velocidad de tu negocio.",
    icon: Rocket,
    tone: "dark",
    ring: "conic-gradient(from 220deg, #34d399, #3b82f6, #a855f7, #34d399)",
    className: "max-lg:rounded-b-3xl lg:col-span-2 lg:rounded-br-3xl",
  },
];

export default function FUIBentoGridDark() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-24">
      <h2 className="text-4xl font-black tracking-tighter text-white md:text-5xl">Ventas</h2>
      <p className="mt-2 max-w-3xl text-lg text-neutral-400">
        Conoce a tus clientes mejor que nadie — sin una sola hoja de cálculo de por medio.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        {CARDS.map((card) => (
          <BentoCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}

/** Decorative ring/medallion — a conic-gradient masked into a donut shape. */
function DonutRing({ gradient, className = "" }: { gradient: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute rounded-full opacity-70", className)}
      style={{
        background: gradient,
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px))",
      }}
    />
  );
}

export function BentoCard({
  className = "",
  eyebrow,
  title,
  description,
  icon: Icon,
  tone = "dark",
  ring,
}: {
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  ring?: string;
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg transform-gpu shadow-sm ring-1 ring-white/10",
        tone === "solid"
          ? "bg-gradient-to-br from-blue-600 to-indigo-700"
          : "bg-[#0a0a0f] [box-shadow:0_-20px_80px_-20px_#8686f01f_inset]",
      )}
    >
      <div className="relative flex h-72 shrink-0 flex-col items-center justify-center overflow-hidden">
        {tone === "dark" && ring && (
          <>
            <DonutRing gradient={ring} className="-right-10 -top-10 h-44 w-44" />
            <DonutRing gradient={ring} className="-bottom-16 -left-16 h-56 w-56 opacity-30" />
          </>
        )}
        {tone === "solid" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.35), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "auto, 32px 32px, 32px 32px",
            }}
          />
        )}

        {tone === "stat" ? (
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-blue-500/40 bg-blue-500/10">
            <span className="text-5xl font-black tracking-tighter text-white">4</span>
          </div>
        ) : Icon ? (
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Icon size={26} />
          </div>
        ) : null}
      </div>
      <div className="relative z-20 p-8">
        <p
          className={clsx(
            "text-xs font-semibold uppercase tracking-widest",
            tone === "solid" ? "text-blue-100" : "text-blue-400",
          )}
        >
          {eyebrow}
        </p>
        <p className="mt-2 text-2xl font-black tracking-tight text-white">{title}</p>
        <p className={clsx("mt-2 max-w-[600px] text-sm/6", tone === "solid" ? "text-blue-50/80" : "text-neutral-400")}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
