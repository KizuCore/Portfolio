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

for (const file of scripts) {
  const map = JSON.parse(fs.readFileSync(path.join(dist, `${file}.map`), "utf8"));
  const deferredSources = map.sources.filter((source) =>
    /node_modules\/(?:react-pdf|pdfjs-dist|@tsparticles|tsparticles|react-github-calendar|react-tooltip)\//.test(source)
    || /src\/components\/(?:About|Resume|Contact|CaseStudies)\//.test(source)
  );
  assert.equal(deferredSources.length, 0, `Code différé chargé à l’accueil dans ${file} : ${deferredSources.join(", ")}`);
}

for (const file of styles) {
  const css = fs.readFileSync(path.join(dist, file), "utf8");
  assert(!css.includes(".react-pdf__"), `Styles PDF chargés à l’accueil : ${file}`);
  assert(!/font-display\s*:\s*(block|auto)/.test(css), `Police bloquant le texte : ${file}`);
}

const gzipBytes = (files) => [...files].reduce((size, file) =>
  size + gzipSync(fs.readFileSync(path.join(dist, file))).length, 0);
const jsBytes = gzipBytes(scripts);
const cssBytes = gzipBytes(styles);
// Budgets avec une marge pour les évolutions normales, sous les poids précédents (~511/62 Kio).
assert(jsBytes < 280 * 1024, `JavaScript initial trop lourd : ${jsBytes} octets gzip`);
assert(cssBytes < 45 * 1024, `CSS initial trop lourd : ${cssBytes} octets gzip`);
console.log(`Accueil : ${(jsBytes / 1024).toFixed(1)} Kio JS, ${(cssBytes / 1024).toFixed(1)} Kio CSS (gzip). Dépendances différées : OK.`);
