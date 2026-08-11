import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];

// Set NEXT_PUBLIC_SITE_URL to your real production domain before deploying —
// this only falls back to localhost so `metadataBase` (required for the OG
// image/canonical URLs below) resolves correctly in local dev.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID (format G-XXXXXXXXXX) to enable Google
// Analytics — until it's set, the gtag scripts below simply don't render.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const CONTENT: Record<
  Locale,
  {
    title: string;
    description: string;
    ogLocale: string;
    canonical: string;
    planCQuote: string;
  }
> = {
  es: {
    title: "CollectionatApp — Dile adiós a Excel. Centraliza tu empresa.",
    description:
      "CollectionatApp es la plataforma integral de gestión empresarial que elimina la dependencia de hojas de cálculo complejas y centraliza todo en una base de datos inteligente y ágil integrada con Microsoft (Outlook, Teams, SharePoint y OneDrive). Con módulos adaptados a tu industria — inmobiliarias, estudios jurídicos y más — más automatización de flujos y una interfaz de alto rendimiento.",
    ogLocale: "es_AR",
    // The Spanish page's real, already-indexed URL is "/" (middleware
    // rewrites "/" -> "/es" internally) — canonical must point there, not
    // at "/es", or we'd be telling search engines the URL changed.
    canonical: "/",
    planCQuote: "Cotización personalizada a medida",
  },
  en: {
    title: "CollectionatApp — Say Goodbye to Excel. Centralize Your Business.",
    description:
      "CollectionatApp is the all-in-one business management platform that eliminates dependence on complex spreadsheets and centralizes everything in a smart, agile database natively integrated with Microsoft (Outlook, Teams, SharePoint, and OneDrive). With modules tailored to your industry — real estate, law firms, and more — plus workflow automation and a high-performance interface.",
    ogLocale: "en_US",
    canonical: "/en",
    planCQuote: "Custom quote",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) return {};
  const c = CONTENT[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: c.title,
    description: c.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: c.canonical,
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: c.ogLocale,
      url: c.canonical,
      siteName: "CollectionatApp",
      title: c.title,
      description: c.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CollectionatApp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: ["/opengraph-image"],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const c = CONTENT[locale];

  return (
    <html lang={locale} className={inter.variable}>
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
              description: c.description,
              offers: [
                { "@type": "Offer", name: "Plan A", price: "4500", priceCurrency: "USD" },
                { "@type": "Offer", name: "Plan B", price: "9000", priceCurrency: "USD" },
                { "@type": "Offer", name: "Plan C", description: c.planCQuote },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
