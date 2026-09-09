import type { BusinessPage } from "../data/businessPages";

// Build the same linked entities for the client head and statically generated HTML.
export function getBusinessSchema(page: BusinessPage | undefined, siteUrl: string, locale: string = "fr", homeLabel: string = "Accueil") {
  if (!page) return [];
  const url = `${siteUrl}/${locale}${page.path}`;
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: page.title, item: url },
    ],
  };
  return page.kind === "service" ? [breadcrumbs, {
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.title,
    description: page.description,
    url,
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: { "@type": "City", name: "Rennes" },
  }] : [breadcrumbs];
}
