import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const INDEX_HTML_PATH = path.join(DIST_DIR, "index.html");
const SITE_URL = (process.env.VITE_SITE_URL || "https://theo-guerin.fr").replace(/\/+$/, "");
const SEO_CONFIG_PATH = path.join(ROOT_DIR, "src", "config", "seo.ts");
const PORTFOLIO_DATA_PATH = path.join(ROOT_DIR, "src", "data", "portfolio.ts");
const LOCALES_DIR = path.join(ROOT_DIR, "src", "locales");

// Load a TypeScript config/data file inside the Node SEO scripts without requiring a build step.
function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const sandbox = {
    exports: {},
    module: { exports: {} },
  };
  sandbox.module.exports = sandbox.exports;
  vm.runInNewContext(output, sandbox, { filename: filePath });
  return sandbox.exports;
}

// Escape text before injecting it into generated HTML.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Serialize JSON-LD safely so it cannot accidentally close the script tag.
function escapeJsonScript(value) {
  return JSON.stringify(value).replaceAll("</script", "<\\/script");
}

// Keep generated Markdown links readable when source content contains square brackets.
function stripMarkdownUnsafe(value) {
  return String(value).replaceAll("[", "\\[").replaceAll("]", "\\]");
}

// Resolve a dot-notated i18n key and interpolate simple {{param}} placeholders.
function tx(localeData, key, fallback = key, params = {}) {
  const value = key.split(".").reduce((current, segment) => current?.[segment], localeData);
  const translated = typeof value === "string" ? value : fallback;
  return Object.entries(params).reduce(
    (result, [name, replacement]) => result.replaceAll(`{{${name}}}`, String(replacement)),
    translated,
  );
}

