import type { Metadata } from "next";
import Nav from "@/components/dna-erp/Nav";
import Hero from "@/components/dna-erp/Hero";
import LogoWall from "@/components/dna-erp/LogoWall";
import AppsGrid from "@/components/dna-erp/AppsGrid";
import AiShowcase from "@/components/dna-erp/AiShowcase";
import Testimonial from "@/components/dna-erp/Testimonial";
import FeaturesCarousel from "@/components/dna-erp/FeaturesCarousel";
import Showreel from "@/components/dna-erp/Showreel";
import Results from "@/components/dna-erp/Results";
import Pricing from "@/components/dna-erp/Pricing";
import Faq from "@/components/dna-erp/Faq";
import Blog from "@/components/dna-erp/Blog";
import FinalCta from "@/components/dna-erp/FinalCta";
import Footer from "@/components/dna-erp/Footer";

export const metadata: Metadata = {
  title: "DNA ERP — AI-Powered ERP for Modern Businesses",
  description: "Structural clone demo: AI-powered cloud ERP landing page with dashboard, apps, pricing and FAQ sections.",
};

export default function DnaErpPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-neutral-300">
      <Nav />
      <Hero />
      <LogoWall />
      <AppsGrid />
      <AiShowcase />
      <Testimonial />
      <FeaturesCarousel />
      <Showreel />
      <Results />
      <Pricing />
      <Faq />
      <Blog />
      <FinalCta />
      <Footer />
    </div>
  );
}
