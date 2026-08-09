"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CTASection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError("Ingresa tu correo de trabajo para continuar.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Ese correo no parece válido. Revísalo e inténtalo de nuevo.");
      return;
    }

    setError(null);
    setStatus("submitting");

    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,130,246,0.22),rgba(0,0,0,0))]"
      />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Dale a tu empresa una sola{" "}
          <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            fuente de la verdad
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          Agenda una demo de 20 minutos y te mostramos cómo Collectionat se conecta con tu
          entorno de Microsoft 365 en menos de una semana.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-glow sm:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
              <CheckCircle2 className="size-10 text-blue-400" aria-hidden="true" />
              <p className="text-base font-semibold text-white">¡Listo, recibimos tu solicitud!</p>
              <p className="text-sm text-zinc-400">
                Un especialista de Collectionat se pondrá en contacto contigo en menos de 24
                horas hábiles.
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="work-email" className="mb-1.5 block text-sm font-medium text-zinc-200">
                  Correo de trabajo
                </label>
                <input
                  id="work-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : "email-helper"}
                  placeholder="tu.nombre@empresa.com"
                  className="h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-400"
                />
                {error ? (
                  <p id="email-error" className="mt-1.5 text-sm text-red-400">
                    {error}
                  </p>
                ) : (
                  <p id="email-helper" className="mt-1.5 text-xs text-zinc-500">
                    Usa el correo con el que inicias sesión en Microsoft 365.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-zinc-200">
                  Empresa <span className="font-normal text-zinc-500">(opcional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Nombre de tu empresa"
                  className="h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Solicitar demo gratuita
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-zinc-600">
                Sin tarjeta de crédito. Cancela cuando quieras.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
