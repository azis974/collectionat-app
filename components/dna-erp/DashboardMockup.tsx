"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  LayoutGrid,
  Columns3,
  Rows3,
  Maximize2,
  Sparkles,
  LayoutDashboard,
  CheckSquare,
  ShoppingCart,
  Package,
  Box,
  Building2,
  ClipboardList,
  Archive,
  BarChart3,
  Settings,
  X,
  Check,
  ArrowUpRight,
  Undo2,
} from "lucide-react";

/* ---------------------------------- data ---------------------------------- */

const SIDEBAR_ICONS = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "tasks", icon: CheckSquare },
  { id: "orders", icon: ShoppingCart },
  { id: "inventory", icon: Package },
  { id: "products", icon: Box },
  { id: "customers", icon: Building2},
  { id: "reports", icon: ClipboardList },
  { id: "archive", icon: Archive },
  { id: "analytics", icon: BarChart3 },
  { id: "settings", icon: Settings },
];

type Period = "monthly" | "quarterly" | "yearly";

const REVENUE_BY_PERIOD: Record<Period, { label: string; total: string; avg: string; peak: string; points: number[] }> = {
  monthly: { label: "Monthly View", total: "$2,486,920", avg: "$997,800", peak: "$2,200,000", points: [20, 28, 24, 40, 55, 48, 70, 82, 76, 90, 96, 100] },
  quarterly: { label: "Quarterly View", total: "$7,120,400", avg: "$2,373,466", peak: "$3,940,000", points: [30, 45, 62, 100] },
  yearly: { label: "Yearly View", total: "$28,481,600", avg: "$9,493,866", peak: "$12,650,000", points: [22, 58, 100] },
};

const TASKS = [
  { id: 1, label: "Building permit application", date: "Mar 23, 2026", urgent: true },
  { id: 2, label: "Structural design and e...", date: "Mar 24, 2026", urgent: true },
  { id: 3, label: "Environmental clearance", date: "Mar 28, 2026", urgent: false },
  { id: 4, label: "Contractor mobilization", date: "Apr 02, 2026", urgent: true },
  { id: 5, label: "Site clearing and demoli...", date: "Apr 06, 2026", urgent: false },
];

const CUSTOMERS = [
  { rank: 1, name: "Orion Retail Group", orders: 42, value: "$842,300", pct: "38.2%", color: "bg-amber-400 text-black" },
  { rank: 2, name: "NovaTech Manufacturing", orders: 28, value: "$318,450", pct: "21.4%", color: "bg-zinc-300 text-black" },
  { rank: 3, name: "Meridian Foods", orders: 24, value: "$185,030", pct: "14.8%", color: "bg-orange-400 text-black" },
  { rank: 4, name: "Summit Healthcare Supplies", orders: 16, value: "$96,400", pct: "9.7%", color: "bg-white/10 text-white" },
  { rank: 5, name: "Atlas Logistics Network", orders: 11, value: "$84,260", pct: "7.1%", color: "bg-white/10 text-white" },
];

const SALES_MONTHS = [
  { label: "Feb", value: 62 },
  { label: "Mar", value: 96 },
  { label: "Apr", value: 100 },
  { label: "May", value: 34 },
];

const PROFIT_MONTHS = [
  { label: "Feb", gross: 55, net: 30 },
  { label: "Mar", gross: 80, net: 45 },
  { label: "Apr", gross: 100, net: 62 },
  { label: "May", gross: 40, net: 20 },
];

const INITIAL_APPROVALS = [
  { id: 1, title: "PO-4821 — Steel supply order", requester: "Marta G.", amount: "$128,400" },
  { id: 2, title: "Discount override — Meridian Foods", requester: "Dana K.", amount: "-$4,200" },
  { id: 3, title: "Vendor onboarding — Atlas Logistics", requester: "Ravi P.", amount: "—" },
];

/* --------------------------------- charts ---------------------------------- */

