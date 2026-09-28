import { CaseStudyGallery, CaseStudyLayout, CaseStudyLinks, CaseStudyOverview, CaseStudySection } from "./CaseStudyParts";
import { useCaseStudy } from "./useCaseStudy";
import { getMareePresentation } from "./maree/content";
import MareeHero from "./maree/MareeHero";
import MareeTechnicalDetails from "./maree/MareeTechnicalDetails";
import "../../assets/styles/CaseStudies/LaMareeMalouine.css";

export default function LaMareeMalouine() {
  const study = useCaseStudy("la-maree-malouine");
  const content = getMareePresentation(study.locale);
  return <CaseStudyLayout study={study} className="case-maree">
    <MareeHero study={study} content={content} />
    <CaseStudyOverview study={study} />
    <nav className="maree-navigation" aria-label={content.navigation}>
      <a href="#en-detail"><span aria-hidden="true">01</span>{content.experience}</a>
      <a href="#administration"><span aria-hidden="true">02</span>{content.administration}</a>
      <a href="#technique"><span aria-hidden="true">03</span>{content.engineering}</a>
      <a href="#methode"><span aria-hidden="true">04</span>{content.approach}</a>
    </nav>
    <div id="en-detail" className="maree-customer maree-panel">
      <p className="maree-kicker">{content.client}</p>
      <CaseStudySection section={study.section("parcours-client")} />
      <ol className="maree-journey">{content.steps.map((step, index) => (
        <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>
      ))}</ol>
    </div>
    <div className="maree-admin maree-panel">
      <p className="maree-kicker">{content.merchant}</p>
      <CaseStudySection section={study.section("administration")} />
      <CaseStudyGallery study={study} />
    </div>
    <MareeTechnicalDetails study={study} content={content} />
    <div id="methode" className="maree-method">
      <p className="business-eyebrow">{content.approach}</p>
      <div className="case-grid">
        <CaseStudySection section={study.section("besoin")} />
        <CaseStudySection section={study.section("sprints")} />
      </div>
    </div>
    <div className="maree-delivery">
      <CaseStudySection section={study.section("livraison")} />
      <CaseStudyLinks study={study} />
    </div>
  </CaseStudyLayout>;
}
