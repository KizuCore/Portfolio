import { Link } from "react-router-dom";
import type { BusinessPage as BusinessPageContent } from "../../data/businessPages";
import { BUSINESS_PAGES } from "../../data/businessPages";
import { PORTFOLIO_PROJECTS } from "../../data/portfolio";
import montafilanImage from "@image/Projects/portesDeMontafilan.webp";
import "../../assets/styles/Business/Business.css";

// The template owns layout only; copy stays shared with the non-JavaScript build.
export default function BusinessPage({ page }: { page: BusinessPageContent }) {
  const project = PORTFOLIO_PROJECTS.find((item) => item.imageKey === "portesDeMontafilan");
  return (
    <article className="business-page" lang="fr">
      <nav className="business-breadcrumb" aria-label="Fil d’Ariane">
        <Link to="/fr">Accueil</Link><span aria-hidden="true">/</span><span>{page.kind === "service" ? "Services" : "Réalisation"}</span>
      </nav>
      <header className="business-hero">
        <p className="business-eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="business-lead">{page.intro}</p>
        <ul className="business-tags" aria-label="Domaines du projet">{page.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="business-actions">
          <Link className="business-button" to="/fr/contact">Parlons de votre projet <span aria-hidden="true">↗</span></Link>
          <a className="business-text-link" href="#en-detail">Découvrir en détail <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      {page.kind === "case-study" && project && (
        <figure className="business-preview">
          <img src={montafilanImage} alt="Aperçu du site du gîte Les Portes de Montafilan" width="1600" height="1000" fetchPriority="high" />
          <figcaption>Les Portes de Montafilan · Conception et développement web par Théo Guérin</figcaption>
        </figure>
      )}

      <div className="business-detail" id="en-detail">
        <aside className="business-aside">
          <p className="business-eyebrow">{page.kind === "service" ? "De l’idée à la livraison" : "Dans les coulisses"}</p>
          <h2>{page.kind === "service" ? "Un projet clair, à chaque étape." : "Le besoin, les choix, la réalisation."}</h2>
          <p>Théo Guérin<br />Développeur web freelance à Rennes</p>
          <Link className="business-text-link" to="/fr/experience">Découvrir mon parcours ↗</Link>
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
            <a className="business-button" href={project.seeLink} target="_blank" rel="noopener noreferrer">Voir le site <span className="visually-hidden">(nouvel onglet)</span> ↗</a>
            <a className="business-text-link" href={project.ghLink} target="_blank" rel="noopener noreferrer">Explorer le code <span className="visually-hidden">(nouvel onglet)</span> ↗</a>
          </div>}
        </div>
      </div>

      {page.questions.length > 0 && <section className="business-faq" aria-labelledby="business-faq-title">
        <p className="business-eyebrow">Avant de démarrer</p><h2 id="business-faq-title">Vos questions, en pratique.</h2>
        {/* Native details remain keyboard accessible and work without JavaScript. */}
        {page.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
      </section>}

      <section className="business-related" aria-labelledby="business-related-title">
        <h2 id="business-related-title">Pour aller plus loin</h2>
        <div className="business-related-grid">{BUSINESS_PAGES.filter((item) => item.path !== page.path).map((item) => (
          <Link key={item.path} to={`/fr${item.path}`}><span className="business-eyebrow">{item.kind === "service" ? "Service" : "Étude de cas"}</span><span>{item.title}</span><span aria-hidden="true">↗</span></Link>
        ))}</div>
      </section>
      <section className="business-contact">
        <p className="business-eyebrow">Votre prochain projet</p><h2>Commençons par votre besoin.</h2>
        <p>Votre objectif, votre échéance, les outils que vous utilisez : quelques lignes suffisent pour engager la discussion.</p>
        <Link className="business-button" to="/fr/contact">Décrire mon projet ↗</Link>
      </section>
    </article>
  );
}
