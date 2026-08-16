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

const LOCALES = ["es", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];
const RTL_LOCALES: readonly Locale[] = ["ar"];

// Set NEXT_PUBLIC_SITE_URL to your real production domain before deploying —
// this only falls back to localhost so `metadataBase` (required for the OG
// image/canonical URLs below) resolves correctly in local dev.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Set NEXT_PUBLIC_GA_MEASUREMENT_ID (format G-XXXXXXXXXX) to enable Google
// Analytics — until it's set, the gtag scripts below simply don't render.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Set NEXT_PUBLIC_META_PIXEL_ID (the numeric Pixel ID from Meta Events
// Manager) to enable the Meta Pixel for Instagram/Facebook Ads — until it's
// set, the fbq scripts below simply don't render. The demo-request form
// (DemoRequestModal in each landing-*.tsx) fires a "Lead" event on success.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
  ar: {
    title: "CollectionatApp — وداعًا لإكسل. مركّز إدارة شركتك بالكامل",
    description:
      "CollectionatApp هي منصة إدارة الأعمال المتكاملة التي تلغي الاعتماد على جداول البيانات المعقدة وتُركّز كل شيء في قاعدة بيانات ذكية ومرنة، متصلة بشكل أصلي مع مايكروسوفت (Outlook وTeams وSharePoint وOneDrive). مع وحدات مصممة خصيصًا لقطاعك — العقارات والمكاتب القانونية وغيرها — بالإضافة إلى أتمتة سير العمل وواجهة عالية الأداء.",
    ogLocale: "ar_AR",
    canonical: "/ar",
    planCQuote: "عرض سعر مخصص",
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
      languages: { es: "/", en: "/en", ar: "/ar" },
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

  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={inter.variable}>
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
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
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
