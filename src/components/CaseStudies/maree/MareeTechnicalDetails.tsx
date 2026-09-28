import type { CaseStudy } from "../useCaseStudy";
import type { MareePresentation } from "./content";

export default function MareeTechnicalDetails({ study, content }: { study: CaseStudy; content: MareePresentation }) {
  return <section className="maree-engineering" id="technique" aria-labelledby="maree-engineering-title">
    <header className="maree-section-heading">
      <p className="business-eyebrow">{content.engineering}</p>
      <h2 id="maree-engineering-title">{content.engineeringTitle}</h2>
      <p>{content.engineeringIntro}</p>
    </header>
    <ul className="business-tags" aria-label={study.labels.tags}>{study.page.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    <div className="maree-technical-list">{content.technical.map((item, index) => {
      const section = study.section(item.id);
      return <details key={item.id} id={item.id} className="maree-technical-item">
        <summary>
          <span className="maree-technical-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span><strong>{item.label}</strong><span className="maree-technical-hint">{item.hint}</span></span>
          <span className="maree-toggle" aria-hidden="true" />
        </summary>
        <div className="maree-technical-body">
          <h3>{section.title}</h3><p>{section.text}</p>
          {section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}
        </div>
      </details>;
    })}</div>
  </section>;
}
