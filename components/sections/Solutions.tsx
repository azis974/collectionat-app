import { ArrowUpRight, Bike, Building2, UserSearch, type LucideIcon } from "lucide-react";

/** Links from the corporate site to each product's own site (one subdomain per niche). */
export const PRODUCT_SITES = {
  riders: "https://riders.collectionat.com",
  realEstate: "https://realestate.collectionat.com",
  recruitment: "https://hire.collectionat.com",
};

type Card = {
  href: string;
  icon: LucideIcon;
  name: string;
  tag: string;
  text: string;
  /** product colour, matching each product site */
  accent: string;
  soft: string;
};

const COPY: Record<"es" | "en", { eyebrow: string; title: string; sub: string; cta: string; cards: Card[] }> = {
  es: {
    eyebrow: "Nuestras soluciones",
    title: "Un producto para cada industria",
    sub: "Cada solución tiene su propia web, con la app funcionando para que la pruebes antes de hablar con nosotros.",
    cta: "Probar la app",
    cards: [
      {
        href: PRODUCT_SITES.riders,
        icon: Bike,
        name: "Collectionat Riders",
        tag: "Delivery y última milla",
        text: "Riders, depósitos de agentes, visas, motos, alojamiento, sueldos y préstamos en una sola pantalla.",
        accent: "#6a46d8",
        soft: "#eee8fd",
      },
      {
        href: PRODUCT_SITES.realEstate,
        icon: Building2,
        name: "Collectionat Real Estate",
        tag: "Inmobiliarias",
        text: "Propiedades, contratos, alquileres con ajuste automático, cobros y un asistente de IA.",
        accent: "#0b7a52",
        soft: "#dcf5ea",
      },
      {
        href: PRODUCT_SITES.recruitment,
        icon: UserSearch,
        name: "Collectionat Recruitment",
        tag: "Reclutamiento con IA",
        text: "Puntaje de CV, entrevistas en video con IA y la evidencia detrás de cada decisión.",
        accent: "#136f86",
        soft: "#e2f2f5",
      },
    ],
  },
  en: {
    eyebrow: "Our solutions",
    title: "A product for every industry",
    sub: "Each solution has its own site, with the app running so you can try it before you talk to us.",
    cta: "Try the app",
    cards: [
      {
        href: PRODUCT_SITES.riders,
        icon: Bike,
        name: "Collectionat Riders",
        tag: "Delivery and last mile",
        text: "Riders, agent deposits, visas, bikes, housing, salaries and loans on one screen.",
        accent: "#6a46d8",
        soft: "#eee8fd",
      },
      {
        href: PRODUCT_SITES.realEstate + "/en",
        icon: Building2,
        name: "Collectionat Real Estate",
        tag: "Real estate agencies",
        text: "Properties, contracts, rents with automatic adjustments, payments and an AI assistant.",
        accent: "#0b7a52",
        soft: "#dcf5ea",
      },
      {
        href: PRODUCT_SITES.recruitment,
        icon: UserSearch,
        name: "Collectionat Recruitment",
        tag: "AI recruitment",
        text: "CV scoring, AI video interviews and the evidence behind every decision.",
        accent: "#136f86",
        soft: "#e2f2f5",
      },
    ],
  },
};

export default function Solutions({ lang }: { lang: "es" | "en" }) {
  const t = COPY[lang];
  return (
    <section id="soluciones" className="relative z-0 border-t border-slate-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{t.eyebrow}</span>
        <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">{t.title}</h2>
        <p className="mt-4 text-lg text-slate-600">{t.sub}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {t.cards.map(({ href, icon: Icon, name, tag, text, accent, soft }) => (
          <a
            key={name}
            href={href}
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: soft, color: accent }}
            >
              <Icon size={22} />
            </span>
            <span className="mt-5 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
              {tag}
            </span>
            <h3 className="mt-1 text-xl font-black tracking-tight text-slate-900">{name}</h3>
            <p className="mt-3 flex-1 text-slate-600">{text}</p>
            <span
              className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-sm font-semibold text-white transition group-hover:gap-2.5"
              style={{ background: accent }}
            >
              {t.cta} <ArrowUpRight size={16} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
