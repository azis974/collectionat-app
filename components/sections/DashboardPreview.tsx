import {
  Bell,
  Search,
  LayoutGrid,
  MessagesSquare,
  Mail,
  FolderKanban,
  CloudCog,
  Sparkles,
} from "lucide-react";

const SIDEBAR = [
  { icon: LayoutGrid, label: "Resumen", active: true },
  { icon: MessagesSquare, label: "Teams" },
  { icon: Mail, label: "Outlook" },
  { icon: FolderKanban, label: "SharePoint" },
  { icon: CloudCog, label: "OneDrive" },
];

const FEED = [
  {
    source: "Teams",
    color: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
    title: "Reunión de sprint — Producto",
    detail: "3 menciones nuevas en #lanzamientos",
    time: "hace 4 min",
  },
  {
    source: "Outlook",
    color: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
    title: "Propuesta comercial — Cliente Nexa",
    detail: "Adjunto: contrato_v3.pdf",
    time: "hace 12 min",
  },
  {
    source: "SharePoint",
    color: "bg-teal-500/15 text-teal-300 ring-teal-500/30",
    title: "Manual de onboarding actualizado",
    detail: "Editado por Marta G.",
    time: "hace 38 min",
  },
  {
    source: "OneDrive",
    color: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    title: "Q3-reporte-financiero.xlsx",
    detail: "Sincronizado y respaldado",
    time: "hace 1 h",
  },
];

const STATS = [
  { label: "Fuentes conectadas", value: "4/4" },
  { label: "Documentos indexados", value: "12,480" },
  { label: "Tiempo ahorrado / semana", value: "6.5 h" },
];

export function DashboardPreview() {
  return (
    <div className="flex size-full flex-col text-white">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 md:px-6">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-200">
          <Sparkles className="size-4 text-blue-400" aria-hidden="true" />
          Panel de Collectionat
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 sm:flex">
          <Search className="size-3.5" aria-hidden="true" />
          Buscar en toda tu empresa…
        </div>
        <Bell className="size-4 text-zinc-400" aria-hidden="true" />
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-40 shrink-0 flex-col gap-1 border-r border-white/10 p-3 sm:flex md:w-48">
          {SIDEBAR.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs md:text-sm ${
                active ? "bg-white/10 text-white" : "text-zinc-400"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto p-3 md:p-5">
          <div className="mb-3 grid grid-cols-3 gap-2 md:mb-4 md:gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 md:p-3"
              >
                <p className="text-[10px] uppercase tracking-wide text-zinc-500 md:text-xs">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white md:text-lg">{stat.value}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-2 md:space-y-2.5">
            {FEED.map((item) => (
              <li
                key={item.title}
                className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-2.5 md:p-3.5"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${item.color}`}
                    >
                      {item.source}
                    </span>
                    <p className="truncate text-xs font-medium text-white md:text-sm">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-zinc-500 md:text-xs">
                    {item.detail}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] text-zinc-500 md:text-xs">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
