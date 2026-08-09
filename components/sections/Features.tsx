import { Search, ShieldCheck, Zap, Users, BarChart3, Lock } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Búsqueda unificada",
    description:
      "Encuentra cualquier chat, correo o documento en segundos, sin importar en qué app de Microsoft 365 vive.",
  },
  {
    icon: Zap,
    title: "Sincronización instantánea",
    description:
      "Los cambios en Teams, Outlook, SharePoint y OneDrive se reflejan en Collectionat en tiempo real.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad de nivel empresarial",
    description:
      "Cifrado en tránsito y en reposo, con autenticación integrada a tu directorio de Microsoft Entra ID.",
  },
  {
    icon: Lock,
    title: "Permisos respetados",
    description:
      "Collectionat nunca muestra más de lo que ya tienes permitido ver en Microsoft 365.",
  },
  {
    icon: Users,
    title: "Colaboración sin fricción",
    description:
      "Comparte hallazgos y colecciones con tu equipo sin salir del flujo de trabajo actual.",
  },
  {
    icon: BarChart3,
    title: "Analítica de uso",
    description:
      "Visualiza qué información se consulta más y detecta cuellos de botella en el conocimiento del equipo.",
  },
];

export function Features() {
  return (
    <section id="caracteristicas" className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(59,130,246,0.18),rgba(0,0,0,0))]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-blue-300">
            Por qué Collectionat
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Diseñado para equipos que no pueden perder tiempo buscando
          </h2>
          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            Todo lo que necesitas para mantener el conocimiento de tu empresa accesible, seguro y
            organizado.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-500/30"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-blue-500/0 blur-2xl transition-colors duration-300 group-hover:bg-blue-500/20"
              />
              <div className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 text-blue-300 ring-1 ring-inset ring-blue-500/20">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
