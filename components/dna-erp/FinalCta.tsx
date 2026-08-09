import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section id="contact" className="border-t border-white/5 px-6 py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-black to-violet-950/40 px-8 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)]" />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">Start now with DNA ERP</h2>
        <p className="relative mx-auto mt-3 max-w-md text-neutral-400">14-day free trial. No credit card required.</p>
        <a
          href="#pricing"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          Free 14-day trial <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
