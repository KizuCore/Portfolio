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
  "/politique-des-cookies": {
    titleKey: "cookie_policy.title",
    descriptionKey: "seo_routes.cookies_description",
  },
  "/gojo": { titleKey: "Nah I'd win", noindex: true },
  "/arcane": { titleKey: "Rewind 4 Seconds", noindex: true },
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getShortLocale(input: string): "fr" | "en" | "es" | "bzh" {
  const value = input.split("-")[0].toLowerCase();
  if (value === "en" || value === "es" || value === "bzh") return value;
  return "fr";
}

function mapLegalLocale(lang: "fr" | "en" | "es" | "bzh"): "fr" | "en" {
  if (lang === "es") return "en";
  if (lang === "bzh") return "fr";
  return lang === "en" ? "en" : "fr";
}

function SeoMeta(): JSX.Element {
  const { i18n } = useTranslation();
  const location = useLocation();
  const pathname = normalizePath(location.pathname);
  const siteUrl = (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
  const currentRoute = ROUTE_SEO[pathname];
  const lang = getShortLocale(i18n.resolvedLanguage ?? i18n.language ?? "fr");
  const isLegalRoute =
    pathname === "/mentions-legales" ||
    pathname === "/politique-de-confidentialite" ||
    pathname === "/politique-des-cookies";
  const contentLang = isLegalRoute ? mapLegalLocale(lang) : lang;
  const htmlLang = contentLang === "bzh" ? "br" : contentLang;
  const tx = i18n.getFixedT(contentLang);

  const localeMap: Record<"fr" | "en" | "es" | "bzh", string> = {
    fr: "fr_FR",
    en: "en_US",
    es: "es_ES",
    bzh: "br_FR",
  };

  const baseTitle = tx("seo_title");
  const pageTitle = currentRoute ? tx(currentRoute.titleKey) : "";
  const fullTitle = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;

  const description = currentRoute?.descriptionKey
    ? tx(currentRoute.descriptionKey, { defaultValue: tx("seo_description") })
    : tx("seo_description");

  const canonicalUrl = `${siteUrl}${pathname}`;
  const imageUrl = `${siteUrl}/images/preview/previewsite.png`;
  const isNoindex = currentRoute?.noindex ?? false;
  const robotsContent = isNoindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";
  const keywords = tx("seo_keywords", {
    defaultValue: "Théo Guérin, développeur full-stack, React, Django, Python, portfolio",
  });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Théo Guérin",
    jobTitle: "Développeur Full-Stack",
    url: siteUrl,
    image: imageUrl,
    email: "theo.guerin35000@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rennes",
      postalCode: "35700",
      addressCountry: "FR",
    },
    sameAs: [
      "https://github.com/KizuCore",
      "https://www.linkedin.com/in/theo-guerin35/",
    ],
    knowsAbout: ["React", "Django", "Python", "Node.js", "Flutter", "PostgreSQL", "Docker", "TypeScript"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Université Rennes 1 ISTIC" },
      { "@type": "CollegeOrUniversity", name: "My Digital School Rennes" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Nahibu",
      url: "https://nahibu.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Théo Guérin | Portfolio",
    url: siteUrl,
    author: { "@type": "Person", name: "Théo Guérin" },
    inLanguage: ["fr", "en", "es"],
  };

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="author" content="Théo Guérin" />
      {!isNoindex && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <meta name="geo.region" content="FR-35" />
      <meta name="geo.placename" content="Rennes" />
      <meta name="geo.position" content="48.117266;-1.677793" />
      <meta name="ICBM" content="48.117266, -1.677793" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={`${siteUrl}${pathname}`} hrefLang="fr" />
      <link rel="alternate" href={`${siteUrl}${pathname}`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}${pathname}`} hrefLang="es" />
      <link rel="alternate" href={`${siteUrl}${pathname}`} hrefLang="br" />
      <link rel="alternate" href={`${siteUrl}${pathname}`} hrefLang="x-default" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Théo Guérin | Portfolio" />
      <meta property="og:locale" content={localeMap[contentLang]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={tx("seo_og_image_alt", { defaultValue: "Aperçu du portfolio de Théo Guérin" })} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KizuCore" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={tx("seo_og_image_alt", { defaultValue: "Aperçu du portfolio de Théo Guérin" })} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      {pathname === "/" && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
    </Helmet>
  );
}

export default SeoMeta;
