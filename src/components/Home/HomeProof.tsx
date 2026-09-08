import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import montafilanImage from "@image/Projects/portesDeMontafilan.webp";
import "../../assets/styles/Home/HomeOffer.css";

export default function HomeProof() {
  const { t } = useTranslation();
  return <section className="home-proof" aria-labelledby="home-proof-title">
    <div className="home-proof-copy">
      <p className="business-eyebrow">{t("home_offer.case_label")}</p>
      <h2 id="home-proof-title">Les Portes de Montafilan</h2>
      <p>{t("home_offer.case_description")}</p>
      <Link className="business-text-link" to="/fr/realisations/les-portes-de-montafilan" hrefLang="fr">{t("home_offer.case_link")} ↗</Link>
    </div>
    <img src={montafilanImage} alt={t("categories_projects.portes_montafilan_image_alt")} width="1600" height="1000" loading="lazy" decoding="async" />
  </section>;
}