// Convert the compact i18n highlights format into a list for HTML and Markdown outputs.
function parseHighlights(value) {
  return String(value || "")
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Build an absolute preview image URL from the shared public profile data.
function getPreviewImageUrl(profile) {
  return `${SITE_URL}${profile.previewImagePath}`;
}

// Build the route title with the same route/base-title convention as the React SEO component.
function buildTitle({ pathname, routeSeo, localeData }) {
  const baseTitle = tx(localeData, "seo_title");
  const route = routeSeo[pathname];
  const pageTitle = route ? tx(localeData, route.titleKey, "") : "";
  return pathname === "/" || !pageTitle ? baseTitle : `${pageTitle} | ${baseTitle}`;
}

// Build the route description from the localized SEO metadata.
function buildDescription({ pathname, routeSeo, localeData }) {
  const route = routeSeo[pathname];
  return route?.descriptionKey
    ? tx(localeData, route.descriptionKey, tx(localeData, "seo_description"))
    : tx(localeData, "seo_description");
}

// Resolve a translated project title from the shared project data.
function projectTitle(project, localeData) {
  return tx(localeData, project.titleKey);
}

// Resolve a translated project description from the shared project data.
function projectDescription(project, localeData) {
  return tx(localeData, project.descriptionKey);
}

// Keep project ordering aligned with the interactive React project explorer.
function getSortedProjects(projects) {
  return [...projects].sort((a, b) => {
    const pinTopPriority = Number(Boolean(b.pinTop)) - Number(Boolean(a.pinTop));
    return pinTopPriority !== 0 ? pinTopPriority : Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}

// Rebuild timeline entries from existing i18n keys so the static output shares the UI source text.
function getExperiences(localeData) {
  return [
    {
      title: tx(localeData, "experience_1_title"),
      date: tx(localeData, "experience_1_date"),
      subtitle: tx(localeData, "experience_1_subtitle"),
      description: tx(localeData, "experience_1_description"),
      highlights: parseHighlights(tx(localeData, "experience_1_highlights", "")),
      stack: tx(localeData, "experience_1_stack", ""),
    },
    {
      title: tx(localeData, "experience_2_title"),
      subtitle: tx(localeData, "experience_2_subtitle"),
      diplome: tx(localeData, "experience_2_diplome"),
      description: tx(localeData, "experience_2_description", ""),
      date: tx(localeData, "experience_2_date"),
    },
    {
      title: tx(localeData, "experience_3_title"),
      subtitle: tx(localeData, "experience_3_subtitle"),
      diplome: tx(localeData, "experience_3_diplome"),
      date: tx(localeData, "experience_3_date"),
    },
    {
      title: tx(localeData, "experience_4_title"),
      subtitle: tx(localeData, "experience_4_subtitle"),
      diplome: tx(localeData, "experience_4_diplome"),
      date: tx(localeData, "experience_4_date"),
    },
    {
      title: tx(localeData, "experience_5_title"),
      subtitle: tx(localeData, "experience_5_subtitle"),
      date: tx(localeData, "experience_5_date"),
    },
    {
      title: tx(localeData, "experience_6_title"),
      subtitle: tx(localeData, "experience_6_subtitle"),
      diplome: tx(localeData, "experience_6_diplome"),
      date: tx(localeData, "experience_6_date"),
    },
  ];
}

// Build the central Schema.org Person entity from public portfolio data only.
function buildPersonSchema({ profile, socialLinks, professionalTopics, educationOrganizations, freelanceOffer, imageUrl }) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.displayName,
    jobTitle: profile.jobTitle,
    description: "Développeur freelance Full-Stack basé à Rennes, spécialisé dans les sites web, applications React et API.",
    url: `${SITE_URL}/`,
    image: imageUrl,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      postalCode: profile.postalCode,
      addressCountry: profile.countryCode,
    },
    sameAs: [socialLinks.github, socialLinks.gitlab, socialLinks.linkedin],
    knowsAbout: [...professionalTopics],
    alumniOf: educationOrganizations.map((name) => ({ "@type": "CollegeOrUniversity", name })),
    makesOffer: {
      "@type": "Offer",
      name: "Services de développeur freelance Full-Stack",
      description: `TJM indicatif à partir de ${freelanceOffer.dayRateFrom} ${freelanceOffer.currency}/jour ${freelanceOffer.taxLabel}, ajusté selon le périmètre.`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: freelanceOffer.dayRateFrom,
        priceCurrency: freelanceOffer.currency,
        unitText: freelanceOffer.unitText,
        valueAddedTaxIncluded: false,
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Nahibu",
      url: "https://nahibu.com",
    },
  };
}

// Build a simple breadcrumb graph for internal pages.
function buildBreadcrumbSchema({ canonicalUrl, pathname, title }) {
  if (pathname === "/") {
    return null;
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title.split("|")[0].trim(),
        item: canonicalUrl,
      },
    ],
  };
}

