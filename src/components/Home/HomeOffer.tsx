import { useTranslation } from "react-i18next";
import HomeButtons from "./HomeButtons";
import GravityText from "./GravityText";
import "../../assets/styles/Home/HomeOffer.css";

// Garde l’offre principale lisible dès le premier affichage, sans délai d’animation.
export default function HomeOffer() {
  const { t } = useTranslation();
  return <div className="home-offer">
    <p className="business-eyebrow">Théo Guérin <span aria-hidden="true">/</span> {t("home_offer.location")}</p>
    <h1><GravityText>{t("home_offer.title")}</GravityText> <span className="home-offer-specialty"><GravityText>{t("home_offer.specialty")}</GravityText></span></h1>
    <p className="home-offer-description"><GravityText>{t("home_offer.description")}</GravityText></p>
    <p className="professional-availability"><GravityText>{t("professional_availability")}</GravityText></p>
    <HomeButtons />
    <p className="home-offer-note">React · Django · Flutter</p>
  </div>;
}
