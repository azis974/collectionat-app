"use client";

import { useState } from "react";
import { Boxes, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#integraciones", label: "Integraciones" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Boxes className="size-4 text-white" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">Collectionat</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contacto"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Iniciar sesión
          </a>
          <a
            href="#cta"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Solicitar demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex size-11 items-center justify-center rounded-lg text-white md:hidden"
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/5 bg-black px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black"
          >
            Solicitar demo
          </a>
        </div>
      )}
    </header>
  );
}
