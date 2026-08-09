import { NextResponse } from "next/server";

interface DemoRequestBody {
  name?: string;
  email?: string;
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: DemoRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";

  if (!name || !email || !company) {
    return NextResponse.json({ error: "Nombre, correo y empresa son obligatorios." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  // This endpoint genuinely runs server-side and validates input, but it does not
  // yet deliver the lead anywhere — wire up one of these before going live:
  //
  //   1. Email via Resend:
  //      const resend = new Resend(process.env.RESEND_API_KEY);
  //      await resend.emails.send({ from: "...", to: "sales@collectionat.com", subject: `Demo request: ${name}`, text: `${name} <${email}> — ${company}` });
  //
  //   2. Forward to Formspree / HubSpot / your CRM's REST API with fetch().
  //
  //   3. Write to a database (Postgres, Supabase, etc.) for your sales team to query.
  //
  // For now it just logs server-side so submissions aren't silently lost during development.
  console.log("[demo-request]", { name, email, company, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
