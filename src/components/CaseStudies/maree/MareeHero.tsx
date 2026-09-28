import { ShowcaseHero } from "../ShowcaseParts";
import type { CaseStudy } from "../useCaseStudy";
import type { MareePresentation } from "./content";

export default function MareeHero({ study, content }: { study: CaseStudy; content: MareePresentation }) {
  return <ShowcaseHero study={study} headline={content.headline} visualLabel={content.client}
    format="Click & Collect" mediaLabel="lamareemalouine.fr" width={1440} height={756} />;
}
