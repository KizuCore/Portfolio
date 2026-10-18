import { CaseStudyGallery, CaseStudyLayout, CaseStudyLinks, CaseStudyOverview, CaseStudySection } from "./CaseStudyParts";
import { useCaseStudy } from "./useCaseStudy";
import { ShowcaseJourney, ShowcaseNavigation } from "./ShowcaseParts";
import { getMareePresentation } from "./maree/content";
import MareeHero from "./maree/MareeHero";
import MareeTechnicalDetails from "./maree/MareeTechnicalDetails";
import "../../assets/styles/CaseStudies/LaMareeMalouine.css";

export default function LaMareeMalouine() {
  const study = useCaseStudy("la-maree-malouine");
  const content = getMareePresentation(study.locale);
  return <CaseStudyLayout study={study} className="case-maree case-showcase">
    <MareeHero study={study} content={content} />
    <CaseStudyOverview study={study} />
    <ShowcaseNavigation label={content.navigation} links={[
      { id: "en-detail", label: content.experience },
      { id: "administration", label: content.administration },
      { id: "technique", label: content.engineering },
      { id: "methode", label: content.approach },
    ]} />
    <div id="en-detail" className="showcase-customer showcase-panel">
      <p className="showcase-kicker">{content.client}</p>
      <CaseStudySection section={study.section("parcours-client")} />
      <ShowcaseJourney steps={content.steps} />
    </div>
    <div className="showcase-admin showcase-panel">
      <p className="showcase-kicker">{content.merchant}</p>
      <CaseStudySection section={study.section("administration")} />
      <CaseStudyGallery study={study} />
    </div>
    <MareeTechnicalDetails study={study} content={content} />
    <div id="methode" className="showcase-method">
      <p className="business-eyebrow">{content.approach}</p>
      <div className="case-grid">
        <CaseStudySection section={study.section("besoin")} />
        <CaseStudySection section={study.section("sprints")} />
      </div>
    </div>
    <div className="showcase-delivery">
      <CaseStudySection section={study.section("livraison")} />
      <CaseStudyLinks study={study} />
    </div>
  </CaseStudyLayout>;
}
