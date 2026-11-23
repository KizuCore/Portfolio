import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, splitLocalizedPath } from "@/shared/config/seo";
import "../styles/NotFound.css";
import TardisDrift from "../components/TardisDrift";
import SpaceBackdrop from "../components/SpaceBackdrop";

export default function LocaleFallbackRoute() {
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? "fr";
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(locale);
  return <section className="not-found-page site-container" aria-labelledby="not-found-title">
    <SpaceBackdrop />
    <TardisDrift />
    <div className="not-found-copy">
      <p className="page-eyebrow">{t("not_found.eyebrow")}</p>
      <h1 id="not-found-title" className="page-title">{t("not_found.title")}</h1>
      <p className="not-found-description">{t("not_found.description")}</p>
      <div className="not-found-actions">
        <Link className="not-found-home" to={getLocalizedPath(locale, "/")}>{t("not_found.home")}</Link>
        <Link className="not-found-projects" to={getLocalizedPath(locale, "/project")}>{t("not_found.projects")}</Link>
      </div>
    </div>
  </section>;
}
