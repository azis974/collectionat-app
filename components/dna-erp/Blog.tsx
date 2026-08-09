const ARTICLES = [
  { date: "Jun 27, 2026", title: "Choosing a Cloud ERP: A Practical Buyer's Guide" },
  { date: "Jun 27, 2026", title: "E-Invoicing Compliance: What Finance Teams Need to Know" },
  { date: "Nov 21, 2025", title: "Extending Your ERP Without Code: Custom Fields Explained" },
  { date: "Feb 12, 2026", title: "Multi-Company Consolidation: Common Pitfalls to Avoid" },
];

export default function Blog() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Blog</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Latest articles</h2>
          </div>
          <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">
            View all →
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((a) => (
            <a
              key={a.title}
              href="#"
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-blue-500/30"
            >
              <div className="mb-8 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10" />
              <p className="text-xs text-neutral-500">{a.date}</p>
              <h3 className="mt-1.5 text-sm font-medium leading-snug text-white group-hover:text-blue-300">{a.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
