const routeEntries = {
  "/about": "About/About",
  "/contact": "Contact/Contact",
  "/project": "Projects/Projects",
  "/cv": "Resume/Resume",
  "/experience": "Experience/ExperienceTimeline",
  "/mentions-legales": "Legal/MentionsLegales",
  "/politique-de-confidentialite": "Legal/PolitiqueConfidentialite",
  "/politique-des-cookies": "Legal/PolitiqueCookies",
  "/realisations/a-table": "CaseStudies/ATable",
  "/realisations/la-maree-malouine": "CaseStudies/LaMareeMalouine",
  "/realisations/les-portes-de-montafilan": "CaseStudies/LesPortesDeMontafilan",
};

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
    const entry = pathname.startsWith("/services/") ? "Business/BusinessPage" : routeEntries[pathname];
    if (!entry) throw new Error(`Préchargement non défini pour la route : ${pathname}`);
    visit(`src/components/${entry}.tsx`, true);
  }
  if (locale === "bzh") visit("src/locales/bzh.json", true);
  return links.join("\n");
}
