import LoadingImage from "../Layout/LoadingImage";
import { getContentLocale, getShortLocale, getHtmlLang } from "../../config/seo";
import { Link } from "react-router-dom";
import type { BusinessPage as BusinessPageContent } from "../../data/businessPages";
import { getBusinessPage, getBusinessPages, getBusinessLabels } from "../../data/businessPages";
import { PROJECTS } from "../Projects/data/projects";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Business/Business.css";

// The template owns layout only; copy stays shared with the non-JavaScript build.
export default function BusinessPage({ page: sourcePage }: { page: BusinessPageContent }) {
  const { i18n } = useTranslation();
  const locale = getContentLocale(getShortLocale(i18n.resolvedLanguage ?? i18n.language), sourcePage.path);
  const t = i18n.getFixedT(locale);
  const page = getBusinessPage(sourcePage.path, locale)!;
  const labels = getBusinessLabels(locale);
  const project = PROJECTS.find((item) => item.caseStudyPath === `/fr${page.path}`);
  return (
    <article className="business-page" lang={getHtmlLang(locale)}>
      <nav className="business-breadcrumb" aria-label={labels.breadcrumb}>
        <Link to={`/${locale}`}>{labels.home}</Link><span aria-hidden="true">/</span><span>{page.kind === "service" ? labels.services : labels.project}</span>
      </nav>
      <header className="business-hero">
        <p className="business-eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="business-lead">{page.intro}</p>
        <ul className="business-tags" aria-label={labels.tags}>{page.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="business-actions">
          <Link className="business-button" to={`/${locale}/contact`}>{labels.talk} <span aria-hidden="true">↗</span></Link>
          <a className="business-text-link" href="#en-detail">{labels.details} <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      {page.kind === "case-study" && project && (
        <figure className="business-preview">
          <LoadingImage src={project.imgPath} alt={t(project.altTextKey)} width="1600" height="1000" fetchPriority="high" />
          <figcaption>{t(project.titleKey)} · {labels.credit}</figcaption>
        </figure>
      )}

      <div className="business-detail" id="en-detail">
        <aside className="business-aside">
          <p className="business-eyebrow">{page.kind === "service" ? labels.service_eyebrow : labels.case_eyebrow}</p>
          <h2>{page.kind === "service" ? labels.service_heading : labels.case_heading}</h2>
          <p>Théo Guérin<br />{labels.developer}</p>
          <Link className="business-text-link" to={`/${locale}/experience`}>{labels.experience} ↗</Link>
        </aside>
        <div className="business-sections">
          {page.sections.map((section, index) => (
            <section className="business-section" key={section.title}>
              <span className="business-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2><p>{section.text}</p>
              {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          {page.kind === "case-study" && project && <div className="business-actions">
            {project.seeLink && <a className="business-button" href={project.seeLink} target="_blank" rel="noopener noreferrer">{labels.visit} <span className="visually-hidden">({labels.new_tab})</span> ↗</a>}
            <a className="business-text-link" href={project.ghLink} target="_blank" rel="noopener noreferrer">{labels.code} <span className="visually-hidden">({labels.new_tab})</span> ↗</a>
          </div>}
        </div>
      </div>

      {page.questions.length > 0 && <section className="business-faq" aria-labelledby="business-faq-title">
        <p className="business-eyebrow">{labels.before}</p><h2 id="business-faq-title">{labels.faq}</h2>
        {/* Native details remain keyboard accessible and work without JavaScript. */}
        {page.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
      </section>}

      <section className="business-related" aria-labelledby="business-related-title">
        <h2 id="business-related-title">{labels.related}</h2>
        <div className="business-related-grid">{getBusinessPages(locale).filter((item) => item.path !== page.path).map((item) => (
          <Link key={item.path} to={`/${getContentLocale(locale, item.path)}${item.path}`}><span className="business-eyebrow">{item.kind === "service" ? labels.service : labels.case_study}</span><span>{item.title}</span><span aria-hidden="true">↗</span></Link>
        ))}</div>
      </section>
      <section className="business-contact">
        <p className="business-eyebrow">{labels.next_project}</p><h2>{labels.contact_heading}</h2>
        <p>{labels.contact_description}</p>
        <Link className="business-button" to={`/${locale}/contact`}>{labels.contact} ↗</Link>
      </section>
    </article>
  );
}
