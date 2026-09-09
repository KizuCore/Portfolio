// Shared editorial data is passed in by the build; escape text at the HTML boundary.
export function renderBusinessPage(page, pages, project, escapeHtml, locale, labels) {
  const e = escapeHtml;
  const sections = page.sections.map((section) => `<section><h2>${e(section.title)}</h2><p>${e(section.text)}</p>${section.items ? `<ul>${section.items.map((item) => `<li>${e(item)}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const questions = page.questions.length ? `<section><h2>${e(labels.faq)}</h2>${page.questions.map((item) => `<details><summary>${e(item.question)}</summary><p>${e(item.answer)}</p></details>`).join("")}</section>` : "";
  const projectLinks = page.kind === "case-study" && project ? `<p>${project.seeLink ? `<a href="${e(project.seeLink)}">${e(labels.visit)}</a> · ` : ""}<a href="${e(project.ghLink)}">${e(labels.code)}</a></p>` : "";
  const related = pages.filter((item) => item.path !== page.path).map((item) => `<li><a href="/${item.kind === "service" ? "fr" : locale}${e(item.path)}">${e(item.title)}</a></li>`).join("");
  return `<article lang="${locale === "bzh" ? "br" : locale}"><nav aria-label="${e(labels.breadcrumb)}"><a href="/${locale}">${e(labels.home)}</a></nav><header><p>${e(page.eyebrow)}</p><h1>${e(page.title)}</h1><p>${e(page.intro)}</p><ul>${page.tags.map((tag) => `<li>${e(tag)}</li>`).join("")}</ul><a href="/${locale}/contact">${e(labels.talk)}</a></header>${sections}${projectLinks}${questions}<section><h2>${e(labels.related)}</h2><ul>${related}</ul></section><section><h2>${e(labels.contact_heading)}</h2><p>${e(labels.contact_description)}</p><a href="/${locale}/contact">${e(labels.contact)}</a></section></article>`;
}
