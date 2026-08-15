export type SupportedLocale = "fr" | "en" | "es" | "bzh";

export type RouteSeo = {
  titleKey: string;
  descriptionKey?: string;
  noindex?: boolean;
};

export const SUPPORTED_LOCALES: SupportedLocale[] = ["fr", "en", "es", "bzh"];
export const DEFAULT_LOCALE: SupportedLocale = "fr";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": { titleKey: "home", descriptionKey: "seo_routes.home_description" },
  "/about": { titleKey: "about", descriptionKey: "seo_routes.about_description" },
  "/experience": { titleKey: "experience", descriptionKey: "seo_routes.experience_description" },
  "/project": { titleKey: "project", descriptionKey: "seo_routes.project_description" },
  "/contact": { titleKey: "social", descriptionKey: "seo_routes.contact_description" },
  "/cv": { titleKey: "cv", descriptionKey: "seo_routes.cv_description" },
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
  es: "es_ES",
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
  if (!LEGAL_ROUTES.has(pathname)) {
    return locale;
  }

  if (locale === "es") {
    return "en";
  }

  if (locale === "bzh") {
    return "fr";
  }

  return locale;
}

export function getHtmlLang(locale: SupportedLocale): string {
  return locale === "bzh" ? "br" : locale;
}

export function getLanguageAlternates(siteUrl: string, pathname: string) {
  return SUPPORTED_LOCALES.map((locale) => {
    return {
      href: `${siteUrl}${getLocalizedPath(locale, pathname)}`,
      hrefLang: getHtmlLang(locale),
      locale,
    };
  });
}
