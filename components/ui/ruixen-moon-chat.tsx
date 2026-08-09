"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Paperclip,
  ArrowUpIcon,
  TrendingUp,
  Search,
  Receipt,
  Mail,
  FileSpreadsheet,
  ClipboardCheck,
  BarChart3,
  FolderKanban,
  Sparkles,
} from "lucide-react";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

const QUICK_ACTIONS = [
  { icon: TrendingUp, label: "Resumen de ventas" },
  { icon: Search, label: "Buscar cliente" },
  { icon: Receipt, label: "Cuentas por cobrar" },
  { icon: Mail, label: "Sincronizar Outlook" },
  { icon: FileSpreadsheet, label: "Migrar hoja de cálculo" },
  { icon: ClipboardCheck, label: "Aprobaciones pendientes" },
  { icon: BarChart3, label: "Analizar tendencias" },
  { icon: FolderKanban, label: "Conectar SharePoint" },
];

const CANNED_RESPONSES: Record<string, string> = {
  "Resumen de ventas":
    "Este mes llevas $284,600 en ventas cerradas, 12% más que el mes pasado. Tu cuenta más grande es Orion Retail Group.",
  "Buscar cliente": "Encontré 3 clientes que coinciden. Meridian Foods tiene la interacción más reciente: hace 2 días.",
  "Cuentas por cobrar": "Tienes $475,070 en cuentas por cobrar, de las cuales $199,400 están vencidas hace más de 30 días.",
  "Sincronizar Outlook": "Sincronizando tu bandeja de Outlook… 128 correos nuevos vinculados a cuentas existentes.",
  "Migrar hoja de cálculo": "Sube tu archivo .xlsx y lo convierto en registros estructurados automáticamente, sin perder ninguna fila.",
  "Aprobaciones pendientes": "Tienes 3 aprobaciones esperando: una orden de compra, un descuento y un alta de proveedor.",
  "Analizar tendencias": "Tus ingresos vienen creciendo 8% mensual desde hace un trimestre, impulsados por Retail y Manufactura.",
  "Conectar SharePoint": "Conectado. Ahora puedo buscar directamente en tus bibliotecas de documentos de SharePoint.",
};

const DEFAULT_RESPONSE =
  "Puedo ayudarte a buscar, resumir o cruzar información de tus datos centralizados. Prueba una de las acciones rápidas de abajo.";

export default function RuixenMoonChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setThinking(true);
    setReply(null);
    window.setTimeout(() => {
      setReply(CANNED_RESPONSES[trimmed] ?? DEFAULT_RESPONSE);
      setThinking(false);
    }, 600);
  };

  const handleQuickAction = (label: string) => {
    setMessage(label);
    adjustHeight();
    send(label);
  };

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-black px-6 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 45% 45% at 25% 15%, rgba(59,130,246,0.30), transparent 70%)",
            "radial-gradient(ellipse 45% 45% at 75% 25%, rgba(236,72,153,0.26), transparent 70%)",
            "radial-gradient(ellipse 50% 50% at 50% 85%, rgba(168,85,247,0.24), transparent 70%)",
          ].join(", "),
        }}
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />

      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300">
          <Sparkles size={13} /> Impulsado por IA
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Pregúntale a Collectionat</h2>
        <p className="mt-2 max-w-md text-neutral-400">
          Escribe en lenguaje natural y obtén respuestas de tus datos centralizados al instante.
        </p>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <div className="relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(message);
              }
            }}
            placeholder="¿Cuánto facturamos este mes?"
            className={cn(
              "w-full resize-none border-none px-4 py-3",
              "bg-transparent text-sm text-white",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "min-h-[48px] placeholder:text-neutral-500"
            )}
            style={{ overflow: "hidden" }}
          />

          <div className="flex items-center justify-between p-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              onClick={() => send(message)}
              disabled={!message.trim() || thinking}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 transition-colors",
                message.trim() && !thinking
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "cursor-not-allowed bg-white/10 text-neutral-500"
              )}
            >
              <ArrowUpIcon className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </div>
        </div>

        {(thinking || reply) && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm text-neutral-300">
            {thinking ? "Consultando tus datos…" : reply}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              onClick={() => handleQuickAction(label)}
              className="flex items-center gap-2 rounded-full border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
