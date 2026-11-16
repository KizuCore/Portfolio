import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import { SOCIAL_LINKS } from "@/shared/config/site";
import { getLocalizedPath, getShortLocale, splitLocalizedPath } from "@/shared/config/seo";

export default function HomeButtons() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const locale = splitLocalizedPath(location.pathname).locale ?? getShortLocale(i18n.language);
  return <>
    <div className="business-actions">
      <Link className="home-project-link" to={getLocalizedPath(locale, "/project")}>
        {t("home_offer.projects")} <FiArrowRight size={17} aria-hidden="true" />
      </Link>
      <Link className="business-text-link" to={getLocalizedPath(locale, "/contact")}>{t("home_offer.contact")}</Link>
    </div>
    <div className="home-secondary-links">
      <Link to={getLocalizedPath(locale, "/cv")}>{t("my")} {t("cv")}</Link>
      <a href={SOCIAL_LINKS.github}>GitHub</a>
      <a href={SOCIAL_LINKS.linkedin}>LinkedIn</a>
    </div>
  </>;
}
