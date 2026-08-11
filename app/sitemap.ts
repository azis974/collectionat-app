import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Only the real landing page (all locales) is listed — /dna-erp is an
// internal structural demo (a clone of another company's ERP layout for
// reference), not content meant to be indexed or found in search results.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/en", "/ar"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