function Sparkline({ points }: { points: number[] }) {
  const w = 280;
  const h = 70;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / 100) * h}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full overflow-visible">
      <defs>
        <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkline-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkline-fill)" />
      <path d={path} fill="none" stroke="url(#sparkline-stroke)" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function MiniBarChart({
  data,
  onHover,
}: {
  data: { label: string; value: number }[];
  onHover?: (label: string | null) => void;
}) {
  return (
    <div className="flex h-24 items-end gap-3 px-1">
      {data.map((d) => (
        <div
          key={d.label}
          className="group flex flex-1 flex-col items-center gap-1.5"
          onMouseEnter={() => onHover?.(d.label)}
          onMouseLeave={() => onHover?.(null)}
        >
          <div className="relative flex h-16 w-full items-end">
            <div
              className="w-full rounded-t-md bg-blue-500 transition-all duration-300 group-hover:bg-blue-400"
              style={{ height: `${d.value}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function GroupedBarChart({ data }: { data: { label: string; gross: number; net: number }[] }) {
  return (
    <div className="flex h-24 items-end gap-4 px-1">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-16 w-full items-end justify-center gap-1">
            <div className="w-2 rounded-t-sm bg-violet-500" style={{ height: `${d.gross}%` }} />
            <div className="w-2 rounded-t-sm bg-blue-400" style={{ height: `${d.net}%` }} />
          </div>
          <span className="text-[10px] text-neutral-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function Donut({ value, total }: { value: number; total: number }) {
  const pct = value / total;
  const r = 42;
  const c = 2 * Math.PI * r;

  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={10} />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="url(#donut-gradient)"
        strokeWidth={10}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="donut-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="60%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* --------------------------------- panels ---------------------------------- */

function Panel({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#141417] ${className}`}>{children}</div>
  );
}

function PanelHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2 p-4 pb-3">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

/* --------------------------------- main ------------------------------------ */

export default function DashboardMockup() {
  const [activeIcon, setActiveIcon] = useState("dashboard");
  const [layout, setLayout] = useState<"grid" | "split" | "list">("grid");
  const [compact, setCompact] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [period, setPeriod] = useState<Period>("monthly");
  const [tasks, setTasks] = useState(TASKS.map((t) => ({ ...t, done: false })));
  const [seriesVisible, setSeriesVisible] = useState({ gross: true, net: true });
  const [quotationVisible, setQuotationVisible] = useState(true);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);

  const revenue = REVENUE_BY_PERIOD[period];
  const urgentCount = tasks.filter((t) => t.urgent && !t.done).length;
  const hoveredSale = SALES_MONTHS.find((m) => m.label === hoveredMonth);

  const resolveApproval = (id: number) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0b0b0e] text-white">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-neutral-400">
          <Search size={13} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <button className="hidden items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-neutral-300 sm:flex">
          Nexa Global Holdings <ChevronDown size={12} />
        </button>

        <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5 sm:flex">
          <Download size={15} />
        </button>

        <button
          onClick={() => setCompact((v) => !v)}
          aria-pressed={compact}
          aria-label={compact ? "Vista cómoda" : "Vista compacta"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5"
        >
          {compact ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen((v) => !v);
              setProfileOpen(false);
            }}
            aria-label="Notificaciones"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/5"
          >
            <Bell size={15} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-10 z-20 w-64 rounded-xl border border-white/10 bg-[#17171b] p-2 shadow-2xl">
              <p className="px-2 py-1 text-xs font-semibold text-neutral-400">Notificaciones</p>
              {[
                "Orion Retail Group aprobó la orden #4821",
                "3 tareas vencen esta semana",
                "Nuevo reporte de rentabilidad disponible",
              ].map((n) => (
                <div key={n} className="rounded-lg px-2 py-2 text-xs text-neutral-300 hover:bg-white/5">
                  {n}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-white/5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold">
              AN
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-medium text-white">Orion Retail Group</span>
              <span className="block text-[10px] text-neutral-500">CEO</span>
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-11 z-20 w-48 rounded-xl border border-white/10 bg-[#17171b] p-1.5 shadow-2xl">
              {["Cambiar de cuenta", "Preferencias", "Cerrar sesión"].map((item) => (
                <button key={item} className="w-full rounded-lg px-2.5 py-2 text-left text-xs text-neutral-300 hover:bg-white/5">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/10 py-3">
          {SIDEBAR_ICONS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveIcon(id)}
              aria-pressed={activeIcon === id}
              aria-label={id}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                activeIcon === id ? "bg-blue-500/20 text-blue-400" : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 overflow-y-auto p-4">
          {/* Dashboard header */}
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 px-5 py-4">
            <div>
              <p className="text-base font-bold text-white">Dashboard</p>
              <p className="text-xs text-white/70">Welcome, Adam Nouri (CEO)</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="mr-1 hidden items-center gap-0.5 rounded-lg bg-black/20 p-0.5 sm:flex">
                {[
                  { id: "grid" as const, icon: LayoutGrid },
                  { id: "split" as const, icon: Columns3 },
                  { id: "list" as const, icon: Rows3 },
                ].map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setLayout(id)}
                    aria-pressed={layout === id}
                    className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                      layout === id ? "bg-white text-indigo-700" : "text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={13} />
                  </button>
                ))}
              </div>
              <button className="hidden h-7 w-7 items-center justify-center rounded-md text-white/70 hover:bg-white/10 sm:flex">
                <Maximize2 size={13} />
              </button>
              <span className="ml-1 flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white">
                <Sparkles size={12} /> DNA Intelligence
              </span>
            </div>
          </div>

          {/* Cards */}
          <div
            className={`grid ${compact ? "gap-2" : "gap-3"} ${
              layout === "list" ? "grid-cols-1" : layout === "split" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {/* Revenue Overview */}
            <Panel>
              <PanelHeader
                title="Revenue Overview"
                subtitle="Global revenue performance with real-time trend"
              />
              <div className="px-4 pb-4">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white">{revenue.total}</span>
                  <span className="text-right text-[10px] leading-tight text-neutral-500">
                    Avg: {revenue.avg}
                    <br />
                    Peak: {revenue.peak}
                  </span>
                </div>
                <p className="mb-2 flex items-center gap-1 text-xs text-emerald-400">
                  <ArrowUpRight size={12} /> +18.6% from last month
                </p>
                <Sparkline points={revenue.points} />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    {(["monthly", "quarterly", "yearly"] as Period[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize transition-colors ${
                          period === p ? "bg-blue-500 text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-600">Updated just now</span>
                </div>
              </div>
            </Panel>

            {/* Upcoming Tasks */}
            <Panel>
              <PanelHeader
                title="Upcoming Tasks"
                subtitle="Tasks due soon"
                action={
                  urgentCount > 0 && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                      {urgentCount} urgent
                    </span>
                  )
                }
              />
              <ul className="space-y-1 px-2 pb-2">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() =>
                        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))
                      }
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-white/5"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          task.done ? "border-blue-500 bg-blue-500" : "border-white/20"
                        }`}
                      >
                        {task.done && <Check size={11} className="text-white" />}
                      </span>
                      <span className={`flex-1 truncate text-xs ${task.done ? "text-neutral-600 line-through" : "text-neutral-200"}`}>
                        {task.label}
                      </span>
                      <span className="shrink-0 text-[10px] text-neutral-500">{task.date}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 pt-0">
                <button className="w-full rounded-lg border border-white/10 py-1.5 text-xs text-neutral-300 hover:bg-white/5">
                  View All Tasks
                </button>
              </div>
            </Panel>

            {/* Top Customers */}
            <Panel>
              <PanelHeader title="Top Customers" subtitle="Highest revenue generating customers · Last 30 days" />
              <ul className="space-y-1 px-2 pb-2">
                {CUSTOMERS.map((c) => (
                  <li key={c.rank} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${c.color}`}>
                      {c.rank}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs text-neutral-200">{c.name}</span>
                      <span className="block text-[10px] text-neutral-500">{c.orders} orders</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xs font-semibold text-white">{c.value}</span>
                      <span className="block text-[10px] text-emerald-400">{c.pct} of revenue</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="p-2 pt-0">
                <button className="w-full rounded-lg border border-white/10 py-1.5 text-xs text-neutral-300 hover:bg-white/5">
                  View All Customers
                </button>
              </div>
            </Panel>

            {/* Tax Summary */}
            <Panel>
              <PanelHeader title="Tax Summary" subtitle="Tax collected vs paid overview" />
              <div className="px-4 pb-4">
                <p className="text-2xl font-bold text-red-400">-$1,879,577.20</p>
                <p className="mb-3 text-[10px] text-neutral-500">Net Tax Liability for Current Quarter</p>
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <p className="text-[10px] text-emerald-400">Tax Collected</p>
                    <p className="text-sm font-semibold text-emerald-300">$1,915,849...</p>
                  </div>
                  <div className="rounded-lg bg-red-500/10 p-2">
                    <p className="text-[10px] text-red-400">Tax Paid</p>
                    <p className="text-sm font-semibold text-red-300">$3,795,426...</p>
                  </div>
                </div>
                <p className="mb-1 text-[10px] text-neutral-500">Tax Breakdown</p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="flex h-full w-full">
                    <div className="h-full bg-emerald-500" style={{ width: "34%" }} />
                    <div className="h-full bg-orange-400" style={{ width: "66%" }} />
                  </div>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[10px] text-neutral-500">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Sales Tax: $1,858,40...</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Purchase Tax: $247,44...</span>
                </div>
              </div>
            </Panel>

            {/* Sales Orders */}
            <Panel>
              <PanelHeader title="Sales Orders" subtitle="Total sales order volume and value" />
              <div className="px-4 pb-4">
                <p className="text-2xl font-bold text-white">7 Orders</p>
                <p className="mb-2 flex items-center gap-1 text-xs text-emerald-400">
                  <ArrowUpRight size={12} /> +88.1% from last month
                </p>
                <MiniBarChart data={SALES_MONTHS} onHover={setHoveredMonth} />
                <p className="mt-1 text-center text-[10px] text-neutral-500">
                  {hoveredSale ? `${hoveredSale.label}: ${hoveredSale.value}% of peak volume` : "Total Value: $39.5M · Avg: $5,636,797 · Year to Date"}
                </p>
              </div>
            </Panel>

            {/* Profit Margin */}
            <Panel>
              <PanelHeader title="Profit Margin" subtitle="Gross and net profit margin trends" />
              <div className="px-4 pb-4">
                <p className="text-2xl font-bold text-white">96.4%</p>
                <p className="mb-2 text-[10px] text-neutral-500">Average profit margin</p>
                <GroupedBarChart
                  data={PROFIT_MONTHS.map((m) => ({
                    ...m,
                    gross: seriesVisible.gross ? m.gross : 0,
                    net: seriesVisible.net ? m.net : 0,
                  }))}
                />
                <div className="mt-2 flex items-center gap-3 text-[10px]">
                  <button
                    onClick={() => setSeriesVisible((v) => ({ ...v, gross: !v.gross }))}
                    className={`flex items-center gap-1 ${seriesVisible.gross ? "text-neutral-400" : "text-neutral-700 line-through"}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Gross Revenue
                  </button>
                  <button
                    onClick={() => setSeriesVisible((v) => ({ ...v, net: !v.net }))}
                    className={`flex items-center gap-1 ${seriesVisible.net ? "text-neutral-400" : "text-neutral-700 line-through"}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Net Profit
                  </button>
                </div>
              </div>
            </Panel>

            {/* Quotation Conversion (closable) */}
            {quotationVisible ? (
              <Panel>
                <div className="flex items-start justify-between px-4 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Quotation Conversion</p>
                    <p className="text-xs text-neutral-500">Quotation to order conversion rate</p>
                  </div>
                  <button
                    onClick={() => setQuotationVisible(false)}
                    aria-label="Cerrar widget"
                    className="rounded-md p-1 text-neutral-500 hover:bg-white/5 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 pb-4 pt-2">
                  <div>
                    <p className="text-2xl font-bold text-white">42.8%</p>
                    <p className="text-[10px] text-neutral-500">Quote Win Rate</p>
                    <p className="mt-2 text-sm font-semibold text-blue-400">42</p>
                    <p className="text-[10px] text-neutral-500">Accepted</p>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <Donut value={98} total={140} />
                    <div className="absolute text-center">
                      <p className="text-lg font-bold text-white">98</p>
                      <p className="text-[9px] text-neutral-500">Total</p>
                    </div>
                  </div>
                </div>
              </Panel>
            ) : (
              <button
                onClick={() => setQuotationVisible(true)}
                className="flex h-full min-h-[100px] items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-xs text-neutral-500 hover:border-white/30 hover:text-neutral-300"
              >
                <Undo2 size={13} /> Restaurar "Quotation Conversion"
              </button>
            )}

            {/* Accounts Receivable */}
            <Panel>
              <PanelHeader title="Accounts Receivable" subtitle="AR aging and collection status" />
              <div className="px-4 pb-4">
                <p className="text-2xl font-bold text-white">$475,070.72</p>
                <p className="mb-3 text-[10px] text-neutral-500">Total Accounts Receivable</p>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <p className="text-[9px] text-emerald-400">Current</p>
                    <p className="text-xs font-semibold text-emerald-300">$274,...</p>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 p-2">
                    <p className="text-[9px] text-amber-400">Overdue</p>
                    <p className="text-xs font-semibold text-amber-300">$199,...</p>
                  </div>
                  <div className="rounded-lg bg-red-500/10 p-2">
                    <p className="text-[9px] text-red-400">Critical</p>
                    <p className="text-xs font-semibold text-red-300">$1,69...</p>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="flex h-full w-full">
                    <div className="h-full bg-emerald-500" style={{ width: "57.7%" }} />
                    <div className="h-full bg-amber-400" style={{ width: "42.3%" }} />
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>All Current</span>
                  <span>42.3% Overdue</span>
                </div>
              </div>
            </Panel>

            {/* Pending Approvals */}
            <Panel>
              <PanelHeader title="Pending Approvals" subtitle="Shows oldest pending approvals waiting for your action" />
              <ul className="space-y-1 px-2 pb-2">
                {approvals.length === 0 && (
                  <li className="px-2.5 py-4 text-center text-xs text-neutral-500">Todo al día — sin aprobaciones pendientes.</li>
                )}
                {approvals.map((a) => (
                  <li key={a.id} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs text-neutral-200">{a.title}</span>
                      <span className="block text-[10px] text-neutral-500">
                        {a.requester} · {a.amount}
                      </span>
                    </span>
                    <button
                      onClick={() => resolveApproval(a.id)}
                      aria-label="Aprobar"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                    >
                      <Check size={12} />
                    </button>
                    <button
                      onClick={() => resolveApproval(a.id)}
                      aria-label="Rechazar"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-500/15 text-red-400 hover:bg-red-500/25"
                    >
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