// Build the route-specific Schema.org graph used in each prerendered HTML file.
function buildStructuredData({ pathname, canonicalUrl, title, description, htmlLang, localeData, portfolio, routeSchemaType }) {
  const imageUrl = getPreviewImageUrl(portfolio.SITE_PROFILE);
  const personSchema = buildPersonSchema({
    profile: portfolio.SITE_PROFILE,
    socialLinks: portfolio.SOCIAL_LINKS,
    professionalTopics: portfolio.PROFESSIONAL_TOPICS,
    educationOrganizations: portfolio.EDUCATION_ORGANIZATIONS,
    freelanceOffer: portfolio.FREELANCE_OFFER,
    imageUrl,
  });
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `Portfolio de ${portfolio.SITE_PROFILE.displayName}`,
    url: `${SITE_URL}/`,
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["fr", "en", "es", "br"],
  };
  const pageSchemaType = routeSchemaType[pathname] ?? "WebPage";
  const pageSchema = {
    "@type": pageSchemaType,
    "@id": `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: htmlLang,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    ...(pageSchemaType === "ProfilePage" ? { mainEntity: { "@id": `${SITE_URL}/#person` } } : {}),
  };
  const graph = [personSchema, websiteSchema, pageSchema];

  if (pathname === "/" || pathname === "/about") {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${canonicalUrl}#profilepage`,
      url: canonicalUrl,
      name: title,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    });
  }

  if (pathname === "/project") {
    for (const project of getSortedProjects(portfolio.PORTFOLIO_PROJECTS).filter((item) => item.featured || item.seeLink)) {
      graph.push({
        "@type": "CreativeWork",
        name: projectTitle(project, localeData),
        description: projectDescription(project, localeData),
        url: project.seeLink || project.ghLink,
        codeRepository: project.ghLink,
        creator: { "@id": `${SITE_URL}/#person` },
        keywords: project.techStack.join(", "),
      });
    }
  }

  const breadcrumbSchema = buildBreadcrumbSchema({ canonicalUrl, pathname, title });
  if (breadcrumbSchema) {
    graph.push(breadcrumbSchema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

// Build the no-JavaScript body content for each public route from shared data and translations.
function buildRouteContent({ pathname, localeData, portfolio }) {
  const projects = getSortedProjects(portfolio.PORTFOLIO_PROJECTS);
  const experiences = getExperiences(localeData);
  const skills = [...portfolio.PROFESSIONAL_TOPICS];

  const home = `
    <h1>${escapeHtml(portfolio.SITE_PROFILE.displayName)}</h1>
    <p>${escapeHtml(portfolio.SITE_PROFILE.jobTitle)} basé à ${escapeHtml(portfolio.SITE_PROFILE.city)}, France.</p>
    <section><h2>${escapeHtml(tx(localeData, "services.title"))}</h2><p>${escapeHtml(tx(localeData, "services.subtitle"))}</p></section>
    <section><h2>${escapeHtml(tx(localeData, "professional_skills"))}</h2><p>${escapeHtml(skills.join(", "))}</p></section>
    <section><h2>${escapeHtml(tx(localeData, "projects"))}</h2><ul>${projects.slice(0, 6).map((project) => `<li>${escapeHtml(projectTitle(project, localeData))} - ${escapeHtml(projectDescription(project, localeData))}</li>`).join("")}</ul></section>
  `;

  const about = `
    <h1>${escapeHtml(tx(localeData, "about_me"))}</h1>
    <p>${escapeHtml(tx(localeData, "greeting"))} ${escapeHtml(portfolio.SITE_PROFILE.displayName)} ${escapeHtml(tx(localeData, "from"))} ${escapeHtml(tx(localeData, "rennes"))}.</p>
    <p>${escapeHtml(tx(localeData, "current_position1"))} ${escapeHtml(tx(localeData, "developperAge"))}${escapeHtml(tx(localeData, "current_position2"))} ${escapeHtml(tx(localeData, "firstmaster"))}${escapeHtml(tx(localeData, "current_position3"))}</p>
    <p>${escapeHtml(tx(localeData, "presentation.text_1"))}${escapeHtml(tx(localeData, "presentation.text_bold_1"))}${escapeHtml(tx(localeData, "presentation.text_2"))}${escapeHtml(tx(localeData, "presentation.text_bold_2"))}${escapeHtml(tx(localeData, "presentation.text_3"))}${escapeHtml(tx(localeData, "presentation.text_bold_3"))}${escapeHtml(tx(localeData, "presentation.text_4"))}${escapeHtml(tx(localeData, "presentation.text_bold_4"))}${escapeHtml(tx(localeData, "presentation.text_5"))}</p>
    <section><h2>${escapeHtml(tx(localeData, "qualifications_title"))}</h2><ul>${["degree5", "degree1", "degree2", "degree3", "degree4"].map((key) => `<li>${escapeHtml(tx(localeData, key))}</li>`).join("")}</ul></section>
    <section><h2>${escapeHtml(tx(localeData, "professional_skills"))}</h2><p>${escapeHtml(skills.join(", "))}</p></section>
  `;

  const experience = `
    <h1>${escapeHtml(tx(localeData, "experience"))}</h1>
    <p>${escapeHtml(tx(localeData, "seo_routes.experience_description"))}</p>
    <section><h2>${escapeHtml(tx(localeData, "Mon parcours"))}</h2>${experiences.map((item) => `
      <article>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml([item.subtitle, item.date].filter(Boolean).join(" - "))}</p>
        ${item.diplome ? `<p>${escapeHtml(item.diplome)}</p>` : ""}
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
        ${item.highlights?.length ? `<ul>${item.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}</ul>` : ""}
        ${item.stack ? `<p>${escapeHtml(item.stack)}</p>` : ""}
      </article>
    `).join("")}</section>
  `;

  const project = `
    <h1>${escapeHtml(tx(localeData, "my_projects"))} ${escapeHtml(tx(localeData, "projects"))}</h1>
    <p>${escapeHtml(tx(localeData, "projects_description"))}</p>
    <section><h2>${escapeHtml(tx(localeData, "project_explorer.browse"))}</h2>${projects.map((item) => `
      <article>
        <h3>${escapeHtml(projectTitle(item, localeData))}</h3>
        <p>${escapeHtml(projectDescription(item, localeData))}</p>
        <p>${escapeHtml(item.techStack.join(", "))}</p>
        <p><a href="${escapeHtml(item.ghLink)}">${escapeHtml(item.isGitLab ? "GitLab" : "GitHub")}</a>${item.seeLink ? ` - <a href="${escapeHtml(item.seeLink)}">Démo</a>` : ""}${item.youtubeLink ? ` - <a href="${escapeHtml(item.youtubeLink)}">Vidéo</a>` : ""}</p>
      </article>
    `).join("")}</section>
  `;

  const contact = `
    <h1>${escapeHtml(tx(localeData, "social"))}</h1>
    <p>${escapeHtml(tx(localeData, "contact_intro"))}</p>
    <section><h2>${escapeHtml(tx(localeData, "contact_panel_title"))}</h2><p>${escapeHtml(tx(localeData, "contact_panel_description"))}</p><ul><li>${escapeHtml(tx(localeData, "contact_point_1"))}</li><li>${escapeHtml(tx(localeData, "contact_point_2"))}</li><li>${escapeHtml(tx(localeData, "contact_point_3"))}</li></ul></section>
    <section><h2>${escapeHtml(tx(localeData, "Informations"))}</h2><p>${escapeHtml(tx(localeData, "contact_meta_availability_value"))}</p><p>${escapeHtml(tx(localeData, "contact_meta_response_value"))}</p><p>${escapeHtml(tx(localeData, "contact_meta_location_value"))}</p><p>${escapeHtml(tx(localeData, "contact_meta_rate_value"))}</p><p><a href="mailto:${escapeHtml(portfolio.SITE_PROFILE.email)}">${escapeHtml(portfolio.SITE_PROFILE.email)}</a></p></section>
  `;

  const cv = `
    <h1>${escapeHtml(tx(localeData, "cv"))}</h1>
    <p>${escapeHtml(tx(localeData, "seo_routes.cv_description"))}</p>
    <section><h2>${escapeHtml(portfolio.SITE_PROFILE.displayName)}</h2><p>${escapeHtml(portfolio.SITE_PROFILE.jobTitle)} - ${escapeHtml(tx(localeData, "contact_meta_location_value"))}</p><p>${escapeHtml(tx(localeData, "seo_routes.experience_description"))}</p></section>
    <section><h2>${escapeHtml(tx(localeData, "professional_skills"))}</h2><p>${escapeHtml(skills.join(", "))}</p></section>
    <section><h2>${escapeHtml(tx(localeData, "qualifications_title"))}</h2><ul>${["degree5", "degree1", "degree2", "degree3"].map((key) => `<li>${escapeHtml(tx(localeData, key))}</li>`).join("")}</ul></section>
    <ul><li><a href="/pdf/CV-Guerin-Theo-FR.pdf">CV français</a></li><li><a href="/pdf/CV-Guerin-Theo-EN.pdf">CV anglais</a></li></ul>
  `;

  const legal = buildLegalContent(pathname, localeData);

  const contentByPath = {
    "/": home,
    "/about": about,
    "/experience": experience,
    "/project": project,
    "/contact": contact,
    "/cv": cv,
    "/mentions-legales": legal,
    "/politique-de-confidentialite": legal,
    "/politique-des-cookies": legal,
  };

  return `<div id="seo-prerender">${contentByPath[pathname] || home}</div>`;
}

// Resolve the visible title for legal routes maintained through i18n.
function buildLegalTitle(pathname, localeData) {
  if (pathname === "/mentions-legales") return tx(localeData, "mentions_legales.title");
  if (pathname === "/politique-de-confidentialite") return tx(localeData, "politique_confidentialite.title");
  if (pathname === "/politique-des-cookies") return tx(localeData, "cookie_policy.title");
  return tx(localeData, "portfolio_theo");
}

// Build enough legal-page text for crawlers while still relying on the existing i18n content.
function buildLegalContent(pathname, localeData) {
  if (pathname === "/mentions-legales") {
    const sections = [
      "mentions_legales.editor",
      "mentions_legales.host",
      "mentions_legales.domain",
      "mentions_legales.status",
      "mentions_legales.ip",
      "mentions_legales.privacy",
      "mentions_legales.cookies",
      "mentions_legales.contact",
    ];

    return `
      <h1>${escapeHtml(tx(localeData, "mentions_legales.title"))}</h1>
      ${sections.map((key) => buildLegalSection(localeData, key)).join("")}
    `;
  }

  if (pathname === "/politique-de-confidentialite") {
    const sections = [
      "politique_confidentialite.controller",
      "politique_confidentialite.data",
      "politique_confidentialite.ga4",
      "politique_confidentialite.recipients",
      "politique_confidentialite.rights",
      "politique_confidentialite.security",
      "politique_confidentialite.contact_update",
    ];

    return `
      <h1>${escapeHtml(tx(localeData, "politique_confidentialite.title"))}</h1>
      ${sections.map((key) => buildLegalSection(localeData, key)).join("")}
    `;
  }

  const sections = [
    "cookie_policy.what",
    "cookie_policy.types",
    "cookie_policy.use",
    "cookie_policy.duration",
    "cookie_policy.manage",
    "cookie_policy.update",
  ];

  return `
    <h1>${escapeHtml(tx(localeData, "cookie_policy.title"))}</h1>
    ${sections.map((key) => buildLegalSection(localeData, key)).join("")}
  `;
}

// Render one legal i18n object as a compact HTML section.
function buildLegalSection(localeData, key) {
  const value = key.split(".").reduce((current, segment) => current?.[segment], localeData);
  if (!value || typeof value !== "object") {
    return "";
  }

  const title = typeof value.title === "string" ? value.title : key;
  const paragraphs = Object.entries(value)
    .filter(([name, text]) => name !== "title" && typeof text === "string")
    .map(([, text]) => `<p>${escapeHtml(text)}</p>`)
    .join("");

  return `<section><h2>${escapeHtml(title)}</h2>${paragraphs}</section>`;
}

// Build SEO head tags for the static HTML; React Helmet keeps the browser runtime aligned after hydration.
function buildHead({ pathname, canonicalUrl, title, description, structuredData, localeData, routeSeo, seoConfig, portfolio }) {
  const imageUrl = getPreviewImageUrl(portfolio.SITE_PROFILE);
  const isNoindex = routeSeo[pathname]?.noindex ?? false;
  const robots = isNoindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const alternates = isNoindex ? [] : seoConfig.getLanguageAlternates(SITE_URL, pathname);

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(portfolio.SITE_PROFILE.displayName)}" />
  <meta name="robots" content="${escapeHtml(robots)}" />
  <meta name="googlebot" content="${escapeHtml(robots)}" />
  <meta name="bingbot" content="${escapeHtml(robots)}" />
  <meta name="geo.region" content="${escapeHtml(portfolio.SITE_PROFILE.regionCode)}" />
  <meta name="geo.placename" content="${escapeHtml(portfolio.SITE_PROFILE.city)}" />
  <meta name="geo.position" content="${escapeHtml(portfolio.SITE_PROFILE.geoPosition)}" />
  <meta name="ICBM" content="${escapeHtml(portfolio.SITE_PROFILE.geoICBM)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <link rel="alternate" type="text/markdown" href="${SITE_URL}/llms.txt" />
  <link rel="alternate" type="text/markdown" href="${SITE_URL}/profile.md" />
  <link rel="alternate" type="text/markdown" href="${SITE_URL}/projects.md" />
  ${alternates.map((alternate) => `<link rel="alternate" href="${escapeHtml(alternate.href)}" hreflang="${escapeHtml(alternate.hrefLang)}" />`).join("\n  ")}
  ${isNoindex ? "" : `<link rel="alternate" href="${SITE_URL}${seoConfig.getLocalizedPath("fr", pathname)}" hreflang="x-default" />`}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(`Portfolio de ${portfolio.SITE_PROFILE.displayName}`)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content="${escapeHtml(tx(localeData, "seo_og_image_alt", "Aperçu du portfolio de Théo Guérin"))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${escapeHtml(portfolio.SITE_PROFILE.twitterHandle)}" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  <script type="application/ld+json">${escapeJsonScript(structuredData)}</script>`;
}

// Remove SEO tags from Vite's generic index before injecting route-specific metadata.
function stripGeneratedHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']author["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']googlebot["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']bingbot["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']geo\.[^"']+["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']ICBM["'][\s\S]*?>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, "")
    .replace(/<link\s+rel=["']alternate["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][\s\S]*?>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][\s\S]*?>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");
}

// Inject route-specific head and body content into the built Vite HTML shell.
function injectHtml({ template, head, content, htmlLang }) {
  return stripGeneratedHead(template)
    .replace(/<html\s+lang=["'][^"']+["']/i, `<html lang="${escapeHtml(htmlLang)}"`)
    .replace("<head>", "<head>")
    .replace("</head>", `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

// Map a public route to the static files hosts can serve with and without a trailing slash.
function htmlOutputPaths(routePath) {
  if (routePath === "/") {
    return [INDEX_HTML_PATH];
  }

  const relativePath = routePath.replace(/^\//, "");
  return [
    path.join(DIST_DIR, `${relativePath}.html`),
    path.join(DIST_DIR, relativePath, "index.html"),
  ];
}

// Write generated files after creating their parent directories.
function writeFileEnsured(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, "utf8");
}

// Read JSON files that may contain a UTF-8 BOM.
function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

// Load all i18n dictionaries needed by localized prerendered routes.
function readLocales(locales) {
  return Object.fromEntries(
    locales.map((locale) => [locale, readJsonFile(path.join(LOCALES_DIR, `${locale}.json`))]),
  );
}

// Generate concise Markdown resources for LLM crawlers from the same portfolio data.
function buildMarkdownFiles({ localeData, portfolio }) {
  const projects = getSortedProjects(portfolio.PORTFOLIO_PROJECTS);
  const experiences = getExperiences(localeData);
  const profileMarkdown = `# ${portfolio.SITE_PROFILE.displayName}

> ${portfolio.SITE_PROFILE.jobTitle} basé à ${portfolio.SITE_PROFILE.city}, France.

## Profil

${tx(localeData, "seo_description")}

${tx(localeData, "greeting")} ${portfolio.SITE_PROFILE.displayName} ${tx(localeData, "from")} ${tx(localeData, "rennes")}. ${tx(localeData, "current_position1")} ${tx(localeData, "developperAge")}${tx(localeData, "current_position2")} ${tx(localeData, "firstmaster")}${tx(localeData, "current_position3")}

## Compétences principales

${portfolio.PROFESSIONAL_TOPICS.map((skill) => `- ${skill}`).join("\n")}

## Formation

${["degree5", "degree1", "degree2", "degree3", "degree4"].map((key) => `- ${tx(localeData, key)}`).join("\n")}

## Contact professionnel

- Email : ${portfolio.SITE_PROFILE.email}
- GitHub : ${portfolio.SOCIAL_LINKS.github}
- GitLab : ${portfolio.SOCIAL_LINKS.gitlab}
- LinkedIn : ${portfolio.SOCIAL_LINKS.linkedin}
`;

  const experienceMarkdown = `# Expériences - ${portfolio.SITE_PROFILE.displayName}

${experiences.map((item) => `## ${stripMarkdownUnsafe(item.title)}

- Période : ${stripMarkdownUnsafe(item.date)}
${item.subtitle ? `- Organisation : ${stripMarkdownUnsafe(item.subtitle)}\n` : ""}${item.diplome ? `- Diplôme : ${stripMarkdownUnsafe(item.diplome)}\n` : ""}${item.description ? `\n${stripMarkdownUnsafe(item.description)}\n` : ""}${item.highlights?.length ? `\n${item.highlights.map((highlight) => `- ${stripMarkdownUnsafe(highlight)}`).join("\n")}\n` : ""}${item.stack ? `\nStack : ${stripMarkdownUnsafe(item.stack)}\n` : ""}`).join("\n")}
`;

  const projectsMarkdown = `# Projets - ${portfolio.SITE_PROFILE.displayName}

${projects.map((project) => `## ${stripMarkdownUnsafe(projectTitle(project, localeData))}

${stripMarkdownUnsafe(projectDescription(project, localeData))}

- Catégorie : ${project.category}
- Technologies : ${project.techStack.join(", ")}
- Code : ${project.ghLink}
${project.seeLink ? `- Démo : ${project.seeLink}\n` : ""}${project.youtubeLink ? `- Vidéo : ${project.youtubeLink}\n` : ""}`).join("\n")}
`;

  const contactMarkdown = `# Contact - ${portfolio.SITE_PROFILE.displayName}

${tx(localeData, "contact_intro")}

- Email : ${portfolio.SITE_PROFILE.email}
- LinkedIn : ${portfolio.SOCIAL_LINKS.linkedin}
- GitHub : ${portfolio.SOCIAL_LINKS.github}
- Localisation : ${tx(localeData, "contact_meta_location_value")}
- Disponibilité : ${tx(localeData, "contact_meta_availability_value")}
- TJM indicatif : ${tx(localeData, "contact_meta_rate_value")}
`;

  return {
    "profile.md": profileMarkdown,
    "index.md": profileMarkdown,
    "about.md": profileMarkdown,
    "experience.md": experienceMarkdown,
    "projects.md": projectsMarkdown,
    "contact.md": contactMarkdown,
  };
}

// Generate the main llms.txt entry point that links to canonical pages and Markdown resources.
function buildLlmsTxt({ portfolio }) {
  return `# ${portfolio.SITE_PROFILE.displayName}

> Portfolio professionnel de ${portfolio.SITE_PROFILE.displayName}, ${portfolio.SITE_PROFILE.jobTitle} français basé à ${portfolio.SITE_PROFILE.city}.

Ce site présente son profil professionnel, ses compétences techniques, ses expériences et une sélection de projets de développement web.

## Profil

- [Portfolio](${SITE_URL}/): présentation générale.
- [À propos](${SITE_URL}/about): parcours et profil professionnel.
- [Expériences](${SITE_URL}/experience): expériences professionnelles et formation.
- [Projets](${SITE_URL}/project): sélection de projets réalisés.
- [Contact](${SITE_URL}/contact): contact professionnel.

## Ressources pour les LLM

- [Profil](${SITE_URL}/profile.md): version texte du profil, des compétences et de la formation.
- [Expériences](${SITE_URL}/experience.md): version texte du parcours.
- [Projets](${SITE_URL}/projects.md): version texte des projets.
- [Contact](${SITE_URL}/contact.md): version texte des informations de contact publiques.

## Liens officiels

- GitHub : ${portfolio.SOCIAL_LINKS.github}
- GitLab : ${portfolio.SOCIAL_LINKS.gitlab}
- LinkedIn : ${portfolio.SOCIAL_LINKS.linkedin}
`;
}

// Generate route HTML, Markdown resources, and llms.txt after Vite has produced dist/index.html.
function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error("dist/index.html introuvable. Lancez vite build avant seo-static.");
  }

  const seoConfig = loadTsModule(SEO_CONFIG_PATH);
  const portfolio = loadTsModule(PORTFOLIO_DATA_PATH);
  const locales = readLocales(seoConfig.SUPPORTED_LOCALES);
  const fallbackLocaleData = locales[seoConfig.DEFAULT_LOCALE];
  const template = fs.readFileSync(INDEX_HTML_PATH, "utf8");
  const routePaths = Object.entries(seoConfig.ROUTE_SEO)
    .filter(([, config]) => !config.noindex)
    .map(([pathname]) => pathname);
  const outputRoutes = new Set([
    ...routePaths,
    ...seoConfig.SUPPORTED_LOCALES.flatMap((locale) => routePaths.map((pathname) => seoConfig.getLocalizedPath(locale, pathname))),
  ]);

  for (const routePath of outputRoutes) {
    const localized = seoConfig.splitLocalizedPath(routePath);
    const pathname = seoConfig.normalizePath(localized.pathname);
    const locale = localized.locale ?? seoConfig.DEFAULT_LOCALE;
    const contentLocale = seoConfig.getContentLocale(locale, pathname);
    const htmlLang = seoConfig.getHtmlLang(contentLocale);
    const localeData = locales[contentLocale] ?? fallbackLocaleData;
    const canonicalPath = seoConfig.getCanonicalPath(locale, pathname);
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const title = buildTitle({ pathname, routeSeo: seoConfig.ROUTE_SEO, localeData });
    const description = buildDescription({ pathname, routeSeo: seoConfig.ROUTE_SEO, localeData });
    const structuredData = buildStructuredData({
      pathname,
      canonicalUrl,
      title,
      description,
      htmlLang,
      localeData,
      portfolio,
      routeSchemaType: seoConfig.ROUTE_SCHEMA_TYPE,
    });
    const head = buildHead({
      pathname,
      canonicalUrl,
      title,
      description,
      structuredData,
      localeData,
      routeSeo: seoConfig.ROUTE_SEO,
      seoConfig,
      portfolio,
    });
    const content = buildRouteContent({ pathname, localeData, portfolio });
    const routeHtml = injectHtml({ template, head, content, htmlLang });
    for (const outputPath of htmlOutputPaths(routePath)) {
      writeFileEnsured(outputPath, routeHtml);
    }
  }

  const markdownFiles = buildMarkdownFiles({ localeData: fallbackLocaleData, portfolio });
  for (const [filename, markdown] of Object.entries(markdownFiles)) {
    writeFileEnsured(path.join(PUBLIC_DIR, filename), markdown);
    writeFileEnsured(path.join(DIST_DIR, filename), markdown);
  }

  const llmsTxt = buildLlmsTxt({ portfolio });
  writeFileEnsured(path.join(PUBLIC_DIR, "llms.txt"), llmsTxt);
  writeFileEnsured(path.join(DIST_DIR, "llms.txt"), llmsTxt);
  console.log(`Generated static SEO HTML for ${outputRoutes.size} routes and ${Object.keys(markdownFiles).length} Markdown files.`);
}

main();
