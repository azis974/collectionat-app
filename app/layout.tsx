import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL to your real production domain before deploying —
// this only falls back to localhost so `metadataBase` (required for the OG
// image/canonical URLs below) resolves correctly in local dev.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID (format G-XXXXXXXXXX) to enable Google
// Analytics — until it's set, the gtag scripts below simply don't render.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const TITLE = "CollectionatApp — Dile adiós a Excel. Centraliza tu empresa.";
const DESCRIPTION =
  "CollectionatApp es la plataforma integral de gestión empresarial que elimina la dependencia de hojas de cálculo complejas y centraliza todo en una base de datos inteligente y ágil integrada con Microsoft (Outlook, Teams, SharePoint y OneDrive). Con módulos adaptados a tu industria — inmobiliarias, estudios jurídicos y más — más automatización de flujos y una interfaz de alto rendimiento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "CollectionatApp",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CollectionatApp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CollectionatApp",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: DESCRIPTION,
              offers: [
                { "@type": "Offer", name: "Plan A", price: "4500", priceCurrency: "USD" },
                { "@type": "Offer", name: "Plan B", price: "9000", priceCurrency: "USD" },
                { "@type": "Offer", name: "Plan C", description: "Cotización personalizada a medida" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
