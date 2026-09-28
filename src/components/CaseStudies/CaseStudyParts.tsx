import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getHtmlLang } from "../../config/seo";
import FaqItem from "../Business/FaqItem";
import LoadingImage from "../Layout/LoadingImage";
import type { CaseStudy } from "./useCaseStudy";
import "../../assets/styles/Business/Business.css";
import "../../assets/styles/CaseStudies/CaseStudies.css";

type StudyProps = { study: CaseStudy };

// Ces blocs partagent uniquement la présentation ; chaque page compose librement son étude de cas.
export function CaseStudyLayout({ study, className, children }: StudyProps & { className: string; children: ReactNode }) {
  const { page, labels, locale } = study;
  return <article className={`business-page case-study ${className}`} lang={getHtmlLang(locale)}>
    <nav className="business-breadcrumb" aria-label={labels.breadcrumb}>
      <Link to={`/${locale}`}>{labels.home}</Link><span aria-hidden="true">/</span>
      <Link to={`/${locale}/project`}>{labels.project}</Link>
    </nav>
    {children}
    {page.questions.length > 0 && <section className="business-faq" aria-labelledby="case-faq-title">
      <h2 id="case-faq-title">{labels.faq}</h2>
      {page.questions.map((item) => <FaqItem key={item.question} {...item} />)}
    </section>}
    <section className="business-related" aria-labelledby="case-related-title">
      <h2 id="case-related-title">{labels.related}</h2>
      <div className="business-related-grid">{study.relatedCases.map((item) => (
        <Link key={item.path} to={`/${locale}${item.path}`}><span className="business-eyebrow">{labels.case_study}</span><span>{item.title}</span><span aria-hidden="true">↗</span></Link>
      ))}</div>
    </section>
    <section className="business-contact">
      <p className="business-eyebrow">{labels.next_project}</p><h2>{labels.contact_heading}</h2>
      <p>{labels.contact_description}</p>
      <Link className="business-button" to={`/${locale}/contact`}>{labels.contact} ↗</Link>
    </section>
  </article>;
}

export function CaseStudyLinks({ study }: StudyProps) {
  const { project, labels } = study;
  return <div className="business-actions">
    {project.seeLink && <a className="business-button" href={project.seeLink} target="_blank" rel="noopener noreferrer">{labels.visit} <span className="visually-hidden">({labels.new_tab})</span> ↗</a>}
    {project.ghLink && <a className={project.seeLink ? "business-text-link" : "business-button"} href={project.ghLink} target="_blank" rel="noopener noreferrer">{labels.code} <span className="visually-hidden">({labels.new_tab})</span> ↗</a>}
  </div>;
}

export function CaseStudyOverview({ study }: StudyProps) {
  return study.page.overview && <dl className="business-overview">{study.page.overview.map((item) => (
    <div key={item.label}><dt>{item.label}</dt><dd><strong>{item.value}</strong><span>{item.detail}</span></dd></div>
  ))}</dl>;
}

export function CaseStudySection({ section, className = "" }: { section: ReturnType<CaseStudy["section"]>; className?: string }) {
  return <section className={`case-section ${className}`} id={section.id} aria-labelledby={`${section.id}-title`}>
    <h2 id={`${section.id}-title`}>{section.title}</h2>
    <p>{section.text}</p>
    {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
  </section>;
}

export function CaseStudyGallery({ study }: StudyProps) {
  const gallery = study.page.gallery;
  if (!gallery) return null;
  return <section className="business-gallery" aria-labelledby="case-gallery-title">
    <div className="business-gallery-heading"><h2 id="case-gallery-title">{gallery.title}</h2><p>{gallery.description}</p></div>
    <div className="business-gallery-grid">{gallery.images.map((shot) => (
      <figure key={shot.src}>
        <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`${gallery.enlarge} : ${shot.title} (${study.labels.new_tab})`}>
          <LoadingImage src={shot.src} alt={shot.alt} width="1440" height="1000" loading="lazy" decoding="async" />
          <span className="business-gallery-enlarge">{gallery.enlarge} <span aria-hidden="true">↗</span></span>
        </a>
        <figcaption><h3>{shot.title}</h3><p>{shot.caption}</p></figcaption>
      </figure>
    ))}</div>
  </section>;
}
