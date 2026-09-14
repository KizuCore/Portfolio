import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const SEO_CONFIG_PATH = path.join(ROOT_DIR, "src", "config", "seo.ts");
const SITE_URL = (process.env.VITE_SITE_URL || "https://theo-guerin.fr").replace(/\/+$/, "");
const PERSON_ID = `${SITE_URL}/#person`;
const DISTINCT_PAGE_ROUTES = new Set(["/", "/about", "/experience", "/project", "/contact", "/cv"]);
const ROBOTS_TXT_PATH = path.join(DIST_DIR, "robots.txt");
const MARKDOWN_RESOURCE_FILES = [
  "llms.txt",
  "llms-fr.txt",
  "llms-en.txt",
  "profile.md",
  "projects.md",
  "experience.md",
  "contact.md",
];

// Charge la configuration SEO TypeScript commune à l’application et au générateur de prérendu.
function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const sandbox = {
    require: createRequire(filePath),
    exports: {},
    module: { exports: {} },
  };
  sandbox.module.exports = sandbox.exports;
  vm.runInNewContext(output, sandbox, { filename: filePath });
  return sandbox.exports;
}

// Reconstitue exactement les routes générées par scripts/seo-static.mjs.
function getGeneratedRoutes(seoConfig) {
  const routePaths = Object.entries(seoConfig.ROUTE_SEO)
    .filter(([, config]) => !config.noindex)
    .map(([pathname]) => pathname);

  return [
    ...new Set([
      ...routePaths,
      ...seoConfig.SUPPORTED_LOCALES.flatMap((locale) =>
        routePaths.map((pathname) => seoConfig.getLocalizedPath(locale, pathname)),
      ),
    ]),
  ];
}

// Détermine le fichier HTML principal d’une route publique sans barre oblique finale.
function htmlPath(routePath) {
  if (routePath === "/") {
    return path.join(DIST_DIR, "index.html");
  }

  return path.join(DIST_DIR, `${routePath.replace(/^\//, "")}.html`);
}

// Détermine le fichier index avec barre oblique finale pour les hébergeurs statiques utilisant des index de répertoire.
function trailingSlashHtmlPath(routePath) {
  if (routePath === "/") {
    return path.join(DIST_DIR, "index.html");
  }

  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

// Extrait le texte lisible du corps HTML pour détecter les prérendus vides ou limités à la structure de page.
function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Lit le premier titre de document dans un fichier HTML généré.
function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
}

// Lit la valeur de html lang reçue par les robots avant l’exécution de JavaScript.
function getHtmlLang(html) {
  return html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i)?.[1]?.trim() || "";
}

// Lit la métadescription de la route dans le HTML généré.
function getMetaDescription(html) {
  return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
}

// Lit l’URL canonique dans le HTML généré.
function getCanonical(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
}

// Lit le premier H1 visible dans le contenu prérendu.
function getH1(html) {
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
}

// Récupère les variantes hreflang du HTML généré.
function getHreflangs(html) {
  return [...html.matchAll(/<link\s+rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*hreflang=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => ({ href: match[1], hrefLang: match[2] }));
}

// Analyse chaque bloc JSON-LD et signale les données structurées invalides.
function getStructuredData(html) {
  return [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`JSON-LD invalide: ${error.message}`);
    }
  });
}

// Aplatit les blocs Schema.org @graph pour que les vérifications puissent rechercher directement les entités.
function flattenGraph(jsonLdBlocks) {
  return jsonLdBlocks.flatMap((block) => {
    if (Array.isArray(block?.["@graph"])) {
      return block["@graph"];
    }

    return [block];
  });
}

// Ajoute une erreur lisible lorsqu’une condition n’est pas remplie.
function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

