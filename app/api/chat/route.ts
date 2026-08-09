import { NextResponse } from "next/server";

interface ChatRequestBody {
  message?: string;
}

/**
 * Grounds the assistant in what Collectionat actually is/does/costs — kept in
 * sync by hand with the marketing copy in app/page.tsx. The bot answers as
 * the landing page's sales assistant, not as if it had live access to a
 * visitor's real business data (there is no backend behind this demo site).
 */
const SYSTEM_PROMPT = `Sos el asistente de ventas de CollectionatApp, una plataforma SaaS que centraliza la información crítica de una empresa (ventas, finanzas, operaciones) en una base de datos inteligente conectada de forma nativa a Microsoft 365 (Outlook, Teams, SharePoint, OneDrive), eliminando el uso de hojas de cálculo dispersas.

Datos reales del producto que podés usar para responder:
- Planes: Plan A (20 solapas, 2 usuarios, USD 4.500), Plan B (50 solapas, 3 usuarios, USD 9.000 — el plan recomendado), Plan C (a medida, cotización personalizada según la necesidad de cada empresa). Se aceptan planes de pago flexibles.
- Rubros con implementación real hoy: Inmobiliarias (propiedades, contratos y trámites, email corporativo, recursos humanos, chat con IA, alertas generales) y Estudios jurídicos (causas, clientes, agenda, documentos, portales oficiales). También se arman implementaciones a medida para otros rubros.
- Permisos por rol: cada persona ve y edita solo su área (por ejemplo, administración o propiedades); el dueño o administrador general tiene visibilidad y control total del sistema.
- Automatización de flujos (reasignación de tareas, notificaciones, aprobaciones), reportes dinámicos en tiempo real, y un chat con IA sobre los datos centralizados de la empresa.

Reglas:
- Respondé siempre en español rioplatense, en 2 a 4 oraciones, tono cercano y profesional — nada de párrafos largos.
- Solo usá los datos de arriba. Si preguntan algo que no está acá (plazos exactos de implementación, casos particulares, descuentos, etc.), decilo con honestidad y sugerí "solicitar una demo" para hablar con el equipo.
- Nunca inventes funcionalidades, precios o clientes que no figuran en esta descripción.
- Sos el asistente de la landing page, no el producto ya instalado: si preguntan por "sus" ventas, cobranzas o datos específicos de su empresa, aclará amablemente que no tenés acceso a eso (recién no está conectado a ningún backend real) y ofrecé mostrarles cómo se ve esa función en la demo interactiva de la página o en una llamada con el equipo.`;

// Fast + generous free tier. For higher-quality answers, swap to
// "llama-3.3-70b-versatile" — see https://console.groq.com/docs/models.
const GROQ_MODEL = "llama-3.1-8b-instant";

/**
 * In-memory sliding-window rate limit, keyed by client IP. This is a public
 * endpoint that calls a metered external API, so without a limit anyone can
 * spam it and burn through the Groq quota. In-memory is fine for a single
 * server instance (resets on redeploy/restart); swap for Upstash/Redis if
 * this ever runs across multiple instances.
 */
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 8; // messages per IP per window
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Estás enviando mensajes muy rápido. Esperá un minuto e intentá de nuevo." },
      { status: 429 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const message = body.message?.trim().slice(0, 2000) ?? "";
  if (!message) {
    return NextResponse.json({ error: "Escribí un mensaje." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // Genuinely no key configured yet — tell the caller plainly instead of
    // pretending to answer. See README for how to get a free one.
    return NextResponse.json(
      { error: "El asistente de IA todavía no está configurado en este entorno (falta GROQ_API_KEY)." },
      { status: 503 },
    );
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 300,
        temperature: 0.6,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.text();
      console.error("[chat] Groq API error", groqRes.status, errBody);
      return NextResponse.json(
        { error: "No se pudo contactar al asistente en este momento. Probá de nuevo en unos segundos." },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "El asistente no devolvió una respuesta. Probá reformular la pregunta." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("[chat] Unexpected error", err);
    return NextResponse.json({ error: "Ocurrió un error inesperado contactando al asistente." }, { status: 500 });
  }
}
