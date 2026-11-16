export type SupportedLocale = "fr" | "en" | "bzh";

export type RouteSeo = {
  titleKey: string;
  seoTitleKey?: string;
  descriptionKey?: string;
  noindex?: boolean;
  contentLocale?: SupportedLocale;
};

export const SUPPORTED_LOCALES: SupportedLocale[] = ["fr", "en", "bzh"];
export const DEFAULT_LOCALE: SupportedLocale = "fr";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/services/developpement-api": { titleKey: "footer_services.api", contentLocale: "fr" },
  "/services/developpeur-react": { titleKey: "services.items.apps.title", contentLocale: "fr" },
  "/services/developpeur-django": { titleKey: "services.items.api.title", contentLocale: "fr" },
  "/services/developpeur-flutter": { titleKey: "services.items.mobile.title", contentLocale: "fr" },
  "/services/creation-site-internet-rennes": { titleKey: "services.items.websites.title", contentLocale: "fr" },
  "/realisations/a-table": { titleKey: "categories_projects.atable_title" },
  "/realisations/la-maree-malouine": { titleKey: "categories_projects.maree_malouine_title" },
  "/realisations/les-portes-de-montafilan": { titleKey: "categories_projects.portes_montafilan_title" },
  "/": { titleKey: "home", descriptionKey: "seo_routes.home_description" },
  "/about": { titleKey: "about", seoTitleKey: "seo_routes.about_title", descriptionKey: "seo_routes.about_description" },
  "/experience": { titleKey: "experience", seoTitleKey: "seo_routes.experience_title", descriptionKey: "seo_routes.experience_description" },
  "/project": { titleKey: "project", seoTitleKey: "seo_routes.project_title", descriptionKey: "seo_routes.project_description" },
  "/contact": { titleKey: "social", seoTitleKey: "seo_routes.contact_title", descriptionKey: "seo_routes.contact_description" },
  "/cv": { titleKey: "cv", seoTitleKey: "seo_routes.cv_title", descriptionKey: "seo_routes.cv_description" },
  "/mentions-legales": { titleKey: "mentions_legales.title", descriptionKey: "seo_routes.legal_description" },
  "/politique-de-confidentialite": {
    titleKey: "politique_confidentialite.title",
    descriptionKey: "seo_routes.privacy_description",
  },
  "/politique-des-cookies": {
    titleKey: "cookie_policy.title",
    descriptionKey: "seo_routes.cookies_description",
  },
  "/gojo": { titleKey: "easter.gojo.seo_title", noindex: true },
  "/arcane": { titleKey: "easter.arcane.seo_title", noindex: true },
};

export const ROUTE_SCHEMA_TYPE: Record<string, string> = {
  "/": "WebPage",
  "/about": "AboutPage",
  "/experience": "CollectionPage",
  "/project": "CollectionPage",
  "/contact": "ContactPage",
  "/cv": "ProfilePage",
  "/mentions-legales": "WebPage",
  "/politique-de-confidentialite": "WebPage",
  "/politique-des-cookies": "WebPage",
};

export const LEGAL_ROUTES = new Set([
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/politique-des-cookies",
]);

export const OPEN_GRAPH_LOCALES: Record<SupportedLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
  bzh: "br_FR",
};

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function splitLocalizedPath(pathname: string): { locale: SupportedLocale | null; pathname: string } {
  const normalizedPath = normalizePath(pathname);
  const [, firstSegment, ...remainingSegments] = normalizedPath.split("/");

  // Les routes traduites sont des alias des mêmes vues React, par exemple /en/about -> /about.
  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    const localizedPathname = remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : "/";
    return {
      locale: firstSegment as SupportedLocale,
      pathname: normalizePath(localizedPathname),
    };
  }

  return {
    locale: null,
    pathname: normalizedPath,
  };
}

export function getLocalizedPath(locale: SupportedLocale, pathname: string): string {
  const basePath = splitLocalizedPath(pathname).pathname;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function getShortLocale(input: string): SupportedLocale {
  const value = input.split("-")[0].toLowerCase();
  return SUPPORTED_LOCALES.includes(value as SupportedLocale) ? (value as SupportedLocale) : "fr";
}

export function getContentLocale(locale: SupportedLocale, pathname: string): SupportedLocale {
  // N’annonce que les langues dont le contenu rédactionnel est maintenu.
  const fixedLocale = ROUTE_SEO[pathname]?.contentLocale;
  if (fixedLocale) return fixedLocale;
  if (!LEGAL_ROUTES.has(pathname)) {
    return locale;
  }

  // Le contenu juridique est maintenu uniquement en français et en anglais pour le moment.
  if (locale === "bzh") {
    return "fr";
  }

  return locale;
}

export function getCanonicalLocale(locale: SupportedLocale, pathname: string): SupportedLocale {
  return getContentLocale(locale, pathname);
}

export function getCanonicalPath(locale: SupportedLocale, pathname: string): string {
  return getLocalizedPath(getCanonicalLocale(locale, pathname), pathname);
}

export function getIndexableLocales(pathname: string): SupportedLocale[] {
  return SUPPORTED_LOCALES.filter((locale) => getCanonicalLocale(locale, pathname) === locale);
}

export function getHtmlLang(locale: SupportedLocale): string {
  return locale === "bzh" ? "br" : locale;
}

// Source unique pour le HTML généré et les navigations React.
export function getBreadcrumbSchema(siteUrl: string, pathname: string, locale: SupportedLocale, title: string, homeLabel: string) {
  if (pathname === "/" || !ROUTE_SEO[pathname] || ROUTE_SEO[pathname].noindex) return null;
  const canonicalLocale = getCanonicalLocale(locale, pathname);
  const url = `${siteUrl}${getCanonicalPath(locale, pathname)}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: `${siteUrl}${getLocalizedPath(canonicalLocale, "/")}` },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };
}

export function getLanguageAlternates(siteUrl: string, pathname: string) {
  // Les moteurs de recherche attendent une URL alternative absolue par variante linguistique.
  return getIndexableLocales(pathname).map((locale) => {
    return {
      href: `${siteUrl}${getLocalizedPath(locale, pathname)}`,
      hrefLang: getHtmlLang(locale),
      locale,
    };
  });
}
