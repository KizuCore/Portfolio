import type { BusinessPage } from "@/content/businessPages";

// Construit les mêmes entités liées pour les métadonnées côté client et le HTML généré.
export function getBusinessSchema(page: BusinessPage | undefined, siteUrl: string, locale: string = "fr") {
  if (!page) return [];
  const url = `${siteUrl}/${locale}${page.path}`;
  return page.kind === "service" ? [{
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.title,
    description: page.description,
    url,
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: { "@type": "City", name: "Rennes" },
  }] : [];
}
