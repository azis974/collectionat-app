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

// Free-tier model on Google AI Studio at the time this was written. If Google
// renames/retires it, swap the id here — check https://ai.google.dev/gemini-api/docs/models.
const GEMINI_MODEL = "gemini-2.0-flash";

export async function POST(request: Request) {
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Genuinely no key configured yet — tell the caller plainly instead of
    // pretending to answer. See README for how to get a free one.
    return NextResponse.json(
      { error: "El asistente de IA todavía no está configurado en este entorno (falta GEMINI_API_KEY)." },
      { status: 503 },
    );
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.6 },
      }),
    });

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("[chat] Gemini API error", geminiRes.status, errBody);
      return NextResponse.json(
        { error: "No se pudo contactar al asistente en este momento. Probá de nuevo en unos segundos." },
        { status: 502 },
      );
    }

    const data = await geminiRes.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

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
