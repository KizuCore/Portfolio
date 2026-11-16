import LoadingImage from "@/shared/ui/LoadingImage";
import { getShortLocale, getLocalizedPath, getContentLocale, getHtmlLang, splitLocalizedPath } from "@/shared/config/seo";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "@/shared/data/projects";
import "../styles/HomeOffer.css";

const projectDescriptions: Record<string, string> = {
  "/fr/realisations/la-maree-malouine": "home_refresh.project_1",
  "/fr/realisations/les-portes-de-montafilan": "home_refresh.project_2",
  "/fr/realisations/a-table": "home_refresh.project_3",
};
const selectedProjects = PROJECTS.filter(project => project.caseStudyPath && projectDescriptions[project.caseStudyPath]);

export default function HomeProof() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? getShortLocale(i18n.language);

  return <section className="home-work" aria-labelledby="home-work-title">
    <header className="section-heading">
      <div>
        <p className="business-eyebrow">01 / {t("home_refresh.selected")}</p>
        <h2 id="home-work-title">{t("home_refresh.work_title")}</h2>
      </div>
      <Link className="business-text-link" to={getLocalizedPath(locale, "/project")}>{t("home_refresh.all_projects")} <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="home-work-grid">
      {selectedProjects.map((project, index) => {
        const path = project.caseStudyPath!;
        const contentLocale = getContentLocale(locale, splitLocalizedPath(path).pathname);
        return <Link className="work-preview" key={project.titleKey} to={getLocalizedPath(contentLocale, path)} hrefLang={getHtmlLang(contentLocale)}>
          <div className="work-preview-image">
            <LoadingImage src={project.imgPath} srcSet={project.srcSet}
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1232px) calc((100vw - 80px) / 3), 373px"
              alt={t(project.altTextKey)} width="1600" height="1000" loading="lazy" decoding="async" />
            <span className="work-preview-arrow" aria-hidden="true">↗</span>
          </div>
          <div className="work-preview-meta"><span>{t(`project_filters.${project.category}`)}</span><span aria-hidden="true">0{index + 1}</span></div>
          <h3>{t(project.titleKey)}</h3>
          <p>{t(projectDescriptions[path])}</p>
          <span className="work-preview-link">{t("home_offer.case_link")} <span aria-hidden="true">→</span></span>
        </Link>;
      })}
    </div>
  </section>;
}
