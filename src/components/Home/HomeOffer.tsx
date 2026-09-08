import { useTranslation } from "react-i18next";
import HomeButtons from "./HomeButtons";
import "../../assets/styles/Home/HomeOffer.css";

// Keep the primary offer readable on first paint, without an animation delay.
export default function HomeOffer() {
  const { t } = useTranslation();
  return <div className="home-offer">
    <p className="business-eyebrow">Théo Guérin <span aria-hidden="true">/</span> {t("home_offer.location")}</p>
    <h1>{t("home_offer.title")} <span>{t("home_offer.specialty")}</span></h1>
    <p className="home-offer-description">{t("home_offer.description")}</p>
    <p className="professional-availability">{t("professional_availability")}</p>
    <HomeButtons />
    <p className="home-offer-note">React · Django · Flutter</p>
  </div>;
}
