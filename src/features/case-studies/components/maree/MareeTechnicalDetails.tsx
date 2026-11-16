import type { CaseStudy } from "../../hooks/useCaseStudy";
import type { MareePresentation } from "../../data/maree/content";
import { ShowcaseTechnicalDetails } from "../ShowcaseParts";

export default function MareeTechnicalDetails({ study, content }: { study: CaseStudy; content: MareePresentation }) {
  return <ShowcaseTechnicalDetails study={study} eyebrow={content.engineering} title={content.engineeringTitle}
    intro={content.engineeringIntro} items={content.technical} id="technique" />;
}
