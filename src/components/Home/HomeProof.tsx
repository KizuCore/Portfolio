import LoadingImage from "../Layout/LoadingImage";
import { getShortLocale, getLocalizedPath, getHtmlLang } from "../../config/seo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "../Projects/data/projects";
import { HOME_CASE_STUDY_PATH } from "../../data/portfolio";
import "../../assets/styles/Home/HomeOffer.css";

export default function HomeProof() {
  const { t, i18n } = useTranslation();
  const project = PROJECTS.find((item) => item.caseStudyPath === HOME_CASE_STUDY_PATH);
  if (!project?.caseStudyPath) return null;
  return <section className="home-proof" aria-labelledby="home-proof-title">
    <div className="home-proof-copy">
      <p className="business-eyebrow">{t("home_offer.case_label")}</p>
      <h2 id="home-proof-title">{t(project.titleKey)}</h2>
      <p>{t("home_offer.case_description")}</p>
      <Link className="business-text-link" to={getLocalizedPath(getShortLocale(i18n.language), project.caseStudyPath)} hrefLang={getHtmlLang(getShortLocale(i18n.language))}>{t("home_offer.case_link")} ↗</Link>
    </div>
    <LoadingImage src={project.imgPath} alt={t(project.altTextKey)} width="1600" height="1000" loading="lazy" decoding="async" />
  </section>;
}
