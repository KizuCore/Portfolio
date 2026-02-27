import { JSX } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type RouteSeo = {
  titleKey: string;
  descriptionKey?: string;
  noindex?: boolean;
};

const ROUTE_SEO: Record<string, RouteSeo> = {
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
  "/gojo": { titleKey: "Nah I'd win", noindex: true },
  "/arcane": { titleKey: "Bizarre", noindex: true },
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function getShortLocale(input: string): "fr" | "en" | "es" | "bzh" {
  const value = input.split("-")[0].toLowerCase();

  if (value === "en" || value === "es" || value === "bzh") {
    return value;
  }

  return "fr";
}

function SeoMeta(): JSX.Element {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const pathname = normalizePath(location.pathname);
  const siteUrl = (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
  const currentRoute = ROUTE_SEO[pathname];
  const lang = getShortLocale(i18n.resolvedLanguage ?? i18n.language ?? "fr");
  const htmlLang = lang === "bzh" ? "br" : lang;
  const localeMap: Record<"fr" | "en" | "es" | "bzh", string> = {
    fr: "fr_FR",
    en: "en_US",
    es: "es_ES",
    bzh: "br_FR",
  };

  const baseTitle = t("seo_title");
  const pageTitle = currentRoute ? t(currentRoute.titleKey) : "";
  const fullTitle = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
  const description = currentRoute?.descriptionKey
    ? t(currentRoute.descriptionKey, { defaultValue: t("seo_description") })
    : t("seo_description");
  const canonicalUrl = `${siteUrl}${pathname}`;
  const imageUrl = `${siteUrl}/images/preview/previewsite.png`;
  const robotsContent = currentRoute?.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Théo Guérin",
    jobTitle: "Développeur Full-Stack",
    url: siteUrl,
    image: imageUrl,
    sameAs: [
      "https://github.com/KizuCore",
      "https://www.linkedin.com/in/theo-guerin35/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "KizuCore",
    },
  };

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Théo Guérin | Portfolio" />
      <meta property="og:locale" content={localeMap[lang]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}

export default SeoMeta;
