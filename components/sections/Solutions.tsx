import { ArrowUpRight, Bike, Building2, UserSearch, Users, type LucideIcon } from "lucide-react";

/**
 * Product sites linked from the corporate site.
 * Only destinations verified as live are listed here (checked 2026-10-13).
 * riders.collectionat.com / realestate.collectionat.com do not resolve yet —
 * switch these to the subdomains once their DNS records exist.
 */
export const PRODUCT_SITES = {
  recruitment: "https://www.hire.collectionat.com/",
  riders: "https://collectionat-riders.netlify.app/",
  realEstateEs: "https://collectionat-realestate.netlify.app/",
  realEstateEn: "https://collectionat-realestate.netlify.app/en",
} as const;

type Card = {
  icon: LucideIcon;
  name: string;
  tag: string;
  text: string;
  /** null = no live website yet: rendered without a link */
  href: string | null;
};

type Copy = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  sub: string;
  cta: string;
  soon: string;
  cards: Card[];
};

const COPY: Record<"es" | "en", Copy> = {
  es: {
    eyebrow: "Nuestras soluciones",
    titleStart: "Un producto para cada",
    titleAccent: "industria",
    sub: "Cada solución tiene su propia web, donde podés conocer el producto en detalle.",
    cta: "Visitar el sitio",
    soon: "Sitio web próximamente",
    cards: [
      {
        icon: UserSearch,
        name: "Collectionat Recruitment",
        tag: "Software de reclutamiento con IA",
        text: "Evaluación de CV con IA, entrevistas en video con IA y pipeline de contratación, sobre Microsoft.",
        href: PRODUCT_SITES.recruitment,
      },
      {
        icon: Bike,
        name: "Collectionat Riders",
        tag: "Flotas de delivery de última milla",
        text: "Riders, depósitos de agentes, visas y documentos, vehículos, alojamiento, sueldos y préstamos.",
        href: PRODUCT_SITES.riders,
      },
      {
        icon: Building2,
        name: "Collectionat Real Estate",
        tag: "Inmobiliarias",
        text: "Propiedades, contratos, cobros, clientes y un asistente de IA.",
        href: PRODUCT_SITES.realEstateEs,
      },
      {
        icon: Users,
        name: "Collectionat Manpower",
        tag: "Empresas de suministro de personal",
        text: "Para empresas de manpower supply y staffing.",
        href: null,
      },
    ],
  },
  en: {
    eyebrow: "Our solutions",
    titleStart: "A product for every",
    titleAccent: "industry",
    sub: "Each solution has its own website where you can explore the product in detail.",
    cta: "Visit the website",
    soon: "Website coming soon",
    cards: [
      {
        icon: UserSearch,
        name: "Collectionat Recruitment",
        tag: "AI recruitment software",
        text: "AI CV screening, AI video interviews and a hiring pipeline, built on Microsoft.",
        href: PRODUCT_SITES.recruitment,
      },
      {
        icon: Bike,
        name: "Collectionat Riders",
        tag: "Last-mile delivery fleets",
        text: "Riders, agent deposits, visas and documents, vehicles, housing, salaries and loans.",
        href: PRODUCT_SITES.riders,
      },
      {
        icon: Building2,
        name: "Collectionat Real Estate",
        tag: "Real estate agencies",
        text: "Properties, contracts, rent collection, clients and an AI assistant.",
        href: PRODUCT_SITES.realEstateEn,
      },
      {
        icon: Users,
        name: "Collectionat Manpower",
        tag: "Manpower supply companies",
        text: "For manpower supply and staffing companies.",
        href: null,
      },
    ],
  },
};

/** Same visual language as the landing's Industries section (cyan eyebrow, slate cards, cyan→rose accent). */
export default function Solutions({ lang }: { lang: "es" | "en" }) {
  const t = COPY[lang];
  return (
    <section id="soluciones" className="relative z-0 border-t border-slate-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700">
          {t.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
          {t.titleStart}{" "}
          <span className="bg-gradient-to-r from-cyan-600 to-rose-800 bg-clip-text text-transparent">{t.titleAccent}</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">{t.sub}</p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-6xl list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {t.cards.map(({ icon: Icon, name, tag, text, href }) => (
          <li
            key={name}
            className={
              "flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition " +
              (href ? "border-slate-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg" : "border-dashed border-slate-200")
            }
          >
            <span
              className={
                "flex h-12 w-12 items-center justify-center rounded-full text-white " +
                (href ? "bg-gradient-to-br from-cyan-500 to-cyan-700" : "bg-slate-300")
              }
            >
              <Icon size={22} />
            </span>
            <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-cyan-700">{tag}</span>
            <h3 className="mt-1 text-xl font-black tracking-tight text-slate-900">
              {href ? (
                <a href={href} className="hover:text-cyan-700">
                  {name}
                </a>
              ) : (
                name
              )}
            </h3>
            <p className="mt-3 flex-1 text-slate-600">{text}</p>
            {href ? (
              <a
                href={href}
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
              >
                {t.cta} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <span className="mt-6 inline-flex self-start rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">
                {t.soon}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
