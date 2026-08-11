import { notFound } from "next/navigation";
import LandingES from "@/components/pages/landing-es";
import LandingEN from "@/components/pages/landing-en";
import LandingAR from "@/components/pages/landing-ar";

const LOCALES = ["es", "en", "ar"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (params.locale === "es") return <LandingES />;
  if (params.locale === "en") return <LandingEN />;
  if (params.locale === "ar") return <LandingAR />;
  notFound();
}
