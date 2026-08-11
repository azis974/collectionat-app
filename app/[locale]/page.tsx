import { notFound } from "next/navigation";
import LandingES from "@/components/pages/landing-es";
import LandingEN from "@/components/pages/landing-en";

const LOCALES = ["es", "en"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (params.locale === "es") return <LandingES />;
  if (params.locale === "en") return <LandingEN />;
  notFound();
}
