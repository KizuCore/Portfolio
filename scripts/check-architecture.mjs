import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const normalize = (file) => file.replaceAll("\\", "/");
const relative = (file) => normalize(path.relative(root, file));
const aliases = {
  "@/": "src/",
  "@image/": "src/assets/images/",
  "@sound/": "src/assets/sound/",
  "@media/": "src/assets/media/",
};
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function checkDependency(file, specifier) {
  const source = relative(file);
  const alias = Object.entries(aliases).find(([prefix]) => specifier.startsWith(prefix));
  const target = alias
    ? path.resolve(root, alias[1], specifier.slice(alias[0].length))
    : specifier.startsWith(".") ? path.resolve(path.dirname(file), specifier) : null;

  // Node lit aussi ce contenu pour le prérendu des pages. Il doit pouvoir le charger indépendamment de React et du navigateur.
  if (source.startsWith("src/content/") && !target) {
    errors.push(`${source}: external dependency in content (${specifier})`);
  }
  if (!target) return;
  const destination = relative(target);
  if (source.startsWith("api/") || source.startsWith("lib/")) {
    // Les routes délèguent au serveur et les services restent indépendants des routes.
    if (!destination.startsWith("lib/")) {
      errors.push(`${source} -> ${destination}: server dependencies must stay in lib`);
    }
    return;
  }
  const feature = (value) => value.match(/^src\/features\/([^/]+)\//)?.[1];
  let reason;
  if (!destination.startsWith("src/")) reason = "client code imports a server or tooling module";
  else if (source.startsWith("src/content/") && !/^src\/(content|locales)\//.test(destination)) {
    reason = "content must only depend on content or translations";
  } else if (source.startsWith("src/shared/") && /^src\/(features|app)\//.test(destination)) {
    reason = "shared code must not depend on a feature or the application";
  } else if (feature(source) && destination.startsWith("src/app/")) {
    reason = "a feature must not depend on application bootstrap";
  } else if (feature(source) && feature(destination) && feature(source) !== feature(destination)) {
    reason = "features must communicate through shared code or content";
  } else if (source.startsWith("src/styles/") && /^src\/(features|app)\//.test(destination)) {
    reason = "shared styles must not import page styles";
  }
  if (reason) errors.push(`${source} -> ${destination}: ${reason}`);
}

const files = [
  ...walk(path.join(root, "src")).filter((file) => /\.(tsx?|css)$/.test(file)),
  ...walk(path.join(root, "api")).filter((file) => file.endsWith(".js")),
  ...walk(path.join(root, "lib")).filter((file) => file.endsWith(".js")),
];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  if (file.endsWith(".css")) {
    for (const match of text.matchAll(/@import\s+["']([^"']+)["']/g)) checkDependency(file, match[1]);
    continue;
  }
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
      checkDependency(file, node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword
      && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
      checkDependency(file, node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Architecture: ${files.length} files checked; dependency boundaries respected.`);
}
