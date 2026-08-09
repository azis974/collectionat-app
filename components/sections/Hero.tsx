import { ArrowRight, PlayCircle } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { DashboardPreview } from "@/components/sections/DashboardPreview";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-black pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.25),rgba(0,0,0,0))]"
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-20 opacity-40" />

      <ContainerScroll
        titleComponent={
          <>
            <span className="mb-6 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-blue-300">
              Microsoft 365 + Tu Empresa en una Sola App
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Toda la información de tu empresa,
              <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl md:text-7xl">
                organizada y sin perder nada
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 md:text-lg">
              Collectionat unifica todo tu ecosistema de trabajo para que ningún documento, chat
              o dato clave quede en el olvido.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-[1.03]"
              >
                Solicitar demo gratuita
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#integraciones"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <PlayCircle className="size-4" aria-hidden="true" />
                Ver cómo funciona
              </a>
            </div>
          </>
        }
      >
        <DashboardPreview />
      </ContainerScroll>
    </section>
  );
}
