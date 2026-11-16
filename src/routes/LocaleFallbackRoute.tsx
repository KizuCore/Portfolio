import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, splitLocalizedPath } from "../config/seo";
import { FiArrowLeft } from "@react-icons/all-files/fi/FiArrowLeft";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";
import "../assets/styles/NotFound.css";
import TardisDrift from "../components/NotFound/TardisDrift";

export default function LocaleFallbackRoute() {
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? "fr";
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(locale);
  return <section className="not-found-page site-container" aria-labelledby="not-found-title">
    <TardisDrift />
    <div className="not-found-copy">
      <p className="page-eyebrow">{t("not_found.eyebrow")}</p>
      <h1 id="not-found-title" className="page-title">{t("not_found.title")}</h1>
      <p className="not-found-description">{t("not_found.description")}</p>
      <div className="not-found-actions">
        <Link className="not-found-home" to={getLocalizedPath(locale, "/")}><FiArrowLeft aria-hidden="true" />{t("not_found.home")}</Link>
        <Link className="not-found-projects" to={getLocalizedPath(locale, "/project")}>{t("not_found.projects")}<FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
    <div className="not-found-art" aria-hidden="true">
      <svg className="not-found-lines" viewBox="0 0 520 400" fill="none" focusable="false">
        <path d="M48 291C83 332 205 306 327 242S508 105 471 87" stroke="#8aaddc" strokeOpacity="0.22" />
        <path d="M48 291C28 253 123 184 242 126S440 65 471 87" stroke="#8aaddc" strokeOpacity="0.1" strokeDasharray="3 8" />
        <path d="m383 76 39-19 35 30" stroke="#a9c8ef" strokeOpacity="0.3" />
        <g fill="#c8e0ff">
          <circle cx="383" cy="76" r="2" /><circle cx="422" cy="57" r="3" /><circle cx="457" cy="87" r="2" />
          <circle cx="92" cy="305" r="3" />
        </g>
      </svg>
      <span className="not-found-number">404</span>
      <span className="not-found-star not-found-star-one">+</span>
      <span className="not-found-star not-found-star-two">+</span>
      <span className="not-found-star not-found-star-three" />
      <span className="not-found-star not-found-star-four" />
    </div>
  </section>;
}
