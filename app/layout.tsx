import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CollectionatApp — Dile adiós a Excel. Centraliza tu empresa.",
  description:
    "CollectionatApp es la plataforma integral de gestión empresarial que elimina la dependencia de hojas de cálculo complejas y centraliza todo en una base de datos inteligente y ágil integrada con Microsoft (Outlook, Teams, SharePoint y OneDrive). Con módulos adaptados a tu industria — inmobiliarias, estudios jurídicos y más — más automatización de flujos y una interfaz de alto rendimiento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
