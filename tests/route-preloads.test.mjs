import test from "node:test";
import assert from "node:assert/strict";
import { buildRoutePreloads } from "../scripts/lib/route-preloads.mjs";

const manifest = {
  "index.html": { file: "assets/main.js", imports: ["react"], css: ["assets/main.css"] },
  react: { file: "assets/react.js" },
  "src/components/About/About.tsx": {
    file: "assets/about.js",
    imports: ["react", "shared"],
    dynamicImports: ["solar"],
    css: ["assets/about.css", "assets/shared.css"],
  },
  shared: { file: "assets/shared.js", css: ["assets/shared.css"], imports: ["react"] },
  solar: { file: "assets/solar.js" },
  "src/locales/bzh.json": { file: "assets/bzh.js" },
};

test("une route annonce ses dépendances sans télécharger les composants différés ni les fichiers déjà annoncés", () => {
  const links = buildRoutePreloads(manifest, "/about", "fr");
  for (const name of ["about.js", "about.css", "shared.js", "shared.css"]) {
    assert.equal(links.split(name).length - 1, 1);
  }
  for (const name of ["react.js", "main.js", "main.css", "solar.js", "bzh.js"]) assert.ok(!links.includes(name));
  assert.match(links, /rel="preload" as="style" crossorigin/);
});

test("l'accueil ne précharge aucune autre page et le breton reste propre à sa langue", () => {
  assert.equal(buildRoutePreloads(manifest, "/", "fr"), "");
  assert.equal(buildRoutePreloads(manifest, "/", "en"), "");
  assert.match(buildRoutePreloads(manifest, "/", "bzh"), /assets\/bzh.js/);
});

test("un renommage de composant ou une nouvelle route oubliée fait échouer la génération", () => {
  assert.throws(() => buildRoutePreloads(manifest, "/contact", "fr"), /Entrée Vite introuvable/);
  assert.throws(() => buildRoutePreloads(manifest, "/inconnue", "fr"), /Préchargement non défini/);
});

test("une façade fusionnée conserve les préchargements propres à la route", () => {
  const merged = structuredClone(manifest);
  const about = merged["src/components/About/About.tsx"];
  delete merged["src/components/About/About.tsx"];
  merged["_About-123.js"] = { ...about, name: "About", isDynamicEntry: true };
  merged["index.html"].dynamicImports = ["_About-123.js"];
  assert.equal(buildRoutePreloads(merged, "/about", "fr"), buildRoutePreloads(manifest, "/about", "fr"));
});
