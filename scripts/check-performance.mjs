import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

// À exécuter après le build : protège le chargement initial contre le retour des
// dépendances lourdes, y compris lorsqu’un regroupement manuel change leur nom.
const dist = path.resolve("dist");
const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite/manifest.json"), "utf8"));
const visited = new Set();
const scripts = new Set();
const styles = new Set();

function visit(key) {
  if (visited.has(key)) return;
  visited.add(key);
  const chunk = manifest[key];
  assert(chunk, `Module absent du manifeste : ${key}`);
  scripts.add(chunk.file);
  for (const css of chunk.css ?? []) styles.add(css);
  // Les imports dynamiques ne doivent pas être téléchargés à l’ouverture de l’accueil.
  for (const dependency of chunk.imports ?? []) visit(dependency);
}

visit("index.html");

// Même différé, le moteur complet bloquerait à nouveau le démarrage sur ordinateur.
for (const chunk of Object.values(manifest)) {
  if (!chunk.file.endsWith(".js")) continue;
  const map = JSON.parse(fs.readFileSync(path.join(dist, `${chunk.file}.map`), "utf8"));
  assert(!map.sources.some((source) => /node_modules\/(?:tsparticles|@tsparticles\/slim)\//.test(source)),
    `Moteur de particules complet réintroduit : ${chunk.file}`);
}

for (const file of scripts) {
  const map = JSON.parse(fs.readFileSync(path.join(dist, `${file}.map`), "utf8"));
  const deferredSources = map.sources.filter((source) =>
    /node_modules\/(?:react-pdf|pdfjs-dist|@tsparticles|tsparticles|react-github-calendar|react-tooltip|react-countup|countup.js)\//.test(source)
    || /src\/components\/(?:About|Resume|Contact|CaseStudies)\//.test(source)
    || /src\/locales\/bzh\.json$/.test(source)
  );
  assert.equal(deferredSources.length, 0, `Code différé chargé à l’accueil dans ${file} : ${deferredSources.join(", ")}`);
}

for (const file of styles) {
  const css = fs.readFileSync(path.join(dist, file), "utf8");
  assert(!css.includes(".react-pdf__"), `Styles PDF chargés à l’accueil : ${file}`);
  assert(!css.includes(".form-control"), `Styles du formulaire chargés à l’accueil : ${file}`);
  assert(!css.includes(".business-detail"), `Styles des pages de services chargés à l’accueil : ${file}`);
  assert(!/font-display\s*:\s*(block|auto)/.test(css), `Police bloquant le texte : ${file}`);
}

const gzipBytes = (files) => [...files].reduce((size, file) =>
  size + gzipSync(fs.readFileSync(path.join(dist, file))).length, 0);
const jsBytes = gzipBytes(scripts);
const cssBytes = gzipBytes(styles);
// Marge au-dessus des poids mesurés (~191 Kio JS / 26 Kio CSS).
assert(jsBytes < 230 * 1024, `JavaScript initial trop lourd : ${jsBytes} octets gzip`);
assert(cssBytes < 30 * 1024, `CSS initial trop lourd : ${cssBytes} octets gzip`);
console.log(`Accueil : ${(jsBytes / 1024).toFixed(1)} Kio JS, ${(cssBytes / 1024).toFixed(1)} Kio CSS (gzip). Dépendances différées : OK.`);
