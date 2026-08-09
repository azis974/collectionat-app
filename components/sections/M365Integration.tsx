"use client";

import { useState, type KeyboardEvent } from "react";
import { MessagesSquare, Mail, FolderKanban, CloudCog, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const APPS = [
  {
    id: "teams",
    name: "Microsoft Teams",
    icon: MessagesSquare,
    accent: "text-violet-300",
    ring: "ring-violet-500/30",
    bg: "bg-violet-500/10",
    dot: "bg-violet-400",
    description:
      "Todos tus chats, canales y reuniones quedan indexados en un único buscador, sin cambiar de app.",
    points: [
      "Busca en todos tus chats y canales a la vez",
      "Transcripciones de reuniones indexadas automáticamente",
      "Alertas inteligentes cuando te mencionan en algo importante",
    ],
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: Mail,
    accent: "text-sky-300",
    ring: "ring-sky-500/30",
    bg: "bg-sky-500/10",
    dot: "bg-sky-400",
    description:
      "Tus correos y adjuntos se conectan automáticamente con los proyectos y clientes a los que pertenecen.",
    points: [
      "Vincula hilos de correo con documentos relacionados",
      "Prioriza mensajes según el cliente o proyecto activo",
      "Resúmenes automáticos de conversaciones largas",
    ],
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    icon: FolderKanban,
    accent: "text-teal-300",
    ring: "ring-teal-500/30",
    bg: "bg-teal-500/10",
    dot: "bg-teal-400",
    description:
      "Todos tus sitios y bibliotecas documentales en un único índice, con los permisos que ya conoces.",
    points: [
      "Un único índice para todos tus sitios y bibliotecas",
      "Historial de versiones visible sin salir de Collectionat",
      "Respeta los permisos heredados de Microsoft 365",
    ],
  },
  {
    id: "onedrive",
    name: "OneDrive",
    icon: CloudCog,
    accent: "text-blue-300",
    ring: "ring-blue-500/30",
    bg: "bg-blue-500/10",
    dot: "bg-blue-400",
    description:
      "Archivos personales y compartidos sincronizados en tiempo real, listos para encontrarse en segundos.",
    points: [
      "Sincronización en tiempo real de archivos compartidos",
      "Detecta duplicados y archivos huérfanos",
      "Acceso rápido a lo más usado, incluso offline",
    ],
  },
] as const;

export function M365Integration() {
  const [activeId, setActiveId] = useState<(typeof APPS)[number]["id"]>("teams");
  const activeIndex = APPS.findIndex((app) => app.id === activeId);
  const active = APPS[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + delta + APPS.length) % APPS.length;
    setActiveId(APPS[next].id);
  };

  return (
    <section id="integraciones" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-blue-300">
            Integración nativa
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un solo lugar para todo Microsoft 365
          </h2>
          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            Collectionat se conecta directamente con las herramientas que tu equipo ya usa a
            diario, sin flujos de trabajo nuevos que aprender.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Integraciones de Microsoft 365"
          onKeyDown={handleKeyDown}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {APPS.map((app) => {
            const Icon = app.icon;
            const isActive = app.id === activeId;
            return (
              <button
                key={app.id}
                id={`tab-${app.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${app.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(app.id)}
                className={cn(
                  "flex min-h-[44px] flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors",
                  isActive
                    ? `border-white/15 ${app.bg} ${app.accent}`
                    : "border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
                <span className="text-xs font-medium sm:text-sm">{app.name}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className="mx-auto mt-8 grid max-w-5xl gap-8 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black p-6 md:grid-cols-2 md:p-10"
        >
          <div>
            <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset", active.bg, active.ring, active.accent)}>
              <span className={cn("size-1.5 animate-pulse-glow rounded-full", active.dot)} aria-hidden="true" />
              Conectado en tiempo real
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{active.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {active.description}
            </p>
          </div>
          <ul className="space-y-3">
            {active.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-zinc-300 md:text-base">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
