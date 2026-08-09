"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

export default function Showreel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => setOpen(true)}
          className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-black to-violet-950/40"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
            <Play size={22} fill="black" />
          </span>
          <span className="absolute bottom-6 left-6 text-sm font-medium text-neutral-300">Play showreel</span>
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex aspect-video w-full max-w-3xl items-center justify-center rounded-2xl border border-white/10 bg-[#111114]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={16} />
            </button>
            <p className="px-8 text-center text-sm text-neutral-500">
              Video placeholder — conecta aquí tu reproductor (YouTube, Vimeo, Mux…).
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
