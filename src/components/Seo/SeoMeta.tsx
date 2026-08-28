import { JSX } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  getContentLocale,
  getCanonicalPath,
  getHtmlLang,
  getLanguageAlternates,
  getLocalizedPath,
  DEFAULT_LOCALE,
  normalizePath,
  OPEN_GRAPH_LOCALES,
  ROUTE_SCHEMA_TYPE,
  ROUTE_SEO,
  splitLocalizedPath,
} from "../../config/seo";
import {
  EDUCATION_ORGANIZATIONS,
  FREELANCE_OFFER,
  getPreviewImageUrl,
  getSiteUrl,
  PROFESSIONAL_TOPICS,
  SITE_PROFILE,
  SOCIAL_LINKS,
} from "../../config/site";

function SeoMeta(): JSX.Element {
  const { i18n } = useTranslation();
  const location = useLocation();
  const localizedPath = splitLocalizedPath(location.pathname);
  const pathname = normalizePath(localizedPath.pathname);
  const siteUrl = getSiteUrl();
  const currentRoute = ROUTE_SEO[pathname];
  const canonicalLocale = localizedPath.locale ?? DEFAULT_LOCALE;
  const contentLocaleSeed = localizedPath.locale ?? DEFAULT_LOCALE;
  // Some localized URLs intentionally reuse fallback content until full translations exist.
  const contentLang = getContentLocale(contentLocaleSeed, pathname);
  const htmlLang = getHtmlLang(contentLang);
  const tx = i18n.getFixedT(contentLang);

  const baseTitle = tx("seo_title");
  const pageTitle = currentRoute ? tx(currentRoute.titleKey) : "";
  const fullTitle = pathname === "/" || !pageTitle ? baseTitle : `${pageTitle} | ${baseTitle}`;
  const description = currentRoute?.descriptionKey
    ? tx(currentRoute.descriptionKey, { defaultValue: tx("seo_description") })
    : tx("seo_description");

  const canonicalPath = currentRoute?.noindex ? pathname : getCanonicalPath(canonicalLocale, pathname);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const imageUrl = getPreviewImageUrl(siteUrl);
  // Hidden or utility routes should not advertise hreflang clusters.
  const languageAlternates = currentRoute?.noindex ? [] : getLanguageAlternates(siteUrl, pathname);
  const isNoindex = currentRoute?.noindex ?? false;
  const robotsContent = isNoindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";
  const keywords = tx("seo_keywords", {
    defaultValue: "Théo Guérin, développeur full-stack, React, Django, Python, portfolio",
  });

  // Person schema gives search engines the freelance offer and professional identity in one graph.
  const personSchema = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: SITE_PROFILE.displayName,
    jobTitle: SITE_PROFILE.jobTitle,
    url: siteUrl,
    image: imageUrl,
    email: SITE_PROFILE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_PROFILE.city,
      postalCode: SITE_PROFILE.postalCode,
      addressCountry: SITE_PROFILE.countryCode,
    },
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.gitlab, SOCIAL_LINKS.linkedin],
    knowsAbout: [...PROFESSIONAL_TOPICS],
    alumniOf: EDUCATION_ORGANIZATIONS.map((name) => ({ "@type": "CollegeOrUniversity", name })),
    makesOffer: {
      "@type": "Offer",
      name: "Services de développeur freelance Full-Stack",
      description: `TJM indicatif à partir de ${FREELANCE_OFFER.dayRateFrom} ${FREELANCE_OFFER.currency}/jour ${FREELANCE_OFFER.taxLabel}, ajusté selon le périmètre.`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: FREELANCE_OFFER.dayRateFrom,
        priceCurrency: FREELANCE_OFFER.currency,
        unitText: FREELANCE_OFFER.unitText,
        valueAddedTaxIncluded: false,
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Nahibu",
      url: "https://nahibu.com",
    },
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: `Portfolio de ${SITE_PROFILE.displayName}`,
    url: siteUrl,
    author: { "@id": `${siteUrl}/#person` },
    inLanguage: ["fr", "en", "es", "br"],
  };

  // The page node changes by route while still pointing back to the same person entity.
  const webPageType = ROUTE_SCHEMA_TYPE[pathname] ?? "WebPage";
  const webPageSchema = {
    "@type": webPageType,
    "@id": `${canonicalUrl}#webpage`,
    name: fullTitle,
    description,
    url: canonicalUrl,
    inLanguage: htmlLang,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    ...(webPageType === "ProfilePage" ? { mainEntity: { "@id": `${siteUrl}/#person` } } : {}),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, webPageSchema],
  };

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="author" content={SITE_PROFILE.displayName} />
      {!isNoindex && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <meta name="geo.region" content={SITE_PROFILE.regionCode} />
      <meta name="geo.placename" content={SITE_PROFILE.city} />
      <meta name="geo.position" content={SITE_PROFILE.geoPosition} />
      <meta name="ICBM" content={SITE_PROFILE.geoICBM} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" type="text/markdown" href={`${siteUrl}/llms.txt`} />
      <link rel="alternate" type="text/markdown" href={`${siteUrl}/llms-en.txt`} hrefLang="en" />
      <link rel="alternate" type="text/markdown" href={`${siteUrl}/llms-fr.txt`} hrefLang="fr" />
      {languageAlternates.map((alternate) => (
        <link key={alternate.hrefLang} rel="alternate" href={alternate.href} hrefLang={alternate.hrefLang} />
      ))}
      {!isNoindex && <link rel="alternate" href={`${siteUrl}${getLocalizedPath("fr", pathname)}`} hrefLang="x-default" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${SITE_PROFILE.displayName} | Portfolio`} />
      <meta property="og:locale" content={OPEN_GRAPH_LOCALES[contentLang]} />
      {languageAlternates
        .filter((alternate) => alternate.hrefLang !== htmlLang)
        .map((alternate) => (
          <meta
            key={alternate.hrefLang}
            property="og:locale:alternate"
            content={OPEN_GRAPH_LOCALES[alternate.locale]}
          />
        ))}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={tx("seo_og_image_alt", { defaultValue: "Aperçu du portfolio de Théo Guérin" })} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_PROFILE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={tx("seo_og_image_alt", { defaultValue: "Aperçu du portfolio de Théo Guérin" })} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}

export default SeoMeta;
