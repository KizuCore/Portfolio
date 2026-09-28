import { CaseStudyHero, CaseStudyLayout, CaseStudyLinks, CaseStudyPreview, CaseStudySection } from "./CaseStudyParts";
import { useCaseStudy } from "./useCaseStudy";
import "../../assets/styles/CaseStudies/ATable.css";

export default function ATable() {
  const study = useCaseStudy("a-table");
  return <CaseStudyLayout study={study} className="case-table">
    <CaseStudyHero study={study} />
    <div id="en-detail" className="case-split case-block table-origin">
      <CaseStudySection section={study.section("besoin")} />
      <CaseStudyPreview study={study} width={1280} height={747} priority />
    </div>
    <div className="case-grid case-block table-features">
      <CaseStudySection section={study.section("inventaire")} className="case-card" />
      <CaseStudySection section={study.section("rappels")} className="case-card" />
    </div>
    <div className="case-block table-offline">
      <CaseStudySection section={study.section("hors-connexion")} />
    </div>
    <div className="case-outcome case-block">
      <CaseStudySection section={study.section("resultat")} />
      <CaseStudyLinks study={study} />
    </div>
  </CaseStudyLayout>;
}
