import { CaseStudyLayout, CaseStudyLinks, CaseStudyOverview, CaseStudySection } from "./CaseStudyParts";
import { ShowcaseHero, ShowcaseJourney, ShowcaseNavigation, ShowcaseTechnicalDetails } from "./ShowcaseParts";
import { getCasePresentations } from "./presentation";
import { useCaseStudy } from "./useCaseStudy";
import "../../assets/styles/CaseStudies/ATable.css";

export default function ATable() {
  const study = useCaseStudy("a-table");
  const content = getCasePresentations(study.locale)["a-table"];
  return <CaseStudyLayout study={study} className="case-table case-showcase">
    <ShowcaseHero study={study} headline={content.headline} visualLabel={content.visualLabel}
      format={content.format} mediaLabel="À table !" width={1280} height={747} />
    <CaseStudyOverview study={study} />
    <ShowcaseNavigation label={content.navigation} links={[
      { id: "en-detail", label: content.experience },
      { id: "rappels", label: content.reminders },
      { id: "sous-le-capot", label: content.engineering },
      { id: "resultat", label: content.outcome },
    ]} />
    <div id="en-detail" className="showcase-panel showcase-customer">
      <p className="showcase-kicker">{content.experience}</p>
      <CaseStudySection section={study.section("inventaire")} />
      <ShowcaseJourney steps={content.steps} />
    </div>
    <div className="showcase-panel table-reminders">
      <p className="showcase-kicker">{content.reminders}</p>
      <div className="case-grid">
        <CaseStudySection section={study.section("rappels")} />
        <CaseStudySection section={study.section("besoin")} />
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
