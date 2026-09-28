import { CaseStudyHero, CaseStudyLayout, CaseStudyLinks, CaseStudyPreview, CaseStudySection } from "./CaseStudyParts";
import { useCaseStudy } from "./useCaseStudy";
import "../../assets/styles/CaseStudies/LesPortesDeMontafilan.css";

export default function LesPortesDeMontafilan() {
  const study = useCaseStudy("les-portes-de-montafilan");
  return <CaseStudyLayout study={study} className="case-montafilan">
    <CaseStudyHero study={study} />
    <CaseStudyPreview study={study} width={1280} height={743} priority />
    <div id="en-detail" className="case-grid case-block montafilan-brief">
      <CaseStudySection section={study.section("besoin")} />
      <CaseStudySection section={study.section("solution")} className="case-card" />
    </div>
    <div className="case-block montafilan-journey">
      <CaseStudySection section={study.section("parcours-visiteur")} />
    </div>
    <div className="case-grid case-block">
      <CaseStudySection section={study.section("technique")} />
      <div className="case-outcome">
        <CaseStudySection section={study.section("resultat")} />
        <CaseStudyLinks study={study} />
      </div>
    </div>
  </CaseStudyLayout>;
}
