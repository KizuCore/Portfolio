import LoadingImage from "../Layout/LoadingImage";
import { getShortLocale, getLocalizedPath, getHtmlLang } from "../../config/seo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import montafilanImage from "@image/Projects/portesDeMontafilan.webp";
import "../../assets/styles/Home/HomeOffer.css";

export default function HomeProof() {
  const { t, i18n } = useTranslation();
  return <section className="home-proof" aria-labelledby="home-proof-title">
    <div className="home-proof-copy">
      <p className="business-eyebrow">{t("home_offer.case_label")}</p>
      <h2 id="home-proof-title">Les Portes de Montafilan</h2>
      <p>{t("home_offer.case_description")}</p>
      <Link className="business-text-link" to={getLocalizedPath(getShortLocale(i18n.language), "/realisations/les-portes-de-montafilan")} hrefLang={getHtmlLang(getShortLocale(i18n.language))}>{t("home_offer.case_link")} ↗</Link>
    </div>
    <LoadingImage src={montafilanImage} alt={t("categories_projects.portes_montafilan_image_alt")} width="1600" height="1000" loading="lazy" decoding="async" />
  </section>;
}
