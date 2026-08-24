import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const ROOT_DIR = process.cwd();
const SEO_CONFIG_PATH = path.join(ROOT_DIR, "src", "config", "seo.ts");
const SITEMAP_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");
const DEFAULT_SITE_URL = "https://theo-guerin.fr";
const LASTMOD = new Date().toISOString().slice(0, 10);

const ROUTE_SITEMAP_META = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/project": { changefreq: "monthly", priority: "0.9" },
  default: { changefreq: "monthly", priority: "0.8" },
  legal: { changefreq: "yearly", priority: "0.4" },
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readSeoConfig() {
  const source = fs.readFileSync(SEO_CONFIG_PATH, "utf8");
  // The app config is TypeScript; transpiling it here keeps the sitemap source of truth in one place.
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

  vm.runInNewContext(output, sandbox, { filename: SEO_CONFIG_PATH });
  return sandbox.exports;
}

function getRouteMeta(pathname) {
  // Keep crawl hints conservative: portfolio pages move more often than legal pages.
  if (pathname.startsWith("/mentions-") || pathname.startsWith("/politique-")) {
    return ROUTE_SITEMAP_META.legal;
  }

  return ROUTE_SITEMAP_META[pathname] ?? ROUTE_SITEMAP_META.default;
}

function buildSitemap({ routes, getIndexableLocales, getLocalizedPath, getHtmlLang, siteUrl }) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const pathname of routes) {
    const meta = getRouteMeta(pathname);

    const indexableLocales = getIndexableLocales(pathname);

    for (const locale of indexableLocales) {
      const localizedPath = getLocalizedPath(locale, pathname);
      lines.push("  <url>");
      lines.push(`    <loc>${escapeXml(`${siteUrl}${localizedPath}`)}</loc>`);

      // Each localized URL advertises the full cluster of language alternatives.
      for (const alternateLocale of indexableLocales) {
        const alternatePath = getLocalizedPath(alternateLocale, pathname);
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(getHtmlLang(alternateLocale))}" href="${escapeXml(
            `${siteUrl}${alternatePath}`,
          )}" />`,
        );
      }

      lines.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}${getLocalizedPath("fr", pathname)}`)}" />`,
      );
      lines.push(`    <lastmod>${LASTMOD}</lastmod>`);
      lines.push(`    <changefreq>${meta.changefreq}</changefreq>`);
      lines.push(`    <priority>${meta.priority}</priority>`);
      lines.push("  </url>");
    }
  }

  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

function main() {
  const { ROUTE_SEO, getHtmlLang, getIndexableLocales, getLocalizedPath } = readSeoConfig();
  const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const routes = Object.entries(ROUTE_SEO)
    .filter(([, config]) => !config.noindex)
    .map(([pathname]) => pathname);

  const sitemap = buildSitemap({
    routes,
    getIndexableLocales,
    getLocalizedPath,
    getHtmlLang,
    siteUrl,
  });

  fs.writeFileSync(SITEMAP_PATH, sitemap, "utf8");
  const urlCount = routes.reduce((count, pathname) => count + getIndexableLocales(pathname).length, 0);
  console.log(`Generated ${path.relative(ROOT_DIR, SITEMAP_PATH)} with ${urlCount} URLs.`);
}

main();