// Garde robots.txt compatible avec les analyseurs stricts comme Lighthouse.
function validateRobotsTxt(errors) {
  assert(fs.existsSync(ROBOTS_TXT_PATH), "robots.txt: fichier manquant dans dist", errors);
  if (!fs.existsSync(ROBOTS_TXT_PATH)) {
    return;
  }

  const bytes = fs.readFileSync(ROBOTS_TXT_PATH);
  const contents = bytes.toString("utf8");
  const hasUtf8Bom = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;

  assert(!hasUtf8Bom, "robots.txt: BOM UTF-8 interdit avant User-agent", errors);
  assert(contents.startsWith("User-agent: *"), "robots.txt: doit commencer par User-agent: *", errors);
  assert(contents.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt: sitemap canonique manquant", errors);
}

// llms.txt et les fichiers Markdown associés doivent avoir un véritable titre Markdown et aucun marqueur BOM.
function validateMarkdownResources(errors) {
  for (const markdownFile of MARKDOWN_RESOURCE_FILES) {
    const filePath = path.join(DIST_DIR, markdownFile);
    assert(fs.existsSync(filePath), `${markdownFile}: fichier Markdown/LLM manquant dans dist`, errors);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const bytes = fs.readFileSync(filePath);
    const contents = bytes.toString("utf8");
    const hasUtf8Bom = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;

    assert(!hasUtf8Bom, `${markdownFile}: BOM UTF-8 interdit avant le H1`, errors);
    assert(contents.startsWith("# "), `${markdownFile}: doit commencer par un H1 Markdown`, errors);
    assert(contents.trim().length > 120, `${markdownFile}: contenu trop court`, errors);
  }
}

// Calcule l’URL canonique attendue pour une route générée.
function expectedCanonical(routePath, seoConfig) {
  const localized = seoConfig.splitLocalizedPath(routePath);
  const pathname = seoConfig.normalizePath(localized.pathname);
  const locale = localized.locale ?? seoConfig.DEFAULT_LOCALE;
  return `${SITE_URL}${seoConfig.getCanonicalPath(locale, pathname)}`;
}

// Calcule la langue HTML attendue, y compris les langues de repli des pages juridiques.
function expectedHtmlLang(routePath, seoConfig) {
  const localized = seoConfig.splitLocalizedPath(routePath);
  const pathname = seoConfig.normalizePath(localized.pathname);
  const locale = localized.locale ?? seoConfig.DEFAULT_LOCALE;
  return seoConfig.getHtmlLang(seoConfig.getContentLocale(locale, pathname));
}

// Vérifie que chaque route traduite annonce un ensemble complet et correct de variantes hreflang canoniques.
function validateHreflangs({ routePath, html, seoConfig, errors }) {
  const localized = seoConfig.splitLocalizedPath(routePath);
  const pathname = seoConfig.normalizePath(localized.pathname);
  const alternates = getHreflangs(html);

  for (const locale of seoConfig.getIndexableLocales(pathname)) {
    const expectedHrefLang = seoConfig.getHtmlLang(locale);
    const expectedHref = `${SITE_URL}${seoConfig.getLocalizedPath(locale, pathname)}`;
    const match = alternates.find((alternate) => alternate.hrefLang === expectedHrefLang);
    assert(match, `${routePath}: hreflang ${expectedHrefLang} manquant`, errors);
    assert(match?.href === expectedHref, `${routePath}: hreflang ${expectedHrefLang} pointe vers ${match?.href || "rien"} au lieu de ${expectedHref}`, errors);
  }

  const xDefault = alternates.find((alternate) => alternate.hrefLang === "x-default");
  const expectedDefault = `${SITE_URL}${seoConfig.getLocalizedPath(seoConfig.DEFAULT_LOCALE, pathname)}`;
  assert(xDefault, `${routePath}: hreflang x-default manquant`, errors);
  assert(xDefault?.href === expectedDefault, `${routePath}: x-default pointe vers ${xDefault?.href || "rien"} au lieu de ${expectedDefault}`, errors);
}

// Valide toutes les routes indexables générées ainsi que les ressources Markdown destinées aux modèles de langage.
function main() {
  const seoConfig = loadTsModule(SEO_CONFIG_PATH);
  const { BUSINESS_PAGES, getBusinessPage } = loadTsModule(path.join(ROOT_DIR, "src", "data", "businessPages.ts"));
  const routes = getGeneratedRoutes(seoConfig);
  const errors = [];
  const titles = new Map();
  const descriptions = new Map();

  validateRobotsTxt(errors);
  validateMarkdownResources(errors);

  for (const routePath of routes) {
    const filePath = htmlPath(routePath);
    assert(fs.existsSync(filePath), `${routePath}: HTML prérendu manquant (${filePath})`, errors);
    const trailingPath = trailingSlashHtmlPath(routePath);
    assert(fs.existsSync(trailingPath), `${routePath}/: HTML prérendu trailing slash manquant (${trailingPath})`, errors);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const html = fs.readFileSync(filePath, "utf8");
    const title = getTitle(html);
    const description = getMetaDescription(html);
    const canonical = getCanonical(html);
    const htmlLang = getHtmlLang(html);
    const h1 = getH1(html);
    const bodyText = textContent(html);
    const expectedCanonicalUrl = expectedCanonical(routePath, seoConfig);
    const expectedLang = expectedHtmlLang(routePath, seoConfig);
    let jsonLdBlocks = [];

    try {
      jsonLdBlocks = getStructuredData(html);
    } catch (error) {
      errors.push(`${routePath}: ${error.message}`);
    }

    const graph = flattenGraph(jsonLdBlocks);
    const person = graph.find((node) => node?.["@type"] === "Person");
    const webPage = graph.find((node) => String(node?.["@id"] || "").endsWith("#webpage"));
    // Détecte les régressions où une nouvelle route reçoit par erreur le contenu générique de l’accueil.
    const localizedRoute = seoConfig.splitLocalizedPath(routePath);
    const businessLocale = seoConfig.getContentLocale(localizedRoute.locale ?? "fr", localizedRoute.pathname);
    const businessPage = getBusinessPage(localizedRoute.pathname, businessLocale);
    if (businessPage) {
      assert(h1 === businessPage.title, `${routePath}: titre éditorial absent du HTML`, errors);
      for (const section of businessPage.sections) {
        assert(bodyText.includes(section.text), `${routePath}: contenu de section absent (${section.title})`, errors);
        for (const item of section.items ?? []) {
          assert(bodyText.includes(item), `${routePath}: élément de section absent (${section.title})`, errors);
        }
      }
      for (const item of businessPage.questions) {
        assert(bodyText.includes(item.question) && bodyText.includes(item.answer), `${routePath}: question ou réponse absente`, errors);
      }
      for (const related of BUSINESS_PAGES.filter((page) => page.path !== businessPage.path)) {
        assert(html.includes(`href="/${related.kind === "case-study" ? businessLocale : "fr"}${related.path}"`), `${routePath}: lien connexe manquant`, errors);
      }
      assert(graph.some((node) => node["@type"] === "BreadcrumbList"), `${routePath}: fil d’Ariane JSON-LD absent`, errors);
      if (businessPage.kind === "service") {
        const service = graph.find((node) => node["@type"] === "Service");
        assert(service?.provider?.["@id"] === PERSON_ID, `${routePath}: prestataire du service incorrect`, errors);
      }
    }

    assert(title, `${routePath}: <title> manquant`, errors);
    assert(description, `${routePath}: meta description manquante`, errors);
    assert(canonical, `${routePath}: canonical manquant`, errors);
    assert(canonical === expectedCanonicalUrl, `${routePath}: canonical ${canonical} au lieu de ${expectedCanonicalUrl}`, errors);
    assert(htmlLang === expectedLang, `${routePath}: html lang ${htmlLang || "absent"} au lieu de ${expectedLang}`, errors);
    assert(h1, `${routePath}: H1 manquant`, errors);
    assert(bodyText.length > 450, `${routePath}: HTML prérendu trop pauvre (${bodyText.length} caractères)`, errors);
    assert(jsonLdBlocks.length > 0, `${routePath}: JSON-LD manquant`, errors);
    assert(person?.["@id"] === PERSON_ID, `${routePath}: Person @id incorrect ou absent`, errors);
    assert(webPage?.url === canonical, `${routePath}: WebPage JSON-LD url incorrecte`, errors);
    assert(webPage?.inLanguage === expectedLang, `${routePath}: WebPage JSON-LD inLanguage incorrect`, errors);
    for (const profilePage of graph.filter((node) => node?.["@type"] === "ProfilePage")) {
      assert(
        profilePage.mainEntity?.["@id"] === PERSON_ID,
        `${routePath}: ProfilePage JSON-LD mainEntity manquant ou incorrect`,
        errors,
      );
    }
    validateHreflangs({ routePath, html, seoConfig, errors });

    if (DISTINCT_PAGE_ROUTES.has(routePath)) {
      if (titles.has(title)) {
        errors.push(`${routePath}: title dupliqué avec ${titles.get(title)} (${title})`);
      } else {
        titles.set(title, routePath);
      }

      if (descriptions.has(description)) {
        errors.push(`${routePath}: description dupliquée avec ${descriptions.get(description)}`);
      } else {
        descriptions.set(description, routePath);
      }
    }
  }

  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }

  console.log(`SEO check passed for ${routes.length} generated prerendered routes.`);
}

main();
