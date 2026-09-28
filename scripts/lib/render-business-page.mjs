// La compilation fournit les données rédactionnelles partagées ; le texte est échappé lors de sa conversion en HTML.
export function renderBusinessPage(page, pages, project, escapeHtml, locale, labels) {
  const e = escapeHtml;
  const overview = page.overview ? `<dl>${page.overview.map((item) => `<div><dt>${e(item.label)}</dt><dd><strong>${e(item.value)}</strong><p>${e(item.detail)}</p></dd></div>`).join("")}</dl>` : "";
  const gallery = page.gallery ? `<section><h2>${e(page.gallery.title)}</h2><p>${e(page.gallery.description)}</p>${page.gallery.images.map((shot) => `<figure><a href="${e(shot.src)}"><img src="${e(shot.src)}" alt="${e(shot.alt)}" width="1440" height="1000" loading="lazy" style="max-width:100%;height:auto"><span>${e(page.gallery.enlarge)}</span></a><figcaption><h3>${e(shot.title)}</h3><p>${e(shot.caption)}</p></figcaption></figure>`).join("")}</section>` : "";
  const sections = page.sections.map((section) => `<section><h2>${e(section.title)}</h2><p>${e(section.text)}</p>${section.items ? `<ul>${section.items.map((item) => `<li>${e(item)}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const questions = page.questions.length ? `<section><h2>${e(labels.faq)}</h2>${page.questions.map((item) => `<details><summary>${e(item.question)}</summary><p>${e(item.answer)}</p></details>`).join("")}</section>` : "";
  const links = project ? [
    project.seeLink && `<a href="${e(project.seeLink)}">${e(labels.visit)}</a>`,
    project.ghLink && `<a href="${e(project.ghLink)}">${e(labels.code)}</a>`,
  ].filter(Boolean) : [];
  const projectLinks = page.kind === "case-study" && links.length ? `<p>${links.join(" · ")}</p>` : "";
  const related = pages.filter((item) => item.path !== page.path && (!page.overview || item.kind === "case-study")).map((item) => `<li><a href="/${item.kind === "service" ? "fr" : locale}${e(item.path)}">${e(item.title)}</a></li>`).join("");
  const heroLink = page.overview && project?.seeLink ? `<a href="${e(project.seeLink)}">${e(labels.visit)}</a>` : `<a href="/${locale}/contact">${e(labels.talk)}</a>`;
  return `<article lang="${locale === "bzh" ? "br" : locale}"><nav aria-label="${e(labels.breadcrumb)}"><a href="/${locale}">${e(labels.home)}</a></nav><header><p>${e(page.eyebrow)}</p><h1>${e(page.title)}</h1><p>${e(page.intro)}</p><ul>${page.tags.map((tag) => `<li>${e(tag)}</li>`).join("")}</ul>${heroLink}</header>${overview}${gallery}${sections}${projectLinks}${questions}<section><h2>${e(labels.related)}</h2><ul>${related}</ul></section><section><h2>${e(labels.contact_heading)}</h2><p>${e(labels.contact_description)}</p><a href="/${locale}/contact">${e(labels.contact)}</a></section></article>`;
}
