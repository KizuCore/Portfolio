import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVICE_ITEMS } from "./data/services";
import { getLocalizedPath, getShortLocale, splitLocalizedPath } from "../../config/seo";
import "../../assets/styles/Home/Services.css";

export default function Services() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? getShortLocale(i18n.language);
  return <section className="home-services" id="services" aria-labelledby="services-title">
    <header className="home-services-header">
      <div>
        <p className="business-eyebrow">{t("services.eyebrow")}</p>
        <h2 id="services-title">{t("services.title")}</h2>
        <p>{t("services.subtitle")}</p>
      </div>
      <Link className="business-text-link" to={getLocalizedPath(locale, "/contact")}>{t("services.cta")} ↗</Link>
    </header>
    <div className="home-services-grid">
      {SERVICE_ITEMS.map((item) => {
        const Icon = item.icon;
        return <article className="service-tile" key={item.key}>
          <Icon className="service-tile-icon" aria-hidden="true" />
          <h3>{item.technology}</h3>
          <p>{t(`services.items.${item.key}.description`)}</p>
          {item.path && <Link className="business-text-link" to={item.path} hrefLang="fr">{t("home_offer.service_link")} ↗</Link>}
        </article>;
      })}
    </div>
    <div className="home-services-footer"><Link className="business-text-link" to="/fr/services/creation-site-internet-rennes" hrefLang="fr">{t("services.items.websites.title")} ↗</Link></div>
  </section>;
}
