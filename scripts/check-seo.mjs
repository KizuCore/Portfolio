import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const SITE_URL = (process.env.VITE_SITE_URL || "https://theo-guerin.fr").replace(/\/+$/, "");
const PERSON_ID = `${SITE_URL}/#person`;
const ROUTES = [
  "/",
  "/about",
  "/experience",
  "/project",
  "/contact",
  "/cv",
  "/fr",
  "/fr/about",
  "/fr/experience",
  "/fr/project",
  "/fr/contact",
];
const DISTINCT_PAGE_ROUTES = new Set(["/", "/about", "/experience", "/project", "/contact", "/cv"]);

function htmlPath(routePath) {
  if (routePath === "/") {
    return path.join(DIST_DIR, "index.html");
  }
  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
}

function getMetaDescription(html) {
  return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
}

function getCanonical(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
}

function getH1(html) {
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
}

function getStructuredData(html) {
  return [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`JSON-LD invalide: ${error.message}`);
    }
  });
}

function flattenGraph(jsonLdBlocks) {
  return jsonLdBlocks.flatMap((block) => {
    if (Array.isArray(block?.["@graph"])) {
      return block["@graph"];
    }
    return [block];
  });
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function main() {
  const errors = [];
  const titles = new Map();
  const descriptions = new Map();

  for (const routePath of ROUTES) {
    const filePath = htmlPath(routePath);
    assert(fs.existsSync(filePath), `${routePath}: HTML prérendu manquant (${filePath})`, errors);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const html = fs.readFileSync(filePath, "utf8");
    const title = getTitle(html);
    const description = getMetaDescription(html);
    const canonical = getCanonical(html);
    const h1 = getH1(html);
    const bodyText = textContent(html);
    let jsonLdBlocks = [];

    try {
      jsonLdBlocks = getStructuredData(html);
    } catch (error) {
      errors.push(`${routePath}: ${error.message}`);
    }

    const graph = flattenGraph(jsonLdBlocks);
    const person = graph.find((node) => node?.["@type"] === "Person");

    assert(title, `${routePath}: <title> manquant`, errors);
    assert(description, `${routePath}: meta description manquante`, errors);
    assert(canonical, `${routePath}: canonical manquant`, errors);
    assert(canonical.startsWith(SITE_URL), `${routePath}: canonical hors domaine (${canonical})`, errors);
    assert(h1, `${routePath}: H1 manquant`, errors);
    assert(bodyText.length > 450, `${routePath}: HTML prérendu trop pauvre (${bodyText.length} caractères)`, errors);
    assert(jsonLdBlocks.length > 0, `${routePath}: JSON-LD manquant`, errors);
    assert(person?.["@id"] === PERSON_ID, `${routePath}: Person @id incorrect ou absent`, errors);

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

  for (const markdownFile of ["llms.txt", "profile.md", "projects.md", "experience.md", "contact.md"]) {
    const filePath = path.join(DIST_DIR, markdownFile);
    assert(fs.existsSync(filePath), `${markdownFile}: fichier Markdown/LLM manquant dans dist`, errors);
    if (fs.existsSync(filePath)) {
      assert(fs.readFileSync(filePath, "utf8").trim().length > 120, `${markdownFile}: contenu trop court`, errors);
    }
  }

  if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
  }

  console.log(`SEO check passed for ${ROUTES.length} prerendered routes.`);
}

main();
