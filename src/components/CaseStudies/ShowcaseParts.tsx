import LoadingImage from "../Layout/LoadingImage";
import { CaseStudyLinks } from "./CaseStudyParts";
import type { CaseStudy } from "./useCaseStudy";
import "../../assets/styles/CaseStudies/CaseStudyShowcase.css";

// Les blocs visuels sont communs ; chaque page conserve le choix des sections et de leur ordre.
export function ShowcaseHero({ study, headline, visualLabel, format, mediaLabel, width, height }: {
  study: CaseStudy;
  headline: string;
  visualLabel: string;
  format: string;
  mediaLabel: string;
  width: number;
  height: number;
}) {
  return <header className="showcase-hero">
    <div className="showcase-hero-copy">
      <p className="showcase-kicker">{study.page.eyebrow}</p>
      <h1>{study.page.title}</h1>
      <p className="showcase-headline">{headline}</p>
      <p className="showcase-intro">{study.page.intro}</p>
      <CaseStudyLinks study={study} />
    </div>
    <figure className="showcase-hero-visual">
      <div className="showcase-browser-bar" aria-hidden="true"><span>● ● ●</span><span>{mediaLabel}</span><span>↗</span></div>
      <LoadingImage src={study.project.imgPath} alt={study.t(study.project.altTextKey)} width={width} height={height} fetchPriority="high" />
      <figcaption><span>{visualLabel}</span><span>{format}</span></figcaption>
    </figure>
  </header>;
}

export function ShowcaseNavigation({ label, links }: { label: string; links: { id: string; label: string }[] }) {
  return <nav className="showcase-navigation" aria-label={label}>{links.map((link, index) => (
    <a key={link.id} href={`#${link.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{link.label}</a>
  ))}</nav>;
}

export function ShowcaseJourney({ steps }: { steps: { title: string; text: string }[] }) {
  return <ol className="showcase-journey">{steps.map((step, index) => (
    <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>
  ))}</ol>;
}

export function ShowcaseTechnicalDetails({ study, eyebrow, title, intro, items, id = "sous-le-capot" }: {
  study: CaseStudy;
  eyebrow: string;
  title: string;
  intro: string;
  items: { id: string; label: string; hint: string }[];
  id?: string;
}) {
  return <section className="showcase-engineering" id={id} aria-labelledby={`${id}-title`}>
    <header className="showcase-section-heading">
      <p className="business-eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`}>{title}</h2><p>{intro}</p>
    </header>
    <ul className="business-tags" aria-label={study.labels.tags}>{study.page.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    <div className="showcase-technical-list">{items.map((item, index) => {
      const section = study.section(item.id);
      return <details key={item.id} id={item.id} className="showcase-technical-item">
        <summary>
          <span className="showcase-technical-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span><strong>{item.label}</strong><span className="showcase-technical-hint">{item.hint}</span></span>
          <span className="showcase-toggle" aria-hidden="true" />
        </summary>
        <div className="showcase-technical-body">
          <h3>{section.title}</h3><p>{section.text}</p>
          {section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}
        </div>
      </details>;
    })}</div>
  </section>;
}
