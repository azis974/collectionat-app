const COMPANIES = [
  { name: "Horizon Retail Group", desc: "Retail and consumer goods" },
  { name: "Falcon Maritime", desc: "Maritime and logistics" },
  { name: "Meridian Shopping Centers", desc: "Shopping and entertainment" },
  { name: "Clearwater Utilities", desc: "Water and environmental services" },
  { name: "Northbridge Trading Co.", desc: "Trading and commercial supplies" },
  { name: "Atlas Contracting", desc: "Contracting and operations" },
  { name: "Lumen Optical", desc: "Eyewear and optical services" },
  { name: "Summit Sports Association", desc: "Sports development and events" },
  { name: "Beacon Marketing Studio", desc: "Branding and marketing" },
  { name: "Ridgeline Construction", desc: "Construction and engineering" },
  { name: "Cedar Sweets Factory", desc: "Food manufacturing and retail" },
  { name: "Vantage Chemicals", desc: "Industrial chemical products" },
];

export default function LogoWall() {
  const loop = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Users</span>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Grow your business with DNA ERP — join thousands of happy users
        </h2>
      </div>

      <div className="group relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex w-64 shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-xs font-bold text-white">
                {c.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-white">{c.name}</span>
                <span className="block truncate text-xs text-neutral-500">{c.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
