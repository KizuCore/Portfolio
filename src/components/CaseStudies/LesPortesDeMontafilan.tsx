import { CaseStudyLayout, CaseStudyLinks, CaseStudyOverview, CaseStudySection } from "./CaseStudyParts";
import { ShowcaseHero, ShowcaseJourney, ShowcaseNavigation, ShowcaseTechnicalDetails } from "./ShowcaseParts";
import { getCasePresentations } from "./presentation";
import { useCaseStudy } from "./useCaseStudy";
import "../../assets/styles/CaseStudies/LesPortesDeMontafilan.css";

export default function LesPortesDeMontafilan() {
  const study = useCaseStudy("les-portes-de-montafilan");
  const content = getCasePresentations(study.locale)["les-portes-de-montafilan"];
  return <CaseStudyLayout study={study} className="case-montafilan case-showcase">
    <ShowcaseHero study={study} headline={content.headline} visualLabel={content.visualLabel}
      format={content.format} mediaLabel="lesportesdemontafilan.com" width={1280} height={743} />
    <CaseStudyOverview study={study} />
    <ShowcaseNavigation label={content.navigation} links={[
      { id: "en-detail", label: content.experience },
      { id: "solution", label: content.solution },
      { id: "sous-le-capot", label: content.engineering },
      { id: "resultat", label: content.outcome },
    ]} />
    <div id="en-detail" className="showcase-panel showcase-customer">
      <p className="showcase-kicker">{content.experience}</p>
      <CaseStudySection section={study.section("parcours-visiteur")} />
      <ShowcaseJourney steps={content.steps} />
    </div>
    <div className="showcase-panel montafilan-management">
      <p className="showcase-kicker">{content.solution}</p>
      <div className="case-grid">
        <CaseStudySection section={study.section("besoin")} />
        <CaseStudySection section={study.section("solution")} />
      </div>
    </div>
    <ShowcaseTechnicalDetails study={study} eyebrow={content.engineering} title={content.engineeringTitle}
      intro={content.engineeringIntro} items={content.technical} />
    <div className="showcase-delivery">
      <CaseStudySection section={study.section("resultat")} />
      <CaseStudyLinks study={study} />
    </div>
  </CaseStudyLayout>;
}
