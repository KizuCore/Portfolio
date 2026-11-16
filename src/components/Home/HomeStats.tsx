import { useTranslation } from "react-i18next";

// Des repères immédiatement lisibles, sans compteur qui commence à zéro.
export default function HomeStats() {
  const { t } = useTranslation();
  return <div className="home-facts">
    <p><strong>2017</strong><span>{t("home_refresh.since")}</span></p>
    <p><strong>Web & mobile</strong><span>React · Node.js · Django · Flutter</span></p>
    <p><strong>{t("home_offer.location")}</strong><span>{t("home_refresh.location_note")}</span></p>
  </div>;
}
