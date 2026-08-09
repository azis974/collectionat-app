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

  // Always logged server-side first, so a lead is never lost even if email
  // delivery below isn't configured yet or has a hiccup.
  console.log("[demo-request]", { name, email, company, at: new Date().toISOString() });

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.DEMO_REQUEST_TO_EMAIL;

  if (!resendKey || !toEmail) {
    console.warn(
      "[demo-request] NOT DELIVERED — falta RESEND_API_KEY y/o DEMO_REQUEST_TO_EMAIL en el servidor. " +
        "La solicitud quedó en el log de arriba pero no se envió ningún email. Ver README para configurarlo.",
    );
    // The visitor's submission still succeeds — we already captured it in the
    // log above, and failing their form over a missing email integration
    // would lose the lead outright instead of just delaying the alert.
    return NextResponse.json({ ok: true });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        // Resend's shared testing sender — works with zero domain setup.
        // Once you verify your own domain in Resend, swap this to something
        // like "CollectionatApp <demo@tudominio.com>".
        from: "CollectionatApp <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `Nueva solicitud de demo — ${company}`,
        text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company}\nFecha: ${new Date().toLocaleString("es-AR")}`,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("[demo-request] Resend API error", resendRes.status, errBody);
    }
  } catch (err) {
    console.error("[demo-request] Unexpected error sending email", err);
  }

  // Either way, the visitor's submission is already safely logged above.
  return NextResponse.json({ ok: true });
}
