"use client";

import { useRef } from "react";
import {
  Boxes,
  ScanText,
  GitCompareArrows,
  SlidersHorizontal,
  GitBranch,
  GanttChartSquare,
  Workflow,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Boxes,
    title: "3D Warehouse Visualization",
    tags: ["Warehouse", "Heatmap", "Bins"],
    description: "Navigate zones, racks and bins in 3D with live capacity heatmaps and one-click location assignment.",
  },
  {
    icon: ScanText,
    title: "AI-Powered Document Parsing",
    tags: ["Invoices", "Auto-Match", "Multi-Model"],
    description: "Parse invoices, purchase orders and bank statements in seconds, automatically matched to transactions.",
  },
  {
    icon: GitCompareArrows,
    title: "One-Click Supplier Awards",
    tags: ["Compare", "Split-Award", "Auto PO"],
    description: "Compare quotes on price, delivery and quality, then generate purchase orders instantly.",
  },
  {
    icon: SlidersHorizontal,
    title: "No-Code Custom Fields",
    tags: ["Drag-Drop", "PDF", "Instant"],
    description: "Add text, number, dropdown or file fields anywhere in under a minute — they show up on documents automatically.",
  },
  {
    icon: GitBranch,
    title: "Multi-Level Approvals",
    tags: ["Roles", "Delegation", "Audit Trail"],
    description: "Unlimited approval chains by department, value or cost center, with delegation and a full audit trail.",
  },
  {
    icon: GanttChartSquare,
    title: "Gantt Chart Planning",
    tags: ["Dependencies", "Critical Path"],
    description: "Interactive timelines with task dependencies, critical path highlighting, and drag-to-resize scheduling.",
  },
  {
    icon: Workflow,
    title: "Task Automation Engine",
    tags: ["Triggers", "Notifications"],
    description: "Build automation rules without code — trigger actions, assign tasks and send alerts on real business events.",
  },
  {
    icon: MessageSquareText,
    title: "AI-Assisted Reporting",
    tags: ["Natural Language", "Insights"],
    description: "Ask questions in plain language and get charts, insights and recommendations back instantly.",
  },
];

export default function FeaturesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Why this ERP</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A smarter ERP your team can adapt without writing code.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:bg-white/5"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:bg-white/5"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map(({ icon: Icon, title, tags, description }) => (
          <div
            key={title}
            className="w-72 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Icon size={20} />
            </span>
            <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-neutral-400">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
