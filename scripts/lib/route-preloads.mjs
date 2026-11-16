const routeEntries = {
  "/about": "about/pages/About",
  "/contact": "contact/pages/Contact",
  "/project": "projects/pages/Projects",
  "/cv": "resume/pages/Resume",
  "/experience": "experience/pages/ExperienceTimeline",
  "/mentions-legales": "legal/pages/MentionsLegales",
  "/politique-de-confidentialite": "legal/pages/PolitiqueConfidentialite",
  "/politique-des-cookies": "legal/pages/PolitiqueCookies",
  "/realisations/a-table": "case-studies/pages/ATable",
  "/realisations/la-maree-malouine": "case-studies/pages/LaMareeMalouine",
  "/realisations/les-portes-de-montafilan": "case-studies/pages/LesPortesDeMontafilan",
};

export function resolveRouteEntry(manifest, source) {
  if (manifest[source]) return source;
  // Rollup peut fusionner la façade d'une route avec ses exports partagés.
  // Son nom reste dans les imports dynamiques du point d'entrée principal.
  const name = source.split("/").at(-1).replace(/\.tsx$/, "");
  const candidates = (manifest["index.html"]?.dynamicImports ?? []).filter((key) =>
    manifest[key]?.isDynamicEntry && manifest[key].name === name);
  if (candidates.length === 1) return candidates[0];
  throw new Error(`Entrée Vite introuvable : ${source}`);
}

// Suit seulement les imports immédiats : les animations et outils différés le restent.
export function buildRoutePreloads(manifest, pathname, locale) {
  const seen = new Set();
  const files = new Set();
  const links = [];
  function visit(key, emit) {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) throw new Error(`Entrée Vite introuvable : ${key}`);
    for (const dependency of chunk.imports ?? []) visit(dependency, emit);
    for (const css of chunk.css ?? []) {
      if (!files.has(css) && emit) links.push(`<link rel="preload" as="style" crossorigin href="/${css}">`);
      files.add(css);
    }
    if (!files.has(chunk.file) && emit) links.push(`<link rel="modulepreload" crossorigin href="/${chunk.file}">`);
    files.add(chunk.file);
  }
  // Le modèle HTML annonce déjà le point d'entrée et ses dépendances.
  visit("index.html", false);
  if (pathname !== "/") {
    const entry = pathname.startsWith("/services/") ? "business/pages/BusinessPage" : routeEntries[pathname];
    if (!entry) throw new Error(`Préchargement non défini pour la route : ${pathname}`);
    visit(resolveRouteEntry(manifest, `src/features/${entry}.tsx`), true);
  }
  if (locale === "bzh") visit("src/locales/bzh.json", true);
  return links.join("\n");
}
