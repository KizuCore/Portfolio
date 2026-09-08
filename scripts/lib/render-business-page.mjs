// Shared editorial data is passed in by the build; all text is escaped at the HTML boundary.
export function renderBusinessPage(page, pages, project, escapeHtml) {
  const e = escapeHtml;
  const sections = page.sections.map((section) => `<section><h2>${e(section.title)}</h2><p>${e(section.text)}</p>${section.items ? `<ul>${section.items.map((item) => `<li>${e(item)}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const questions = page.questions.length ? `<section><h2>Vos questions, en pratique.</h2>${page.questions.map((item) => `<details><summary>${e(item.question)}</summary><p>${e(item.answer)}</p></details>`).join("")}</section>` : "";
  const projectLinks = page.kind === "case-study" && project ? `<p>${project.seeLink ? `<a href="${e(project.seeLink)}">Voir le site</a> · ` : ""}<a href="${e(project.ghLink)}">Explorer le code</a></p>` : "";
  const related = pages.filter((item) => item.path !== page.path).map((item) => `<li><a href="/fr${e(item.path)}">${e(item.title)}</a></li>`).join("");
  return `<article lang="fr"><nav aria-label="Fil d’Ariane"><a href="/fr">Accueil</a></nav><header><p>${e(page.eyebrow)}</p><h1>${e(page.title)}</h1><p>${e(page.intro)}</p><ul>${page.tags.map((tag) => `<li>${e(tag)}</li>`).join("")}</ul><a href="/fr/contact">Parlons de votre projet</a></header>${sections}${projectLinks}${questions}<section><h2>Pour aller plus loin</h2><ul>${related}</ul></section><section><h2>Commençons par votre besoin.</h2><p>Votre objectif, votre échéance, les outils que vous utilisez : quelques lignes suffisent pour engager la discussion.</p><a href="/fr/contact">Décrire mon projet</a></section></article>`;
}
