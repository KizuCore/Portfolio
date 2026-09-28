import LoadingImage from "../../Layout/LoadingImage";
import { CaseStudyLinks } from "../CaseStudyParts";
import type { CaseStudy } from "../useCaseStudy";
import type { MareePresentation } from "./content";

export default function MareeHero({ study, content }: { study: CaseStudy; content: MareePresentation }) {
  return <header className="maree-hero">
    <div className="maree-hero-copy">
      <p className="maree-kicker">{study.page.eyebrow}</p>
      <h1>{study.page.title}</h1>
      <p className="maree-headline">{content.headline}</p>
      <p className="maree-intro">{study.page.intro}</p>
      <CaseStudyLinks study={study} />
    </div>
    <figure className="maree-hero-visual">
      <div className="maree-browser-bar" aria-hidden="true"><span>● ● ●</span><span>lamareemalouine.fr</span><span>↗</span></div>
      <LoadingImage src={study.project.imgPath} alt={study.t(study.project.altTextKey)} width={1440} height={756} fetchPriority="high" />
      <figcaption><span>{content.client}</span><span>Click & Collect</span></figcaption>
    </figure>
  </header>;
}
